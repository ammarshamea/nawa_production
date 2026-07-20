"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useContent, useLanguage } from "@/lib/i18n/LanguageProvider";
import { assetPath, sectionHref } from "@/lib/assetPath";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";

export function Nav() {
  const { nav } = useContent();
  const { isRtl } = useLanguage();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("home");

  useEffect(() => {
    let ticking = false;

    function onScroll() {
      if (ticking) return;
      ticking = true;

      requestAnimationFrame(() => {
        ticking = false;

        const nextScrolled = window.scrollY > 40;
        setScrolled((prev) => (prev === nextScrolled ? prev : nextScrolled));

        const candidates = nav
          .map((n) => {
            const el = document.getElementById(n.id);
            if (!el) return null;
            const rect = el.getBoundingClientRect();
            return { id: n.id, top: rect.top };
          })
          .filter(Boolean) as { id: string; top: number }[];

        const inView = candidates
          .filter((c) => c.top < window.innerHeight * 0.4)
          .sort((a, b) => b.top - a.top)[0];

        if (inView) {
          setActive((prev) => (prev === inView.id ? prev : inView.id));
        }
      });
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [nav]);

  const talkLabel = isRtl ? "لنتحدث" : "Let's Talk";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 pt-[env(safe-area-inset-top,0px)] ${
        scrolled ? "bg-ink/85" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-6 sm:py-5 md:py-6">
        <a href={sectionHref("#home")} className="flex shrink-0 items-center gap-3" aria-label="Nawa Production home">
          <Image
            src={assetPath("/assets/brand/logo-nawa-gold.webp")}
            alt="Nawa Production"
            width={120}
            height={48}
            priority
            className="h-9 w-auto md:h-10"
          />
        </a>

        <nav className="hidden items-center gap-6 lg:flex xl:gap-8" aria-label="Primary">
          {nav.map((item) => (
            <a
              key={item.id}
              href={sectionHref(`#${item.id}`)}
              className={`group relative text-xs uppercase tracking-[0.22em] transition-colors ${
                active === item.id ? "text-gold-200" : "text-white/70 hover:text-white"
              }`}
            >
              {item.label}
              <span
                className={`absolute -bottom-1 start-0 h-px bg-gold-300 transition-all duration-500 ${
                  active === item.id ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-4 lg:flex">
          <LanguageSwitcher />
          <a
            href={sectionHref("#contact")}
            className="rounded-full border border-gold-300/40 px-5 py-2 text-xs uppercase tracking-[0.22em] text-gold-100 transition-colors hover:border-gold-200"
          >
            {talkLabel}
          </a>
        </div>

        <div className="flex items-center gap-3 lg:hidden">
          <LanguageSwitcher />
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors ${
              open ? "border-gold-300/50 text-gold-200" : "border-white/10 text-white"
            }`}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="flex flex-col gap-[5px]">
              <span
                className={`block h-px w-[18px] bg-current transition-all duration-300 ${
                  open ? "translate-y-[7px] rotate-45" : ""
                }`}
              />
              <span
                className={`block h-px w-[18px] bg-current transition-all duration-300 ${
                  open ? "opacity-0" : ""
                }`}
              />
              <span
                className={`block h-px w-[18px] bg-current transition-all duration-300 ${
                  open ? "-translate-y-[7px] -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: [0.2, 0.7, 0.2, 1] }}
            className="lg:hidden"
          >
            <div className="mx-3 mb-4 overflow-hidden rounded-2xl border border-white/10 bg-ink-soft/95 backdrop-blur-2xl sm:mx-4">
              <ul>
                {nav.map((item, i) => (
                  <motion.li
                    key={item.id}
                    initial={{ opacity: 0, x: isRtl ? 12 : -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.25, delay: i * 0.05 }}
                    className="border-b border-white/5 last:border-0"
                  >
                    <a
                      href={sectionHref(`#${item.id}`)}
                      onClick={() => setOpen(false)}
                      className={`block px-6 py-4 text-sm uppercase tracking-[0.22em] transition-colors active:bg-white/5 ${
                        active === item.id ? "text-gold-200" : "text-white/75"
                      }`}
                    >
                      {item.label}
                    </a>
                  </motion.li>
                ))}
              </ul>
              <div className="border-t border-white/5 p-4">
                <a
                  href={sectionHref("#contact")}
                  onClick={() => setOpen(false)}
                  className="flex w-full items-center justify-center rounded-full bg-gold-300/10 py-3.5 text-xs uppercase tracking-[0.22em] text-gold-200 transition-colors active:bg-gold-300/20"
                >
                  {talkLabel}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
