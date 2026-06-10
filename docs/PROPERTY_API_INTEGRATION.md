# Property API Integration - Implementation Summary

## Overview

Complete integration of the REM property API endpoints into your Next.js application. This includes type definitions, service functions, React hooks, and example components.

## Files Created/Modified

### 1. **`src/services/property.ts`** (NEW)

Core service module for all property API operations.

**Key Functions:**

- `getHomePageData()` - Fetch featured properties, categories, and search config
- `getProperties(filters)` - Fetch paginated property list with filters
- `getPropertyBySlug(slug)` - Get single property details
- `getPropertyAgent(slug)` - Get agent info for property
- `getSimilarProperties(slug)` - Get similar properties
- `createProperty(formData, token)` - Create property (auth required)
- `updateProperty(slug, formData, token)` - Update property (auth required)
- `patchProperty(slug, data, token)` - Partial update (auth required)
- `deleteProperty(slug, token)` - Delete property (auth required)

**Error Handling:**

- Custom `PropertyServiceError` class extending `ApiError`
- Proper HTTP error handling with status codes and payloads

### 2. **`src/hooks/useProperty.ts`** (NEW)

React hooks for client-side property data fetching.

**Available Hooks:**

- `useHomePageData()` - Hook for home page aggregated data
- `useProperties(filters)` - Hook for property list with optional filters
- `usePropertyDetail(slug)` - Hook for single property details
- `useSimilarProperties(slug)` - Hook for similar properties

**Each hook returns:**

```typescript
{
  data: T | null,        // Fetched data or null
  loading: boolean,      // Loading state
  error: Error | null    // Error object or null
}
```

### 3. **`src/services/index.ts`** (UPDATED)

Updated to export all property service functions and types.

```typescript
export {
  getHomePageData,
  getProperties,
  getPropertyBySlug,
  getPropertyAgent,
  getSimilarProperties,
  createProperty,
  updateProperty,
  patchProperty,
  deleteProperty,
} from "./property";

export type {
  Property,
  Agent,
  PropertyImage,
  PropertyAmenity,
  HomePageData,
  Category,
  SearchConfig,
  PropertyListResponse,
  PropertyFilterParams,
} from "./property";
```

### 4. **`src/components/home/PropertyExamples.tsx`** (NEW)

Example components demonstrating API usage:

- `HomeHero` - Hero section with search form using search_config
- `FeaturedPropertiesCarousel` - Display featured properties in grid
- `PropertyListWithFilters` - Property list with sidebar filters and pagination

### 5. **`src/components/home/PropertyDetailPage.tsx`** (NEW)

Complete property detail page component:

- Image gallery with thumbnails
- Property summary card with pricing
- Detailed property information
- Amenities list
- Agent contact card with ratings and experience
- Similar properties carousel

### 6. **`src/services/README.md`** (UPDATED)

Comprehensive documentation including:

- API endpoint functions
- Hook usage examples
- Environment variable setup
- Error handling patterns
- Filter parameters reference
- Response type definitions
- Complete code examples

## Environment Configuration

Add to your `.env.local`:

```env
# Base URL for all API requests
NEXT_PUBLIC_API_BASE_URL=https://api.example.com

# Optional: Specific endpoints (defaults provided in service)
NEXT_PUBLIC_HOME_ENDPOINT=/api/v1/home/
NEXT_PUBLIC_PROPERTIES_ENDPOINT=/api/v1/property/
NEXT_PUBLIC_PROPERTY_DETAIL_ENDPOINT=/api/v1/property/
```

## Type Definitions

### Property

Main property object returned by the API with all listing details.

### HomePageData

Aggregated data for home page:

- `featured_properties[]` - Up to 6 featured listings
- `categories[]` - Categories with live counts
- `search_config` - Configuration for search dropdowns

### PropertyListResponse

Paginated list response:

- `count` - Total properties matching filter
- `next` - URL to next page (if exists)
- `previous` - URL to previous page (if exists)
- `results[]` - Array of properties for current page

### Agent

Agent information with:

- Basic info (name, avatar, contact)
- Verification status
- Ratings and experience
- Total listings count

