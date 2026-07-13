"use client";

import { useEffect, useState } from "react";
import { driveThumbnailUrls, driveVideoStreamUrls } from "@/lib/drive";

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
    return canvas.toDataURL("image/jpeg", 0.85);
  } catch {
    return null;
  }
}

/** Captures ~1s into the video as a static JPEG (hidden video element). */
function useVideoPoster(driveId: string) {
  const [poster, setPoster] = useState<string | null>(null);

  useEffect(() => {
    setPoster(null);

    const streams = driveVideoStreamUrls(driveId);
    let streamIndex = 0;
    let cancelled = false;

    const video = document.createElement("video");
    video.muted = true;
    video.playsInline = true;
    video.preload = "auto";
    video.crossOrigin = "anonymous";

    const cleanup = () => {
      video.removeAttribute("src");
      video.load();
    };

    const tryNextStream = () => {
      if (cancelled || streamIndex >= streams.length) return;

      video.src = streams[streamIndex];
      streamIndex += 1;
    };

    const onSeeked = () => {
      if (cancelled) return;
      const frame = captureFrameFromVideo(video);
      if (frame) {
        setPoster(frame);
        cleanup();
        return;
      }
      tryNextStream();
    };

    const onLoaded = () => {
      if (cancelled) return;
      try {
        const target = video.duration > 0 ? Math.min(1, video.duration * 0.05) : 0.5;
        video.currentTime = target;
      } catch {
        const frame = captureFrameFromVideo(video);
        if (frame) {
          setPoster(frame);
          cleanup();
        } else {
          tryNextStream();
        }
      }
    };

    const onError = () => {
      if (!cancelled) tryNextStream();
    };

    video.addEventListener("seeked", onSeeked);
    video.addEventListener("loadeddata", onLoaded);
    video.addEventListener("error", onError);

    const timeout = window.setTimeout(() => {
      if (!cancelled) cleanup();
    }, 18000);

    tryNextStream();

    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
      video.removeEventListener("seeked", onSeeked);
      video.removeEventListener("loadeddata", onLoaded);
      video.removeEventListener("error", onError);
      cleanup();
    };
  }, [driveId]);

  return poster;
}

export function ProjectThumbnail({ driveId, title, priority }: Props) {
  const sources = driveThumbnailUrls(driveId);
  const capturedPoster = useVideoPoster(driveId);

  const [thumbIndex, setThumbIndex] = useState(0);
  const [thumbSrc, setThumbSrc] = useState<string | null>(null);

  const posterSrc = capturedPoster ?? thumbSrc;
  const isLoading = !posterSrc;

  function handleThumbError() {
    if (thumbIndex < sources.length - 1) {
      setThumbIndex((i) => i + 1);
    }
  }

  return (
    <div className="relative aspect-video w-full overflow-hidden bg-ink-soft">
      {isLoading && (
        <div
          className="absolute inset-0 animate-pulse bg-gradient-to-br from-plum-900/50 via-ink-soft to-ink-deep"
          aria-hidden
        />
      )}

      {!capturedPoster && thumbIndex < sources.length && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={sources[thumbIndex]}
          src={sources[thumbIndex]}
          alt=""
          aria-hidden
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          referrerPolicy="no-referrer"
          onLoad={() => setThumbSrc(sources[thumbIndex])}
          onError={handleThumbError}
          className="hidden"
        />
      )}

      {posterSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={posterSrc}
          alt={title}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : null}

      <div className="absolute inset-0 bg-ink-deep/25 transition-opacity duration-500 group-hover:bg-ink-deep/10" />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(221,181,90,0.18),_transparent_65%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        aria-hidden
      />
      <span className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-ink-soft via-ink-soft/60 to-transparent" />
    </div>
  );
}
