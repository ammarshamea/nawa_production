"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { about } from "@/lib/content";
import { assetPath } from "@/lib/assetPath";
import { Reveal } from "@/components/motion/Reveal";
import { SectionWatermark } from "@/components/SectionWatermark";

export function About() {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  return (
    <section
      id="about"
      ref={ref}
      className="relative overflow-hidden bg-ink-deep py-24 md:py-32 lg:py-44"
    >
      <SectionWatermark position="right" />
      <motion.div style={{ y }} className="absolute inset-0 -z-10">
        <Image
          src={assetPath("/assets/photos/about-saudi-horizon.png")}
          alt=""
          fill
          className="object-cover object-center opacity-25"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-ink-deep via-ink-deep/80 to-transparent" />
      </motion.div>

      <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-5 sm:px-6 lg:gap-16 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.32em] text-gold-200/80">Story</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 font-display text-4xl leading-[1] text-white sm:text-5xl md:text-6xl lg:text-7xl">
              About
              <br />
              <span className="bg-gold-sheen bg-clip-text italic text-transparent">
                Nawa
              </span>
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <span className="mt-8 block h-px w-24 bg-gold-300/60" />
          </Reveal>
        </div>

        <div className="lg:col-span-7 lg:col-start-6">
          <Reveal delay={0.1}>
            <p className="text-lg leading-[1.7] text-white/80 md:text-xl">{about.body}</p>
          </Reveal>

          <div className="mt-12 grid grid-cols-2 gap-8 text-white/70 md:grid-cols-3">
            <Reveal delay={0.2}>
              <p className="text-xs uppercase tracking-[0.25em] text-gold-200/70">Founded</p>
              <p className="mt-2 font-display text-3xl text-white">Saudi Arabia</p>
            </Reveal>
            <Reveal delay={0.3}>
              <p className="text-xs uppercase tracking-[0.25em] text-gold-200/70">Experience</p>
              <p className="mt-2 font-display text-3xl text-white">6+ Years</p>
            </Reveal>
            <Reveal delay={0.4}>
              <p className="text-xs uppercase tracking-[0.25em] text-gold-200/70">Reach</p>
              <p className="mt-2 font-display text-3xl text-white">Global</p>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
