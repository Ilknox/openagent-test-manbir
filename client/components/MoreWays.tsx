import Link from "next/link";

interface ReachRowProps {
  label: string;
  sub?: string;
  children: React.ReactNode;
}

function ReachRow({ label, sub, children }: ReachRowProps) {
  return (
    <li className="py-[22px] border-t border-[var(--color-line)] last:border-b last:border-[var(--color-line)]">
      <span className="block text-[12.5px] font-bold tracking-[0.08em] uppercase text-[var(--color-muted)] mb-1.5">
        {label}
      </span>
      {children}
      {sub && (
        <span className="block text-[0.96rem] text-[var(--color-muted)] font-medium mt-[5px]">
          {sub}
        </span>
      )}
    </li>
  );
}

export default function MoreWays() {
  return (
    <section>
      <p className="text-[13px] font-bold tracking-[0.09em] uppercase text-[var(--color-muted)] mt-1 mb-[18px]">
        More ways to reach us
      </p>

      <ul className="list-none m-0 p-0">
        <ReachRow label="Email" sub="We usually reply within a few hours">
          <Link
            href="mailto:support@openagent.com.au"
            className="block text-[1.18rem] font-bold tracking-[-0.01em] text-[var(--color-ink)] no-underline overflow-wrap-anywhere hover:text-[var(--color-green-700)] transition-colors duration-150"
          >
            support@openagent.com.au
          </Link>
        </ReachRow>

        <ReachRow label="Postal address">
          <span className="block text-[1.18rem] font-bold tracking-[-0.01em] text-[var(--color-ink)]">
            PO Box 419, Alexandria NSW 1435
          </span>
        </ReachRow>

        <ReachRow label="Contact centre hours" sub="Closed on public holidays">
          <span className="block text-[1.18rem] font-bold tracking-[-0.01em] text-[var(--color-ink)]">
            Mon &ndash; Fri, 8:30 &ndash; 5:00
          </span>
        </ReachRow>

        <ReachRow label="Media enquiries">
          <span className="block text-[1.04rem] font-medium text-[var(--color-ink-soft)]">
            Members of the press? Visit our{" "}
            <Link
              href="#"
              className="text-[var(--color-green-700)] font-bold no-underline border-b-2 border-[var(--color-green-tint2)] hover:border-[var(--color-green)] transition-colors duration-150"
            >
              Media &amp; Press
            </Link>{" "}
            page.
          </span>
        </ReachRow>
      </ul>
    </section>
  );
}
