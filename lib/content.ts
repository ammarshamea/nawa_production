import type { ClientItem } from "./locales/shared";
import type { ProcessStage } from "./locales/types";
import { siteImages } from "./assets";

export type { ClientItem };
export type { Locale, LocaleContent, ProcessStage } from "./locales/types";
export type JourneyStage = ProcessStage;

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

export const projects = [
  {
    id: "alrajhi",
    title: "Al Rajhi Bank",
    category: "Commercial",
    driveId: "17NudGWhWQQS6BrzPKIXQ9lAbann900aW",
  },
  {
    id: "tanmia",
    title: "Social Development Bank",
    category: "Corporate Film",
    driveId: "1OJ7UHtCykwh5mRHnm-mm_BzesuD5g2yI",
  },
  {
    id: "hena",
    title: "Hena Talga Joak",
    category: "Campaign",
    driveId: "12pwlLcp6eqKcvL7YhEhGaoTCvxq6f_i7",
  },
] as const;

/** @deprecated — use useContent() from LanguageProvider */
export { en as defaultLocalePreview } from "./locales/en";

/** Legacy image re-exports */
export { siteImages };
