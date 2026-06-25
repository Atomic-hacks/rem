"use client";

import {
  createCurrentUserMetadata,
  deleteCurrentUser,
  getCurrentAuthenticatedUser,
  getStoredAccessToken,
  type CurrentUserMetadata,
  type CurrentUserProfile,
} from "@/services";
import { clearAuthSession } from "@/services";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import {
  FiCheckCircle,
  FiMail,
  FiPhone,
  FiShield,
  FiTrash2,
  FiUser,
} from "react-icons/fi";
import { TbAlertCircle } from "react-icons/tb";

type MetadataFormState = {
  name: string;
  firstNameField: string;
  lastNameField: string;
  email: string;
  phoneNumber: string;
};

function profileCompletion(form: MetadataFormState) {
  const fields = [
    form.firstNameField,
    form.lastNameField,
    form.email,
    form.phoneNumber,
  ];
  const filled = fields.filter((value) => value.trim()).length;
  return Math.round((filled / fields.length) * 100);
}

export default function UserProfileDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<CurrentUserProfile | null>(null);
  const [metadata, setMetadata] = useState<CurrentUserMetadata | null>(null);
  const [form, setForm] = useState<MetadataFormState>({
    name: "",
    firstNameField: "",
    lastNameField: "",
    email: "",
    phoneNumber: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const token = getStoredAccessToken();
    if (!token) {
      setLoading(false);
      return;
    }

    getCurrentAuthenticatedUser(token)
      .then((currentUser) => {
        setUser(currentUser);
        setForm((current) => ({
          ...current,
          email: currentUser.email ?? current.email,
        }));
      })
      .catch((err: unknown) =>
        setError(err instanceof Error ? err.message : "Unable to load profile."),
      )
      .finally(() => setLoading(false));
  }, []);

  const updateField = (key: keyof MetadataFormState, value: string) => {
    setForm((current) => ({ ...current, [key]: value }));
  };

  const displayName =
    metadata?.name ||
    [metadata?.first_name_field, metadata?.last_name_field]
      .filter(Boolean)
      .join(" ") ||
    user?.email ||
    "Your profile";

  const completion = profileCompletion({
    ...form,
    email: form.email || user?.email || "",
  });

  const handleSave = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess("");

    const token = getStoredAccessToken();
    if (!token || !user) {
      setError("Please sign in again.");
      return;
    }

    const payload = new FormData();
    const firstName = form.firstNameField.trim();
    const lastName = form.lastNameField.trim();
    const email = form.email.trim() || user.email;
    const name = form.name.trim() || [firstName, lastName].filter(Boolean).join(" ");

    if (name) {
      payload.append("name", name);
    }

    if (firstName) {
      payload.append("first_name_field", firstName);
    }

    if (lastName) {
      payload.append("last_name_field", lastName);
    }

    if (email) {
      payload.append("email", email);
    }

    if (form.phoneNumber.trim()) {
      payload.append("phone_number", form.phoneNumber.trim());
    }

    try {
      setSaving(true);
      const savedMetadata = await createCurrentUserMetadata(payload, token);
      setMetadata(savedMetadata);
      setForm({
        name: savedMetadata.name ?? name ?? "",
        firstNameField: savedMetadata.first_name_field ?? firstName ?? "",
        lastNameField: savedMetadata.last_name_field ?? lastName ?? "",
        email: savedMetadata.email ?? email ?? "",
        phoneNumber: savedMetadata.phone_number ?? form.phoneNumber.trim(),
      });
      setSuccess("Profile saved.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to save profile.");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    const token = getStoredAccessToken();
    if (!token) {
      setError("Please sign in again before deleting your account.");
      return;
    }

    const confirmed = window.confirm(
      "Delete your account permanently? This action cannot be undone.",
    );
    if (!confirmed) {
      return;
    }

    try {
      setDeleting(true);
      setError("");
      await deleteCurrentUser(token);
      clearAuthSession();
      router.replace("/home");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to delete account.");
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] px-6 py-8 text-sm text-stone-500 sm:px-10 lg:px-16">
        Loading profile...
      </div>
    );
  }

  if (!getStoredAccessToken()) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] px-6 py-8 sm:px-10 lg:px-16">
        <div className="mx-auto max-w-3xl rounded-2xl border border-stone-100 bg-white p-6 shadow-sm">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-500">
            Profile
          </p>
          <h1 className="mt-2 text-2xl font-bold tracking-tight text-stone-800">
            Sign in to view your profile
          </h1>
          <p className="mt-2 text-sm text-stone-500">
            Your account details live behind authentication.
          </p>
          <Link
            href="/auth/login"
            className="mt-6 inline-flex rounded-lg bg-amber-400 px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-amber-500"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF7F2] px-4 py-8 sm:px-6 lg:px-10">
      <div className="mx-auto flex max-w-5xl flex-col gap-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-amber-500">
              User Profile
            </p>
            <h1 className="mt-1 text-2xl font-bold tracking-tight text-stone-800 sm:text-3xl">
              Welcome, {displayName}
            </h1>
            <p className="mt-1 text-sm text-stone-500">
              Manage your account details and metadata from one place.
            </p>
          </div>

          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold ${
              user?.is_active
                ? "bg-emerald-100 text-emerald-700"
                : "bg-amber-100 text-amber-700"
            }`}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${
                user?.is_active ? "bg-emerald-500" : "bg-amber-500"
              }`}
            />
            {user?.is_active ? "Active" : "Inactive"}
          </span>
        </div>

        {error ? (
          <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        ) : null}

        {success ? (
          <div className="rounded-xl border border-emerald-100 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
            {success}
          </div>
        ) : null}

        <div className="grid gap-3 md:grid-cols-3">
          <div className="flex flex-col gap-2 rounded-xl border border-amber-100 bg-amber-50 p-4">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-semibold text-stone-700">
                Account Status
              </span>
              <TbAlertCircle size={15} className="text-amber-400" />
            </div>
            <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-amber-100 px-2.5 py-1 text-[10px] font-semibold text-amber-700">
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-amber-500" />
              {user?.is_active ? "Account Active" : "Needs Attention"}
            </span>
            <p className="text-[10.5px] leading-relaxed text-stone-400">
              {user?.email || "Your account email will appear here."}
            </p>
          </div>

          <div className="flex flex-col gap-2 rounded-xl border border-stone-100 bg-white p-4 shadow-sm">
            <span className="text-[11px] font-semibold text-stone-700">
              Verification
            </span>
            <div className="flex items-center gap-1.5">
              <FiCheckCircle
                size={13}
                className={
                  metadata?.is_email_verified
                    ? "text-emerald-500"
                    : "text-stone-300"
                }
              />
              <span className="text-[11px] text-stone-500">Email</span>
              <FiCheckCircle
                size={13}
                className={
                  metadata?.is_phone_verified
                    ? "text-emerald-500"
                    : "text-stone-300"
                }
              />
              <span className="text-[11px] text-stone-500">Phone</span>
            </div>
            <p className="text-[10.5px] text-stone-400">
              {metadata?.is_email_verified || metadata?.is_phone_verified
                ? "Verification status from your saved metadata."
                : "Verification data will show after your profile metadata is created."}
            </p>
          </div>

          <div className="flex flex-col gap-2 rounded-xl border border-stone-100 bg-white p-4 shadow-sm">
            <span className="text-[11px] font-semibold text-stone-700">
              Profile Completion
            </span>
            <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-stone-100">
              <div
                className="h-full rounded-full bg-amber-400"
                style={{ width: `${completion}%` }}
              />
            </div>
            <p className="text-right text-[10.5px] text-stone-500">
              {completion}%
            </p>
          </div>
        </div>

        <div className="grid gap-3 md:grid-cols-4">
          {[
            {
              label: "Email",
              value: user?.email || metadata?.email || "Not set",
              icon: <FiMail size={20} className="text-amber-300" />,
            },
            {
              label: "Phone",
              value: metadata?.phone_number || form.phoneNumber || "Not set",
              icon: <FiPhone size={20} className="text-amber-300" />,
            },
            {
              label: "Role",
              value: metadata?.role || "Prospective Buyer/Tenant",
              icon: <FiUser size={20} className="text-amber-300" />,
            },
            {
              label: "Profile ID",
              value: String(user?.id ?? metadata?.id ?? "—"),
              icon: <FiShield size={20} className="text-amber-300" />,
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col gap-2 rounded-xl border border-stone-100 bg-white px-4 py-3.5 shadow-sm"
            >
              <p className="text-[10px] font-light text-stone-400">
                {stat.label}
              </p>
              <div className="flex items-center justify-between gap-3">
                <span className="min-w-0 truncate text-lg font-bold text-stone-800">
                  {stat.value}
                </span>
                {stat.icon}
              </div>
            </div>
          ))}
        </div>

        <section className="grid gap-4 lg:grid-cols-[1.7fr_1fr]">
          <form
            onSubmit={handleSave}
            className="rounded-2xl border border-stone-100 bg-white p-5 shadow-sm sm:p-6"
          >
            <div className="mb-5 flex items-start justify-between gap-3">
              <div>
                <h2 className="text-sm font-semibold text-stone-800">
                  Profile Details
                </h2>
                <p className="mt-0.5 text-xs text-stone-400">
                  Save your personal and contact information.
                </p>
              </div>
              <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-600">
                {metadata?.auth_provider || "email"}
              </span>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <label className="text-xs font-semibold text-stone-600">
                Full Name
                <input
                  value={form.name}
                  onChange={(event) => updateField("name", event.target.value)}
                  placeholder="Jane Doe"
                  className="mt-1 w-full rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-sm text-stone-700 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                />
              </label>
              <label className="text-xs font-semibold text-stone-600">
                Email
                <input
                  type="email"
                  value={form.email || user?.email || ""}
                  onChange={(event) => updateField("email", event.target.value)}
                  placeholder="user@example.com"
                  className="mt-1 w-full rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-sm text-stone-700 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                />
              </label>
              <label className="text-xs font-semibold text-stone-600">
                First Name
                <input
                  value={form.firstNameField}
                  onChange={(event) =>
                    updateField("firstNameField", event.target.value)
                  }
                  className="mt-1 w-full rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-sm text-stone-700 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                />
              </label>
              <label className="text-xs font-semibold text-stone-600">
                Last Name
                <input
                  value={form.lastNameField}
                  onChange={(event) =>
                    updateField("lastNameField", event.target.value)
                  }
                  className="mt-1 w-full rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-sm text-stone-700 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                />
              </label>
              <label className="text-xs font-semibold text-stone-600 sm:col-span-2">
                Phone Number
                <input
                  value={form.phoneNumber}
                  onChange={(event) =>
                    updateField("phoneNumber", event.target.value)
                  }
                  placeholder="+234..."
                  className="mt-1 w-full rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-sm text-stone-700 outline-none transition focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
                />
              </label>
            </div>

            <button
              type="submit"
              disabled={saving}
              className="mt-6 inline-flex items-center justify-center rounded-lg bg-amber-400 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-amber-500 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {saving ? "Saving..." : "Save Profile"}
            </button>
          </form>

          <section className="rounded-2xl border border-stone-100 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h2 className="text-sm font-semibold text-stone-800">
                  Account
                </h2>
                <p className="mt-0.5 text-xs text-stone-400">
                  Manage sign-in and account removal.
                </p>
              </div>
              <TbAlertCircle size={16} className="text-amber-400" />
            </div>

            <div className="mt-5 space-y-3">
              <div className="rounded-xl border border-stone-100 bg-stone-50 p-4">
                <p className="text-[11px] font-semibold text-stone-700">
                  Current user
                </p>
                <p className="mt-1 text-sm text-stone-600">
                  {user?.email || "No email loaded"}
                </p>
                <p className="mt-1 text-[11px] text-stone-400">
                  User ID: {user?.id ?? "—"}
                </p>
              </div>

              <button
                type="button"
                onClick={handleDeleteAccount}
                disabled={deleting}
                className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-red-200 px-4 py-2.5 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-60"
              >
                <FiTrash2 size={15} />
                {deleting ? "Deleting..." : "Delete Account"}
              </button>
            </div>
          </section>
        </section>
      </div>
    </main>
  );
}
