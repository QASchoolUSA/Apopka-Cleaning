import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { business, services } from "@/lib/services";
import { startingAt } from "@/lib/pricing";
import { getPricingConfig } from "@/lib/pricing-config";

const COST_GUIDE = "/guides/how-much-does-house-cleaning-cost-apopka-fl";

export const metadata: Metadata = {
  title: "Cleaning Services in Apopka, FL",
  description:
    "Browse residential, deep clean, move-in/out, commercial, office, and carpet cleaning services in Apopka, FL—scopes, starting prices, and how to quote.",
  alternates: { canonical: `${business.url}/services` },
  openGraph: {
    title: "Cleaning Services in Apopka, FL",
    description:
      "Compare Apopka Cleaning service scopes—homes, vacant moves, offices, and carpet—then get a free quote.",
    url: `${business.url}/services`,
    siteName: business.name,
    type: "website",
  },
};

const faqs = [
  {
    q: "Which Apopka cleaning service should I book first?",
    a: "Occupied homes usually start with residential (maintenance) or deep cleaning. Vacant turnovers use move-in/out. Desk-heavy workplaces use office cleaning; storefronts and clinics often fit commercial. Soft surfaces alone use carpet & upholstery.",
  },
  {
    q: "Where can I see typical house cleaning prices for Apopka?",
    a: "Read our house cleaning cost guide for 2026 planning ranges by home size and maintenance vs deep clean, then use the free quote calculator for your address.",
  },
  {
    q: "Do you clean outside Apopka city limits?",
    a: `We serve ${business.area}. Enter your address in the quote form and we confirm coverage when we follow up.`,
  },
] as const;

