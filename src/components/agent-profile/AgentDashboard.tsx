"use client";

import {
  getCurrentUser,
  getProperties,
  getStoredAccessToken,
  type ApiProperty,
  type UserByEmail,
} from "@/services";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FiBarChart2,
  FiEye,
  FiMessageSquare,
  FiPlus,
  FiTrendingUp,
} from "react-icons/fi";
import { FaStar } from "react-icons/fa";
import { MdOutlineBedroomParent } from "react-icons/md";
import { TbAlertCircle } from "react-icons/tb";

const routeByListing: Record<string, string> = {
  for_sale: "/userSale",
  rent: "/userRent",
  short_let: "/shortlet",
};

const tagColorByListing: Record<string, string> = {
  for_sale: "bg-amber-400",
  rent: "bg-blue-500",
  short_let: "bg-green-500",
};

function listingHref(property: ApiProperty) {
  return `${routeByListing[property.property_listing] ?? "/userSale"}/${property.slug}`;
}

export default function AgentDashboard() {
  const [user, setUser] = useState<UserByEmail | null>(null);
  const [listings, setListings] = useState<ApiProperty[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let mounted = true;
    const token = getStoredAccessToken();

    Promise.all([
      getProperties({ limit: 6, ordering: "-created_at" }),
      token ? getCurrentUser(token).catch(() => null) : Promise.resolve(null),
    ])
      .then(([propertyData, currentUser]) => {
        if (!mounted) return;
        setListings(propertyData.results);
        setUser(currentUser);
      })
      .catch((err: unknown) => {
        if (mounted) {
          setError(
            err instanceof Error ? err.message : "Unable to load dashboard data.",
          );
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
  }, []);

  const displayName =
    user?.name ||
    [user?.first_name_field, user?.last_name_field].filter(Boolean).join(" ") ||
    "Agent";
  const totalListings = listings.length;

  return (
    <div className="min-h-screen bg-[#FAF7F2] px-6 py-8 font-sans sm:px-10 lg:px-16">
      <div className="mx-auto flex max-w-4xl flex-col gap-6">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-xl font-bold tracking-tight text-stone-800">
              Welcome, {displayName}
            </h1>
            <p className="mt-0.5 text-xs text-stone-400">
              {user?.email || "Manage your property listings"}
            </p>
          </div>
          <Link
            href="/agent/analytics"
            className="flex items-center gap-1.5 rounded-lg border border-stone-200 bg-white px-3 py-2 text-xs font-medium text-stone-600 transition-colors hover:border-amber-300 hover:text-amber-500"
          >
            <FiBarChart2 size={13} />
            Analytics
          </Link>
        </div>

        {error && (
          <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-xs text-red-600">
            {error}
          </div>
        )}

        <div className="grid gap-3 md:grid-cols-3">
          <div className="flex flex-col gap-2 rounded-xl border border-amber-100 bg-amber-50 p-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-stone-700">
                Verification Status
              </span>
              <TbAlertCircle size={15} className="text-amber-400" />
            </div>
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-amber-100 px-2.5 py-1 text-[10px] font-semibold text-amber-600">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-500" />
              Pending Verification
            </span>
            <p className="text-[10.5px] leading-relaxed text-stone-400">
              Your documents are reviewed by admin before publishing unlocks.
            </p>
          </div>

          <div className="flex flex-col gap-2 rounded-xl border border-stone-100 bg-white p-4 shadow-sm">
            <span className="text-[11px] font-semibold text-stone-700">
              Rating
            </span>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <FaStar key={i} size={13} className="text-amber-400" />
              ))}
            </div>
            <p className="text-sm font-bold text-stone-800">
              5.0{" "}
              <span className="text-[10.5px] font-normal text-stone-400">
                demo rating
              </span>
            </p>
          </div>

          <div className="flex flex-col gap-2 rounded-xl border border-stone-100 bg-white p-4 shadow-sm">
            <span className="text-[11px] font-semibold text-stone-700">
              Listing Quota
            </span>
            <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-stone-100">
              <div
                className="h-full rounded-full bg-amber-400"
                style={{ width: `${Math.min((totalListings / 3) * 100, 100)}%` }}
              />
            </div>
            <p className="text-right text-[10.5px] text-stone-500">
              {Math.min(totalListings, 3)}/3
            </p>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-4">
          {[
            {
              label: "Total Listings",
              value: String(totalListings),
              icon: <MdOutlineBedroomParent size={22} className="text-amber-300" />,
            },
            {
              label: "Total Views",
              value: "0",
              icon: <FiEye size={20} className="text-amber-300" />,
            },
            {
              label: "Inquiries",
              value: "0",
              icon: <FiMessageSquare size={20} className="text-amber-300" />,
            },
            {
              label: "This Month",
              value: String(totalListings),
              icon: <FiTrendingUp size={20} className="text-amber-300" />,
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col gap-2 rounded-xl border border-stone-100 bg-white px-4 py-3.5 shadow-sm"
            >
              <p className="text-[10px] font-light text-stone-400">
                {stat.label}
              </p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-stone-800">
                  {stat.value}
                </span>
                {stat.icon}
              </div>
            </div>
          ))}
        </div>

        <section>
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-sm font-semibold text-stone-800">
              Recent Listings
            </h2>
            <Link
              href="/uploadproperty"
              className="flex items-center gap-1.5 rounded-lg bg-amber-400 px-3.5 py-2 text-[11px] font-semibold text-white transition-colors hover:bg-amber-500"
            >
              <FiPlus size={12} />
              Add New Property
            </Link>
          </div>

          <div className="flex flex-col divide-y divide-stone-50 overflow-hidden rounded-2xl border border-stone-100 bg-white shadow-sm">
            {loading && (
              <div className="p-4 text-center text-xs text-stone-400">
                Loading listings...
              </div>
            )}
            {!loading && listings.length === 0 && (
              <div className="p-4 text-center text-xs text-stone-400">
                No listings found.
              </div>
            )}
            {listings.map((listing) => (
              <Link
                key={listing.id}
                href={listingHref(listing)}
                className="flex gap-4 p-4 transition hover:bg-stone-50"
              >
                <img
                  src={listing.main_image_url || "/villa1.jpg"}
                  alt={listing.title}
                  className="h-20 w-24 shrink-0 rounded-xl object-cover"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-start justify-between gap-2">
                    <p className="line-clamp-1 text-[13px] font-semibold text-stone-800">
                      {listing.title}
                    </p>
                    <span
                      className={`${tagColorByListing[listing.property_listing] ?? "bg-amber-400"} shrink-0 rounded-full px-2.5 py-1 text-[9px] font-semibold tracking-wide text-white`}
                    >
                      {listing.listing_type_display}
                    </span>
                  </div>
                  <p className="mt-1 text-[11px] text-stone-400">
                    {listing.location}
                  </p>
                  <p className="mt-1 text-[13px] font-bold text-amber-500">
                    {listing.price_display}
                    {listing.price_suffix && (
                      <span className="text-[11px] font-normal text-stone-400">
                        {listing.price_suffix}
                      </span>
                    )}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
