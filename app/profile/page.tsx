"use client";

import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import {
  clearAuthSession,
  deleteUser,
  getCurrentUser,
  getStoredAccessToken,
  type UserByEmail,
} from "@/services";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<UserByEmail | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = getStoredAccessToken();
    if (!token) {
      setLoading(false);
      return;
    }

    getCurrentUser(token)
      .then(setUser)
      .catch(() => setUser(null))
      .finally(() => setLoading(false));
  }, []);

  const displayName =
    user?.name ||
    [user?.first_name_field, user?.last_name_field].filter(Boolean).join(" ") ||
    "Your profile";

  const handleDeleteAccount = async () => {
    if (!user) return;

    const confirmed = window.confirm(
      "Delete your account permanently? This action cannot be undone.",
    );
    if (!confirmed) return;

    const token = getStoredAccessToken();
    if (!token) {
      setError("Please sign in again before deleting your account.");
      return;
    }

    try {
      setDeleting(true);
      setError("");
      await deleteUser(user.id, token);
      clearAuthSession();
      router.replace("/home");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to delete account.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <>
      <Navbar />
      <main className="min-h-[70vh] bg-[#FAF7F2] px-4 py-12">
        <section className="mx-auto max-w-2xl rounded-lg border border-stone-100 bg-white p-6 shadow-sm">
          {loading ? (
            <p className="text-sm text-stone-500">Loading profile...</p>
          ) : user ? (
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-500">
                Profile
              </p>
              <h1 className="mt-2 text-2xl font-semibold text-stone-800">
                {displayName}
              </h1>
              <div className="mt-6 space-y-3 text-sm text-stone-600">
                <p>Email: {user.email || "Not provided"}</p>
                <p>Phone: {user.phone_number || "Not provided"}</p>
                <p>Role: {user.role}</p>
              </div>
              {error ? (
                <p className="mt-5 rounded-lg border border-red-100 bg-red-50 px-3 py-2 text-sm text-red-600">
                  {error}
                </p>
              ) : null}
              <div className="mt-8 border-t border-stone-100 pt-6">
                <h2 className="text-sm font-semibold text-stone-800">
                  Account
                </h2>
                <button
                  type="button"
                  onClick={handleDeleteAccount}
                  disabled={deleting}
                  className="mt-3 rounded-lg border border-red-200 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-50 disabled:opacity-60"
                >
                  {deleting ? "Deleting..." : "Delete Account"}
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h1 className="text-2xl font-semibold text-stone-800">
                Sign in to view your profile
              </h1>
              <Link
                href="/auth/login"
                className="mt-5 inline-flex rounded-lg bg-amber-400 px-5 py-2.5 text-sm font-semibold text-white hover:bg-amber-500"
              >
                Sign In
              </Link>
            </div>
          )}
        </section>
      </main>
      <Footer />
    </>
  );
}
