"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ChangeEvent, KeyboardEvent, ReactNode } from "react";
import { useRef, useState } from "react";
import { FcGoogle } from "react-icons/fc";
import {
  FiCheck,
  FiCheckCircle,
  FiChevronDown,
  FiEye,
  FiEyeOff,
  FiMail,
  FiPhone,
} from "react-icons/fi";

const panelMotion = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
};

function SignUpPanel({
  eyebrow,
  title,
  description,
  children,
  wide = false,
}: {
  eyebrow?: string;
  title?: ReactNode;
  description?: string;
  children: ReactNode;
  wide?: boolean;
}) {
  return (
    <motion.div
      {...panelMotion}
      className={`w-full ${wide ? "max-w-4xl" : "max-w-xl"} flex flex-col gap-6`}
    >
      <div className="flex flex-col gap-2">
        {eyebrow ? (
          <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-amber-500">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="text-4xl font-bold text-amber-400 leading-tight">
          {title}
        </h2>
        {description ? (
          <p className="text-stone-500 text-sm font-light leading-relaxed mt-1">
            {description}
          </p>
        ) : null}
      </div>
      {children}
    </motion.div>
  );
}

function FieldLabel({ children }: { children: ReactNode }) {
  return (
    <label className="text-xs font-medium text-amber-500 tracking-wide">
      {children}
    </label>
  );
}

function PasswordField({
  value,
  onChange,
  placeholder = "At least 8 characters",
}: {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  const [shown, setShown] = useState(false);

  return (
    <div className="relative">
      <input
        type={shown ? "text" : "password"}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 pr-11 rounded-xl border border-stone-200 bg-white text-stone-700 text-sm placeholder:text-stone-300 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all duration-200"
      />
      <button
        type="button"
        onClick={() => setShown((current) => !current)}
        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 transition-colors cursor-pointer"
        aria-label={shown ? "Hide password" : "Show password"}
      >
        {shown ? <FiEyeOff size={16} /> : <FiEye size={16} />}
      </button>
    </div>
  );
}

function TermsCheckbox({
  agreed,
  onToggle,
}: {
  agreed: boolean;
  onToggle: () => void;
}) {
  return (
    <label className="flex items-center gap-3 cursor-pointer select-none">
      <button
        type="button"
        onClick={onToggle}
        className="shrink-0 cursor-pointer"
      >
        <FiCheckCircle
          size={20}
          className={agreed ? "text-amber-400" : "text-stone-300"}
        />
      </button>
      <span className="text-stone-500 text-[12.5px] font-light">
        I agree to the{" "}
        <Link href="#" className="text-amber-500 hover:underline font-medium">
          Terms
        </Link>{" "}
        and{" "}
        <Link href="#" className="text-amber-500 hover:underline font-medium">
          Privacy Policy
        </Link>
        .
      </span>
    </label>
  );
}

function Divider({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex-1 h-px bg-stone-200" />
      <span className="text-[11px] text-stone-500 uppercase tracking-widest font-light">
        {label}
      </span>
      <div className="flex-1 h-px bg-stone-200" />
    </div>
  );
}

function PrimaryLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
      <Link
        href={href}
        className="block w-full py-3.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-center text-white font-semibold text-sm tracking-wide transition-colors duration-200 shadow-sm"
      >
        {children}
      </Link>
    </motion.div>
  );
}

function PrimaryButton({
  children,
  onClick,
}: {
  children: ReactNode;
  onClick: () => void;
}) {
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="w-full py-3.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-center text-white font-semibold text-sm tracking-wide transition-colors duration-200 shadow-sm cursor-pointer"
    >
      {children}
    </motion.button>
  );
}

