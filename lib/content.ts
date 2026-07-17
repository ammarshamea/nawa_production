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

/** Shared client logos — Google Drive folder: 18z7ZC37rCgqNnW30P4pMW5k0IpJQUmTP */
export const clientsList: ClientItem[] = [
  { name: "Camellia", driveId: "1Lww-sQlVsQppaWQPeWeiFxtJiRFpT6fS", fit: "contain" },
  { name: "Street Food", driveId: "1p9zAk9X14NsO7rKysuWr507I1KvJxLnU", fit: "contain" },
  { name: "Golden Fabric", driveId: "176s2YbqWbEKHH_n2DxwuTaILEawCZL1D", fit: "contain" },
  { name: "Alto", driveId: "1EsWVAnlOUkp7grvKZiEPz3x6ZSkQsfWl", fit: "contain" },
  { name: "Azen Gold", driveId: "1WX7rNfinvkhzcJQAIs9EmqogMZgWtVm1", fit: "contain" },
  { name: "Babyshop", driveId: "10zBZaboJMLYxaJHJZ0kwKUDSY_yREjVz", fit: "contain" },
  { name: "Crumble", driveId: "11Oz0aT-bARWToR_RCNqW6WsfeHYE92UC", fit: "contain" },
  { name: "Final Logo Options", driveId: "1CcUBUKkBUSeqdu-Qr4bYlS0VjjPHk13o", fit: "contain" },
  { name: "Frist Series", driveId: "1H5-rmxGFi9m40sa998zrQq2y0YklqjXh", fit: "contain" },
  { name: "Furn", driveId: "1bq1RTuOX7ElGe4skAEOHY2TqR7f1NQ7x", fit: "contain" },
  { name: "Hailan", driveId: "1eNqBbaVIXjCDO44oKDHtbb7GorjnkyeQ", fit: "contain" },
  { name: "Hawzen", driveId: "1gA4nsA7HQl7c_pzOgkm9OjihS2QnBeF1", fit: "contain" },
  { name: "JANA", driveId: "1eT3Zbse0BcqsBe7lf2IRv2nk9DMnS4T5", fit: "contain" },
  { name: "Jana Medical Clinic", driveId: "10a37EvJuO-p105BIhwrg-X0LwqByNGHc", fit: "contain" },
  { name: "KOmi", driveId: "1INN2n9N8vVyBqVG6y5_coAwwGq556p24", fit: "contain" },
  { name: "Logo", driveId: "1QHTUJO-dr7VVL4bumetHgdNXqqilYYPq", fit: "contain" },
  { name: "سرد", driveId: "1P7CvrmbIoGbjRdwFJ5OZ88NTpfswx2_Y", fit: "contain" },
  { name: "LOGO", driveId: "1Fxh9k__d1UhBFboLZj2R-ge8Jq30ndUj", fit: "contain" },
  { name: "MDL Beast", driveId: "1_lhf1LBe_q5PvrjMctDHJe_UYOfjY0WK", fit: "contain" },
  { name: "Pirav", driveId: "1StgcF7UEySkJUCU0I4OEoXbi9-BGR7GF", fit: "contain" },
  { name: "Places", driveId: "1c61qcQv6aLyStzTW8m7OcuWe4UMgjtZ7", fit: "contain" },
  { name: "SORRY", driveId: "1kncUkqxgrjY3I6Xe2SBkpnl8iZXGdLZz", fit: "contain" },
  { name: "Sugar Hive", driveId: "1UgV_UP9fTs5RuBHKOwZyY9AW3URcQF53", fit: "contain" },
  { name: "To Eat", driveId: "1PKzMw27M91JAH9m8lMCpa9GoFoiGqThz", fit: "contain" },
  { name: "اوما", driveId: "1bJsz9R4v1r1jCZFmiPQAPBVEtfyDADhG", fit: "contain" },
  { name: "باي", driveId: "1RiohkBFXDTVI8YP6Gs308M5XiOVyXTOr", fit: "contain" },
  { name: "بنك التنمية", driveId: "1VWGnFJQK-wTOMZV3hexrv02idEfjOBic", fit: "contain" },
  { name: "بورصة", driveId: "1TZD3LbpQTQPYGbTS96P-lq_uq4pvIsE8", fit: "contain" },
  { name: "بيورغر", driveId: "1ioWXLeZWXGsQbh9TAJrtQYi0zhz8N4tW", fit: "contain" },
  { name: "تدابير", driveId: "1d2bbQeHQ7fenRRDlSrQ_kyIQH6veXKtU", fit: "contain" },
  { name: "سكيتش", driveId: "1_rs-vKP1l_XTOhN9lt_sWQ_IPo_2O6kS", fit: "contain" },
  { name: "بنك التنمية الاجتماعية", driveId: "1NggwpVCl1m5NSWSOiyXRpXU7StsZc29C", fit: "contain" },
  { name: "مصرف الراجحي", driveId: "1dc0ZAuhOn7l3kfWHMwXD9duHEyAY9fNI", fit: "contain" },
  { name: "شلبي", driveId: "17SCmXHZwTfO-JMtCiC2HKwLfbQLCjiex", fit: "contain" },
  { name: "فلافلكم", driveId: "10IGpjLrimHcdrkfY7wKRfH16iNmwLDr3", fit: "contain" },
  { name: "Hulk", driveId: "1ayA63bc0ZFyeCTHTyq38mPKmM17U5exh", fit: "contain" },
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
