import type { ApiProperty } from "@/services";
import Image from "next/image";
import Link from "next/link";
import { FiMapPin, FiMove, FiHome, FiVolume2 } from "react-icons/fi";

const fallbackImage = "/villa1.jpg";

const routeByListing: Record<string, string> = {
  for_sale: "/userSale",
  rent: "/userRent",
  short_let: "/shortlet",
};

const badgeClassByListing: Record<string, string> = {
  for_sale: "bg-[#F0B41E]",
  rent: "bg-blue-500",
  short_let: "bg-green-500",
};

const FeaturedProperties = ({ properties }: { properties: ApiProperty[] }) => {
  return (
    <section className="w-full bg-[#F7F7F7] px-6 py-20 md:px-12">
      <div className="mb-12 text-center">
        <h2 className="text-3xl font-semibold text-[#1f1f1f] md:text-4xl">
          Featured Properties
        </h2>
        <p className="mt-2 text-gray-500">
          Discover our hand-picked selection of premium properties
        </p>
      </div>

      <div className="mx-auto grid max-w-7xl gap-8 md:grid-cols-2 lg:grid-cols-3">
        {properties.map((property) => {
          const baseRoute = routeByListing[property.property_listing] ?? "/userSale";
          const image = property.main_image_url || fallbackImage;

          return (
            <Link
              key={property.id}
              href={`${baseRoute}/${property.slug}`}
              className="overflow-hidden rounded-2xl bg-white shadow-sm transition duration-300 hover:shadow-xl"
            >
              <div className="relative h-52 w-full">
                <Image
                  src={image}
                  alt={property.title}
                  fill
                  unoptimized={image.startsWith("http")}
                  className="object-cover"
                />
                <span
                  className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-medium text-white ${
                    badgeClassByListing[property.property_listing] ?? "bg-[#F0B41E]"
                  }`}
                >
                  {property.listing_type_display}
                </span>
              </div>

              <div className="p-5">
                <h3 className="line-clamp-1 text-lg font-semibold text-[#1f1f1f]">
                  {property.title}
                </h3>
                <div className="mt-1 flex items-center gap-2 text-sm text-gray-500">
                  <FiMapPin size={14} />
                  <span className="line-clamp-1">{property.location}</span>
                </div>
                <p className="mt-3 text-lg font-semibold text-[#F0B41E]">
                  {property.price_display}
                  {property.price_suffix && (
                    <span className="text-sm font-medium text-gray-400">
                      {property.price_suffix}
                    </span>
                  )}
                </p>
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
          No featured properties are available right now.
        </div>
      )}

      <div className="mt-12 text-center">
        <Link
          href="/userSale"
          className="inline-flex rounded-full bg-[#F0B41E] px-6 py-3 font-medium text-white transition hover:bg-[#e6a816]"
        >
          View All Properties
        </Link>
      </div>
    </section>
  );
};

export default FeaturedProperties;
