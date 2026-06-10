import Image from "next/image";
import Link from "next/link";

export default function VerifyPage() {
  return (
    <main className="min-h-screen bg-[#3d3d3d] p-2 md:p-4 flex items-center justify-center">
      <div className="w-full max-w-[1450px] bg-white overflow-hidden">
        <div className="grid lg:grid-cols-2 min-h-[900px]">
          {/* LEFT PANEL */}
          <div className="relative">
            <Image
                          src="/villa1.jpg"
                          alt="Africa property"
                         fill
                         className="object-cover"
                         priority
                       />

            {/* Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-[#5a2207]/40 to-[#2f0c04]/80" />

            <div className="relative z-10 h-full flex flex-col justify-between p-10 text-white">
              {/* Logo */}
              <div>
                <span className="text-sm tracking-wide font-light">
                  realestatemarketplace
                  <span className="text-[#e0a525]">.africa</span>
                </span>
              </div>

              {/* Hero Text */}
              <div className="max-w-md">
                <p className="text-[#d9a126] text-xs uppercase tracking-[5px] mb-6">
                  Join the marketplace
                </p>

                <h1 className="text-[64px] leading-[1.05] font-light mb-6">
                  Your gateway to Africa&apos;s finest properties.
                </h1>

                <p className="text-white/75 leading-7">
                  Upload properties, manage listings, connect with buyers,
                  and track inquiries from one powerful platform.
                </p>
              </div>

              {/* Stats */}
              <div className="flex gap-16">
                <div>
                  <h3 className="text-[30px] font-light text-[#f0b124]">
                    12k+
                  </h3>
                  <p className="text-[11px] uppercase tracking-widest text-white/60">
                    Listings
                  </p>
                </div>

                <div>
                  <h3 className="text-[30px] font-light text-[#f0b124]">
                    850+
                  </h3>
                  <p className="text-[11px] uppercase tracking-widest text-white/60">
                    Monthly Viewers
                  </p>
                </div>

                <div>
                  <h3 className="text-[30px] font-light text-[#f0b124]">
                    38
                  </h3>
                  <p className="text-[11px] uppercase tracking-widest text-white/60">
                    Cities
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT PANEL */}
          <div className="bg-[#f8f5f0] flex items-center justify-center px-8">
            <div className="w-full max-w-[520px]">
              <h2 className="text-[58px] leading-none font-light text-[#d9a126] mb-6">
                Verify your number
              </h2>

              <p className="text-xs text-[#d9a126] mb-3">
                Enter OTP
              </p>

              {/* OTP Boxes */}
              <div className="flex gap-4 mb-10">
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <input
                    key={item}
                    type="text"
                    maxLength={1}
                    className="w-[72px] h-[72px] bg-white border border-[#e5dfd5] rounded outline-none text-center text-2xl shadow-sm focus:border-[#d9a126]"
                  />
                ))}
              </div>

              {/* Buttons */}
              <div className="flex gap-8">
                <button
                  type="button"
                  className="flex-1 h-[50px] rounded-xl border border-[#d9a126] text-[#d9a126] font-medium hover:bg-[#d9a126]/5 transition"
                >
                  Resend OTP
                </button>




                <Link href="/agent-Onboarding/proffessionalDetails"
    className="flex-1 h-[50px] rounded-xl bg-[#f0b124] text-black font-medium hover:bg-[#e0a525] transition flex items-center justify-center"
>
  Verify
</Link>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}