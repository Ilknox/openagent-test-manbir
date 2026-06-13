export default function Hero() {
  return (
    <section className="pt-[clamp(22px,3.5vw,38px)] pb-[clamp(28px,4vw,48px)]">
      <span className="inline-flex items-center gap-2 text-[13px] font-bold tracking-[0.08em] uppercase text-[var(--color-green-700)] bg-[var(--color-green-tint)] px-[13px] py-[7px] rounded-full mb-5">
        <span className="w-[7px] h-[7px] rounded-full bg-[var(--color-green)]" />
        We&rsquo;d love to hear from you
      </span>

      <h1 className="m-0 text-[clamp(2.3rem,5.4vw,4rem)] font-extrabold leading-[1.04] tracking-[-0.03em] text-balance">
        Contact us, {" "}
        <span className="text-[var(--color-green-700)]">we&rsquo;re here to help.</span>
      </h1>

      <p className="mt-[22px] mb-0 text-[clamp(1.05rem,1.6vw,1.28rem)] text-[var(--color-ink-soft)] max-w-[560px] leading-[1.6]">
        We&rsquo;ve been helping people buy, sell and own property since 2013. Whatever&rsquo;s on
        your mind, our team is one quick message away.
      </p>
    </section>
  );
}
