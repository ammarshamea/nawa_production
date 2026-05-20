"use client";

import { motion } from "framer-motion";
import { ValueIcon } from "@/components/icons/ValueIcons";
import { values } from "@/lib/content";
import { Reveal } from "@/components/motion/Reveal";
import { SectionWatermark } from "@/components/SectionWatermark";

export function Values() {
  return (
    <section id="values" className="relative bg-ink py-24 md:py-32 lg:py-44">
      <SectionWatermark position="center" />
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
          <div>
            <Reveal>
              <p className="text-xs uppercase tracking-[0.32em] text-gold-200/80">Our Values</p>
            </Reveal>
            <Reveal delay={0.05}>
              <h2 className="mt-5 max-w-2xl font-display text-4xl leading-[1] text-white sm:text-5xl md:text-6xl lg:text-7xl">
                The principles
                <br />
                <span className="italic text-gold-200">behind every frame</span>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <p className="max-w-sm text-sm leading-relaxed text-white/60">
              Five commitments that shape every collaboration, every brief, and every final cut we deliver.
            </p>
          </Reveal>
        </div>

        <ul className="mt-12 grid gap-4 sm:grid-cols-2 sm:gap-6 lg:grid-cols-5">
          {values.map((value, i) => (
            <motion.li
              key={value.title}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.2, 0.7, 0.2, 1] }}
              className="group relative flex h-full flex-col rounded-2xl border border-white/10 bg-ink-soft/60 p-6 transition-colors hover:border-gold-300/40"
            >
              <span className="mt-0 flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-gold-300/40 text-gold-200/90 transition-all duration-500 group-hover:border-gold-300 group-hover:text-gold-100 group-hover:shadow-gold">
                <span className="transition-transform duration-500 group-hover:scale-110">
                  <ValueIcon title={value.title} />
                </span>
              </span>
              <h3 className="mt-8 font-display text-2xl text-white">{value.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-white/65">{value.body}</p>
              <span className="pointer-events-none absolute inset-x-6 bottom-0 h-px origin-left scale-x-0 bg-gradient-to-r from-gold-300 via-gold-200 to-transparent transition-transform duration-500 group-hover:scale-x-100" />
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
