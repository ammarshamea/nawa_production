"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { heroScene } from "@/lib/content";
import { assetPath, sectionHref } from "@/lib/assetPath";
import { en } from "@/lib/text";
import { FilmGrain } from "@/components/cinematic/FilmGrain";
import {
  runHeroIntro,
  runHeroIntroStatic,
  type HeroIntroRefs,
} from "@/components/cinematic/HeroIntroTimeline";
import { useReducedMotion } from "@/hooks/useReducedMotion";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function FocusBrackets() {
  return (
    <div className="relative h-16 w-16 md:h-20 md:w-20" aria-hidden>
      <span className="absolute left-0 top-0 h-4 w-4 border-l border-t border-studio-gold/80" />
      <span className="absolute right-0 top-0 h-4 w-4 border-r border-t border-studio-gold/80" />
      <span className="absolute bottom-0 left-0 h-4 w-4 border-b border-l border-studio-gold/80" />
      <span className="absolute bottom-0 right-0 h-4 w-4 border-b border-r border-studio-gold/80" />
    </div>
  );
}

export function HeroCinematic() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const cameraRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const focusRigRef = useRef<HTMLDivElement>(null);
  const focusPointRef = useRef<HTMLDivElement>(null);
  const bracketsRef = useRef<HTMLDivElement>(null);
  const sweepRef = useRef<HTMLDivElement>(null);
  const conceptRef = useRef<HTMLParagraphElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const ctasRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const refs: HeroIntroRefs = {
      overlay: overlayRef,
      camera: cameraRef,
      focusRig: focusRigRef,
      focusPoint: focusPointRef,
      brackets: bracketsRef,
      sweep: sweepRef,
      concept: conceptRef,
      headline: headlineRef,
      body: bodyRef,
      ctas: ctasRef,
    };

    if (reduce) {
      runHeroIntroStatic(refs);
      return;
    }

    const intro = runHeroIntro(refs);

    const mm = gsap.matchMedia();

    mm.add("(max-width: 1023px)", () => {
      if (!sectionRef.current || !cameraRef.current) return;

      gsap.fromTo(
        cameraRef.current,
        { scale: 1.04, yPercent: 0, x: "0%" },
        {
          scale: 1.09,
          yPercent: 5,
          x: "-1.5%",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.2,
          },
        },
      );

      gsap.to(conceptRef.current, {
        y: -12,
        opacity: 0.85,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.2,
        },
      });
    });

    mm.add("(min-width: 1024px)", () => {
      if (!sectionRef.current || !cameraRef.current) return;

      gsap.fromTo(
        cameraRef.current,
        { scale: 1.04, yPercent: 0, x: "0%" },
        {
          scale: 1.12,
          yPercent: 9,
          x: "-2.5%",
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1.4,
          },
        },
      );

      gsap.to([conceptRef.current, headlineRef.current], {
        y: -18,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.4,
        },
      });

      gsap.to(bodyRef.current, {
        y: -10,
        opacity: 0.92,
        ease: "none",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.4,
        },
      });
    });

    return () => {
      intro.kill();
      mm.revert();
    };
  }, [reduce]);

  return (
    <section
      id="home"
      ref={sectionRef}
      className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-black supports-[height:100dvh]:min-h-[100dvh]"
    >
      <div ref={bgRef} className="absolute inset-0 -z-10 overflow-hidden bg-black">
        <div
          ref={cameraRef}
          className="absolute inset-[-12%] will-change-[transform,filter]"
          style={{ transformOrigin: "50% 45%" }}
        >
          <Image
            src={assetPath(heroScene.image)}
            alt=""
            fill
            priority
            className="object-contain object-center md:object-cover"
            sizes="100vw"
          />
        </div>
        <div className="pointer-events-none absolute inset-0 bg-purple-haze" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink-deep via-ink-deep/50 to-ink-deep/30" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_20%,rgba(212,155,100,0.12),transparent_55%)]" />
        <div className="journey-vignette pointer-events-none absolute inset-0 opacity-40 md:opacity-55" aria-hidden />
        <FilmGrain />
      </div>

      <div ref={overlayRef} className="pointer-events-none absolute inset-0 z-20 bg-black" aria-hidden />

      <div
        ref={focusRigRef}
        className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center"
      >
        <div ref={focusPointRef} className="h-1 w-1 rounded-full bg-studio-gold shadow-gold" />
        <div ref={bracketsRef} className="absolute">
          <FocusBrackets />
        </div>
        <div
          ref={sweepRef}
          className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-r from-transparent via-studio-gold/40 to-transparent blur-md"
          aria-hidden
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 pb-[max(4rem,env(safe-area-inset-bottom,0px))] pt-[max(7rem,env(safe-area-inset-top,0px)+4rem)] sm:px-6 sm:pb-20 sm:pt-36 md:pb-24">
        <p
          ref={conceptRef}
          className="text-[10px] uppercase tracking-[0.38em] text-studio-gold sm:text-xs"
        >
          {en(heroScene.concept)}
        </p>

        <h1
          ref={headlineRef}
          className="mt-6 max-w-3xl font-display text-4xl leading-[0.95] text-studio-white sm:text-5xl md:text-6xl lg:text-7xl"
        >
          {en(heroScene.headline)}
        </h1>

        <p ref={bodyRef} className="mt-8 max-w-2xl text-sm leading-relaxed text-studio-muted md:text-base">
          {en(heroScene.supporting)}
        </p>

        <div ref={ctasRef} className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
          <Link
            href={sectionHref(heroScene.ctaPrimary.href)}
            className="inline-flex items-center justify-center rounded-full border border-studio-gold/50 bg-studio-gold/10 px-8 py-3.5 text-xs uppercase tracking-[0.22em] text-studio-gold transition-colors hover:border-studio-gold hover:bg-studio-gold/20"
          >
            {en(heroScene.ctaPrimary.label)}
          </Link>
          <Link
            href={sectionHref(heroScene.ctaSecondary.href)}
            className="inline-flex items-center justify-center rounded-full border border-white/15 px-8 py-3.5 text-xs uppercase tracking-[0.22em] text-white/80 transition-colors hover:border-white/30"
          >
            {en(heroScene.ctaSecondary.label)}
          </Link>
        </div>
      </div>
    </section>
  );
}
