
import Navbar from "@/components/layout/Navbar";
import type { ReactNode } from "react";

export default function AgentLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      
    </>
  );
}
