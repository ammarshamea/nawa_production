const LOCAL_API_BASE =
  process.env.NEXT_PUBLIC_CLYX_API_URL_LOCAL || "http://localhost:8001/api/v1";

const PROD_API_BASE =
  process.env.NEXT_PUBLIC_CLYX_API_URL_PROD || "https://www.api.clyx.agency/api/v1";

function normalize(url: string) {
  return url.replace(/\/+$/, "");
}

function isLocalFrontendHost() {
  if (typeof window === "undefined") return false;
  const host = window.location.hostname;
  return host === "localhost" || host === "127.0.0.1";
}

const explicitApiBase = (process.env.NEXT_PUBLIC_CLYX_API_URL || "").trim();
const useLocalApi = process.env.NEXT_PUBLIC_CLYX_USE_LOCAL_API === "true";

export function getApiBaseUrl(): string {
  if (explicitApiBase) return normalize(explicitApiBase);
  if (useLocalApi && isLocalFrontendHost()) return normalize(LOCAL_API_BASE);
  return normalize(PROD_API_BASE);
}
