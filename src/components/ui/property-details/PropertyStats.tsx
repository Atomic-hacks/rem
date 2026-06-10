"use client";

import { motion } from "framer-motion";
import { BiArea } from "react-icons/bi";
import { MdOutlineBathtub, MdOutlineBedroomParent } from "react-icons/md";

export interface PropertyStatsProps {
  bedrooms: number;
  bathrooms: number;
  areaSqft: number;
}

export function PropertyStats({
  bedrooms,
  bathrooms,
  areaSqft,
}: PropertyStatsProps) {
  const stats = [
    {
      icon: <MdOutlineBedroomParent size={25} />,
      label: "Bedrooms",
      value: bedrooms,
    },
    {
      icon: <MdOutlineBathtub size={25} />,
      label: "Bathrooms",
      value: bathrooms,
    },
    {
      icon: <BiArea size={25} />,
      label: "Area",
      value: `${areaSqft} sqft`,
    },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2, duration: 0.4 }}
      className="grid grid-cols-3 gap-3 bg-white rounded-lg border border-stone-100 shadow-sm px-4 py-6"
    >
      {stats.map((stat) => (
        <div key={stat.label} className="flex flex-col gap-1">
          <p className="text-stone-600 text-xs uppercase tracking-wider font-light flex items-center gap-1.5">
            {stat.label}
          </p>
          <p className="font-semibold text-lg gap-2 flex">
            <span>{stat.icon}</span> {stat.value}
          </p>
        </div>
      ))}
    </motion.div>
  );
}
