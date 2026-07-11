export type Bilingual = { en: string; ar: string };

export type BilingualBlockProps = {
  en: string;
  ar: string;
  layout?: "stack" | "split";
  enClassName?: string;
  arClassName?: string;
  className?: string;
};

export function bi(en: string, ar: string): Bilingual {
  return { en, ar };
}
