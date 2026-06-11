"use client";

import {
  getStoredAgentOnboardingToken,
  updateAgentProfessionalDetails,
} from "@/services";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";

export default function Home() {
  const router = useRouter();
  const [token, setToken] = useState("");
  const [form, setForm] = useState({
    agentType: "Real Estate Agent",
    officeAddress: "",
    yearsOfExperience: "0",
    licenseNumber: "",
    officeLocation: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedToken = getStoredAgentOnboardingToken();
    setToken(storedToken);
    if (!storedToken) {
      setError("Please complete agent signup before adding professional details.");
    }
  }, []);

  const update = (key: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!token) {
      setError("Missing onboarding token. Please start agent signup again.");
      return;
    }

    if (form.agentType === "Real Estate Agent" && !form.licenseNumber.trim()) {
      setError("License number is required for real estate agents.");
      return;
    }

    try {
      setLoading(true);
      await updateAgentProfessionalDetails({
        onboardingToken: token,
        agentType: form.agentType as "Real Estate Agent" | "Property Manager",
        officeAddress: form.officeAddress,
        yearsOfExperience: Number(form.yearsOfExperience) || 0,
        licenseNumber: form.licenseNumber,
        officeLocation: form.officeLocation,
      });
      router.push("/agent-Onboarding/documentVerification");
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to save professional details.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#f8f5f0]">
      <div className="grid min-h-screen lg:grid-cols-[52%_48%]">
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
            <div>
              <h3 className="text-sm tracking-wide">
                realestatemarketplace
                <span className="text-[#F3A61D]">.africa</span>
              </h3>
            </div>

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

            {error && (
              <p className="mb-4 rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-600">
                {error}
              </p>
            )}

            <form onSubmit={submit} className="space-y-5">
              <div>
                <label className="mb-2 block text-xs text-[#F3A61D]">
                  Agent type
                </label>

                <select
                  value={form.agentType}
                  onChange={(event) => update("agentType", event.target.value)}
                  className="h-11 w-full rounded-lg border border-[#E8E1D9] bg-transparent px-4 text-sm text-gray-600"
                >
                  <option value="Real Estate Agent">Individual agent</option>
                  <option value="Property Manager">Property manager</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-xs text-[#F3A61D]">
                  Office address
                </label>

                <input
                  required
                  type="text"
                  value={form.officeAddress}
                  onChange={(event) => update("officeAddress", event.target.value)}
                  placeholder="#"
                  className="h-11 w-full rounded-lg border border-[#E8E1D9] bg-transparent px-4 text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-2 block text-xs text-[#F3A61D]">
                    Years of experience
                  </label>

                  <input
                    type="number"
                    min={0}
                    value={form.yearsOfExperience}
                    onChange={(event) =>
                      update("yearsOfExperience", event.target.value)
                    }
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
                    value={form.licenseNumber}
                    onChange={(event) => update("licenseNumber", event.target.value)}
                    placeholder="#"
                    className="h-11 w-full rounded-lg border border-[#E8E1D9] px-4 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs text-[#F3A61D]">
                  Areas of operation
                </label>

                <input
                  required
                  type="text"
                  value={form.officeLocation}
                  onChange={(event) => update("officeLocation", event.target.value)}
                  placeholder="e.g. Lagos, Abuja, Rivers"
                  className="h-11 w-full rounded-lg border border-[#E8E1D9] px-4 text-sm"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <Link
                  href="/agent-Onboarding/sign-up"
                  className="h-11 flex-1 rounded-lg border border-[#F3A61D] text-sm text-[#F3A61D] transition hover:bg-[#F3A61D]/5 flex items-center justify-center"
                >
                  Back
                </Link>

                <button
                  type="submit"
                  disabled={loading || !token}
                  className="h-11 flex-1 rounded-lg bg-[#F3A61D] text-sm font-medium text-black transition hover:brightness-95 flex items-center justify-center disabled:opacity-60"
                >
                  {loading ? "Saving..." : "Next"}
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
    </main>
  );
}
