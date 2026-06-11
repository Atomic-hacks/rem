"use client";

import {
  persistAgentOnboardingToken,
  registerUser,
  setPendingActivationEmail,
} from "@/services";
import {
  persistAuthIntent,
  persistPendingAuthCredentials,
} from "@/features/auth/auth-routing";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

function normalizePhone(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (!digits) return "";
  if (digits.startsWith("234")) return `+${digits}`;
  return `+234${digits.replace(/^0/, "")}`;
}

export default function Home() {
  const router = useRouter();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    gender: "",
    dateOfBirth: "",
    password: "",
    rePassword: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const update = (key: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (form.password !== form.rePassword) {
      setError("Passwords do not match.");
      return;
    }

    try {
      setLoading(true);
      const response = await registerUser({
        firstName: form.firstName,
        lastName: form.lastName,
        authProvider: "email",
        email: form.email,
        phoneNumber: normalizePhone(form.phoneNumber),
        password: form.password,
        rePassword: form.rePassword,
        gender: form.gender,
        dateOfBirth: form.dateOfBirth,
        agentType: "Real Estate Agent",
      });

      if (response.onboarding_token) {
        persistAgentOnboardingToken(response.onboarding_token);
      }

      persistAuthIntent("agent");
      setPendingActivationEmail(form.email);
      persistPendingAuthCredentials(form.email, form.password);
      router.push("/auth/register/verify-email");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to create account.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#2d2d2d] flex items-center justify-center p-4">
      <div className="w-full max-w-7xl bg-white overflow-hidden shadow-2xl">
        <div className="grid lg:grid-cols-2 min-h-[900px]">
          <div className="relative">
            <Image
              src="/villa1.jpg"
              alt="Africa property"
              fill
              className="object-cover"
              priority
            />

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
                  Upload properties, manage listings, connect with buyers, and
                  track inquiries from one powerful platform.
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

              <div className="flex rounded-lg overflow-hidden border border-[#e8dfcf] mb-6">
                <Link
                  href="/auth/register"
                  className="flex-1 bg-[#f5efe4] py-3 text-sm text-center"
                >
                  I&apos;m looking for a home
                </Link>

                <button
                  type="button"
                  className="flex-1 bg-[#e8ab1b] text-white py-3 text-sm"
                >
                  I&apos;m an agent / landlord
                </button>
              </div>

              {error && (
                <p className="mb-4 rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-600">
                  {error}
                </p>
              )}

              <form onSubmit={submit}>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div>
                    <label className="text-xs text-gray-500 mb-2 block">
                      First Name
                    </label>
                    <input
                      required
                      type="text"
                      value={form.firstName}
                      onChange={(event) => update("firstName", event.target.value)}
                      placeholder="John"
                      className="w-full border border-[#e8dfcf] rounded-md px-4 py-3 outline-none bg-white"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-gray-500 mb-2 block">
                      Last Name
                    </label>
                    <input
                      required
                      type="text"
                      value={form.lastName}
                      onChange={(event) => update("lastName", event.target.value)}
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
                      +234
                    </div>

                    <input
                      type="text"
                      value={form.phoneNumber}
                      onChange={(event) => update("phoneNumber", event.target.value)}
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
                    required
                    type="email"
                    value={form.email}
                    onChange={(event) => update("email", event.target.value)}
                    placeholder="you@example.com"
                    className="w-full border border-[#e8dfcf] rounded-md px-4 py-3 outline-none bg-white"
                  />
                </div>

                <div className="mb-4">
                  <label className="text-xs text-gray-500 mb-2 block">
                    Gender
                  </label>

                  <select
                    value={form.gender}
                    onChange={(event) => update("gender", event.target.value)}
                    className="w-full border border-[#e8dfcf] rounded-md px-4 py-3 outline-none bg-white"
                  >
                    <option value="">Select...</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label className="text-xs text-gray-500 mb-2 block">
                    Date of Birth
                  </label>

                  <input
                    type="date"
                    value={form.dateOfBirth}
                    onChange={(event) => update("dateOfBirth", event.target.value)}
                    className="w-full border border-[#e8dfcf] rounded-md px-4 py-3 outline-none bg-white"
                  />
                </div>

                <div className="mb-4">
                  <label className="text-xs text-gray-500 mb-2 block">
                    Password
                  </label>
                  <input
                    required
                    type="password"
                    value={form.password}
                    onChange={(event) => update("password", event.target.value)}
                    className="w-full border border-[#e8dfcf] rounded-md px-4 py-3 outline-none bg-white"
                  />
                </div>

                <div className="mb-8">
                  <label className="text-xs text-gray-500 mb-2 block">
                    Confirm Password
                  </label>
                  <input
                    required
                    type="password"
                    value={form.rePassword}
                    onChange={(event) => update("rePassword", event.target.value)}
                    className="w-full border border-[#e8dfcf] rounded-md px-4 py-3 outline-none bg-white"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#e8ab1b] hover:bg-[#d39a18] transition rounded-xl py-4 text-white font-medium disabled:opacity-60"
                >
                  {loading ? "Creating account..." : "Continue"}
                </button>
              </form>

              <p className="text-center text-sm text-gray-500 mt-4">
                Already have an account?{" "}
                <Link href="/auth/login" className="text-[#d7a62f] cursor-pointer">
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
