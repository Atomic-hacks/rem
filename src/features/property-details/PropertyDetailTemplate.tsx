"use client";

import {
  AgentCard,
  FeaturesList,
  ImageCarousel,
  PropertyStats,
} from "@/components/ui/property-details";
import type { ListingAgent } from "@/types";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { FiArrowLeft, FiHeart, FiMapPin, FiShare2 } from "react-icons/fi";

export interface PropertyDetailTemplateProps {
  title: string;
  location: string;
  price: number;
  priceLabel: string;
  images: string[];
  bedrooms: number;
  bathrooms: number;
  areaSqft: number;
  description: string;
  features: string[];
  agent: ListingAgent;
  backLink: string;
  tag?: string;
  backLabel?: string;
}

export function PropertyDetailTemplate({
  title,
  location,
  price,
  priceLabel,
  images,
  bedrooms,
  bathrooms,
  areaSqft,
  description,
  features,
  agent,
  backLink,
  tag,
  backLabel = "Back to listings",
}: PropertyDetailTemplateProps) {
  const [liked, setLiked] = useState(false);

  const formatPrice = (amount: number) => `₦${amount.toLocaleString()}`;

  return (
    <div className="min-h-screen bg-[#FAF7F2] px-4 sm:px-6 lg:px-10 py-6 font-sans">
      <div className="max-w-5xl mx-auto flex flex-col gap-5">
        {/* Back link */}
        <Link
          href={backLink}
          className="flex items-center gap-1.5 text-amber-500 hover:text-amber-600 text-xs font-medium transition-colors w-fit"
        >
          <FiArrowLeft size={13} />
          {backLabel}
        </Link>

        {/* Image carousel */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          <ImageCarousel images={images} title={title} />
        </motion.div>

        {/* Two-column layout */}
        <div className="flex flex-col lg:flex-row gap-6 items-start">
          {/* LEFT column: property details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.1,
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex-1 flex flex-col gap-5 min-w-0"
          >
            {/* Tag row + like/share buttons */}
            <div className="flex items-center justify-between">
              {tag && (
                <span className="bg-red-400/50 text-red-500 text-sm font-semibold px-3 py-1 rounded-xl tracking-wide">
                  {tag}
                </span>
              )}
              <div
                className={`flex items-center gap-5 ${!tag ? "ml-auto" : ""}`}
              >
                <button
                  type="button"
                  onClick={() => setLiked((current) => !current)}
                  className="flex items-center justify-center cursor-pointer"
                  aria-label="Save property"
                >
                  <FiHeart
                    size={25}
                    className={
                      liked ? "fill-red-400 text-red-400" : "text-stone-600"
                    }
                  />
                </button>
                <button
                  type="button"
                  className="flex items-center justify-center cursor-pointer"
                  aria-label="Share property"
                >
                  <FiShare2 size={25} className="text-stone-600" />
                </button>
              </div>
            </div>

            {/* Title, location pin, price */}
            <div className="flex flex-col gap-1.5">
              <h1 className="text-xl md:text-3xl font-bold text-stone-800 leading-snug tracking-tight">
                {title}
              </h1>
              <p className="flex items-center gap-1.5 text-stone-400 text-sm font-light">
                <FiMapPin size={12} className="shrink-0 text-amber-400" />
                {location}
              </p>
              <p className="text-amber-500 font-bold text-xl md:text-3xl mt-1">
                {formatPrice(price)}
                {priceLabel !== "Price" && (
                  <span className="text-base font-medium text-stone-400">
                    /{priceLabel}
                  </span>
                )}
              </p>
            </div>

            {/* Property stats */}
            <PropertyStats
              bedrooms={bedrooms}
              bathrooms={bathrooms}
              areaSqft={areaSqft}
            />

            {/* About this property */}
            <div className="flex flex-col gap-2 my-10">
              <h2 className="font-semibold text-3xl">About this property</h2>
              <p className="text-stone-800 font-light leading-relaxed">
                {description}
              </p>
            </div>

            {/* Features & Amenities */}
            <FeaturesList features={features} />
          </motion.div>

          {/* RIGHT column: agent sidebar */}
          <div className="w-full lg:w-72 shrink-0">
            <AgentCard agent={agent} />
          </div>
        </div>
      </div>
    </div>
  );
}
