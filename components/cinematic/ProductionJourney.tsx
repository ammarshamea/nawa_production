"use client";

import { ProductionJourneyLanding } from "@/components/cinematic/ProductionJourneyLanding";
import { ProductionJourneyCinematic } from "@/components/cinematic/ProductionJourneyCinematic";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export function ProductionJourney() {
  const reduce = useReducedMotion();

  if (reduce) {
    return <ProductionJourneyLanding />;
  }

  return <ProductionJourneyCinematic />;
}
