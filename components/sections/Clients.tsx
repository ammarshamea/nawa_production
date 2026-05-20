"use client";

import { motion } from "framer-motion";
import { clients } from "@/lib/content";
import { Reveal } from "@/components/motion/Reveal";
import { SectionWatermark } from "@/components/SectionWatermark";

export function Clients() {
  return (
    <section id="clients" className="relative overflow-hidden bg-ink-deep py-24 md:py-32 lg:py-40">
      <SectionWatermark position="right" />
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <Reveal>
              <p className="text-xs uppercase tracking-[0.32em] text-gold-200/80">Partners</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 max-w-2xl font-display text-4xl leading-[1] text-white sm:text-5xl md:text-6xl">
                {clients.title}
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <p className="max-w-md text-sm leading-relaxed text-white/60">{clients.body}</p>
          </Reveal>
        </div>

        <ul className="mt-12 grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/5 md:grid-cols-3">
          {clients.list.map((name, i) => (
            <motion.li
              key={name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="group relative flex h-24 items-center justify-center bg-ink-deep px-4 transition-colors hover:bg-ink-soft sm:h-32 md:h-40"
            >
              <span className="font-display text-base text-white/55 transition-all duration-500 group-hover:text-gold-200 sm:text-xl md:text-2xl">
                {name}
              </span>
              <span className="pointer-events-none absolute inset-x-8 bottom-6 h-px origin-left scale-x-0 bg-gradient-to-r from-gold-300 via-gold-200 to-transparent transition-transform duration-500 group-hover:scale-x-100" />
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
