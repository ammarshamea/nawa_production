"use client";

import type { BilingualBlockProps } from "@/lib/bilingual";

export function BilingualBlock({
  en,
  ar,
  layout = "stack",
  enClassName = "",
  arClassName = "",
  className = "",
}: BilingualBlockProps) {
  if (layout === "split") {
    return (
      <div className={`grid gap-6 md:grid-cols-2 md:gap-10 ${className}`}>
        <p className={enClassName} lang="en">
          {en}
        </p>
        <p className={`font-body-ar text-right ${arClassName}`} lang="ar" dir="rtl">
          {ar}
        </p>
      </div>
    );
  }

  return (
    <div className={`space-y-4 ${className}`}>
      <p className={enClassName} lang="en">
        {en}
      </p>
      <p className={`font-body-ar text-right leading-relaxed ${arClassName}`} lang="ar" dir="rtl">
        {ar}
      </p>
    </div>
  );
}
