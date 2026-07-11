"use client";

import Image from "next/image";
import Link from "next/link";
import { contactScene, servicesScene } from "@/lib/content";
import { assetPath, sectionHref } from "@/lib/assetPath";
import { en } from "@/lib/text";

function ServiceCard({
  no,
  title,
  body,
  image,
  bullets,
  closing,
  featured = false,
}: {
  no: string;
  title: { en: string; ar: string };
  body: { en: string; ar: string };
  image: string;
  bullets?: string[];
  closing?: string;
  featured?: boolean;
}) {
  return (
    <article
      className={`group overflow-hidden rounded-2xl border border-white/10 bg-black/40 transition-colors hover:border-studio-gold/30 ${
        featured ? "lg:col-span-2 lg:grid lg:grid-cols-2 lg:items-stretch" : ""
      }`}
    >
      <div
        className={`relative overflow-hidden bg-black/50 ${
          featured ? "aspect-[4/3] sm:aspect-[16/10] lg:aspect-auto lg:min-h-full" : "aspect-[4/3] sm:aspect-[16/10]"
        }`}
      >
        <Image
          src={assetPath(image)}
          alt={en(title)}
          fill
          className="object-contain object-center transition-transform duration-700 md:object-cover md:group-hover:scale-[1.03]"
          sizes={featured ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 1024px) 100vw, 33vw"}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
      </div>

      <div className={`flex flex-col justify-end p-6 md:p-8 ${featured ? "lg:justify-center" : ""}`}>
        <span className="font-display text-4xl leading-none text-studio-gold/25 md:text-5xl">{no}</span>
        <h3 className="mt-3 font-display text-2xl text-studio-white md:text-3xl">{en(title)}</h3>
        <div className="mt-4 max-w-xl border-l border-studio-gold/40 pl-4">
          <p className="text-sm text-studio-white/80 md:text-base">{en(body)}</p>
          {bullets && bullets.length > 0 && (
            <ul className="mt-4 space-y-2 text-sm text-studio-white/75 md:text-base">
              {bullets.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="text-studio-gold/80" aria-hidden>
                    ▸
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          )}
          {closing && <p className="mt-4 text-sm leading-relaxed text-studio-muted md:text-base">{closing}</p>}
        </div>
      </div>
    </article>
  );
}

export function ServicesCinematic() {
  const [featured, ...rest] = servicesScene.items;

  return (
    <section id="services" className="relative border-t border-white/5 bg-ink-deep py-20 md:py-28">
      <div className="pointer-events-none absolute inset-0 bg-purple-haze opacity-30" />

      <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12">
        <p className="text-[10px] uppercase tracking-[0.35em] text-studio-gold">{en(servicesScene.label)}</p>
        <h2 className="mt-4 font-display text-4xl text-studio-white md:text-6xl lg:text-7xl">
          {en(servicesScene.title)}
        </h2>
        <p className="mt-6 max-w-3xl text-sm text-studio-muted md:text-base">{en(servicesScene.intro)}</p>

        <div className="mt-12 grid gap-5 lg:grid-cols-2 lg:gap-6">
          <ServiceCard {...featured} featured />
          {rest.map((service) => (
            <ServiceCard key={service.no} {...service} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href={sectionHref("#contact")}
            className="inline-flex items-center rounded-full border border-studio-gold/40 px-8 py-3 text-xs uppercase tracking-[0.22em] text-studio-gold transition-colors hover:border-studio-gold hover:bg-studio-gold/10"
          >
            {en(contactScene.ctaPrimary.label)}
          </Link>
        </div>
      </div>
    </section>
  );
}
