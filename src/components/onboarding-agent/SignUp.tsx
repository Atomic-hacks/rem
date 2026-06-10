import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#2d2d2d] flex items-center justify-center p-4">
      <div className="w-full max-w-7xl bg-white overflow-hidden shadow-2xl">
        <div className="grid lg:grid-cols-2 min-h-[900px]">
          {/* LEFT SIDE */}
          <div className="relative">
             <Image
               src="/villa1.jpg"
               alt="Africa property"
              fill
              className="object-cover"
              priority
            />

            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-[#6d2400]/60" />

            <div className="relative z-10 h-full flex flex-col justify-between p-10 text-white">
              <div>
                <span className="text-sm tracking-wide font-light">
                  realestatemarketplace
                  <span className="text-[#d7a62f]"> africa</span>
                </span>
              </div>

              <div className="max-w-md">
                <p className="text-[#d7a62f] uppercase tracking-[4px] text-xs mb-6">
                  Join the marketplace
                </p>

                <h1 className="text-6xl leading-[1.05] font-light mb-6">
                  Your gateway to Africa&apos;s finest properties.
                </h1>

                <p className="text-white/80 text-sm leading-6">
                  Upload properties, manage listings, connect with buyers,
                  and track inquiries from one powerful platform.
                </p>
              </div>

              <div className="flex gap-16 text-white">
                <div>
                  <h3 className="text-3xl font-light">12k+</h3>
                  <p className="text-xs tracking-widest uppercase text-white/70">
                    Listings
                  </p>
                </div>

                <div>
                  <h3 className="text-3xl font-light">850+</h3>
                  <p className="text-xs tracking-widest uppercase text-white/70">
                    Monthly Viewers
                  </p>
                </div>

                <div>
                  <h3 className="text-3xl font-light">38</h3>
                  <p className="text-xs tracking-widest uppercase text-white/70">
                    Cities
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="bg-[#f9f7f4] flex items-center justify-center px-12 py-16">
            <div className="w-full max-w-md">
              <p className="uppercase text-[11px] tracking-[4px] text-[#d7a62f] mb-4">
                Join the marketplace
              </p>

              <h2 className="text-[52px] leading-[1.05] text-[#d7a62f] font-light mb-4">
                Create your free account
              </h2>

              <p className="text-gray-500 text-sm mb-8">
                Sign up to start listing properties
              </p>

              {/* Toggle */}
              <div className="flex rounded-lg overflow-hidden border border-[#e8dfcf] mb-6">
                <button className="flex-1 bg-[#f5efe4] py-3 text-sm">
                  I&apos;m looking for a home
                </button>

                <button className="flex-1 bg-[#e8ab1b] text-white py-3 text-sm">
                  I&apos;m an agent / landlord
                </button>
              </div>

              {/* Google */}
              <button className="w-full border border-[#e8dfcf] rounded-lg py-3 text-sm text-gray-600 mb-6">
                G&nbsp; Google
              </button>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="text-xs text-gray-500 mb-2 block">
                    First Name
                  </label>
                  <input
                    type="text"
                    placeholder="John"
                    className="w-full border border-[#e8dfcf] rounded-md px-4 py-3 outline-none bg-white"
                  />
                </div>

                <div>
                  <label className="text-xs text-gray-500 mb-2 block">
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder="D. Lex"
                    className="w-full border border-[#e8dfcf] rounded-md px-4 py-3 outline-none bg-white"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="text-xs text-gray-500 mb-2 block">
                  Phone Number
                </label>

                <div className="flex gap-2">
                  <div className="w-24 border border-[#e8dfcf] rounded-md px-3 flex items-center bg-white">
                    🇳🇬 +234
                  </div>

                  <input
                    type="text"
                    placeholder="88 234 567"
                    className="flex-1 border border-[#e8dfcf] rounded-md px-4 py-3 outline-none bg-white"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="text-xs text-gray-500 mb-2 block">
                  Email Address
                </label>

                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full border border-[#e8dfcf] rounded-md px-4 py-3 outline-none bg-white"
                />
              </div>

              <div className="mb-4">
                <label className="text-xs text-gray-500 mb-2 block">
                  Gender
                </label>

                <select className="w-full border border-[#e8dfcf] rounded-md px-4 py-3 outline-none bg-white">
                  <option>Select...</option>
                  <option>Male</option>
                  <option>Female</option>
                </select>
              </div>

              <div className="mb-8">
                <label className="text-xs text-gray-500 mb-2 block">
                  Date of Birth
                </label>

                <input
                  type="date"
                  className="w-full border border-[#e8dfcf] rounded-md px-4 py-3 outline-none bg-white"
                />
              </div>

              <Link href="/agent-Onboarding/phone">
                <button className="w-full bg-[#e8ab1b] hover:bg-[#d39a18] transition rounded-xl py-4 text-white font-medium">
                  Send OTP
                </button>
              </Link>

              <p className="text-center text-sm text-gray-500 mt-4">
                Already have an account?{" "}
                <span className="text-[#d7a62f] cursor-pointer">
                  Sign In
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}