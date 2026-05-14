# Frontend Scaffold

This project uses the Next.js App Router. Route files stay in `app`, while reusable frontend code is organized under `src`.

## Directory Structure

```txt
app/
  globals.css
  layout.tsx
  page.tsx
src/
  components/
    ui/              # domain-agnostic primitives
    layout/          # shared page shells and layout slots
  features/
    listings/        # listing-specific UI
    search/          # search-specific UI
    map/             # map-specific UI
    auth/            # frontend auth UI
    agents/          # agent-specific UI
  hooks/             # all reusable React hooks
  constants/         # shared labels, options, enums, routes
  data/              # mock data and fixtures
  services/          # frontend service interfaces and API contracts
  types/             # shared TypeScript data contracts
  lib/               # shared frontend utilities
  styles/            # style notes and optional CSS modules
```

## Browse Layout

The browse view should be composed as a marketplace route shell. The header owns global navigation and account actions. Global filters sit below the header and own search intent, location, property type, price, and sort state. The listing grid consumes normalized `Property` data and emits card-level interactions such as save, share, open detail, or contact agent. Footer content remains outside the listing feature so the marketplace shell can reuse it.

Recommended ownership:

- `src/components/layout`: header/footer/page shell composition.
- `src/features/search`: search-specific UI.
- `src/features/listings`: listing-specific UI.
- `src/hooks`: global filter state and URL synchronization hooks.
- `src/constants`: filter options, labels, sort options, and routes.

## Split Search Layout

The split search view should treat the property list and map as two synchronized consumers of the same search state. The search feature owns filters, sorting, pagination, and selected property id. The listings feature renders result summaries from `Property[]`. The map feature receives coordinates and selected-marker state through a provider adapter.

The sticky map should not own data fetching. It should receive already-normalized marker data derived from the listing results.

Recommended ownership:

- `src/features/search`: search-specific UI.
- `src/features/listings`: result-list UI.
- `src/features/map`: map UI.
- `src/hooks`: source of truth for filters, selected listing, result state, and map/list sync.
- `src/lib`: map adapters, query parsing, and formatting helpers.

## Detail Layout

The detail view should be organized around a single `Property` contract. The gallery area owns media display and image selection. Property facts, description, amenities, location context, and agent summary consume the same `Property` object. The lead-capture sidebar should receive `Property` and `Agent` data, then emit frontend-only contact intents.

Recommended ownership:

- `src/features/listings`: gallery, facts, amenities, and property sections.
- `src/features/agents`: agent trust indicators and contact-intent state.
- `src/components/layout`: detail-page shell and sidebar slot.
- `src/hooks`: gallery state and lead-capture interaction state.

## API Boundary

No backend implementation is included. Frontend code should depend on service interfaces from `src/services` and shared data contracts from `src/types`.

The current primary contract files are:

- `src/types/real-estate.ts`
- `src/services/property-service.types.ts`
