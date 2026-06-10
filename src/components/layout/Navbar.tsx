"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "For Sale", href: "/userSale" },
  { label: "For Rent", href: "/userRent" },
  { label: "Short-Let", href: "/shortlet" },
  { label: "Agent", href: "/agent" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" || pathname === "/home" : pathname.startsWith(href);

  return (
    <motion.nav
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="w-full bg-white border-b border-stone-100 shadow-sm sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image src="/logo.png" width={32} height={32} className="w-8 h-8" alt="logo" />
          <span className="font-semibold text-stone-800 text-[15px] tracking-tight whitespace-nowrap">
            Real Estate Marketplace
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-1 flex-1 justify-center">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`relative px-4 py-1.5 text-sm font-medium transition-colors duration-150 cursor-pointer rounded-md ${
                isActive(link.href) ? "text-amber-500" : "text-stone-500 hover:text-stone-800"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3 shrink-0">
          <motion.a
            href="/sign-in"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors duration-150 px-2"
          >
            Login
          </motion.a>
          <motion.a
            href="/sign-up/onboarding"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="text-sm font-semibold text-white bg-amber-400 hover:bg-amber-500 transition-colors duration-150 px-5 py-2 rounded-lg shadow-sm"
          >
            Sign Up
          </motion.a>
        </div>

        <button
          onClick={() => setMenuOpen((open) => !open)}
          className="md:hidden text-stone-600 hover:text-stone-900 transition-colors cursor-pointer"
          aria-label="Toggle menu"
        >
          {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
      </div>

      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="md:hidden border-t border-stone-100 bg-white px-4 pb-4 flex flex-col gap-1"
        >
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 cursor-pointer ${
                isActive(link.href) ? "text-amber-500 bg-amber-50" : "text-stone-600 hover:bg-stone-50"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex gap-3 mt-2 pt-3 border-t border-stone-100">
            <Link
              href="/sign-in"
              className="flex-1 text-center text-sm font-medium text-stone-600 border border-stone-200 rounded-lg py-2.5 hover:bg-stone-50 transition-colors"
            >
              Login
            </Link>
            <Link
              href="/sign-up/onboarding"
              className="flex-1 text-center text-sm font-semibold text-white bg-amber-400 hover:bg-amber-500 rounded-lg py-2.5 transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
