# Property API - Key Entry Points

## 🎯 Where to Start

### 1. **Services** (Backend/Data Layer)

File: [`src/services/property.ts`](src/services/property.ts)

Export from: `src/services/index.ts`

```typescript
import {
  getHomePageData,
  getProperties,
  getPropertyBySlug,
  getPropertyAgent,
  getSimilarProperties,
  createProperty,
  updateProperty,
  patchProperty,
  deleteProperty,
} from "@/services";
```

**Use in:** Server components, API routes, server actions

---

### 2. **Hooks** (React Layer)

File: [`src/hooks/useProperty.ts`](src/hooks/useProperty.ts)

```typescript
import {
  useHomePageData,
  useProperties,
  usePropertyDetail,
  useSimilarProperties,
} from "@/hooks/useProperty";
```

**Use in:** Client components (with `'use client'`)

---

### 3. **Types** (TypeScript)

File: [`src/services/property.ts`](src/services/property.ts)

Export from: `src/services/index.ts`

```typescript
import type {
  Property,
  Agent,
  PropertyImage,
  PropertyAmenity,
  HomePageData,
  Category,
  SearchConfig,
  PropertyListResponse,
  PropertyFilterParams,
} from "@/services";
```

---

### 4. **Example Components**

#### A. Home Page Components

File: [`src/components/home/PropertyExamples.tsx`](src/components/home/PropertyExamples.tsx)

```typescript
import {
  HomeHero,
  FeaturedPropertiesCarousel,
  PropertyListWithFilters,
} from "@/components/home/PropertyExamples";
```

Components:

- `HomeHero` - Hero section with search form
- `FeaturedPropertiesCarousel` - Featured properties grid
- `PropertyListWithFilters` - Property list with sidebar filters

#### B. Detail Page Component

File: [`src/components/home/PropertyDetailPage.tsx`](src/components/home/PropertyDetailPage.tsx)

```typescript
import { PropertyDetailPage } from '@/components/home/PropertyDetailPage';

// Usage:
export function PropertyPage({ slug }: { slug: string }) {
  return <PropertyDetailPage slug={slug} />;
}
```

---

## 📚 Documentation Files

### Quick References

- **[QUICK_START.md](docs/QUICK_START.md)** - 5-minute quick start guide
- **[PROPERTY_API_CHECKLIST.md](PROPERTY_API_CHECKLIST.md)** - Implementation checklist
- **[IMPLEMENTATION_COMPLETE.md](IMPLEMENTATION_COMPLETE.md)** - Full summary

### Comprehensive Guides

- **[docs/PROPERTY_API_INTEGRATION.md](docs/PROPERTY_API_INTEGRATION.md)** - Complete API reference
- **[src/services/README.md](src/services/README.md)** - Detailed service documentation

---

## 🚀 Usage Patterns

### Pattern 1: Fetch on Server, Render

```typescript
// app/page.tsx
import { getProperties } from '@/services';

export default async function Page() {
  const { results } = await getProperties({ limit: 10 });
  return <div>{/* render */}</div>;
}
```

### Pattern 2: Fetch on Client with Hook

```typescript
// 'use client';
import { useProperties } from '@/hooks/useProperty';

export function PropertyList() {
  const { data, loading, error } = useProperties({ limit: 20 });
  return <div>{/* render */}</div>;
}
```

### Pattern 3: Detail Page

```typescript
// 'use client';
import { PropertyDetailPage } from '@/components/home/PropertyDetailPage';

export default function Page({ params }: { params: { slug: string } }) {
  return <PropertyDetailPage slug={params.slug} />;
}
```

### Pattern 4: Filters with State

```typescript
// 'use client';
import { useState } from 'react';
import { useProperties, type PropertyFilterParams } from '@/hooks/useProperty';

export function FilteredList() {
  const [filters, setFilters] = useState<PropertyFilterParams>({
    listing_type: 'for_sale',
    limit: 12,
  });

  const { data } = useProperties(filters);
  return <div>{/* render */}</div>;
}
```

---

## 🔍 API Endpoints Reference

### GET /api/v1/home/

**Function:** `getHomePageData()`
**Returns:** HomePageData (featured properties, categories, search config)

### GET /api/v1/property/

**Function:** `getProperties(filters?)`
**Filters:** See PropertyFilterParams
**Returns:** PropertyListResponse (paginated results)

### GET /api/v1/property/{slug}/

**Function:** `getPropertyBySlug(slug)`
**Returns:** Property (with images, amenities, agent)

### GET /api/v1/property/{slug}/agent/

**Function:** `getPropertyAgent(slug)`
**Returns:** Agent details

