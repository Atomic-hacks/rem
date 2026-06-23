"use client";

import { PropertyCard } from "@/components/property/PropertyCard";
import {
  getProperties,
  type PropertyFilterParams,
  type PropertyListResponse,
} from "@/services";
import { useEffect, useMemo, useState } from "react";
import { FiSearch, FiSliders } from "react-icons/fi";

type ListingKind = "for_sale" | "rent" | "short_let" | "hotel";

const titleByKind: Record<ListingKind, string> = {
  for_sale: "Properties For Sale",
  rent: "Properties For Rent",
  short_let: "Short-Let Properties",
  hotel: "Hotel Properties",
};

function cleanNumber(value: string) {
  const numeric = Number(value.replace(/[^\d.]/g, ""));
  return Number.isFinite(numeric) && numeric > 0 ? numeric : undefined;
}

export function PropertyListingPage({ kind }: { kind: ListingKind }) {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [bedrooms, setBedrooms] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const [maxBedrooms, setMaxBedrooms] = useState(0);
  const [propertyType, setPropertyType] = useState("");
  const [amenities, setAmenities] = useState("");
  const [isAvailable, setIsAvailable] = useState(true);
  const [ordering, setOrdering] = useState("-created_at");
  const [limit, setLimit] = useState(12);
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
    setPropertyType(params.get("property_type") ?? "");
    setAmenities(params.get("amenities") ?? "");
    setOrdering(params.get("ordering") ?? "-created_at");
    setLimit(Number(params.get("limit") ?? 12) || 12);
    setPage(Number(params.get("page") ?? 1) || 1);
    setMaxBedrooms(Number(params.get("max_bedrooms") ?? 0) || 0);
    const isAvailableParam = params.get("is_available");
    setIsAvailable(isAvailableParam === null ? true : isAvailableParam === "true");
  }, []);

  const filters = useMemo<PropertyFilterParams>(
    () => ({
      listing_type: kind,
      is_available: isAvailable,
      limit,
      page,
      search: search.trim() || undefined,
      location: location.trim() || undefined,
      min_price: cleanNumber(minPrice),
      max_price: cleanNumber(maxPrice),
      min_bedrooms: bedrooms || undefined,
      max_bedrooms: maxBedrooms || undefined,
      min_bathrooms: bathrooms || undefined,
      property_type: propertyType.trim() || undefined,
      amenities: amenities.trim() || undefined,
      ordering,
    }),
    [
      amenities,
      bathrooms,
      bedrooms,
      isAvailable,
      kind,
      limit,
      location,
      maxBedrooms,
      maxPrice,
      minPrice,
      ordering,
      page,
      propertyType,
      search,
    ],
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
            {loading
              ? "Loading properties..."
              : `Found ${data?.count ?? 0} properties matching your criteria`}
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
                    onClick={() =>
                      resetPage(() => setBedrooms(bedrooms === item ? 0 : item))
                    }
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
                    onClick={() =>
                      resetPage(() => setBathrooms(bathrooms === item ? 0 : item))
                    }
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
                setMaxBedrooms(0);
                setPropertyType("");
                setAmenities("");
                setIsAvailable(true);
                setOrdering("-created_at");
                setLimit(12);
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
                <PropertyCard key={property.id} property={property} />
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
