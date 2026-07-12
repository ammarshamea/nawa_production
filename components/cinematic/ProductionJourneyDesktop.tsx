"use client";

import Image from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useContent } from "@/lib/i18n/LanguageProvider";
import { assetPath } from "@/lib/assetPath";
import { JourneyStagePanel } from "@/components/cinematic/JourneyStagePanel";
import { FilmGrain } from "@/components/cinematic/FilmGrain";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export function ProductionJourneyDesktop() {
  const { process } = useContent();
  const { stages, sectionTitle, sectionIntro } = process;
  const sectionRef = useRef<HTMLElement>(null);
  const pinRef = useRef<HTMLDivElement>(null);
  const cutRef = useRef<HTMLDivElement>(null);
  const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
  const panelRefs = useRef<(HTMLDivElement | null)[]>([]);
  const playheadRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useLayoutEffect(() => {
    if (!sectionRef.current || !pinRef.current) return;

    const ctx = gsap.context(() => {
      const stageCount = stages.length;

      stages.forEach((_, i) => {
        const img = imageRefs.current[i];
        const panel = panelRefs.current[i];
        if (!img || !panel) return;

        if (i === 0) {
          gsap.set(img, { opacity: 1, scale: 1 });
          gsap.set(panel, { opacity: 1, y: 0 });
        } else {
          gsap.set(img, { opacity: 0, scale: 1.06 });
          gsap.set(panel, { opacity: 0, y: 32 });
        }
      });

      const master = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${window.innerHeight * stageCount * 1.05}`,
          pin: pinRef.current,
          scrub: 0.8,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const idx = Math.min(stageCount - 1, Math.floor(self.progress * stageCount));
            panelRefs.current.forEach((panel, i) => {
              panel?.setAttribute("aria-hidden", i === idx ? "false" : "true");
            });
            setActiveIndex((prev) => (prev === idx ? prev : idx));
          },
        },
      });

      stages.forEach((_, i) => {
        if (i === 0) return;
        const prevImg = imageRefs.current[i - 1];
        const img = imageRefs.current[i];
        const prevPanel = panelRefs.current[i - 1];
        const panel = panelRefs.current[i];
        if (!prevImg || !img || !prevPanel || !panel) return;

        master
          .to(cutRef.current, { opacity: 1, duration: 0.03, ease: "none" }, i - 0.02)
          .to(cutRef.current, { opacity: 0, duration: 0.06, ease: "none" }, i)
          .to(prevImg, { opacity: 0, scale: 1.02, duration: 0.6, ease: "power2.inOut" }, i)
          .to(prevPanel, { opacity: 0, y: -20, duration: 0.4, ease: "power2.in" }, i)
          .to(img, { opacity: 1, scale: 1, duration: 0.8, ease: "power2.out" }, i + 0.02)
          .fromTo(
            panel,
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.55, ease: "power3.out" },
            i + 0.08,
          );

        if (i === 3) {
          master.fromTo(img, { scale: 1 }, { scale: 1.07, duration: 1, ease: "none" }, i + 0.1);
        }
      });

      if (playheadRef.current) {
        gsap.fromTo(
          playheadRef.current,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top top",
              end: () => `+=${window.innerHeight * stageCount * 1.05}`,
              scrub: true,
            },
          },
        );
      }
    }, sectionRef);

    const refresh = () => ScrollTrigger.refresh();
    window.addEventListener("resize", refresh);
    return () => {
      window.removeEventListener("resize", refresh);
      ctx.revert();
    };
  }, [stages]);

  return (
    <section
      id="journey"
      ref={sectionRef}
      className="relative bg-black"
      style={{ height: `${stages.length * 105}vh` }}
      aria-labelledby="journey-heading"
    >
      <div ref={pinRef} className="relative h-[100svh] w-full overflow-hidden">
        <div
          ref={cutRef}
          className="pointer-events-none absolute inset-0 z-40 bg-black opacity-0"
          aria-hidden
        />

        {stages.map((stage, i) => (
          <div
            key={stage.id}
            ref={(el) => {
              imageRefs.current[i] = el;
            }}
            className="absolute inset-0"
            style={{ opacity: i === 0 ? 1 : 0 }}
          >
            <Image
              src={assetPath(stage.image)}
              alt=""
              fill
              priority={i === 0}
              loading={i === 0 ? "eager" : "lazy"}
              className="object-cover object-center"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/25" />
            <div className="absolute inset-0 bg-purple-haze opacity-60" />
            <FilmGrain />
          </div>
        ))}

        <div className="relative z-20 flex h-full flex-col justify-between px-6 pb-8 pt-28 md:px-12 md:pb-10 md:pt-32">
          <div className="flex items-start justify-between gap-6">
            <div>
              <p
                id="journey-heading"
                className="text-[10px] uppercase tracking-[0.35em] text-studio-gold"
              >
                {sectionTitle}
              </p>
              {sectionIntro ? (
                <p className="mt-4 hidden max-w-sm text-sm text-studio-muted lg:block">{sectionIntro}</p>
              ) : null}
            </div>
            <div className="hidden items-center gap-2 lg:flex" aria-hidden>
              {stages.map((_, i) => (
                <span
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-500 ${
                    i === activeIndex
                      ? "w-8 bg-studio-gold"
                      : i < activeIndex
                        ? "w-1.5 bg-studio-gold/50"
                        : "w-1.5 bg-white/20"
                  }`}
                />
              ))}
            </div>
          </div>

          <div className="relative min-h-[200px] md:min-h-[240px]">
            {stages.map((stage, i) => (
              <div
                key={stage.id}
                ref={(el) => {
                  panelRefs.current[i] = el;
                }}
                className="absolute inset-x-0 bottom-0"
                style={{ opacity: i === 0 ? 1 : 0 }}
              >
                <JourneyStagePanel stage={stage} total={stages.length} variant="overlay" />
              </div>
            ))}
          </div>

          <div className="relative mt-4 h-px w-full bg-white/10">
            <div
              ref={playheadRef}
              className="absolute inset-y-0 left-0 w-full origin-left scale-x-0 bg-studio-gold"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
