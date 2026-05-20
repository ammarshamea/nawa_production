"use client";

import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";

type Props = {
  src: string;
  className?: string;
  style?: CSSProperties;
  loop?: boolean;
  autoplay?: boolean;
  playOnInView?: boolean;
};

export function LottiePlayer({
  src,
  className,
  style,
  loop = true,
  autoplay = true,
  playOnInView = false,
}: Props) {
  const ref = useRef<LottieRefCurrentProps | null>(null);
  const wrapRef = useRef<HTMLDivElement | null>(null);
  const [data, setData] = useState<unknown | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch(src)
      .then((r) => r.json())
      .then((json) => {
        if (!cancelled) setData(json);
      })
      .catch(() => {
        if (!cancelled) setData(null);
      });
    return () => {
      cancelled = true;
    };
  }, [src]);

  useEffect(() => {
    if (!playOnInView || !wrapRef.current) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!ref.current) return;
        if (entry.isIntersecting) ref.current.play();
        else ref.current.pause();
      },
      { threshold: 0.2 },
    );
    obs.observe(wrapRef.current);
    return () => obs.disconnect();
  }, [playOnInView]);

  if (!data) return <div ref={wrapRef} className={className} style={style} aria-hidden />;

  return (
    <div ref={wrapRef} className={className} style={style} aria-hidden>
      <Lottie lottieRef={ref} animationData={data} loop={loop} autoplay={autoplay && !playOnInView} />
    </div>
  );
}
