"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useContent } from "@/lib/i18n/LanguageProvider";
import { Reveal } from "@/components/motion/Reveal";
import { SectionWatermark } from "@/components/SectionWatermark";

export function ProcessTimeline() {
  const { process } = useContent();
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 70%", "end 30%"],
  });
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section id="process" className="relative overflow-hidden bg-ink py-24 md:py-32 lg:py-44">
      <SectionWatermark position="left" />
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6">
        <Reveal>
          <p className="text-[10px] uppercase tracking-[0.32em] text-gold-200/80 sm:text-xs">
            How we work
          </p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-5 font-display text-4xl leading-[1] text-white sm:text-5xl md:text-6xl lg:text-7xl">
            {process.sectionTitle}
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          {process.sectionIntro ? (
            <p className="mt-5 max-w-xl text-sm leading-relaxed text-white/65 sm:text-base">
              {process.sectionIntro}
            </p>
          ) : null}
        </Reveal>

        <div ref={ref} className="relative mt-16 pl-8 sm:pl-14 md:pl-20">
          {/* Animated vertical line */}
          <div className="pointer-events-none absolute left-[11px] top-0 h-full w-px sm:left-[19px] md:left-[27px]">
            <span className="block h-full w-px bg-white/10" />
            <motion.span
              style={{ height: lineHeight }}
              className="absolute inset-x-0 top-0 block w-px bg-gradient-to-b from-gold-300 via-gold-200 to-transparent"
            />
          </div>

          <ul className="space-y-12 md:space-y-20 lg:space-y-28">
            {process.stages.map((step, i) => (
              <motion.li
                key={step.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.8, ease: [0.2, 0.7, 0.2, 1] }}
                className="relative"
              >
                {/* Dot */}
                <span className="absolute -left-[29px] top-2.5 block h-2.5 w-2.5 rounded-full border-2 border-ink bg-gold-300 shadow-gold sm:-left-[37px] sm:top-3 sm:h-3 sm:w-3 md:-left-[45px]" />

                <p className="mb-1 text-[10px] uppercase tracking-[0.3em] text-gold-200/60 sm:text-[11px]">
                  Step {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="font-display text-2xl text-white sm:text-3xl md:text-4xl">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/70 sm:text-base">
                  {step.body}
                </p>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
