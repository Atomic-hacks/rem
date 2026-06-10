import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default function PrivacyPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-[60vh] bg-[#FAF7F2] px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold text-stone-800">Privacy Policy</h1>
          <p className="mt-4 text-stone-600 leading-relaxed">
            REM uses account and listing information to provide marketplace, search, and communication features.
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
