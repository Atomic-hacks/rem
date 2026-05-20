"use client";

import Image from "next/image";
import {
  FaBath,
  FaBed,
  FaPhoneAlt,
  FaEnvelope,
  FaHeart,
  FaMapMarkerAlt,
  FaCheckCircle,
} from "react-icons/fa";

const amenities = [
  "Waterfront location",
  "Private infinity pool",
  "Smart home automation",
  "Wine cellar",
  "Home theater",
  "Gym and spa",
  "Parking for 3 cars",
  "Security gates",
  "Back-up generator",
  "Garden with landscaping",
];

const similarProperties = [
  {
    id: 1,
    title: "Modern Villa with Waterfront",
    image:
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 2,
    title: "Luxury Villa 2",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1200&auto=format&fit=crop",
  },
  {
    id: 3,
    title: "Luxury Villa 3",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function PropertyDetailsPage() {
  return (
    <section className="min-h-screen bg-[#f7f3ec] px-4 py-8 md:px-10">
      <div className="mx-auto max-w-7xl">
        {/* BACK BUTTON */}
        <button className="mb-5 text-sm text-[#d9a441] hover:underline">
          ← Back to listings
        </button>

        {/* MAIN GRID */}
        <div className="grid gap-8 lg:grid-cols-[1fr_320px]">
          {/* LEFT SIDE */}
          <div>
            {/* MAIN IMAGE */}
            <div className="relative h-65 overflow-hidden rounded-2xl md:h-125">
              <Image
                src="https://images.unsplash.com/photo-1600607687644-c7171b42498f?q=80&w=1400&auto=format&fit=crop"
                alt="Luxury Villa"
                fill
                className="object-cover"
              />

              {/* SLIDER DOTS */}
              <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
                <span className="h-2 w-2 rounded-full bg-yellow-400"></span>
                <span className="h-2 w-2 rounded-full bg-white/70"></span>
              </div>
            </div>

            {/* TITLE */}
            <div className="mt-6 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <span className="rounded-full bg-[#fff3dc] px-3 py-1 text-xs font-medium text-[#d9a441]">
                  For Sale
                </span>

                <h1 className="mt-4 text-3xl font-semibold tracking-tight text-[#2d2d2d]">
                  Luxury Waterfront 5 Bedroom Duplex
                </h1>

                <div className="mt-3 flex items-center gap-2 text-sm text-gray-500">
                  <FaMapMarkerAlt className="text-gray-400" />
                  <span>Lagos, Ikoyi, Nigeria</span>
                </div>

                <h2 className="mt-4 text-3xl font-bold text-[#e0a100]">
                  ₦10,000,000/Year
                </h2>
              </div>

              {/* HEART */}
              <button className="flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-500 transition hover:text-red-500">
                <FaHeart />
              </button>
            </div>

            {/* STATS */}
            <div className="mt-8 grid grid-cols-3 overflow-hidden rounded-2xl border border-gray-200 bg-white">
              <div className="border-r border-gray-200 p-5">
                <p className="text-xs text-gray-400">Bedrooms</p>

                <div className="mt-3 flex items-center gap-2 text-gray-700">
                  <FaBed />
                  <span className="font-medium">5</span>
                </div>
              </div>

              <div className="border-r border-gray-200 p-5">
                <p className="text-xs text-gray-400">Bathrooms</p>

                <div className="mt-3 flex items-center gap-2 text-gray-700">
                  <FaBath />
                  <span className="font-medium">4</span>
                </div>
              </div>

              <div className="p-5">
                <p className="text-xs text-gray-400">Area</p>

                <div className="mt-3 flex items-center gap-2 text-gray-700">
                  <span className="font-medium">4,200</span>
                </div>
              </div>
            </div>

            {/* ABOUT */}
            <div className="mt-10">
              <h3 className="text-2xl font-semibold text-[#2d2d2d]">
                About this property
              </h3>

              <p className="mt-4 max-w-3xl leading-8 text-gray-500">
                Stunning waterfront villa with modern architecture in the
                exclusive Ikoyi area. Features a private infinity pool
                overlooking the lagoon, smart home automation, and world-class
                amenities. Perfect for luxury living.
              </p>
            </div>

            {/* AMENITIES */}
            <div className="mt-10">
              <h3 className="text-2xl font-semibold text-[#2d2d2d]">
                Features & Amenities
              </h3>

              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {amenities.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-3"
                  >
                    <FaCheckCircle className="text-sm text-[#e0a100]" />

                    <span className="text-sm text-gray-600">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* SIMILAR */}
            <div className="mt-20 border-t border-gray-200 pt-10">
              <h3 className="text-3xl font-semibold text-[#2d2d2d]">
                Similar Properties
              </h3>

              <div className="mt-8 grid gap-6 md:grid-cols-3">
                {similarProperties.map((item) => (
                  <div
                    key={item.id}
                    className="overflow-hidden rounded-2xl border border-gray-200 bg-white transition hover:-translate-y-1 hover:shadow-md"
                  >
                    <div className="relative h-52">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                    </div>

                    <div className="p-5">
                      <h4 className="font-semibold text-gray-800">
                        {item.title}
                      </h4>

                      <p className="mt-2 text-sm font-medium text-[#e0a100]">
                        Price varies
                      </p>

                      <button className="mt-5 w-full rounded-xl bg-[#fff3dc] py-3 text-sm font-medium text-[#d9a441] transition hover:bg-[#fce6b5]">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="space-y-6">
            {/* AGENT CARD */}
            <div className="rounded-2xl border border-gray-200 bg-white">
              <div className="border-b border-gray-200 px-6 py-4">
                <h3 className="font-semibold text-gray-800">Listing Agent</h3>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#fff3dc] text-xl font-bold text-[#d9a441]">
                    CO
                  </div>

                  <div>
                    <h4 className="font-semibold text-gray-800">
                      Chisom Okonkwo
                    </h4>

                    <p className="text-sm text-[#d9a441]">
                      Premium Properties Lagos
                    </p>

                    <p className="mt-1 text-xs text-gray-400">
                      ⭐ 4.8 (52 reviews)
                    </p>
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <button className="flex-1 rounded-xl border border-gray-200 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50">
                    Call
                  </button>

                  <button className="flex-1 rounded-xl border border-gray-200 py-3 text-sm font-medium text-gray-700 transition hover:bg-gray-50">
                    Email
                  </button>
                </div>
              </div>
            </div>

            {/* CONTACT */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6">
              <h3 className="font-semibold text-gray-800">Contact Details</h3>

              <div className="mt-6 space-y-5">
                <div className="flex items-start gap-3">
                  <div className="mt-1 text-[#d9a441]">
                    <FaPhoneAlt />
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">Phone</p>

                    <p className="mt-1 text-sm font-medium text-[#d9a441]">
                      +234 801 234 5678
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="mt-1 text-[#d9a441]">
                    <FaEnvelope />
                  </div>

                  <div>
                    <p className="text-xs text-gray-400">Email</p>

                    <p className="mt-1 text-sm font-medium text-[#d9a441]">
                      chisom@premiumlagos.com
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* MESSAGE BUTTON */}
            <button className="flex w-full items-center justify-between rounded-2xl border border-gray-200 bg-white px-6 py-5 text-sm font-medium text-gray-700 transition hover:bg-gray-50">
              <span>Message Agent</span>

              <span className="text-lg">+</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
