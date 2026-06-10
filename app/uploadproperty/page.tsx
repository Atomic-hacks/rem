"use client";

import { useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FiAlertCircle,
  FiArrowLeft,
  FiCheckCircle,
  FiChevronDown,
  FiDollarSign,
  FiMapPin,
  FiPlus,
  FiUploadCloud,
} from "react-icons/fi";
import { MdOutlineBathtub, MdOutlineBedroomParent } from "react-icons/md";
import { BiArea } from "react-icons/bi";
import { createProperty, getStoredAccessToken } from "@/services";

/* ─────────────────────────── types ─────────────────────────── */
interface PropertyForm {
  title: string;
  description: string;
  propertyListing: "for_sale" | "rent" | "short_let";
  propertyType: string;
  city: string;
  address: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  areaSqft: number;
  amenity: string;
  amenities: string[];
  images: File[];
}

/* ─────────────────────────── shared banners ─────────────────── */
const Banners = () => (
  <div className="flex flex-col gap-3">
    {/* Unverified Account */}
    <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3 flex items-start gap-3">
      <FiAlertCircle size={15} className="text-amber-500 mt-0.5 shrink-0" />
      <div>
        <p className="text-stone-700 text-xs font-semibold">
          Unverified Account
        </p>
        <p className="text-stone-500 text-[11px] mt-0.5 leading-relaxed">
          You can list up to 3 properties before verification. Complete your
          verification to list unlimited properties.
        </p>
      </div>
    </div>

    {/* First Listing Review */}
    <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3 flex items-start gap-3">
      <FiCheckCircle size={15} className="text-blue-400 mt-0.5 shrink-0" />
      <div>
        <p className="text-stone-700 text-xs font-semibold">
          First Listing Review
        </p>
        <p className="text-stone-500 text-[11px] mt-0.5 leading-relaxed">
          Your first listing will be manually reviewed before publication. This
          typically takes 24 hours.
        </p>
      </div>
    </div>
  </div>
);

/* ─────────────────────────── step 1 ─────────────────────────── */
const Step1 = ({
  data,
  onChange,
  onNext,
}: {
  data: PropertyForm;
  onChange: (k: keyof PropertyForm, v: string) => void;
  onNext: () => void;
}) => (
  <div className="bg-white border border-stone-100 rounded-2xl shadow-sm p-6 flex flex-col gap-5">
    <div>
      <h2 className="text-stone-800 text-sm font-semibold">Property Details</h2>
      <p className="text-stone-400 text-[11.5px] mt-0.5">
        Tell us more about the property you want to list
      </p>
    </div>

    {/* Property Title */}
    <div className="flex flex-col gap-1.5">
      <label className="text-stone-600 text-[11.5px] font-medium">
        Property Title
      </label>
      <input
        type="text"
        value={data.title}
        onChange={(e) => onChange("title", e.target.value)}
        placeholder="e.g Luxury modern villa"
        className="w-full border border-stone-200 rounded-lg px-3 py-2.5 text-xs text-stone-700 placeholder:text-stone-300 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all"
      />
    </div>

    {/* Description */}
    <div className="flex flex-col gap-1.5">
      <label className="text-stone-600 text-[11.5px] font-medium">
        Description
      </label>
      <textarea
        rows={6}
        value={data.description}
        onChange={(e) => onChange("description", e.target.value)}
        placeholder="Describe the property in the detail. Include key features, and what makes it special."
        className="w-full border border-stone-200 rounded-lg px-3 py-2.5 text-xs text-stone-700 placeholder:text-stone-300 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all resize-none"
      />
    </div>

    {/* Property Type */}
    <div className="flex flex-col gap-1.5">
      <label className="text-stone-600 text-[11.5px] font-medium">
        Property Type
      </label>
      <div className="relative">
        <select
          value={data.propertyListing}
          onChange={(e) =>
            onChange(
              "propertyListing",
              e.target.value as PropertyForm["propertyListing"],
            )
          }
          className="w-full appearance-none border border-stone-200 rounded-lg px-3 py-2.5 text-xs text-stone-700 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all bg-white cursor-pointer"
        >
          <option value="for_sale">For Sale</option>
          <option value="rent">For Rent</option>
          <option value="short_let">Short Let</option>
        </select>
        <FiChevronDown
          size={13}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none"
        />
      </div>
    </div>

    <div className="flex flex-col gap-1.5">
      <label className="text-stone-600 text-[11.5px] font-medium">
        Building Type
      </label>
      <div className="relative">
        <select
          value={data.propertyType}
          onChange={(e) => onChange("propertyType", e.target.value)}
          className="w-full appearance-none border border-stone-200 rounded-lg px-3 py-2.5 text-xs text-stone-700 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all bg-white cursor-pointer"
        >
          <option value="apartment">Apartment</option>
          <option value="house">House</option>
          <option value="duplex">Duplex</option>
          <option value="terrace">Terrace</option>
          <option value="land">Land</option>
          <option value="commercial">Commercial</option>
        </select>
        <FiChevronDown
          size={13}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 pointer-events-none"
        />
      </div>
    </div>

    <button
      type="button"
      onClick={onNext}
      className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-500 text-white text-xs font-semibold transition-colors"
    >
      Next
    </button>
  </div>
);

