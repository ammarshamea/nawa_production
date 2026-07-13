"use client";

import { ProductionJourneyHorizontal } from "@/components/cinematic/ProductionJourneyHorizontal";
import { ProductionJourneyLanding } from "@/components/cinematic/ProductionJourneyLanding";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function ProductionJourney() {
  const reduce = useReducedMotion();

  if (reduce) {
    return <ProductionJourneyLanding />;
  }

  return <ProductionJourneyHorizontal />;
}
