"use client";

import { motion } from "framer-motion";
import { Reveal } from "@/components/motion/Reveal";
import { mission, vision } from "@/lib/content";
import { SectionWatermark } from "@/components/SectionWatermark";

function highlight(text: string, words: string[]) {
  const re = new RegExp(`(${words.join("|")})`, "gi");
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

export function VisionMission() {
  return (
    <section
      id="vision-mission"
      className="relative overflow-hidden bg-gradient-to-b from-ink-deep via-plum-900/40 to-ink-deep py-24 md:py-32 lg:py-44"
    >
      <SectionWatermark position="left" />
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -left-32 top-1/4 h-96 w-96 rounded-full bg-plum-500/30 blur-[140px]" />
        <div className="absolute -right-32 bottom-1/4 h-96 w-96 rounded-full bg-gold-500/20 blur-[140px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6">
        <div className="grid gap-12 md:grid-cols-2 md:gap-24">
          <div className="relative">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.32em] text-gold-200/80">Vision</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h3 className="mt-6 font-display text-4xl leading-[1.05] text-white md:text-5xl">
                {vision.title}
              </h3>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-8 space-y-6 text-base leading-[1.7] text-white/80 md:text-lg">
                {vision.body.split("\n\n").map((p, i) => (
                  <p key={i}>{highlight(p, vision.keywords)}</p>
                ))}
              </div>
            </Reveal>
          </div>

          <motion.span
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
            className="absolute left-1/2 hidden h-full w-px origin-top -translate-x-1/2 bg-gradient-to-b from-transparent via-gold-300/60 to-transparent md:block"
          />

          <div className="relative md:pt-32">
            <Reveal>
              <p className="text-xs uppercase tracking-[0.32em] text-gold-200/80">Mission</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h3 className="mt-6 font-display text-4xl leading-[1.05] text-white md:text-5xl">
                {mission.title}
              </h3>
            </Reveal>
            <Reveal delay={0.15}>
              <p className="mt-8 text-base leading-[1.7] text-white/80 md:text-lg">
                {highlight(mission.body, mission.keywords)}
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
