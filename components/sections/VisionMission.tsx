"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import { useContent } from "@/lib/i18n/LanguageProvider";
import { assetPath } from "@/lib/assetPath";
import { SectionWatermark } from "@/components/SectionWatermark";

function highlight(text: string, words: string[]) {
  const re = new RegExp(`(${words.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "gi");
  return text.split(re).map((chunk, i) => {
    const isKey = words.some((w) => w.toLowerCase() === chunk.toLowerCase());
    return isKey ? (
      <span key={i} className="bg-gold-sheen bg-clip-text italic text-transparent">
        {chunk}
      </span>
    ) : (
      <span key={i}>{chunk}</span>
    );
  });
}

function StoryImage({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative mb-8 aspect-[4/3] overflow-hidden rounded-xl border border-white/10 bg-black/70 sm:aspect-[16/10] md:aspect-[16/10]">
      <Image
        src={assetPath(src)}
        alt={alt}
        fill
        className="object-contain object-center md:object-cover"
        sizes="(max-width: 768px) 100vw, 50vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent md:from-black/50" />
    </div>
  );
}

export function VisionMission() {
  const { vision, mission } = useContent();

  return (
    <section
      id="vision-mission"
      className="relative overflow-hidden border-y border-white/5 bg-black py-24 md:py-32 lg:py-40"
    >
      <SectionWatermark position="left" />
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -start-32 top-1/4 h-96 w-96 rounded-full bg-plum-500/20 blur-[140px]" />
        <div className="absolute -end-32 bottom-1/4 h-96 w-96 rounded-full bg-gold-500/15 blur-[140px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6">
        <div className="grid gap-16 md:grid-cols-2 md:gap-12 lg:gap-20">
          <div className="relative">
            <Reveal>
              <StoryImage src={vision.image} alt={vision.title} />
            </Reveal>
            <Reveal delay={0.05}>
              <p className="text-xs uppercase tracking-[0.32em] text-gold-200/80">{vision.label}</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h3 className="mt-4 font-display text-3xl leading-[1.05] text-white md:text-4xl lg:text-5xl">
                {vision.title}
              </h3>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-6 text-base leading-[1.7] text-white/75 md:text-lg">
                {highlight(vision.body, vision.keywords)}
              </p>
            </Reveal>
          </div>

          <motion.span
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
            className="absolute start-1/2 hidden h-[calc(100%-2rem)] w-px origin-top -translate-x-1/2 bg-gradient-to-b from-transparent via-gold-300/50 to-transparent md:block"
          />

          <div className="relative md:pt-8 lg:pt-16">
            <Reveal>
              <StoryImage src={mission.image} alt={mission.title} />
            </Reveal>
            <Reveal delay={0.05}>
              <p className="text-xs uppercase tracking-[0.32em] text-gold-200/80">{mission.label}</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h3 className="mt-4 font-display text-3xl leading-[1.05] text-white md:text-4xl lg:text-5xl">
                {mission.title}
              </h3>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-6 text-base leading-[1.7] text-white/75 md:text-lg">
                {highlight(mission.body, mission.keywords)}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
