import type Lenis from "lenis";

/** Prefix public asset paths for GitHub Pages (basePath). */
export const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function assetPath(path: string): string {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return `${basePath}${normalized}`;
}

/** In-page section links (e.g. #contact) with basePath on GitHub Pages. */
export function sectionHref(hash: string): string {
  const id = hash.startsWith("#") ? hash : `#${hash}`;
  return basePath ? `${basePath}${id}` : id;
}

/** Scroll to a section by id; accounts for fixed nav offset. */
export function scrollToSection(id: string, lenis?: Lenis | null) {
  const clean = id.replace(/^#/, "");
  const el = document.getElementById(clean);
  if (!el) return;

  const offset = -80;
  if (lenis) {
    lenis.scrollTo(el, { offset });
  } else {
    const top = el.getBoundingClientRect().top + window.scrollY + offset;
    window.scrollTo({ top, behavior: "smooth" });
  }
}
