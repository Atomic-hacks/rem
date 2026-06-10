import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default function BlogPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-[60vh] bg-[#FAF7F2] px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold text-stone-800">Blog</h1>
          <p className="mt-4 text-stone-600 leading-relaxed">
            Market guides, city spotlights, and property tips will live here.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
