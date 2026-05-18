"use client";

import React from "react";
import Image from "next/image";
import { ArrowLeft, Phone, Mail, Star, MapPin } from "lucide-react";
import Link from "next/link";

export default function PropertyDetailPage() {
  return (
    <div className="min-h-screen bg-white text-black">
      <div className="mx-auto max-w-6xl px-6 py-8">
        {/* BACK BUTTON */}
        <Link
          href="/properties"
          className="mb-6 flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-yellow-500"
        >
          <ArrowLeft size={16} />
          Back to listings
        </Link>

        {/* HEADER */}
        <div className="mb-6">
          <span className="rounded-full bg-yellow-500 px-3 py-1 text-xs font-bold text-black">
            For Sale
          </span>

          <h1 className="mt-3 text-3xl font-bold">
            Luxury Waterfront Villa with Private Pool
          </h1>

          <div className="mt-2 flex items-center gap-2 text-gray-600">
            <MapPin size={16} className="text-yellow-500" />
            Lagos, Ikoyi, Nigeria
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="grid gap-8 md:grid-cols-3">
          {/* LEFT CONTENT */}
          <div className="md:col-span-2 space-y-6">
            {/* IMAGE */}
            <div className="overflow-hidden rounded-2xl">
              <Image
                src="https://images.unsplash.com/photo-1613977257363-707ba9348227?q=80&w=1200&auto=format&fit=crop"
                alt="property"
                width={1000}
                height={600}
                className="h-100 w-full object-cover"
              />
            </div>

            {/* PRICE + STATS */}
            <div className="flex flex-wrap items-center justify-between rounded-2xl border p-5">
              <div>
                <p className="text-2xl font-bold text-yellow-500">
                  ₦250,000,000
                </p>

                <div className="mt-1 flex items-center gap-2 text-sm text-gray-600">
                  <Star className="text-yellow-500" size={16} />
                  4.8 (52 reviews)
                </div>
              </div>

              <div className="flex gap-6 text-sm text-gray-700">
                <div>
                  <p className="font-bold">5</p>
                  <p>Bedrooms</p>
                </div>

                <div>
                  <p className="font-bold">4</p>
                  <p>Bathrooms</p>
                </div>

                <div>
                  <p className="font-bold">4,200</p>
                  <p>Area sqft</p>
                </div>
              </div>
            </div>

            {/* ABOUT */}
            <div className="rounded-2xl border p-5">
              <h2 className="mb-3 text-xl font-bold">About this property</h2>

              <p className="text-gray-600 leading-relaxed">
                Stunning waterfront villa with modern architecture in the
                exclusive Ikoyi area. Features a private infinity pool
                overlooking the lagoon, smart home automation, and world-class
                amenities. Perfect for luxury living.
              </p>
            </div>

            {/* FEATURES */}
            <div className="rounded-2xl border p-5">
              <h2 className="mb-4 text-xl font-bold">Features & Amenities</h2>

              <div className="grid grid-cols-2 gap-3 text-sm text-gray-700">
                {[
                  "Waterfront location",
                  "Private infinity pool",
                  "Smart home automation",
                  "Wine cellar",
                  "Home theater",
                  "Gym and spa",
                  "Parking for 3 cars",
                  "Security gate",
                  "Backup generator",
                  "Garden with landscaping",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="rounded-lg bg-gray-50 p-2 hover:bg-yellow-50"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>

            {/* SIMILAR */}
            <div className="rounded-2xl border p-5">
              <h2 className="mb-4 text-xl font-bold">Similar Properties</h2>

              <div className="grid gap-4 md:grid-cols-3 text-sm">
                {[
                  "Modern Villa with Waterfront",
                  "Luxury Villa 2",
                  "Luxury Villa 3",
                ].map((item, i) => (
                  <div
                    key={i}
                    className="rounded-xl border p-3 hover:shadow-md"
                  >
                    <p className="font-semibold">{item}</p>
                    <p className="text-gray-500">Price varies</p>
                    <button className="mt-2 text-yellow-500 font-medium">
                      View Details
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="space-y-6">
            {/* AGENT CARD */}
            <div className="rounded-2xl border p-5 shadow-sm">
              <h3 className="mb-3 text-lg font-bold">Listing Agent</h3>

              <div className="mb-3">
                <p className="font-semibold">Chisom Okonkwo</p>
                <p className="text-sm text-gray-500">Premium Properties</p>
                <p className="text-sm text-gray-500">Lagos</p>
              </div>

              <div className="mb-4 flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-yellow-500 font-bold text-black">
                  CO
                </div>

                <div>
                  <p className="text-sm font-semibold">Agent Rating</p>
                  <p className="text-sm text-gray-600">⭐ 4.8 (52 reviews)</p>
                </div>
              </div>

              <button className="mb-2 w-full rounded-xl bg-yellow-500 py-2 font-bold text-black hover:bg-yellow-400">
                Call Agent
              </button>

              <button className="w-full rounded-xl border py-2 font-bold hover:bg-gray-100">
                Email Agent
              </button>
            </div>

            {/* CONTACT */}
            <div className="rounded-2xl border p-5">
              <h3 className="mb-3 text-lg font-bold">Contact Details</h3>

              <div className="space-y-3 text-sm text-gray-700">
                <div className="flex items-center gap-2">
                  <Phone size={16} className="text-yellow-500" />
                  +234 801 234 5678
                </div>

                <div className="flex items-center gap-2">
                  <Mail size={16} className="text-yellow-500" />
                  chisom@premiumlags.com
                </div>
              </div>
            </div>

            {/* MESSAGE */}
            <div className="rounded-2xl border p-5">
              <h3 className="mb-3 text-lg font-bold">Message Agent</h3>

              <textarea
                placeholder="Hi, I'm interested in this property..."
                className="h-28 w-full rounded-xl border p-3 outline-none focus:border-yellow-500"
              />

              <button className="mt-3 w-full rounded-xl bg-yellow-500 py-2 font-bold text-black hover:bg-yellow-400">
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
