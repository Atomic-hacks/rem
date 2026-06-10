# Property Detail Components

This directory contains reusable UI components for displaying property details across the application.

## Components

### ImageCarousel

Animated image carousel with dot navigation indicators.

**Location**: `ImageCarousel.tsx`

**Props**:

```typescript
interface ImageCarouselProps {
  images: string[];
  title: string;
}
```

**Features**:

- Smooth fade animations between images
- Keyboard and click navigation via dot indicators
- Gradient overlay for better text readability
- Responsive sizing (h-72 on mobile, h-96 on desktop)

**Usage**:

```tsx
<ImageCarousel images={["url1", "url2", "url3"]} title="Property Title" />
```

---

### AgentCard

Displays listing agent information with contact and messaging capabilities.

**Location**: `AgentCard.tsx`

**Props**:

```typescript
interface AgentCardProps {
  agent: ListingAgent;
}

interface ListingAgent {
  name: string;
  company: string;
  location: string;
  rating: number;
  reviews: number;
  phone: string;
  email: string;
  initials: string;
}
```

**Features**:

- Agent profile with initials avatar
- Star rating with review count
- Quick call and email buttons
- Expandable message form
- Sticky positioning (stays in view while scrolling)
- Smooth animations on open/close

**Sections**:

1. **Listing Agent** - Profile info with rating
2. **Contact Details** - Phone and email display
3. **Message Agent** - Expandable form for direct messaging

**Usage**:

```tsx
<AgentCard
  agent={{
    name: "John Doe",
    company: "Premium Properties",
    location: "Lagos",
    rating: 4.8,
    reviews: 52,
    phone: "+234 801 234 5678",
    email: "john@properties.com",
    initials: "JD",
  }}
/>
```

---

### PropertyStats

Displays key property statistics (bedrooms, bathrooms, area).

**Location**: `PropertyStats.tsx`

**Props**:

```typescript
interface PropertyStatsProps {
  bedrooms: number;
  bathrooms: number;
  areaSqft: number;
}
```

**Features**:

- Grid layout (3 columns)
- Icon-based visual hierarchy
- Responsive typography
- Smooth entrance animation
- Clean card styling

**Stats Displayed**:

- Bedrooms (with bed icon)
- Bathrooms (with bathtub icon)
- Area in sqft (with area icon)

**Usage**:

```tsx
<PropertyStats bedrooms={3} bathrooms={2} areaSqft={1800} />
```

---

### FeaturesList

Displays an animated list of property features and amenities.

**Location**: `FeaturesList.tsx`

**Props**:

```typescript
interface FeaturesListProps {
  features: string[];
}
```

**Features**:

- Staggered entrance animations
- Bullet-point style indicators
- Clean card-based layout
- Divider lines between items
- Responsive grid

**Example Features**:

- "Waterfront location"
- "Private pool"
- "Smart home automation"
- "24/7 Security"
- "Parking included"

**Usage**:

```tsx
<FeaturesList
  features={["Waterfront location", "Private pool", "Smart home automation"]}
/>
```

---

## Styling Conventions

All components use consistent styling:

- **Colors**:
  - Primary accent: `amber-400` / `amber-500`
  - Text: `stone-600` / `stone-800` / `stone-900`
  - Backgrounds: `white`, `stone-50`, `#FAF7F2`
  - Borders: `border-stone-100` / `border-stone-200`

- **Spacing**:
  - Padding: `p-5`, `p-6`, `px-3 py-2.5`
  - Gap: `gap-2`, `gap-3`, `gap-4`, `gap-5`
  - Margins: `mt-1`, `mt-4`, etc.

- **Typography**:
  - Headings: `font-semibold text-lg` to `text-3xl`
  - Body: `text-sm` to `text-base`
  - Light weight for secondary info: `font-light`

- **Borders & Shadows**:
  - Border: `border border-stone-100`
  - Rounded: `rounded-lg`, `rounded-xl`, `rounded-2xl`
  - Shadow: `shadow-sm` for subtle depth

---

## Animations

Components use **Framer Motion** for smooth animations:

