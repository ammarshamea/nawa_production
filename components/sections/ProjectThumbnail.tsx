"use client";

import { useEffect, useRef, useState } from "react";
import { driveThumbnailUrls } from "@/lib/drive";

type Props = {
  driveId: string;
  title: string;
  priority?: boolean;
};

export function ProjectThumbnail({ driveId, title, priority }: Props) {
  const sources = driveThumbnailUrls(driveId);
  const [inView, setInView] = useState(priority ?? false);
  const [thumbIndex, setThumbIndex] = useState(0);
  const [failed, setFailed] = useState(false);

  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (inView) return;

    const node = rootRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: "120px", threshold: 0.01 },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [inView]);

  function handleThumbError() {
    if (thumbIndex < sources.length - 1) {
      setThumbIndex((i) => i + 1);
    } else {
      setFailed(true);
    }
  }

  const thumbSrc = inView && !failed ? sources[thumbIndex] : null;

  return (
    <div ref={rootRef} className="relative aspect-video w-full overflow-hidden bg-ink-soft">
      {!thumbSrc && (
        <div
          className="absolute inset-0 animate-pulse bg-gradient-to-br from-plum-900/50 via-ink-soft to-ink-deep"
          aria-hidden
        />
      )}

      {thumbSrc ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={thumbSrc}
          src={thumbSrc}
          alt={title}
          loading={priority ? "eager" : "lazy"}
          decoding="async"
          referrerPolicy="no-referrer"
          onError={handleThumbError}
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
      ) : failed ? (
        <span className="absolute inset-0 flex items-center justify-center px-4 text-center text-sm text-white/50">
          {title}
        </span>
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
