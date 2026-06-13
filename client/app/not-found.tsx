import Link from "next/link";

export default function NotFound() {
  return (
    <div className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,56px)] py-24 text-center">
      <span className="inline-flex items-center gap-2 text-[13px] font-bold tracking-[0.08em] uppercase text-[var(--color-green-700)] bg-[var(--color-green-tint)] px-[13px] py-[7px] rounded-full mb-6">
        <span className="w-[7px] h-[7px] rounded-full bg-[var(--color-green)]" />
        404
      </span>

      <h1 className="m-0 text-[clamp(2.3rem,5.4vw,4rem)] font-extrabold leading-[1.04] tracking-[-0.03em] text-[var(--color-ink)]">
        Page not found.
      </h1>

      <p className="mt-5 mb-0 text-[clamp(1.05rem,1.6vw,1.2rem)] text-[var(--color-ink-soft)] max-w-[480px] mx-auto leading-[1.6]">
        The page you&rsquo;re looking for doesn&rsquo;t exist or has been moved.
      </p>

      <Link
        href="/"
        className="inline-flex items-center gap-2 mt-8 font-bold text-base text-white bg-[var(--color-green)] no-underline px-6 py-[14px] rounded-[13px] shadow-[0_10px_24px_-10px_rgba(14,142,74,0.6)] hover:bg-[var(--color-green-700)] hover:-translate-y-0.5 transition-all duration-150"
      >
        Back to home
      </Link>
    </div>
  );
}
