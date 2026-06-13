"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowIcon } from "./icons/Icons";
import { API_URL } from "@/lib/api";

// ─── Types ────────────────────────────────────────────────────────────────────

type FormValues = {
  first: string;
  last: string;
  email: string;
  phone: string;
  msg: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

// ─── Validation ───────────────────────────────────────────────────────────────

function validateField(name: keyof FormValues, value: string): string {
  switch (name) {
    case "first":
      if (!value.trim()) return "Please enter your first name.";
      if (/\d/.test(value)) return "First name must not contain numbers.";
      return "";
    case "last":
      if (!value.trim()) return "Please enter your last name.";
      if (/\d/.test(value)) return "Last name must not contain numbers.";
      return "";
    case "email":
      if (!value.trim()) return "Please enter your email address.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()))
        return "Please enter a valid email address.";
      return "";
    case "msg": {
      if (!value.trim()) return "Please let us know how we can help.";
      if (value.length > 4000) return `Please keep your message under 4,000 characters (currently ${value.length}).`;
      const words = value.trim().split(/\s+/).filter(Boolean).length;
      if (words > 500) return `Please keep your message under 500 words (currently ${words}).`;
      return "";
    }
    case "phone": {
      // User types the national portion only (e.g. "412 345 678" or "0412 345 678").
      // Strip spaces then accept: optional leading 0 + valid AU prefix (2,3,4,7,8) + 8 digits.
      const digits = value.replace(/\s/g, "");
      if (!digits) return "Please enter your phone number.";
      if (!/^0?[2-478]\d{8}$/.test(digits))
        return "Enter a valid Australian phone number (e.g. 412 345 678).";
      return "";
    }
  }
}

function validateAll(values: FormValues): FormErrors {
  const errors: FormErrors = {};
  (Object.keys(values) as (keyof FormValues)[]).forEach((key) => {
    const msg = validateField(key, values[key]);
    if (msg) errors[key] = msg;
  });
  return errors;
}

// ─── Phone normalization ───────────────────────────────────────────────────────
//
// The user types only the national portion after the fixed "+61" prefix chip.
// We strip spaces, drop any leading 0 (since +61 already replaces the trunk prefix),
// then produce "+61 XXXXXXXXX" — a format the backend regex accepts:
//   /^(\+?61\s?0?|0)[2-478]\d{8}$/
//
// Examples:
//   "412 345 678"  → "+61 412345678"
//   "0412 345 678" → "+61 412345678"  (leading 0 stripped)

function normalizePhone(raw: string): string {
  const digits = raw.replace(/\s/g, "");
  const national = digits.startsWith("0") ? digits.slice(1) : digits;
  return `+61 ${national}`;
}

// ─── Field component ──────────────────────────────────────────────────────────

interface FieldProps {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  textarea?: boolean;
  maxWords?: number;
  maxChars?: number;
  prefix?: React.ReactNode;
  value: string;
  error?: string;
  onChange: (name: string, value: string) => void;
}

function Field({
  name,
  label,
  type = "text",
  required,
  placeholder,
  autoComplete,
  inputMode,
  textarea,
  maxWords,
  maxChars,
  prefix,
  value,
  error,
  onChange,
}: FieldProps) {
  const baseInput =
    "font-sans text-base text-[var(--color-ink)] bg-white rounded-xl px-4 py-[14px] w-full transition-all duration-150 placeholder:text-[#9aa3a0] focus:outline-none";

  const borderOk =
    "border-[1.5px] border-[var(--color-line-2)] hover:border-[#c2c8c4] focus:border-[var(--color-green)] focus:shadow-[0_0_0_4px_var(--color-green-tint)]";

  const borderErr =
    "border-[1.5px] border-[#e0564f] shadow-[0_0_0_4px_rgba(224,86,79,0.12)] focus:border-[#e0564f] focus:shadow-[0_0_0_4px_rgba(224,86,79,0.12)]";

  const inputClass = `${baseInput} ${error ? borderErr : borderOk}`;

  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="text-[13px] font-semibold text-[var(--color-ink-soft)] mb-[7px]">
        {label} {required && <span className="text-[var(--color-green-700)]">*</span>}
      </label>

      {textarea ? (
        <>
          <textarea
            id={name}
            name={name}
            placeholder={placeholder}
            value={value}
            autoComplete={autoComplete}
            onChange={(e) => onChange(name, e.target.value)}
            aria-describedby={error ? `${name}-error` : undefined}
            aria-invalid={!!error}
            className={`${inputClass} resize-y min-h-[132px] leading-[1.5]`}
          />
        </>
      ) : prefix ? (
        <div
          className={[
            "flex items-stretch rounded-xl bg-white transition-all duration-150",
            error
              ? "border-[1.5px] border-[#e0564f] shadow-[0_0_0_4px_rgba(224,86,79,0.12)]"
              : "border-[1.5px] border-[var(--color-line-2)] hover:border-[#c2c8c4] focus-within:border-[var(--color-green)] focus-within:shadow-[0_0_0_4px_var(--color-green-tint)]",
          ].join(" ")}
        >
          <span className="flex items-center gap-2 px-[14px] text-base font-bold text-[var(--color-ink-soft)] bg-[var(--color-surface)] border-r border-[var(--color-line-2)] rounded-l-[11px] whitespace-nowrap">
            {prefix}
          </span>
          <input
            id={name}
            name={name}
            type={type}
            placeholder={placeholder}
            value={value}
            autoComplete={autoComplete}
            inputMode={inputMode}
            onChange={(e) => onChange(name, e.target.value)}
            aria-describedby={error ? `${name}-error` : undefined}
            aria-invalid={!!error}
            className="font-sans text-base text-[var(--color-ink)] bg-white rounded-r-xl px-4 py-[14px] w-full focus:outline-none placeholder:text-[#9aa3a0]"
          />
        </div>
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          autoComplete={autoComplete}
          inputMode={inputMode}
          onChange={(e) => onChange(name, e.target.value)}
          aria-describedby={error ? `${name}-error` : undefined}
          aria-invalid={!!error}
          className={inputClass}
        />
      )}

      {error && (
        <span id={`${name}-error`} role="alert" className="mt-1.5 text-[12.5px] font-semibold text-[#d8463f]">
          {error}
        </span>
      )}
    </div>
  );
}

