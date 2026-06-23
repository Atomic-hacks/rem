# Project Architecture Guide

## Overview

REM is a Next.js-based real estate and property rental marketplace. This guide outlines the project structure and development patterns.

## Directory Structure

```
rem/
├── app/                          # Next.js App Router pages
│   ├── (auth)/                   # Auth-related pages (sign-in, sign-up, etc.)
│   ├── shortlet/                 # Short-let property listings and details
│   ├── userRent/                 # Rental property listings and details
│   ├── userSale/                 # Sale property listings and details
│   ├── agent/                    # Agent pages
│   ├── blog/                     # Blog pages
│   ├── contact/                  # Contact page
│   ├── home/                     # Home page
│   ├── privacy/                  # Privacy policy
│   ├── terms/                    # Terms of service
│   ├── layout.tsx                # Root layout
│   ├── page.tsx                  # Home page (public)
│   └── globals.css               # Global styles
│
├── src/
│   ├── components/               # Reusable React components
│   │   ├── home/                 # Homepage-specific components
│   │   │   ├── Categories.tsx
│   │   │   ├── FeaturedProperties.tsx
│   │   │   ├── Hero.tsx
│   │   │   └── ReadyToListYourProperty.tsx
│   │   ├── layout/               # Layout components
│   │   │   ├── Footer.tsx
│   │   │   └── Navbar.tsx
│   │   └── ui/                   # Reusable UI components
│   │       └── property-details/ # Property detail sub-components
│   │           ├── ImageCarousel.tsx
│   │           ├── AgentCard.tsx
│   │           ├── PropertyStats.tsx
│   │           ├── FeaturesList.tsx
│   │           └── index.ts
│   │
│   ├── features/                 # Feature-specific implementations
│   │   ├── agents/               # Agent-related features
│   │   ├── auth/                 # Authentication components
│   │   │   ├── AuthShell.tsx
│   │   │   ├── Onboarding.tsx
│   │   │   ├── SignIn.tsx
│   │   │   └── SignUp.tsx
│   │   ├── listings/             # Listing-related features
│   │   ├── map/                  # Map features
│   │   ├── search/               # Search features
│   │   └── property-details/     # Property detail template
│   │       ├── PropertyDetailTemplate.tsx
│   │       └── index.ts
│   │
│   ├── hooks/                    # Custom React hooks
│   │
│   ├── lib/                      # Utility functions and helpers
│   │   └── property-utils.ts     # Property formatting functions
│   │
│   ├── services/                 # API/external services
│   │   ├── auth.ts
│   │   ├── index.ts
│   │   └── property-service.types.ts
│   │
│   ├── styles/                   # Global styles (if any)
│   │
│   ├── types/                    # TypeScript type definitions
│   │   ├── index.ts              # Main types export
│   │   ├── listings.ts           # Listing-related types
│   │   └── real-estate.ts        # Real estate types
│   │
│   ├── constants/                # Constants and configuration
│   └── data/                     # Mock/static data
│       └── properties.ts         # Property data
│
├── docs/                         # Documentation
│   ├── frontend-scaffold.md      # Frontend setup guide
│   ├── PROPERTY_API_INTEGRATION.md
│   └── QUICK_START.md
│
├── public/                       # Static assets
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── postcss.config.mjs
├── next.config.ts
└── eslint.config.mjs
```

## Key Patterns & Conventions

### 1. Component Organization

**UI Components** (`src/components/ui/`):

- Reusable, framework-agnostic UI elements
- No business logic
- Fully typed with TypeScript
- Example: `ImageCarousel`, `AgentCard`, `PropertyStats`

**Feature Components** (`src/features/`):

- Feature-specific implementations
- May contain business logic
- Often use UI components
- Example: `PropertyDetailTemplate` uses all property detail UI components

**Page Components** (`app/*/page.tsx`):

- Next.js page routes
- Minimal logic - mainly data fetching and passing to features
- Example: `app/userRent/[id]/page.tsx` fetches property and passes to template

### 2. Data Flow

```
Page Component
    ↓ (gets params)
Services / Data Layer
    ↓ (fetches/queries)
Property Data
    ↓ (passes props)
Feature Component (PropertyDetailTemplate)
    ↓ (composes)
UI Components (ImageCarousel, AgentCard, etc.)
```

### 3. Type Safety

All data structures are defined in `src/types/`:

