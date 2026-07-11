"use client";

import { useLayoutEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

/** Re-anchor scroll after dynamic sections (e.g. Process pin) mount so reload stays at hero. */
export function ScrollAnchor() {
  useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    const reset = () => {
      window.scrollTo(0, 0);
      ScrollTrigger.refresh();
    };

    reset();
    const t = window.setTimeout(reset, 0);

    return () => window.clearTimeout(t);
  }, []);

  return null;
}
