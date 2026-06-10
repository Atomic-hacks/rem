"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { FiBarChart2, FiEdit2, FiEye, FiMessageSquare, FiPlus, FiTrash2, FiTrendingUp } from "react-icons/fi";
import { MdOutlineBedroomParent } from "react-icons/md";
import { FaStar } from "react-icons/fa";
import { TbAlertCircle } from "react-icons/tb";
import { getCurrentUser, getProperties, getStoredAccessToken } from "@/services";
import type { ApiProperty, UserByEmail } from "@/services";

const routeByListing: Record<string, string> = {
  for_sale: "/userSale",
  rent: "/userRent",
  short_let: "/shortlet",
};

const tagColorByListing: Record<string, string> = {
  for_sale: "bg-amber-400",
  rent: "bg-stone-600",
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
    const accessToken = getStoredAccessToken();

    Promise.all([
      getProperties({ limit: 6, ordering: "-created_at" }),
      accessToken ? getCurrentUser(accessToken).catch(() => null) : Promise.resolve(null),
    ])
      .then(([propertyData, currentUser]) => {
        if (mounted) {
          setListings(propertyData.results);
          setUser(currentUser);
        }
      })
      .catch((err: unknown) => {
        if (mounted) {
          setError(err instanceof Error ? err.message : "Unable to load dashboard data.");
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

  const displayName = user?.name || [user?.first_name_field, user?.last_name_field].filter(Boolean).join(" ") || "Agent";
  const totalListings = listings.length;

  return (
    <div className="min-h-screen bg-[#FAF7F2] font-sans px-6 sm:px-10 lg:px-16 py-8">
      <div className="max-w-3xl mx-auto flex flex-col gap-6">

        {/* ── Header ── */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-xl font-bold text-stone-800 tracking-tight">Welcome, {displayName}</h1>
            <p className="text-stone-400 text-xs mt-0.5">{user?.email || "Manage your property listings"}</p>
          </div>
          <button
            type="button"
            className="flex items-center gap-1.5 text-stone-600 text-xs font-medium border border-stone-200 bg-white rounded-lg px-3 py-2 hover:border-amber-300 hover:text-amber-500 transition-colors"
          >
            <FiBarChart2 size={13} />
            Analytics
          </button>
        </div>

        {/* ── Status cards row ── */}
        <div className="grid grid-cols-3 gap-3">
          {/* Verification Status */}
          <div className="bg-amber-50 border border-amber-100 rounded-xl p-4 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <span className="text-stone-700 text-[11px] font-semibold">Verification Status</span>
              <TbAlertCircle size={15} className="text-amber-400" />
            </div>
            <span className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-600 text-[10px] font-semibold px-2.5 py-1 rounded-full w-fit">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 inline-block" />
              Pending Verification
            </span>
            <p className="text-stone-400 text-[10.5px] leading-relaxed">
              Your documents are being reviewed. This usually takes 24 hours.
            </p>
          </div>

          {/* Rating */}
          <div className="bg-white border border-stone-100 rounded-xl p-4 flex flex-col gap-2 shadow-sm">
            <span className="text-stone-700 text-[11px] font-semibold">Rating</span>
            <div className="flex items-center gap-1.5">
              {[1, 2, 3, 4, 5].map((i) => (
                <FaStar key={i} size={13} className="text-amber-400" />
              ))}
            </div>
            <p className="text-stone-800 text-sm font-bold">
              5.0 <span className="text-stone-400 text-[10.5px] font-normal">(3 reviews)</span>
            </p>
          </div>

          {/* Listing Quota */}
          <div className="bg-white border border-stone-100 rounded-xl p-4 flex flex-col gap-2 shadow-sm">
            <span className="text-stone-700 text-[11px] font-semibold">Listing Quota</span>
            <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden mt-1">
              <div className="h-full bg-amber-400 rounded-full" style={{ width: "66.6%" }} />
            </div>
            <p className="text-stone-500 text-[10.5px] text-right">{Math.min(totalListings, 3)}/3</p>
          </div>
        </div>

        {/* ── Stat mini-cards row ── */}
        <div className="grid grid-cols-4 gap-3">
          {[
            { label: "Total Listings", value: String(totalListings), icon: <MdOutlineBedroomParent size={22} className="text-amber-300" /> },
            { label: "Total Views", value: "0", icon: <FiEye size={20} className="text-amber-300" /> },
            { label: "Inquiries", value: "0", icon: <FiMessageSquare size={20} className="text-amber-300" /> },
            { label: "This Month", value: String(totalListings), icon: <FiTrendingUp size={20} className="text-amber-300" /> },
          ].map((s) => (
            <div key={s.label} className="bg-white border border-stone-100 rounded-xl px-4 py-3.5 flex flex-col gap-2 shadow-sm">
              <p className="text-stone-400 text-[10px] font-light">{s.label}</p>
              <div className="flex items-center justify-between">
                <span className="text-stone-800 font-bold text-lg">{s.value}</span>
                {s.icon}
              </div>
            </div>
          ))}
        </div>

        {/* ── Your Listings ── */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-stone-800 text-sm font-semibold">Your Listings</h2>
            <Link
              href="/uploadproperty"
              className="flex items-center gap-1.5 bg-amber-400 hover:bg-amber-500 text-white text-[11px] font-semibold px-3.5 py-2 rounded-lg transition-colors"
            >
              <FiPlus size={12} />
              Add New Property
            </Link>
          </div>

          {error && (
            <div className="mb-3 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-xs text-red-600">
              {error}
            </div>
          )}

          <div className="bg-white border border-stone-100 rounded-2xl shadow-sm overflow-hidden flex flex-col divide-y divide-stone-50">
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
              <div key={listing.id} className="flex gap-4 p-4">
                <img
                  src={listing.main_image_url || "/villa1.jpg"}
                  alt={listing.title}
                  className="w-24 h-20 rounded-xl object-cover shrink-0"
                />
                <div className="flex-1 flex flex-col gap-1.5 min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <p className="text-stone-800 font-semibold text-[13px] leading-snug">{listing.title}</p>
                    <span className={`${tagColorByListing[listing.property_listing] ?? "bg-amber-400"} text-white text-[9px] font-semibold px-2.5 py-1 rounded-full shrink-0 tracking-wide`}>
                      {listing.listing_type_display}
                    </span>
                  </div>
                  <p className="text-stone-400 text-[11px]">{listing.location}</p>
                  <p className="text-amber-500 font-bold text-[13px]">
                    {listing.price_display}
                    {listing.price_suffix && <span className="text-stone-400 text-[11px] font-normal">{listing.price_suffix}</span>}
                  </p>
                  <div className="flex items-center gap-3 text-stone-400 text-[11px]">
                    <span className="flex items-center gap-1">
                      <FiEye size={11} /> 0 views
                    </span>
                    <span className="flex items-center gap-1">
                      <FiMessageSquare size={11} /> 0 inquiries
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <Link
                      href={listingHref(listing)}
                      className="flex items-center gap-1 text-stone-500 text-[10.5px] border border-stone-200 rounded-md px-2.5 py-1 hover:border-amber-300 hover:text-amber-500 transition-colors"
                    >
                      <FiEdit2 size={10} />
                      View
                    </Link>
                    <button
                      type="button"
                      className="flex items-center gap-1 text-stone-500 text-[10.5px] border border-stone-200 rounded-md px-2.5 py-1 hover:border-amber-300 hover:text-amber-500 transition-colors"
                    >
                      <FiBarChart2 size={10} />
                      Analytics
                    </button>
                    <button
                      type="button"
                      className="flex items-center gap-1 text-stone-400 text-[10.5px] border border-stone-200 rounded-md px-2.5 py-1 cursor-not-allowed"
                      disabled
                    >
                      <FiTrash2 size={10} />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Recent Inquiries ── */}
        <div>
          <h2 className="text-stone-800 text-sm font-semibold mb-3">Recent Inquiries</h2>
          <div className="bg-white border border-stone-100 rounded-2xl shadow-sm overflow-hidden flex flex-col divide-y divide-stone-50">
            <div className="px-5 py-4 text-center text-xs text-stone-400">
              No inquiry endpoint has been provided yet.
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
