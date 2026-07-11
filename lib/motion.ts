export const EASE_CINEMATIC = "cubic-bezier(0.16, 1, 0.3, 1)";

export const DURATION = {
  micro: 0.2,
  ui: 0.4,
  scene: 0.8,
  cinematic: 1.4,
} as const;

export const GSAP_EASE = {
  out: "power3.out",
  inOut: "power2.inOut",
  expo: "expo.out",
} as const;
