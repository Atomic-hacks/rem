"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";
import type { SearchConfig } from "@/services";

const routeByType: Record<string, string> = {
  for_sale: "/userSale",
  rent: "/userRent",
  short_let: "/shortlet",
  hotel: "/hotel",
};

export default function Hero({ searchConfig }: { searchConfig?: SearchConfig }) {
  const listingTypes = searchConfig?.listing_types ?? [];
  const [location, setLocation] = useState("");
  const [type, setType] = useState(() => searchConfig?.listing_types?.[0]?.value ?? "");
  const [price, setPrice] = useState("0");

  useEffect(() => {
    const initialType = searchConfig?.listing_types?.[0]?.value ?? "";
    if (initialType && initialType !== type) {
      setType(initialType);
      setPrice("0");
    }
  }, [searchConfig?.listing_types, type]);

  const priceRanges = useMemo(
    () => (type ? searchConfig?.price_ranges[type as keyof SearchConfig["price_ranges"]] ?? [] : []),
    [searchConfig?.price_ranges, type],
  );

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
    <section className="w-full bg-[#FFF8F2] pb-20 pt-10">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <h1 className="text-3xl font-semibold text-gray-900 md:text-5xl">
            Find Your Perfect Property in Africa
          </h1>

          <p className="mt-3 text-sm text-gray-500 md:text-base">
            Discover thousands of properties for sale, rent, or short-let stays
            across Africa
          </p>
        </div>

        <div className="mt-10 rounded-2xl border border-[#F3E9DD] bg-white p-5 shadow-sm md:p-6">
          <div className="grid grid-cols-1 items-end gap-4 md:grid-cols-4">
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

            <div>
              <label className="text-sm text-gray-600">Price Range</label>
              <select
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 outline-none focus:ring-2 focus:ring-[#F6B100]"
                disabled={priceRanges.length === 0}
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

            <Link
              href={searchHref}
              className="flex items-center justify-center gap-2 rounded-lg bg-[#F6B100] px-5 py-3 font-medium text-white transition hover:bg-[#e9a800]"
            >
              <FiSearch size={18} />
              Search
            </Link>
          </div>

          <div className="mt-5 flex flex-wrap justify-center gap-3">
            <Link
              href="/userSale"
              className="rounded-full border border-gray-200 px-4 py-2 text-sm hover:bg-gray-50"
            >
              Browse For Sale
            </Link>
            <Link
              href="/userRent"
              className="rounded-full border border-gray-200 px-4 py-2 text-sm hover:bg-gray-50"
            >
              Browse For Rent
            </Link>
            <Link
              href="/shortlet"
              className="rounded-full border border-gray-200 px-4 py-2 text-sm hover:bg-gray-50"
            >
              Browse Short-Let
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
