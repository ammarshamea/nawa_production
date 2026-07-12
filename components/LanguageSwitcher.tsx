"use client";

import { useLanguage } from "@/lib/i18n/LanguageProvider";

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { locale, setLocale } = useLanguage();

  return (
    <div
      className={`relative inline-flex items-center rounded-full border border-white/10 bg-black/40 p-1 backdrop-blur-sm ${className}`}
      role="group"
      aria-label="Language"
    >
      {(["en", "ar"] as const).map((code) => {
        const active = locale === code;
        return (
          <button
            key={code}
            type="button"
            onClick={() => setLocale(code)}
            aria-pressed={active}
            className={`relative z-10 min-w-[2.75rem] rounded-full px-3 py-1.5 text-[10px] font-medium uppercase tracking-[0.18em] transition-all duration-300 ${
              active
                ? "bg-gold-300/15 text-gold-200 shadow-[0_0_20px_rgba(212,155,100,0.15)]"
                : "text-white/45 hover:text-white/75"
            }`}
          >
            {code === "en" ? "EN" : "عربي"}
          </button>
        );
      })}
    </div>
  );
}
