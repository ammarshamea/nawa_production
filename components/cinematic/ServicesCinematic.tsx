"use client";

import Image from "next/image";
import Link from "next/link";
import { useContent } from "@/lib/i18n/LanguageProvider";
import { assetPath, sectionHref } from "@/lib/assetPath";

function ServiceCard({
  no,
  title,
  body,
  image,
  bullets,
  bulletsIntro,
  closing,
}: {
  no: string;
  title: string;
  body: string;
  image: string;
  bullets?: string[];
  bulletsIntro?: string;
  closing?: string;
}) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-black/40 transition-colors hover:border-studio-gold/30">
      <div className="relative aspect-[16/10] shrink-0 overflow-hidden bg-black/50">
        <Image
          src={assetPath(image)}
          alt={title}
          fill
          className="object-cover object-center transition-transform duration-700 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
        <span className="absolute start-5 top-4 font-display text-4xl leading-none text-studio-gold/30 md:text-5xl">
          {no}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6 md:p-7">
        <h3 className="font-display text-xl text-studio-white md:text-2xl">{title}</h3>
        <div className="mt-4 flex-1 border-s border-studio-gold/40 ps-4">
          <p className="text-sm leading-relaxed text-studio-white/80 md:text-base">{body}</p>
          {bulletsIntro && (
            <p className="mt-4 text-sm font-medium text-studio-white/85 md:text-base">{bulletsIntro}</p>
          )}
          {bullets && bullets.length > 0 && (
            <ul className="mt-3 space-y-2 text-sm text-studio-white/75 md:text-[0.9rem]">
              {bullets.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-1.5 block h-px w-3 shrink-0 bg-studio-gold/70" aria-hidden />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
          {closing && (
            <p className="mt-4 text-sm italic leading-relaxed text-studio-muted md:text-[0.9rem]">
              {closing}
            </p>
          )}
        </div>
      </div>
    </article>
  );
}

export function ServicesCinematic() {
  const { services } = useContent();

  return (
    <section id="services" className="relative border-t border-white/5 bg-ink-deep py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-purple-haze opacity-30" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12">
        <p className="text-[10px] uppercase tracking-[0.35em] text-studio-gold">{services.label}</p>
        <h2 className="mt-4 font-display text-4xl text-studio-white md:text-6xl lg:text-7xl">
          {services.title}
        </h2>
        <p className="mt-6 max-w-3xl text-sm text-studio-muted md:text-base">{services.intro}</p>

        <div className="mt-12 grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-6">
          {services.items.map((service) => (
            <ServiceCard key={service.no} {...service} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href={sectionHref("#contact")}
            className="inline-flex items-center rounded-full border border-studio-gold/40 px-8 py-3 text-xs uppercase tracking-[0.22em] text-studio-gold transition-colors hover:border-studio-gold hover:bg-studio-gold/10"
          >
            {services.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}
