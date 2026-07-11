import type { RefObject } from "react";
import { gsap } from "gsap";
import { GSAP_EASE } from "@/lib/motion";

export type HeroIntroRefs = {
  overlay: RefObject<HTMLDivElement | null>;
  camera: RefObject<HTMLDivElement | null>;
  focusRig: RefObject<HTMLDivElement | null>;
  focusPoint: RefObject<HTMLDivElement | null>;
  brackets: RefObject<HTMLDivElement | null>;
  sweep: RefObject<HTMLDivElement | null>;
  concept: RefObject<HTMLParagraphElement | null>;
  headline: RefObject<HTMLHeadingElement | null>;
  body: RefObject<HTMLDivElement | null>;
  ctas: RefObject<HTMLDivElement | null>;
};

/** Viewfinder lock-on → pull focus → slow dolly settle, like a single camera take. */
export function runHeroIntro(refs: HeroIntroRefs, onComplete?: () => void) {
  const { overlay, camera, focusRig, focusPoint, brackets, sweep, concept, headline, body, ctas } = refs;

  const tl = gsap.timeline({
    defaults: { ease: GSAP_EASE.out },
    onComplete,
  });

  tl.set(
    [focusPoint.current, brackets.current, sweep.current, concept.current, headline.current, body.current, ctas.current].filter(
      Boolean,
    ),
    { clearProps: "all" },
  )
    .set(overlay.current, { opacity: 1 })
    .set(focusRig.current, { opacity: 1, visibility: "visible" })
    .set(camera.current, {
      scale: 1.24,
      x: "4%",
      y: "2%",
      filter: "blur(10px) saturate(0.65) brightness(0.72)",
      transformOrigin: "50% 45%",
    })
    .set(focusPoint.current, { opacity: 0, scale: 0 })
    .set(brackets.current, { opacity: 0, scale: 1.28 })
    .set(sweep.current, { xPercent: -120, opacity: 0 })
    .set(concept.current, { opacity: 0, y: 16 })
    .set(headline.current, { opacity: 0, y: 24 })
    .set([body.current, ctas.current], { opacity: 0, y: 12 })

    /* Rack focus — image softens then sharpens as brackets hunt */
    .to(
      camera.current,
      {
        scale: 1.16,
        x: "2.5%",
        y: "1%",
        filter: "blur(4px) saturate(0.88) brightness(0.88)",
        duration: 0.55,
        ease: "power2.out",
      },
      0.05,
    )
    .to(focusPoint.current, { opacity: 1, scale: 1, duration: 0.15 }, 0.12)
    .to(brackets.current, { opacity: 1, scale: 1, duration: 0.45, ease: GSAP_EASE.inOut }, 0.18)
    .to(sweep.current, { xPercent: 120, opacity: 1, duration: 0.5, ease: GSAP_EASE.inOut }, 0.38)
    .to(
      camera.current,
      {
        scale: 1.08,
        x: "0.5%",
        y: "0%",
        filter: "blur(0px) saturate(1.05) brightness(1)",
        duration: 0.7,
        ease: "power3.out",
      },
      0.42,
    )
    .to(sweep.current, { opacity: 0, duration: 0.15 }, 0.78)
    .to(focusRig.current, { opacity: 0, scale: 0.98, duration: 0.35, ease: "power2.in" }, 0.88)
    .set(focusRig.current, { visibility: "hidden" }, 1.25)
    .to(overlay.current, { opacity: 0, duration: 0.55 }, 0.52)
    /* Slow dolly settle — camera holds the frame */
    .to(
      camera.current,
      {
        scale: 1.04,
        x: "0%",
        y: "0%",
        duration: 1.1,
        ease: "power2.inOut",
      },
      0.75,
    )
    .to(concept.current, { opacity: 1, y: 0, duration: 0.35 }, 0.82)
    .to(headline.current, { opacity: 1, y: 0, duration: 0.45 }, 0.95)
    .to(body.current, { opacity: 1, y: 0, duration: 0.35 }, 1.1)
    .to(ctas.current, { opacity: 1, y: 0, duration: 0.35 }, 1.2);

  return tl;
}

export function runHeroIntroStatic(refs: HeroIntroRefs) {
  gsap.set(refs.overlay.current, { opacity: 0 });
  gsap.set(refs.focusRig.current, { opacity: 0, visibility: "hidden" });
  gsap.set(refs.camera.current, {
    scale: 1,
    x: "0%",
    y: "0%",
    filter: "none",
    clearProps: "transformOrigin",
  });
  gsap.set(
    [refs.concept.current, refs.headline.current, refs.body.current, refs.ctas.current].filter(Boolean),
    { opacity: 1, y: 0, xPercent: 0, scale: 1 },
  );
}
