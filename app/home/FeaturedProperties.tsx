import Image from "next/image";
import { MapPin, Bed, Bath, Move } from "lucide-react";

type Property = {
  title: string;
  location: string;
  price: string;
  type: "For Sale" | "For Rent" | "Short-Let";
  image: string;
  beds: number;
  baths: number;
  size: string;
};

const properties: Property[] = [
  {
    title: "Luxury Modern Villa",
    location: "Lekki, Lagos",
    price: "₦185,000,000",
    type: "For Sale",
    beds: 5,
    baths: 6,
    size: "450 sqm",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Contemporary Apartment",
    location: "Victoria Island, Lagos",
    price: "₦800,000/month",
    type: "For Rent",
    beds: 3,
    baths: 3,
    size: "180 sqm",
    image:
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Cozy Beachfront Studio",
    location: "Eko Atlantic, Lagos",
    price: "₦450,000/night",
    type: "Short-Let",
    beds: 1,
    baths: 1,
    size: "80 sqm",
    image:
      "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Penthouse with City View",
    location: "Ikoyi, Lagos",
    price: "₦150,000,000",
    type: "For Sale",
    beds: 4,
    baths: 5,
    size: "520 sqm",
    image:
      "https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Modern Office Space",
    location: "Ikeja, Lagos",
    price: "₦400,000/month",
    type: "For Rent",
    beds: 0,
    baths: 2,
    size: "300 sqm",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1200&q=80",
  },
  {
    title: "Garden Apartment",
    location: "Ajah, Lagos",
    price: "₦250,000/night",
    type: "Short-Let",
    beds: 2,
    baths: 2,
    size: "120 sqm",
    image:
      "https://images.unsplash.com/photo-1449844908441-8829872d2607?auto=format&fit=crop&w=1200&q=80",
  },
];

const FeaturedProperties = () => {
  return (
    <section className="w-full bg-[#F7F7F7] py-20 px-6 md:px-12">
      {/* Heading */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-semibold text-[#1f1f1f]">
          Featured Properties
        </h2>
        <p className="text-gray-500 mt-2">
          Discover our hand-picked selection of premium properties
        </p>
      </div>

      {/* Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 max-w-7xl mx-auto">
        {properties.map((property, index) => (
          <div
            key={index}
            className="bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition duration-300"
          >
            {/* Image */}
            <div className="relative h-52 w-full">
              <Image
                src={property.image}
                alt={property.title}
                fill
                className="object-cover"
              />

              {/* Badge */}
              <span
                className={`absolute top-3 left-3 text-xs px-3 py-1 rounded-full font-medium text-white ${
                  property.type === "For Sale"
                    ? "bg-[#F0B41E]"
                    : property.type === "For Rent"
                      ? "bg-blue-500"
                      : "bg-green-500"
                }`}
              >
                {property.type}
              </span>
            </div>

            {/* Content */}
            <div className="p-5">
              <h3 className="text-lg font-semibold text-[#1f1f1f]">
                {property.title}
              </h3>

              <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                <MapPin size={14} />
                {property.location}
              </div>

              <p className="text-[#F0B41E] font-semibold text-lg mt-3">
                {property.price}
              </p>

              {/* Features */}
              <div className="flex items-center justify-between mt-4 text-xs text-gray-600">
                <div className="flex items-center gap-1">
                  <Bed size={14} /> {property.beds} Beds
                </div>
                <div className="flex items-center gap-1">
                  <Bath size={14} /> {property.baths} Baths
                </div>
                <div className="flex items-center gap-1">
                  <Move size={14} /> {property.size}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Button */}
      <div className="text-center mt-12">
        <button className="bg-[#F0B41E] hover:bg-[#e6a816] text-white px-6 py-3 rounded-full font-medium transition">
          View All Properties
        </button>
      </div>
    </section>
  );
};

export default FeaturedProperties;
