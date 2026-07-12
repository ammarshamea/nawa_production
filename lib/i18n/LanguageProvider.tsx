"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { getLocaleContent, type Locale, type LocaleContent } from "@/lib/locales";
import { notifyLocaleChange } from "@/lib/i18n/scrollSync";

const STORAGE_KEY = "nawa-locale";

type LanguageContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  content: LocaleContent;
  isRtl: boolean;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

function applyDocumentLocale(locale: Locale) {
  const root = document.documentElement;
  root.lang = locale;
  root.dir = locale === "ar" ? "rtl" : "ltr";
  document.body.dataset.locale = locale;
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    const initial = stored === "ar" ? "ar" : "en";
    setLocaleState(initial);
    applyDocumentLocale(initial);
    if (initial !== "en") {
      requestAnimationFrame(() => notifyLocaleChange());
    }
  }, []);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    localStorage.setItem(STORAGE_KEY, next);
    applyDocumentLocale(next);
    requestAnimationFrame(() => {
      notifyLocaleChange();
    });
  }, []);

  useEffect(() => {
    applyDocumentLocale(locale);
  }, [locale]);

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      content: getLocaleContent(locale),
      isRtl: locale === "ar",
    }),
    [locale, setLocale],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return ctx;
}

export function useContent() {
  return useLanguage().content;
}
