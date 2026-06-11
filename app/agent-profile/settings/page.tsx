"use client";

import {
  getCurrentUser,
  getStoredAccessToken,
  patchCurrentUser,
  persistAuthUser,
  type UserByEmail,
} from "@/services";
import { FormEvent, useEffect, useState } from "react";
import { FiBell, FiEyeOff, FiShield } from "react-icons/fi";

export default function AgentProfileSettingsPage() {
  const [user, setUser] = useState<UserByEmail | null>(null);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
  });
  const [emailNotif, setEmailNotif] = useState(true);
  const [smsNotif, setSmsNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(true);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const token = getStoredAccessToken();
    if (!token) {
      setError("Please sign in again.");
      setLoading(false);
      return;
    }

    getCurrentUser(token)
      .then((currentUser) => {
        setUser(currentUser);
        setForm({
          firstName: currentUser.first_name_field ?? "",
          lastName: currentUser.last_name_field ?? "",
          email: currentUser.email ?? "",
          phoneNumber: currentUser.phone_number ?? "",
        });
      })
      .catch((err: unknown) =>
        setError(err instanceof Error ? err.message : "Unable to load profile."),
      )
      .finally(() => setLoading(false));
  }, []);

  const update = (key: keyof typeof form, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const saveProfile = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    const token = getStoredAccessToken();
    if (!token || !user) {
      setError("Please sign in again.");
      return;
    }

    const payload = new FormData();
    payload.append("first_name", form.firstName.trim());
    payload.append("last_name", form.lastName.trim());
    payload.append("email", form.email.trim());
    payload.append("phone_number", form.phoneNumber.trim());

    try {
      setSaving(true);
      await patchCurrentUser(payload, token);
      const refreshed = await getCurrentUser(token);
      persistAuthUser(refreshed);
      setUser(refreshed);
      setSuccess("Profile updated.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to update profile.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FFFDF9] p-8 text-sm text-gray-500">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FFFDF9] p-4 font-sans text-[#333333] sm:p-8">
      <div className="mx-auto max-w-3xl space-y-6">
        <h1 className="mb-6 text-2xl font-bold tracking-tight text-[#2D2D2D]">
          Profile
        </h1>

        {error && (
          <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}
        {success && (
          <div className="rounded-xl border border-green-100 bg-green-50 px-4 py-3 text-sm text-green-600">
            {success}
          </div>
        )}

        <form
          onSubmit={saveProfile}
          className="rounded-xl border border-[#F5EFE6] bg-white p-6 shadow-sm"
        >
          <div className="mb-6 flex items-start justify-between">
            <div>
              <h2 className="text-base font-semibold text-[#2D2D2D]">
                Profile Information
              </h2>
              <p className="mt-0.5 text-xs text-gray-400">
                Update your personal information.
              </p>
            </div>
            <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-600">
              {user?.role ?? "Agent"}
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="text-xs font-semibold text-gray-500">
              First Name
              <input
                value={form.firstName}
                onChange={(event) => update("firstName", event.target.value)}
                className="mt-1 w-full rounded-lg border border-[#EAEAEA] p-2.5 text-sm text-gray-700 focus:border-amber-400 focus:outline-none"
              />
            </label>
            <label className="text-xs font-semibold text-gray-500">
              Last Name
              <input
                value={form.lastName}
                onChange={(event) => update("lastName", event.target.value)}
                className="mt-1 w-full rounded-lg border border-[#EAEAEA] p-2.5 text-sm text-gray-700 focus:border-amber-400 focus:outline-none"
              />
            </label>
            <label className="text-xs font-semibold text-gray-500">
              Email
              <input
                type="email"
                value={form.email}
                onChange={(event) => update("email", event.target.value)}
                className="mt-1 w-full rounded-lg border border-[#EAEAEA] p-2.5 text-sm text-gray-700 focus:border-amber-400 focus:outline-none"
              />
            </label>
            <label className="text-xs font-semibold text-gray-500">
              Phone Number
              <input
                value={form.phoneNumber}
                onChange={(event) => update("phoneNumber", event.target.value)}
                className="mt-1 w-full rounded-lg border border-[#EAEAEA] p-2.5 text-sm text-gray-700 focus:border-amber-400 focus:outline-none"
              />
            </label>
          </div>

          <button
            type="submit"
            disabled={saving}
            className="mt-6 rounded-lg bg-[#FBBF24] px-4 py-2.5 text-xs font-medium text-white shadow-sm transition-colors hover:bg-amber-500 disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save Profile"}
          </button>
        </form>

        <section className="rounded-xl border border-[#F5EFE6] bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-2">
            <FiBell className="h-4 w-4 text-gray-600" />
            <h2 className="text-base font-semibold text-[#2D2D2D]">
              Notification Preferences
            </h2>
          </div>

          <div className="space-y-3">
            {[
              ["Email Notifications", emailNotif, setEmailNotif],
              ["SMS Notifications", smsNotif, setSmsNotif],
              ["Push Notifications", pushNotif, setPushNotif],
            ].map(([label, value, setter]) => (
              <div
                key={String(label)}
                className="flex items-center justify-between rounded-xl border border-[#FAF6F0] bg-[#FFFDF9] p-3"
              >
                <div>
                  <h3 className="text-xs font-semibold text-[#2D2D2D]">
                    {String(label)}
                  </h3>
                  <p className="text-[11px] text-gray-400">
                    Local preference until notification endpoints are available.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() =>
                    (setter as (next: boolean) => void)(!Boolean(value))
                  }
                  className={`flex h-5 w-10 items-center rounded-full border p-0.5 transition-colors ${
                    value
                      ? "border-[#FBBF24] bg-white"
                      : "border-gray-300 bg-gray-200"
                  }`}
                >
                  <span
                    className={`h-4 w-4 rounded-full shadow-md transition-transform ${
                      value ? "translate-x-5 bg-[#FBBF24]" : "bg-white"
                    }`}
                  />
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4 rounded-xl border border-[#F5EFE6] bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2">
            <FiShield className="h-4 w-4 text-gray-600" />
            <h2 className="text-base font-semibold text-[#2D2D2D]">
              Password Security
            </h2>
          </div>
          {["Current Password", "New Password", "Confirm Password"].map((label) => (
            <label key={label} className="block text-xs font-medium text-[#2D2D2D]">
              {label}
              <div className="relative mt-1">
                <input
                  type="password"
                  className="w-full rounded-lg border border-[#EAEAEA] p-2.5 pr-10 text-xs text-gray-700 focus:border-amber-400 focus:outline-none"
                />
                <FiEyeOff className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              </div>
            </label>
          ))}
          <button className="rounded-lg bg-[#FBBF24] px-4 py-2.5 text-xs font-medium text-white shadow-sm transition-colors hover:bg-amber-500">
            Update Password
          </button>
        </section>
      </div>
    </div>
  );
}
