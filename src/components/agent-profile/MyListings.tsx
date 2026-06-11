"use client";

import {
  deleteProperty,
  getProperties,
  getStoredAccessToken,
  type ApiProperty,
} from "@/services";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiBarChart2, FiEdit2, FiEye, FiMessageSquare, FiTrash2 } from "react-icons/fi";

const routeByListing: Record<string, string> = {
  for_sale: "/userSale",
  rent: "/userRent",
  short_let: "/shortlet",
};

const tagClassByListing: Record<string, string> = {
  for_sale: "bg-orange-100 text-orange-600",
  rent: "bg-blue-100 text-blue-600",
  short_let: "bg-green-100 text-green-600",
};

function listingHref(property: ApiProperty) {
  return `${routeByListing[property.property_listing] ?? "/userSale"}/${property.slug}`;
}

export default function MyListings() {
  const [listings, setListings] = useState<ApiProperty[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingSlug, setDeletingSlug] = useState("");

  const loadListings = () => {
    setLoading(true);
    setError("");

    getProperties({ limit: 50, ordering: "-created_at" })
      .then((response) => setListings(response.results))
      .catch((err: unknown) =>
        setError(err instanceof Error ? err.message : "Unable to load listings."),
      )
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadListings();
  }, []);

  const removeListing = async (property: ApiProperty) => {
    const token = getStoredAccessToken();
    if (!token) {
      setError("Please sign in again before deleting a property.");
      return;
    }

    try {
      setDeletingSlug(property.slug);
      await deleteProperty(property.slug, token);
      setListings((current) =>
        current.filter((listing) => listing.slug !== property.slug),
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to delete listing.");
    } finally {
      setDeletingSlug("");
    }
  };

  return (
    <div className="w-full p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Listings</h1>
          <p className="mt-1 text-sm text-gray-500">
            Manage published and demo property records.
          </p>
        </div>
        <Link
          href="/uploadproperty"
          className="rounded-lg bg-amber-400 px-4 py-2 text-sm font-semibold text-white hover:bg-amber-500"
        >
          Add Property
        </Link>
      </div>

      {error && (
        <div className="mb-4 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      {loading && (
        <div className="rounded-xl border bg-white p-8 text-center text-sm text-gray-500">
          Loading listings...
        </div>
      )}

      {!loading && listings.length === 0 && (
        <div className="rounded-xl border bg-white p-8 text-center text-sm text-gray-500">
          No listings found.
        </div>
      )}

      <div className="space-y-6">
        {listings.map((item) => {
          const image = item.main_image_url || "/villa1.jpg";

          return (
            <article
              key={item.id}
              className="flex gap-5 rounded-xl border bg-white p-4 shadow-sm"
            >
              <div className="relative h-28 w-40 shrink-0 overflow-hidden rounded-lg">
                <Image
                  src={image}
                  alt={item.title}
                  fill
                  unoptimized={image.startsWith("http")}
                  className="object-cover"
                />
              </div>

              <div className="flex-1">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-semibold">{item.title}</h2>
                    <p className="text-sm text-gray-500">{item.location}</p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs ${
                      tagClassByListing[item.property_listing] ??
                      "bg-orange-100 text-orange-600"
                    }`}
                  >
                    {item.listing_type_display}
                  </span>
                </div>

                <p className="mt-2 font-bold text-orange-500">
                  {item.price_display}
                  {item.price_suffix && (
                    <span className="text-sm font-normal text-gray-400">
                      {item.price_suffix}
                    </span>
                  )}
                </p>

                <div className="mt-2 flex gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <FiEye /> 0 views
                  </span>
                  <span className="flex items-center gap-1">
                    <FiMessageSquare /> 0 inquiries
                  </span>
                </div>

                <div className="mt-4 flex gap-2">
                  <Link
                    href={listingHref(item)}
                    className="flex items-center gap-1 rounded-md border px-3 py-1 text-sm hover:bg-gray-100"
                  >
                    <FiEdit2 size={14} />
                    View
                  </Link>
                  <Link
                    href="/agent/analytics"
                    className="flex items-center gap-1 rounded-md border px-3 py-1 text-sm hover:bg-gray-100"
                  >
                    <FiBarChart2 size={14} />
                    Analytics
                  </Link>
                  <button
                    type="button"
                    onClick={() => removeListing(item)}
                    disabled={deletingSlug === item.slug}
                    className="flex items-center gap-1 rounded-md border px-3 py-1 text-sm text-red-500 hover:bg-red-50 disabled:opacity-60"
                  >
                    <FiTrash2 size={14} />
                    {deletingSlug === item.slug ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
}
