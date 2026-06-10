# Property Service API Integration

This directory contains the services and hooks for consuming the REM property API endpoints.

## Files Overview

### `src/services/property.ts`

Main service module for all property API operations.

**Exported Functions:**

#### Home Page Data

- `getHomePageData(): Promise<HomePageData>` - Fetch aggregated home page data including featured properties, categories, and search configuration.

#### Property Listing

- `getProperties(filters?: PropertyFilterParams): Promise<PropertyListResponse>` - Fetch paginated list of properties with optional filters.

#### Property Details

- `getPropertyBySlug(slug: string): Promise<Property>` - Fetch full details of a single property.
- `getPropertyAgent(slug: string): Promise<Agent>` - Get agent information for a property.
- `getSimilarProperties(slug: string): Promise<Property[]>` - Get similar properties for a given property.

#### Property Management (Authenticated)

- `createProperty(formData: FormData, accessToken: string): Promise<Property>` - Create a new property (agent only).
- `updateProperty(slug: string, formData: FormData, accessToken: string): Promise<Property>` - Update property (owner/agent only).
- `patchProperty(slug: string, data: Partial<Property>, accessToken: string): Promise<Property>` - Partially update property.
- `deleteProperty(slug: string, accessToken: string): Promise<void>` - Delete a property.

### `src/hooks/useProperty.ts`

React hooks for convenient property data fetching and management.

**Available Hooks:**

- `useHomePageData()` - Hook to fetch and manage home page data
- `useProperties(filters?)` - Hook to fetch properties with optional filters
- `usePropertyDetail(slug)` - Hook to fetch a single property detail
- `useSimilarProperties(slug)` - Hook to fetch similar properties

Each hook returns an object with:

- `data` - The fetched data (or null if loading/error)
- `loading` - Boolean indicating loading state
- `error` - Error object if request failed (or null)

## Environment Variables

Add these to your `.env.local` file to configure API endpoints:

```env
# Base URL for all API requests
NEXT_PUBLIC_API_BASE_URL=https://api.example.com

# Specific endpoints (optional - defaults shown below)
NEXT_PUBLIC_HOME_ENDPOINT=/api/v1/home/
NEXT_PUBLIC_PROPERTIES_ENDPOINT=/api/v1/property/
NEXT_PUBLIC_PROPERTY_DETAIL_ENDPOINT=/api/v1/property/
```

## Usage Examples

### Fetch Home Page Data (Client Component)

```tsx
"use client";

import { useHomePageData } from "@/hooks/useProperty";

export function HomePage() {
  const { data, loading, error } = useHomePageData();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <h1>Featured Properties</h1>
      {data?.featured_properties.map((prop) => (
        <div key={prop.id}>
          <h2>{prop.title}</h2>
          <p>{prop.price_display}</p>
        </div>
      ))}
    </div>
  );
}
```

### Fetch Properties with Filters

```tsx
"use client";

import { useProperties } from "@/hooks/useProperty";

export function PropertyList() {
  const { data, loading, error } = useProperties({
    listing_type: "for_sale",
    min_bedrooms: 3,
    max_price: 50000000,
    limit: 20,
    page: 1,
  });

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div>
      <p>Found {data?.count} properties</p>
      {data?.results.map((prop) => (
        <div key={prop.id}>
          <h3>{prop.title}</h3>
          <p>{prop.location}</p>
          <p>{prop.price_display}</p>
          <p>
            {prop.bedrooms} bed, {prop.bathrooms} bath
          </p>
        </div>
      ))}
    </div>
  );
}
```

### Fetch Property Detail

```tsx
"use client";

import { usePropertyDetail, useSimilarProperties } from "@/hooks/useProperty";

export function PropertyDetailPage({ slug }: { slug: string }) {
  const { data: property, loading, error } = usePropertyDetail(slug);
  const { data: similar } = useSimilarProperties(slug);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;
  if (!property) return <div>Property not found</div>;

  return (
    <div>
      <h1>{property.title}</h1>
      <img src={property.main_image_url} alt={property.title} />
      <p>{property.description}</p>
      <p>Location: {property.location}</p>
      <p>Price: {property.price_display}</p>
      <p>Bedrooms: {property.bedrooms}</p>
      <p>Bathrooms: {property.bathrooms}</p>
      <p>Area: {property.sqft} sqft</p>

      <div>
        <h3>Agent</h3>
        <p>{property.agent.full_name}</p>
        <p>{property.agent.phone}</p>
        <p>{property.agent.email}</p>
      </div>

      {similar && similar.length > 0 && (
        <div>
          <h3>Similar Properties</h3>
          {similar.map((prop) => (
            <div key={prop.id}>{prop.title}</div>
          ))}
        </div>
      )}
    </div>
  );
}
```

