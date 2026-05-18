"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, MapPin } from "lucide-react";

type Property = {
  id: number;
  title: string;
  location: string;
  price: number;
  beds: number;
  baths: number;
  sqft: number;
  status: string;
  image: string;
};

const properties: Property[] = [
  {
    id: 1,
    title: "Luxury Waterfront Villa with Private Pool",
    location: "Lagos, Ikoyi, Nigeria",
    price: 250000000,
    beds: 3,
    baths: 3,
    sqft: 4200,
    status: "For Sale",
    image:
      "https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Modern 3BR Apartment in Business District",
    location: "Rivers, Port Harcourt, Nigeria",
    price: 850000,
    beds: 3,
    baths: 3,
    sqft: 1800,
    status: "For Sale",
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Beachside Vacation Home with Garden",
    location: "Cape Town, Bloubergstrand, South Africa",
    price: 500000000,
    beds: 3,
    baths: 3,
    sqft: 1600,
    status: "For Sale",
    image:
      "https://images.unsplash.com/photo-1499793983690-e29da59ef1c2?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Executive Penthouse with Panoramic Views",
    location: "Abuja, Gwarinpa, Nigeria",
    price: 320000000,
    beds: 3,
    baths: 3,
    sqft: 3100,
    status: "For Sale",
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function PropertiesPage() {
  const [filters, setFilters] = useState({
    minPrice: 800000,
    maxPrice: 500000000,
    bedrooms: 0,
    bathrooms: 0,
    search: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
  };

  const filtered = properties.filter((p) => {
    return (
      p.price >= Number(filters.minPrice) &&
      p.price <= Number(filters.maxPrice) &&
      (filters.bedrooms == 0 || p.beds == Number(filters.bedrooms)) &&
      (filters.bathrooms == 0 || p.baths == Number(filters.bathrooms)) &&
      (filters.search === "" ||
        p.title.toLowerCase().includes(filters.search.toLowerCase()) ||
        p.location.toLowerCase().includes(filters.search.toLowerCase()))
    );
  });

  return (
    <div className="min-h-screen bg-white text-black">
      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* HEADER */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-bold">
            Luxury <span className="text-yellow-500">Properties</span>
          </h1>

          <p className="mx-auto mt-3 max-w-2xl text-gray-500">
            Discover premium homes, apartments, and villas across top cities.
            Filter by price, location, and lifestyle preference.
          </p>

          {/* SEARCH BAR */}
          <div className="mx-auto mt-6 flex max-w-xl items-center gap-2 rounded-2xl border px-4 py-3 shadow-sm focus-within:border-yellow-500">
            <Search className="text-gray-500" size={18} />

            <input
              name="search"
              value={filters.search}
              onChange={handleChange}
              placeholder="Search by location or property name..."
              className="w-full outline-none"
            />
          </div>
        </div>

        <div className="grid gap-8 md:grid-cols-4">
          {/* FILTERS */}
          <aside className="rounded-2xl border bg-white p-5 shadow-sm">
            <h2 className="mb-4 text-lg font-bold text-yellow-500">Filters</h2>

            <p className="font-semibold">Price Range</p>

            <input
              type="number"
              name="minPrice"
              value={filters.minPrice}
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border p-2 outline-none focus:border-yellow-500 focus:ring-0"
            />

            <input
              type="number"
              name="maxPrice"
              value={filters.maxPrice}
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border p-2 outline-none focus:border-yellow-500 focus:ring-0"
            />

            <p className="mt-4 font-semibold">Bedrooms</p>
            <select
              name="bedrooms"
              value={filters.bedrooms}
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border p-2 outline-none focus:border-yellow-500 focus:ring-0"
            >
              <option value={0}>Any</option>
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>

            <p className="mt-4 font-semibold">Bathrooms</p>
            <select
              name="bathrooms"
              value={filters.bathrooms}
              onChange={handleChange}
              className="mt-2 w-full rounded-xl border p-2 outline-none focus:border-yellow-500 focus:ring-0"
            >
              <option value={0}>Any</option>
              {[1, 2, 3, 4].map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>

            <div className="mt-5 flex flex-col gap-2">
              <button className="rounded-xl bg-yellow-500 py-2 font-bold text-black hover:bg-yellow-400">
                Apply Filters
              </button>

              <button
                onClick={() =>
                  setFilters({
                    minPrice: 800000,
                    maxPrice: 500000000,
                    bedrooms: 0,
                    bathrooms: 0,
                    search: "",
                  })
                }
                className="rounded-xl border py-2 font-semibold hover:bg-gray-100"
              >
                Clear Filters
              </button>
            </div>
          </aside>

          {/* CARDS */}
          <main className="md:col-span-3">
            <div className="grid gap-6 md:grid-cols-2">
              {filtered.map((p) => (
                <div
                  key={p.id}
                  className="overflow-hidden rounded-2xl border shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="relative">
                    <Image
                      src={p.image}
                      alt={p.title}
                      width={800}
                      height={500}
                      className="h-60 w-full object-cover"
                    />

                    <span className="absolute left-4 top-4 rounded-full bg-yellow-500 px-3 py-1 text-xs font-bold text-black">
                      {p.status}
                    </span>
                  </div>

                  <div className="p-5">
                    <h3 className="text-lg font-bold">{p.title}</h3>

                    <div className="mt-1 flex items-center gap-1 text-gray-500">
                      <MapPin size={16} className="text-yellow-500" />
                      <span>{p.location}</span>
                    </div>

                    <p className="mt-2 text-xl font-bold text-yellow-500">
                      ₦{p.price.toLocaleString()}
                    </p>

                    <div className="mt-3 flex gap-4 text-sm text-gray-600">
                      <span>{p.beds} Beds</span>
                      <span>{p.baths} Baths</span>
                      <span>{p.sqft} sqft</span>
                    </div>

                    {/* ✅ VIEW DETAILS BUTTON WITH LINK */}
                    <Link href={`/user/${p.id}`}>
                      <button className="mt-4 w-full rounded-xl bg-yellow-500 py-2 font-bold text-black hover:bg-yellow-400">
                        View Details
                      </button>
                    </Link>
                  </div>
                </div>
              ))}
            </div>

            {/* LOAD MORE */}
            <div className="mt-10 flex justify-center">
              <button className="rounded-xl bg-yellow-500 px-8 py-3 font-bold text-black hover:bg-yellow-400">
                Load More Accommodations
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