export default function SignUpPage() {
  const router = useRouter();
  const [role, setRole] = useState<"buyer" | "agent">("buyer");
  const [agreed, setAgreed] = useState(true);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirm: "",
  });

  const handleChange =
    (field: keyof typeof form) => (event: ChangeEvent<HTMLInputElement>) =>
      setForm((current) => ({ ...current, [field]: event.target.value }));

  const handleCreateAccount = async () => {
    const payload = { ...form, role, agreed, channel: "email" };
    void payload;
    router.push("/sign-up/verify-email");
  };

  return (
    <SignUpPanel
      eyebrow="Join the Marketplace"
      title={
        <>
          Create your free
          <br />
          account
        </>
      }
      description="Sign up to save homes, chat with agents and reveal full contact details."
    >
      <div className="flex rounded-xl overflow-hidden border border-stone-200 bg-white">
        {(["buyer", "agent"] as const).map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setRole(item)}
            className={`flex-1 px-3 py-3 text-sm font-medium transition-colors duration-200 cursor-pointer ${
              role === item
                ? "bg-amber-400 text-white"
                : "text-stone-500 hover:bg-stone-50"
            }`}
          >
            {item === "buyer"
              ? "I'm looking for a home"
              : "I'm an agent / landlord"}
          </button>
        ))}
      </div>

      <div className="flex gap-3">
        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="flex-1 flex items-center justify-center gap-2.5 py-3 rounded-xl border border-stone-200 bg-white text-stone-600 text-sm font-light hover:border-amber-300 transition-colors duration-200 cursor-pointer"
        >
          <FcGoogle size={18} />
          Google
        </motion.button>
        <Link
          href="/sign-up/phone"
          className="flex-1 flex items-center justify-center gap-2.5 py-3 rounded-xl border border-stone-200 bg-white text-stone-600 text-sm font-light hover:border-amber-300 transition-colors duration-200"
        >
          <FiPhone size={16} className="text-amber-500" />
          Phone
        </Link>
      </div>

      <Divider label="or with email" />

      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <FieldLabel>First name</FieldLabel>
            <input
              type="text"
              value={form.firstName}
              onChange={handleChange("firstName")}
              placeholder="John"
              className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-white text-stone-700 text-sm placeholder:text-stone-300 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all duration-200"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <FieldLabel>Last name</FieldLabel>
            <input
              type="text"
              value={form.lastName}
              onChange={handleChange("lastName")}
              placeholder="D. Law"
              className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-white text-stone-700 text-sm placeholder:text-stone-300 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all duration-200"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <FieldLabel>Email address</FieldLabel>
          <input
            type="email"
            value={form.email}
            onChange={handleChange("email")}
            placeholder="you@example.com"
            className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-white text-stone-700 text-sm placeholder:text-stone-300 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all duration-200"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <FieldLabel>Password</FieldLabel>
          <PasswordField
            value={form.password}
            onChange={(value) =>
              setForm((current) => ({ ...current, password: value }))
            }
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <FieldLabel>Confirm Password</FieldLabel>
          <PasswordField
            value={form.confirm}
            onChange={(value) =>
              setForm((current) => ({ ...current, confirm: value }))
            }
          />
        </div>
      </div>

      <TermsCheckbox
        agreed={agreed}
        onToggle={() => setAgreed((value) => !value)}
      />
      <PrimaryButton onClick={handleCreateAccount}>
        Create Account
      </PrimaryButton>

      <p className="text-center text-[12.5px] text-stone-400 font-light">
        Already have an account?{" "}
        <Link
          href="/sign-in"
          className="text-amber-500 hover:text-amber-600 font-medium transition-colors"
        >
          Sign In
        </Link>
      </p>
    </SignUpPanel>
  );
}

