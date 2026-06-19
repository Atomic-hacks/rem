import type { ApiProperty } from "@/services";
import Image from "next/image";
import Link from "next/link";
import { FiHome, FiMapPin, FiMove, FiVolume2 } from "react-icons/fi";

const routeByListing: Record<string, string> = {
  for_sale: "/userSale",
  rent: "/userRent",
  short_let: "/shortlet",
  hotel: "/hotel",
};

const badgeClassByListing: Record<string, string> = {
  for_sale: "bg-[#F0B41E]",
  rent: "bg-blue-500",
  short_let: "bg-green-500",
  hotel: "bg-indigo-500",
};

type FeaturedPropertiesProps = {
  properties: ApiProperty[];
  title?: string;
  subtitle?: string;
  ctaHref?: string;
  ctaLabel?: string;
  emptyLabel?: string;
  showCta?: boolean;
};

const FeaturedProperties = ({
  properties,
  title = "Featured Properties",
  subtitle = "Discover our hand-picked selection of premium properties",
  ctaHref = "/userSale",
  ctaLabel = "View All Properties",
  emptyLabel = "No properties are available right now.",
  showCta = true,
}: FeaturedPropertiesProps) => {
  return (
    <section className="w-full bg-[#F7F7F7] px-6 py-20 md:px-12">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-semibold text-[#1f1f1f] md:text-4xl">
          {title}
        </h2>
        <p className="mt-2 text-gray-500">{subtitle}</p>
      </div>

      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 lg:grid-cols-3">
        {properties.map((property) => {
          const baseRoute = routeByListing[property.property_listing] ?? "/userSale";
          const agentLabel =
            property.agent.company_name || property.agent.agent_type || "";
          const hasAgentInfo = Boolean(property.agent.full_name || agentLabel);

          return (
            <Link
              key={property.id}
              href={`${baseRoute}/${property.slug}`}
              className="overflow-hidden rounded-2xl bg-white shadow-sm transition duration-300 hover:shadow-xl"
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
                <div className="absolute left-3 top-3 flex flex-wrap gap-2">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium text-white ${
                      badgeClassByListing[property.property_listing] ?? "bg-[#F0B41E]"
                    }`}
                  >
                    {property.listing_type_display}
                  </span>
                  {property.is_featured && (
                    <span className="rounded-full bg-stone-900/80 px-3 py-1 text-xs font-medium text-white">
                      Featured
                    </span>
                  )}
                </div>
              </div>

              <div className="p-5">
                <div className="flex items-start justify-between gap-3">
                  <h3 className="line-clamp-1 text-lg font-semibold text-[#1f1f1f]">
                    {property.title}
                  </h3>
                  <span className="shrink-0 rounded-full bg-[#F5F1E8] px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-[#8A6A12]">
                    {property.availability_label}
                  </span>
                </div>

                <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                  <FiMapPin size={14} />
                  <span className="line-clamp-1">{property.location}</span>
                </div>

                <div className="mt-3 flex items-end justify-between gap-3">
                  <p className="text-lg font-semibold text-[#F0B41E]">
                    {property.price_display}
                    {property.price_suffix && (
                      <span className="text-sm font-medium text-gray-400">
                        {property.price_suffix}
                      </span>
                    )}
                  </p>

                  {hasAgentInfo && (
                    <p className="text-right text-[11px] leading-4 text-gray-500">
                      <span className="block font-semibold text-gray-700">
                        {property.agent.full_name}
                      </span>
                      {agentLabel && <span className="block">{agentLabel}</span>}
                    </p>
                  )}
                </div>

                <div className="mt-4 flex items-center justify-between text-xs text-gray-600">
                  <div className="flex items-center gap-1">
                    <FiHome size={14} /> {property.bedrooms} Beds
                  </div>
                  <div className="flex items-center gap-1">
                    <FiVolume2 size={14} /> {property.bathrooms} Baths
                  </div>
                  <div className="flex items-center gap-1">
                    <FiMove size={14} /> {property.sqft.toLocaleString()} sqft
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {properties.length === 0 && (
        <div className="mx-auto max-w-7xl rounded-xl border border-gray-200 bg-white px-4 py-10 text-center text-sm text-gray-500">
          {emptyLabel}
        </div>
      )}

      {showCta && (
        <div className="mt-12 text-center">
          <Link
            href={ctaHref}
            className="inline-flex rounded-full bg-[#F0B41E] px-6 py-3 font-medium text-white transition hover:bg-[#e6a816]"
          >
            {ctaLabel}
          </Link>
        </div>
      )}
    </section>
  );
};

export default FeaturedProperties;
