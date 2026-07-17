"use client";

import { motion } from "framer-motion";
import { useContent, useLanguage } from "@/lib/i18n/LanguageProvider";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { clientsList } from "@/lib/content";
import { Reveal } from "@/components/motion/Reveal";
import { ClientsMarquee, ClientsStaticGrid } from "@/components/sections/ClientsSlider";

export function Clients() {
  const { clients } = useContent();
  const { isRtl } = useLanguage();
  const reduceMotion = useReducedMotion();

  return (
    <section id="clients" className="relative overflow-hidden bg-ink-deep py-24 md:py-32 lg:py-40">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_45%_at_50%_0%,rgba(56,6,56,0.18),transparent_72%)]"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6">
        <div className="max-w-2xl">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.32em] text-gold-200/80">{clients.label}</p>
          </Reveal>
          <Reveal delay={0.05}>
            <h2 className="mt-5 font-display text-4xl leading-[1] text-white sm:text-5xl md:text-6xl">
              {clients.title}
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-6 text-sm leading-relaxed text-white/60">{clients.body}</p>
          </Reveal>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
          className="nawa-clients-panel"
        >
          {reduceMotion ? (
            <ClientsStaticGrid />
          ) : (
            <ClientsMarquee reverse={isRtl} />
          )}

          <ul className="sr-only">
            {clientsList.map((client) => (
              <li key={client.driveId ?? client.name}>{client.name}</li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  );
}
