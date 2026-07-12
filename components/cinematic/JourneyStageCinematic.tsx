"use client";

import type { ProcessStage } from "@/lib/locales/types";

type Props = {
  stage: ProcessStage;
};

export function JourneyStageCinematic({ stage }: Props) {
  return (
    <div className="max-w-3xl">
      <h3
        data-j-part
        className="font-display text-2xl leading-[1.05] text-studio-white sm:text-3xl md:text-5xl lg:text-6xl"
      >
        {stage.title}
      </h3>
      <div data-j-part className="mt-5 max-w-xl border-s border-studio-gold/40 ps-6 md:mt-6 md:ps-8">
        <p className="text-sm leading-relaxed text-studio-white/85 md:text-base md:leading-[1.75]">{stage.body}</p>
      </div>
    </div>
  );
}
