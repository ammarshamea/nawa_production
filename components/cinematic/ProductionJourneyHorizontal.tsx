"use client";

import Image from "next/image";
import { useLayoutEffect, useMemo, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useContent, useLanguage } from "@/lib/i18n/LanguageProvider";
import { assetPath } from "@/lib/assetPath";
import { JourneyStagePanel } from "@/components/cinematic/JourneyStagePanel";
import {
  LOCALE_CHANGE_EVENT,
  refreshScrollTriggersPreservingPosition,
} from "@/lib/i18n/scrollSync";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function horizontalScrollLength(panelCount: number) {
  const h = window.innerHeight;
  return Math.max(1, panelCount - 1) * h * 1.12;
}

export function ProductionJourneyHorizontal() {
  const { process } = useContent();
  const { isRtl } = useLanguage();
  const { stages, sectionTitle, sectionHeadline, sectionIntro } = process;
  const stageSignature = useMemo(() => stages.map((stage) => stage.id).join("|"), [stages]);
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!sectionRef.current || !pinRef.current || !trackRef.current) return;

    const count = stages.length;
    if (count <= 1) return;

    const ctx = gsap.context(() => {
      const getTravel = () => {
        const track = trackRef.current;
        if (!track) return 0;
        return Math.max(0, track.scrollWidth - window.innerWidth);
      };

      gsap.to(trackRef.current, {
        x: () => -getTravel(),
        ease: "none",
        force3D: true,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${horizontalScrollLength(count)}`,
          pin: pinRef.current,
          scrub: 0.85,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
          onUpdate: (self) => {
            if (progressRef.current) {
              progressRef.current.style.transform = `scaleX(${self.progress})`;
            }
          },
        },
      });
    }, sectionRef);

    const onResize = () => refreshScrollTriggersPreservingPosition(true);
    const onLocaleChange = () => {
      requestAnimationFrame(() => refreshScrollTriggersPreservingPosition(true));
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);
    window.addEventListener(LOCALE_CHANGE_EVENT, onLocaleChange);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
      window.removeEventListener(LOCALE_CHANGE_EVENT, onLocaleChange);
      ctx.revert();
    };
  }, [stageSignature, stages.length]);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative bg-black"
      aria-labelledby="process-heading"
    >
      <div
        ref={pinRef}
        dir="ltr"
        className="relative flex h-[100dvh] min-h-[100svh] w-full flex-col overflow-hidden bg-black supports-[height:100dvh]:min-h-[100dvh]"
        style={{ contain: "layout paint" }}
      >
        <div
          dir={isRtl ? "rtl" : "ltr"}
          className="shrink-0 border-b border-white/5 px-6 py-8 md:px-12 md:py-10"
        >
          {sectionHeadline ? (
            <>
              <p id="process-heading" className="text-[10px] uppercase tracking-[0.35em] text-studio-gold">
                {sectionTitle}
              </p>
              <h2 className="mt-3 font-display text-2xl leading-tight text-studio-white sm:text-3xl md:text-4xl lg:text-5xl">
                {sectionHeadline}
              </h2>
            </>
          ) : (
            <h2
              id="process-heading"
              className="font-display text-2xl leading-tight text-studio-white sm:text-3xl md:text-4xl lg:text-5xl"
            >
              {sectionTitle}
            </h2>
          )}
          {sectionIntro ? (
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-studio-muted md:text-base">
              {sectionIntro}
            </p>
          ) : null}
        </div>

        <div className="relative min-h-0 flex-1 overflow-hidden">
          <div ref={trackRef} className="flex h-full will-change-transform">
            {stages.map((stage, i) => (
              <article
                key={stage.id}
                dir={isRtl ? "rtl" : "ltr"}
                className="relative h-full w-screen shrink-0 overflow-hidden bg-black"
              >
                <Image
                  src={assetPath(stage.image)}
                  alt={stage.title}
                  fill
                  priority={i < 2}
                  loading={i < 2 ? "eager" : "lazy"}
                  className="object-cover object-center"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/20" />
                <div className="absolute inset-x-0 bottom-0 z-10 px-6 pb-6 pt-24 md:px-12 md:pb-10 lg:px-16">
                  <JourneyStagePanel stage={stage} total={stages.length} variant="overlay" />
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="shrink-0 px-6 pb-[max(1.25rem,env(safe-area-inset-bottom,0px))] pt-4 md:px-12">
          <div className="h-px overflow-hidden rounded-full bg-white/10">
            <div
              ref={progressRef}
              className="h-full origin-left scale-x-0 bg-studio-gold/80 transition-none"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