- **ImageCarousel**: Fade in/out transitions
- **AgentCard**: Slide in from right, staggered appearance
- **PropertyStats**: Fade up with delay
- **FeaturesList**: Staggered item animations

Animation configuration:

```typescript
transition={{ duration: 0.4, ease: "easeOut" }}
```

---

## Responsive Behavior

All components are mobile-first responsive:

- **Mobile** (< 640px): Full width, stacked layout
- **Tablet** (640px - 1024px): Optimized spacing
- **Desktop** (> 1024px): Full featured layout

Key breakpoints used:

- `sm:` - 640px
- `md:` - 768px
- `lg:` - 1024px

---

## Accessibility

Components follow accessibility best practices:

- ✅ Semantic HTML (`button`, `a` tags)
- ✅ ARIA labels for icon buttons
- ✅ Keyboard navigation support
- ✅ Sufficient color contrast
- ✅ Focus indicators
- ✅ Proper heading hierarchy

---

## Usage in PropertyDetailTemplate

These components are combined in `PropertyDetailTemplate` to create complete property detail pages:

```tsx
<PropertyDetailTemplate
  title="Property Title"
  location="Location"
  price={250000000}
  priceLabel="Price"
  images={[...]}
  bedrooms={3}
  bathrooms={2}
  areaSqft={1800}
  description="..."
  features={[...]}
  agent={agent}
  backLink="/properties"
/>
```

---

## Usage in Custom Layouts

Components can also be used independently for custom layouts:

```tsx
import {
  ImageCarousel,
  AgentCard,
  PropertyStats,
  FeaturesList,
} from "@/components/ui/property-details";

export default function CustomPropertyPage() {
  return (
    <div className="p-4">
      <ImageCarousel images={images} title={title} />
      <PropertyStats bedrooms={3} bathrooms={2} areaSqft={1800} />
      <FeaturesList features={features} />
      <AgentCard agent={agent} />
    </div>
  );
}
```

---

## Performance Considerations

- **Lazy Loading**: Images load only when needed
- **Memoization**: Consider wrapping in React.memo() for expensive renders
- **Animation Performance**: Framer Motion optimizes animations with GPU acceleration
- **Bundle Size**: Each component is small (40-120 lines)

---

## Testing

When testing these components:

1. **ImageCarousel**: Test carousel navigation, all images render
2. **AgentCard**: Test call/email button functionality, message form toggle
3. **PropertyStats**: Test responsive layout, correct icons
4. **FeaturesList**: Test animation timing, all features display

Example test:

```typescript
describe("ImageCarousel", () => {
  it("should display all images", () => {
    render(<ImageCarousel images={["url1", "url2"]} title="Test" />);
    expect(screen.getByAltText(/Test image 1/)).toBeInTheDocument();
    expect(screen.getByAltText(/Test image 2/)).toBeInTheDocument();
  });

  it("should navigate to next image on dot click", () => {
    render(<ImageCarousel images={["url1", "url2"]} title="Test" />);
    const dots = screen.getAllByRole("button");
    fireEvent.click(dots[1]);
    expect(screen.getByAltText(/Test image 2/)).toBeInTheDocument();
  });
});
```

---

## Common Issues & Solutions

**Issue**: Component not rendering

- **Solution**: Ensure all required props are provided with correct types

**Issue**: Images not loading

- **Solution**: Verify image URLs are valid and accessible

**Issue**: Message form not appearing

- **Solution**: Check agent data is complete, click message button to expand

**Issue**: Animations stuttering

- **Solution**: Check browser performance, consider reducing animation complexity

---

## Future Enhancements

- [ ] Add image zoom on hover
- [ ] Add image sharing to social media
- [ ] Add property comparison tool
- [ ] Add virtual tour support
- [ ] Add review section
- [ ] Add related properties carousel
- [ ] Add inquiry form instead of just messaging
- [ ] Add property timeline (price history)

---

## Related Files

- `src/features/property-details/PropertyDetailTemplate.tsx` - Template combining all components
- `src/data/properties.ts` - Mock property data
- `src/types/listings.ts` - TypeScript type definitions
- `src/lib/property-utils.ts` - Utility functions for formatting
