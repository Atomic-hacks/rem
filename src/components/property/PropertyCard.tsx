"use client";

import type { ApiProperty } from "@/services";
import Image from "next/image";
import Link from "next/link";
import { FiMapPin, FiSquare, FiVolume2, FiWind } from "react-icons/fi";

const routeByListing: Record<ApiProperty["property_listing"], string> = {
  for_sale: "/userSale",
  rent: "/userRent",
  short_let: "/shortlet",
  hotel: "/hotel",
};

const badgeClassByListing: Record<ApiProperty["property_listing"], string> = {
  for_sale: "bg-yellow-500",
  rent: "bg-blue-500",
  short_let: "bg-green-500",
  hotel: "bg-indigo-500",
};

export interface PropertyCardProps {
  property: ApiProperty;
  className?: string;
}

export function PropertyCard({ property, className }: PropertyCardProps) {
  const route = routeByListing[property.property_listing] ?? "/userSale";

  return (
    <Link
      href={`${route}/${property.slug}`}
      className={`overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-md ${className ?? ""}`}
    >
      <div className="relative h-52 w-full">
        {property.main_image_url ? (
          <Image
            src={property.main_image_url}
            alt={property.title}
            fill
            unoptimized={property.main_image_url.startsWith("http")}
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-stone-100" />
        )}
        <span
          className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-medium text-white ${
            badgeClassByListing[property.property_listing]
          }`}
        >
          {property.listing_type_display}
        </span>
      </div>

      <div className="p-5">
        <h3 className="line-clamp-1 text-base font-semibold text-gray-800">
          {property.title}
        </h3>

        <div className="mt-2 flex items-center gap-1 text-sm text-gray-500">
          <FiMapPin className="h-4 w-4 shrink-0" />
          <span className="line-clamp-1">{property.location}</span>
        </div>

        <p className="mt-4 text-2xl font-bold text-yellow-500">
          {property.price_display}
          {property.price_suffix && (
            <span className="text-sm font-medium text-gray-400">
              {property.price_suffix}
            </span>
          )}
        </p>

        <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-gray-500">
          <div className="flex items-center gap-1">
            <FiVolume2 className="h-4 w-4" />
            <span>{property.bedrooms} Beds</span>
          </div>
          <div className="flex items-center gap-1">
            <FiWind className="h-4 w-4" />
            <span>{property.bathrooms} Baths</span>
          </div>
          <div className="flex items-center gap-1">
            <FiSquare className="h-4 w-4" />
            <span>{property.sqft.toLocaleString()} sqft</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
