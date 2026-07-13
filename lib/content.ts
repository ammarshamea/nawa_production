import type { ClientItem } from "./locales/shared";
import type { ProcessStage } from "./locales/types";
import type { Locale } from "./locales/types";
import { siteImages } from "./assets";

export type { ClientItem };
export type { Locale, LocaleContent, ProcessStage } from "./locales/types";
export type JourneyStage = ProcessStage;

export type ProjectItem = {
  id: string;
  title: { en: string; ar: string };
  category: { en: string; ar: string };
  driveId: string;
};

export function projectText(project: ProjectItem, locale: Locale, field: "title" | "category") {
  return project[field][locale];
}

/** Shared client logos — names are brand names, not translated */
export const clientsList: ClientItem[] = [
  { name: "MDL Beast", driveId: "1yskdGk7envR_8IyzL0Bu_tlHFQtf9G8r" },
  { name: "Al Rajhi Bank", driveId: "1ItKzG8SJYLf0G-Sg1nRmKikd4rqmnVpb", fit: "contain" },
  { name: "Social Development Bank", driveId: "1o_RvCqx5KbBxstl8ljymT5nFwjy6oM4p" },
  { name: "Domino's Pizza" },
  { name: "Babyshop", driveId: "1yiryQuGQY-aJWmZDYBsLvcnm3qav5I-K" },
  { name: "Careem" },
  { name: "Netflix" },
  { name: "Riyadh Front" },
  { name: "STC" },
  { name: "FranchiseME" },
  { name: "Oska" },
  { name: "Ghomd" },
];

export const projects: ProjectItem[] = [
  {
    id: "alrajhi",
    title: { en: "Al Rajhi Business", ar: "الراجحي للاعمال" },
    category: { en: "Commercial", ar: "إعلان" },
    driveId: "1aio5EQK_HWVUvc-NbfgmDQgCi4Tlu_Fx",
  },
  {
    id: "tanmia",
    title: { en: "Social Development Bank", ar: "بنك التنمية" },
    category: { en: "Corporate Film", ar: "فيلم مؤسسي" },
    driveId: "1czhLbCfnZe67AAHFTz4M5MjrkeQ_8sJT",
  },
  {
    id: "hena",
    title: { en: "Hena Talga Joak", ar: "هنا تلقى جوك" },
    category: { en: "Campaign", ar: "حملة" },
    driveId: "1u-U7orWRSSmD1G5XU3IMezP9m7hDT2Ho",
  },
];

/** @deprecated — use useContent() from LanguageProvider */
export { en as defaultLocalePreview } from "./locales/en";

/** Legacy image re-exports */
export { siteImages };
