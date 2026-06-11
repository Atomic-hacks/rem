"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

const redirectByPath: Record<string, string> = {
  "/agent-profile": "/agent/dashboard",
  "/agent-profile/my-Listing": "/agent/listings",
  "/agent-profile/analytics": "/agent/analytics",
  "/agent-profile/settings": "/agent/profile",
  "/agent-profile/messages": "/agent/profile",
};

export default function AgentProfileLayout() {
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    router.replace(redirectByPath[pathname] ?? "/agent/dashboard");
  }, [pathname, router]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f8f6f4] text-sm text-stone-500">
      Redirecting to agent portal...
    </div>
  );
}
