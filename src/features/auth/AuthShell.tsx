"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import type { ReactNode } from "react";

export default function AuthShell({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-screen flex bg-[#FAF7F2]">
      <section className="hidden md:flex relative w-[52%] min-h-screen flex-col overflow-hidden">
        <Image
          src="/villa1.jpg"
          alt="Africa property"
          fill
          priority
          sizes="52vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/30 to-black/65" />

        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="relative z-10 px-8 pt-8"
        >
          <span className="text-white text-sm font-light tracking-wide">
            realestatemarket place.
            <span className="text-amber-400 font-semibold">africa</span>
          </span>
        </motion.div>

        <div className="relative z-10 flex flex-1 flex-col items-center justify-center px-10 py-12 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="text-xs font-semibold uppercase tracking-[0.22em] text-amber-300 drop-shadow-sm"
          >
            Join the Marketplace
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: 0.3,
              duration: 0.65,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="mt-5 text-4xl lg:text-6xl font-bold text-white leading-tight drop-shadow-[0_3px_18px_rgba(0,0,0,0.35)]"
          >
            Your gateway to
            <br />
            Africa&apos;s finest
            <br />
            properties.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.6 }}
            className="mt-6 max-w-sm text-white/85 text-sm font-light leading-relaxed drop-shadow-sm"
          >
            Save listings, chat with verified agents, book short-lets, and get
            alerts the moment new homes hit the market.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="relative z-10 grid w-full grid-cols-3 gap-4 px-8 pb-10 text-center"
        >
          {[
            { value: "12k+", label: "Listings" },
            { value: "850+", label: "Verified Agents" },
            { value: "38", label: "Cities" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1">
              <span className="text-2xl font-bold text-amber-300 drop-shadow-sm">
                {stat.value}
              </span>
              <span className="text-[11px] uppercase tracking-widest text-white/75 font-light">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>
      </section>

      <section className="flex-1 flex items-center justify-center px-6 py-12">
        {children}
      </section>
    </main>
  );
}
