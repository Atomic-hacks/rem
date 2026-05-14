export type CurrencyCode = "NGN" | "GHS" | "KES" | "ZAR" | "USD";

export type ListingPurpose = "sale" | "rent" | "short-let";

export type PropertyType =
  | "apartment"
  | "house"
  | "duplex"
  | "terrace"
  | "land"
  | "commercial"
  | "office"
  | "retail"
  | "warehouse";

export type PropertyStatus = "available" | "verified" | "pending" | "sold" | "off-market";

export type AgentVerificationStatus = "verified" | "pending" | "unverified";

export interface Money {
  amount: number;
  currency: CurrencyCode;
  period?: "night" | "month" | "year";
}

export interface GeoPoint {
  latitude: number;
  longitude: number;
}

export interface PropertyLocation {
  addressLine?: string;
  area: string;
  city: string;
  region: string;
  country: string;
  coordinates?: GeoPoint;
  landmark?: string;
}

export interface PropertyImage {
  id: string;
  url: string;
  alt: string;
  isPrimary?: boolean;
  sortOrder?: number;
}

export interface PropertyAmenity {
  id: string;
  label: string;
  category?: "interior" | "exterior" | "security" | "utilities" | "community";
}

export interface Agent {
  id: string;
  displayName: string;
  companyName?: string;
  avatarUrl?: string;
  verificationStatus: AgentVerificationStatus;
  contact: {
    phone?: string;
    whatsapp?: string;
    email?: string;
  };
  responseTimeLabel?: string;
  licenseNumber?: string;
}

export interface Property {
  id: string;
  slug: string;
  title: string;
  description?: string;
  purpose: ListingPurpose;
  type: PropertyType;
  status: PropertyStatus;
  price: Money;
  location: PropertyLocation;
  images: PropertyImage[];
  amenities: PropertyAmenity[];
  agent: Agent;
  bedrooms?: number;
  bathrooms?: number;
  parkingSpaces?: number;
  floorAreaSqm?: number;
  landAreaSqm?: number;
  isFeatured?: boolean;
  isVerified?: boolean;
  listedAt: string;
  updatedAt?: string;
}

export interface SearchFilters {
  query?: string;
  purpose?: ListingPurpose;
  propertyTypes: PropertyType[];
  regions: string[];
  cities: string[];
  priceMin?: number;
  priceMax?: number;
  currency?: CurrencyCode;
  bedroomsMin?: number;
  bathroomsMin?: number;
  amenities: string[];
  status?: PropertyStatus[];
  verifiedOnly?: boolean;
  sortBy?: "recommended" | "newest" | "price-asc" | "price-desc";
}

export interface PaginatedResponse<T> {
  data: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}
