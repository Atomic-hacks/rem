/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Example Property Detail Page Component
 *
 * Demonstrates how to use the property detail and similar properties hooks.
 */

"use client";

import React from "react";
import { usePropertyDetail, useSimilarProperties } from "@/hooks/useProperty";

interface PropertyDetailPageProps {
  slug: string;
}

export function PropertyDetailPage({ slug }: PropertyDetailPageProps) {
  const { data: property, loading, error } = usePropertyDetail(slug);
  const { data: similarProperties } = useSimilarProperties(slug);
  const [selectedImageIndex, setSelectedImageIndex] = React.useState(0);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="h-96 bg-gray-200 rounded animate-pulse mb-4"></div>
        <div className="h-8 bg-gray-200 rounded w-1/2 animate-pulse mb-4"></div>
        <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-red-50 p-4 rounded text-red-600">
          Error loading property: {error.message}
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            Property not found
          </h1>
        </div>
      </div>
    );
  }

  const displayImages =
    property.images && property.images.length > 0
      ? property.images
      : [{ id: "0", url: property.main_image_url }];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Image Gallery */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2">
          {/* Main Image */}
          <div className="relative w-full h-96 bg-gray-200 rounded-lg overflow-hidden mb-4">
            <img
              src={displayImages[selectedImageIndex].url}
              alt={`${property.title} - Image ${selectedImageIndex + 1}`}
              className="w-full h-full object-cover"
            />
            {property.is_featured && (
              <div className="absolute top-4 right-4 bg-blue-600 text-white px-4 py-2 rounded-full font-semibold">
                ⭐ Featured
              </div>
            )}
          </div>

          {/* Thumbnail Gallery */}
          {displayImages.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {displayImages.map((img:any, idx:number) => (
                <button
                  key={img.id}
                  onClick={() => setSelectedImageIndex(idx)}
                  className={`relative h-20 rounded overflow-hidden border-2 transition ${
                    idx === selectedImageIndex
                      ? "border-blue-600"
                      : "border-gray-300"
                  }`}
                >
                  <img
                    src={img.url}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Property Summary Card */}
        <aside className="lg:col-span-1">
          <div className="bg-white border rounded-lg p-6 sticky top-6">
            <p className="text-gray-600 mb-2">{property.location}</p>
            <h1 className="text-2xl font-bold mb-4">{property.title}</h1>

            <div className="mb-6">
              <p className="text-gray-600 text-sm mb-1">Price</p>
              <p className="text-4xl font-bold text-blue-600">
                {property.price_display}
              </p>
              {property.price_suffix && (
                <p className="text-sm text-gray-600">{property.price_suffix}</p>
              )}
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b">
              <div className="text-center">
                <p className="text-2xl font-bold">{property.bedrooms}</p>
                <p className="text-sm text-gray-600">Bedrooms</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">{property.bathrooms}</p>
                <p className="text-sm text-gray-600">Bathrooms</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold">{property.sqft}</p>
                <p className="text-sm text-gray-600">sqft</p>
              </div>
            </div>

            <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold mb-3 hover:bg-blue-700">
              Contact Agent
            </button>
            <button className="w-full border border-blue-600 text-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-50">
              {property.is_favorited ? "❤️ Favorited" : "🤍 Add to Favorites"}
            </button>
          </div>
        </aside>
      </div>

      {/* Property Details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <main className="lg:col-span-2">
          {/* Description */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">About this property</h2>
            <p className="text-gray-600 leading-relaxed whitespace-pre-wrap">
              {property.description || "No description available"}
            </p>
          </section>

          {/* Property Details */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Property Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="border rounded-lg p-4">
                <p className="text-gray-600 text-sm mb-1">Type</p>
                <p className="font-semibold">
                  {property.property_type_display}
                </p>
              </div>
              <div className="border rounded-lg p-4">
                <p className="text-gray-600 text-sm mb-1">Listing Type</p>
                <p className="font-semibold">{property.listing_type_display}</p>
              </div>
              <div className="border rounded-lg p-4">
                <p className="text-gray-600 text-sm mb-1">Status</p>
                <p className="font-semibold">{property.availability_label}</p>
              </div>
              <div className="border rounded-lg p-4">
                <p className="text-gray-600 text-sm mb-1">Area</p>
                <p className="font-semibold">{property.sqft} sqft</p>
              </div>
            </div>
          </section>

          {/* Amenities */}
          {property.amenities && property.amenities.length > 0 && (
            <section className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Amenities</h2>
              <div className="grid grid-cols-2 gap-3">
                {property.amenities.map((amenity:any) => (
                  <div key={amenity.id} className="flex items-start gap-3">
                    <span className="text-green-600 text-xl">✓</span>
                    <div>
                      <p className="font-semibold">{amenity.name}</p>
                      {amenity.description && (
                        <p className="text-sm text-gray-600">
                          {amenity.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Metadata */}
          <section className="text-sm text-gray-600 pb-8">
            <p>Listed: {new Date(property.created_at).toLocaleDateString()}</p>
            {property.updated_at && (
              <p>
                Updated: {new Date(property.updated_at).toLocaleDateString()}
              </p>
            )}
          </section>
        </main>

        {/* Agent Card */}
        <aside>
          <div className="bg-gray-50 border rounded-lg p-6 sticky top-6">
            <h3 className="font-bold text-lg mb-4">Agent Information</h3>

            <div className="flex gap-4 mb-6">
              {property.agent.avatar_url && (
                <img
                  src={property.agent.avatar_url}
                  alt={property.agent.full_name}
                  className="w-16 h-16 rounded-full object-cover"
                />
              )}
              <div className="flex-1">
                <h4 className="font-semibold">{property.agent.full_name}</h4>
                {property.agent.verified && (
                  <p className="text-sm text-green-600 flex items-center gap-1">
                    ✓ Verified Agent
                  </p>
                )}
                {property.agent.company_name && (
                  <p className="text-sm text-gray-600">
                    {property.agent.company_name}
                  </p>
                )}
              </div>
            </div>

            {property.agent.rating !== undefined && (
              <div className="mb-4">
                <p className="text-sm text-gray-600 mb-1">Rating</p>
                <div className="flex items-center gap-2">
                  <span className="text-yellow-400">
                    {"⭐".repeat(Math.round(property.agent.rating || 0))}
                  </span>
                  <span className="font-semibold">{property.agent.rating}</span>
                </div>
              </div>
            )}

            {property.agent.total_listings !== undefined && (
              <div className="mb-4">
                <p className="text-sm text-gray-600">Total Listings</p>
                <p className="font-semibold">{property.agent.total_listings}</p>
              </div>
            )}

            {property.agent.years_of_experience !== undefined && (
              <div className="mb-6">
                <p className="text-sm text-gray-600">Experience</p>
                <p className="font-semibold">
                  {property.agent.years_of_experience} years
                </p>
              </div>
            )}

            <button className="w-full bg-blue-600 text-white py-2 rounded font-semibold mb-2 hover:bg-blue-700">
              Call Agent
            </button>
            <button className="w-full bg-green-600 text-white py-2 rounded font-semibold hover:bg-green-700">
              WhatsApp
            </button>

            {property.agent.email && (
              <a
                href={`mailto:${property.agent.email}`}
                className="block text-center text-blue-600 text-sm mt-3 hover:underline"
              >
                Email Agent
              </a>
            )}
          </div>
        </aside>
      </div>

      {/* Similar Properties */}
      {similarProperties && similarProperties.length > 0 && (
        <section className="mt-12 border-t pt-8">
          <h2 className="text-2xl font-bold mb-6">Similar Properties</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {similarProperties.slice(0, 6).map((similar) => (
              <div
                key={similar.id}
                className="bg-white border rounded-lg overflow-hidden hover:shadow-lg transition"
              >
                <img
                  src={similar.main_image_url}
                  alt={similar.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h4 className="font-semibold mb-2">{similar.title}</h4>
                  <p className="text-gray-600 text-sm mb-3">
                    {similar.location}
                  </p>
                  <p className="text-xl font-bold text-blue-600 mb-3">
                    {similar.price_display}
                  </p>
                  <div className="flex gap-4 text-sm text-gray-600">
                    <span>🛏️ {similar.bedrooms}</span>
                    <span>🚿 {similar.bathrooms}</span>
                  </div>
                  <button className="w-full mt-4 border border-blue-600 text-blue-600 py-2 rounded hover:bg-blue-50">
                    View Details
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