### GET /api/v1/property/{slug}/similar/

**Function:** `getSimilarProperties(slug)`
**Returns:** Property[] (similar listings)

### POST /api/v1/property/

**Function:** `createProperty(formData, token)`
**Auth:** Required (Bearer token)
**Body:** FormData with property details
**Returns:** Property

### PUT /api/v1/property/{slug}/

**Function:** `updateProperty(slug, formData, token)`
**Auth:** Required
**Body:** FormData with updates
**Returns:** Property

### PATCH /api/v1/property/{slug}/

**Function:** `patchProperty(slug, data, token)`
**Auth:** Required
**Body:** JSON with partial updates
**Returns:** Property

### DELETE /api/v1/property/{slug}/

**Function:** `deleteProperty(slug, token)`
**Auth:** Required
**Returns:** void

---

## 🎨 Component Structure

### PropertyExamples.tsx

```
HomeHero
├── Search form with dropdowns
├── Uses search_config for options
└── Category browsing

FeaturedPropertiesCarousel
├── Grid of featured properties
├── Agent cards
└── Action buttons

PropertyListWithFilters
├── Filter sidebar
├── Property grid
└── Pagination controls
```

### PropertyDetailPage.tsx

```
PropertyDetailPage
├── Image gallery with thumbnails
├── Property summary card
├── Property details section
├── Amenities list
├── Agent information card
└── Similar properties carousel
```

---

## 📦 Environment Configuration

Add to `.env.local`:

```env
# Required
NEXT_PUBLIC_API_BASE_URL=https://your-api-domain.com

# Optional (defaults provided)
NEXT_PUBLIC_HOME_ENDPOINT=/api/v1/home/
NEXT_PUBLIC_PROPERTIES_ENDPOINT=/api/v1/property/
NEXT_PUBLIC_PROPERTY_DETAIL_ENDPOINT=/api/v1/property/
```

---

## 🔐 Authentication

### For Protected Endpoints:

```typescript
import { getStoredAccessToken } from "@/services";

const token = getStoredAccessToken();
if (token) {
  await createProperty(formData, token);
}
```

### Token Refresh:

```typescript
import { refreshAccessToken } from "@/services";

const newToken = await refreshAccessToken();
```

---

## 🛠️ TypeScript Support

All code is fully typed:

- ✅ No `any` types
- ✅ Proper null/undefined handling
- ✅ Generic type support
- ✅ Type exports for consumer use
- ✅ Union types for strict values

---

## ⚡ Performance Tips

1. **Use pagination:** Limit results to manage large datasets
2. **Filter early:** Use filters to reduce results
3. **Cache results:** Consider SWR or React Query for caching
4. **Lazy load images:** Use loading attribute on images
5. **Memoize components:** Prevent unnecessary re-renders

---

## 🐛 Error Handling

All API functions throw `PropertyServiceError`:

```typescript
try {
  const property = await getPropertyBySlug("slug");
} catch (error) {
  if (error instanceof PropertyServiceError) {
    console.log(error.status); // HTTP status
    console.log(error.payload); // API response
    console.log(error.message); // Description
  }
}
```

---

## 🎯 Common Tasks

### Display Featured Properties

```typescript
import { useHomePageData } from '@/hooks/useProperty';

const { data } = useHomePageData();
data?.featured_properties.map(prop => (...))
```

### Search/Filter Properties

```typescript
import { useProperties } from "@/hooks/useProperty";

const { data } = useProperties({
  search: "luxury",
  min_price: 10000000,
  max_price: 50000000,
  limit: 20,
});
```

### Show Property Details

```typescript
import { PropertyDetailPage } from '@/components/home/PropertyDetailPage';

<PropertyDetailPage slug="property-slug" />
```

### Paginate Results

```typescript
const [page, setPage] = useState(1);
const { data } = useProperties({ page, limit: 20 });

// Next page
setPage((prev) => prev + 1);
```

---

## ✅ Verification Checklist

Before deploying:

- [ ] API_BASE_URL configured in .env.local
- [ ] Tested with your backend API
- [ ] Components styled to match design
- [ ] Error boundaries added
- [ ] Loading states implemented
- [ ] Images optimized
- [ ] TypeScript compiles (0 errors)
- [ ] Tests pass (if applicable)

---

## 📞 Support Resources

- **API Docs:** [PROPERTY_API_INTEGRATION.md](docs/PROPERTY_API_INTEGRATION.md)
- **Quick Start:** [QUICK_START.md](docs/QUICK_START.md)
- **Service Docs:** [src/services/README.md](src/services/README.md)
- **Source Code:** In-file JSDoc comments

---

**Ready to build!** 🚀
