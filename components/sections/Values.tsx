"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useContent } from "@/lib/i18n/LanguageProvider";
import { assetPath } from "@/lib/assetPath";
import { Reveal } from "@/components/motion/Reveal";

export function Values() {
  const { values } = useContent();

  return (
    <section id="values" className="relative overflow-hidden bg-ink py-24 md:py-32 lg:py-40">
      <div className="pointer-events-none absolute inset-0">
        <Image
          src={assetPath(values.image)}
          alt=""
          fill
          className="object-cover object-center opacity-[0.12]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/95 to-ink" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6">
        <div className="max-w-2xl">
          <Reveal>
            {values.title ? (
              <>
                <p className="text-xs uppercase tracking-[0.32em] text-gold-200/80">{values.label}</p>
                <h2 className="mt-5 font-display text-4xl leading-[1.05] text-white sm:text-5xl md:text-6xl">
                  {values.title}
                </h2>
              </>
            ) : (
              <h2 className="font-display text-4xl leading-[1.05] text-white sm:text-5xl md:text-6xl">
                {values.label}
              </h2>
            )}
          </Reveal>
        </div>

        <ol className="mt-14 space-y-0 divide-y divide-white/10 border-y border-white/10">
          {values.items.map((value, i) => (
            <motion.li
              key={value.title}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.06, ease: [0.2, 0.7, 0.2, 1] }}
              className="group grid gap-4 py-8 md:grid-cols-[5rem_12rem_1fr] md:items-start md:gap-8 md:py-10 lg:grid-cols-[6rem_14rem_1fr]"
            >
              <span className="font-display text-4xl leading-none text-white/10 transition-colors duration-500 group-hover:text-gold-200/40 md:text-5xl">
                {value.no}
              </span>
              <h3 className="font-display text-2xl text-gold-200 md:text-3xl">{value.title}</h3>
              <p className="text-sm leading-relaxed text-white/65 md:text-base md:leading-relaxed">{value.body}</p>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
