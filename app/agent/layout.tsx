"use client";

import Sidebar from "@/components/agent-profile/Sidebar";
import { isAgentRole, getStoredAuthIntent } from "@/features/auth/auth-routing";
import {
  getCurrentUser,
  getStoredAccessToken,
  persistAuthUser,
  type UserByEmail,
} from "@/services";
import { useRouter } from "next/navigation";
import type { ReactNode } from "react";
import { useEffect, useState } from "react";

export default function AgentLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [agentName, setAgentName] = useState("Agent Portal");

  useEffect(() => {
    let mounted = true;
    const token = getStoredAccessToken();

    if (!token) {
      router.replace("/auth/login");
      return;
    }

    getCurrentUser(token)
      .then((user: UserByEmail) => {
        persistAuthUser(user);
        const intentIsAgent = getStoredAuthIntent() === "agent";

        if (!isAgentRole(user.role) && !intentIsAgent) {
          router.replace("/home");
          return;
        }

        if (mounted) {
          setAgentName(
            user.name ||
              [user.first_name_field, user.last_name_field]
                .filter(Boolean)
                .join(" ") ||
              "Agent Portal",
          );
          setAuthorized(true);
        }
      })
      .catch(() => {
        router.replace("/auth/login");
      })
      .finally(() => {
        if (mounted) {
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, [router]);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#f8f6f4] text-sm text-stone-500">
        Loading agent workspace...
      </div>
    );
  }

  if (!authorized) {
    return null;
  }

  return (
    <div className="flex min-h-screen bg-[#f8f6f4]">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-[72px] items-center justify-between border-b bg-white px-6">
          <div>
            <p className="text-xs font-medium uppercase text-amber-500">
              Agent Portal
            </p>
            <h1 className="text-base font-semibold text-stone-800">
              {agentName}
            </h1>
          </div>
        </header>
        <main className="min-w-0 flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