export function PhoneSignUpPanel() {
  const router = useRouter();
  const [agreed, setAgreed] = useState(true);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleCreateAccount = async () => {
    const payload = { phone, password, agreed, channel: "phone" };
    void payload;
    router.push("/sign-up/verify-phone");
  };

  return (
    <SignUpPanel
      eyebrow="Join with phone"
      title={
        <>
          Create your free
          <br />
          account
        </>
      }
      description="Use your phone number to create your marketplace profile."
    >
      <div className="grid grid-cols-2 gap-4">
        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center justify-center gap-3 py-3.5 rounded-xl border border-stone-200 bg-white text-amber-500 text-sm tracking-wide shadow-sm hover:border-amber-300 transition-colors"
        >
          <FcGoogle size={18} />
          Google
        </motion.button>
        <Link
          href="/sign-up"
          className="flex items-center justify-center gap-3 py-3.5 rounded-xl border border-stone-200 bg-white text-amber-500 text-sm tracking-wide shadow-sm hover:border-amber-300 transition-colors"
        >
          <FiMail size={20} />
          Email
        </Link>
      </div>

      <Divider label="or with phone" />

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <FieldLabel>Phone number (optional)</FieldLabel>
          <div className="grid grid-cols-[142px_1fr] gap-3">
            <button
              type="button"
              className="flex items-center justify-center gap-3 rounded-xl border border-stone-300 bg-transparent px-3 py-3 text-stone-700"
            >
              <span className="grid h-6 w-8 grid-cols-3 overflow-hidden rounded-sm">
                <span className="bg-emerald-600" />
                <span className="bg-white" />
                <span className="bg-emerald-600" />
              </span>
              <FiChevronDown size={14} className="text-stone-700" />
              <span className="text-sm">+234</span>
            </button>
            <input
              type="tel"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
              placeholder="801 234 506"
              className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-transparent text-stone-700 text-sm placeholder:text-stone-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all duration-200"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <FieldLabel>Password</FieldLabel>
          <PasswordField value={password} onChange={setPassword} />
        </div>
      </div>

      <TermsCheckbox
        agreed={agreed}
        onToggle={() => setAgreed((value) => !value)}
      />
      <PrimaryButton onClick={handleCreateAccount}>
        Create Account
      </PrimaryButton>
    </SignUpPanel>
  );
}

export function OtpVerificationPanel({
  channel,
}: {
  channel: "email" | "phone";
}) {
  const router = useRouter();
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const label = channel === "email" ? "email" : "number";

  const handleOtpChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    setOtp((current) => {
      const next = [...current];
      next[index] = digit;
      return next;
    });

    if (digit && index < inputsRef.current.length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (
    index: number,
    event: KeyboardEvent<HTMLInputElement>,
  ) => {
    if (event.key === "Backspace" && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  const handleVerifyOtp = async () => {
    const payload = { channel, otp: otp.join("") };
    void payload;
    router.push("/sign-up/success");
  };

  const handleResendOtp = async () => {
    const payload = { channel };
    void payload;
  };

  return (
    <SignUpPanel title={`Verify your ${label}`} wide>
      <div className="flex flex-col gap-3">
        <FieldLabel>Enter OTP</FieldLabel>
        <div className="grid grid-cols-6 gap-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              ref={(node) => {
                inputsRef.current[index] = node;
              }}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(event) => handleOtpChange(index, event.target.value)}
              onKeyDown={(event) => handleOtpKeyDown(index, event)}
              className="h-[74px] rounded border border-stone-200 bg-white text-center text-3xl text-stone-700 shadow-sm outline-none transition-all duration-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-100"
              aria-label={`OTP digit ${index + 1}`}
            />
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-14 sm:px-20">
        <button
          type="button"
          onClick={handleResendOtp}
          className="rounded-lg border border-amber-300 py-2.5 text-xs font-medium text-amber-400 hover:bg-amber-50 transition-colors"
        >
          Resend OTP
        </button>
        <button
          type="button"
          onClick={handleVerifyOtp}
          className="rounded-lg bg-amber-400 py-2.5 text-center text-xs font-medium text-stone-900 hover:bg-amber-500 transition-colors"
        >
          Verify
        </button>
      </div>
    </SignUpPanel>
  );
}

export function AccountCreatedPanel() {
  return (
    <SignUpPanel>
      <div>
        <h3 className="text-4xl font-semibold text-amber-400">
          Account created successfully
        </h3>
        <img
          src="/success.png"
          alt="Checkmark"
          className="mx-auto mt-4 h-96 w-96"
        />
      </div>

      <PrimaryLink href="/">Continue</PrimaryLink>
    </SignUpPanel>
  );
}
