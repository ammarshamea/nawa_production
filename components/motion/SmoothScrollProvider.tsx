"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollToSection } from "@/lib/assetPath";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/** Lenis.raf expects DOM timestamp in milliseconds; GSAP ticker passes elapsed time in seconds. */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.25,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      wheelMultiplier: 1,
      touchMultiplier: 1.2,
      smoothWheel: true,
      anchors: true,
    });

    /** Drive Lenis from the same ticker as GSAP so ScrollTrigger and smooth scroll stay in sync. */
    function onGsapTick(time: number) {
      lenis.raf(time * 1000);
    }

    gsap.ticker.add(onGsapTick);
    gsap.ticker.lagSmoothing(0);
    lenis.on("scroll", ScrollTrigger.update);

    const onAnchorClick = (e: MouseEvent) => {
      const anchor = (e.target as Element).closest("a[href*='#']");
      if (!anchor) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      const hash = href.includes("#") ? href.slice(href.indexOf("#")) : "";
      if (!hash || hash === "#") return;

      const id = hash.slice(1);
      const el = document.getElementById(id);
      if (!el) return;

      e.preventDefault();
      scrollToSection(id, lenis);
    };

    const onResize = () => lenis.resize();
    window.addEventListener("resize", onResize);
    document.addEventListener("click", onAnchorClick);

    ScrollTrigger.refresh();

    const initialHash = window.location.hash;
    if (initialHash) {
      requestAnimationFrame(() => scrollToSection(initialHash, lenis));
    }

    return () => {
      window.removeEventListener("resize", onResize);
      document.removeEventListener("click", onAnchorClick);
      gsap.ticker.remove(onGsapTick);
      lenis.destroy();
      ScrollTrigger.refresh();
    };
  }, []);

  return <>{children}</>;
}
