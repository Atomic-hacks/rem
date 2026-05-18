"use client";

import { useState } from "react";
import { Search } from "lucide-react";

export default function Hero() {
  const [type, setType] = useState("For Sale");
  const [price, setPrice] = useState("Any Price");

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
                placeholder="City, neighborhood..."
                className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 outline-none focus:ring-2 focus:ring-[#F6B100]"
              />
            </div>

            {/* Type */}
            <div>
              <label className="text-sm text-gray-600">Type</label>
              <select
                value={type}
                onChange={(e) => setType(e.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 outline-none focus:ring-2 focus:ring-[#F6B100]"
              >
                <option>For Sale</option>
                <option>For Rent</option>
                <option>Short-Let</option>
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
                <option>Any Price</option>
                <option>Under ₦50M</option>
                <option>₦50M - ₦100M</option>
                <option>Above ₦100M</option>
              </select>
            </div>

            {/* Search Button */}
            <button className="flex items-center justify-center gap-2 bg-[#F6B100] hover:bg-[#e9a800] text-white font-medium rounded-lg px-5 py-3 transition">
              <Search size={18} />
              Search
            </button>
          </div>

          {/* Quick Filters */}
          <div className="mt-5 flex flex-wrap gap-3 justify-center">
            <button className="px-4 py-2 rounded-full border border-gray-200 text-sm hover:bg-gray-50">
              Browse For Sale
            </button>
            <button className="px-4 py-2 rounded-full border border-gray-200 text-sm hover:bg-gray-50">
              Browse For Rent
            </button>
            <button className="px-4 py-2 rounded-full border border-gray-200 text-sm hover:bg-gray-50">
              Browse Short-Let
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
