import type { JourneyStage } from "@/lib/content";

type MotionKey = JourneyStage["motionKey"];

type ScrubTarget = Element | Element[] | NodeListOf<Element> | string | null;
type ScrubTimeline = {
  fromTo: (
    target: ScrubTarget,
    fromVars: Record<string, unknown>,
    toVars: Record<string, unknown>,
    position?: number | string,
  ) => ScrubTimeline;
  to: (target: ScrubTarget, vars: Record<string, unknown>, position?: number | string) => ScrubTimeline;
};

/** Scroll-scrubbed camera moves — each scene feels like a held film shot. */
export function sceneCameraMove(
  tl: ScrubTimeline,
  target: Element | null,
  motionKey: MotionKey,
  at: number,
  duration = 1,
) {
  if (!target) return;

  const ease = "none";

  switch (motionKey) {
    case "documentsSlide":
      tl.fromTo(target, { scale: 1.14, x: "3%" }, { scale: 1.08, x: "-4%", duration, ease }, at);
      break;
    case "storyboardStrip":
      tl.fromTo(target, { scale: 1.1, x: "5%" }, { scale: 1.06, x: "-5%", duration, ease }, at);
      break;
    case "checklistFill":
      tl.fromTo(target, { scale: 1.18, y: "2%" }, { scale: 1.05, y: "0%", duration, ease }, at);
      break;
    case "dollyMove":
      tl.fromTo(target, { scale: 1.22, y: "1%" }, { scale: 1.06, y: "-3%", duration, ease }, at);
      break;
    case "lightSweep":
      tl.fromTo(target, { scale: 1.12 }, { scale: 1.07, duration, ease }, at);
      break;
    case "colorGrade":
      tl.fromTo(
        target,
        { scale: 1.1, filter: "saturate(0.55) contrast(1.15) brightness(0.85)" },
        { scale: 1.05, filter: "saturate(1.15) contrast(1.05) brightness(1)", duration, ease },
        at,
      );
      break;
    case "frameMultiply":
      tl.fromTo(target, { scale: 1.08 }, { scale: 1.14, duration: duration * 0.5, ease }, at);
      tl.to(target, { scale: 1.06, duration: duration * 0.5, ease }, at + duration * 0.5);
      break;
    case "screenExpand":
      tl.fromTo(target, { scale: 1.04 }, { scale: 1.1, duration, ease }, at);
      break;
    default:
      tl.fromTo(target, { scale: 1.12 }, { scale: 1.06, duration, ease }, at);
  }
}

/** Subtle camera moves for mobile — keeps full image visible with object-contain. */
export function sceneCameraMoveMobile(
  tl: ScrubTimeline,
  target: Element | null,
  motionKey: MotionKey,
  at: number,
  duration = 1,
) {
  if (!target) return;

  const ease = "none";

  switch (motionKey) {
    case "colorGrade":
      tl.fromTo(
        target,
        { scale: 1, filter: "saturate(0.65) contrast(1.05) brightness(0.88)" },
        { scale: 1.02, filter: "saturate(1.1) contrast(1.02) brightness(1)", duration, ease },
        at,
      );
      break;
    case "documentsSlide":
      tl.fromTo(target, { scale: 1, x: "1%" }, { scale: 1.02, x: "-1%", duration, ease }, at);
      break;
    case "storyboardStrip":
      tl.fromTo(target, { scale: 1, x: "1.5%" }, { scale: 1.02, x: "-1.5%", duration, ease }, at);
      break;
    case "dollyMove":
      tl.fromTo(target, { scale: 1, y: "0.5%" }, { scale: 1.03, y: "-0.5%", duration, ease }, at);
      break;
    case "screenExpand":
      tl.fromTo(target, { scale: 1 }, { scale: 1.03, duration, ease }, at);
      break;
    default:
      tl.fromTo(target, { scale: 1 }, { scale: 1.02, duration, ease }, at);
  }
}

export function revealStageText(tl: ScrubTimeline, panel: HTMLElement, at: number) {
  const parts = panel.querySelectorAll<HTMLElement>("[data-j-part]");
  tl.fromTo(
    parts,
    { opacity: 0, y: 14, filter: "blur(4px)" },
    {
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      duration: 0.55,
      stagger: 0.04,
      ease: "power2.out",
    },
    at,
  );
}

export function softenStageText(tl: ScrubTimeline, panel: HTMLElement, at: number) {
  const parts = panel.querySelectorAll<HTMLElement>("[data-j-part]");
  tl.to(
    parts,
    { opacity: 0, y: -10, filter: "blur(3px)", duration: 0.4, stagger: 0.02, ease: "power2.inOut" },
    at,
  );
}

/** Overlapping crossfade — one continuous scene, no black cut. */
export function crossfadeStage(
  tl: ScrubTimeline,
  prevLayer: Element | null,
  layer: Element | null,
  prevPanel: HTMLElement | null,
  panel: HTMLElement | null,
  at: number,
) {
  const crossAt = at - 0.22;

  if (prevLayer && layer) {
    tl.to(prevLayer, { opacity: 0, duration: 0.65, ease: "power2.inOut" }, crossAt);
    tl.to(layer, { opacity: 1, duration: 0.65, ease: "power2.inOut" }, crossAt);
  }

  if (prevPanel) {
    softenStageText(tl, prevPanel, crossAt);
    tl.to(prevPanel, { opacity: 0, duration: 0.45, ease: "power2.inOut" }, crossAt + 0.05);
  }

  if (panel) {
    tl.to(panel, { opacity: 1, duration: 0.45, ease: "power2.inOut" }, crossAt + 0.1);
    revealStageText(tl, panel, crossAt + 0.18);
  }
}

export function hideStageText(tl: ScrubTimeline, panel: HTMLElement, at: number) {
  const parts = panel.querySelectorAll<HTMLElement>("[data-j-part]");
  tl.to(
    parts,
    { opacity: 0, y: -18, filter: "blur(6px)", duration: 0.28, stagger: 0.03, ease: "power2.in" },
    at,
  );
}
