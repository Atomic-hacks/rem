# Quick Start: Property API Integration

## 1. Configure Environment

Add to `.env.local`:

```env
NEXT_PUBLIC_API_BASE_URL=https://your-api-domain.com
```

## 2. Import and Use

### Client Component (Recommended for property browsing)

```typescript
'use client';

import { useHomePageData, useProperties } from '@/hooks/useProperty';

export function HomePage() {
  const { data, loading, error } = useHomePageData();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Featured Properties</h1>
      {data?.featured_properties.map(prop => (
        <div key={prop.id}>
          <h2>{prop.title}</h2>
          <p>{prop.price_display}</p>
          <img src={prop.main_image_url} alt={prop.title} />
        </div>
      ))}
    </div>
  );
}
```

### Server Component (For server-side rendering)

```typescript
import { getProperties } from '@/services';

export async function PropertyList() {
  const { results } = await getProperties({
    limit: 10,
    listing_type: 'for_sale'
  });

  return (
    <div>
      {results.map(prop => (
        <div key={prop.id}>{prop.title}</div>
      ))}
    </div>
  );
}
```

## 3. Use Example Components

Import ready-to-use components:

```typescript
import {
  HomeHero,
  FeaturedPropertiesCarousel,
  PropertyListWithFilters
} from '@/components/home/PropertyExamples';

import { PropertyDetailPage } from '@/components/home/PropertyDetailPage';

export function YourPage() {
  return (
    <>
      <HomeHero />
      <FeaturedPropertiesCarousel />
      <PropertyListWithFilters />
    </>
  );
}
```

## 4. Available Hooks

```typescript
// Home page data (featured, categories, search config)
const { data, loading, error } = useHomePageData();

// Properties with filters
const { data, loading, error } = useProperties({
  listing_type: "for_sale",
  min_bedrooms: 3,
  max_price: 50000000,
  limit: 20,
  page: 1,
});

// Single property detail
const { data: property, loading, error } = usePropertyDetail("property-slug");

// Similar properties
const { data: similar, loading, error } = useSimilarProperties("property-slug");
```

## 5. Available Services

```typescript
import {
  getHomePageData, // Aggregated home page data
  getProperties, // List with filters
  getPropertyBySlug, // Single property detail
  getPropertyAgent, // Agent info
  getSimilarProperties, // Similar properties
  createProperty, // Create (auth required)
  updateProperty, // Update (auth required)
  patchProperty, // Partial update (auth required)
  deleteProperty, // Delete (auth required)
} from "@/services";
```

## 6. Type Definitions

```typescript
import type {
  Property, // Main property object
  Agent, // Agent information
  HomePageData, // Home page aggregated data
  PropertyListResponse, // Paginated list response
  PropertyFilterParams, // Filter parameters
} from "@/services";
```

## 7. Common Filter Parameters

```typescript
{
  listing_type: 'for_sale' | 'rent' | 'short_let',
  min_bedrooms: number,
  max_bedrooms: number,
  min_price: number,
  max_price: number,
  location: string,
  search: string,           // Text search
  limit: number,            // Results per page
  page: number,             // Page number
  property_type: string,    // apartment, house, etc.
  is_available: boolean,
}
```

## 8. Error Handling

```typescript
import { PropertyServiceError } from "@/services";

try {
  const property = await getPropertyBySlug("slug");
} catch (error) {
  if (error instanceof PropertyServiceError) {
    console.log("HTTP Status:", error.status);
    console.log("Response:", error.payload);
  }
}
```

## 9. Authentication (For Agent Operations)

```typescript
import { getStoredAccessToken, createProperty } from "@/services";

const token = getStoredAccessToken();
if (token) {
  const property = await createProperty(formData, token);
}
```

## 10. Complete Examples

See:

- [`src/components/home/PropertyExamples.tsx`](../src/components/home/PropertyExamples.tsx) - Home page components
- [`src/components/home/PropertyDetailPage.tsx`](../src/components/home/PropertyDetailPage.tsx) - Detail page
- [`src/services/README.md`](../src/services/README.md) - Full documentation
- [`docs/PROPERTY_API_INTEGRATION.md`](./PROPERTY_API_INTEGRATION.md) - Complete reference

## API Response Examples

### Featured Property

```json
{
  "id": "123",
  "title": "Luxury Modern Villa",
  "location": "Banana Island, Lagos",
  "price_display": "₦75,000,000",
  "bedrooms": 5,
  "bathrooms": 4,
  "sqft": 4200,
  "is_featured": true,
  "is_favorited": false,
  "main_image_url": "https://...",
  "agent": {
    "full_name": "Emeka Okafor",
    "total_listings": 14
  }
}
```

### Home Page Response

```json
{
  "featured_properties": [...],
  "categories": [
    {
      "listing_type": "for_sale",
      "label": "For Sale",
      "count": 142
    }
  ],
  "search_config": {
    "listing_types": [...],
    "price_ranges": {...}
  }
}
```

## Troubleshooting

**No data showing?**

- Check `NEXT_PUBLIC_API_BASE_URL` is correct
- Check browser network tab for API response status
- Check console for error messages

**Getting 404 errors?**

- Verify the API base URL
- Check property slugs are correct
- Ensure endpoints match your API

**Performance issues?**

- Use pagination with `limit` parameter
- Filter results appropriately
- Consider caching with `useMemo` or SWR

---

For detailed documentation, see [PROPERTY_API_INTEGRATION.md](./PROPERTY_API_INTEGRATION.md)