- `real-estate.ts`: Core domain types
- `listings.ts`: Listing-specific types including `MarketplaceProperty`, `ShortletProperty`, `ListingAgent`

Using proper types prevents bugs and improves IDE autocompletion.

### 4. Styling

- **Tailwind CSS** for utility-first styling
- **Consistent color scheme**:
  - Accent: `amber-400` / `amber-500`
  - Text: `stone-*` colors
  - Backgrounds: `stone-50` (light), `#FAF7F2` (page)
- **Responsive classes**: `sm:`, `md:`, `lg:` prefixes for mobile-first design
- **Component-level styles**: Keep Tailwind classes in component files

### 5. Icons

- **Feather Icons** (`react-icons/fi`) for most UI icons
- Consistent sizing: `size={20}` or `size={25}` for standardization
- Color: Usually `text-stone-600` with `text-amber-400` for accents

## State Management

Currently using React's built-in hooks:

- `useState`: For component-local state (like message form open/close)
- Consider global state management (Context API, Zustand) if complexity increases

## Performance

- **Code splitting**: Next.js automatically code-splits by route
- **Image optimization**: Using `motion.img` with framer-motion
- **Component memoization**: Use `React.memo()` for expensive renders if needed
- **Server components**: Consider `"use server"` for data fetching in future

## Development Workflow

### Creating a New Property Detail Page

1. Add property data to `src/data/properties.ts` with all extended fields
2. Create page at `app/yourroute/[id]/page.tsx`
3. Use `PropertyDetailTemplate` component
4. Test navigation and all interactive elements

### Adding a New UI Component

1. Create in `src/components/ui/` with proper TypeScript types
2. Export from barrel file (`index.ts`)
3. Document props with JSDoc comments
4. Use in features/pages as needed

### Adding a New Feature

1. Create feature folder in `src/features/`
2. Keep business logic here, UI in `src/components/`
3. Export main component from `index.ts`
4. Use in pages or other features

## Testing

Test files should mirror source structure:

- `src/components/ui/property-details/__tests__/ImageCarousel.test.tsx`
- `src/features/property-details/__tests__/PropertyDetailTemplate.test.tsx`

Focus on:

- Component rendering with various props
- User interactions (clicks, form submissions)
- Responsive behavior
- Accessibility (ARIA labels, keyboard navigation)

## API Integration

Currently uses mock data from `src/data/properties.ts`. For real API:

1. Create service in `src/services/` (e.g., `propertyService.ts`)
2. Define types in `src/services/property-service.types.ts`
3. Use in page components or hooks
4. Replace mock data imports with service calls

Example:

```typescript
// src/services/propertyService.ts
export async function getProperty(id: string) {
  const res = await fetch(`/api/properties/${id}`);
  return res.json();
}

// app/userRent/[id]/page.tsx
const property = await getProperty(params.id);
```

## Common Tasks

### Adding a new field to properties

1. Update type in `src/types/listings.ts`
2. Update all property data in `src/data/properties.ts`
3. Update components that display the field
4. Update templates if needed

### Changing color scheme

1. Update Tailwind color references (currently `amber-*` and `stone-*`)
2. Update `tailwind.config.ts` if customizing colors
3. Test all pages for visual consistency

### Adding new property type

1. Create data in `src/data/properties.ts`
2. Create route in `app/yourtype/`
3. Create pages reusing `PropertyDetailTemplate`
4. Add navigation links in Navbar

## Best Practices

1. **Keep components small** - Single responsibility principle
2. **Use TypeScript** - Define types for all props and data
3. **Extract magic strings** - Use constants from `src/constants/`
4. **Document complex logic** - Add comments explaining "why", not "what"
5. **Test interactive features** - Especially messaging, filtering, etc.
6. **Responsive design first** - Test on mobile, tablet, desktop
7. **Accessibility** - Use semantic HTML, ARIA labels, keyboard navigation
8. **Performance** - Profile components, lazy load when needed

## Troubleshooting

### Page not rendering

- Check if dynamic route `[id]` matches your URL
- Verify property data exists in `src/data/properties.ts`
- Check console for TypeScript errors

### Styling issues

- Verify Tailwind classes are spelled correctly
- Check if Tailwind config includes the file
- Test in different browsers for vendor-specific issues

### Import errors

- Use barrel exports (`index.ts`) for cleaner imports
- Check relative paths are correct
- Verify TypeScript paths are configured in `tsconfig.json`

## Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)
