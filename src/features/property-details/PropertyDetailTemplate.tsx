"use client";

import { PropertyCard } from "@/components/property/PropertyCard";
import {
  AgentCard,
  FeaturesList,
  ImageCarousel,
  PropertyStats,
} from "@/components/ui/property-details";
import type { ApiProperty } from "@/services";
import type { ListingAgent } from "@/types";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { FiArrowLeft, FiHeart, FiMapPin, FiShare2 } from "react-icons/fi";

export interface PropertyDetailTemplateProps {
  title: string;
  location: string;
  price: string | number;
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
  availabilityLabel?: string;
  backLabel?: string;
  similarProperties?: ApiProperty[];
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
  availabilityLabel,
  backLabel = "Back to listings",
  similarProperties = [],
}: PropertyDetailTemplateProps) {
  const [liked, setLiked] = useState(false);

  const formatPrice = (amount: string | number) =>
    typeof amount === "number" ? `₦${amount.toLocaleString()}` : amount;

  return (
    <div className="min-h-screen bg-[#FAF7F2] px-4 py-6 font-sans sm:px-6 lg:px-10">
      <div className="mx-auto flex max-w-5xl flex-col gap-5">
        <Link
          href={backLink}
          className="flex w-fit items-center gap-1.5 text-xs font-medium text-amber-500 transition-colors hover:text-amber-600"
        >
          <FiArrowLeft size={13} />
          {backLabel}
        </Link>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          {images.length > 0 ? (
            <ImageCarousel images={images} title={title} />
          ) : (
            <div className="flex h-72 items-center justify-center rounded-2xl bg-stone-100 text-sm text-stone-500 sm:h-96">
              No gallery images available
            </div>
          )}
        </motion.div>

        <div className="flex flex-col items-start gap-6 lg:flex-row">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.1,
              duration: 0.55,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex min-w-0 flex-1 flex-col gap-5"
          >
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                {tag && (
                  <span className="rounded-xl bg-red-400/50 px-3 py-1 text-sm font-semibold tracking-wide text-red-500">
                    {tag}
                  </span>
                )}
                {availabilityLabel && (
                  <span className="rounded-xl bg-emerald-100 px-3 py-1 text-sm font-semibold tracking-wide text-emerald-700">
                    {availabilityLabel}
                  </span>
                )}
              </div>
              <div
                className={`flex items-center gap-5 ${!tag && !availabilityLabel ? "ml-auto" : ""}`}
              >
                <button
                  type="button"
                  onClick={() => setLiked((current) => !current)}
                  className="flex cursor-pointer items-center justify-center"
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
                  className="flex cursor-pointer items-center justify-center"
                  aria-label="Share property"
                >
                  <FiShare2 size={25} className="text-stone-600" />
                </button>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <h1 className="text-xl font-bold leading-snug tracking-tight text-stone-800 md:text-3xl">
                {title}
              </h1>
              <p className="flex items-center gap-1.5 text-sm font-light text-stone-400">
                <FiMapPin size={12} className="shrink-0 text-amber-400" />
                {location}
              </p>
              <p className="mt-1 text-xl font-bold text-amber-500 md:text-3xl">
                {formatPrice(price)}
                {priceLabel !== "Price" && (
                  <span className="text-base font-medium text-stone-400">
                    /{priceLabel}
                  </span>
                )}
              </p>
            </div>

            <PropertyStats
              bedrooms={bedrooms}
              bathrooms={bathrooms}
              areaSqft={areaSqft}
            />

            <div className="my-10 flex flex-col gap-2">
              <h2 className="text-3xl font-semibold">About this property</h2>
              <p className="font-light leading-relaxed text-stone-800">
                {description}
              </p>
            </div>

            {features.length > 0 && <FeaturesList features={features} />}
          </motion.div>

          <div className="w-full shrink-0 lg:w-72">
            <AgentCard agent={agent} />
          </div>
        </div>
      </div>

      {similarProperties.length > 0 && (
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.2,
            duration: 0.55,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="mx-auto mt-8 flex max-w-5xl flex-col gap-4 px-4 sm:px-6 lg:px-10"
        >
          <h2 className="text-3xl font-semibold text-stone-800">
            Similar Properties
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            {similarProperties.map((similarProperty) => (
              <PropertyCard key={similarProperty.id} property={similarProperty} />
            ))}
          </div>
        </motion.section>
      )}
    </div>
  );
}
