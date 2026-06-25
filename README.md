# REM - Real Estate Marketplace

A modern Next.js-based real estate and property rental marketplace with support for sales, rentals, and short-let properties.

## Quick Start

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## Documentation

**Start here:**

- [docs/QUICK_START.md](docs/QUICK_START.md) - Quick start for developers
- [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) - Complete project structure and patterns
- [src/components/ui/property-details/README.md](src/components/ui/property-details/README.md) - Component documentation

## Features

- ✅ Property listings (For Sale, For Rent, Short-Let)
- ✅ Detailed property pages with image carousel
- ✅ Agent information and messaging
- ✅ Responsive design (mobile, tablet, desktop)
- ✅ Smooth animations with Framer Motion
- ✅ Authentication pages (sign-in, sign-up, onboarding)
- ✅ Blog and contact pages
- ✅ Privacy and terms pages

## Project Structure

```
app/              # Next.js App Router pages
src/
├── components/   # Reusable UI components
├── features/     # Feature implementations
├── hooks/        # Custom React hooks
├── lib/          # Utility functions
├── services/     # API services
├── types/        # TypeScript definitions
├── constants/    # Constants
└── data/         # Mock/static data
docs/             # Documentation
```

See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for detailed structure.

## Technology Stack

- **Framework**: Next.js 16.2.6
- **UI**: React 19.2.4
- **Styling**: Tailwind CSS 4
- **Animations**: Framer Motion 12.38.0
- **Icons**: React Icons 5.6.0
- **Language**: TypeScript 5
- **Linting**: ESLint 9

## Quality

- ✅ TypeScript strict mode enabled
- ✅ ESLint configured
- ✅ Build: `npm run build`
- ✅ Lint: `npm run lint`

## For Team Members

### New Developer?

1. Read [docs/QUICK_START.md](docs/QUICK_START.md)
2. Check [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md)
3. Explore component examples in `app/userRent/[id]/page.tsx`

### Adding a Property Type?

Use the property detail template - only needs ~27 lines of code!
See [docs/ARCHITECTURE.md](docs/ARCHITECTURE.md) for the current route and component patterns.

### Customizing Components?

Check [src/components/ui/property-details/README.md](src/components/ui/property-details/README.md) for detailed documentation.

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion/)
- [React Icons](https://react-icons.github.io/react-icons/)

## License

Private project

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
