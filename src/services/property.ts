import { ApiError } from "./auth";
import {
  featuredProperties as demoFeaturedProperties,
  saleProperties as demoSaleProperties,
  rentProperties as demoRentProperties,
  shortletProperties as demoShortletProperties,
} from "@/data/properties";

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
  property_listing: "for_sale" | "rent" | "short_let";
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
    },
  },
};

// Helper function to convert demo data to API format
function convertDemoToApiProperties(): Property[] {
  const apiProperties: Property[] = [];
  const now = new Date().toISOString();
  const demoAgentNames = ["Emeka Okafor", "Adaobi Williams", "Tunde Lawal"];

  // Convert featured properties to API format
  demoFeaturedProperties.forEach((prop, index) => {
    const listingTypeMap: Record<string, "for_sale" | "rent" | "short_let"> = {
      "For Sale": "for_sale",
      "For Rent": "rent",
      "Short-Let": "short_let",
    };

    const listing = listingTypeMap[prop.type] || "for_sale";
    const badgeMap: Record<string, string> = {
      "For Sale": "For Sale",
      "For Rent": "For Rent",
      "Short-Let": "Short-Let",
    };

    apiProperties.push({
      id: `demo-featured-${index}`,
      title: prop.title,
      slug: `demo-featured-${index}`,
      location: prop.location,
      price: prop.price,
      price_display: prop.price,
      price_suffix:
        prop.type === "For Rent"
          ? "/month"
          : prop.type === "Short-Let"
            ? "/night"
            : undefined,
      property_type: "apartment",
      property_type_display: "Apartment",
      property_listing: listing,
      listing_type_display: badgeMap[prop.type] || "For Sale",
      bedrooms: prop.beds,
      bathrooms: prop.baths,
      sqft: parseInt(prop.size.replace(/\D/g, "")) || 1000,
      is_available: true,
      availability_label: "Available",
      is_featured: true,
      is_favorited: false,
      main_image_url: prop.image,
      images: [],
      agent: {
        id: `demo-agent-${index}`,
        full_name: demoAgentNames[index % demoAgentNames.length],
        avatar_url: "",
        phone: "+234 800 000 0000",
        email: "agent@demo.com",
        agent_type: "Real Estate Agent",
        company_name: "REM Demo Realty",
        verified: true,
        rating: 4.7,
        years_of_experience: 5,
        total_listings: 14,
      },
      created_at: now,
    });
  });

  // Also add sale, rent and shortlet properties
  const allOtherProps = [
    ...demoSaleProperties,
    ...demoRentProperties,
    ...demoShortletProperties,
  ];
  allOtherProps.forEach((prop, index) => {
    let listing: "for_sale" | "rent" | "short_let" = "for_sale";

    // Determine listing type
    if ("status" in prop && prop.status === "For Rent") {
      listing = "rent";
    } else if ("period" in prop) {
      listing = "short_let";
    }

    apiProperties.push({
      id: `demo-prop-${index}`,
      title: prop.title,
      slug: `demo-prop-${index}`,
      location: prop.location,
      price: String(prop.price),
      price_display: `₦${Number(prop.price).toLocaleString()}`,
      price_suffix:
        listing === "rent"
          ? "/month"
          : listing === "short_let"
            ? "/night"
            : undefined,
      property_type: "apartment",
      property_type_display: "Apartment",
      property_listing: listing,
      listing_type_display:
        listing === "for_sale"
          ? "For Sale"
          : listing === "rent"
            ? "For Rent"
            : "Short-Let",
      bedrooms: "bedrooms" in prop ? prop.bedrooms : prop.beds,
      bathrooms: "bathrooms" in prop ? prop.bathrooms : prop.baths,
      sqft:
        "sqft" in prop ? prop.sqft : "areaSqft" in prop ? prop.areaSqft : 1000,
      is_available: true,
      availability_label: "Available",
      is_featured: false,
      is_favorited: false,
      main_image_url: prop.image,
      images: (prop.images || []).map((url, idx) => ({
        id: `img-${idx}`,
        url,
      })),
      agent: {
        id: `demo-agent-${index}`,
        full_name:
          "agent" in prop && prop.agent ? prop.agent.name : "Demo Agent",
        avatar_url: "",
        phone:
          "agent" in prop && prop.agent
            ? prop.agent.phone
            : "+234 800 000 0000",
        email:
          "agent" in prop && prop.agent ? prop.agent.email : "agent@demo.com",
        agent_type: "Real Estate Agent",
        company_name:
          "agent" in prop && prop.agent ? prop.agent.company : "REM Demo Realty",
        verified: true,
        rating: "agent" in prop && prop.agent ? prop.agent.rating : 4.6,
        years_of_experience: 4,
        total_listings: 12,
      },
      created_at: now,
    });
  });

  return apiProperties;
}

