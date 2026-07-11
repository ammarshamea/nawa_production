"use client";

type Props = {
  className?: string;
  active?: boolean;
};

export function LightSweep({ className = "", active = false }: Props) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden ${className} ${
        active ? "light-sweep-active" : ""
      }`}
      aria-hidden
    >
      <div className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-studio-gold/35 to-transparent blur-sm" />
    </div>
  );
}
