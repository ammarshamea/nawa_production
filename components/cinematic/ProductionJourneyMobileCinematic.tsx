"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useContent } from "@/lib/i18n/LanguageProvider";
import { assetPath } from "@/lib/assetPath";
import { revealStageText, sceneCameraMoveMobile } from "@/lib/journeyMotion";
import { JourneyStageCinematic } from "@/components/cinematic/JourneyStageCinematic";
import { FilmGrain } from "@/components/cinematic/FilmGrain";

export function ProductionJourneyMobileCinematic() {
  const { process } = useContent();
  const { stages, sectionTitle, sectionHeadline, sectionIntro } = process;
  const sectionRef = useRef<HTMLElement>(null);
  const sceneRefs = useRef<(HTMLElement | null)[]>([]);
  const cameraRefs = useRef<(HTMLDivElement | null)[]>([]);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    if (!sectionRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      stages.forEach((stage, i) => {
        const scene = sceneRefs.current[i];
        const camera = cameraRefs.current[i];
        const panel = panelRefs.current[i];
        if (!scene || !camera || !panel) return;

        gsap.set(panel.querySelectorAll("[data-j-part]"), { opacity: 0, y: 14, filter: "blur(4px)" });
        gsap.set(camera, { scale: 1, x: "0%", y: "0%", filter: "none" });

        const isDelivery = i === stages.length - 1;

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: scene,
            start: "top 88%",
            end: isDelivery ? "bottom 12%" : "bottom 25%",
            scrub: 0.9,
          },
        });

        revealStageText(tl, panel, 0);
        sceneCameraMoveMobile(tl, camera, stage.motionKey, 0.05, isDelivery ? 1.35 : 1);
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [stages]);

  return (
    <section id="process" ref={sectionRef} className="relative bg-ink-deep" aria-labelledby="process-heading">
      <div className="border-b border-white/5 px-6 py-10 sm:px-8 md:px-12">
        {sectionHeadline ? (
          <>
            <p id="process-heading" className="text-[10px] uppercase tracking-[0.32em] text-studio-gold">
              {sectionTitle}
            </p>
            <h2 className="mt-5 font-display text-2xl leading-tight text-studio-white sm:text-3xl">
              {sectionHeadline}
            </h2>
          </>
        ) : (
          <h2
            id="process-heading"
            className="font-display text-2xl leading-tight text-studio-white sm:text-3xl"
          >
            {sectionTitle}
          </h2>
        )}
        {sectionIntro ? (
          <p className="mt-4 max-w-xl text-sm leading-relaxed text-studio-muted">{sectionIntro}</p>
        ) : null}
      </div>

      {stages.map((stage, i) => (
        <article
          key={stage.id}
          ref={(el) => {
            sceneRefs.current[i] = el;
          }}
          className="border-b border-white/5 last:border-b-0"
        >
          <div className="relative aspect-[4/3] w-full overflow-hidden bg-black sm:aspect-[16/10]">
            <div
              ref={(el) => {
                cameraRefs.current[i] = el;
              }}
              className="absolute inset-0 will-change-transform"
            >
              <Image
                src={assetPath(stage.image)}
                alt={stage.title}
                fill
                loading={i < 2 ? "eager" : "lazy"}
                className="object-contain object-center"
                sizes="100vw"
              />
            </div>

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-deep/70 via-ink-deep/15 to-ink-deep/25" />
            <div className="pointer-events-none absolute inset-0 bg-purple-haze opacity-20" />
            <FilmGrain />
          </div>

          <div
            ref={(el) => {
              panelRefs.current[i] = el;
            }}
            className="px-6 py-10 sm:px-8 sm:py-12"
          >
            <JourneyStageCinematic stage={stage} />
          </div>
        </article>
      ))}
    </section>
  );
}
