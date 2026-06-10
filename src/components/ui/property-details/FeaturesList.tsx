"use client";

import { motion } from "framer-motion";
import { TbCircleFilled } from "react-icons/tb";

export interface FeaturesListProps {
  features: string[];
}

export function FeaturesList({ features }: FeaturesListProps) {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="text-stone-800 font-semibold text-3xl">
        Features & Amenities
      </h2>
      <div className="flex flex-col divide-y divide-stone-50 gap-4">
        {features.map((feature, i) => (
          <motion.div
            key={feature}
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              delay: 0.35 + i * 0.045,
              duration: 0.35,
              ease: "easeOut",
            }}
            className="bg-white rounded-xl border border-stone-200 shadow-xs flex items-center gap-3 py-5 px-3 text-stone-600 text-[13px] font-light"
          >
            <TbCircleFilled size={7} className="text-amber-400 shrink-0" />
            {feature}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
