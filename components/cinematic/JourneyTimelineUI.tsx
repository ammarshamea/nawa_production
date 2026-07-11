"use client";

type Props = {
  activeIndex: number;
  total: number;
  labels?: string[];
  className?: string;
};

export function JourneyTimelineUI({ activeIndex, total, className = "" }: Props) {
  return (
    <div className={`flex flex-col items-end gap-3 ${className}`} aria-hidden>
      <div className="flex flex-col gap-2">
        {Array.from({ length: total }).map((_, i) => (
          <span
            key={i}
            className={`block h-2 w-2 rounded-full transition-all duration-300 ${
              i === activeIndex
                ? "scale-125 bg-studio-gold shadow-gold"
                : i < activeIndex
                  ? "bg-studio-gold/50"
                  : "bg-white/20"
            }`}
          />
        ))}
      </div>
      <div className="relative mt-2 h-32 w-px bg-white/10">
        <span
          className="absolute left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-studio-gold transition-all duration-300"
          style={{
            top: `${total <= 1 ? 0 : (activeIndex / (total - 1)) * 100}%`,
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>
    </div>
  );
}
