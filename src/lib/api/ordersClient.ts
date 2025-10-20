import { BASE_URL } from "../config/baseUrl";

export interface OrderPayload {
  serviceId: string;
  customerName: string;
  whatsapp: string;
  websiteName: string;
  companyName: string;
  description: string;
  colorPrimary: string;
  colorSecondary: string;
  totalPrice?: number; // optional on create, default 0 in backend
}

export interface OrderItem {
  id: string;
  serviceId: string;
  customerName: string;
  whatsapp: string;
  websiteName: string;
  companyName: string;
  description: string;
  colorPrimary: string;
  colorSecondary: string;
  status: string;
  createdAt: string;
  totalPrice: number;
}

function toApiPayload(ui: OrderPayload) {
  return {
    service_id: ui.serviceId,
    customer_name: ui.customerName,
    whatsapp: ui.whatsapp,
    website_name: ui.websiteName,
    company_name: ui.companyName,
    description: ui.description,
    color_primary: ui.colorPrimary,
    color_secondary: ui.colorSecondary,
    total_price: ui?.totalPrice ?? 0,
  };
}

interface ApiOrder {
  id: string;
  service_id: string;
  customer_name: string;
  whatsapp: string;
  website_name: string;
  company_name: string;
  description: string;
  color_primary: string;
  color_secondary: string;
  status: string;
  created_at?: string | Date | null;
  total_price?: number | null;
}

function toIsoDate(input: string | Date | null | undefined): string {
  if (!input) return new Date().toISOString();
  try {
    if (input instanceof Date) return new Date(input.getTime()).toISOString();
    const t = Date.parse(String(input));
    if (Number.isNaN(t)) return new Date().toISOString();
    return new Date(t).toISOString();
  } catch {
    return new Date().toISOString();
  }
}

function fromApiItem(api: ApiOrder): OrderItem {
  return {
    id: api.id,
    serviceId: api.service_id,
    customerName: api.customer_name,
    whatsapp: api.whatsapp,
    websiteName: api.website_name,
    companyName: api.company_name,
    description: api.description,
    colorPrimary: api.color_primary,
    colorSecondary: api.color_secondary,
    status: api.status,
    createdAt: toIsoDate(api.created_at),
    totalPrice: api.total_price ?? 0
  };
}

export async function createOrder(payload: OrderPayload): Promise<OrderItem> {
  const res = await fetch(`${BASE_URL}/v1/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(toApiPayload(payload)),
  });
  if (!res.ok) throw new Error(`Failed to create order (${res.status})`);
  const data = await res.json();
  const raw = data?.order ?? data?.result ?? data;
  return fromApiItem(raw);
}

export async function listOrders(): Promise<OrderItem[]> {
  const res = await fetch(`${BASE_URL}/v1/orders`, { cache: "no-store" });
  if (!res.ok) throw new Error(`Failed to fetch orders (${res.status})`);
  const data = await res.json();
  const arr = Array.isArray(data?.orders)
    ? data.orders
    : Array.isArray(data?.result)
    ? data.result
    : Array.isArray(data)
    ? data
    : [];
  return arr.map(fromApiItem);
}

export async function updateOrder(id: string, payload: OrderPayload): Promise<OrderItem> {
  const res = await fetch(`${BASE_URL}/v1/orders/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(toApiPayload(payload)),
  });
  if (!res.ok) throw new Error(`Failed to update order (${res.status})`);
  const data = await res.json();
  const raw = data?.order ?? data?.result ?? data;
  return fromApiItem(raw);
}


