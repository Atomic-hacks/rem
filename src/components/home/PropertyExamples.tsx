/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Example Home Page Component
 *
 * This component demonstrates how to consume the property API
 * using both hooks and direct service calls.
 */

"use client";

import { useHomePageData } from "@/hooks/useProperty";

interface HomeHeroProps {
  onSearch?: (filters: any) => void;
}

export function HomeHero({ onSearch }: HomeHeroProps) {
  const { data, loading, error } = useHomePageData();

  if (loading) {
    return (
      <div className="bg-gradient-to-b from-blue-50 to-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <div className="h-8 bg-gray-200 rounded w-1/2 mx-auto mb-4 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded w-3/4 mx-auto animate-pulse"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <p className="text-red-600">
            Failed to load home page data: {error.message}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-blue-50 to-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-center mb-4">
          Find Your Perfect Property
        </h1>
        <p className="text-xl text-gray-600 text-center mb-8">
          Browse {data?.categories.reduce((sum, cat) => sum + cat.count, 0)}{" "}
          properties across Africa
        </p>

        {/* Search Form using search_config */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            // Handle search
          }}
          className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-lg"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Listing Type Dropdown */}
            <select className="border rounded px-4 py-2">
              <option value="">Select Type</option>
              {data?.search_config.listing_types.map((type) => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </select>

            {/* Price Range Dropdown (dynamic based on listing type) */}
            <select className="border rounded px-4 py-2">
              <option value="">Select Price Range</option>
              {data?.search_config.price_ranges.for_sale.map((range, idx) => (
                <option
                  key={idx}
                  value={`${range.price_min}-${range.price_max}`}
                >
                  {range.label}
                </option>
              ))}
            </select>

            {/* Location Search */}
            <input
              type="text"
              placeholder="Location"
              className="border rounded px-4 py-2"
            />

            {/* Search Button */}
            <button
              type="submit"
              className="bg-blue-600 text-white rounded px-4 py-2 hover:bg-blue-700"
            >
              Search Properties
            </button>
          </div>
        </form>

        {/* Categories Grid */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold mb-8">Browse by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {data?.categories.map((category) => (
              <div
                key={category.listing_type}
                className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition"
              >
                <div className="text-4xl mb-4">📍</div>
                <h3 className="text-xl font-semibold mb-2">{category.label}</h3>
                <p className="text-gray-600 mb-4">{category.description}</p>
                <p className="text-2xl font-bold text-blue-600">
                  {category.count} properties
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Featured Properties Carousel Component
 */
export function FeaturedPropertiesCarousel() {
  const { data, loading, error } = useHomePageData();

  if (loading || error || !data) return null;

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Featured Properties</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data.featured_properties.slice(0, 6).map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-lg overflow-hidden shadow hover:shadow-xl transition"
            >
              {/* Property Image */}
              <div className="relative w-full h-48 bg-gray-200 overflow-hidden">
                <img
                  src={property.main_image_url}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                {property.is_featured && (
                  <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded">
                    Featured
                  </div>
                )}
              </div>

              {/* Property Details */}
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{property.title}</h3>
                <p className="text-gray-600 text-sm mb-3">
                  {property.location}
                </p>

                <p className="text-2xl font-bold text-blue-600 mb-3">
                  {property.price_display}
                </p>

                <div className="flex gap-4 mb-4 text-sm text-gray-600">
                  <span>🛏️ {property.bedrooms} bed</span>
                  <span>🚿 {property.bathrooms} bath</span>
                  <span>📐 {property.sqft} sqft</span>
                </div>

                {/* Agent Info */}
                <div className="border-t pt-4">
                  <div className="flex items-center gap-3">
                    {property.agent.avatar_url && (
                      <img
                        src={property.agent.avatar_url}
                        alt={property.agent.full_name}
                        className="w-10 h-10 rounded-full"
                      />
                    )}
                    <div className="flex-1">
                      <p className="font-semibold text-sm">
                        {property.agent.full_name}
                      </p>
                      {property.agent.total_listings && (
                        <p className="text-xs text-gray-600">
                          {property.agent.total_listings} listings
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/**
 * Property List with Filters Component
 */
export function PropertyListWithFilters() {
  const [filters, setFilters] = React.useState<PropertyFilterParams>({
    listing_type: "for_sale",
    limit: 12,
    page: 1,
  });

  const { data, loading, error } = useProperties(filters);

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">All Properties</h2>

        {/* Filter Sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <div className="bg-white p-6 rounded-lg">
              <h3 className="font-bold mb-4">Filters</h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Property Type
                  </label>
                  <select
                    value={filters.listing_type}
                    onChange={(e) =>
                      setFilters({ ...filters, listing_type: e.target.value })
                    }
                    className="w-full border rounded px-3 py-2"
                  >
                    <option value="for_sale">For Sale</option>
                    <option value="rent">For Rent</option>
                    <option value="short_let">Short Let</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Min Bedrooms
                  </label>
                  <input
                    type="number"
                    min="0"
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        min_bedrooms: e.target.value
                          ? parseInt(e.target.value)
                          : undefined,
                      })
                    }
                    className="w-full border rounded px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Min Price
                  </label>
                  <input
                    type="number"
                    min="0"
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        min_price: e.target.value
                          ? parseFloat(e.target.value)
                          : undefined,
                      })
                    }
                    className="w-full border rounded px-3 py-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">
                    Max Price
                  </label>
                  <input
                    type="number"
                    min="0"
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        max_price: e.target.value
                          ? parseFloat(e.target.value)
                          : undefined,
                      })
                    }
                    className="w-full border rounded px-3 py-2"
                  />
                </div>
              </div>
            </div>
          </aside>

          {/* Property Grid */}
          <main className="lg:col-span-3">
            {loading && <p>Loading properties...</p>}
            {error && <p className="text-red-600">Error: {error.message}</p>}

            {data && (
              <>
                <p className="mb-6 text-gray-600">
                  Showing {data.results.length} of {data.count} properties
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {data.results.map((property) => (
                    <div
                      key={property.id}
                      className="bg-white rounded-lg overflow-hidden shadow"
                    >
                      <img
                        src={property.main_image_url}
                        alt={property.title}
                        className="w-full h-48 object-cover"
                      />
                      <div className="p-4">
                        <h4 className="font-semibold mb-2">{property.title}</h4>
                        <p className="text-gray-600 text-sm mb-2">
                          {property.location}
                        </p>
                        <p className="text-xl font-bold text-blue-600 mb-3">
                          {property.price_display}
                        </p>
                        <div className="flex gap-4 text-sm text-gray-600">
                          <span>{property.bedrooms} bed</span>
                          <span>{property.bathrooms} bath</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Pagination */}
                {data.next || data.previous ? (
                  <div className="mt-8 flex justify-center gap-4">
                    {data.previous && (
                      <button
                        onClick={() =>
                          setFilters({
                            ...filters,
                            page: (filters.page ?? 1) - 1,
                          })
                        }
                        className="px-4 py-2 border rounded hover:bg-gray-100"
                      >
                        Previous
                      </button>
                    )}
                    {data.next && (
                      <button
                        onClick={() =>
                          setFilters({
                            ...filters,
                            page: (filters.page ?? 1) + 1,
                          })
                        }
                        className="px-4 py-2 border rounded hover:bg-gray-100"
                      >
                        Next
                      </button>
                    )}
                  </div>
                ) : null}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

// Add React import for the component that uses React.useState
import React from "react";
import { useProperties, type PropertyFilterParams } from "@/hooks/useProperty";
