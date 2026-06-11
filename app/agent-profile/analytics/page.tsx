"use client";

import { getProperties, type ApiProperty } from "@/services";
import { useEffect, useMemo, useState } from "react";
import { FiBarChart2, FiHome, FiKey, FiTrendingUp } from "react-icons/fi";

function countByListingType(listings: ApiProperty[]) {
  return listings.reduce<Record<string, number>>((acc, property) => {
    acc[property.property_listing] = (acc[property.property_listing] ?? 0) + 1;
    return acc;
  }, {});
}

export default function AgentAnalyticsPage() {
  const [listings, setListings] = useState<ApiProperty[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getProperties({ limit: 100, ordering: "-created_at" })
      .then((response) => setListings(response.results))
      .catch((err: unknown) =>
        setError(err instanceof Error ? err.message : "Unable to load analytics."),
      )
      .finally(() => setLoading(false));
  }, []);

  const metrics = useMemo(() => {
    const counts = countByListingType(listings);
    const available = listings.filter((property) => property.is_available).length;
    const featured = listings.filter((property) => property.is_featured).length;

    return [
      {
        label: "Total Listings",
        value: listings.length,
        icon: <FiBarChart2 className="text-amber-400" size={22} />,
      },
      {
        label: "For Sale",
        value: counts.for_sale ?? 0,
        icon: <FiHome className="text-amber-400" size={22} />,
      },
      {
        label: "For Rent",
        value: counts.rent ?? 0,
        icon: <FiKey className="text-amber-400" size={22} />,
      },
      {
        label: "Available",
        value: available,
        icon: <FiTrendingUp className="text-amber-400" size={22} />,
      },
      {
        label: "Featured",
        value: featured,
        icon: <FiTrendingUp className="text-amber-400" size={22} />,
      },
    ];
  }, [listings]);

  return (
    <div className="min-h-screen bg-[#FFFDF9] p-6 text-[#333333] sm:p-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-2xl font-bold tracking-tight text-[#2D2D2D]">
          Analytics
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Performance overview for your listing inventory.
        </p>

        {error && (
          <div className="mt-6 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {loading ? (
          <div className="mt-6 rounded-xl border bg-white p-8 text-center text-sm text-gray-500">
            Loading analytics...
          </div>
        ) : (
          <>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-xl border border-[#F5EFE6] bg-white p-5 shadow-sm"
                >
                  <div className="flex items-center justify-between">
                    <p className="text-xs font-semibold text-gray-500">
                      {metric.label}
                    </p>
                    {metric.icon}
                  </div>
                  <p className="mt-4 text-3xl font-bold text-stone-800">
                    {metric.value}
                  </p>
                </div>
              ))}
            </div>

            <section className="mt-8 rounded-xl border border-[#F5EFE6] bg-white p-6 shadow-sm">
              <h2 className="text-base font-semibold text-[#2D2D2D]">
                Listing Mix
              </h2>
              <div className="mt-5 space-y-4">
                {[
                  ["For Sale", listings.filter((item) => item.property_listing === "for_sale").length],
                  ["For Rent", listings.filter((item) => item.property_listing === "rent").length],
                  ["Short Let", listings.filter((item) => item.property_listing === "short_let").length],
                ].map(([label, value]) => {
                  const width = listings.length
                    ? (Number(value) / listings.length) * 100
                    : 0;

                  return (
                    <div key={label}>
                      <div className="mb-1 flex justify-between text-xs text-gray-500">
                        <span>{label}</span>
                        <span>{value}</span>
                      </div>
                      <div className="h-2 overflow-hidden rounded-full bg-stone-100">
                        <div
                          className="h-full rounded-full bg-amber-400"
                          style={{ width: `${width}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  );
}
