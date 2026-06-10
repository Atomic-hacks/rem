"use client";

import { getProperties } from "@/services";
import type { ApiProperty, PropertyFilterParams, PropertyListResponse } from "@/services";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import {
  FiMapPin,
  FiSearch,
  FiSliders,
  FiSquare,
  FiVolume2,
  FiWind,
} from "react-icons/fi";

type ListingKind = "for_sale" | "rent" | "short_let";

const routeByKind: Record<ListingKind, string> = {
  for_sale: "/userSale",
  rent: "/userRent",
  short_let: "/shortlet",
};

const titleByKind: Record<ListingKind, string> = {
  for_sale: "Properties For Sale",
  rent: "Properties For Rent",
  short_let: "Short-Let Properties",
};

const badgeClassByKind: Record<ListingKind, string> = {
  for_sale: "bg-yellow-500",
  rent: "bg-blue-500",
  short_let: "bg-green-500",
};

const fallbackImage = "/villa1.jpg";

function cleanNumber(value: string) {
  const numeric = Number(value.replace(/[^\d.]/g, ""));
  return Number.isFinite(numeric) && numeric > 0 ? numeric : undefined;
}

function detailHref(property: ApiProperty, kind: ListingKind) {
  return `${routeByKind[kind]}/${property.slug}`;
}

