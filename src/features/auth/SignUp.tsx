/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useRouter } from "next/navigation";
import type { ChangeEvent, KeyboardEvent, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
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
import {
  ApiError,
  activateUser,
  clearPendingActivationEmail,
  getCurrentUser,
  getPendingActivationEmail,
  loginUser,
  persistAgentOnboardingToken,
  persistAuthSession,
  persistAuthUser,
  registerUser,
  resendActivation,
  setPendingActivationEmail,
  type AgentType,
} from "@/services/auth";
import {
  clearPendingAuthCredentials,
  getPendingAuthCredentials,
  getStoredAuthIntent,
  persistAuthIntent,
  persistPendingAuthCredentials,
  routeForAuthenticatedUser,
} from "./auth-routing";

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
        <Link href="/terms" className="text-amber-500 hover:underline font-medium">
          Terms
        </Link>{" "}
        and{" "}
        <Link href="/privacy" className="text-amber-500 hover:underline font-medium">
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
  disabled = false,
}: {
  children: ReactNode;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      disabled={disabled}
      className="w-full py-3.5 rounded-xl bg-amber-400 hover:bg-amber-500 disabled:bg-stone-300 disabled:cursor-not-allowed text-center text-white font-semibold text-sm tracking-wide transition-colors duration-200 shadow-sm cursor-pointer"
    >
      {children}
    </motion.button>
  );
}

function Feedback({ message, tone }: { message: string; tone: "error" | "success" }) {
  return (
    <p
      className={`rounded-xl border px-4 py-3 text-sm ${
        tone === "error"
          ? "border-red-100 bg-red-50 text-red-600"
          : "border-emerald-100 bg-emerald-50 text-emerald-600"
      }`}
    >
      {message}
    </p>
  );
}

function normalizeNigerianPhone(phone: string) {
  const digits = phone.replace(/\D/g, "");

  if (phone.trim().startsWith("+")) {
    return `+${digits}`;
  }

  if (digits.startsWith("234")) {
    return `+${digits}`;
  }

  return `+234${digits.replace(/^0/, "")}`;
}

function hasEmptyRequiredFields(fields: string[]) {
  return fields.some((field) => !field.trim());
}

function getOtpVerificationError(error: unknown) {
  if (error instanceof ApiError && error.status === 403) {
    return "This OTP is invalid, expired, or already used. Request a new code and try again.";
  }

  return error instanceof Error ? error.message : "Unable to verify your account.";
}

function getOtpResendError(error: unknown) {
  if (error instanceof ApiError && [400, 401, 403].includes(error.status)) {
    return "The server rejected the resend request. Go back to sign up and submit the form again to generate a fresh OTP.";
  }

  return error instanceof Error ? error.message : "Unable to resend activation code.";
}

