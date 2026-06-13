import Link from "next/link";
import { PhoneIcon } from "./icons/Icons";

export default function PhoneCallout() {
  return (
    <section>
      <span className="inline-flex items-center gap-[9px] text-[12.5px] font-bold tracking-[0.09em] uppercase text-[var(--color-muted)]">
        <PhoneIcon className="w-[17px] h-[17px] stroke-[var(--color-green-700)]" />
        Prefer to talk? Call us direct
      </span>

      <Link
        href="tel:132434"
        className="block whitespace-nowrap mt-[10px] mb-[7px] text-[clamp(2.5rem,5.2vw,3.25rem)] font-extrabold tracking-[-0.035em] leading-[0.98] text-[var(--color-ink)] no-underline hover:text-[var(--color-green-700)] transition-colors duration-150"
      >
        13 24 34
      </Link>

      <span className="block text-[0.98rem] text-[var(--color-muted)] font-medium">
        Lines open Monday&ndash;Friday, 8:30&ndash;5:00
      </span>
    </section>
  );
}
