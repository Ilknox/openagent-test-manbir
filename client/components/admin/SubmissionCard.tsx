"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckIcon, TrashIcon, PhoneIcon } from "@/components/icons/Icons";

export type Contact = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  note: string;
  isVerified: boolean;
  createdAt: string;
};

function initials(first: string, last: string) {
  return ((first[0] ?? "") + (last[0] ?? "")).toUpperCase();
}

function formatSubmittedAt(dateStr: string): string {
  const d = new Date(dateStr);
  const time = d.toLocaleTimeString("en-AU", { hour: "2-digit", minute: "2-digit", hour12: true });
  const date = d.toLocaleDateString("en-AU", { day: "numeric", month: "short", year: "numeric" });
  return `${time} · ${date}`;
}

interface Props {
  contact: Contact;
  onToggle: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function SubmissionCard({ contact, onToggle, onDelete }: Props) {
  const [confirming, setConfirming] = useState(false);

  return (
    <div className="flex flex-col gap-[13px] border border-[var(--color-line)] rounded-[14px] bg-white p-[18px_20px] transition-all duration-150 hover:border-[var(--color-line-2)] hover:shadow-[0_8px_30px_-12px_rgba(20,40,28,0.18),0_2px_8px_-4px_rgba(20,40,28,0.10)]">

      {/* Top row: avatar + name/email + badge */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-[13px] min-w-0">
          <span className="flex-none w-[42px] h-[42px] rounded-full bg-[var(--color-green-tint)] text-[var(--color-green-700)] grid place-items-center font-extrabold text-[0.95rem]">
            {initials(contact.firstName, contact.lastName)}
          </span>
          <span className="min-w-0 flex flex-col">
            <span className="font-bold text-[var(--color-ink)] truncate">
              {contact.firstName} {contact.lastName}
            </span>
            <span className="text-[0.9rem] text-[var(--color-muted)] truncate">{contact.email}</span>
          </span>
        </div>

        {contact.isVerified ? (
          <span className="inline-flex items-center gap-1.5 text-[0.82rem] font-bold px-[11px] py-[5px] rounded-full whitespace-nowrap bg-[var(--color-green-tint)] text-[var(--color-green-800)]">
            <CheckIcon className="w-[13px] h-[13px] stroke-[var(--color-green-700)]" />
            Verified
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 text-[0.82rem] font-bold px-[11px] py-[5px] rounded-full whitespace-nowrap bg-[#fdf1dd] text-[#a96a10]">
            <span className="w-[7px] h-[7px] rounded-full bg-[#e8a13a]" />
            Pending
          </span>
        )}
      </div>

      {/* Phone */}
      <Link
        href={`tel:${contact.phone.replace(/\s/g, "")}`}
        className="inline-flex items-center gap-2 font-semibold text-[var(--color-ink-soft)] no-underline hover:text-[var(--color-green-700)] transition-colors duration-150 tabular-nums"
      >
        <PhoneIcon className="w-[15px] h-[15px] stroke-[var(--color-green-700)] flex-none" />
        {contact.phone}
      </Link>

      {/* Note */}
      <p className="m-0 text-[var(--color-ink-soft)] text-[0.97rem] leading-[1.5]">{contact.note}</p>

      {/* Footer: timestamp + actions */}
      <div className="flex items-center justify-between gap-3 flex-wrap border-t border-[var(--color-line)] pt-[13px]">
        <span className="flex-none text-[0.88rem] text-[var(--color-muted)] whitespace-nowrap tabular-nums">
          {formatSubmittedAt(contact.createdAt)}
        </span>

        <div className="flex items-center gap-2 justify-end">
          {confirming ? (
            <div className="flex items-center gap-2">
              <span className="text-[0.86rem] font-bold text-[var(--color-ink-soft)]">Delete?</span>
              <button
                type="button"
                onClick={() => onDelete(contact.id)}
                className="font-sans text-[0.9rem] font-bold px-[13px] py-[9px] rounded-[9px] cursor-pointer inline-flex items-center gap-1.5 border-[1.5px] border-transparent bg-[#e0564f] text-white hover:bg-[#c8463f] transition-colors duration-150"
              >
                Yes
              </button>
              <button
                type="button"
                onClick={() => setConfirming(false)}
                className="font-sans text-[0.9rem] font-bold px-[13px] py-[9px] rounded-[9px] cursor-pointer inline-flex items-center gap-1.5 border-[1.5px] border-[var(--color-line-2)] bg-white text-[var(--color-ink-soft)] hover:border-[#c2c8c4] transition-colors duration-150"
              >
                No
              </button>
            </div>
          ) : (
            <>
              {contact.isVerified ? (
                <button
                  type="button"
                  disabled
                  className="font-sans text-[0.9rem] font-bold px-[13px] py-[9px] rounded-[9px] inline-flex items-center gap-1.5 border-[1.5px] border-[var(--color-green-tint2)] bg-[var(--color-green-tint)] text-[var(--color-green-700)] opacity-60 cursor-not-allowed whitespace-nowrap"
                >
                  <CheckIcon className="w-[15px] h-[15px] stroke-[var(--color-green-700)]" />
                  Verified
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => onToggle(contact.id)}
                  className="font-sans text-[0.9rem] font-bold px-[13px] py-[9px] rounded-[9px] cursor-pointer inline-flex items-center gap-1.5 border-[1.5px] border-transparent bg-[var(--color-green)] text-white hover:bg-[var(--color-green-700)] transition-colors duration-150 whitespace-nowrap"
                >
                  <CheckIcon className="w-[15px] h-[15px] stroke-white" />
                  Verify
                </button>
              )}

              <button
                type="button"
                aria-label="Delete submission"
                onClick={() => setConfirming(true)}
                className="w-[38px] h-[38px] rounded-[9px] border-[1.5px] border-[var(--color-line-2)] bg-white grid place-items-center cursor-pointer hover:border-[#f3c3bf] hover:bg-[#fdeceb] group transition-all duration-150"
              >
                <TrashIcon className="w-[17px] h-[17px] stroke-[var(--color-muted)] group-hover:stroke-[#d8463f] transition-colors duration-150" />
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
