import Link from "next/link";
import { PhoneIcon } from "./icons/Icons";

const COLS = [
  { title: "Company",  links: ["About us", "Careers", "Media & Press", "Reviews"] },
  { title: "Services", links: ["Find an agent", "Property report", "Sell your home"] },
  { title: "Support",  links: ["Contact us", "Help centre", "FAQs"] },
];

function FootCol({ title, links }: { title: string; links: string[] }) {
  return (
    <nav>
      <h4 className="mt-0.5 mb-4 text-[12.5px] font-bold tracking-[0.08em] uppercase text-[var(--color-muted)]">
        {title}
      </h4>
      <ul className="list-none m-0 p-0 grid gap-[11px]">
        {links.map((l) => (
          <li key={l}>
            <Link
              href="#"
              className="no-underline text-[var(--color-ink-soft)] text-[0.98rem] font-medium hover:text-[var(--color-green-700)] transition-colors duration-150"
            >
              {l}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function Footer() {
  return (
    <footer className="border-t border-[var(--color-line)] bg-[var(--color-surface)]">
      <div className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,56px)]">

        {/* Main grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-[clamp(28px,4vw,56px)] pt-[clamp(44px,6vw,68px)] pb-[clamp(36px,4vw,52px)]">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="inline-flex items-center gap-2.5 text-[1.3rem] font-extrabold tracking-[-0.02em] text-[var(--color-ink)]">
              <span className="w-[22px] h-[22px] rounded-[7px] bg-[var(--color-green)] inline-block" />
              OpenAgent
            </div>
            <p className="mt-4 mb-5 text-[var(--color-muted)] text-[0.98rem] max-w-[280px] leading-[1.55]">
              Helping Australians buy, sell and own property with confidence since 2013.
            </p>
            <Link
              href="tel:132434"
              className="inline-flex items-center gap-2 font-bold text-base text-[var(--color-green-700)] no-underline hover:gap-[11px] transition-all duration-150"
            >
              <PhoneIcon className="w-4 h-4" />
              Call 13 24 34
            </Link>
          </div>

          {/* Link columns */}
          {COLS.map((col) => (
            <FootCol key={col.title} title={col.title} links={col.links} />
          ))}
        </div>

        {/* Bottom bar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[var(--color-line)] pt-[22px] pb-[30px] text-[0.92rem] text-[var(--color-muted)]">
          <span>© 2026 OpenAgent. All rights reserved.</span>
          <div className="flex flex-wrap gap-[22px]">
            {["Privacy Policy", "Terms & Conditions", "Accessibility"].map((label) => (
              <Link
                key={label}
                href="#"
                className="no-underline text-[var(--color-muted)] font-medium hover:text-[var(--color-green-700)] transition-colors duration-150"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
