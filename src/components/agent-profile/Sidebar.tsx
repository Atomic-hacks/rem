"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  MessageSquare,
  BarChart3,
  Settings,
  LogOut,
} from "lucide-react";

const navItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/agent-profile",
  },
  {
    label: "Messages",
    icon: MessageSquare,
    href: "/agent-profile/messages",
  },
  {
    label: "My Listings",
    icon: BarChart3,
    href: "/agent-profile/my-Listing",
  },
  {
    label: "Settings",
    icon: Settings,
    href: "/agent-profile/settings",
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-[240px] border-r bg-white flex flex-col">
      {/* Header */}
      <div className="h-[72px] flex items-center px-6 border-b">
        {/* ── Logo ── */}
        <a href="#" className="flex items-center gap-1 shrink-0">
          <img src="/logo.png" className="w-7 h-7" alt="logo" />
          <span className="font-semibold text-stone-800 text-[15px] tracking-tight whitespace-nowrap">
            Real Estate Marketplace
          </span>
        </a>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 py-6 space-y-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.label}
              href={item.href}
              className={`w-full h-12 rounded-lg flex items-center gap-3 px-4 text-sm transition ${
                isActive
                  ? "bg-yellow-400 text-black font-medium"
                  : "hover:bg-gray-100 text-gray-600"
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t">
        <button className="w-full h-11 border rounded-lg flex items-center justify-center gap-2 text-sm hover:bg-gray-50">
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </aside>
  );
}