"use client";

import { PropertyDetailTemplate } from "@/features/property-details";
import { getPropertyBySlug } from "@/services";
import type { ApiProperty } from "@/services";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

function toNumber(value: string | number | undefined) {
  const parsed = Number(value ?? 0);
  return Number.isFinite(parsed) ? parsed : 0;
}

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function propertyImages(property: ApiProperty) {
  const gallery = property.images?.map((image) => image.url).filter(Boolean) ?? [];
  return gallery.length > 0
    ? gallery
    : [property.main_image_url || "/villa1.jpg"];
}

function features(property: ApiProperty) {
  return property.amenities?.map((amenity) => amenity.name).filter(Boolean) ?? [];
}

function agent(property: ApiProperty) {
  const fullName = property.agent?.full_name || "Property Agent";
  return {
    name: fullName,
    company: property.agent?.company_name || property.agent?.agent_type || "Real Estate Agent",
    location: property.location,
    rating: toNumber(property.agent?.rating) || 0,
    reviews: 0,
    phone: property.agent?.phone || "",
    email: property.agent?.email || "",
    initials: initials(fullName) || "RA",
  };
}

function priceLabel(property: ApiProperty) {
  if (property.property_listing === "rent") {
    return property.price_suffix?.replace("/", "") || "Month";
  }

  if (property.property_listing === "short_let") {
    return property.price_suffix?.replace("/", "") || "Night";
  }

  return "Price";
}

export function ApiPropertyDetailPage({
  backLink,
  notFoundLabel,
}: {
  backLink: string;
  notFoundLabel: string;
}) {
  const params = useParams<{ id: string }>();
  const slug = params.id;
  const [property, setProperty] = useState<ApiProperty | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!slug) {
      setLoading(false);
      setError("Property not found.");
      return;
    }

    let mounted = true;
    setLoading(true);
    setError("");

    getPropertyBySlug(slug)
      .then((response) => {
        if (mounted) {
          setProperty(response);
        }
      })
      .catch((err: unknown) => {
        if (mounted) {
          setError(err instanceof Error ? err.message : "Unable to load property.");
          setProperty(null);
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
  }, [slug]);

  const detail = useMemo(() => {
    if (!property) {
      return null;
    }

    return {
      images: propertyImages(property),
      features: features(property),
      agent: agent(property),
      priceLabel: priceLabel(property),
    };
  }, [property]);

  if (loading) {
    return (
      <section className="min-h-[60vh] bg-[#FAF7F2] px-4 py-16 text-center">
        <p className="text-stone-500">Loading property...</p>
      </section>
    );
  }

  if (!property || !detail || error) {
    return (
      <section className="min-h-[60vh] bg-[#FAF7F2] px-4 py-16 text-center">
        <h1 className="text-2xl font-bold text-stone-800">{notFoundLabel}</h1>
        {error && <p className="mt-2 text-sm text-stone-500">{error}</p>}
        <Link
          href={backLink}
          className="mt-4 inline-flex font-medium text-amber-500 hover:text-amber-600"
        >
          Back to listings
        </Link>
      </section>
    );
  }

  return (
    <PropertyDetailTemplate
      title={property.title}
      location={property.location}
      price={toNumber(property.price)}
      priceLabel={detail.priceLabel}
      images={detail.images}
      bedrooms={property.bedrooms}
      bathrooms={property.bathrooms}
      areaSqft={property.sqft}
      description={property.description || "No description provided."}
      features={detail.features}
      agent={detail.agent}
      backLink={backLink}
      backLabel="Back to listings"
      tag={property.listing_type_display}
    />
  );
}
