import ContactsGrid from "@/components/admin/ContactsGrid";

export default function AdminPage() {
  return (
    <div className="bg-[var(--color-surface)] min-h-[calc(100vh-78px)] pb-[clamp(40px,6vw,80px)]">
      <div className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,56px)]">

        {/* Page header */}
        <div className="pt-[clamp(28px,4vw,48px)] pb-[clamp(18px,2.5vw,26px)]">
          <h1 className="m-0 text-[clamp(1.9rem,3.4vw,2.6rem)] font-extrabold tracking-[-0.03em] text-[var(--color-ink)]">
            Contact submissions
          </h1>
          <p className="mt-[9px] mb-0 text-[var(--color-muted)] text-[1.05rem]">
            Review enquiries from the contact form, verify customers and remove records.
          </p>
        </div>

        <ContactsGrid />
      </div>
    </div>
  );
}
