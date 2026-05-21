"use client";

import Image from "next/image";
import {
  Search,
  SlidersHorizontal,
  BedDouble,
  Bath,
  Square,
  MapPin,
} from "lucide-react";
import Link from "next/link";

const properties = [
  {
    id: 1,
    title: "Luxury Waterfront Villa with Private Pool",
    location: "Lekki, Lagos, Nigeria",
    price: "₦800,000/Month",
    beds: 5,
    baths: 5,
    area: "4,200 sqft",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Modern 3BR Apartment in Business District",
    location: "Rivers Port Harcourt, Nigeria",
    price: "₦850,000/Year",
    beds: 3,
    baths: 3,
    area: "1,680 sqft",
    image:
      "https://images.unsplash.com/photo-1494526585095-c41746248156?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Beachside Vacation Home with Garden",
    location: "Abuja, Gwarinpa, Nigeria",
    price: "₦500,000/Month",
    beds: 3,
    baths: 3,
    area: "1,500 sqft",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 4,
    title: "Executive Penthouse with Panoramic Views",
    location: "Abuja, Gwarinpa, Nigeria",
    price: "₦920,000/Month",
    beds: 5,
    baths: 5,
    area: "3,800 sqft",
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function PropertiesSection() {
  return (
    <section className="min-h-screen bg-[#f5f1ea] px-4 py-10 md:px-10">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="mb-6">
          <h1 className="text-3xl font-semibold tracking-tight text-[#222]">
            Properties
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Found 4 properties matching your criteria
          </p>
        </div>

        {/* SEARCH */}
        <div className="mb-8">
          <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
            <Search className="h-5 w-5 text-gray-400" />

            <input
              type="text"
              placeholder="Search by location, title..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
            />
          </div>
        </div>

        {/* CONTENT */}
        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          {/* FILTER SIDEBAR */}
          <div className="h-fit rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-6 flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-[#e0a100]" />

              <h2 className="text-sm font-semibold text-gray-800">Filters</h2>
            </div>

            {/* PRICE */}
            <div className="mb-6">
              <p className="mb-3 text-sm font-medium text-gray-700">
                Price Range
              </p>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="₦0"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none"
                />

                <input
                  type="text"
                  placeholder="₦50,000,000"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none"
                />
              </div>
            </div>

            {/* BEDROOMS */}
            <div className="mb-6">
              <p className="mb-3 text-sm font-medium text-gray-700">Bedrooms</p>

              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5].map((item) => (
                  <button
                    key={item}
                    className={`flex h-9 w-9 items-center justify-center rounded-lg border text-sm transition ${
                      item === 3
                        ? "border-yellow-400 bg-yellow-400 text-black"
                        : "border-gray-200 bg-white text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* BATHROOMS */}
            <div className="mb-6">
              <p className="mb-3 text-sm font-medium text-gray-700">
                Bathrooms
              </p>

              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4].map((item) => (
                  <button
                    key={item}
                    className={`flex h-9 w-9 items-center justify-center rounded-lg border text-sm transition ${
                      item === 3
                        ? "border-yellow-400 bg-yellow-400 text-black"
                        : "border-gray-200 bg-white text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            {/* AREA */}
            <div className="mb-8">
              <p className="mb-3 text-sm font-medium text-gray-700">
                Area Range
              </p>

              <select className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none">
                <option>Any size</option>
                <option>1000 sqft</option>
                <option>2000 sqft</option>
                <option>3000 sqft</option>
              </select>
            </div>

            {/* BUTTONS */}
            <div className="space-y-3">
              <button className="w-full rounded-xl bg-yellow-400 py-3 text-sm font-semibold text-black transition hover:opacity-90">
                Apply Filters
              </button>

              <button className="w-full rounded-xl border border-gray-200 bg-white py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100">
                Clear Filters
              </button>
            </div>
          </div>

          {/* PROPERTY GRID */}
          <div>
            <div className="grid gap-6 md:grid-cols-2">
              {properties.map((property) => (
                <Link
                  key={property.id}
                  href={`/userRent/${property.id}`}
                  className="overflow-hidden rounded-2xl border bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                >
                  <div
                    key={property.id}
                    className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
                  >
                    {/* IMAGE */}
                    <div className="relative h-52 w-full">
                      <Image
                        src={property.image}
                        alt={property.title}
                        fill
                        className="object-cover"
                      />

                      <span className="absolute right-3 top-3 rounded-full bg-blue-500 px-3 py-1 text-xs font-medium text-white">
                        For Rent
                      </span>
                    </div>

                    {/* CONTENT */}
                    <div className="p-5">
                      <h3 className="line-clamp-1 text-base font-semibold text-gray-800">
                        {property.title}
                      </h3>

                      <div className="mt-2 flex items-center gap-1 text-sm text-gray-500">
                        <MapPin className="h-4 w-4" />
                        <span>{property.location}</span>
                      </div>

                      <p className="mt-4 text-2xl font-bold text-yellow-500">
                        {property.price}
                      </p>

                      {/* FEATURES */}
                      <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                          <BedDouble className="h-4 w-4" />
                          <span>{property.beds} Beds</span>
                        </div>

                        <div className="flex items-center gap-1">
                          <Bath className="h-4 w-4" />
                          <span>{property.baths} Baths</span>
                        </div>

                        <div className="flex items-center gap-1">
                          <Square className="h-4 w-4" />
                          <span>{property.area}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>

            {/* LOAD MORE */}
            <div className="mt-10 flex justify-center">
              <button className="rounded-xl bg-yellow-400 px-8 py-3 text-sm font-semibold text-black transition hover:opacity-90">
                Load More Accommodations
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
