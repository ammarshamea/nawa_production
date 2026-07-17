import { getApiBaseUrl } from "@/lib/clyx/apiBase";

export type ApiClientType = {
  id: number;
  image: string;
  sort_order?: number;
  is_active?: boolean;
};

export async function fetchClientTypes(): Promise<ApiClientType[]> {
  const res = await fetch(`${getApiBaseUrl()}/client-types`, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch client types");
  }

  const data: ApiClientType[] = await res.json();
  return data.filter((row) => row.image?.trim());
}
