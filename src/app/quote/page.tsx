import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { QuoteWithServiceParam } from "@/components/QuoteWithServiceParam";
import { getPricingConfig } from "@/lib/pricing-config";
import { business, services } from "@/lib/services";

export const metadata: Metadata = {
  title: "Free Quote & Book Cleaning",
  description:
    "Calculate your cleaning price instantly and book a visit with Apopka Cleaning in Apopka, FL. Residential, deep clean, move-out, and commercial estimates.",
  alternates: { canonical: `${business.url}/quote` },
};

const faqs = [
  {
    q: "Is the online quote free?",
    a: "Yes. The calculator gives an instant range based on service type and home details. You can request a booking after you review the estimate—no obligation.",
  },
  {
    q: "Which service should I choose in the calculator?",
    a: "Pick residential for routine upkeep, deep cleaning for a thorough reset, or move-in/out for vacant homes. Not sure? Browse all services or read the Apopka cost guide first.",
  },
  {
    q: "Do you serve only Apopka?",
    a: `We clean across ${business.area}. Enter your address in the calculator and we’ll confirm coverage when we follow up.`,
  },
] as const;

export default async function QuotePage() {
  const config = await getPricingConfig();

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <PageHero
        title="Get a free quote"
        subtitle="See your price in minutes, then book a visit for your Apopka address. Clear scopes—no surprise upsells at the door."
        image="https://images.unsplash.com/photo-1556911220-bff31c28b687?auto=format&fit=crop&w=2400&q=80"
        imageAlt="Bright organized kitchen ready after cleaning"
        primaryCta={{ label: "Jump to calculator", href: "#calculator" }}
      />

      <section className="border-b border-[var(--border)] bg-white">
        <div className="mx-auto max-w-6xl px-5 py-10 md:px-8">
          <p className="max-w-3xl text-[var(--muted-fg)] leading-relaxed">
            Start with the service that matches your space—{" "}
            {services.slice(0, 4).map((s, i) => (
              <span key={s.slug}>
                {i > 0 && (i === 3 ? ", or " : ", ")}
                <Link
                  href={`/services/${s.slug}`}
                  className="font-semibold text-[var(--lagoon)] hover:underline"
                >
                  {s.shortName.toLowerCase()}
                </Link>
              </span>
            ))}
            —or skim{" "}
            <Link
              href="/guides/how-much-does-house-cleaning-cost-apopka-fl"
              className="font-semibold text-[var(--lagoon)] hover:underline"
            >
              typical Apopka cleaning prices
            </Link>{" "}
            first.
          </p>
        </div>
      </section>

      <section id="calculator" className="mist-wash scroll-mt-8">
        <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
          <QuoteWithServiceParam config={config} />
        </div>
      </section>

      <section className="border-t border-[var(--border)] bg-white">
        <div className="mx-auto max-w-6xl px-5 py-14 md:px-8">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--lagoon-ink)]">
            Quote FAQ
          </h2>
          <dl className="mt-8 max-w-3xl space-y-6">
            {faqs.map((item) => (
              <div key={item.q}>
                <dt className="font-semibold text-[var(--lagoon-ink)]">{item.q}</dt>
                <dd className="mt-2 text-[var(--muted-fg)] leading-relaxed">
                  {item.a}{" "}
                  {item.q.includes("service") && (
                    <>
                      <Link
                        href="/services"
                        className="font-semibold text-[var(--lagoon)] hover:underline"
                      >
                        View services
                      </Link>
                      {" · "}
                      <Link
                        href="/guides"
                        className="font-semibold text-[var(--lagoon)] hover:underline"
                      >
                        Guides
                      </Link>
                      .
                    </>
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
