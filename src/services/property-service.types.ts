import type { PaginatedResponse, Property, SearchFilters } from "@/types/real-estate";

export interface PropertySearchRequest {
  filters: SearchFilters;
  page?: number;
  pageSize?: number;
}

export type PropertySearchResponse = PaginatedResponse<Property>;

export interface PropertyService {
  searchProperties(request: PropertySearchRequest): Promise<PropertySearchResponse>;
  getPropertyBySlug(slug: string): Promise<Property>;
}
