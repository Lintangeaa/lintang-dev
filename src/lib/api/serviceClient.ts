import { BASE_URL } from "../config/baseUrl";

export interface ServiceItem {
  id: string;
  name: string;
  description: string;
  otc_range: string;
  monthly_range: string;
  info: string[];
  features: string[];
  type: string;
  created_at: string;
  updated_at: string;
}

interface ServicesResponse {
  statusCode: number;
  message: string;
  result: ServiceItem[];
}


export async function listServices(): Promise<ServiceItem[]> {
  const url = `${BASE_URL}/v1/service`;
  const res = await fetch(url, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch services (${res.status})`);
  const data = (await res.json()) as ServicesResponse;
  return Array.isArray(data?.result) ? data.result : [];
}
