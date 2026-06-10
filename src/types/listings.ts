export interface ListingAgent {
  name: string;
  company: string;
  location: string;
  rating: number;
  reviews: number;
  phone: string;
  email: string;
  initials: string;
}

export interface MarketplaceProperty {
  id: number;
  title: string;
  location: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  status: "For Sale" | "For Rent";
  image: string;
  // Extended fields for detailed property views
  images?: string[];
  description?: string;
  features?: string[];
  agent?: ListingAgent;
}

export interface FeaturedProperty {
  title: string;
  location: string;
  price: string;
  type: "For Sale" | "For Rent" | "Short-Let";
  image: string;
  beds: number;
  baths: number;
  size: string;
  href: string;
}

export interface ShortletProperty {
  id: number;
  title: string;
  location: string;
  city: string;
  area: string;
  price: number;
  period: "Day" | "Night";
  rating: number;
  reviews: number;
  guests: number;
  bedrooms: number;
  bathrooms: number;
  areaSqft: number;
  wifi: boolean;
  ac: boolean;
  tag: "Short-Let";
  image: string;
  images: string[];
  description: string;
  features: string[];
  unavailableDates: string[];
  agent: ListingAgent;
}
