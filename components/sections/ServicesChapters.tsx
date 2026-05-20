"use client";

import Image from "next/image";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { services, servicesIntro } from "@/lib/content";
import { assetPath } from "@/lib/assetPath";
import { Reveal } from "@/components/motion/Reveal";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function waitForImages(container: HTMLElement) {
  const imgs = container.querySelectorAll("img");
  return Promise.all(
    Array.from(imgs).map(
      (img) =>
        img.complete
          ? Promise.resolve()
          : new Promise<void>((resolve) => {
              img.addEventListener("load", () => resolve(), { once: true });
              img.addEventListener("error", () => resolve(), { once: true });
            })
    )
  );
}

export function ServicesChapters() {
  const trackRef = useRef<HTMLDivElement | null>(null);
  const panelsRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (typeof window === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const track = trackRef.current;
    const panels = panelsRef.current;
    if (!track || !panels) return;

    const mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", () => {
      let ctx: gsap.Context | undefined;
      let cancelled = false;

      const build = () => {
        ctx?.revert();
        ctx = gsap.context(() => {
          const scrollDistance = () =>
            Math.max(0, panels.scrollWidth - window.innerWidth);

          gsap.to(panels, {
            x: () => -scrollDistance(),
            ease: "none",
            scrollTrigger: {
              trigger: track,
              start: "top top",
              end: () => "+=" + scrollDistance(),
              scrub: 1,
              pin: true,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });
        }, track);
        ScrollTrigger.refresh();
      };

      waitForImages(panels).then(() => {
        if (cancelled) return;
        requestAnimationFrame(() => {
          if (cancelled) return;
          build();
        });
      });

      const onResize = () => ScrollTrigger.refresh();
      window.addEventListener("resize", onResize);
      window.addEventListener("load", onResize);

      return () => {
        cancelled = true;
        window.removeEventListener("resize", onResize);
        window.removeEventListener("load", onResize);
        ctx?.revert();
      };
    });

    return () => mm.revert();
  }, []);

  return (
    <section id="services" className="relative bg-ink">
      <div className="relative z-10 mx-auto max-w-7xl px-5 py-20 sm:px-6 md:py-44">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.32em] text-gold-200/80">Services</p>
        </Reveal>
        <Reveal delay={0.05}>
          <h2 className="mt-6 font-display text-4xl leading-[1] text-white sm:text-5xl md:text-7xl lg:text-[7rem]">
            {servicesIntro.title}
          </h2>
        </Reveal>
        <Reveal delay={0.15}>
          <p className="mt-8 max-w-2xl text-base leading-relaxed text-white/70 md:text-lg">
            {servicesIntro.body}
          </p>
        </Reveal>
      </div>

      <div ref={trackRef} className="relative z-10 lg:h-[100svh]">
        <div ref={panelsRef} className="flex flex-col lg:h-full lg:flex-row">
          {services.map((s, i) => (
            <article
              key={s.title}
              className="service-panel relative flex min-h-[80svh] w-full shrink-0 items-end overflow-hidden lg:min-h-0 lg:h-full lg:w-screen"
            >
              <div className="absolute inset-0 -z-10">
                <Image
                  src={assetPath(s.image)}
                  alt=""
                  fill
                  priority={i === 0}
                  className="object-cover object-center"
                  sizes="100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink-deep via-ink-deep/85 to-ink-deep/30" />
                <div className="absolute inset-0 bg-gradient-to-r from-ink-deep/80 via-transparent to-transparent" />
              </div>

              <div className="mx-auto w-full max-w-7xl px-6 pb-24 pt-32 lg:pb-32 lg:pt-40">
                <div className="max-w-4xl">
                  <h3 className="font-display text-4xl leading-[1.05] text-white md:text-5xl lg:text-6xl">
                    {s.title}
                  </h3>
                  <p className="mt-6 max-w-2xl text-base leading-[1.7] text-white/80 md:text-lg">
                    {s.body}
                  </p>

                  {s.bullets && (
                    <ul className="mt-8 grid gap-3 text-sm text-white/75 sm:grid-cols-2">
                      {s.bullets.map((b) => (
                        <li key={b} className="flex gap-3">
                          <span className="mt-2 block h-px w-5 flex-none bg-gold-300/60" />
                          <span>{b}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {s.closing && (
                    <p className="mt-8 max-w-2xl text-sm italic text-gold-200/80 md:text-base">
                      {s.closing}
                    </p>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
