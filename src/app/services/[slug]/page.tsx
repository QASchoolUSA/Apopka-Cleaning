import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { Button } from "@/components/Button";
import { PageHero } from "@/components/PageHero";
import { business, getService, services, type Service } from "@/lib/services";
import { startingAt } from "@/lib/pricing";
import { getPricingConfig } from "@/lib/pricing-config";

type Props = { params: Promise<{ slug: string }> };

const COST_GUIDE = "/guides/how-much-does-house-cleaning-cost-apopka-fl";

function serviceFaqs(service: Service): { q: string; a: string }[] {
  return [
    {
      q: `What does ${service.shortName.toLowerCase()} include in Apopka?`,
      a: `${service.description} Typical visits cover: ${service.includes.slice(0, 3).join("; ")}.`,
    },
    {
      q: `How long does ${service.shortName.toLowerCase()} usually take?`,
      a: `Most ${service.shortName.toLowerCase()} visits in ${business.city} take about ${service.duration}, depending on home size and condition.`,
    },
    {
      q: `How do I get a price for ${service.shortName.toLowerCase()}?`,
      a: `Use our free online quote calculator for ${business.city}, or email ${business.email}. You can also read our local house cleaning cost guide for planning ranges.`,
    },
  ];
}

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "Service" };
  return {
    title: service.name,
    description: service.description,
    alternates: { canonical: `${business.url}/services/${service.slug}` },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const config = await getPricingConfig();
  const faqs = serviceFaqs(service);
  const showCostGuide =
    service.slug === "residential" || service.slug === "deep-cleaning";

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
      {
        "@type": "ListItem",
        position: 3,
        name: service.name,
        item: `${business.url}/services/${service.slug}`,
      },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.name,
    description: service.description,
    url: `${business.url}/services/${service.slug}`,
    provider: {
      "@type": "LocalBusiness",
      name: business.name,
      url: business.url,
      email: business.email,
      areaServed: business.area,
    },
    areaServed: business.city,
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <PageHero
        title={service.name}
        subtitle={service.tagline}
        image={service.heroImage}
        imageAlt={service.heroAlt}
        primaryCta={{
          label: "Get a free quote",
          href: `/quote?service=${service.slug}`,
        }}
        secondaryCta={{ label: "All services", href: "/services" }}
      />

      <section className="mist-wash">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-14 md:grid-cols-[1.2fr_0.8fr] md:px-8 md:py-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--lagoon)]">
              About this service
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--lagoon-ink)]">
              What&apos;s included
            </h2>
            <p className="mt-4 max-w-xl text-[var(--muted-fg)] leading-relaxed">
              {service.description} We serve homes and workplaces across{" "}
              {business.area}, with clear scopes so you know what to expect before
              we arrive.
            </p>
            <ul className="mt-8 space-y-3">
              {service.includes.map((item) => (
                <li key={item} className="flex gap-3 text-[var(--lagoon-ink)]">
                  <Check
                    className="mt-0.5 size-5 shrink-0 text-[var(--lagoon)]"
                    aria-hidden
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <aside className="h-fit rounded-2xl bg-[var(--lagoon)] p-7 text-white md:p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--aqua)]">
              At a glance
            </p>
            <dl className="mt-6 space-y-5 text-sm">
              <div>
                <dt className="text-white/55">Starting at</dt>
                <dd className="mt-1 font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--aqua)]">
                  ${startingAt(service.slug, config)}
                </dd>
              </div>
              <div>
                <dt className="text-white/55">Typical duration</dt>
                <dd className="mt-1 text-base font-medium">{service.duration}</dd>
              </div>
              <div>
                <dt className="text-white/55">Ideal for</dt>
                <dd className="mt-2 space-y-1.5">
                  {service.idealFor.map((item) => (
                    <p key={item} className="text-white/85">
                      · {item}
                    </p>
                  ))}
                </dd>
              </div>
            </dl>
            <Button
              href={`/quote?service=${service.slug}`}
              variant="primary"
              className="mt-8 w-full"
            >
              Calculate & book
            </Button>
          </aside>
        </div>
      </section>

      <section className="border-t border-[var(--border)] bg-white">
        <div className="mx-auto max-w-6xl px-5 py-14 md:px-8">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--lagoon-ink)]">
            Frequently asked questions
          </h2>
          <dl className="mt-8 max-w-3xl space-y-6">
            {faqs.map((item) => (
              <div key={item.q}>
                <dt className="font-semibold text-[var(--lagoon-ink)]">{item.q}</dt>
                <dd className="mt-2 text-[var(--muted-fg)] leading-relaxed">
                  {item.a}{" "}
                  {showCostGuide && item.q.includes("price") && (
                    <Link
                      href={COST_GUIDE}
                      className="font-semibold text-[var(--lagoon)] hover:underline"
                    >
                      Read the Apopka cost guide
                    </Link>
                  )}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-8 text-sm text-[var(--muted-fg)]">
            Browse{" "}
            <Link href="/guides" className="font-semibold text-[var(--lagoon)] hover:underline">
              cleaning guides
            </Link>{" "}
            or{" "}
            <Link href="/services" className="font-semibold text-[var(--lagoon)] hover:underline">
              all services
            </Link>
            .
          </p>
        </div>
      </section>

      <section className="border-t border-[var(--border)] bg-white">
        <div className="mx-auto max-w-6xl px-5 py-14 md:px-8">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--lagoon-ink)]">
            Other services
          </h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {services
              .filter((s) => s.slug !== service.slug)
              .map((s) => (
                <Button
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  variant="outline"
                  className="rounded-full"
                >
                  {s.shortName}
                </Button>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
