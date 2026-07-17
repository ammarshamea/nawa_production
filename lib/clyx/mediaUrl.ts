import { getApiBaseUrl } from "@/lib/clyx/apiBase";

function apiOrigin(): string {
  try {
    return new URL(getApiBaseUrl()).origin;
  } catch {
    return typeof window !== "undefined" ? window.location.origin : "";
  }
}

function mediaOrigin(): string {
  if (typeof window !== "undefined") {
    const host = window.location.hostname;
    if (host.endsWith("clyx.agency")) {
      return window.location.origin;
    }
  }
  return apiOrigin();
}

function fixStorageUrl(absoluteUrl: string): string {
  try {
    const u = new URL(absoluteUrl);
    const origin = mediaOrigin();

    if (u.hostname === "api.clyx.agency") {
      return `https://www.api.clyx.agency${u.pathname}${u.search}`;
    }

    const legacyApiHosts = new Set(["localhost", "127.0.0.1"]);
    if (legacyApiHosts.has(u.hostname) || u.pathname.startsWith("/storage/")) {
      return `${origin}${u.pathname}${u.search}`;
    }
  } catch {
    /* ignore */
  }
  return absoluteUrl;
}

/** Browser URL for media from the CLYX API (`/storage/...` paths or full URLs). */
export function resolveMediaUrl(image: string | null | undefined): string {
  if (image == null || !String(image).trim()) return "";
  const s = String(image).trim();

  if (s.startsWith("http://") || s.startsWith("https://")) {
    return fixStorageUrl(s);
  }

  const origin = mediaOrigin();
  if (s.startsWith("/")) return `${origin}${s}`;
  return `${origin}/storage/${s.replace(/^\/+/, "")}`;
}
