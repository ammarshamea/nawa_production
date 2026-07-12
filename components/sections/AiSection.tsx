"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useContent, useLanguage } from "@/lib/i18n/LanguageProvider";
import { assetPath } from "@/lib/assetPath";
import { Reveal } from "@/components/motion/Reveal";
import { SectionWatermark } from "@/components/SectionWatermark";

export function AiSection() {
  const { services } = useContent();
  const { isRtl } = useLanguage();
  const ai = services.items[3];
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <section
      id="ai"
      ref={ref}
      className="relative overflow-hidden bg-ink-deep py-24 md:py-32 lg:py-44"
    >
      <SectionWatermark position="right" />
      <motion.div style={{ y }} className="absolute inset-0 -z-10">
        <Image
          src={assetPath(ai.image)}
          alt=""
          fill
          className="object-cover object-center opacity-40"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-deep via-ink-deep/85 to-ink-deep" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_40%,_rgba(123,69,200,0.35),_transparent_55%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_60%,_rgba(221,181,90,0.25),_transparent_55%)]" />
      </motion.div>

      <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-5 sm:px-6 lg:gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.32em] text-gold-200/80">
              {isRtl ? "الابتكار" : "Innovation"}
            </p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 font-display text-4xl leading-[1] text-white sm:text-5xl md:text-6xl lg:text-7xl">
              {ai.title}
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-8 text-base leading-[1.7] text-white/80 md:text-lg">{ai.body}</p>
          </Reveal>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.32em] text-gold-200/80">
              {ai.bulletsIntro}
            </p>
          </Reveal>
          <ul className="mt-8 space-y-6">
            {ai.bullets?.map((cap, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: isRtl ? -24 : 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.7, delay: i * 0.08, ease: [0.2, 0.7, 0.2, 1] }}
                className="border-s border-gold-300/30 ps-6"
              >
                <p className="text-base leading-relaxed text-white/80">{cap}</p>
              </motion.li>
            ))}
          </ul>

          {ai.closing && (
            <Reveal delay={0.2}>
              <p className="mt-12 border-t border-gold-300/20 pt-8 text-lg italic leading-relaxed text-gold-100 md:text-xl">
                {ai.closing}
              </p>
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
