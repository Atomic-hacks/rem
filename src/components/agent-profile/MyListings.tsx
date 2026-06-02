"use client";

import Image from "next/image";

type Listing = {
  id: number;
  title: string;
  location: string;
  price: string;
  image: string;
  tag: "for-sale" | "for-rent";
  views: number;
  inquiries: number;
};

const listings: Listing[] = [
  {
    id: 1,
    title: "Luxury Waterfront Villa with Private Pool",
    location: "Lagos, Ikoyi",
    price: "₦250,000,000",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
    tag: "for-sale",
    views: 234,
    inquiries: 12,
  },
  {
    id: 2,
    title: "Modern 3BR Apartment in Business District",
    location: "Accra, Osu",
    price: "₦850,000/month",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688",
    tag: "for-rent",
    views: 456,
    inquiries: 28,
  },
];

export default function MyListings() {
  return (
    <div className="p-6 w-full">
      <h1 className="text-2xl font-semibold mb-6">My Listings</h1>

      <div className="space-y-6">
        {listings.map((item) => (
          <div
            key={item.id}
            className="flex gap-5 bg-white rounded-xl shadow-sm border p-4"
          >
            {/* Image */}
            <div className="relative w-40 h-28 rounded-lg overflow-hidden">
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="font-semibold text-lg">{item.title}</h2>
                  <p className="text-sm text-gray-500">{item.location}</p>
                </div>

                <span
                  className={`text-xs px-3 py-1 rounded-full ${
                    item.tag === "for-sale"
                      ? "bg-orange-100 text-orange-600"
                      : "bg-blue-100 text-blue-600"
                  }`}
                >
                  {item.tag}
                </span>
              </div>

              <p className="text-orange-500 font-bold mt-2">{item.price}</p>

              {/* stats */}
              <div className="flex gap-4 text-sm text-gray-500 mt-2">
                <span>👁 {item.views} views</span>
                <span>💬 {item.inquiries} inquiries</span>
              </div>

              {/* buttons */}
              <div className="flex gap-2 mt-4">
                <button className="px-3 py-1 text-sm border rounded-md hover:bg-gray-100">
                  Edit
                </button>
                <button className="px-3 py-1 text-sm border rounded-md hover:bg-gray-100">
                  Analytics
                </button>
                <button className="px-3 py-1 text-sm border rounded-md text-red-500 hover:bg-red-50">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}