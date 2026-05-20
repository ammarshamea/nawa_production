"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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

    ScrollTrigger.scrollerProxy(document.documentElement, {
      scrollTop(value?: number) {
        if (arguments.length && value !== undefined) {
          lenis.scrollTo(value, { immediate: true });
        }
        return lenis.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
      pinType: document.documentElement.style.transform ? "transform" : "fixed",
    });

    const onResize = () => {
      lenis.resize();
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize);

    ScrollTrigger.refresh();

    return () => {
      window.removeEventListener("resize", onResize);
      gsap.ticker.remove(onGsapTick);
      lenis.destroy();
      ScrollTrigger.refresh();
    };
  }, []);

  return <>{children}</>;
}
