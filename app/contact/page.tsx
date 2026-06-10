import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

export default function ContactPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-[60vh] bg-[#FAF7F2] px-6 py-16">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-3xl font-bold text-stone-800">Contact</h1>
          <p className="mt-4 text-stone-600 leading-relaxed">
            Reach the REM team for listing support, agent onboarding, and marketplace inquiries.
          </p>
          <a className="mt-6 inline-flex text-amber-500 font-semibold" href="mailto:support@rem.africa">
            support@rem.africa
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}
