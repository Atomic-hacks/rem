import Link from "next/link";
import { FiBriefcase, FiUser } from "react-icons/fi";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#3b3b3b] flex items-center justify-center py-2">
      <div className="w-full max-w-[1400px] bg-[#f5f2ed] min-h-[850px]">
        <div className="max-w-5xl mx-auto pt-20">
          <div className="text-center mb-14">
            <h1 className="text-[52px] font-medium text-[#111] mb-3">
              Welcome to REM
            </h1>

            <p className="text-[18px] text-[#555] mb-2">
              Real Estate Marketplace Africa
            </p>

            <p className="text-[18px] text-[#444]">
              Choose how you want to get started
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            <div className="bg-white border border-[#e8e2d8] rounded-lg p-8 shadow-sm">
              <div className="w-16 h-16 rounded-full bg-[#f5dd8b] flex items-center justify-center mb-8">
                <FiUser size={30} className="text-[#e5a918]" />
              </div>

              <h2 className="text-[32px] font-medium text-[#111] mb-4">
                I am a Buyer/Renter
              </h2>

              <p className="text-[#666] mb-2 text-sm">
                Browse and discover properties
              </p>

              <p className="text-[#666] leading-7 mb-8">
                Find your perfect home or investment property across Africa.
                Browse thousands of listings, connect with verified agents, and
                make informed decisions.
              </p>

              <ul className="space-y-4 mb-10">
                <li className="flex items-center gap-3 text-[#555]">
                  <span className="text-[#e5a918]">•</span>
                  Browse unlimited properties
                </li>
                <li className="flex items-center gap-3 text-[#555]">
                  <span className="text-[#e5a918]">•</span>
                  Save favorites
                </li>
                <li className="flex items-center gap-3 text-[#555]">
                  <span className="text-[#e5a918]">•</span>
                  Direct agent contact
                </li>
              </ul>

              <Link
                href="/auth/register"
                className="flex w-full h-14 items-center justify-center rounded-lg bg-[#f3b220] hover:bg-[#e2a417] transition text-black font-medium"
              >
                Sign up as a Buyer/Renter
              </Link>

              <p className="text-center text-sm text-[#777] mt-5">
                Already have an account?{" "}
                <Link href="/auth/login" className="text-[#f3b220] cursor-pointer">
                  Sign In
                </Link>
              </p>
            </div>

            <div className="bg-white border border-[#e8e2d8] rounded-lg p-8 shadow-sm">
              <div className="w-16 h-16 rounded-full bg-[#f5dd8b] flex items-center justify-center mb-8">
                <FiBriefcase size={30} className="text-[#e5a918]" />
              </div>

              <h2 className="text-[32px] font-medium text-[#111] mb-4">
                I am an agent
              </h2>

              <p className="text-[#666] mb-2 text-sm">
                List and manage properties
              </p>

              <p className="text-[#666] leading-7 mb-8">
                Grow your real estate business. Upload properties, manage
                listings, connect with buyers, and track inquiries from one
                powerful platform.
              </p>

              <ul className="space-y-4 mb-10">
                <li className="flex items-center gap-3 text-[#555]">
                  <span className="text-[#e5a918]">•</span>
                  Upload unlimited properties
                </li>
                <li className="flex items-center gap-3 text-[#555]">
                  <span className="text-[#e5a918]">•</span>
                  Manage inquiries
                </li>
                <li className="flex items-center gap-3 text-[#555]">
                  <span className="text-[#e5a918]">•</span>
                  Build your profile
                </li>
              </ul>

              <Link
                href="/agent-Onboarding/sign-up"
                className="flex w-full h-14 items-center justify-center rounded-lg bg-[#f3b220] hover:bg-[#e2a417] transition text-black font-medium"
              >
                Sign up as an Agent
              </Link>

              <p className="text-center text-sm text-[#777] mt-5">
                Already have an account?{" "}
                <Link href="/auth/login" className="text-[#f3b220] cursor-pointer">
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
