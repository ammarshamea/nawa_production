"use client";

import Image from "next/image";
import { useContent } from "@/lib/i18n/LanguageProvider";
import { assetPath } from "@/lib/assetPath";
import { Reveal } from "@/components/motion/Reveal";
import { SectionWatermark } from "@/components/SectionWatermark";

export function About() {
  const { about } = useContent();

  return (
    <section id="about" className="relative overflow-hidden bg-ink-deep py-24 md:py-32 lg:py-40">
      <SectionWatermark position="right" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.32em] text-gold-200/80">{about.label}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-5 max-w-3xl font-display text-4xl leading-[1] text-white sm:text-5xl md:text-6xl">
            {about.title}
            <br />
            <span className="bg-gold-sheen bg-clip-text italic text-transparent">{about.titleAccent}</span>
          </h2>
        </Reveal>
        <Reveal delay={0.1}>
          <span className="mt-8 block h-px w-24 bg-gold-300/60" />
        </Reveal>

        <div className="mt-12 grid gap-10 lg:mt-14 lg:grid-cols-12 lg:items-start lg:gap-x-14 lg:gap-y-0">
          <div className="order-2 lg:order-1 lg:col-span-7">
            <Reveal delay={0.12}>
              <div className="space-y-6 text-base leading-[1.75] text-white/80 md:text-lg">
                {about.body.map((paragraph) => (
                  <p key={paragraph.slice(0, 32)}>{paragraph}</p>
                ))}
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <dl className="mt-12 grid grid-cols-3 gap-4 border-t border-white/10 pt-10 sm:gap-6">
                {about.stats.map((stat) => (
                  <div key={stat.label}>
                    <dt className="text-[10px] uppercase tracking-[0.28em] text-gold-200/70">{stat.label}</dt>
                    <dd className="mt-2 font-display text-lg text-white md:text-xl">{stat.value}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          <div className="order-1 lg:order-2 lg:col-span-5 lg:sticky lg:top-28 lg:self-start">
            <Reveal delay={0.08}>
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl border border-white/10 bg-black/60 shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
                <Image
                  src={assetPath(about.image)}
                  alt=""
                  fill
                  className="object-contain object-center lg:object-cover"
                  sizes="(max-width: 1024px) 100vw, 38vw"
                  priority
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink-deep/50 via-transparent to-black/10" />
                <div className="absolute inset-0 ring-1 ring-inset ring-white/10" />
              </div>
              <span className="mt-4 block text-[10px] uppercase tracking-[0.28em] text-white/35">
                {about.locationCaption}
              </span>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
