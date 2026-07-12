"use client";

import type { ProcessStage } from "@/lib/locales/types";

type Props = {
  stage: ProcessStage;
  total?: number;
  variant?: "overlay" | "stack";
};

export function JourneyStagePanel({ stage, variant = "overlay" }: Props) {
  if (variant === "stack") {
    return (
      <div className="flex h-full flex-col justify-end">
        <h3 className="font-display text-3xl text-studio-white md:text-4xl">{stage.title}</h3>
        <span className="mt-6 block h-px w-16 bg-studio-gold/60" />
        <p className="mt-6 max-w-lg text-sm leading-relaxed text-studio-muted md:text-base">{stage.body}</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      <h3 className="font-display text-3xl leading-[1.05] text-studio-white sm:text-4xl md:text-5xl lg:text-6xl">
        {stage.title}
      </h3>
      <div className="mt-5 max-w-xl border-s border-studio-gold/40 ps-5 md:mt-6">
        <p className="text-sm leading-relaxed text-studio-white/85 md:text-base">{stage.body}</p>
      </div>
    </div>
  );
}