## Usage Examples

### Server Component (Next.js 13+)

```typescript
import { getProperties, getHomePageData } from '@/services';

export async function HomePage() {
  const homeData = await getHomePageData();
  const properties = await getProperties({ limit: 10 });

  return (
    <div>
      {/* Use homeData and properties */}
    </div>
  );
}
```

### Client Component

```typescript
'use client';

import { useHomePageData, useProperties } from '@/hooks/useProperty';

export function ClientComponent() {
  const { data, loading, error } = useHomePageData();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <div>{/* Use data */}</div>;
}
```

### Property Detail Page

```typescript
'use client';

import { usePropertyDetail } from '@/hooks/useProperty';

export function DetailPage({ slug }: { slug: string }) {
  const { data: property } = usePropertyDetail(slug);

  return (
    <div>
      <h1>{property?.title}</h1>
      <p>{property?.price_display}</p>
      {/* Full property details */}
    </div>
  );
}
```

## API Endpoints Consumed

### Public Endpoints

- `GET /api/v1/home/` - Home page data (featured, categories, search config)
- `GET /api/v1/property/` - Property list with filtering and pagination
- `GET /api/v1/property/{slug}/` - Property details
- `GET /api/v1/property/{slug}/agent/` - Property agent info
- `GET /api/v1/property/{slug}/similar/` - Similar properties

### Protected Endpoints (Require Token)

- `POST /api/v1/property/` - Create property
- `PUT /api/v1/property/{slug}/` - Update property
- `PATCH /api/v1/property/{slug}/` - Partial update
- `DELETE /api/v1/property/{slug}/` - Delete property

## Filter Parameters Supported

```typescript
{
  amenities?: string;           // Comma-separated IDs
  is_available?: boolean;
  limit?: number;               // Per page
  listing_type?: string;        // 'for_sale', 'rent', 'short_let'
  location?: string;
  max_bedrooms?: number;
  max_price?: number;
  min_bathrooms?: number;
  min_bedrooms?: number;
  min_price?: number;
  ordering?: string;            // e.g. '-created_at', 'price'
  page?: number;
  property_type?: string;
  search?: string;              // Text search
}
```

## Performance Characteristics

- **Home page endpoint**: 5-6 SQL queries regardless of result size
- **Property list**: Paginated to manage large datasets
- **Detail endpoint**: Includes similar properties (no extra query)
- **Caching**: HTTP cache headers respected

## Error Handling

All functions throw `PropertyServiceError` with:

- `status` - HTTP status code
- `payload` - Response body from API
- `message` - Human-readable error message

```typescript
try {
  const property = await getPropertyBySlug("slug");
} catch (error) {
  if (error instanceof PropertyServiceError) {
    console.log(error.status); // e.g., 404, 500
    console.log(error.payload); // API response
  }
}
```

## Authentication

For protected endpoints:

1. Get token: `const token = getStoredAccessToken();`
2. Pass to function: `await createProperty(formData, token);`
3. Token refresh: `await refreshAccessToken();`

## Next Steps

1. ✅ Configure `NEXT_PUBLIC_API_BASE_URL` in `.env.local`
2. ✅ Import hooks in client components: `import { useProperties } from '@/hooks/useProperty'`
3. ✅ Import services in server components: `import { getProperties } from '@/services'`
4. ✅ Use example components as templates for your UI
5. ✅ Customize styling to match your design system

## Component Customization

The example components (`PropertyExamples.tsx`, `PropertyDetailPage.tsx`) use:

- Tailwind CSS for styling
- Basic utility classes that can be easily modified
- Semantic HTML structure for accessibility
- Responsive grid layouts

Replace the styling classes with your design system classes as needed.

## Notes

- All dates are ISO 8601 format strings
- Prices are decimal strings (use `parseFloat()` for calculations)
- Images are full URLs ready to use with `<img>` tags
- All endpoints support both JSON and form data
- Unauthenticated requests always get `is_favorited: false`

---

**Implementation Date:** May 28, 2026
**Framework:** Next.js 16.2.6
**React Version:** 19.2.4
**TypeScript:** Yes
