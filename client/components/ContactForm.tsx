"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowIcon } from "./icons/Icons";

interface FieldProps {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  autoComplete?: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  textarea?: boolean;
  prefix?: React.ReactNode;
  value: string;
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
  prefix,
  value,
  onChange,
}: FieldProps) {
  const inputClass =
    "font-sans text-base text-[var(--color-ink)] bg-white border-[1.5px] border-[var(--color-line-2)] rounded-xl px-4 py-[14px] w-full transition-all duration-150 placeholder:text-[#9aa3a0] hover:border-[#c2c8c4] focus:outline-none focus:border-[var(--color-green)] focus:shadow-[0_0_0_4px_var(--color-green-tint)]";

  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="text-[13px] font-semibold text-[var(--color-ink-soft)] mb-[7px]">
        {label} {required && <span className="text-[var(--color-green-700)]">*</span>}
      </label>

      {textarea ? (
        <textarea
          id={name}
          name={name}
          placeholder={placeholder}
          value={value}
          autoComplete={autoComplete}
          onChange={(e) => onChange(name, e.target.value)}
          className={`${inputClass} resize-y min-h-[132px] leading-[1.5]`}
        />
      ) : prefix ? (
        <div className="flex items-stretch border-[1.5px] border-[var(--color-line-2)] rounded-xl bg-white transition-all duration-150 hover:border-[#c2c8c4] focus-within:border-[var(--color-green)] focus-within:shadow-[0_0_0_4px_var(--color-green-tint)]">
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
          className={inputClass}
        />
      )}
    </div>
  );
}

export default function ContactForm() {
  const [values, setValues] = useState({
    first: "",
    last: "",
    email: "",
    phone: "",
    msg: "",
  });

  function handleChange(name: string, value: string) {
    setValues((v) => ({ ...v, [name]: value }));
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

      <form onSubmit={(e) => e.preventDefault()} noValidate className="grid gap-4">
        <div className="grid grid-cols-2 gap-4 max-[480px]:grid-cols-1">
          <Field name="first" label="First name" required placeholder="Jane" autoComplete="given-name" value={values.first} onChange={handleChange} />
          <Field name="last"  label="Last name"  required placeholder="Doe"  autoComplete="family-name" value={values.last}  onChange={handleChange} />
        </div>

        <Field name="email" label="Email address" type="email" required placeholder="jane@email.com" autoComplete="email" value={values.email} onChange={handleChange} />

        <Field name="phone" label="Phone number" type="tel" required prefix={auPrefix} placeholder="400 000 000" autoComplete="tel" inputMode="tel" value={values.phone} onChange={handleChange} />

        <Field name="msg" label="What would you like to talk about?" required textarea placeholder="Tell us a little about what you need…" value={values.msg} onChange={handleChange} />

        <button
          type="submit"
          className="mt-1.5 inline-flex items-center justify-center gap-2.5 font-bold text-base tracking-[0.02em] text-white bg-[var(--color-green)] border-none rounded-[13px] px-6 py-[17px] cursor-pointer shadow-[0_10px_24px_-10px_rgba(14,142,74,0.6)] hover:bg-[var(--color-green-700)] hover:-translate-y-0.5 hover:shadow-[0_16px_30px_-12px_rgba(14,142,74,0.65)] active:translate-y-0 transition-all duration-150 group"
        >
          Send message
          <ArrowIcon className="w-[18px] h-[18px] group-hover:translate-x-[3px] transition-transform duration-150" />
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
