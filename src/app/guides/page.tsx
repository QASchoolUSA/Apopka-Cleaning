import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { business } from "@/lib/services";

const COST_GUIDE = "/guides/how-much-does-house-cleaning-cost-apopka-fl";

const guides = [
  {
    href: COST_GUIDE,
    title: "How Much Does House Cleaning Cost in Apopka, FL? (2026)",
    blurb:
      "Local planning ranges by home size, maintenance vs deep clean, humidity cadence, and what changes the quote.",
  },
] as const;

export const metadata: Metadata = {
  title: "Cleaning Guides for Apopka, FL",
  description:
    "Local cleaning guides for Apopka, FL homeowners and renters. House cleaning prices, scopes, and how to get a transparent quote.",
  alternates: { canonical: `${business.url}/guides` },
  openGraph: {
    title: "Cleaning Guides for Apopka, FL",
    description:
      "Practical cleaning guides from Apopka Cleaning—pricing, scopes, and local tips for Orange County homes.",
    url: `${business.url}/guides`,
    siteName: business.name,
    type: "website",
  },
};

const faqs = [
  {
    q: "What guides does Apopka Cleaning publish?",
    a: "Start with the house cleaning cost guide for 2026 planning ranges by home size and maintenance vs deep clean. More local how-to guides will appear here as we publish them.",
  },
  {
    q: "How do I go from a guide to booking?",
    a: "Read the cost guide, pick residential or deep cleaning (or another service), then use the free quote calculator or contact page.",
  },
] as const;

export default function GuidesIndexPage() {
  const breadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${business.url}/` },
      {
        "@type": "ListItem",
        position: 2,
        name: "Guides",
        item: `${business.url}/guides`,
      },
    ],
  };

  const itemListSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Apopka FL Cleaning Guides",
    itemListElement: guides.map((g, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: g.title,
      url: `${business.url}${g.href}`,
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
        title="Cleaning guides"
        subtitle="Practical local guides for Apopka homeowners—pricing, scopes, and how we quote."
        image="https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&w=2400&q=80"
        imageAlt="Cleaning supplies arranged neatly on a surface"
        primaryCta={{ label: "Get a free quote", href: "/quote" }}
        secondaryCta={{ label: "Browse services", href: "/services" }}
      />

      <section className="border-b border-[var(--border)] bg-white">
        <div className="mx-auto max-w-6xl px-5 py-12 md:px-8 md:py-16">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--lagoon-ink)] md:text-3xl">
            Why we publish Apopka cleaning guides
          </h2>
          <p className="mt-4 max-w-3xl text-[var(--muted-fg)] leading-relaxed">
            National averages rarely match {business.area} home sizes, bathroom counts,
            or humid-season soil. These guides explain scopes and planning ranges so you
            can compare{" "}
            <Link
              href="/services/residential"
              className="font-semibold text-[var(--lagoon)] hover:underline"
            >
              residential
            </Link>{" "}
            vs{" "}
            <Link
              href="/services/deep-cleaning"
              className="font-semibold text-[var(--lagoon)] hover:underline"
            >
              deep cleaning
            </Link>{" "}
            before you{" "}
            <Link
              href="/quote"
              className="font-semibold text-[var(--lagoon)] hover:underline"
            >
              request a quote
            </Link>
            . For the full service list, open the{" "}
            <Link
              href="/services"
              className="font-semibold text-[var(--lagoon)] hover:underline"
            >
              services hub
            </Link>
            .
          </p>
          <p className="mt-4 max-w-3xl text-[var(--muted-fg)] leading-relaxed">
            Start with{" "}
            <Link
              href={COST_GUIDE}
              className="font-semibold text-[var(--lagoon)] hover:underline"
            >
              How much does house cleaning cost in Apopka, FL?
            </Link>{" "}
            — then pick the matching service leaf and book online.
          </p>
        </div>
      </section>

      <section className="mist-wash">
        <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
          <ul className="space-y-4">
            {guides.map((g) => (
              <li key={g.href}>
                <Link
                  href={g.href}
                  className="group block cursor-pointer rounded-2xl border border-[var(--border)] bg-white px-6 py-7 transition-colors duration-200 hover:border-[var(--aqua)] md:px-8"
                >
                  <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--lagoon-ink)] md:text-2xl">
                    {g.title}
                  </h2>
                  <p className="mt-2 max-w-2xl text-[var(--muted-fg)]">{g.blurb}</p>
                  <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--lagoon)]">
                    Read the guide
                    <ArrowRight
                      className="size-4 transition-transform duration-200 group-hover:translate-x-1"
                      aria-hidden
                    />
                  </span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-10 max-w-2xl">
            <h2 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--lagoon-ink)]">
              Related services
            </h2>
            <p className="mt-3 text-[var(--muted-fg)] leading-relaxed">
              After the cost guide, most homeowners compare{" "}
              <Link
                href="/services/residential"
                className="font-semibold text-[var(--lagoon)] hover:underline"
              >
                residential cleaning
              </Link>
              ,{" "}
              <Link
                href="/services/deep-cleaning"
                className="font-semibold text-[var(--lagoon)] hover:underline"
              >
                deep cleaning
              </Link>
              , and{" "}
              <Link
                href="/services/move-in-out"
                className="font-semibold text-[var(--lagoon)] hover:underline"
              >
                move-in / move-out
              </Link>
              . Soft surfaces:{" "}
              <Link
                href="/services/carpet-upholstery"
                className="font-semibold text-[var(--lagoon)] hover:underline"
              >
                carpet &amp; upholstery
              </Link>
              .
            </p>
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
                  {item.q.includes("publish") ? (
                    <>
                      Start with the{" "}
                      <Link
                        href={COST_GUIDE}
                        className="font-semibold text-[var(--lagoon)] hover:underline"
                      >
                        house cleaning cost guide
                      </Link>{" "}
                      for 2026 planning ranges by home size and maintenance vs deep clean.
                      More local how-to guides will appear here as we publish them.
                    </>
                  ) : (
                    <>
                      Read the cost guide, pick{" "}
                      <Link
                        href="/services/residential"
                        className="font-semibold text-[var(--lagoon)] hover:underline"
                      >
                        residential
                      </Link>{" "}
                      or{" "}
                      <Link
                        href="/services/deep-cleaning"
                        className="font-semibold text-[var(--lagoon)] hover:underline"
                      >
                        deep cleaning
                      </Link>{" "}
                      (or another service), then use the{" "}
                      <Link
                        href="/quote"
                        className="font-semibold text-[var(--lagoon)] hover:underline"
                      >
                        free quote calculator
                      </Link>{" "}
                      or{" "}
                      <Link
                        href="/contact"
                        className="font-semibold text-[var(--lagoon)] hover:underline"
                      >
                        contact
                      </Link>{" "}
                      page.
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
