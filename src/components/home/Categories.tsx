import Image from "next/image";
import Link from "next/link";
import { Home, KeyRound, Building2 } from "lucide-react";

export default function BrowseByCategory() {
  return (
    <section className="w-full bg-[#FAFAF8] py-20 px-4 md:px-10">
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-2xl md:text-3xl font-semibold text-[#2B2B2B]">
          Browse by Category
        </h2>
        <p className="text-sm md:text-base text-gray-500 mt-2">
          Find what you’re looking for
        </p>
      </div>

      {/* Grid */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* FOR SALE */}
        <div className="group rounded-2xl bg-[#FFF3E6] p-4 shadow-sm border border-[#F2E7DA] hover:shadow-md transition">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-[#FFE3C2]">
              <Home className="text-[#EAAE27]" size={20} />
            </div>
            <h3 className="text-lg font-semibold text-[#2B2B2B]">For Sale</h3>
          </div>

          <p className="text-sm text-gray-600 mb-4">
            Browse properties available for purchase across Africa.
          </p>

          <Link
            href="#"
            className="text-sm font-medium text-[#EAAE27] hover:underline"
          >
            View Listings →
          </Link>
        </div>

        {/* FOR RENT */}
        <div className="group rounded-2xl bg-[#EAF3FF] p-6 shadow-sm border border-[#DCE9FF] hover:shadow-md transition">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-[#D6E8FF]">
              <Building2 className="text-[#3A7BFF]" size={20} />
            </div>
            <h3 className="text-lg font-semibold text-[#2B2B2B]">For Rent</h3>
          </div>

          <p className="text-sm text-gray-600 mb-4">
            Find the perfect rental property for your lifestyle.
          </p>

          <Link
            href="#"
            className="text-sm font-medium text-[#3A7BFF] hover:underline"
          >
            View Listings →
          </Link>
        </div>

        {/* SHORT LET */}
        <div className="group rounded-2xl bg-[#EFFFF3] p-6 shadow-sm border border-[#D9F5E1] hover:shadow-md transition">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-xl bg-[#CFF5DB]">
              <KeyRound className="text-[#1FAF63]" size={20} />
            </div>
            <h3 className="text-lg font-semibold text-[#2B2B2B]">Short-Let</h3>
          </div>

          <p className="text-sm text-gray-600 mb-4">
            Book temporary accommodations for short stays.
          </p>

          <Link
            href="#"
            className="text-sm font-medium text-[#1FAF63] hover:underline"
          >
            View Listings →
          </Link>
        </div>
      </div>
    </section>
  );
}
