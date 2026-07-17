"use client";

import Image from "next/image";
import Link from "next/link";
import { useContent, useLanguage } from "@/lib/i18n/LanguageProvider";
import { assetPath, sectionHref } from "@/lib/assetPath";
import { ContactForm } from "@/components/cinematic/ContactForm";

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-studio-gold/80" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 shrink-0 text-studio-gold/80" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden>
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
  );
}

export function ContactStudio() {
  const { brand, contact } = useContent();
  const { isRtl } = useLanguage();

  return (
    <section
      id="contact"
      dir={isRtl ? "rtl" : "ltr"}
      className="relative overflow-hidden bg-black py-24 md:py-32 lg:py-40"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{ contain: "strict", transform: "translateZ(0)" }}
      >
        <Image
          src={assetPath(contact.image)}
          alt=""
          fill
          priority
          quality={75}
          className="object-contain object-center opacity-50 md:object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/40" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12">
        <div className="grid items-start gap-12 lg:grid-cols-12 lg:gap-16 xl:gap-20">
          <div className="lg:col-span-5">
            <p className="text-[10px] uppercase tracking-[0.35em] text-studio-gold">{contact.label}</p>

            <h2 className="mt-5 font-display text-4xl leading-[1.02] text-studio-white sm:text-5xl md:text-6xl lg:text-[4.25rem]">
              {contact.title}
            </h2>

            <p className="mt-6 max-w-md text-sm leading-relaxed text-studio-muted md:text-base">
              {contact.body}
            </p>

            <ul className="mt-10 space-y-4">
              {contact.items.map((item) => (
                <li key={item.label}>
                  <div className="group flex gap-4 rounded-2xl border border-white/[0.08] bg-black/30 p-5 transition-colors hover:border-studio-gold/25 hover:bg-black/45">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-studio-gold/20 bg-studio-gold/5">
                      {item.href.startsWith("mailto:") ? <MailIcon /> : <PinIcon />}
                    </div>
                    <div className="min-w-0">
                      <p className="text-[10px] uppercase tracking-[0.28em] text-studio-gold/70">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="mt-1.5 block break-words text-sm text-studio-white transition-colors group-hover:text-studio-gold md:text-base"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="mt-1.5 text-sm text-studio-white md:text-base">{item.value}</p>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <Link
              href={sectionHref(contact.ctaSecondary.href)}
              className="mt-10 inline-flex items-center gap-2 text-xs uppercase tracking-[0.22em] text-white/50 transition-colors hover:text-studio-gold"
            >
              <span>{contact.ctaSecondary.label}</span>
              <span aria-hidden className="text-studio-gold/80">
                {isRtl ? "←" : "→"}
              </span>
            </Link>

            <p className="mt-12 hidden max-w-sm border-s border-studio-gold/30 ps-5 text-sm italic leading-relaxed text-studio-muted lg:block">
              {contact.closing}
            </p>
          </div>

          <div className="lg:col-span-7">
            <ContactForm />
          </div>
        </div>

        <footer className="mt-16 flex flex-col items-center gap-5 border-t border-white/10 pt-12 md:mt-20">
          <Image
            src={assetPath("/assets/brand/logo-nawa-gold.png")}
            alt={brand.name}
            width={120}
            height={48}
            className="h-11 w-auto opacity-90"
          />
          <p className="text-center text-sm italic text-studio-muted lg:hidden">{contact.closing}</p>
          <p className="text-[10px] uppercase tracking-[0.35em] text-white/30">
            {brand.name} — {new Date().getFullYear()}
          </p>
        </footer>
      </div>
    </section>
  );
}
