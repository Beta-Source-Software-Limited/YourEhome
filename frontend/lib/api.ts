/** One place for all server-to-API requests and error handling. */
import type { Agent, InquiryPayload, Paginated, Property } from "./types";

// Browser calls use the public URL; server-rendered pages can use Docker's hostname.
const browserApi = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api";
const serverApi = process.env.API_INTERNAL_URL || browserApi;

function rootUrl() {
  return typeof window === "undefined" ? serverApi : browserApi;
}

export async function apiGet<T>(path: string): Promise<T> {
  const response = await fetch(`${rootUrl()}${path}`, { cache: "no-store" });
  if (!response.ok) throw new Error(`Could not load data (HTTP ${response.status})`);
  return response.json() as Promise<T>;
}

export async function listProperties(query = ""): Promise<Paginated<Property>> {
  return apiGet<Paginated<Property>>(`/properties/${query ? `?${query}` : ""}`);
}

export async function getProperty(slug: string): Promise<Property> {
  return apiGet<Property>(`/properties/${encodeURIComponent(slug)}/`);
}

export async function listAgents(): Promise<Agent[]> {
  return apiGet<Agent[]>("/agents/");
}

export async function sendInquiry(payload: InquiryPayload): Promise<{ message: string }> {
  const response = await fetch(`${browserApi}/inquiries/`, {
    method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload),
  });
  const data: unknown = await response.json().catch(() => ({}));
  if (!response.ok) {
    const details = typeof data === "object" && data !== null ? Object.entries(data).map(([field, message]) => `${field}: ${String(message)}`).join("; ") : "";
    throw new Error(details || "Your message could not be sent. Please try again.");
  }
  return data as { message: string };
}

export function formatPrice(value: string | number, status: string): string {
  const amount = Number(value);
  return `${new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 }).format(amount)}${status === "rent" ? "/mo" : ""}`;
}
