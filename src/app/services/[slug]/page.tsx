import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Check, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/Button";
import { PageHero } from "@/components/PageHero";
import { business, getService, services, type Service } from "@/lib/services";
import { startingAt } from "@/lib/pricing";
import { getPricingConfig } from "@/lib/pricing-config";

type Props = { params: Promise<{ slug: string }> };

const COST_GUIDE = "/guides/how-much-does-house-cleaning-cost-apopka-fl";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return { title: "Service" };
  return {
    title: `${service.name} in Apopka, FL`,
    description: `${service.description} Transparent pricing, insured local cleaners, and custom checklists in Apopka, FL.`,
    alternates: { canonical: `${business.url}/services/${service.slug}` },
    openGraph: {
      title: `${service.name} in Apopka, FL | ${business.name}`,
      description: service.description,
      url: `${business.url}/services/${service.slug}`,
      images: [{ url: service.heroImage, alt: service.heroAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${service.name} in Apopka, FL | ${business.name}`,
      description: service.description,
      images: [service.heroImage],
    },
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const config = await getPricingConfig();
  const faqs = service.faqs;
  const showCostGuide =
    service.slug === "residential" ||
    service.slug === "deep-cleaning" ||
    service.slug === "move-in-out" ||
    service.slug === "carpet-upholstery";

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
      "@id": `${business.url}/#organization`,
      name: business.name,
      url: `${business.url}/`,
      email: business.email,
      areaServed: business.area,
    },
    areaServed: {
      "@type": "City",
      name: "Apopka",
      sameAs: "https://en.wikipedia.org/wiki/Apopka,_Florida",
    },
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

      {/* Main Service Overview & At a Glance */}
      <section className="mist-wash border-b border-[var(--border)]">
        <div className="mx-auto grid max-w-6xl gap-12 px-5 py-14 md:grid-cols-[1.2fr_0.8fr] md:px-8 md:py-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--lagoon)]">
              Overview & Scope
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--lagoon-ink)]">
              Professional {service.name} in Apopka, FL
            </h2>
            <p className="mt-4 max-w-xl text-[var(--muted-fg)] leading-relaxed">
              {service.description} We serve homes and workplaces across{" "}
              {business.area}, with clear scopes so you know what to expect before
              we arrive.
            </p>
            <p className="mt-4 max-w-xl text-[var(--muted-fg)] leading-relaxed">
              {service.detail}
            </p>
            {showCostGuide && (
              <p className="mt-4 max-w-xl text-sm text-[var(--muted-fg)]">
                Looking for price estimates by home size? Read our comprehensive{" "}
                <Link
                  href={COST_GUIDE}
                  className="font-semibold text-[var(--lagoon)] hover:underline"
                >
                  Apopka house cleaning cost guide
                </Link>
                .
              </p>
            )}

            <div className="mt-8 rounded-xl border border-[var(--border)] bg-white p-6">
              <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--lagoon-ink)]">
                Core checklist highlights
              </h3>
              <ul className="mt-4 space-y-3">
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

      {/* Room-by-Room Detailed Breakdown */}
      {service.roomChecklist && service.roomChecklist.length > 0 && (
        <section className="border-b border-[var(--border)] bg-white">
          <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--lagoon)]">
              Detailed breakdown
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--lagoon-ink)] md:text-3xl">
              What our {service.shortName.toLowerCase()} covers room by room
            </h2>
            <p className="mt-3 max-w-3xl text-[var(--muted-fg)] leading-relaxed">
              Every home is unique, but our standardized checklist guarantees that
              no high-touch surfaces, baseboards, or floor corners are overlooked.
            </p>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {service.roomChecklist.map((group) => (
                <div
                  key={group.room}
                  className="rounded-2xl border border-[var(--border)] bg-[var(--surface-warm)] p-6 md:p-8"
                >
                  <h3 className="flex items-center gap-2 font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--lagoon-ink)]">
                    <Sparkles className="size-5 text-[var(--lagoon)]" aria-hidden />
                    {group.room}
                  </h3>
                  <ul className="mt-4 space-y-2.5">
                    {group.tasks.map((task) => (
                      <li key={task} className="flex gap-2.5 text-sm text-[var(--muted-fg)]">
                        <Check
                          className="mt-0.5 size-4 shrink-0 text-[var(--lagoon)]"
                          aria-hidden
                        />
                        <span>{task}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Local Apopka Climate & Home Context */}
      <section className="mist-wash border-b border-[var(--border)]">
        <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-18">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-white px-3.5 py-1 text-xs font-semibold text-[var(--lagoon)] shadow-sm">
              <ShieldCheck className="size-4" aria-hidden />
              Tailored for Apopka & Central Florida
            </div>
            <h2 className="mt-4 font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--lagoon-ink)] md:text-3xl">
              Cleaning with local Central Florida conditions in mind
            </h2>
            <p className="mt-4 text-[var(--muted-fg)] leading-relaxed">
              {service.localContext}
            </p>
          </div>

          {service.addOns && service.addOns.length > 0 && (
            <div className="mt-10 rounded-2xl border border-[var(--border)] bg-white p-6 md:p-8">
              <h3 className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--lagoon-ink)]">
                Available add-ons for {service.shortName.toLowerCase()}
              </h3>
              <p className="mt-2 text-sm text-[var(--muted-fg)]">
                Need extra attention on appliances or glass? You can easily customize
                your clean during online quoting:
              </p>
              <div className="mt-4 flex flex-wrap gap-2.5">
                {service.addOns.map((addon) => (
                  <span
                    key={addon}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--surface-warm)] px-3.5 py-1.5 text-xs font-medium text-[var(--lagoon-ink)]"
                  >
                    + {addon}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Step-by-Step Cleaning Process */}
      {service.process && service.process.length > 0 && (
        <section className="border-b border-[var(--border)] bg-white">
          <div className="mx-auto max-w-6xl px-5 py-14 md:px-8 md:py-20">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--lagoon)]">
              Our Process
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--lagoon-ink)] md:text-3xl">
              How our {service.shortName.toLowerCase()} works from start to finish
            </h2>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {service.process.map((step) => (
                <div
                  key={step.step}
                  className="relative rounded-2xl border border-[var(--border)] bg-[var(--surface-warm)] p-6"
                >
                  <span className="inline-flex size-9 items-center justify-center rounded-xl bg-[var(--lagoon)] font-[family-name:var(--font-display)] text-sm font-bold text-white">
                    {step.step}
                  </span>
                  <h3 className="mt-4 font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--lagoon-ink)]">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-sm text-[var(--muted-fg)] leading-relaxed">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Service-Specific FAQs */}
      <section className="border-b border-[var(--border)] bg-white">
        <div className="mx-auto max-w-6xl px-5 py-14 md:px-8">
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--lagoon)]">
            Common questions
          </p>
          <h2 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--lagoon-ink)]">
            Frequently asked questions about {service.shortName.toLowerCase()}
          </h2>
          <dl className="mt-8 max-w-3xl space-y-6">
            {faqs.map((item) => (
              <div key={item.q} className="border-b border-[var(--border)] pb-6 last:border-b-0">
                <dt className="font-semibold text-[var(--lagoon-ink)]">{item.q}</dt>
                <dd className="mt-2 text-[var(--muted-fg)] leading-relaxed">
                  {item.a}{" "}
                  {showCostGuide && item.q.toLowerCase().includes("pricing") && (
                    <Link
                      href={COST_GUIDE}
                      className="font-semibold text-[var(--lagoon)] hover:underline"
                    >
                      Read our Apopka cost guide for local price ranges.
                    </Link>
                  )}
                </dd>
              </div>
            ))}
          </dl>
          <p className="mt-8 text-sm text-[var(--muted-fg)]">
            Have questions about booking? Browse{" "}
            <Link href="/guides" className="font-semibold text-[var(--lagoon)] hover:underline">
              all cleaning guides
            </Link>
            , view our{" "}
            <Link href="/services" className="font-semibold text-[var(--lagoon)] hover:underline">
              full service list
            </Link>
            , or{" "}
            <Link href="/contact" className="font-semibold text-[var(--lagoon)] hover:underline">
              contact our team
            </Link>
            .
          </p>
        </div>
      </section>

      {/* Cross-linking other services */}
      <section className="bg-[var(--surface-warm)]">
        <div className="mx-auto max-w-6xl px-5 py-14 md:px-8">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--lagoon-ink)]">
            Explore other cleaning services
          </h2>
          <p className="mt-2 text-sm text-[var(--muted-fg)]">
            Compare services to find the best match for your home or commercial space:
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            {services
              .filter((s) => s.slug !== service.slug)
              .map((s) => (
                <Button
                  key={s.slug}
                  href={`/services/${s.slug}`}
                  variant="outline"
                  className="rounded-full bg-white hover:bg-white/80"
                >
                  {s.name}
                </Button>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
