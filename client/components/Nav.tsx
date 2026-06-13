"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HomeIcon, CaretIcon, MenuIcon } from "./icons/Icons";

const NAV_LINKS = ["Find Agents", "Find Property", "Research", "Property Valuation"];

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <div className="border-b border-[var(--color-line)] bg-white relative">
      <div className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,56px)] flex items-center justify-between gap-6 h-[78px]">

        {/* Brand */}
        <Link
          href="/"
          aria-label="OpenAgent home"
          className="inline-flex items-center gap-[11px] no-underline flex-none"
        >
          <span className="w-[38px] h-[38px] rounded-full bg-[var(--color-green)] grid place-items-center">
            <HomeIcon className="w-5 h-5 stroke-white" />
          </span>
          <span className="text-[1.4rem] font-extrabold tracking-[-0.025em] text-[var(--color-ink)]">
            OpenAgent
          </span>
          {isAdmin && (
            <span className="text-[0.76rem] font-extrabold tracking-[0.06em] uppercase bg-[var(--color-green-tint2)] text-[var(--color-green-800)] px-[9px] py-1 rounded-[6px]">
              Admin
            </span>
          )}
        </Link>

        {/* Desktop nav links */}
        <nav aria-label="Primary" className="hidden md:flex items-center gap-[clamp(16px,2.4vw,36px)]">
          {NAV_LINKS.map((label) => (
            <Link
              key={label}
              href="#"
              className="inline-flex items-center gap-1.5 no-underline text-base font-semibold text-[var(--color-ink)] whitespace-nowrap hover:text-[var(--color-green-700)] transition-colors duration-150 group"
            >
              {label}
              <CaretIcon className="w-[13px] h-[13px] stroke-[var(--color-muted)] group-hover:stroke-[var(--color-green-700)] group-hover:translate-y-px transition-all duration-150" />
            </Link>
          ))}
        </nav>

        {/* Mobile hamburger */}
        <button
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
          className="md:hidden flex items-center justify-center w-11 h-11 border border-[var(--color-line-2)] rounded-[11px] bg-white text-[var(--color-ink)] hover:border-[var(--color-green-tint2)] hover:bg-[var(--color-green-tint)] transition-colors duration-150 cursor-pointer flex-none"
        >
          {menuOpen ? (
            <svg className="w-[22px] h-[22px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 6 6 18" /><path d="m6 6 12 12" />
            </svg>
          ) : (
            <MenuIcon className="w-[22px] h-[22px]" />
          )}
        </button>
      </div>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-[var(--color-line)] shadow-[0_8px_24px_-8px_rgba(20,40,28,0.12)] z-50">
          <nav className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,56px)] py-3 flex flex-col">
            {NAV_LINKS.map((label) => (
              <Link
                key={label}
                href="#"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-between py-3.5 text-base font-semibold text-[var(--color-ink)] no-underline border-b border-[var(--color-line)] last:border-0 hover:text-[var(--color-green-700)] transition-colors duration-150"
              >
                {label}
                <CaretIcon className="w-[13px] h-[13px] stroke-[var(--color-muted)] -rotate-90" />
              </Link>
            ))}
          </nav>
        </div>
      )}
    </div>
  );
}