// Helper to get demo home data
function getDemoHomeData(): HomePageData {
  return {
    featured_properties: convertDemoToApiProperties(),
    categories: [
      {
        listing_type: "for_sale",
        label: "For Sale",
        icon: "home",
        description: "Properties available for purchase",
        count: demoSaleProperties.length,
      },
      {
        listing_type: "rent",
        label: "For Rent",
        icon: "key",
        description: "Properties available for rent",
        count: demoRentProperties.length,
      },
      {
        listing_type: "short_let",
        label: "Short-Let",
        icon: "calendar",
        description: "Properties available for short-term stays",
        count: demoShortletProperties.length,
      },
    ],
    search_config: {
      listing_types: [
        { value: "for_sale", label: "For Sale" },
        { value: "rent", label: "For Rent" },
        { value: "short_let", label: "Short-Let" },
      ],
      price_ranges: {
        for_sale: [
          { label: "Under ₦50M", price_min: null, price_max: "50000000" },
          {
            label: "₦50M - ₦100M",
            price_min: "50000000",
            price_max: "100000000",
          },
          {
            label: "₦100M - ₦200M",
            price_min: "100000000",
            price_max: "200000000",
          },
          { label: "Over ₦200M", price_min: "200000000", price_max: null },
        ],
        rent: [
          { label: "Under ₦500K", price_min: null, price_max: "500000" },
          { label: "₦500K - ₦1M", price_min: "500000", price_max: "1000000" },
          { label: "₦1M - ₦2M", price_min: "1000000", price_max: "2000000" },
          { label: "Over ₦2M", price_min: "2000000", price_max: null },
        ],
        short_let: [
          { label: "Under ₦30K", price_min: null, price_max: "30000" },
          { label: "₦30K - ₦60K", price_min: "30000", price_max: "60000" },
          { label: "₦60K - ₦100K", price_min: "60000", price_max: "100000" },
          { label: "Over ₦100K", price_min: "100000", price_max: null },
        ],
      },
    },
  };
}

export async function getHomePageData(): Promise<HomePageData> {
  try {
    const url = buildUrl(HOME_ENDPOINT);
    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
      },
      next: { revalidate: 60 },
    });
    const data = await parseResponse<HomePageData | HomePageData[]>(response);

    return Array.isArray(data)
      ? (data[0] ?? emptyHomeData)
      : (data ?? emptyHomeData);
  } catch (error) {
    // Fallback to demo data if API fails
    console.warn(
      "Failed to fetch home page data from API, using demo data:",
      error,
    );
    return getDemoHomeData();
  }
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
  try {
    const url = new URL(buildUrl(PROPERTIES_ENDPOINT));

    // Add query parameters
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          url.searchParams.append(key, String(value));
        }
      });
    }

    const response = await fetch(url.toString(), {
      headers: {
        Accept: "application/json",
      },
    });
    return parseResponse<PropertyListResponse>(response);
  } catch (error) {
    // Fallback to demo data if API fails
    console.warn(
      "Failed to fetch properties from API, using demo data:",
      error,
    );
    const allProps = convertDemoToApiProperties();

    // Apply filtering to demo data
    let filtered = allProps;

    if (filters?.listing_type) {
      filtered = filtered.filter(
        (p) => p.property_listing === filters.listing_type,
      );
    }

    if (filters?.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.title.toLowerCase().includes(searchTerm) ||
          p.location.toLowerCase().includes(searchTerm),
      );
    }

    if (filters?.location) {
      const locationTerm = filters.location.toLowerCase();
      filtered = filtered.filter((p) =>
        p.location.toLowerCase().includes(locationTerm),
      );
    }

    if (filters?.min_bedrooms) {
      filtered = filtered.filter((p) => p.bedrooms >= filters.min_bedrooms!);
    }

    if (filters?.max_bedrooms) {
      filtered = filtered.filter((p) => p.bedrooms <= filters.max_bedrooms!);
    }

    if (filters?.min_bathrooms) {
      filtered = filtered.filter((p) => p.bathrooms >= filters.min_bathrooms!);
    }

    if (filters?.is_available !== undefined) {
      filtered = filtered.filter(
        (p) => p.is_available === filters.is_available,
      );
    }

    // Pagination
    const limit = filters?.limit || 10;
    const page = filters?.page || 1;
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    const items = filtered.slice(startIndex, endIndex);

    return {
      count: filtered.length,
      results: items,
    };
  }
}

export async function getPropertyBySlug(slug: string): Promise<Property> {
  try {
    const url = buildUrl(`${PROPERTY_DETAIL_ENDPOINT}${slug}/`);
    const response = await fetch(url, {
      headers: {
        Accept: "application/json",
      },
    });
    return parseResponse<Property>(response);
  } catch (error) {
    // Fallback to demo data if API fails
    console.warn("Failed to fetch property from API, using demo data:", error);

    // Try to find the property in demo data
    const allProps = convertDemoToApiProperties();
    const found = allProps.find((p) => p.slug === slug || p.id === slug);

    if (found) {
      return found;
    }

    // If still not found, throw an error
    throw new PropertyServiceError(`Property not found: ${slug}`, 404, null);
  }
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
