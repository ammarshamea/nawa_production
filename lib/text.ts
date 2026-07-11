import type { Bilingual } from "./bilingual";

export function en(value: string | Bilingual): string {
  return typeof value === "string" ? value : value.en;
}
