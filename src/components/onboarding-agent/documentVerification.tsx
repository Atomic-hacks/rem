"use client";

import {
  clearAgentOnboardingToken,
  getStoredAccessToken,
  getStoredAgentOnboardingToken,
  submitAgentDocumentVerification,
} from "@/services";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useRef, useState } from "react";

export default function DocumentVerificationPage() {
  const router = useRouter();
  const licenseInputRef = useRef<HTMLInputElement>(null);
  const photoInputRef = useRef<HTMLInputElement>(null);
  const [token, setToken] = useState("");
  const [licenseDocument, setLicenseDocument] = useState<File | undefined>();
  const [profilePicture, setProfilePicture] = useState<File | undefined>();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedToken = getStoredAgentOnboardingToken();
    setToken(storedToken);
    if (!storedToken) {
      setError("Please complete the previous onboarding steps first.");
    }
  }, []);

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!token) {
      setError("Missing onboarding token. Please start agent signup again.");
      return;
    }

    try {
      setLoading(true);
      await submitAgentDocumentVerification({
        onboardingToken: token,
        licenseDocument,
        profilePicture,
      });
      clearAgentOnboardingToken();
      router.push(getStoredAccessToken() ? "/agent/dashboard" : "/auth/login");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to submit verification documents.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F8F5F0]">
      <div className="grid min-h-screen lg:grid-cols-[52%_48%]">
        <section className="relative overflow-hidden">
          <Image
            src="/villa1.jpg"
            alt="Africa property"
            fill
            className="object-cover"
            priority
          />

          <div className="absolute inset-0 bg-[rgba(34,12,5,0.55)]" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[rgba(82,27,0,0.35)]" />

          <div className="relative flex h-full flex-col justify-between px-7 py-8 text-white">
            <div>
              <h3 className="text-[13px] font-medium tracking-wide">
                realestatemarketplace
                <span className="text-[#F4A91C]">.africa</span>
              </h3>
            </div>

            <div className="max-w-[420px]">
              <p className="mb-6 text-[11px] uppercase tracking-[4px] text-[#F4A91C]">
                Join The Marketplace
              </p>

              <h1 className="mb-6 text-[62px] font-light leading-[0.95] tracking-[-2px]">
                Your gateway to Africa&apos;s finest properties.
              </h1>

              <p className="max-w-[360px] text-[14px] leading-6 text-white/75">
                Save listings, chat with verified agents, book short-lets, and
                get alerts the moment new homes hit the market.
              </p>
            </div>

            <div className="flex gap-24 pb-3">
              <div>
                <div className="text-[28px] font-light text-[#F4A91C]">
                  12k+
                </div>
                <div className="text-[10px] uppercase tracking-widest text-white/50">
                  Listings
                </div>
              </div>

              <div>
                <div className="text-[28px] font-light text-[#F4A91C]">
                  850+
                </div>
                <div className="text-[10px] uppercase tracking-widest text-white/50">
                  Verified Agents
                </div>
              </div>

              <div>
                <div className="text-[28px] font-light text-[#F4A91C]">
                  38
                </div>
                <div className="text-[10px] uppercase tracking-widest text-white/50">
                  Cities
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="flex items-center justify-center bg-[#F8F5F0] px-8">
          <div className="w-full max-w-[500px]">
            <p className="mb-4 text-[11px] uppercase tracking-[4px] text-[#F4A91C]">
              Join The Marketplace
            </p>

            <h2 className="mb-2 text-[56px] font-light leading-none text-[#F4A91C]">
              Document verification
            </h2>

            <p className="mb-10 text-[14px] text-[#777]">
              Complete your profile to start listing properties
            </p>

            {error && (
              <p className="mb-4 rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-600">
                {error}
              </p>
            )}

            <form onSubmit={submit}>
              <div className="mb-4 rounded-lg border border-dashed border-[#F4A91C]/40 p-4">
                <div className="flex items-start justify-between">
                  <div className="flex gap-3">
                    <div className="mt-1 text-[#F4A91C]">ID</div>

                    <div>
                      <h4 className="text-[13px] font-medium text-[#F4A91C]">
                        Government-issued ID
                      </h4>

                      <p className="text-[11px] text-gray-500">
                        Passport, Driver&apos;s License, NIN
                      </p>
                    </div>
                  </div>

                  <div className="text-green-500 text-lg">
                    {licenseDocument ? "✓" : ""}
                  </div>
                </div>

                <input
                  ref={licenseInputRef}
                  type="file"
                  accept="image/*,.pdf"
                  onChange={(event) => setLicenseDocument(event.target.files?.[0])}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => licenseInputRef.current?.click()}
                  className="mt-3 flex h-10 w-full items-center justify-center rounded-md border border-[#E8DED1] bg-[#F8F5F0] text-[12px] text-gray-500"
                >
                  {licenseDocument ? licenseDocument.name : "Upload your ID"}
                </button>
              </div>

              <div className="mb-5 rounded-lg border border-dashed border-[#F4A91C]/40 p-4">
                <div className="flex items-start justify-between">
                  <div className="flex gap-3">
                    <div className="mt-1 text-[#F4A91C]">Photo</div>

                    <div>
                      <h4 className="text-[13px] font-medium text-[#F4A91C]">
                        Photo
                      </h4>

                      <p className="text-[11px] text-gray-500">
                        Clear photo of your face
                      </p>
                    </div>
                  </div>

                  <div className="text-green-500 text-lg">
                    {profilePicture ? "✓" : ""}
                  </div>
                </div>

                <input
                  ref={photoInputRef}
                  type="file"
                  accept="image/*"
                  onChange={(event) => setProfilePicture(event.target.files?.[0])}
                  className="hidden"
                />
                <button
                  type="button"
                  onClick={() => photoInputRef.current?.click()}
                  className="mt-3 flex h-10 w-full items-center justify-center rounded-md border border-[#E8DED1] bg-[#F8F5F0] text-[12px] text-gray-500"
                >
                  {profilePicture ? profilePicture.name : "Upload your photo"}
                </button>
              </div>

              <div className="mb-6 rounded-lg border border-blue-400 bg-blue-50 p-3">
                <p className="text-[12px] leading-5 text-blue-600">
                  Privacy: Your documents are encrypted and stored securely.
                  They are never shared without your consent.
                </p>
              </div>

              <div className="flex gap-3">
                <Link
                  href="/agent-Onboarding/proffessionalDetails"
                  className="h-11 flex-1 rounded-lg border border-[#F4A91C] text-sm text-[#F4A91C] transition hover:bg-[#F4A91C]/5 flex items-center justify-center"
                >
                  Back
                </Link>

                <button
                  type="submit"
                  disabled={loading || !token}
                  className="h-11 flex-[1.2] rounded-lg bg-[#F4A91C] text-sm font-medium text-black transition hover:brightness-95 flex items-center justify-center disabled:opacity-60"
                >
                  {loading ? "Submitting..." : "Next: Create Account"}
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}
