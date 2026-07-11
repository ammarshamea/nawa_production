"use client";

import dynamic from "next/dynamic";
import { ProductionJourneyLanding } from "@/components/cinematic/ProductionJourneyLanding";
import { useReducedMotion } from "@/hooks/useReducedMotion";

const ProductionJourneyCinematic = dynamic(
  () =>
    import("@/components/cinematic/ProductionJourneyCinematic").then(
      (mod) => mod.ProductionJourneyCinematic,
    ),
  {
    ssr: false,
    loading: () => (
      <section id="process" className="relative min-h-0 bg-ink-deep" aria-hidden />
    ),
  },
);

export function ProductionJourney() {
  const reduce = useReducedMotion();

  if (reduce) {
    return <ProductionJourneyLanding />;
  }

  return <ProductionJourneyCinematic />;
}