/* ─────────────────────────── step 2 ─────────────────────────── */
const Step2 = ({
  data,
  onChange,
  onBack,
  onNext,
}: {
  data: PropertyForm;
  onChange: (k: keyof PropertyForm, v: string | number) => void;
  onBack: () => void;
  onNext: () => void;
}) => (
  <div className="bg-white border border-stone-100 rounded-2xl shadow-sm p-6 flex flex-col gap-5">
    <div>
      <h2 className="text-stone-800 text-sm font-semibold">
        Location & Pricing
      </h2>
      <p className="text-stone-400 text-[11.5px] mt-0.5">
        Where is the property located and what&apos;s the price?
      </p>
    </div>

    {/* City / Full Address */}
    <div className="grid grid-cols-2 gap-3">
      <div className="flex flex-col gap-1.5">
        <label className="text-stone-600 text-[11.5px] font-medium">
          City/Area
        </label>
        <div className="relative">
          <FiMapPin
            size={12}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-300"
          />
          <input
            type="text"
            value={data.city}
            onChange={(e) => onChange("city", e.target.value)}
            placeholder="e.g. Abuja, Lagos"
            className="w-full border border-stone-200 rounded-lg pl-8 pr-3 py-2.5 text-xs text-stone-700 placeholder:text-stone-300 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all"
          />
        </div>
      </div>
      <div className="flex flex-col gap-1.5">
        <label className="text-stone-600 text-[11.5px] font-medium">
          Full Address <span className="text-red-400">*</span>
        </label>
        <input
          type="text"
          value={data.address}
          onChange={(e) => onChange("address", e.target.value)}
          placeholder=""
          className="w-full border border-stone-200 rounded-lg px-3 py-2.5 text-xs text-stone-700 placeholder:text-stone-300 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all"
        />
      </div>
    </div>

    {/* Price */}
    <div className="flex flex-col gap-1.5">
      <label className="text-stone-600 text-[11.5px] font-medium">
        Price <span className="text-red-400">*</span>
      </label>
      <div className="relative">
        <FiDollarSign
          size={12}
          className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-300"
        />
        <input
          type="text"
          value={data.price}
          onChange={(e) => onChange("price", e.target.value)}
          placeholder=""
          className="w-full border border-stone-200 rounded-lg pl-8 pr-3 py-2.5 text-xs text-stone-700 placeholder:text-stone-300 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all"
        />
      </div>
    </div>

    {/* Bedrooms / Bathrooms / Area */}
    <div className="grid grid-cols-3 gap-3">
      {[
        {
          label: "Bedrooms",
          key: "bedrooms" as keyof PropertyForm,
          icon: <MdOutlineBedroomParent size={14} className="text-stone-300" />,
        },
        {
          label: "Bathrooms",
          key: "bathrooms" as keyof PropertyForm,
          icon: <MdOutlineBathtub size={14} className="text-stone-300" />,
        },
        {
          label: "Area (sqft)",
          key: "areaSqft" as keyof PropertyForm,
          icon: <BiArea size={14} className="text-stone-300" />,
        },
      ].map((f) => (
        <div key={f.key} className="flex flex-col gap-1.5">
          <label className="text-stone-600 text-[11.5px] font-medium">
            {f.label}
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2">
              {f.icon}
            </span>
            <input
              type="number"
              min={0}
              value={data[f.key] as number}
              onChange={(e) => onChange(f.key, Number(e.target.value))}
              className="w-full border border-stone-200 rounded-lg pl-8 pr-3 py-2.5 text-xs text-stone-700 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all"
            />
          </div>
        </div>
      ))}
    </div>

    {/* Back / Next */}
    <div className="grid grid-cols-2 gap-3 mt-1">
      <button
        type="button"
        onClick={onBack}
        className="py-3 rounded-xl border border-stone-200 text-stone-600 text-xs font-medium hover:border-amber-300 hover:text-amber-500 transition-colors"
      >
        Back
      </button>
      <button
        type="button"
        onClick={onNext}
        className="py-3 rounded-xl bg-amber-400 hover:bg-amber-500 text-white text-xs font-semibold transition-colors"
      >
        Next
      </button>
    </div>
  </div>
);

