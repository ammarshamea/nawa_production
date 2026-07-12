"use client";

import Image from "next/image";
import Link from "next/link";
import { useContent } from "@/lib/i18n/LanguageProvider";
import { assetPath, sectionHref } from "@/lib/assetPath";
import { FilmGrain } from "@/components/cinematic/FilmGrain";

export function ContactStudio() {
  const { brand, contact } = useContent();

  return (
    <section id="contact" className="relative min-h-[80svh] min-h-[80dvh] overflow-hidden bg-black supports-[height:100dvh]:min-h-[80dvh]">
      <div className="absolute inset-0">
        <Image
          src={assetPath(contact.image)}
          alt=""
          fill
          loading="lazy"
          className="object-contain object-center opacity-50 md:object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40" />
        <FilmGrain />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[80svh] max-w-4xl flex-col justify-end px-6 pb-16 pt-32 md:px-12 md:pb-20">
        <p className="text-[10px] uppercase tracking-[0.35em] text-studio-gold">{contact.label}</p>

        <h2 className="mt-4 font-display text-4xl leading-[1.05] text-studio-white md:text-6xl lg:text-7xl">
          {contact.title}
        </h2>

        <p className="mt-6 max-w-xl text-sm text-studio-white/80 md:text-base">{contact.body}</p>

        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-4">
          <Link
            href={contact.ctaPrimary.href}
            className="inline-flex items-center rounded-full border border-studio-gold/50 bg-studio-gold/10 px-8 py-3.5 text-xs uppercase tracking-[0.22em] text-studio-gold transition-colors hover:bg-studio-gold/20"
          >
            {contact.ctaPrimary.label}
          </Link>
          <Link
            href={sectionHref(contact.ctaSecondary.href)}
            className="inline-flex items-center rounded-full border border-white/15 px-8 py-3.5 text-xs uppercase tracking-[0.22em] text-white/80 transition-colors hover:border-white/30"
          >
            {contact.ctaSecondary.label}
          </Link>
        </div>

        <ul className="mt-12 grid gap-px overflow-hidden rounded-xl border border-white/10 bg-white/5 sm:grid-cols-2 lg:grid-cols-3">
          {contact.items.map((item) => (
            <li key={item.label} className="bg-black/80 p-5 backdrop-blur-sm">
              <p className="text-[10px] uppercase tracking-[0.28em] text-studio-gold/70">{item.label}</p>
              {item.href ? (
                <a
                  href={item.href}
                  className="mt-2 block text-sm text-studio-white transition-colors hover:text-studio-gold"
                >
                  {item.value}
                </a>
              ) : (
                <p className="mt-2 text-sm text-studio-white">{item.value}</p>
              )}
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-col items-center gap-4 border-t border-white/10 pt-10">
          <Image
            src={assetPath("/assets/brand/logo-nawa-gold.png")}
            alt={brand.name}
            width={100}
            height={40}
            className="h-10 w-auto opacity-90"
          />
          <p className="text-center text-sm italic text-studio-muted">{contact.closing}</p>
          <p className="text-[10px] uppercase tracking-[0.35em] text-white/30">
            {brand.name} — {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </section>
  );
}
