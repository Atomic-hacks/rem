"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import type { ReactNode } from "react";
import { useState } from "react";
import { FcGoogle } from "react-icons/fc";
import {
  FiCheck,
  FiCheckCircle,
  FiChevronDown,
  FiEye,
  FiEyeOff,
  FiLock,
  FiMail,
  FiPhone,
} from "react-icons/fi";

const panelMotion = {
  initial: { opacity: 0, x: 24 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] as const },
};

function AuthPanel({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  description?: string;
  children: ReactNode;
}) {
  return (
    <motion.div {...panelMotion} className="w-full max-w-md flex flex-col gap-7">
      <div className="flex flex-col gap-2">
        <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-amber-500">
          {eyebrow}
        </p>
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
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="relative">
      <input
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 pr-11 rounded-xl border border-stone-200 bg-white text-stone-700 text-sm placeholder:text-stone-300 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all duration-200"
      />
      <button
        type="button"
        onClick={() => setShowPassword((current) => !current)}
        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 transition-colors cursor-pointer"
        aria-label={showPassword ? "Hide password" : "Show password"}
      >
        {showPassword ? <FiEyeOff size={16} /> : <FiEye size={16} />}
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
      <button type="button" onClick={onToggle} className="shrink-0 cursor-pointer">
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
        className="block w-full py-3.5 rounded-xl bg-amber-400 hover:bg-amber-500 text-white text-center font-semibold text-sm tracking-wide transition-colors duration-200 shadow-sm"
      >
        {children}
      </Link>
    </motion.div>
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

export default function SignUpPage() {
  const [role, setRole] = useState<"buyer" | "agent">("buyer");
  const [agreed, setAgreed] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <AuthPanel
      eyebrow="Join the Marketplace"
      title={
        <>
          Create your
          <br />
          account
        </>
      }
      description="Sign up and continue your search to save homes, chat with agents and reveal full contact details."
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
            {item === "buyer" ? "I'm looking for a home" : "I'm an agent / landlord"}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-3">
        <motion.button
          type="button"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="flex items-center justify-center gap-2.5 py-3 rounded-xl border border-stone-200 bg-white text-stone-600 text-sm font-light hover:border-amber-300 transition-colors duration-200 cursor-pointer"
        >
          <FcGoogle size={18} />
          Google
        </motion.button>
        <Link
          href="/sign-up/phone"
          className="flex items-center justify-center gap-2.5 py-3 rounded-xl border border-stone-200 bg-white text-stone-600 text-sm font-light hover:border-amber-300 transition-colors duration-200"
        >
          <FiPhone size={16} className="text-amber-500" />
          Phone
        </Link>
      </div>

      <Divider label="or with email" />

      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <FieldLabel>Email address</FieldLabel>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@example.com"
            className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-white text-stone-700 text-sm placeholder:text-stone-300 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all duration-200"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <FieldLabel>Password</FieldLabel>
          <PasswordField value={password} onChange={setPassword} />
        </div>
      </div>

      <div className="flex items-center justify-between gap-4">
        <TermsCheckbox agreed={agreed} onToggle={() => setAgreed((value) => !value)} />
        <Link
          href="/forgot-password"
          className="shrink-0 text-[12.5px] font-medium text-amber-500 hover:text-amber-600"
        >
          Forgot?
        </Link>
      </div>

      <PrimaryLink href="/sign-up/success">Create Account</PrimaryLink>

      <p className="text-center text-[12.5px] text-stone-400 font-light">
        Already have an account?{" "}
        <Link
          href="/sign-up"
          className="text-amber-500 hover:text-amber-600 font-medium transition-colors"
        >
          Sign in
        </Link>
      </p>
    </AuthPanel>
  );
}

export function PhoneSignUpPanel() {
  const [agreed, setAgreed] = useState(true);
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  return (
    <AuthPanel
      eyebrow="Join with phone"
      title={
        <>
          Sign up with
          <br />
          your phone
        </>
      }
      description="Use your mobile number to create an account and receive property updates faster."
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

      <TermsCheckbox agreed={agreed} onToggle={() => setAgreed((value) => !value)} />
      <PrimaryLink href="/sign-up/success">Create Account</PrimaryLink>
    </AuthPanel>
  );
}

export function AccountCreatedPanel() {
  return (
    <AuthPanel
      eyebrow="Account Created"
      title={
        <>
          Welcome to
          <br />
          REM
        </>
      }
      description="Your account has been created successfully. You can now save listings, contact agents and continue exploring properties."
    >
      <div className="flex flex-col items-center gap-5 rounded-2xl border border-amber-100 bg-white/80 px-6 py-8 text-center shadow-sm">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-amber-100 text-amber-500">
          <FiCheck size={32} />
        </span>
        <div>
          <h3 className="text-xl font-semibold text-stone-800">
            Account created successfully
          </h3>
          <p className="mt-2 text-sm font-light leading-relaxed text-stone-500">
            Your marketplace profile is ready. Start browsing homes or complete
            your profile from your dashboard.
          </p>
        </div>
      </div>

      <PrimaryLink href="/">Continue</PrimaryLink>
    </AuthPanel>
  );
}

export function ForgotPasswordPanel() {
  const [email, setEmail] = useState("");

  return (
    <AuthPanel
      eyebrow="Password Help"
      title={
        <>
          Forgot your
          <br />
          password?
        </>
      }
      description="Enter your email address and we will send you instructions to reset your password."
    >
      <div className="flex flex-col gap-1.5">
        <FieldLabel>Email address</FieldLabel>
        <input
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          placeholder="you@example.com"
          className="w-full px-4 py-3 rounded-xl border border-stone-200 bg-white text-stone-700 text-sm placeholder:text-stone-300 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all duration-200"
        />
      </div>

      <PrimaryLink href="/reset-password">Send Reset Link</PrimaryLink>

      <p className="text-center text-[12.5px] text-stone-400 font-light">
        Remembered your password?{" "}
        <Link
          href="/sign-up"
          className="text-amber-500 hover:text-amber-600 font-medium transition-colors"
        >
          Back to sign in
        </Link>
      </p>
    </AuthPanel>
  );
}

export function ResetPasswordPanel() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <AuthPanel
      eyebrow="Reset Password"
      title={
        <>
          Create a new
          <br />
          password
        </>
      }
      description="Choose a secure password you have not used on this account before."
    >
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <FieldLabel>New password</FieldLabel>
          <PasswordField value={password} onChange={setPassword} />
        </div>
        <div className="flex flex-col gap-1.5">
          <FieldLabel>Confirm password</FieldLabel>
          <PasswordField
            value={confirmPassword}
            onChange={setConfirmPassword}
            placeholder="Repeat your password"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 rounded-xl border border-amber-100 bg-white/70 px-4 py-3 text-sm text-stone-500">
        <FiLock className="shrink-0 text-amber-500" size={16} />
        Passwords should be at least 8 characters.
      </div>

      <PrimaryLink href="/sign-up/success">Reset Password</PrimaryLink>
    </AuthPanel>
  );
}
