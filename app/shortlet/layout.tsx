import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import type { ReactNode } from "react";

export default function ShortletLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </>
  );
}
