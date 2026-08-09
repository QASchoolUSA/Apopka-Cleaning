import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { QuoteWithServiceParam } from "@/components/QuoteWithServiceParam";
import { getPricingConfig } from "@/lib/pricing-config";

export const metadata: Metadata = {
  title: "Free Quote & Book Cleaning",
  description:
    "Calculate your cleaning price instantly and book a visit with Apopka Cleaning in Apopka, FL.",
};

export default async function QuotePage() {
  const config = await getPricingConfig();

  return (
    <>
      <PageHero
        title="Get a free quote"
        subtitle="Price your clean in minutes, then request a booking for your Apopka address."
        image="https://images.unsplash.com/photo-1556911220-bff31c28b687?auto=format&fit=crop&w=2400&q=80"
        imageAlt="Bright organized kitchen ready after cleaning"
        primaryCta={{ label: "Jump to calculator", href: "#calculator" }}
      />

      <section id="calculator" className="mist-wash scroll-mt-8">
        <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
          <QuoteWithServiceParam config={config} />
        </div>
      </section>
    </>
  );
}
