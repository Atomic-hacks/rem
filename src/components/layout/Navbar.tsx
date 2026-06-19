"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  FiChevronDown,
  FiLogOut,
  FiMenu,
  FiUser,
  FiX,
} from "react-icons/fi";
import { clearAuthSession, getStoredAccessToken } from "@/services";

const navLinks = [{ label: "Home", href: "/" }];

const propertyLinks = [
  { label: "For Sale", href: "/userSale" },
  { label: "For Rent", href: "/userRent" },
  { label: "Short-Let", href: "/shortlet" },
  { label: "Hotel", href: "/hotel" },
];

const trailingLinks = [
  { label: "Agents", href: "/agents" },
  { label: "About", href: "/about" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [propertiesOpen, setPropertiesOpen] = useState(false);
  const [mobilePropertiesOpen, setMobilePropertiesOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close the desktop dropdown when clicking outside of it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setPropertiesOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Reset open menus whenever the route changes
  useEffect(() => {
    setMenuOpen(false);
    setPropertiesOpen(false);
    setMobilePropertiesOpen(false);
  }, [pathname]);

  const logout = () => {
    clearAuthSession();
    setMenuOpen(false);
    router.replace("/home");
  };

  const authenticated = Boolean(getStoredAccessToken());

  const isActive = (href: string) =>
    href === "/"
      ? pathname === "/" || pathname === "/home"
      : pathname.startsWith(href);

  const isPropertiesActive = propertyLinks.some((link) =>
    isActive(link.href)
  );

  return (
    <motion.nav
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="w-full bg-white border-b border-stone-100 shadow-sm sticky top-0 z-50"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <Image
            src="/logo.png"
            width={32}
            height={32}
            className="w-8 h-8"
            alt="logo"
          />
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
                isActive(link.href)
                  ? "text-amber-500"
                  : "text-stone-500 hover:text-stone-800"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* Properties dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              onClick={() => setPropertiesOpen((open) => !open)}
              aria-haspopup="true"
              aria-expanded={propertiesOpen}
              className={`relative inline-flex items-center gap-1 px-4 py-1.5 text-sm font-medium transition-colors duration-150 cursor-pointer rounded-md ${
                isPropertiesActive || propertiesOpen
                  ? "text-amber-500"
                  : "text-stone-500 hover:text-stone-800"
              }`}
            >
              Properties
              <FiChevronDown
                size={14}
                className={`transition-transform duration-200 ${
                  propertiesOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence>
              {propertiesOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.18, ease: "easeOut" }}
                  className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-48 bg-white border border-stone-100 rounded-xl shadow-lg py-2 z-50"
                >
                  {propertyLinks.map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setPropertiesOpen(false)}
                      className={`block px-4 py-2 text-sm font-medium transition-colors duration-150 cursor-pointer ${
                        isActive(link.href)
                          ? "text-amber-500 bg-amber-50"
                          : "text-stone-600 hover:bg-stone-50 hover:text-stone-900"
                      }`}
                    >
                      {link.label}
                    </Link>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {trailingLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className={`relative px-4 py-1.5 text-sm font-medium transition-colors duration-150 cursor-pointer rounded-md ${
                isActive(link.href)
                  ? "text-amber-500"
                  : "text-stone-500 hover:text-stone-800"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3 shrink-0">
          {authenticated ? (
            <>
              <Link
                href="/profile"
                className="inline-flex items-center gap-2 text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors duration-150 px-2"
              >
                <FiUser size={15} />
                Profile
              </Link>
              <button
                type="button"
                onClick={logout}
                className="inline-flex items-center gap-2 text-sm font-semibold text-white bg-amber-400 hover:bg-amber-500 transition-colors duration-150 px-4 py-2 rounded-lg shadow-sm"
              >
                <FiLogOut size={15} />
                Logout
              </button>
            </>
          ) : (
            <>
              <motion.a
                href="/auth/login"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="text-sm font-medium text-stone-600 hover:text-stone-900 transition-colors duration-150 px-2"
              >
                Login
              </motion.a>
              <motion.a
                href="/auth/register"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="text-sm font-semibold text-white bg-amber-400 hover:bg-amber-500 transition-colors duration-150 px-5 py-2 rounded-lg shadow-sm"
              >
                Sign Up
              </motion.a>
            </>
          )}
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
                isActive(link.href)
                  ? "text-amber-500 bg-amber-50"
                  : "text-stone-600 hover:bg-stone-50"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {/* Properties accordion */}
          <button
            type="button"
            onClick={() => setMobilePropertiesOpen((open) => !open)}
            aria-expanded={mobilePropertiesOpen}
            className={`flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 cursor-pointer ${
              isPropertiesActive
                ? "text-amber-500 bg-amber-50"
                : "text-stone-600 hover:bg-stone-50"
            }`}
          >
            Properties
            <FiChevronDown
              size={16}
              className={`transition-transform duration-200 ${
                mobilePropertiesOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          <AnimatePresence initial={false}>
            {mobilePropertiesOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="flex flex-col gap-1 pl-3 overflow-hidden"
              >
                {propertyLinks.map((link) => (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-150 cursor-pointer ${
                      isActive(link.href)
                        ? "text-amber-500 bg-amber-50"
                        : "text-stone-500 hover:bg-stone-50"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {trailingLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`text-left px-3 py-2.5 rounded-lg text-sm font-medium transition-colors duration-150 cursor-pointer ${
                isActive(link.href)
                  ? "text-amber-500 bg-amber-50"
                  : "text-stone-600 hover:bg-stone-50"
              }`}
            >
              {link.label}
            </Link>
          ))}

          {authenticated ? (
            <div className="flex gap-3 mt-2 pt-3 border-t border-stone-100">
              <Link
                href="/profile"
                onClick={() => setMenuOpen(false)}
                className="flex-1 inline-flex items-center justify-center gap-2 text-sm font-medium text-stone-600 border border-stone-200 rounded-lg py-2.5 hover:bg-stone-50 transition-colors"
              >
                <FiUser size={15} />
                Profile
              </Link>
              <button
                type="button"
                onClick={logout}
                className="flex-1 inline-flex items-center justify-center gap-2 text-sm font-semibold text-white bg-amber-400 hover:bg-amber-500 rounded-lg py-2.5 transition-colors"
              >
                <FiLogOut size={15} />
                Logout
              </button>
            </div>
          ) : (
            <div className="flex gap-3 mt-2 pt-3 border-t border-stone-100">
              <Link
                href="/auth/login"
                className="flex-1 text-center text-sm font-medium text-stone-600 border border-stone-200 rounded-lg py-2.5 hover:bg-stone-50 transition-colors"
              >
                Login
              </Link>
              <Link
                href="/auth/register"
                className="flex-1 text-center text-sm font-semibold text-white bg-amber-400 hover:bg-amber-500 rounded-lg py-2.5 transition-colors"
              >
                Sign Up
              </Link>
            </div>
          )}
        </motion.div>
      )}
    </motion.nav>
  );
}
