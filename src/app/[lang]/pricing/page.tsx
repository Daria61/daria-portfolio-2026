import type { Metadata } from "next";
import { ContactSection } from "@/components/contact-section";
import { PosterPricingSection, PricingSection } from "@/components/pricing-section";
import { getDictionary, getLocale } from "@/i18n/get-dictionary";

export async function generateMetadata(): Promise<Metadata> {
  const dict = await getDictionary();
  return {
    title: dict.pricing.meta.title,
    description: dict.pricing.meta.description,
  };
}

export default async function PricingPage() {
  const lang = await getLocale();
  const dict = await getDictionary();

  return (
    <main className="flex-1">
      <PricingSection dict={dict} />
      <PosterPricingSection dict={dict} />
      {/* Each package's "Get started" button scrolls down to this. */}
      <ContactSection
        dict={dict}
        secondary={{ href: `/${lang}#work`, label: dict.contact.work }}
      />
    </main>
  );
}
