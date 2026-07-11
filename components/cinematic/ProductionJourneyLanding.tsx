"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { ourProcess } from "@/lib/content";
import { assetPath } from "@/lib/assetPath";
import { JourneyStagePanel } from "@/components/cinematic/JourneyStagePanel";
import { en } from "@/lib/text";

export function ProductionJourneyLanding() {
  const { stages, sectionTitle, sectionHeadline, sectionIntro } = ourProcess;
  const stageRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" },
    );

    stageRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section id="process" className="relative bg-black" aria-labelledby="process-heading">
      <div className="border-b border-white/5 bg-ink-deep">
        <div className="mx-auto max-w-7xl px-6 py-20 md:px-12 md:py-28">
          <p id="process-heading" className="text-[10px] uppercase tracking-[0.35em] text-studio-gold">
            {en(sectionTitle)}
          </p>
          <h2 className="mt-6 font-display text-3xl leading-tight text-studio-white md:text-5xl lg:text-6xl">
            {en(sectionHeadline)}
          </h2>
          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-studio-muted md:text-base">
            {en(sectionIntro)}
          </p>
        </div>
      </div>

      <div className="divide-y divide-white/5">
        {stages.map((stage, i) => {
          const reverse = i % 2 === 1;

          return (
            <article
              key={stage.id}
              ref={(el) => {
                stageRefs.current[i] = el;
              }}
              className="journey-stage group opacity-0 translate-y-8 transition-all duration-700 ease-out [&.is-visible]:translate-y-0 [&.is-visible]:opacity-100"
            >
              <div
                className={`mx-auto grid max-w-7xl lg:grid-cols-2 lg:items-stretch ${
                  reverse ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-black lg:aspect-auto lg:min-h-[28rem] xl:min-h-[32rem]">
                  <Image
                    src={assetPath(stage.image)}
                    alt={en(stage.title)}
                    fill
                    loading={i < 2 ? "eager" : "lazy"}
                    className="object-contain object-center transition-transform duration-[1.2s] ease-out group-[.is-visible]:scale-100 scale-105 lg:object-cover"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent lg:bg-gradient-to-r lg:from-transparent lg:via-transparent lg:to-black/20" />
                </div>

                <div className="flex flex-col justify-center px-6 py-12 md:px-12 md:py-16 lg:px-14 lg:py-20">
                  <JourneyStagePanel stage={stage} total={stages.length} variant="stack" />
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
