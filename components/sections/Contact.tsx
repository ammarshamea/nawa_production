"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useContent } from "@/lib/i18n/LanguageProvider";
import { assetPath } from "@/lib/assetPath";
import { Reveal } from "@/components/motion/Reveal";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { SectionWatermark } from "@/components/SectionWatermark";

export function Contact() {
  const { brand, contact } = useContent();

  return (
    <section
      id="contact"
      className="relative overflow-hidden bg-gradient-to-b from-ink-deep via-plum-900/40 to-ink-deep py-24 md:py-32 lg:py-44"
    >
      <SectionWatermark position="center" />
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-gold-500/15 blur-[160px]" />
        <div className="absolute bottom-0 left-0 h-80 w-80 rounded-full bg-plum-500/25 blur-[140px]" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-5 text-center sm:px-6">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.32em] text-gold-200/80">{contact.label}</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-5 font-display text-4xl leading-[1] text-white sm:text-5xl md:text-7xl lg:text-[7rem]">
            {contact.title}
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mx-auto mt-8 max-w-2xl text-base leading-relaxed text-white/75 md:text-lg">
            {contact.body}
          </p>
        </Reveal>
        <Reveal delay={0.25}>
          <div className="mt-12 flex flex-wrap justify-center gap-5">
            <MagneticButton href={contact.ctaSecondary.href} variant="secondary">
              {contact.ctaSecondary.label}
            </MagneticButton>
          </div>
        </Reveal>

        <ul className="mx-auto mt-14 grid max-w-3xl gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 sm:grid-cols-3">
          {contact.items.map((item, i) => (
            <motion.li
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="bg-ink-deep p-6 text-left"
            >
              <p className="text-[10px] uppercase tracking-[0.3em] text-gold-200/70">{item.label}</p>
              {item.href ? (
                <a
                  href={item.href}
                  className="mt-3 block break-words text-sm text-white transition-colors hover:text-gold-200 md:text-base"
                >
                  {item.value}
                </a>
              ) : (
                <p className="mt-3 break-words text-sm text-white md:text-base">{item.value}</p>
              )}
            </motion.li>
          ))}
        </ul>

        <Reveal delay={0.3}>
          <div className="mt-14 flex flex-col items-center gap-6">
            <Image
              src={assetPath("/assets/brand/logo-nawa-gold.png")}
              alt="Nawa Production"
              width={140}
              height={70}
              className="h-14 w-auto opacity-90"
            />
            <p className="text-[10px] uppercase tracking-[0.4em] text-white/40">
              {brand.name} — {new Date().getFullYear()}
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
