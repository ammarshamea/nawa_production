import Image from "next/image";

type Position = "center" | "right" | "left";

type Props = {
  position?: Position;
  className?: string;
};

const positionClass: Record<Position, string> = {
  center: "items-center justify-center",
  right: "items-center justify-end pe-[4%] md:pe-[8%]",
  left: "items-center justify-start ps-[4%] md:ps-[8%]",
};

/** Subtle Nawa logo behind section content */
export function SectionWatermark({ position = "center", className = "" }: Props) {
  return (
    <div
      className={`pointer-events-none absolute inset-0 z-0 flex overflow-hidden ${positionClass[position]} ${className}`}
      aria-hidden
    >
      <Image
        src="/assets/brand/logo-nawa-gold.png"
        alt=""
        width={800}
        height={428}
        className="h-auto w-[min(88vw,580px)] max-w-none shrink-0 object-contain opacity-[0.1] brightness-110 drop-shadow-[0_0_60px_rgba(221,181,90,0.2)] sm:w-[min(75vw,680px)] sm:opacity-[0.12] sm:drop-shadow-[0_0_80px_rgba(221,181,90,0.25)]"
        sizes="(max-width: 768px) 88vw, 640px"
      />
    </div>
  );
}
