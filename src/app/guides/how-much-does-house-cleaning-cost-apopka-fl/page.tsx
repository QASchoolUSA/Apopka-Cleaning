import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { business } from "@/lib/services";

const SLUG = "how-much-does-house-cleaning-cost-apopka-fl";
const CANONICAL = `${business.url}/guides/${SLUG}`;
const HERO_IMAGE =
  "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=2400&q=80";
const PUBLISHED = "2026-09-24";

export const metadata: Metadata = {
  title: "How Much Does House Cleaning Cost in Apopka, FL? (2026)",
  description:
    "Local 2026 Apopka house cleaning price ranges: apartments from about $140–$190, 3-bedroom homes $170–$240 maintenance or $320–$450 deep clean. See what changes the quote.",
  alternates: { canonical: CANONICAL },
  openGraph: {
    title: "How Much Does House Cleaning Cost in Apopka, FL? (2026)",
    description:
      "Transparent Apopka house cleaning cost ranges by home size, deep vs maintenance scope, humidity cadence, and quote factors.",
    url: CANONICAL,
    siteName: business.name,
    type: "article",
    images: [HERO_IMAGE],
  },
  twitter: {
    card: "summary_large_image",
    title: "How Much Does House Cleaning Cost in Apopka, FL? (2026)",
    description:
      "Apopka Cleaning prices house cleaning from about $140 to $350+ per visit. See local ranges by home size and scope.",
    images: [HERO_IMAGE],
  },
};

const AI_OVERVIEW_BLOCK =
  "Apopka Cleaning typically prices house cleaning in Apopka, FL from about $140 to $350+ per visit. Apartment maintenance cleans often start near $140–$190. A standard 3-bedroom home averages about $170–$240 for maintenance and $320–$450 for a deep clean. Final price depends on square footage, bathrooms, soil level, pets, and how long it has been since the last professional clean.";

const faqs = [
  {
    q: "How much does house cleaning cost in Apopka, FL?",
    a: "Apopka Cleaning typically prices visits from about $140 to $350+. Apartments often fall near $140–$190 for maintenance; a 3-bedroom home averages about $170–$240 maintenance or $320–$450 deep clean, depending on condition.",
  },
  {
    q: "Is deep cleaning more expensive than regular house cleaning in Apopka?",
    a: "Yes. A deep clean for a typical 3-bedroom home usually runs about $320–$450, while maintenance for the same home averages about $170–$240 because deep cleans include baseboards, detailed kitchens/baths, and inside appliances when scoped.",
  },
  {
    q: "How often should Apopka homeowners book professional cleaning?",
    a: "Most get the best results with biweekly maintenance plus one or two deep cleans per year. High-humidity months (May–October) often need tighter bathroom and floor attention.",
  },
  {
    q: "What factors raise house cleaning prices in Apopka?",
    a: "Square footage, heavy pet hair, 60+ days since the last clean, inside-oven or inside-fridge add-ons, and carpet/upholstery beyond the standard room set all raise price.",
  },
  {
    q: "Do you offer move-out or commercial cleaning in Apopka?",
    a: "Yes. See move-in / move-out, office, and commercial services, then request a quote.",
  },
] as const;

