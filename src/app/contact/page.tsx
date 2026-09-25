import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/Button";
import { PageHero } from "@/components/PageHero";
import { business, hasPhone, services } from "@/lib/services";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${business.name} in ${business.city} for cleaning quotes and bookings. Email ${business.email} or use the free online quote calculator.`,
  alternates: { canonical: `${business.url}/contact` },
};

const faqs = [
  {
    q: "What is the fastest way to get a cleaning quote in Apopka?",
    a: "Use the free online quote calculator—most homeowners finish in a few minutes. Prefer email? Write hello@apopkacleaning.com with your address, bedrooms/baths, and service type.",
  },
  {
    q: "Which areas do you serve?",
    a: `We clean across ${business.area}. If you’re nearby and unsure, email us your zip code and we’ll confirm.`,
  },
  {
    q: "Can I ask about residential vs deep cleaning before booking?",
    a: "Yes. Browse our services pages, read the local house cleaning cost guide, then email or quote online once you know the scope you need.",
  },
] as const;

export default function ContactPage() {
  const localBusiness = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: business.name,
    url: business.url,
    email: business.email,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Apopka",
      addressRegion: "FL",
      addressCountry: "US",
    },
    areaServed: business.area,
    openingHours: "Mo-Sa 08:00-18:00",
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
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusiness) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <PageHero
        title="Contact us"
        subtitle="Questions about cleaning in Apopka? Email us or grab a free quote—we’ll help you pick the right scope."
        image="https://images.unsplash.com/photo-1484154218962-a197022b5858?auto=format&fit=crop&w=2400&q=80"
        imageAlt="Bright living room with natural Florida light"
        primaryCta={{ label: "Get a free quote", href: "/quote" }}
      />

      <section className="mist-wash">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-2 md:px-8 md:py-20">
          <div>
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--lagoon-ink)]">
              We&apos;re local to Apopka
            </h2>
            <p className="mt-4 text-[var(--muted-fg)] leading-relaxed">
              Prefer to skip the form? Email us with your address, preferred day, and
              whether you need{" "}
              <Link
                href="/services/residential"
                className="font-semibold text-[var(--lagoon)] hover:underline"
              >
                residential
              </Link>
              ,{" "}
              <Link
                href="/services/deep-cleaning"
                className="font-semibold text-[var(--lagoon)] hover:underline"
              >
                deep cleaning
              </Link>
              , or another service from our{" "}
              <Link
                href="/services"
                className="font-semibold text-[var(--lagoon)] hover:underline"
              >
                full list
              </Link>
              .
            </p>
            <ul className="mt-8 space-y-5">
              {hasPhone && (
                <li className="flex gap-3">
                  <Phone className="mt-0.5 size-5 text-[var(--lagoon)]" aria-hidden />
                  <div>
                    <p className="text-sm font-semibold text-[var(--lagoon-ink)]">Phone</p>
                    <a
                      href={business.phoneHref}
                      className="cursor-pointer text-[var(--muted-fg)] transition-colors duration-200 hover:text-[var(--lagoon)]"
                    >
                      {business.phone}
                    </a>
                  </div>
                </li>
              )}
              <li className="flex gap-3">
                <Mail className="mt-0.5 size-5 text-[var(--lagoon)]" aria-hidden />
                <div>
                  <p className="text-sm font-semibold text-[var(--lagoon-ink)]">Email</p>
                  <a
                    href={business.emailHref}
                    className="cursor-pointer text-[var(--muted-fg)] transition-colors duration-200 hover:text-[var(--lagoon)]"
                  >
                    {business.email}
                  </a>
                </div>
              </li>
              <li className="flex gap-3">
                <MapPin className="mt-0.5 size-5 text-[var(--lagoon)]" aria-hidden />
                <div>
                  <p className="text-sm font-semibold text-[var(--lagoon-ink)]">Service area</p>
                  <p className="text-[var(--muted-fg)]">
                    {business.area}
                    <br />
                    {business.hours}
                  </p>
                </div>
              </li>
            </ul>
            <p className="mt-8 text-sm text-[var(--muted-fg)]">
              Planning ranges:{" "}
              <Link
                href="/guides/how-much-does-house-cleaning-cost-apopka-fl"
                className="font-semibold text-[var(--lagoon)] hover:underline"
              >
                house cleaning costs in Apopka
              </Link>
              .
            </p>
          </div>

          <div className="rounded-2xl bg-white p-6 shadow-[0_20px_60px_-30px_rgba(10,61,69,0.3)] md:p-8">
            <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--lagoon-ink)]">
              Or get a free quote
            </h3>
            <p className="mt-2 text-sm text-[var(--muted-fg)]">
              The calculator prices your clean and lets you request a booking in one
              go. Popular starts:{" "}
              {services.slice(0, 3).map((s, i) => (
                <span key={s.slug}>
                  {i > 0 && ", "}
                  <Link
                    href={`/services/${s.slug}`}
                    className="font-semibold text-[var(--lagoon)] hover:underline"
                  >
                    {s.shortName}
                  </Link>
                </span>
              ))}
              .
            </p>
            <Button href="/quote" className="mt-6 w-full" variant="primary">
              Open quote calculator
            </Button>
            <Button href={business.emailHref} className="mt-3 w-full" variant="outline">
              Email {business.email}
            </Button>
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--border)] bg-white">
        <div className="mx-auto max-w-6xl px-5 py-14 md:px-8">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--lagoon-ink)]">
            Contact FAQ
          </h2>
          <dl className="mt-8 max-w-3xl space-y-6">
            {faqs.map((item) => (
              <div key={item.q}>
                <dt className="font-semibold text-[var(--lagoon-ink)]">{item.q}</dt>
                <dd className="mt-2 text-[var(--muted-fg)] leading-relaxed">{item.a}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
    </>
  );
}
