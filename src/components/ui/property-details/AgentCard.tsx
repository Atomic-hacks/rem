"use client";

import type { ListingAgent } from "@/types";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import {
  FiMail,
  FiMessageSquare,
  FiPhone,
  FiPlus,
  FiStar,
} from "react-icons/fi";

export interface AgentCardProps {
  agent: ListingAgent;
}

export function AgentCard({ agent }: AgentCardProps) {
  const [messageOpen, setMessageOpen] = useState(false);
  const [message, setMessage] = useState("");

  return (
    <motion.div
      initial={{ opacity: 0, x: 24 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.25, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="flex flex-col gap-3 sticky top-20"
    >
      {/* Agent info + contact details — single card */}
      <div className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden">
        {/* Listing Agent section */}
        <div className="p-5 flex flex-col gap-4">
          <h3 className="text-stone-900 text-lg font-semibold uppercase tracking-wider">
            Listing Agent
          </h3>

          <div className="flex items-center gap-3">
            <div className="w-20 h-20 rounded-full bg-amber-100 flex items-center justify-center text-amber-600 font-bold text-sm shrink-0 border border-amber-200">
              {agent.initials}
            </div>
            <div className="flex flex-col gap-0.5">
              <p className="font-semibold text-stone-800 text-lg">
                {agent.name}
              </p>
              <p className="text-amber-500 text-sm font-medium">
                {agent.company}
              </p>
              <p className="text-amber-500 text-sm font-light">
                {agent.location}
              </p>
              <div className="flex items-center gap-1 mt-0.5">
                <FiStar size={11} className="text-amber-400 fill-amber-400" />
                <span className="text-stone-600 text-xs font-medium">
                  {agent.rating}
                </span>
                <span className="text-stone-400 text-[11px]">
                  ({agent.reviews} reviews)
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <a
              href={`tel:${agent.phone}`}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-stone-200 text-stone-800 text-xs font-medium hover:border-amber-400 hover:text-amber-500 transition-colors duration-250"
            >
              <FiPhone size={18} />
              Call
            </a>
            <a
              href={`mailto:${agent.email}`}
              className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg border border-stone-200 text-stone-800 text-xs font-medium hover:border-amber-400 hover:text-amber-500 transition-colors duration-250"
            >
              <FiMail size={18} />
              Email
            </a>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-stone-100" />

        {/* Contact Details section */}
        <div className="px-5 py-4 flex flex-col gap-3">
          <h4 className="text-stone-600 text-sm font-semibold uppercase tracking-wider">
            Contact Details
          </h4>
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center gap-2.5 text-stone-500 text-sm">
              <FiPhone size={20} className="text-amber-400 shrink-0" />
              <span>
                <p>Phone</p>
                {agent.phone}
              </span>
            </div>
            <div className="flex items-center gap-2.5 text-stone-500 text-sm">
              <FiMail size={20} className="text-amber-400 shrink-0" />
              <span className="truncate">
                <p>Email</p>
                {agent.email}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Message Agent — SEPARATE card */}
      <div className="bg-white rounded-2xl border border-stone-100 shadow-sm overflow-hidden">
        <div className="px-5 py-6">
          <button
            type="button"
            onClick={() => setMessageOpen((open) => !open)}
            className="w-full flex items-center justify-between text-stone-900 text-xs font-medium cursor-pointer py-1 hover:text-amber-500 transition-colors"
          >
            <span className="flex items-center gap-2">
              <FiMessageSquare size={25} className="text-stone-400" />
              Message Agent
            </span>
            <motion.span
              animate={{ rotate: messageOpen ? 45 : 0 }}
              transition={{ duration: 0.25 }}
            >
              <FiPlus size={14} className="text-amber-400" />
            </motion.span>
          </button>

          <AnimatePresence>
            {messageOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="overflow-hidden"
              >
                <div className="pt-3 flex flex-col gap-2">
                  <textarea
                    rows={3}
                    value={message}
                    onChange={(event) => setMessage(event.target.value)}
                    placeholder="Hi, I'm interested in this property..."
                    className="w-full text-xs px-3 py-2.5 rounded-xl border border-stone-200 text-stone-700 placeholder:text-stone-300 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 resize-none transition-all duration-200"
                  />
                  <button
                    type="button"
                    className="w-full py-2.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-white text-xs font-semibold transition-colors duration-200 cursor-pointer"
                  >
                    Send Message
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
