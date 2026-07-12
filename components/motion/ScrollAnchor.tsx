"use client";

import { useLayoutEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/** Refresh ScrollTrigger after pin sections mount — only anchor to top on a fresh load. */
export function ScrollAnchor() {
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    if (window.scrollY === 0 && !window.location.hash) {
      window.scrollTo(0, 0);
    }

    ScrollTrigger.refresh();
  }, []);

  return null;
}
