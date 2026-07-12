import { ScrollTrigger } from "gsap/ScrollTrigger";

export const LOCALE_CHANGE_EVENT = "nawa:locale-change";

export function notifyLocaleChange() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(LOCALE_CHANGE_EVENT));
}

export function subscribeLocaleChange(handler: () => void) {
  if (typeof window === "undefined") return () => {};
  window.addEventListener(LOCALE_CHANGE_EVENT, handler);
  return () => window.removeEventListener(LOCALE_CHANGE_EVENT, handler);
}

/** Run ScrollTrigger.refresh without jumping the user back to the top. */
export function refreshScrollTriggersPreservingPosition(safe = true) {
  if (typeof window === "undefined") return;

  const scrollY = window.scrollY;

  if (safe) {
    ScrollTrigger.refresh(true);
  } else {
    ScrollTrigger.refresh();
  }

  if (scrollY > 0) {
    window.scrollTo(0, scrollY);
  }
}
