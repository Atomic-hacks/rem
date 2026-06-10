"use client";

import Link from "next/link";
import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import type { SearchConfig } from "@/services";

const fallbackListingTypes = [
  { value: "for_sale", label: "For Sale" },
  { value: "rent", label: "For Rent" },
  { value: "short_let", label: "Short Let" },
];

const routeByType: Record<string, string> = {
  for_sale: "/userSale",
  rent: "/userRent",
  short_let: "/shortlet",
};

export default function Hero({ searchConfig }: { searchConfig?: SearchConfig }) {
  const listingTypes = searchConfig?.listing_types.length
    ? searchConfig.listing_types
    : fallbackListingTypes;
  const [location, setLocation] = useState("");
  const [type, setType] = useState(listingTypes[0]?.value ?? "for_sale");
  const [price, setPrice] = useState("0");
  const priceRanges =
    searchConfig?.price_ranges[type as keyof SearchConfig["price_ranges"]] ?? [];
  const selectedRange = priceRanges[Number(price)];
  const route = routeByType[type] ?? "/userSale";
  const params = new URLSearchParams();

  if (location.trim()) {
    params.set("location", location.trim());
  }

  if (selectedRange?.price_min) {
    params.set("min_price", selectedRange.price_min);
  }

  if (selectedRange?.price_max) {
    params.set("max_price", selectedRange.price_max);
  }

  const searchHref = params.size ? `${route}?${params.toString()}` : route;

  return (
    <section className="w-full bg-[#FFF8F2] pt-10 pb-20">
      <div className="mx-auto max-w-6xl px-4">
        {/* Top Title */}
        <div className="text-center">
          <h1 className="text-3xl md:text-5xl font-semibold text-gray-900">
            Find Your Perfect Property in Africa
          </h1>

          <p className="mt-3 text-gray-500 text-sm md:text-base">
            Discover thousands of properties for sale, rent, or short-let stays
            across Africa
          </p>
        </div>

        {/* Search Card */}
        <div className="mt-10 bg-white rounded-2xl shadow-sm border border-[#F3E9DD] p-5 md:p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-end">
            {/* Location */}
            <div>
              <label className="text-sm text-gray-600">Location</label>
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City, neighborhood..."
                className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 outline-none focus:ring-2 focus:ring-[#F6B100]"
              />
            </div>

            {/* Type */}
            <div>
              <label className="text-sm text-gray-600">Type</label>
              <select
                value={type}
                onChange={(e) => {
                  setType(e.target.value);
                  setPrice("0");
                }}
                className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 outline-none focus:ring-2 focus:ring-[#F6B100]"
              >
                {listingTypes.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Price */}
            <div>
              <label className="text-sm text-gray-600">Price Range</label>
              <select
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 outline-none focus:ring-2 focus:ring-[#F6B100]"
              >
                {(priceRanges.length
                  ? priceRanges
                  : [{ label: "Any price", price_min: null, price_max: null }]
                ).map((range, index) => (
                  <option key={`${range.label}-${index}`} value={String(index)}>
                    {range.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Search Button */}
            <Link
              href={searchHref}
              className="flex items-center justify-center gap-2 bg-[#F6B100] hover:bg-[#e9a800] text-white font-medium rounded-lg px-5 py-3 transition"
            >
              <FiSearch size={18} />
              Search
            </Link>
          </div>

          {/* Quick Filters */}
          <div className="mt-5 flex flex-wrap gap-3 justify-center">
            <Link
              href="/userSale"
              className="px-4 py-2 rounded-full border border-gray-200 text-sm hover:bg-gray-50"
            >
              Browse For Sale
            </Link>
            <Link
              href="/userRent"
              className="px-4 py-2 rounded-full border border-gray-200 text-sm hover:bg-gray-50"
            >
              Browse For Rent
            </Link>
            <Link
              href="/shortlet"
              className="px-4 py-2 rounded-full border border-gray-200 text-sm hover:bg-gray-50"
            >
              Browse Short-Let
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
