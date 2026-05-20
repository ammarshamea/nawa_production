import type { ReactNode } from "react";

const s = {
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  fill: "none",
};

function IconWrap({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`h-6 w-6 ${className}`} aria-hidden>
      {children}
    </svg>
  );
}

/** Innovation — nucleus + sparks */
export function IconInnovation() {
  return (
    <IconWrap>
      <circle cx="12" cy="12" r="2" {...s} />
      <path d="M12 5v2M12 17v2M5 12h2M17 12h2" {...s} />
      <path d="M7 7l1.55 1.55M17 7l-1.55 1.55M7 17l1.55-1.55M17 17l-1.55-1.55" {...s} />
    </IconWrap>
  );
}

/** Excellence — star */
export function IconExcellence() {
  return (
    <IconWrap>
      <polygon
        points="12 2.75 15.09 8.81 21.71 9.76 17.06 13.93 18.54 21.52 12 17.71 5.46 21.52 6.94 13.93 2.29 9.76 8.91 8.81 12 2.75"
        {...s}
      />
    </IconWrap>
  );
}

/** Authenticity — aperture / honest frame */
export function IconAuthenticity() {
  return (
    <IconWrap>
      <rect x="4.75" y="4.75" width="14.5" height="14.5" rx="2" {...s} />
      <circle cx="12" cy="12" r="3.25" {...s} />
      <circle cx="12" cy="12" r="1.15" fill="currentColor" stroke="none" />
    </IconWrap>
  );
}

/** Collaboration — triangular network connecting three nodes */
export function IconCollaboration() {
  return (
    <IconWrap>
      <circle cx="12" cy="6.5" r="2.35" {...s} />
      <circle cx="6.5" cy="17" r="2.35" {...s} />
      <circle cx="17.5" cy="17" r="2.35" {...s} />
      <path d="M12 8.82L8.06 14.93M12 8.82L15.94 14.93M9.72 17.28h5.56" {...s} />
    </IconWrap>
  );
}

/** Impact — radiating arcs / imprint */
export function IconImpact() {
  return (
    <IconWrap>
      <circle cx="12" cy="12" r="2.15" {...s} />
      <circle cx="12" cy="12" r="5.25" {...s} />
      <circle cx="12" cy="12" r="8.25" {...s} />
    </IconWrap>
  );
}

const byTitle: Record<string, () => ReactNode> = {
  Innovation: IconInnovation,
  Excellence: IconExcellence,
  Authenticity: IconAuthenticity,
  Collaboration: IconCollaboration,
  Impact: IconImpact,
};

export function ValueIcon({ title }: { title: string }) {
  const Cmp = byTitle[title] ?? IconInnovation;
  return <Cmp />;
}