export default function SignUpPage() {
  const router = useRouter();
  const [role, setRole] = useState<"buyer" | "agent">("buyer");
  const [agentType, setAgentType] = useState<AgentType>("Real Estate Agent");
  const [agreed, setAgreed] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ message: string; tone: "error" | "success" } | null>(null);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirm: "",
  });

  useEffect(() => {
    setRole(getStoredAuthIntent());
  }, []);

  const selectRole = (nextRole: "buyer" | "agent") => {
    setRole(nextRole);
    persistAuthIntent(nextRole);
  };

  const handleChange =
    (field: keyof typeof form) => (event: ChangeEvent<HTMLInputElement>) =>
      setForm((current) => ({ ...current, [field]: event.target.value }));

  const handleCreateAccount = async () => {
    setFeedback(null);

    if (!agreed) {
      setFeedback({ message: "Please accept the terms to continue.", tone: "error" });
      return;
    }

    if (hasEmptyRequiredFields([form.firstName, form.lastName, form.email, form.password, form.confirm])) {
      setFeedback({ message: "Please fill in all required fields.", tone: "error" });
      return;
    }

    if (form.password !== form.confirm) {
      setFeedback({ message: "Passwords do not match.", tone: "error" });
      return;
    }

    if (role === "agent") {
      persistAuthIntent("agent");

      try {
        setIsSubmitting(true);
        const response = await registerUser({
          firstName: form.firstName,
          lastName: form.lastName,
          authProvider: "email",
          email: form.email,
          password: form.password,
          rePassword: form.confirm,
          agentType,
        });

        if (response.onboarding_token) {
          persistAgentOnboardingToken(response.onboarding_token);
        }

        setPendingActivationEmail(form.email);
        persistPendingAuthCredentials(form.email, form.password);
        router.push("/auth/register/verify-email");
      } catch (error) {
        setFeedback({
          message: error instanceof Error ? error.message : "Unable to create agent account.",
          tone: "error",
        });
      } finally {
        setIsSubmitting(false);
      }

      return;
    }

    // Buyer path — role is narrowed to "buyer" here, so agentType is always undefined.
    try {
      setIsSubmitting(true);
      await registerUser({
        firstName: form.firstName,
        lastName: form.lastName,
        authProvider: "email",
        email: form.email,
        password: form.password,
        rePassword: form.confirm,
        agentType: undefined,
      });
      setPendingActivationEmail(form.email);
      router.push("/auth/register/verify-email");
    } catch (error) {
      setFeedback({
        message: error instanceof Error ? error.message : "Unable to create account.",
        tone: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
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
            onClick={() => selectRole(item)}
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

      {role === "agent" ? (
        <div className="grid grid-cols-2 gap-3">
          {(["Real Estate Agent", "Property Manager"] as const).map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => setAgentType(type)}
              className={`rounded-xl border px-3 py-3 text-sm font-medium transition-colors ${
                agentType === type
                  ? "border-amber-400 bg-amber-400 text-white"
                  : "border-stone-200 bg-white text-stone-500 hover:border-amber-300"
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      ) : null}

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
          href="/auth/register/phone"
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
      {feedback ? <Feedback {...feedback} /> : null}
      <PrimaryButton onClick={handleCreateAccount} disabled={isSubmitting}>
        {isSubmitting ? "Creating account..." : "Create Account"}
      </PrimaryButton>

      <p className="text-center text-[12.5px] text-stone-400 font-light">
        Already have an account?{" "}
        <Link
          href="/auth/login"
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
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ message: string; tone: "error" | "success" } | null>(null);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleCreateAccount = async () => {
    setFeedback(null);

    if (!agreed) {
      setFeedback({ message: "Please accept the terms to continue.", tone: "error" });
      return;
    }

    if (hasEmptyRequiredFields([form.firstName, form.lastName, form.email, form.phone, form.password])) {
      setFeedback({ message: "Please fill in all required fields.", tone: "error" });
      return;
    }

    try {
      setIsSubmitting(true);
      await registerUser({
        firstName: form.firstName,
        lastName: form.lastName,
        authProvider: "phone",
        email: form.email,
        phoneNumber: normalizeNigerianPhone(form.phone),
        password: form.password,
        rePassword: form.password,
      });
      setPendingActivationEmail(form.email);
      router.push("/auth/register/verify-phone");
    } catch (error) {
      setFeedback({
        message: error instanceof Error ? error.message : "Unable to create account.",
        tone: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
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
          href="/auth/register"
          className="flex items-center justify-center gap-3 py-3.5 rounded-xl border border-stone-200 bg-white text-amber-500 text-sm tracking-wide shadow-sm hover:border-amber-300 transition-colors"
        >
          <FiMail size={20} />
          Email
        </Link>
      </div>

      <Divider label="or with phone" />

      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <FieldLabel>First name</FieldLabel>
            <input
              type="text"
              value={form.firstName}
              onChange={(event) =>
                setForm((current) => ({ ...current, firstName: event.target.value }))
              }
              placeholder="John"
              className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-transparent text-stone-700 text-sm placeholder:text-stone-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all duration-200"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <FieldLabel>Last name</FieldLabel>
            <input
              type="text"
              value={form.lastName}
              onChange={(event) =>
                setForm((current) => ({ ...current, lastName: event.target.value }))
              }
              placeholder="D. Law"
              className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-transparent text-stone-700 text-sm placeholder:text-stone-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all duration-200"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <FieldLabel>Email address</FieldLabel>
          <input
            type="email"
            value={form.email}
            onChange={(event) =>
              setForm((current) => ({ ...current, email: event.target.value }))
            }
            placeholder="you@example.com"
            className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-transparent text-stone-700 text-sm placeholder:text-stone-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all duration-200"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <FieldLabel>Phone number</FieldLabel>
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
              value={form.phone}
              onChange={(event) =>
                setForm((current) => ({ ...current, phone: event.target.value }))
              }
              placeholder="801 234 506"
              className="w-full px-4 py-3 rounded-xl border border-stone-300 bg-transparent text-stone-700 text-sm placeholder:text-stone-400 focus:outline-none focus:border-amber-400 focus:ring-2 focus:ring-amber-100 transition-all duration-200"
            />
          </div>
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
      </div>

      <TermsCheckbox
        agreed={agreed}
        onToggle={() => setAgreed((value) => !value)}
      />
      {feedback ? <Feedback {...feedback} /> : null}
      <PrimaryButton onClick={handleCreateAccount} disabled={isSubmitting}>
        {isSubmitting ? "Creating account..." : "Create Account"}
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
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ message: string; tone: "error" | "success" } | null>(null);
  const inputsRef = useRef<Array<HTMLInputElement | null>>([]);
  const label = channel === "email" ? "email" : "number";

  useEffect(() => {
    setEmail(getPendingActivationEmail());
  }, []);

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
    setFeedback(null);

    if (hasEmptyRequiredFields([email, otp.join("")]) || otp.join("").length < 6) {
      setFeedback({ message: "Enter your email and complete OTP.", tone: "error" });
      return;
    }

    try {
      setIsSubmitting(true);
      await activateUser({ email, token: otp.join("") });
      clearPendingActivationEmail();

      if (getStoredAuthIntent() === "agent") {
        const credentials = getPendingAuthCredentials();
        if (!credentials) {
          router.push("/auth/login");
          return;
        }

        const tokens = await loginUser({
          identifier: credentials.email,
          password: credentials.password,
        });
        persistAuthSession(tokens);

        const user = await getCurrentUser(tokens.access);
        persistAuthUser(user);
        clearPendingAuthCredentials();

        // We are already in the agent intent branch — route directly to onboarding
        // rather than re-deriving the destination from user.role, which the backend
        // may not have assigned yet at this point in the flow.
        router.push("/agent-Onboarding/proffessionalDetails");
        return;
      }

      router.push("/auth/register/success");
    } catch (error) {
      setFeedback({
        message: getOtpVerificationError(error),
        tone: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResendOtp = async () => {
    setFeedback(null);

    if (!email.trim()) {
      setFeedback({ message: "Enter your email before resending OTP.", tone: "error" });
      return;
    }

    try {
      await resendActivation(email);
      setFeedback({ message: "Activation code sent again.", tone: "success" });
    } catch (error) {
      setFeedback({
        message: getOtpResendError(error),
        tone: "error",
      });
    }
  };

  return (
    <SignUpPanel title={`Verify your ${label}`} wide>
      <div className="flex flex-col gap-3">
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
        {feedback ? (
          <div className="sm:col-span-2">
            <Feedback {...feedback} />
          </div>
        ) : null}
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
          disabled={isSubmitting}
          className="rounded-lg bg-amber-400 py-2.5 text-center text-xs font-medium text-stone-900 hover:bg-amber-500 disabled:bg-stone-300 disabled:cursor-not-allowed transition-colors"
        >
          {isSubmitting ? "Verifying..." : "Verify"}
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