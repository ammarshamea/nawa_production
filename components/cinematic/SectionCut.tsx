"use client";

type Props = {
  ref?: React.RefObject<HTMLDivElement | null>;
  className?: string;
};

export function SectionCut({ ref, className = "" }: Props) {
  return (
    <div
      ref={ref}
      className={`pointer-events-none absolute inset-0 z-30 bg-black opacity-0 ${className}`}
      aria-hidden
    />
  );
}
