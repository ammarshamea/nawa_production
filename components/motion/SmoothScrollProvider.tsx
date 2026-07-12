"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollToSection } from "@/lib/assetPath";
import {
  LOCALE_CHANGE_EVENT,
  refreshScrollTriggersPreservingPosition,
} from "@/lib/i18n/scrollSync";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ limitCallbacks: true, ignoreMobileResize: true });
}

function resetScrollPosition(lenis?: Lenis | null) {
  window.scrollTo(0, 0);
  lenis?.scrollTo(0, { immediate: true });
}

/** Lenis.raf expects DOM timestamp in milliseconds; GSAP ticker passes elapsed time in seconds. */
export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (typeof window === "undefined") return;

    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (reduce) {
      if (window.scrollY === 0) {
        resetScrollPosition();
      }

      const onLocaleChange = () => {
        requestAnimationFrame(() => refreshScrollTriggersPreservingPosition(true));
      };
      window.addEventListener(LOCALE_CHANGE_EVENT, onLocaleChange);
      requestAnimationFrame(() => refreshScrollTriggersPreservingPosition(true));
      return () => window.removeEventListener(LOCALE_CHANGE_EVENT, onLocaleChange);
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => 1 - Math.pow(1 - t, 3),
      wheelMultiplier: 0.9,
      touchMultiplier: 1.2,
      smoothWheel: true,
      syncTouch: true,
      anchors: false,
    });

    if (window.scrollY === 0) {
      resetScrollPosition(lenis);
    }

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

    const onLoad = () => {
      if (window.scrollY > 0) {
        lenis.resize();
        refreshScrollTriggersPreservingPosition(true);
        return;
      }
      resetScrollPosition(lenis);
      ScrollTrigger.refresh();
    };

    if (document.readyState === "complete") {
      onLoad();
    } else {
      window.addEventListener("load", onLoad);
    }

    const onLocaleChange = () => {
      const scrollY = window.scrollY;
      lenis.resize();
      requestAnimationFrame(() => {
        refreshScrollTriggersPreservingPosition(true);
        lenis.resize();
        if (scrollY > 0) {
          lenis.scrollTo(scrollY, { immediate: true });
        }
      });
    };
    window.addEventListener(LOCALE_CHANGE_EVENT, onLocaleChange);

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("load", onLoad);
      window.removeEventListener(LOCALE_CHANGE_EVENT, onLocaleChange);
      document.removeEventListener("click", onAnchorClick);
      gsap.ticker.remove(onGsapTick);
      lenis.destroy();
      ScrollTrigger.refresh();
    };
  }, []);

  return <>{children}</>;
}
