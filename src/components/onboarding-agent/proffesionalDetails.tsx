import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f8f5f0]">
      <div className="grid min-h-screen lg:grid-cols-[52%_48%]">
        {/* LEFT SIDE */}
        <section className="relative overflow-hidden">
           <Image
                                   src="/villa1.jpg"
                                   alt="Africa property"
                                  fill
                                  className="object-cover"
                                  priority
                                />

          <div className="hero-overlay absolute inset-0" />

          <div className="relative flex h-full flex-col justify-between px-10 py-8 text-white lg:px-14">
            {/* LOGO */}
            <div>
              <h3 className="text-sm tracking-wide">
                realestatemarketplace
                <span className="text-[#F3A61D]">.africa</span>
              </h3>
            </div>

            {/* HERO CONTENT */}
            <div className="max-w-md">
              <p className="mb-6 text-xs uppercase tracking-[4px] text-[#F3A61D]">
                Join The Marketplace
              </p>

              <h1 className="mb-6 text-5xl font-light leading-[1.05]">
                Your gateway to Africa&apos;s finest properties.
              </h1>

              <p className="max-w-sm text-sm text-white/85 leading-relaxed">
                Upload properties, manage listings, connect with buyers and
                track inquiries from one powerful platform.
              </p>
            </div>

            {/* STATS */}
            <div className="flex gap-16 pb-4">
              <div>
                <h4 className="text-2xl font-light text-[#F3A61D]">12k+</h4>
                <p className="mt-1 text-[10px] uppercase tracking-widest text-white/70">
                  Listings
                </p>
              </div>

              <div>
                <h4 className="text-2xl font-light text-[#F3A61D]">850+</h4>
                <p className="mt-1 text-[10px] uppercase tracking-widest text-white/70">
                  Verified Agents
                </p>
              </div>

              <div>
                <h4 className="text-2xl font-light text-[#F3A61D]">38</h4>
                <p className="mt-1 text-[10px] uppercase tracking-widest text-white/70">
                  Cities
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* RIGHT SIDE */}
        <section className="flex items-center justify-center bg-[#f8f5f0] px-8 py-10">
          <div className="w-full max-w-md">
            <p className="mb-4 text-[11px] uppercase tracking-[3px] text-[#F3A61D]">
              Join The Marketplace
            </p>

            <h2 className="mb-2 text-5xl font-light text-[#F3A61D]">
              Professional details
            </h2>

            <p className="mb-10 text-sm text-gray-500">
              Complete profile to list properties
            </p>

            <form className="space-y-5">
              {/* AGENT TYPE */}
              <div>
                <label className="mb-2 block text-xs text-[#F3A61D]">
                  Agent type
                </label>

                <select className="h-11 w-full rounded-lg border border-[#E8E1D9] bg-transparent px-4 text-sm text-gray-600">
                  <option>Individual agent</option>
                  <option>Agency</option>
                  <option>Broker</option>
                </select>
              </div>

              {/* OFFICE ADDRESS */}
              <div>
                <label className="mb-2 block text-xs text-[#F3A61D]">
                  Office address
                </label>

                <input
                  type="text"
                  placeholder="#"
                  className="h-11 w-full rounded-lg border border-[#E8E1D9] bg-transparent px-4 text-sm"
                />
              </div>

              {/* EXPERIENCE + LICENSE */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-xs text-[#F3A61D]">
                    Years of experience
                  </label>

                  <input
                    type="number"
                    placeholder="0"
                    className="h-11 w-full rounded-lg border border-[#E8E1D9] px-4 text-sm"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-xs text-[#F3A61D]">
                    License number
                  </label>

                  <input
                    type="text"
                    placeholder="#"
                    className="h-11 w-full rounded-lg border border-[#E8E1D9] px-4 text-sm"
                  />
                </div>
              </div>

              {/* AREA */}
              <div>
                <label className="mb-2 block text-xs text-[#F3A61D]">
                  Areas of operation
                </label>

                <input
                  type="text"
                  placeholder="e.g. Lagos, Abuja, Rivers"
                  className="h-11 w-full rounded-lg border border-[#E8E1D9] px-4 text-sm"
                />
              </div>

              {/* BUTTONS */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  className="h-11 flex-1 rounded-lg border border-[#F3A61D] text-sm text-[#F3A61D] transition hover:bg-[#F3A61D]/5"
                >
                  Back
                </button>

               
                       <Link
    href="/agent-Onboarding/documentVerification"
    className="h-11 flex-1 rounded-lg bg-[#F3A61D] text-sm font-medium text-black transition hover:brightness-95 flex items-center justify-center"
  >
    Next
  </Link>
              </div>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}