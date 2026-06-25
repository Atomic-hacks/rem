import { ApiError } from "./auth";

export interface Agent {
  id: string;
  full_name: string;
  avatar_url?: string;
  phone?: string;
  email?: string;
  agent_type?: string;
  company_name?: string;
  verified?: boolean;
  rating?: number;
  years_of_experience?: number;
  total_listings?: number;
}

export interface PropertyImage {
  id: string;
  url: string;
  order?: number;
}

export interface PropertyAmenity {
  id: string;
  name: string;
  description?: string;
}

export interface Property {
  id: string;
  title: string;
  slug: string;
  description?: string;
  location: string;
  price: string;
  price_display: string;
  price_suffix?: string;
  property_type: string;
  property_type_display: string;
  property_listing: "for_sale" | "rent" | "short_let" | "hotel";
  listing_type_display: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  is_available: boolean;
  availability_label: string;
  is_featured: boolean;
  is_favorited: boolean;
  main_image_url: string;
  images?: PropertyImage[];
  amenities?: PropertyAmenity[];
  agent: Agent;
  similar_properties?: string[];
  created_at: string;
  updated_at?: string;
}

export interface Category {
  listing_type: string;
  label: string;
  icon: string;
  description: string;
  count: number;
}

export interface PriceRange {
  label: string;
  price_min: string | null;
  price_max: string | null;
}

export interface SearchConfig {
  listing_types: Array<{
    value: string;
    label: string;
  }>;
  price_ranges: {
    for_sale: PriceRange[];
    rent: PriceRange[];
    short_let: PriceRange[];
    hotel: PriceRange[];
  };
}

export interface HomePageData {
  featured_properties: Property[];
  categories: Category[];
  search_config: SearchConfig;
}

export interface PropertyListResponse {
  count: number;
  next?: string;
  previous?: string;
  results: Property[];
}

export class PropertyServiceError extends ApiError {
  constructor(message: string, status: number, payload: unknown) {
    super(message, status, payload);
    this.name = "PropertyServiceError";
  }
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "";
const HOME_ENDPOINT = process.env.NEXT_PUBLIC_HOME_ENDPOINT ?? "/api/v1/home/";
const PROPERTIES_ENDPOINT =
  process.env.NEXT_PUBLIC_PROPERTIES_ENDPOINT ?? "/api/v1/property/";
const PROPERTY_DETAIL_ENDPOINT =
  process.env.NEXT_PUBLIC_PROPERTY_DETAIL_ENDPOINT ?? "/api/v1/property/";

function buildUrl(path: string) {
  if (/^https?:\/\//.test(path)) {
    return path;
  }
  return `${API_BASE_URL}${path}`;
}

async function parseResponse<T>(response: Response): Promise<T> {
  const contentType = response.headers.get("content-type");
  const isJson = contentType?.includes("application/json");

  let payload: unknown;
  try {
    payload = isJson ? await response.json() : await response.text();
  } catch {
    payload = null;
  }

  if (!response.ok) {
    throw new PropertyServiceError(
      formatApiError(payload, response.status),
      response.status,
      payload,
    );
  }

  return (payload as T) ?? ({} as T);
}

function formatApiError(payload: unknown, status: number) {
  if (payload && typeof payload === "object") {
    const data = payload as Record<string, unknown>;

    if (typeof data.detail === "string") {
      return data.detail;
    }

    if (typeof data.message === "string") {
      return data.message;
    }

    const fieldErrors = Object.entries(data)
      .map(([field, value]) => {
        const message = Array.isArray(value) ? value.join(", ") : String(value);
        return `${field}: ${message}`;
      })
      .join(" ");

    if (fieldErrors) {
      return fieldErrors;
    }
  }

  if (typeof payload === "string" && payload.trim()) {
    return payload;
  }

  return `Property request failed with status ${status}.`;
}

const emptyHomeData: HomePageData = {
  featured_properties: [],
  categories: [],
  search_config: {
    listing_types: [],
    price_ranges: {
      for_sale: [],
      rent: [],
      short_let: [],
      hotel: [],
    },
  },
};

export async function getHomePageData(): Promise<HomePageData> {
  const url = buildUrl(HOME_ENDPOINT);
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
    },
    next: { revalidate: 60 },
  });
  const data = await parseResponse<HomePageData | HomePageData[]>(response);

  return Array.isArray(data) ? (data[0] ?? emptyHomeData) : (data ?? emptyHomeData);
}

export interface PropertyFilterParams {
  amenities?: string;
  is_available?: boolean;
  limit?: number;
  listing_type?: string;
  location?: string;
  max_bedrooms?: number;
  max_price?: number;
  min_bathrooms?: number;
  min_bedrooms?: number;
  min_price?: number;
  ordering?: string;
  page?: number;
  property_type?: string;
  search?: string;
}

export async function getProperties(
  filters?: PropertyFilterParams,
): Promise<PropertyListResponse> {
  const params = new URLSearchParams();

  if (filters) {
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== "") {
        params.set(key, String(value));
      }
    });
  }

  const url = params.size
    ? `${buildUrl(PROPERTIES_ENDPOINT)}?${params.toString()}`
    : buildUrl(PROPERTIES_ENDPOINT);

  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
    },
  });
  return parseResponse<PropertyListResponse>(response);
}

export async function getPropertyBySlug(slug: string): Promise<Property> {
  const url = buildUrl(`${PROPERTY_DETAIL_ENDPOINT}${slug}/`);
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
    },
  });
  return parseResponse<Property>(response);
}

export async function getPropertyAgent(slug: string): Promise<Agent> {
  const url = buildUrl(`${PROPERTY_DETAIL_ENDPOINT}${slug}/agent/`);
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
    },
  });
  return parseResponse<Agent>(response);
}

export async function getSimilarProperties(slug: string): Promise<Property[]> {
  const url = buildUrl(`${PROPERTY_DETAIL_ENDPOINT}${slug}/similar/`);
  const response = await fetch(url, {
    headers: {
      Accept: "application/json",
    },
  });
  return parseResponse<Property[]>(response);
}

export async function createProperty(
  formData: FormData,
  accessToken: string,
): Promise<Property> {
  const url = buildUrl(PROPERTIES_ENDPOINT);
  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
  });
  return parseResponse<Property>(response);
}

export async function updateProperty(
  slug: string,
  formData: FormData,
  accessToken: string,
): Promise<Property> {
  const url = buildUrl(`${PROPERTY_DETAIL_ENDPOINT}${slug}/`);
  const response = await fetch(url, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: formData,
  });
  return parseResponse<Property>(response);
}

export async function patchProperty(
  slug: string,
  data: Partial<Property>,
  accessToken: string,
): Promise<Property> {
  const url = buildUrl(`${PROPERTY_DETAIL_ENDPOINT}${slug}/`);
  const response = await fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify(data),
  });
  return parseResponse<Property>(response);
}

export async function deleteProperty(
  slug: string,
  accessToken: string,
): Promise<void> {
  const url = buildUrl(`${PROPERTY_DETAIL_ENDPOINT}${slug}/`);
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
  });

  if (!response.ok) {
    const payload = await response.json().catch(() => null);
    throw new PropertyServiceError(
      `Failed to delete property: ${response.status}`,
      response.status,
      payload,
    );
  }
}
