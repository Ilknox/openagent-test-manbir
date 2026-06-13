import Link from "next/link";
import { HomeIcon } from "./icons/Icons";

export default function Breadcrumb() {
  return (
    <nav
      aria-label="Breadcrumb"
      className="flex flex-wrap items-center gap-2 pt-[clamp(24px,4vw,44px)] text-sm font-semibold text-[var(--color-muted)]"
    >
      <Link
        href="/"
        aria-label="Home"
        className="inline-flex items-center justify-center w-[30px] h-[30px] rounded-[9px] bg-[var(--color-green-tint)] text-[var(--color-green-700)] hover:bg-[var(--color-green-tint2)] hover:-translate-y-px transition-all duration-150"
      >
        <HomeIcon className="w-4 h-4" />
      </Link>

      <span className="text-[var(--color-line-2)] font-normal">›</span>

      <Link href="#" className="text-[var(--color-muted)] hover:text-[var(--color-ink)] transition-colors duration-150 no-underline">
        About Us
      </Link>

      <span className="text-[var(--color-line-2)] font-normal">›</span>

      <span className="text-[var(--color-green-700)]">Contact Us</span>
    </nav>
  );
}
