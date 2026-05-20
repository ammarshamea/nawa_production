"use client";

import { motion, useMotionValue, useSpring, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useRef, type ReactNode, type MouseEvent } from "react";
import { sectionHref } from "@/lib/assetPath";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
};

export function MagneticButton({ href, children, variant = "primary", className = "" }: Props) {
  const ref = useRef<HTMLAnchorElement | null>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 200, damping: 18, mass: 0.4 });

  function onMove(e: MouseEvent<HTMLAnchorElement>) {
    if (reduce || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    x.set(relX * 0.25);
    y.set(relY * 0.25);
  }

  function onLeave() {
    x.set(0);
    y.set(0);
  }

  const base =
    "relative inline-flex items-center justify-center rounded-full px-8 py-4 text-sm uppercase tracking-[0.2em] transition-colors will-change-transform";
  const styles =
    variant === "primary"
      ? "bg-gold-300 text-ink hover:bg-gold-200 shadow-gold"
      : "border border-gold-300/40 text-gold-100 hover:border-gold-200 hover:text-gold-50";

  const resolvedHref =
    href.startsWith("#") || (href.startsWith("/") && href.includes("#"))
      ? sectionHref(href.includes("#") ? href.slice(href.indexOf("#")) : href)
      : href;

  return (
    <motion.a
      ref={ref}
      href={resolvedHref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: sx, y: sy }}
      className={`${base} ${styles} ${className}`}
    >
      <span className="relative z-10">{children}</span>
    </motion.a>
  );
}

export function MagneticInternal({ href, children, variant = "primary" }: Props) {
  return (
    <Link href={href} legacyBehavior>
      <MagneticButton href={href} variant={variant}>
        {children}
      </MagneticButton>
    </Link>
  );
}
