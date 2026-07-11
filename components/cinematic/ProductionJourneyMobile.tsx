"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { productionJourney } from "@/lib/content";
import { assetPath } from "@/lib/assetPath";
import { JourneyStagePanel } from "@/components/cinematic/JourneyStagePanel";
import { FilmGrain } from "@/components/cinematic/FilmGrain";

export function ProductionJourneyMobile() {
  const { stages, sectionTitle, sectionIntro } = productionJourney;
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute("data-index"));
            if (!Number.isNaN(idx)) setActiveIndex(idx);
          }
        });
      },
      { threshold: 0.5 },
    );

    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="journey" className="relative bg-black">
      <div className="border-b border-white/5 px-5 py-6 sm:px-6">
        <p className="text-[10px] uppercase tracking-[0.32em] text-studio-gold">{sectionTitle.en}</p>
        <p className="font-heading-ar mt-1 text-lg text-studio-white" dir="rtl">
          {sectionTitle.ar}
        </p>
        <p className="mt-3 text-sm text-studio-muted">{sectionIntro.en}</p>
        <p className="font-body-ar mt-2 text-right text-sm text-studio-muted" dir="rtl">
          {sectionIntro.ar}
        </p>
        <div className="mt-4 flex gap-1">
          {stages.map((_, i) => (
            <span
              key={i}
              className={`h-0.5 flex-1 rounded-full transition-colors ${
                i === activeIndex ? "bg-studio-gold" : "bg-white/15"
              }`}
            />
          ))}
        </div>
      </div>

      {stages.map((stage, i) => (
        <article
          key={stage.id}
          ref={(el) => {
            itemRefs.current[i] = el;
          }}
          data-index={i}
          className="relative min-h-[100svh] w-full overflow-hidden"
        >
          <Image
            src={assetPath(stage.image)}
            alt={stage.title.en}
            fill
            loading={i === 0 ? "eager" : "lazy"}
            className="object-cover object-center"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-black/30" />
          <FilmGrain />
          <div className="absolute inset-x-0 bottom-0 z-10 px-5 pb-12 pt-24 sm:px-6">
            <JourneyStagePanel stage={stage} total={stages.length} variant="overlay" />
          </div>
        </article>
      ))}
    </section>
  );
}
