import { ar } from "./ar";
import { en } from "./en";
import type { Locale, LocaleContent } from "./types";

export type { Locale, LocaleContent } from "./types";

const locales: Record<Locale, LocaleContent> = { en, ar };

export function getLocaleContent(locale: Locale): LocaleContent {
  return locales[locale];
}

export { en, ar };
