"use client";

import Image from "next/image";
import { useLayoutEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useContent, useLanguage } from "@/lib/i18n/LanguageProvider";
import { assetPath } from "@/lib/assetPath";
import {
  LOCALE_CHANGE_EVENT,
  refreshScrollTriggersPreservingPosition,
} from "@/lib/i18n/scrollSync";
import {
  crossfadeStage,
  sceneCameraMoveMobile,
} from "@/lib/journeyMotion";
import { JourneyStageCinematic } from "@/components/cinematic/JourneyStageCinematic";
import { FilmGrain } from "@/components/cinematic/FilmGrain";

const DELIVERY_HOLD = 1.85;
const WIDE_BREAKPOINT = 1024;

function scrollMultiplier() {
  const h = window.innerHeight;
  if (h < 520) return 1.05;
  if (h < 768) return 1.12;
  return 1.2;
}

function sectionHeightUnits(totalUnits: number) {
  const h = window.innerHeight;
  const vhPerUnit = h < 520 ? 105 : h < 768 ? 112 : 118;
  return totalUnits * vhPerUnit;
}

export function ProductionJourneyCinematic() {
  const { process } = useContent();
  const { isRtl } = useLanguage();
  const { stages, sectionTitle, sectionHeadline, sectionIntro } = process;
  const stageSignature = useMemo(() => stages.map((stage) => stage.id).join("|"), [stages]);
  const stagesRef = useRef(stages);
  stagesRef.current = stages;
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const layerRefs = useRef<(HTMLDivElement | null)[]>([]);
  const cameraRefs = useRef<(HTMLDivElement | null)[]>([]);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const [sectionHeight, setSectionHeight] = useState<string>("500vh");

  useLayoutEffect(() => {
    if (!sectionRef.current || !pinRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const count = stagesRef.current.length;
    const totalUnits = count + DELIVERY_HOLD - 1;
    setSectionHeight(`${sectionHeightUnits(totalUnits)}vh`);

    const wide = window.matchMedia(`(min-width: ${WIDE_BREAKPOINT}px)`).matches;
    const applyCamera = sceneCameraMoveMobile;
    const initialScale = 1;

    const ctx = gsap.context(() => {
      stagesRef.current.forEach((_, i) => {
        const layer = layerRefs.current[i];
        const camera = cameraRefs.current[i];
        const panel = panelRefs.current[i];
        if (!layer || !camera || !panel) return;

        if (i === 0) {
          gsap.set(layer, { opacity: 1 });
          gsap.set(camera, { scale: initialScale, x: "0%", y: "0%", force3D: true });
          gsap.set(panel, { opacity: 1 });
          gsap.set(panel.querySelectorAll("[data-j-part]"), { opacity: 1, y: 0, force3D: true });
        } else {
          gsap.set(layer, { opacity: 0 });
          gsap.set(panel, { opacity: 0 });
          gsap.set(camera, { scale: initialScale, x: "0%", y: "0%", force3D: true });
          gsap.set(panel.querySelectorAll("[data-j-part]"), { opacity: 0, y: 14, force3D: true });
        }
      });

      const master = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${window.innerHeight * totalUnits * scrollMultiplier()}`,
          pin: pinRef.current,
          scrub: wide ? 1 : 0.75,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          fastScrollEnd: true,
          onUpdate: (self) => {
            const pos = self.progress * totalUnits;
            const idx = Math.min(count - 1, Math.floor(pos));
            panelRefs.current.forEach((panel, i) => {
              panel?.setAttribute("aria-hidden", i === idx ? "false" : "true");
            });
          },
        },
      });

      if (headerRef.current) {
        master.to(headerRef.current, { opacity: 0, y: -12, duration: 0.2, ease: "power2.inOut" }, 0.06);
      }

      applyCamera(master, cameraRefs.current[0]!, stagesRef.current[0].motionKey, 0, 1);

      for (let i = 1; i < count; i++) {
        const prevLayer = layerRefs.current[i - 1];
        const layer = layerRefs.current[i];
        const prevPanel = panelRefs.current[i - 1];
        const panel = panelRefs.current[i];
        const camera = cameraRefs.current[i];
        if (!prevLayer || !layer || !prevPanel || !panel || !camera) continue;

        const t = i;

        crossfadeStage(master, prevLayer, layer, prevPanel, panel, t);

        master.set(camera, { scale: initialScale, x: "0%", y: "0%", force3D: true }, t);

        const sceneDuration = i === count - 1 ? 1 + DELIVERY_HOLD : 1;
        applyCamera(master, camera, stagesRef.current[i].motionKey, t, sceneDuration);
      }
    }, sectionRef);

    ScrollTrigger.refresh();

    const refresh = () => {
      setSectionHeight(`${sectionHeightUnits(totalUnits)}vh`);
      refreshScrollTriggersPreservingPosition(true);
    };

    const onLocaleChange = () => {
      requestAnimationFrame(() => refreshScrollTriggersPreservingPosition(true));
    };

    window.addEventListener("resize", refresh);
    window.addEventListener("orientationchange", refresh);
    window.addEventListener(LOCALE_CHANGE_EVENT, onLocaleChange);

    return () => {
      window.removeEventListener("resize", refresh);
      window.removeEventListener("orientationchange", refresh);
      window.removeEventListener(LOCALE_CHANGE_EVENT, onLocaleChange);
      ctx.revert();
    };
  }, [stageSignature]);

  return (
    <section
      id="process"
      ref={sectionRef}
      className="relative bg-black"
      style={{ height: sectionHeight }}
      aria-labelledby="process-heading"
    >
      <div
        ref={pinRef}
        dir="ltr"
        className="relative h-[100dvh] min-h-[100svh] w-full overflow-hidden supports-[height:100dvh]:min-h-[100dvh]"
        style={{ contain: "layout paint" }}
      >
        {stages.map((stage, i) => (
          <div
            key={stage.id}
            ref={(el) => {
              layerRefs.current[i] = el;
            }}
            className="absolute inset-0 bg-black"
            style={{ opacity: i === 0 ? 1 : 0 }}
          >
            <div
              ref={(el) => {
                cameraRefs.current[i] = el;
              }}
              className="absolute inset-0 will-change-transform"
            >
              <Image
                src={assetPath(stage.image)}
                alt=""
                fill
                priority={i < 2}
                loading={i < 2 ? "eager" : "lazy"}
                className="object-contain object-center"
                sizes="100vw"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-ink-deep/95 via-ink-deep/30 to-ink-deep/20" />
            <div className="absolute inset-0 bg-purple-haze opacity-25 md:opacity-35" />
          </div>
        ))}

        <div className="journey-vignette pointer-events-none absolute inset-0 z-20 opacity-50 md:opacity-70" aria-hidden />
        <FilmGrain />

        <div
          dir={isRtl ? "rtl" : "ltr"}
          className="relative z-40 flex h-full flex-col justify-between px-5 pb-[max(2.5rem,env(safe-area-inset-bottom,0px))] pt-[max(6.5rem,env(safe-area-inset-top,0px)+4.5rem)] sm:px-8 md:px-12 md:pb-16 md:pt-32 lg:px-20 lg:pb-24"
        >
          <div ref={headerRef} className="max-w-2xl">
            {sectionHeadline ? (
              <>
                <p id="process-heading" className="text-[10px] uppercase tracking-[0.32em] text-studio-gold sm:tracking-[0.35em]">
                  {sectionTitle}
                </p>
                <h2 className="mt-2 font-display text-xl leading-tight text-studio-white sm:mt-3 sm:text-2xl md:text-4xl lg:text-5xl">
                  {sectionHeadline}
                </h2>
              </>
            ) : (
              <h2
                id="process-heading"
                className="font-display text-xl leading-tight text-studio-white sm:text-2xl md:text-4xl lg:text-5xl"
              >
                {sectionTitle}
              </h2>
            )}
            {sectionIntro ? (
              <p className="mt-2 max-w-lg text-xs leading-relaxed text-studio-muted sm:mt-3 sm:text-sm md:text-base">
                {sectionIntro}
              </p>
            ) : null}
          </div>

          <div className="relative min-h-[180px] pb-1 sm:min-h-[200px] md:min-h-[240px] md:pb-4">
            {stages.map((stage, i) => (
              <div
                key={stage.id}
                ref={(el) => {
                  panelRefs.current[i] = el;
                }}
                className="absolute inset-x-0 bottom-0 max-w-3xl"
                aria-hidden={i !== 0}
              >
                <JourneyStageCinematic stage={stage} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
