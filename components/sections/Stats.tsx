"use client";

import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { stats } from "@/lib/content";
import { SectionWatermark } from "@/components/SectionWatermark";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduce) {
      setDisplay(value);
      return;
    }
    const controls = animate(0, value, {
      duration: 1.6,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value, reduce]);

  return (
    <span ref={ref} className="font-display text-5xl text-white sm:text-6xl md:text-7xl lg:text-8xl">
      {display}
      <span className="text-gold-200">{suffix}</span>
    </span>
  );
}

export function Stats() {
  return (
    <section className="relative overflow-hidden bg-ink py-16 md:py-24 lg:py-32">
      <SectionWatermark position="center" />
      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6">
        <ul className="grid gap-8 sm:grid-cols-2 sm:gap-10 lg:grid-cols-4">
          {stats.map((s, i) => (
            <motion.li
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="border-t border-white/10 pt-6"
            >
              <Counter value={s.value} suffix={s.suffix} />
              <p className="mt-4 text-xs uppercase tracking-[0.25em] text-white/55">{s.label}</p>
            </motion.li>
          ))}
        </ul>
      </div>
    </section>
  );
}
