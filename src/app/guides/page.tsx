import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { business } from "@/lib/services";

const guides = [
  {
    href: "/guides/how-much-does-house-cleaning-cost-apopka-fl",
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

      <PageHero
        title="Cleaning guides"
        subtitle="Practical local guides for Apopka homeowners—pricing, scopes, and how we quote."
        image="https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&w=2400&q=80"
        imageAlt="Cleaning supplies arranged neatly on a surface"
        primaryCta={{ label: "Get a free quote", href: "/quote" }}
      />

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
        </div>
      </section>
    </>
  );
}