function PropertyCard({ property, kind }: { property: ApiProperty; kind: ListingKind }) {
  const image = property.main_image_url || fallbackImage;

  return (
    <Link
      href={detailHref(property, kind)}
      className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md"
    >
      <div className="relative h-52 w-full">
        <Image
          src={image}
          alt={property.title}
          fill
          unoptimized={image.startsWith("http")}
          className="object-cover"
        />
        <span
          className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-medium text-white ${badgeClassByKind[kind]}`}
        >
          {property.listing_type_display}
        </span>
      </div>

      <div className="p-5">
        <h3 className="line-clamp-1 text-base font-semibold text-gray-800">
          {property.title}
        </h3>

        <div className="mt-2 flex items-center gap-1 text-sm text-gray-500">
          <FiMapPin className="h-4 w-4 shrink-0" />
          <span className="line-clamp-1">{property.location}</span>
        </div>

        <p className="mt-4 text-2xl font-bold text-yellow-500">
          {property.price_display}
          {property.price_suffix && (
            <span className="text-sm font-medium text-gray-400">
              {property.price_suffix}
            </span>
          )}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <FiVolume2 className="h-4 w-4" />
            <span>{property.bedrooms} Beds</span>
          </div>
          <div className="flex items-center gap-1">
            <FiWind className="h-4 w-4" />
            <span>{property.bathrooms} Baths</span>
          </div>
          <div className="flex items-center gap-1">
            <FiSquare className="h-4 w-4" />
            <span>{property.sqft.toLocaleString()} sqft</span>
          </div>
        </div>
      </div>
    </Link>
  );
}

export function PropertyListingPage({ kind }: { kind: ListingKind }) {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [bedrooms, setBedrooms] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const [page, setPage] = useState(1);
  const [data, setData] = useState<PropertyListResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setLocation(params.get("location") ?? "");
    setMinPrice(params.get("min_price") ?? "");
    setMaxPrice(params.get("max_price") ?? "");
    setSearch(params.get("search") ?? "");
  }, []);

  const filters = useMemo<PropertyFilterParams>(
    () => ({
      listing_type: kind,
      is_available: true,
      limit: 12,
      page,
      search: search.trim() || undefined,
      location: location.trim() || undefined,
      min_price: cleanNumber(minPrice),
      max_price: cleanNumber(maxPrice),
      min_bedrooms: bedrooms || undefined,
      min_bathrooms: bathrooms || undefined,
      ordering: "-created_at",
    }),
    [bathrooms, bedrooms, kind, location, maxPrice, minPrice, page, search],
  );

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    setError("");

    getProperties(filters)
      .then((response) => {
        if (mounted) {
          setData(response);
        }
      })
      .catch((err: unknown) => {
        if (mounted) {
          setError(err instanceof Error ? err.message : "Unable to load properties.");
          setData(null);
        }
      })
      .finally(() => {
        if (mounted) {
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, [filters]);

  const resetPage = (update: () => void) => {
    setPage(1);
    update();
  };

  const properties = data?.results ?? [];

  return (
    <section className="min-h-screen bg-[#f5f1ea] px-4 py-10 md:px-10">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6">
          <h1 className="text-3xl font-semibold tracking-tight text-[#222]">
            {titleByKind[kind]}
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            {loading ? "Loading properties..." : `Found ${data?.count ?? 0} properties matching your criteria`}
          </p>
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3 shadow-sm">
            <FiSearch className="h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(event) => resetPage(() => setSearch(event.target.value))}
              placeholder="Search by location, title..."
              className="w-full bg-transparent text-sm outline-none placeholder:text-gray-400"
            />
          </div>
        </div>

        <div className="grid gap-6 lg:grid-cols-[260px_1fr]">
          <aside className="h-fit rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="mb-6 flex items-center gap-2">
              <FiSliders className="h-4 w-4 text-[#e0a100]" />
              <h2 className="text-sm font-semibold text-gray-800">Filters</h2>
            </div>

            <div className="mb-6">
              <p className="mb-3 text-sm font-medium text-gray-700">Location</p>
              <input
                value={location}
                onChange={(event) => resetPage(() => setLocation(event.target.value))}
                placeholder="City or area"
                className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none"
              />
            </div>

            <div className="mb-6">
              <p className="mb-3 text-sm font-medium text-gray-700">Price Range</p>
              <div className="flex gap-2">
                <input
                  value={minPrice}
                  onChange={(event) => resetPage(() => setMinPrice(event.target.value))}
                  placeholder="Min"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none"
                />
                <input
                  value={maxPrice}
                  onChange={(event) => resetPage(() => setMaxPrice(event.target.value))}
                  placeholder="Max"
                  className="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm outline-none"
                />
              </div>
            </div>

            <div className="mb-6">
              <p className="mb-3 text-sm font-medium text-gray-700">Bedrooms</p>
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4, 5].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => resetPage(() => setBedrooms(bedrooms === item ? 0 : item))}
                    className={`flex h-9 w-9 items-center justify-center rounded-lg border text-sm transition ${
                      bedrooms === item
                        ? "border-yellow-400 bg-yellow-400 text-black"
                        : "border-gray-200 bg-white text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <p className="mb-3 text-sm font-medium text-gray-700">Bathrooms</p>
              <div className="flex flex-wrap gap-2">
                {[1, 2, 3, 4].map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => resetPage(() => setBathrooms(bathrooms === item ? 0 : item))}
                    className={`flex h-9 w-9 items-center justify-center rounded-lg border text-sm transition ${
                      bathrooms === item
                        ? "border-yellow-400 bg-yellow-400 text-black"
                        : "border-gray-200 bg-white text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>

            <button
              type="button"
              onClick={() => {
                setSearch("");
                setLocation("");
                setMinPrice("");
                setMaxPrice("");
                setBedrooms(0);
                setBathrooms(0);
                setPage(1);
              }}
              className="w-full rounded-xl border border-gray-200 bg-white py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-100"
            >
              Clear Filters
            </button>
          </aside>

          <div>
            {error && (
              <div className="mb-4 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {!loading && !error && properties.length === 0 && (
              <div className="rounded-xl border border-gray-200 bg-white px-4 py-10 text-center text-sm text-gray-500">
                No properties found matching your criteria.
              </div>
            )}

            <div className="grid gap-6 md:grid-cols-2">
              {properties.map((property) => (
                <PropertyCard key={property.id} property={property} kind={kind} />
              ))}
            </div>

            <div className="mt-10 flex items-center justify-center gap-3">
              <button
                type="button"
                disabled={page === 1 || loading}
                onClick={() => setPage((current) => Math.max(1, current - 1))}
                className="rounded-xl border border-gray-200 bg-white px-6 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Previous
              </button>
              <button
                type="button"
                disabled={!data?.next || loading}
                onClick={() => setPage((current) => current + 1)}
                className="rounded-xl bg-yellow-400 px-8 py-3 text-sm font-semibold text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                Load More
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
