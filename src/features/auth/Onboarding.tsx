"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import {
  FiSearch,
  FiHeart,
  FiPhone,
  FiUploadCloud,
  FiMessageSquare,
  FiAward,
} from "react-icons/fi";

const cards = [
  {
    iconSrc: "/profile.svg",
    iconAlt: "Buyer or renter",
    role: "I am a Buyer / Renter",
    tagline: "Browse and discover properties",
    description:
      "Find your perfect home or investment property across Africa. Browse thousands of listings, connect with verified agents, and make informed decisions.",
    features: [
      { icon: <FiSearch size={13} />, label: "Browse unlimited properties" },
      { icon: <FiHeart size={13} />, label: "Save favourites" },
      { icon: <FiPhone size={13} />, label: "Direct agent contact" },
    ],
    cta: "Sign up as a Buyer / Renter",
    href: "/sign-up",
  },
  {
    iconSrc: "/agent.svg",
    iconAlt: "Real estate agent",
    role: "I am an Agent",
    tagline: "List and manage properties",
    description:
      "Grow your real estate business. Upload properties, manage listings, connect with buyers, and track inquiries from one powerful platform.",
    features: [
      {
        icon: <FiUploadCloud size={13} />,
        label: "Upload unlimited properties",
      },
      { icon: <FiMessageSquare size={13} />, label: "Manage inquiries" },
      { icon: <FiAward size={13} />, label: "Build your profile" },
    ],
    cta: "Sign up as an Agent",
    href: "/sign-up",
  },
];

export default function WelcomePage() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-4 py-16">
      {/* Header */}
      <div className="flex flex-col items-center gap-3 mb-14 text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-stone-800 tracking-tight">
          Welcome to <span className="text-amber-400">REM</span>
        </h1>
        <p className="md:text-2xl font-semibold uppercase tracking-[0.2em] text-stone-700">
          Real Estate Marketplace Africa
        </p>
        <p className="md:text-xl text-stone-500 mt-1">
          Choose how you want to get started
        </p>
      </div>

      {/* Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 w-full max-w-4xl">
        {cards.map((card, i) => (
          <div
            key={card.role}
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}
            className="bg-white rounded-3xl p-8 flex flex-col gap-5 border border-stone-100 transition-all duration-300"
            style={{
              boxShadow:
                hoveredIndex === i
                  ? "0 24px 64px -12px rgba(217,119,6,0.18), 0 4px 16px -4px rgba(0,0,0,0.06)"
                  : "0 4px 24px -4px rgba(0,0,0,0.07)",
              transform:
                hoveredIndex === i ? "translateY(-4px)" : "translateY(0)",
            }}
          >
            {/* Icon */}
            <Image
              src={card.iconSrc}
              alt={card.iconAlt}
              width={56}
              height={56}
              unoptimized
              className="rounded-2xl"
            />

            {/* Header */}
            <div>
              <h2 className="text-[1.35rem] font-semibold text-stone-800 tracking-tight">
                {card.role}
              </h2>
              <p className="text-xs font-medium uppercase tracking-widest text-amber-500 mt-1">
                {card.tagline}
              </p>
            </div>

            {/* Description */}
            <p className="text-stone-500 text-[13.5px] font-light leading-relaxed">
              {card.description}
            </p>

            {/* Features */}
            <ul className="flex flex-col gap-2.5">
              {card.features.map((f) => (
                <li
                  key={f.label}
                  className="flex items-center gap-3 text-stone-500 text-[13.5px] font-light"
                >
                  <span className="text-amber-500 shrink-0 text-2xl leading-none">
                    •
                  </span>
                  {f.label}
                </li>
              ))}
            </ul>

            {/* CTA */}
            <Link
              href={card.href}
              className="mt-2 block w-full py-3.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-center text-white font-semibold text-sm tracking-wide transition-colors duration-200"
            >
              {card.cta}
            </Link>

            {/* Sign in */}
            <p className="text-center text-[12.5px] text-stone-400 font-light">
              Already have an account?{" "}
              <Link
                href="/sign-up"
                className="text-amber-500 hover:text-amber-600 font-medium transition-colors"
              >
                Sign In
              </Link>
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
