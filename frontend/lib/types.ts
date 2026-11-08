/** Shared TypeScript contracts mirror the public Django serializers. */
export type ListingStatus = "sale" | "rent" | "sold";
export type PropertyType = "house" | "apartment" | "villa" | "land" | "commercial";

export interface Agent {
  id: number;
  name: string;
  title: string;
  photo_url: string;
  years_experience: number;
  biography: string;
}

export interface Property {
  id: number;
  title: string;
  slug: string;
  description: string;
  status: ListingStatus;
  property_type: PropertyType;
  price: string;
  address: string;
  city: string;
  state: string;
  postal_code: string;
  bedrooms: number;
  bathrooms: number;
  area_sqft: number;
  image_url: string;
  gallery: string[];
  featured: boolean;
  agent: Agent | null;
  created_at: string;
}

export interface Paginated<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface InquiryPayload {
  category: "property" | "consultation" | "contact";
  property?: number;
  name: string;
  email: string;
  phone: string;
  message: string;
  preferred_date?: string;
}
