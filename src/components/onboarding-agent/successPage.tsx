import Image from "next/image";
import Link from "next/link";
import { FiCheck } from "react-icons/fi";

export default function AccountCreatedPage() {
  return (
    <main className="min-h-screen bg-[#F8F5F0]">
      <div className="grid min-h-screen lg:grid-cols-[51%_49%]">
        <section className="relative overflow-hidden">
          <Image
            src="/villa1.jpg"
            alt="Africa property"
            fill
            className="object-cover"
            priority
          />

          <div className="absolute inset-0 bg-[rgba(30,12,5,0.58)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(107,34,0,0.22)]" />

          <div className="relative flex h-full flex-col justify-between px-6 py-7 text-white">
            <div>
              <h3 className="text-[13px] tracking-wide">
                realestatemarketplace
                <span className="text-[#D79A21]">.africa</span>
              </h3>
            </div>

            <div className="max-w-[380px]">
              <p className="mb-5 text-[10px] uppercase tracking-[5px] text-[#D79A21]">
                Join The Marketplace
              </p>

              <h1 className="mb-5 text-[64px] font-light leading-[0.95] tracking-[-2px]">
                Your gateway to Africa&apos;s finest properties.
              </h1>

              <p className="max-w-[330px] text-[13px] leading-6 text-white/60">
                Save listings, chat with verified agents, book short-lets, and
                get alerts the moment new homes hit the market.
              </p>
            </div>

            <div className="flex gap-24 pb-3">
              <div>
                <h4 className="text-[28px] font-light text-[#D79A21]">
                  12k+
                </h4>
                <p className="text-[9px] uppercase tracking-[2px] text-white/40">
                  Listings
                </p>
              </div>

              <div>
                <h4 className="text-[28px] font-light text-[#D79A21]">
                  850+
                </h4>
                <p className="text-[9px] uppercase tracking-[2px] text-white/40">
                  Verified Agents
                </p>
              </div>

              <div>
                <h4 className="text-[28px] font-light text-[#D79A21]">38</h4>
                <p className="text-[9px] uppercase tracking-[2px] text-white/40">
                  Cities
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center bg-[#F8F5F0]">
          <div className="flex flex-col items-center px-6 text-center">
            <h2 className="mb-10 text-[28px] font-light text-[#D79A21]">
              Account Created Successfully
            </h2>

            <div className="relative flex h-28 w-28 items-center justify-center">
              <div
                className="absolute h-24 w-24 bg-[#D8C09A] opacity-60"
                style={{
                  clipPath:
                    "polygon(30% 0%,70% 0%,100% 30%,100% 70%,70% 100%,30% 100%,0% 70%,0% 30%)",
                }}
              />

              <FiCheck className="relative z-10 h-10 w-10 text-[#B8860B]" />
            </div>

            <p className="mt-8 max-w-sm text-sm leading-6 text-gray-500">
              Your verification has been submitted for admin review. Once
              approved, sign in to access the Agent Portal.
            </p>

            <Link
              href="/auth/login"
              className="mt-8 rounded-lg bg-[#D79A21] px-6 py-3 text-sm font-medium text-white"
            >
              Sign In
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