export default async function ServicesPage() {
  const config = await getPricingConfig();

  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${business.url}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: "Services",
        item: `${business.url}/services`,
      },
    ],
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Apopka FL Cleaning Services",
    itemListElement: services.map((s, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: s.name,
      url: `${business.url}/services/${s.slug}`,
      description: s.tagline,
    })),
  };

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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <PageHero
        title="Cleaning services"
        subtitle="Every service has its own page—pick the fit for your home or business, then get a free quote."
        image="https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&w=2400&q=80"
        imageAlt="Cleaning supplies arranged neatly on a surface"
        primaryCta={{ label: "Get a free quote", href: "/quote" }}
        secondaryCta={{ label: "Cost guide", href: COST_GUIDE }}
      />

      <section className="border-b border-[var(--border)] bg-white">
        <div className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--lagoon-ink)] md:text-3xl">
            How to choose a service in Apopka
          </h2>
          <p className="mt-4 max-w-3xl text-[var(--muted-fg)] leading-relaxed">
            Apopka Cleaning lists six scopes so you can match the job—not a one-size
            pitch. Occupied homes usually start with{" "}
            <Link
              href="/services/residential"
              className="font-semibold text-[var(--lagoon)] hover:underline"
            >
              residential cleaning
            </Link>{" "}
            or{" "}
            <Link
              href="/services/deep-cleaning"
              className="font-semibold text-[var(--lagoon)] hover:underline"
            >
              deep cleaning
            </Link>
            . Empty turnovers use{" "}
            <Link
              href="/services/move-in-out"
              className="font-semibold text-[var(--lagoon)] hover:underline"
            >
              move-in / move-out
            </Link>
            . Workplaces split between{" "}
            <Link
              href="/services/office"
              className="font-semibold text-[var(--lagoon)] hover:underline"
            >
              office
            </Link>{" "}
            and{" "}
            <Link
              href="/services/commercial"
              className="font-semibold text-[var(--lagoon)] hover:underline"
            >
              commercial
            </Link>
            ; soft surfaces alone use{" "}
            <Link
              href="/services/carpet-upholstery"
              className="font-semibold text-[var(--lagoon)] hover:underline"
            >
              carpet &amp; upholstery
            </Link>
            . We serve {business.area}.
          </p>
          <p className="mt-4 max-w-3xl text-[var(--muted-fg)] leading-relaxed">
            For house-cleaning budget bands before you open the calculator, read{" "}
            <Link
              href={COST_GUIDE}
              className="font-semibold text-[var(--lagoon)] hover:underline"
            >
              how much house cleaning costs in Apopka
            </Link>{" "}
            or skim the{" "}
            <Link
              href="/guides"
              className="font-semibold text-[var(--lagoon)] hover:underline"
            >
              guides hub
            </Link>
            .
          </p>
          <nav className="mt-8" aria-label="All service pages">
            <ul className="flex flex-wrap gap-x-5 gap-y-2 text-sm">
              {services.map((service) => (
                <li key={service.slug}>
                  <Link
                    href={`/services/${service.slug}`}
                    className="font-semibold text-[var(--lagoon)] hover:underline"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl space-y-0 px-5 py-10 md:px-8 md:py-14">
          {services.map((service, index) => (
            <Link
              key={service.slug}
              href={`/services/${service.slug}`}
              className="group grid cursor-pointer gap-6 border-b border-[var(--border)] py-10 transition-colors duration-200 last:border-b-0 md:grid-cols-2 md:items-center md:gap-12 md:py-14"
            >
              <div
                className={`relative aspect-[16/11] overflow-hidden rounded-2xl ${
                  index % 2 === 1 ? "md:order-2" : ""
                }`}
              >
                <Image
                  src={service.heroImage}
                  alt={service.heroAlt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
              <div className={index % 2 === 1 ? "md:order-1" : ""}>
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--lagoon)]">
                  From ${startingAt(service.slug, config)}
                </p>
                <h2 className="mt-2 font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--lagoon-ink)]">
                  {service.name}
                </h2>
                <p className="mt-3 max-w-md text-[var(--muted-fg)]">
                  {service.tagline}
                </p>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-[var(--muted-fg)]">
                  {service.detail}
                </p>
                <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--lagoon)]">
                  View service
                  <ArrowRight
                    className="size-4 transition-transform duration-200 group-hover:translate-x-1"
                    aria-hidden
                  />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="border-t border-[var(--border)] mist-wash">
        <div className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--lagoon-ink)]">
            Compare pricing before you book
          </h2>
          <p className="mt-3 max-w-2xl text-[var(--muted-fg)]">
            Not sure whether you need a maintenance visit or a deep clean? Our Apopka
            cost guide covers typical ranges by home size, then you can{" "}
            <Link href="/quote" className="font-semibold text-[var(--lagoon)] hover:underline">
              get a free quote
            </Link>{" "}
            for your address.
          </p>
          <div className="mt-6 flex flex-wrap gap-4">
            <Link
              href={COST_GUIDE}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--lagoon)] hover:underline"
            >
              House cleaning costs in Apopka
              <ArrowRight className="size-4" aria-hidden />
            </Link>
            <Link
              href="/guides"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--lagoon)] hover:underline"
            >
              All guides
              <ArrowRight className="size-4" aria-hidden />
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--border)] bg-white">
        <div className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--lagoon-ink)]">
            Frequently asked questions
          </h2>
          <dl className="mt-8 max-w-3xl space-y-6">
            {faqs.map((item) => (
              <div key={item.q}>
                <dt className="font-semibold text-[var(--lagoon-ink)]">{item.q}</dt>
                <dd className="mt-2 text-[var(--muted-fg)] leading-relaxed">
                  {item.q.includes("prices") ? (
                    <>
                      Read our{" "}
                      <Link
                        href={COST_GUIDE}
                        className="font-semibold text-[var(--lagoon)] hover:underline"
                      >
                        house cleaning cost guide
                      </Link>{" "}
                      for 2026 planning ranges by home size and maintenance vs deep clean,
                      then use the{" "}
                      <Link
                        href="/quote"
                        className="font-semibold text-[var(--lagoon)] hover:underline"
                      >
                        free quote calculator
                      </Link>{" "}
                      for your address.
                    </>
                  ) : (
                    item.a
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
