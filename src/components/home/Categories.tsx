import type { Category } from "@/services";
import Link from "next/link";
import { FiCalendar, FiHome, FiKey } from "react-icons/fi";

const fallbackCategories: Category[] = [
  {
    listing_type: "for_sale",
    label: "For Sale",
    icon: "home",
    description: "Browse properties available for sale across Africa.",
    count: 0,
  },
  {
    listing_type: "rent",
    label: "For Rent",
    icon: "key",
    description: "Find short and long-term rental properties for you.",
    count: 0,
  },
  {
    listing_type: "short_let",
    label: "Short Let",
    icon: "calendar",
    description: "Discover flexible short-let accommodation near you.",
    count: 0,
  },
];

const routeByListing: Record<string, string> = {
  for_sale: "/userSale",
  rent: "/userRent",
  short_let: "/shortlet",
};

const iconByName = {
  home: FiHome,
  key: FiKey,
  calendar: FiCalendar,
};

const cardStyles: Record<string, string> = {
  for_sale: "bg-[#FFF3E6] border-[#F2E7DA] text-[#EAAE27]",
  rent: "bg-[#EAF3FF] border-[#DCE9FF] text-[#3A7BFF]",
  short_let: "bg-[#EFFFF3] border-[#D9F5E1] text-[#1FAF63]",
};

export default function BrowseByCategory({
  categories,
}: {
  categories: Category[];
}) {
  const items = categories.length ? categories : fallbackCategories;

  return (
    <section className="w-full bg-[#FAFAF8] px-4 py-20 md:px-10">
      <div className="mb-12 text-center">
        <h2 className="text-2xl font-semibold text-[#2B2B2B] md:text-3xl">
          Browse by Category
        </h2>
        <p className="mt-2 text-sm text-gray-500 md:text-base">
          Find what you&apos;re looking for
        </p>
      </div>

      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">
        {items.map((category) => {
          const Icon = iconByName[category.icon as keyof typeof iconByName] ?? FiHome;
          const style = cardStyles[category.listing_type] ?? cardStyles.for_sale;

          return (
            <div
              key={category.listing_type}
              className={`group rounded-2xl border p-6 shadow-sm transition hover:shadow-md ${style}`}
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-xl bg-white/60 p-2">
                  <Icon size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-[#2B2B2B]">
                    {category.label}
                  </h3>
                  <p className="text-xs font-medium text-gray-500">
                    {category.count.toLocaleString()} listings
                  </p>
                </div>
              </div>

              <p className="mb-4 text-sm text-gray-600">{category.description}</p>

              <Link
                href={routeByListing[category.listing_type] ?? "/userSale"}
                className="text-sm font-medium hover:underline"
              >
                View Listings
              </Link>
            </div>
          );
        })}
      </div>
    </section>
  );
}
