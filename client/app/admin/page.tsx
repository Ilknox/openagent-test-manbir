export default function AdminPage() {
  return (
    <div className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,56px)] py-16">
      <span className="inline-flex items-center gap-2 text-[13px] font-bold tracking-[0.08em] uppercase text-[var(--color-green-700)] bg-[var(--color-green-tint)] px-[13px] py-[7px] rounded-full mb-5">
        <span className="w-[7px] h-[7px] rounded-full bg-[var(--color-green)]" />
        Admin
      </span>
      <h1 className="m-0 text-[clamp(2rem,4vw,3rem)] font-extrabold tracking-[-0.03em] text-[var(--color-ink)]">
        Admin Dashboard
      </h1>
      <p className="mt-4 text-[1.1rem] text-[var(--color-ink-soft)] max-w-[480px]">
        Admin content coming soon.
      </p>
    </div>
  );
}
