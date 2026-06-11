"use client";

import { clearAuthSession } from "@/services";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LuLayoutDashboard as LayoutDashboard,
  LuChartBar as BarChart3,
  LuSettings as Settings,
  LuLogOut as LogOut,
  LuHouse as Home,
  LuInfo as Info,
  LuBuilding2 as Building,
} from "react-icons/lu";

const navItems = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/agent/dashboard",
  },
  {
    label: "Listings",
    icon: Building,
    href: "/agent/listings",
  },
  {
    label: "Home",
    icon: Home,
    href: "/home",
  },
  {
    label: "Analytics",
    icon: BarChart3,
    href: "/agent/analytics",
  },
  {
    label: "About",
    icon: Info,
    href: "/about",
  },
  {
    label: "Profile",
    icon: Settings,
    href: "/agent/profile",
  },
];

export default function Sidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const logout = () => {
    clearAuthSession();
    router.replace("/auth/login");
  };

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
        <button
          type="button"
          onClick={logout}
          className="w-full h-11 border rounded-lg flex items-center justify-center gap-2 text-sm hover:bg-gray-50"
        >
          <LogOut size={16} />
          Logout
        </button>
      </div>
    </aside>
  );
}
