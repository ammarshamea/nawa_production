"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { assetPath } from "@/lib/assetPath";

export function Preloader() {
  const reduce = useReducedMotion();
  const [done, setDone] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setDone(true), reduce ? 200 : 1800);
    return () => clearTimeout(t);
  }, [reduce]);

  useEffect(() => {
    if (!done) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [done]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7, ease: [0.7, 0, 0.3, 1] } }}
          className="pointer-events-none fixed inset-0 z-[100] flex items-center justify-center bg-ink-deep"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.2, 0.7, 0.2, 1] }}
            className="relative"
          >
            <Image
              src={assetPath("/assets/brand/logo-nawa-gold.webp")}
              alt=""
              width={220}
              height={110}
              priority
              className="h-24 w-auto drop-shadow-[0_0_40px_rgba(221,181,90,0.35)]"
            />
            <motion.span
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1], delay: 0.2 }}
              className="absolute -bottom-4 left-0 block h-px w-full origin-left bg-gradient-to-r from-transparent via-gold-300 to-transparent"
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
