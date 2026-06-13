import Breadcrumb from "@/components/Breadcrumb";
import Hero from "@/components/Hero";
import PhoneCallout from "@/components/PhoneCallout";
import ContactForm from "@/components/ContactForm";
import MoreWays from "@/components/MoreWays";

export default function ContactPage() {
  return (
    <div className="max-w-[1180px] mx-auto px-[clamp(20px,5vw,56px)]">
      <Breadcrumb />
      <Hero />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[clamp(32px,5vw,72px)] gap-y-[clamp(28px,3.5vw,44px)] items-start pt-[clamp(4px,1vw,12px)] pb-[clamp(56px,8vw,110px)] [grid-template-areas:'phone_form'_'more_form'] max-md:[grid-template-areas:'phone'_'form'_'more']">
        <div className="[grid-area:phone]">
          <PhoneCallout />
        </div>
        <div className="[grid-area:form] md:row-span-2">
          <ContactForm />
        </div>
        <div className="[grid-area:more]">
          <MoreWays />
        </div>
      </div>
    </div>
  );
}
