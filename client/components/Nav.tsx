import Link from "next/link";
import { HomeIcon, CaretIcon, MenuIcon } from "./icons/Icons";

const NAV_LINKS = ["Find Agents", "Find Property", "Research", "Property Valuation"];

export default function Nav() {
  return (
    <div className="border-b border-[var(--color-line)] bg-white">
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
          aria-label="Open menu"
          className="md:hidden flex items-center justify-center w-11 h-11 border border-[var(--color-line-2)] rounded-[11px] bg-white text-[var(--color-ink)] hover:border-[var(--color-green-tint2)] hover:bg-[var(--color-green-tint)] transition-colors duration-150 cursor-pointer flex-none"
        >
          <MenuIcon className="w-[22px] h-[22px]" />
        </button>
      </div>
    </div>
  );
}
