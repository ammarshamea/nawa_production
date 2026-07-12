"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { clientsList } from "@/lib/content";
import { useContent } from "@/lib/i18n/LanguageProvider";
import { assetPath } from "@/lib/assetPath";
import { driveThumbnailUrls } from "@/lib/drive";
import { Reveal } from "@/components/motion/Reveal";
import { SectionWatermark } from "@/components/SectionWatermark";

function ClientLogo({
  name,
  driveId,
  logo,
  fit = "cover",
}: {
  name: string;
  driveId?: string;
  logo?: string;
  fit?: "cover" | "contain";
}) {
  const sources = logo
    ? [assetPath(logo)]
    : driveId
      ? driveThumbnailUrls(driveId)
      : [];
  const [srcIndex, setSrcIndex] = useState(0);
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span className="absolute inset-0 flex items-center justify-center p-4 text-center font-display text-sm text-white/55 transition-colors duration-500 group-hover:text-gold-200 sm:text-base">
        {name}
      </span>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={sources[srcIndex]}
      alt={name}
      loading="lazy"
      decoding="async"
      onError={() => {
        if (srcIndex < sources.length - 1) {
          setSrcIndex((i) => i + 1);
        } else {
          setFailed(true);
        }
      }}
      className={`absolute inset-0 size-full object-center opacity-85 brightness-110 contrast-125 transition-all duration-500 group-hover:scale-[1.03] group-hover:opacity-100 object-contain p-3 sm:p-4 ${
        fit === "cover" ? "md:object-cover md:p-0" : ""
      }`}
    />
  );
}

export function Clients() {
  const { clients } = useContent();

  return (
    <section id="clients" className="relative overflow-hidden bg-ink-deep py-24 md:py-32 lg:py-40">
      <SectionWatermark position="right" />
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

        <ul className="mt-12 grid w-full grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:gap-5">
          {clientsList.map((client, i) => (
            <motion.li
              key={client.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className={`group relative aspect-[4/3] overflow-hidden rounded-xl border border-white/10 bg-ink-deep transition-colors hover:border-gold-300/30 sm:aspect-[5/3] ${
                clientsList.length % 3 === 2 && i === clientsList.length - 2
                  ? "sm:col-start-2"
                  : ""
              }`}
            >
              <ClientLogo
                name={client.name}
                driveId={client.driveId}
                logo={client.logo}
                fit={client.fit ?? "cover"}
              />
              <span className="pointer-events-none absolute inset-x-4 bottom-3 h-px origin-left scale-x-0 bg-gradient-to-r from-gold-300 via-gold-200 to-transparent transition-transform duration-500 group-hover:scale-x-100 sm:inset-x-5 sm:bottom-4" />
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