/* ─────────────────────────── step 3 ─────────────────────────── */
const Step3 = ({
  data,
  onChange,
  onAddAmenity,
  onPublish,
  isSubmitting,
}: {
  data: PropertyForm;
  onChange: (k: keyof PropertyForm, v: string | File[]) => void;
  onAddAmenity: () => void;
  onPublish: () => void;
  isSubmitting: boolean;
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    onChange("images", [...data.images, ...files]);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      onChange("images", [...data.images, ...files]);
    }
  };

  return (
    <div className="bg-white border border-stone-100 rounded-2xl shadow-sm p-6 flex flex-col gap-5">
      <div>
        <h2 className="text-stone-800 text-sm font-semibold">
          Property Details
        </h2>
        <p className="text-stone-400 text-[11.5px] mt-0.5">
          Tell us more about the property you want to list
        </p>
      </div>

      {/* Amenities & Features */}
      <div className="flex flex-col gap-1.5">
        <label className="text-stone-600 text-[11.5px] font-medium">
          Amenities & Features
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={data.amenity}
            onChange={(e) => onChange("amenity", e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onAddAmenity()}
            placeholder="e.g AC, Wi-Fi"
            className="flex-1 border border-stone-200 rounded-lg px-3 py-2.5 text-xs text-stone-700 placeholder:text-stone-300 outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all"
          />
          <button
            type="button"
            onClick={onAddAmenity}
            className="px-5 py-2.5 rounded-lg bg-amber-400 hover:bg-amber-500 text-white text-xs font-semibold transition-colors shrink-0"
          >
            Add
          </button>
        </div>
        {data.amenities.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-1">
            {data.amenities.map((a, i) => (
              <span
                key={i}
                className="bg-amber-50 border border-amber-200 text-amber-600 text-[10.5px] font-medium px-2.5 py-1 rounded-full"
              >
                {a}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Upload Images */}
      <div className="flex flex-col gap-1.5">
        <label className="text-stone-600 text-[11.5px] font-medium">
          Upload Images
        </label>
        <div
          role="button"
          tabIndex={0}
          onClick={() => fileInputRef.current?.click()}
          onKeyDown={(e) => e.key === "Enter" && fileInputRef.current?.click()}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          className="bg-amber-50 border border-amber-200 border-dashed rounded-xl flex flex-col items-center justify-center gap-2 py-10 cursor-pointer hover:bg-amber-100/50 transition-colors"
        >
          <FiUploadCloud size={22} className="text-amber-400" />
          <p className="text-stone-500 text-[11.5px]">
            Drag and drop images here or click to upload
          </p>
          <p className="text-stone-400 text-[10.5px]">
            JPG, PNG, up to 10MB each
          </p>
          {data.images.length > 0 && (
            <p className="text-amber-500 text-[10.5px] font-medium mt-1">
              {data.images.length} file{data.images.length > 1 ? "s" : ""}{" "}
              selected
            </p>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          className="hidden"
          onChange={handleFileChange}
        />
      </div>

      {/* Ready to publish bar */}
      <div className="bg-amber-50 border border-amber-100 rounded-xl px-4 py-3">
        <p className="text-stone-600 text-[11.5px]">
          <span className="font-semibold text-stone-700">
            Ready to publish?
          </span>{" "}
          Your listing will be reviewed and published within a few hours
        </p>
      </div>

      <button
        type="button"
        onClick={onPublish}
        disabled={isSubmitting}
        className="w-full py-3 rounded-xl bg-amber-400 hover:bg-amber-500 text-white text-xs font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-60"
      >
        {isSubmitting ? "Publishing..." : "Publish Listing"}
      </button>
    </div>
  );
};

/* ─────────────────────────── main component ─────────────────── */
export default function UploadPropertyPage() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2 | 3>(1);
  const [form, setForm] = useState<PropertyForm>({
    title: "",
    description: "",
    propertyListing: "for_sale",
    propertyType: "apartment",
    city: "",
    address: "",
    price: "",
    bedrooms: 0,
    bathrooms: 0,
    areaSqft: 0,
    amenity: "",
    amenities: [],
    images: [],
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const update = (key: keyof PropertyForm, value: string | number | File[]) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const addAmenity = () => {
    if (!form.amenity.trim()) return;
    setForm((prev) => ({
      ...prev,
      amenities: [...prev.amenities, prev.amenity.trim()],
      amenity: "",
    }));
  };

  const stepLabel = `Step ${step} of 3`;

  const publish = async () => {
    setSubmitError("");
    const accessToken = getStoredAccessToken();

    if (!accessToken) {
      setSubmitError(
        "Please sign in as an agent before publishing a property.",
      );
      return;
    }

    const payload = new globalThis.FormData();
    payload.append("title", form.title.trim());
    payload.append("description", form.description.trim());
    payload.append("property_type", form.propertyType);
    payload.append("property_listing", form.propertyListing);
    payload.append("price", form.price.trim());
    payload.append(
      "location",
      [form.address.trim(), form.city.trim()].filter(Boolean).join(", "),
    );
    payload.append("bedrooms", String(form.bedrooms));
    payload.append("bathrooms", String(form.bathrooms));
    payload.append("sqft", String(form.areaSqft));
    payload.append("is_available", "true");

    if (form.images[0]) {
      payload.append("cover_image", form.images[0]);
    }

    form.images.forEach((image) => {
      payload.append("images", image);
    });

    try {
      setIsSubmitting(true);
      const property = await createProperty(payload, accessToken);
      const route =
        property.property_listing === "rent"
          ? "/userRent"
          : property.property_listing === "short_let"
            ? "/shortlet"
            : "/userSale";
      router.push(`${route}/${property.slug}`);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "Unable to publish property.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] font-sans px-4 sm:px-6 lg:px-10 py-6">
      <div className="max-w-2xl mx-auto flex flex-col gap-5">
        {/* Header */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() =>
              step > 1 ? setStep((s) => (s - 1) as 1 | 2 | 3) : undefined
            }
            className="text-stone-400 hover:text-stone-600 transition-colors"
            aria-label="Go back"
          >
            <FiArrowLeft size={16} />
          </button>
          <div>
            <h1 className="text-stone-800 text-lg font-bold tracking-tight">
              Upload Property
            </h1>
            <p className="text-stone-400 text-[11px] mt-0.5">{stepLabel}</p>
          </div>
        </div>

        {/* Banners — always visible */}
        <Banners />

        {submitError && (
          <div className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-xs text-red-600">
            {submitError}
          </div>
        )}

        {/* Step content */}
        {step === 1 && (
          <Step1 data={form} onChange={update} onNext={() => setStep(2)} />
        )}
        {step === 2 && (
          <Step2
            data={form}
            onChange={update}
            onBack={() => setStep(1)}
            onNext={() => setStep(3)}
          />
        )}
        {step === 3 && (
          <Step3
            data={form}
            onChange={update}
            onAddAmenity={addAmenity}
            onPublish={publish}
            isSubmitting={isSubmitting}
          />
        )}
      </div>
    </div>
  );
}
