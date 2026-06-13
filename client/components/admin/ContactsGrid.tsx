"use client";

import { useState, useEffect } from "react";
import { API_URL } from "@/lib/api";
import SubmissionCard, { type Contact } from "./SubmissionCard";

type Filter = "all" | "pending" | "verified";
const FILTERS: { key: Filter; label: string }[] = [
  { key: "all",      label: "All" },
  { key: "pending",  label: "Pending" },
  { key: "verified", label: "Verified" },
];

export default function ContactsGrid() {
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [filter, setFilter] = useState<Filter>("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${API_URL}/contacts`)
      .then((r) => {
        if (!r.ok) throw new Error("Failed to load contacts.");
        return r.json();
      })
      .then((data: Contact[]) => setContacts(data))
      .catch((e: Error) => setError(e.message))
      .finally(() => setLoading(false));
  }, []);

  async function handleToggle(id: number) {
    const contact = contacts.find((c) => c.id === id);
    if (!contact) return;
    const next = !contact.isVerified;
    // Optimistic update
    setContacts((prev) =>
      prev.map((c) => (c.id === id ? { ...c, isVerified: next } : c))
    );
    try {
      await fetch(`${API_URL}/contacts/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isVerified: next }),
      });
    } catch {
      // Revert on failure
      setContacts((prev) =>
        prev.map((c) => (c.id === id ? { ...c, isVerified: !next } : c))
      );
    }
  }

  async function handleDelete(id: number) {
    // Optimistic update
    setContacts((prev) => prev.filter((c) => c.id !== id));
    try {
      await fetch(`${API_URL}/contacts/${id}`, { method: "DELETE" });
    } catch {
      // Nothing to revert — re-fetch to restore
      fetch(`${API_URL}/contacts`)
        .then((r) => r.json())
        .then((data: Contact[]) => setContacts(data));
    }
  }

  const filtered = contacts.filter((c) => {
    if (filter === "pending")  return !c.isVerified;
    if (filter === "verified") return c.isVerified;
    return true;
  });

  return (
    <>
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-4 flex-wrap pb-[18px]">
        <span className="text-[0.95rem] font-semibold text-[var(--color-muted)]">
          {loading ? "Loading…" : `Showing ${filtered.length} of ${contacts.length}`}
        </span>

        <div className="inline-flex bg-white border border-[var(--color-line)] rounded-[11px] p-1 gap-0.5">
          {FILTERS.map(({ key, label }) => (
            <button
              key={key}
              type="button"
              onClick={() => setFilter(key)}
              className={[
                "font-sans text-[0.92rem] font-semibold px-[14px] py-2 rounded-[8px] cursor-pointer border-none transition-all duration-150 whitespace-nowrap",
                filter === key
                  ? "bg-[var(--color-green-tint)] text-[var(--color-green-800)]"
                  : "bg-transparent text-[var(--color-ink-soft)] hover:bg-[var(--color-surface)]",
              ].join(" ")}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* Cards grid */}
      {loading ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(330px,1fr))] gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-[220px] rounded-[14px] bg-[var(--color-line)] animate-pulse" />
          ))}
        </div>
      ) : error ? (
        <div className="py-14 text-center border border-[var(--color-line)] rounded-[14px] bg-white">
          <p className="m-0 font-bold text-[var(--color-ink)]">Could not load contacts</p>
          <p className="m-0 mt-1 text-[var(--color-muted)] text-sm">{error}</p>
        </div>
      ) : filtered.length === 0 ? (
        <div className="py-14 text-center border border-[var(--color-line)] rounded-[14px] bg-white">
          <h3 className="m-0 mb-1.5 font-bold text-[1.15rem] text-[var(--color-ink)]">Nothing here</h3>
          <p className="m-0 text-[var(--color-muted)]">No submissions match this filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(330px,1fr))] gap-4 items-start">
          {filtered.map((c) => (
            <SubmissionCard
              key={c.id}
              contact={c}
              onToggle={handleToggle}
              onDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </>
  );
}