// ─── Form ─────────────────────────────────────────────────────────────────────

export default function ContactForm() {
  const [values, setValues] = useState<FormValues>({
    first: "",
    last: "",
    email: "",
    phone: "",
    msg: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [sending, setSending] = useState(false);
  const router = useRouter();

  // Re-validate a field only if it already has an error (clears as user corrects).
  function handleChange(name: string, value: string) {
    setValues((v) => ({ ...v, [name]: value }));
    if (errors[name as keyof FormValues]) {
      const msg = validateField(name as keyof FormValues, value);
      setErrors((e) => ({ ...e, [name]: msg }));
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const next = validateAll(values);
    if (Object.keys(next).length) {
      setErrors(next);
      // Focus the first invalid field
      const firstInvalid = document.querySelector<HTMLElement>("[aria-invalid='true']");
      firstInvalid?.focus();
      return;
    }

    setSending(true);
    try {
      await fetch(`${API_URL}/contacts`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName: values.first.trim(),
          lastName: values.last.trim(),
          email: values.email.trim(),
          phone: normalizePhone(values.phone),  // "+61 XXXXXXXXX"
          note: values.msg.trim(),
        }),
      });
      router.push(`/thank-you?name=${encodeURIComponent(values.first.trim())}`);
    } catch {
      setErrors({ msg: "Something went wrong. Please try again." });
    } finally {
      setSending(false);
    }
  }

  const auPrefix = (
    <>
      <span className="text-[11px] font-extrabold tracking-[0.04em] text-[var(--color-green-700)] bg-[var(--color-green-tint)] px-1.5 py-0.5 rounded-[6px]">
        AU
      </span>
      +61
    </>
  );

  return (
    <section className="bg-[var(--color-surface)] border border-[var(--color-line)] rounded-[22px] p-[clamp(26px,3.4vw,42px)] lg:sticky lg:top-7">
      <p className="text-[1.18rem] font-bold tracking-[-0.01em] leading-[1.4] m-0 mb-[26px] text-[var(--color-ink)]">
        Fill in your details and we&rsquo;ll be in touch right away.
      </p>

      <form onSubmit={handleSubmit} noValidate className="grid gap-4">
        <div className="grid grid-cols-2 gap-4 max-[480px]:grid-cols-1">
          <Field name="first" label="First name" required placeholder="Jane" autoComplete="given-name"
            value={values.first} error={errors.first} onChange={handleChange} />
          <Field name="last" label="Last name" required placeholder="Doe" autoComplete="family-name"
            value={values.last} error={errors.last} onChange={handleChange} />
        </div>

        <Field name="email" label="Email address" type="email" required placeholder="jane@email.com" autoComplete="email"
          value={values.email} error={errors.email} onChange={handleChange} />

        <Field name="phone" label="Phone number" type="tel" required prefix={auPrefix}
          placeholder="400 000 000" autoComplete="tel" inputMode="tel"
          value={values.phone} error={errors.phone} onChange={handleChange} />

        <Field name="msg" label="What would you like to talk about?" required textarea maxWords={500} maxChars={4000}
          placeholder="Tell us a little about what you need…"
          value={values.msg} error={errors.msg} onChange={handleChange} />

        <button
          type="submit"
          disabled={sending}
          className="mt-1.5 inline-flex items-center justify-center gap-2.5 font-bold text-base tracking-[0.02em] text-white bg-[var(--color-green)] border-none rounded-[13px] px-6 py-[17px] cursor-pointer shadow-[0_10px_24px_-10px_rgba(14,142,74,0.6)] hover:bg-[var(--color-green-700)] hover:-translate-y-0.5 hover:shadow-[0_16px_30px_-12px_rgba(14,142,74,0.65)] active:translate-y-0 transition-all duration-150 group disabled:opacity-60 disabled:cursor-default disabled:transform-none disabled:shadow-none"
        >
          {sending ? "Sending…" : "Send message"}
          {!sending && <ArrowIcon className="w-[18px] h-[18px] group-hover:translate-x-[3px] transition-transform duration-150" />}
        </button>

        <p className="mt-4 mb-0 text-[13.5px] text-[var(--color-muted)] leading-[1.55]">
          All fields required. By sending a message you agree to our{" "}
          <Link href="#" className="text-[var(--color-green-700)] font-semibold no-underline border-b border-[var(--color-green-tint2)] hover:border-[var(--color-green)] transition-colors duration-150">
            Terms &amp; Conditions
          </Link>{" "}
          and{" "}
          <Link href="#" className="text-[var(--color-green-700)] font-semibold no-underline border-b border-[var(--color-green-tint2)] hover:border-[var(--color-green)] transition-colors duration-150">
            Privacy Policy
          </Link>
          .
        </p>
      </form>
    </section>
  );
}
