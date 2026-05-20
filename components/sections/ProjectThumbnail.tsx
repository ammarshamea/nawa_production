"use client";

import { useEffect, useState } from "react";
import {
  driveThumbnailProxyUrl,
  driveThumbnailUrls,
  driveVideoStreamUrl,
} from "@/lib/drive";

type Props = {
  driveId: string;
  title: string;
  priority?: boolean;
};

function captureFrameFromVideo(video: HTMLVideoElement): string | null {
  const w = video.videoWidth;
  const h = video.videoHeight;
  if (!w || !h) return null;

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;

  try {
    ctx.drawImage(video, 0, 0, w, h);
    return canvas.toDataURL("image/jpeg", 0.82);
  } catch {
    return null;
  }
}

/** Loads first frame from Drive video stream when thumbnail URLs fail (link-shared files). */
function useVideoFirstFrame(driveId: string, enabled: boolean) {
  const [dataUrl, setDataUrl] = useState<string | null>(null);

  useEffect(() => {
    setDataUrl(null);
  }, [driveId]);

  useEffect(() => {
    if (!enabled || dataUrl) return;

    const video = document.createElement("video");
    video.muted = true;
    video.playsInline = true;
    video.preload = "auto";
    video.crossOrigin = "anonymous";

    let settled = false;

    const finish = (url: string | null) => {
      if (settled) return;
      settled = true;
      video.removeAttribute("src");
      video.load();
      if (url) setDataUrl(url);
    };

    const onSeeked = () => {
      finish(captureFrameFromVideo(video));
    };

    const onLoaded = () => {
      try {
        video.currentTime = Math.min(0.5, video.duration > 0 ? video.duration * 0.02 : 0.5);
      } catch {
        finish(captureFrameFromVideo(video));
      }
    };

    const onError = () => finish(null);

    video.addEventListener("seeked", onSeeked, { once: true });
    video.addEventListener("loadeddata", onLoaded, { once: true });
    video.addEventListener("error", onError, { once: true });

    const t = window.setTimeout(() => finish(null), 12000);
    video.src = driveVideoStreamUrl(driveId);

    return () => {
      window.clearTimeout(t);
      video.removeEventListener("seeked", onSeeked);
      video.removeEventListener("loadeddata", onLoaded);
      video.removeEventListener("error", onError);
    };
  }, [driveId, enabled, dataUrl]);

  return dataUrl;
}

export function ProjectThumbnail({ driveId, title, priority }: Props) {
  const sources = [
    driveThumbnailProxyUrl(driveId),
    ...driveThumbnailUrls(driveId),
  ];

  const [srcIndex, setSrcIndex] = useState(0);
  const [exhausted, setExhausted] = useState(false);
  const captured = useVideoFirstFrame(driveId, exhausted);

  const src = captured ?? sources[srcIndex] ?? sources[0];
  const showPlaceholder = exhausted && !captured;

  function handleError() {
    if (srcIndex < sources.length - 1) {
      setSrcIndex((i) => i + 1);
    } else {
      setExhausted(true);
    }
  }

  return (
    <div className="relative aspect-video w-full overflow-hidden bg-ink-soft">
      {!showPlaceholder ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={src}
          alt={title}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          onError={handleError}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : (
        <div
          className="absolute inset-0 bg-gradient-to-br from-plum-900/90 via-ink-soft to-ink-deep"
          aria-hidden
        />
      )}

      <div className="absolute inset-0 bg-ink-deep/40 transition-opacity duration-500 group-hover:bg-ink-deep/20" />
      <div
        className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(221,181,90,0.18),_transparent_65%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        aria-hidden
      />
      <span className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-ink-soft via-ink-soft/60 to-transparent" />
    </div>
  );
}