export default function HouseCleaningCostApopkaGuidePage() {
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "@id": `${CANONICAL}#article`,
    headline: "How Much Does House Cleaning Cost in Apopka, FL? (2026)",
    description:
      "Local 2026 Apopka house cleaning price ranges by home size, maintenance vs deep clean, and factors that change the quote.",
    image: HERO_IMAGE,
    datePublished: PUBLISHED,
    dateModified: PUBLISHED,
    author: {
      "@type": "Organization",
      "@id": `${business.url}/#organization`,
      name: business.name,
    },
    publisher: {
      "@type": "Organization",
      "@id": `${business.url}/#organization`,
      name: business.name,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": CANONICAL,
    },
    about: [
      { "@type": "Thing", name: "House Cleaning Cost" },
      {
        "@type": "City",
        name: "Apopka",
        sameAs: "https://en.wikipedia.org/wiki/Apopka,_Florida",
      },
      { "@type": "Service", name: "House Cleaning" },
    ],
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: [".ai-overview-target"],
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };

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
      {
        "@type": "ListItem",
        position: 3,
        name: "House Cleaning Cost Apopka FL",
        item: CANONICAL,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumb) }}
      />

      <PageHero
        title="How Much Does House Cleaning Cost in Apopka, FL?"
        subtitle="2026 local planning ranges from Apopka Cleaning—by home size, maintenance vs deep clean, and what changes the quote."
        image={HERO_IMAGE}
        imageAlt="Professional cleaner wiping a kitchen counter in a bright Apopka home"
        primaryCta={{ label: "Get a free quote", href: "/quote" }}
        secondaryCta={{ label: "View services", href: "/services" }}
      />

      <article className="mist-wash">
        <div className="mx-auto max-w-3xl px-5 py-12 md:px-8 md:py-16">
          <nav className="mb-8 text-sm text-[var(--muted-fg)]" aria-label="Breadcrumb">
            <Link href="/" className="transition-colors hover:text-[var(--lagoon)]">
              Home
            </Link>
            <span className="mx-2">/</span>
            <Link href="/guides" className="transition-colors hover:text-[var(--lagoon)]">
              Guides
            </Link>
            <span className="mx-2">/</span>
            <span className="font-medium text-[var(--lagoon-ink)]">House Cleaning Cost</span>
          </nav>

          <section className="mb-12">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--lagoon-ink)] md:text-3xl">
              How Much Does House Cleaning Cost in Apopka, FL?
            </h2>
            <p className="ai-overview-target mt-4 rounded-xl border border-[var(--border)] bg-white p-5 text-lg leading-relaxed text-[var(--lagoon-ink)]">
              {AI_OVERVIEW_BLOCK}
            </p>
            <p className="mt-4 text-[var(--muted-fg)] leading-relaxed">
              These bands are planning estimates calibrated to Central Florida peer scopes (same
              portfolio pricing patterns used on sister markets). Always confirm with a custom quote
              for your address.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--lagoon-ink)] md:text-3xl">
              Apopka House Cleaning Price Ranges by Home Size
            </h2>
            <p className="mt-4 text-[var(--muted-fg)] leading-relaxed">
              Apopka Cleaning builds quotes from home size, bathroom count, and condition—not a
              one-size national average. Typical 2026 planning ranges for Apopka, Rock Springs,
              Wekiwa Springs corridor, and nearby northwest Orange County homes:
            </p>
            <div className="mt-6 overflow-x-auto rounded-xl border border-[var(--border)] bg-white">
              <table className="w-full text-left text-sm text-[var(--muted-fg)]">
                <thead className="bg-[var(--aqua-soft)] text-xs font-bold uppercase tracking-wide text-[var(--lagoon-ink)]">
                  <tr>
                    <th className="px-5 py-4">Home profile</th>
                    <th className="px-5 py-4">Maintenance clean</th>
                    <th className="px-5 py-4">Deep clean</th>
                    <th className="px-5 py-4">Typical crew hours</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  <tr>
                    <td className="px-5 py-4 font-medium text-[var(--lagoon-ink)]">
                      Apartment / condo ≤ 900 sq ft
                    </td>
                    <td className="px-5 py-4">$140 – $190</td>
                    <td className="px-5 py-4">$220 – $300</td>
                    <td className="px-5 py-4">2–4 hrs</td>
                  </tr>
                  <tr>
                    <td className="px-5 py-4 font-medium text-[var(--lagoon-ink)]">
                      3 bed / 2 bath (~1,600–2,000 sq ft)
                    </td>
                    <td className="px-5 py-4">$170 – $240</td>
                    <td className="px-5 py-4">$320 – $450</td>
                    <td className="px-5 py-4">3–6 hrs</td>
                  </tr>
                  <tr>
                    <td className="px-5 py-4 font-medium text-[var(--lagoon-ink)]">
                      Larger home (2,500+ sq ft)
                    </td>
                    <td className="px-5 py-4">$240 – $350+</td>
                    <td className="px-5 py-4">$450 – $700+</td>
                    <td className="px-5 py-4">5–9 hrs</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="mt-4 text-sm text-[var(--muted-fg)]">
              Use the table for budgeting. Multi-story layouts, heavy pet hair, or 60+ days of soil
              usually move a job into the deep-clean column.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--lagoon-ink)] md:text-3xl">
              Maintenance Clean vs Deep Clean Cost
            </h2>
            <p className="mt-4 text-[var(--muted-fg)] leading-relaxed">
              A <strong className="text-[var(--lagoon-ink)]">maintenance clean</strong> keeps
              kitchens, bathrooms, floors, and dusted surfaces guest-ready between visits. A{" "}
              <strong className="text-[var(--lagoon-ink)]">deep clean</strong> resets neglected
              zones: baseboards, detailed tile and grout attention, inside microwave, and often
              inside oven or fridge when scoped.
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-[var(--muted-fg)]">
              <li>
                <strong className="text-[var(--lagoon-ink)]">Maintenance</strong> works best on a
                weekly or biweekly cadence after an initial deep clean.
              </li>
              <li>
                <strong className="text-[var(--lagoon-ink)]">Deep</strong> fits first visits,
                seasonal resets, move-related resets, or homes idle 60+ days.
              </li>
              <li>
                <strong className="text-[var(--lagoon-ink)]">Price efficiency:</strong> biweekly
                maintenance visits often cost roughly 12–18% less per visit than monthly-only
                service because soil load stays lighter.
              </li>
            </ul>
            <p className="mt-4 text-[var(--muted-fg)] leading-relaxed">
              Compare scopes on{" "}
              <Link
                href="/services/residential"
                className="font-medium text-[var(--lagoon)] underline-offset-2 hover:underline"
              >
                residential cleaning
              </Link>{" "}
              and{" "}
              <Link
                href="/services/deep-cleaning"
                className="font-medium text-[var(--lagoon)] underline-offset-2 hover:underline"
              >
                deep cleaning
              </Link>
              . For a full reset before or after a move, see{" "}
              <Link
                href="/services/move-in-out"
                className="font-medium text-[var(--lagoon)] underline-offset-2 hover:underline"
              >
                move-in / move-out cleaning
              </Link>
              .
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--lagoon-ink)] md:text-3xl">
              Why Central Florida Humidity Affects Frequency (and Value)
            </h2>
            <p className="mt-4 text-[var(--muted-fg)] leading-relaxed">
              Apopka&apos;s humid season (roughly May–October) accelerates bathroom film, sticky
              floors near outdoor entries, and musty edges in closets and AC closets. National
              &ldquo;clean once a month&rdquo; advice often under-serves local homes—especially with
              pets or kids.
            </p>
            <p className="mt-4 text-[var(--muted-fg)] leading-relaxed">
              Most Apopka homeowners get better odor and mildew control with{" "}
              <strong className="text-[var(--lagoon-ink)]">
                biweekly maintenance plus one or two deep cleans per year
              </strong>{" "}
              than with monthly-only deep cleans. Tighter bathroom and floor attention during summer
              usually protects more deposit and guest-ready value than stretching the gap between
              visits.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--lagoon-ink)] md:text-3xl">
              What Raises the Price
            </h2>
            <div className="mt-6 overflow-x-auto rounded-xl border border-[var(--border)] bg-white">
              <table className="w-full text-left text-sm text-[var(--muted-fg)]">
                <thead className="bg-[var(--aqua-soft)] text-xs font-bold uppercase tracking-wide text-[var(--lagoon-ink)]">
                  <tr>
                    <th className="px-5 py-4">Factor</th>
                    <th className="px-5 py-4">Typical impact</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[var(--border)]">
                  <tr>
                    <td className="px-5 py-4 font-medium text-[var(--lagoon-ink)]">
                      Heavy pet hair / multiple pets
                    </td>
                    <td className="px-5 py-4">+10–25% time and price</td>
                  </tr>
                  <tr>
                    <td className="px-5 py-4 font-medium text-[var(--lagoon-ink)]">
                      60+ days since last professional clean
                    </td>
                    <td className="px-5 py-4">Route to deep clean; +15–30% vs maintenance</td>
                  </tr>
                  <tr>
                    <td className="px-5 py-4 font-medium text-[var(--lagoon-ink)]">
                      Inside oven / fridge / cabinets
                    </td>
                    <td className="px-5 py-4">Add-on line items (quoted per appliance/zone)</td>
                  </tr>
                  <tr>
                    <td className="px-5 py-4 font-medium text-[var(--lagoon-ink)]">
                      Carpet / upholstery beyond standard rooms
                    </td>
                    <td className="px-5 py-4">
                      See{" "}
                      <Link
                        href="/services/carpet-upholstery"
                        className="font-medium text-[var(--lagoon)] underline-offset-2 hover:underline"
                      >
                        carpet &amp; upholstery
                      </Link>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-5 py-4 font-medium text-[var(--lagoon-ink)]">
                      Office or commercial scope
                    </td>
                    <td className="px-5 py-4">
                      See{" "}
                      <Link
                        href="/services/office"
                        className="font-medium text-[var(--lagoon)] underline-offset-2 hover:underline"
                      >
                        office
                      </Link>{" "}
                      or{" "}
                      <Link
                        href="/services/commercial"
                        className="font-medium text-[var(--lagoon)] underline-offset-2 hover:underline"
                      >
                        commercial
                      </Link>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          <section className="mb-12">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--lagoon-ink)] md:text-3xl">
              How Apopka Cleaning Builds a Transparent Quote
            </h2>
            <ol className="mt-4 list-decimal space-y-3 pl-6 text-[var(--muted-fg)]">
              <li>
                Share beds, baths, approximate square footage, and preferred date via the{" "}
                <Link
                  href="/quote"
                  className="font-medium text-[var(--lagoon)] underline-offset-2 hover:underline"
                >
                  quote form
                </Link>
                .
              </li>
              <li>
                Note pets, last clean date, and must-do rooms (kitchen/bath priority is common).
              </li>
              <li>
                Receive a scoped estimate for maintenance or deep clean—not a vague
                &ldquo;starts at&rdquo; with hidden add-ons.
              </li>
              <li>Confirm access (gate code, garage, HOA rules) before crew arrival.</li>
              <li>Pay after the cleaning once you are satisfied with the visit.</li>
            </ol>
            <p className="mt-4 text-[var(--muted-fg)] leading-relaxed">
              Questions about recurring plans or one-time resets? Start on{" "}
              <Link
                href="/contact"
                className="font-medium text-[var(--lagoon)] underline-offset-2 hover:underline"
              >
                contact
              </Link>{" "}
              or book a quote online.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--lagoon-ink)] md:text-3xl">
              Who This Guide Is For
            </h2>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-[var(--muted-fg)]">
              <li>
                Homeowners comparing Apopka house cleaning companies on price <em>and</em> scope
              </li>
              <li>Apartment and condo residents who need a realistic first-visit budget</li>
              <li>
                Property managers estimating recurring maintenance vs seasonal deep cleans
              </li>
            </ul>
            <p className="mt-4 text-[var(--muted-fg)] leading-relaxed">
              Apopka Cleaning is a local Booking Broom–connected cleaning business serving Apopka,
              Florida—quotes and bookings route to the same operations stack used across our Central
              Florida sister sites.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--lagoon-ink)] md:text-3xl">
              FAQ
            </h2>
            <div className="mt-6 space-y-6">
              {faqs.map((item) => (
                <div key={item.q}>
                  <h3 className="font-semibold text-[var(--lagoon-ink)]">{item.q}</h3>
                  <p className="mt-2 text-[var(--muted-fg)] leading-relaxed">
                    {item.q ===
                    "Do you offer move-out or commercial cleaning in Apopka?" ? (
                      <>
                        Yes. See{" "}
                        <Link
                          href="/services/move-in-out"
                          className="font-medium text-[var(--lagoon)] underline-offset-2 hover:underline"
                        >
                          move-in / move-out
                        </Link>
                        ,{" "}
                        <Link
                          href="/services/office"
                          className="font-medium text-[var(--lagoon)] underline-offset-2 hover:underline"
                        >
                          office
                        </Link>
                        , and{" "}
                        <Link
                          href="/services/commercial"
                          className="font-medium text-[var(--lagoon)] underline-offset-2 hover:underline"
                        >
                          commercial
                        </Link>
                        , then request a{" "}
                        <Link
                          href="/quote"
                          className="font-medium text-[var(--lagoon)] underline-offset-2 hover:underline"
                        >
                          quote
                        </Link>
                        .
                      </>
                    ) : (
                      item.a
                    )}
                  </p>
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-2xl bg-[var(--lagoon)] px-8 py-10 text-center text-white md:px-12">
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold md:text-3xl">
              Get Your Apopka House Cleaning Quote
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-white/75">
              Share your home size and schedule—we&apos;ll return a scoped estimate for maintenance
              or deep clean.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/quote"
                className="inline-flex cursor-pointer items-center justify-center rounded-full bg-[var(--aqua)] px-6 py-3 text-sm font-semibold text-[var(--lagoon-ink)] transition-transform duration-200 hover:scale-[1.02] hover:bg-[var(--aqua-bright)]"
              >
                Get a free quote
              </Link>
              <Link
                href="/services"
                className="inline-flex cursor-pointer items-center justify-center rounded-full border border-white/30 px-6 py-3 text-sm font-semibold text-white transition-colors duration-200 hover:bg-white/10"
              >
                Browse services
              </Link>
            </div>
          </section>
        </div>
      </article>
    </>
  );
}
