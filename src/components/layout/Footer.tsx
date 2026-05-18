"use client";

import { motion } from "framer-motion";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";

const footerLinks = {
  Properties: ["For Sale", "For Rent", "Short-Let"],
  Company: ["About Us", "Contact", "Blog"],
  Legal: ["Privacy Policy", "Terms of Service"],
};

const socials = [
  { icon: <FaFacebookF size={14} />, href: "#", label: "Facebook" },
  { icon: <FaTwitter size={14} />, href: "#", label: "Twitter" },
  { icon: <FaLinkedinIn size={14} />, href: "#", label: "LinkedIn" },
];

export default function Footer() {
  return (
    <footer className="bg-[#F5F2EC] border-t-4 border-amber-400">
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
        {/* Top row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col gap-3"
          >
            <div className="flex items-center gap-2">
              <img src="/logo.png" className="w-8 h-8" alt="logo" />
              <span className="font-semibold text-stone-800 text-sm leading-tight">
                Real Estate Marketplace
              </span>
            </div>
            <p className="text-stone-500 text-xs font-light leading-relaxed max-w-[200px]">
              Your trusted platform for buying, selling, and renting properties
              across Africa.
            </p>
          </motion.div>

          {/* Link columns */}
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
                  <li key={link}>
                    <a
                      href="#"
                      className="text-stone-500 text-xs font-light hover:text-amber-500 transition-colors duration-150"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Divider */}
        <div className="mt-10 mb-6 h-px bg-stone-200" />

        {/* Bottom row */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-stone-400 text-xs font-light">
            © 2024 Real Estate Marketplace Africa. All rights reserved.
          </p>

          {/* Social icons */}
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