### Direct Service Usage (Server Component)

```tsx
import { getProperties, getPropertyBySlug } from "@/services";

export async function PropertyServer() {
  // Fetch properties on the server
  const properties = await getProperties({
    listing_type: "for_sale",
    limit: 10,
  });

  return (
    <div>
      {properties.results.map((prop) => (
        <div key={prop.id}>{prop.title}</div>
      ))}
    </div>
  );
}
```

### Create Property (Agent Only)

```tsx
"use client";

import { createProperty, getStoredAccessToken } from "@/services";

export function CreatePropertyForm() {
  const handleSubmit = async (formData: FormData) => {
    const token = getStoredAccessToken();
    if (!token) {
      console.error("Not authenticated");
      return;
    }

    try {
      const newProperty = await createProperty(formData, token);
      console.log("Property created:", newProperty);
    } catch (error) {
      console.error("Failed to create property:", error);
    }
  };

  return (
    <form action={handleSubmit}>
      <input type="text" name="title" required />
      <input type="text" name="description" required />
      <input type="number" name="price" required />
      <input type="number" name="bedrooms" required />
      <input type="number" name="bathrooms" required />
      <input type="number" name="sqft" required />
      <input type="file" name="cover_image" />
      <button type="submit">Create Property</button>
    </form>
  );
}
```

## API Response Types

### Property

Main property data structure returned by the API.

```typescript
interface Property {
  id: string;
  title: string;
  slug: string;
  description?: string;
  location: string;
  price: string;
  price_display: string;
  property_type: string;
  property_listing: "for_sale" | "rent" | "short_let";
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  is_available: boolean;
  is_featured: boolean;
  is_favorited: boolean;
  main_image_url: string;
  images?: PropertyImage[];
  amenities?: PropertyAmenity[];
  agent: Agent;
  created_at: string;
  updated_at?: string;
}
```

### HomePageData

Aggregated home page data.

```typescript
interface HomePageData {
  featured_properties: Property[];
  categories: Category[];
  search_config: SearchConfig;
}
```

### PropertyListResponse

Paginated list response.

```typescript
interface PropertyListResponse {
  count: number;
  next?: string;
  previous?: string;
  results: Property[];
}
```

## Filter Parameters

When fetching properties, you can use these filter parameters:

```typescript
interface PropertyFilterParams {
  amenities?: string; // Comma-separated IDs
  is_available?: boolean;
  limit?: number; // Results per page
  listing_type?: string; // 'for_sale', 'rent', 'short_let'
  location?: string;
  max_bedrooms?: number;
  max_price?: number;
  min_bathrooms?: number;
  min_bedrooms?: number;
  min_price?: number;
  ordering?: string; // e.g. '-created_at', 'price'
  page?: number;
  property_type?: string;
  search?: string; // Text search
}
```

## Error Handling

All API functions throw `PropertyServiceError` which extends `ApiError`:

```typescript
try {
  const property = await getPropertyBySlug("some-slug");
} catch (error) {
  if (error instanceof PropertyServiceError) {
    console.log(error.status); // HTTP status code
    console.log(error.payload); // Response payload
  }
}
```

## Performance Notes

- The home page endpoint returns everything in one request (5-6 SQL queries max)
- Property list endpoint supports pagination to manage large datasets
- Similar properties are pre-fetched with the detail endpoint
- All requests are cacheable with HTTP cache headers

## Authentication

For endpoints that require authentication (create, update, delete):

1. Get the access token: `const token = getStoredAccessToken();`
2. Pass it to the function: `await createProperty(formData, token);`
3. If the token is expired, use `refreshAccessToken()` to get a new one

## Next Steps

1. Update your `.env.local` with the API base URL
2. Import hooks in your client components
3. Use the service functions in server components
4. Start consuming property data!
