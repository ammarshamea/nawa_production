"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { hero } from "@/lib/content";
import { siteImages } from "@/lib/assets";
import { assetPath } from "@/lib/assetPath";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { SectionWatermark } from "@/components/SectionWatermark";

const headlineWords = hero.headline.split(" ");

export function Hero() {
  const reduce = useReducedMotion();

  return (
    <section
      id="home"
      className="relative isolate flex min-h-[100svh] items-center overflow-hidden"
    >
      <SectionWatermark position="center" />
      <div className="absolute inset-0 -z-10">
        <Image
          src={assetPath(siteImages.hero)}
          alt=""
          fill
          priority
          className="object-cover object-center opacity-60"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink-deep/60 via-ink/40 to-ink-deep" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(221,181,90,0.18),_transparent_60%)]" />
        <div className="pointer-events-none absolute inset-0 mix-blend-screen opacity-[0.07] [background-image:radial-gradient(rgba(255,255,255,0.5)_1px,transparent_1px)] [background-size:3px_3px]" />
      </div>

      <div className="relative mx-auto w-full max-w-7xl px-5 pt-28 pb-20 sm:px-6 sm:pt-32 md:pt-40">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.2, 0.7, 0.2, 1] }}
          className="mb-8 inline-flex items-center gap-3 text-xs uppercase tracking-[0.32em] text-gold-200/80"
        >
          <span className="h-px w-10 bg-gold-300/60" />
          Saudi Production House
        </motion.p>

        <h1 className="font-display text-5xl leading-[0.95] text-white sm:text-6xl md:text-7xl lg:text-[8.5rem]">
          {headlineWords.map((word, i) => (
            <span key={i} className="mr-3 inline-block overflow-hidden align-bottom">
              <motion.span
                className="inline-block"
                initial={reduce ? { opacity: 0 } : { y: "110%", opacity: 0 }}
                animate={reduce ? { opacity: 1 } : { y: 0, opacity: 1 }}
                transition={{
                  duration: 1,
                  delay: 0.4 + i * 0.12,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {word === "Move" ? (
                  <span className="bg-gold-sheen bg-clip-text italic text-transparent">
                    {word}
                  </span>
                ) : (
                  word
                )}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.05, ease: [0.2, 0.7, 0.2, 1] }}
          className="mt-10 max-w-xl text-base leading-relaxed text-white/75 md:text-lg"
        >
          {hero.supporting}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.25, ease: [0.2, 0.7, 0.2, 1] }}
          className="mt-12 flex flex-wrap gap-5"
        >
          <MagneticButton href={hero.ctaPrimary.href} variant="primary">
            {hero.ctaPrimary.label}
          </MagneticButton>
          <MagneticButton href={hero.ctaSecondary.href} variant="secondary">
            {hero.ctaSecondary.label}
          </MagneticButton>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-3"
      >
        <span className="text-[9px] uppercase tracking-[0.4em] text-white/40 sm:text-[10px]">Scroll</span>
        <span className="relative block h-10 w-px overflow-hidden bg-white/20 sm:h-12">
          <motion.span
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-transparent to-gold-300"
          />
        </span>
      </motion.div>
    </section>
  );
}
