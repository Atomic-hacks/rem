"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const footerLinks = {
  Properties: [
    { label: "For Sale", href: "/userSale" },
    { label: "For Rent", href: "/userRent" },
    { label: "Short-Let", href: "/shortlet" },
  ],
  Company: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Blog", href: "/blog" },
  ],
  Legal: [
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ],
};

const socials = [
  {
    icon: <FaFacebookF size={14} />,
    href: "https://facebook.com",
    label: "Facebook",
  },
  {
    icon: <FaTwitter size={14} />,
    href: "https://twitter.com",
    label: "Twitter",
  },
  {
    icon: <FaLinkedinIn size={14} />,
    href: "https://linkedin.com",
    label: "LinkedIn",
  },
];

export default function Footer() {
  return (
    <footer className="bg-[#F5F2EC] border-t-4 border-amber-400">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col gap-3"
          >
            <div className="flex items-center gap-2">
              <Image
                src="/logo.png"
                width={32}
                height={32}
                className="w-8 h-8"
                alt="logo"
              />
              <span className="font-semibold text-stone-800 text-sm leading-tight">
                Real Estate Marketplace
              </span>
            </div>
            <p className="text-stone-500 text-xs font-light leading-relaxed max-w-[200px]">
              Your trusted platform for buying, selling, and renting properties
              across Africa.
            </p>
          </motion.div>

          {Object.entries(footerLinks).map(([heading, links], i) => (
            <motion.div
              key={heading}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.5,
                delay: (i + 1) * 0.08,
                ease: "easeOut",
              }}
              className="flex flex-col gap-3"
            >
              <h4 className="text-stone-800 text-sm font-semibold">
                {heading}
              </h4>
              <ul className="flex flex-col gap-2">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-stone-500 text-xs font-light hover:text-amber-500 transition-colors duration-150"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 mb-6 h-px bg-stone-200" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-stone-400 text-xs font-light">
            © 2026 Real Estate Marketplace Africa. All rights reserved.
          </p>

          <div className="flex items-center gap-2">
            {socials.map((s) => (
              <motion.a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                whileHover={{ scale: 1.12 }}
                whileTap={{ scale: 0.93 }}
                className="w-8 h-8 flex items-center justify-center rounded-full border border-stone-200 bg-white text-stone-500 hover:border-amber-400 hover:text-amber-500 transition-colors duration-150"
              >
                {s.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
