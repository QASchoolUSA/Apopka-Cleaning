import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero } from "@/components/PageHero";
import { services } from "@/lib/services";
import { startingAt } from "@/lib/pricing";
import { getPricingConfig } from "@/lib/pricing-config";

export const metadata: Metadata = {
  title: "Cleaning Services",
  description:
    "Browse residential, deep clean, move-in/out, commercial, office, and carpet cleaning services in Apopka, FL.",
};

export default async function ServicesPage() {
  const config = await getPricingConfig();

  return (
    <>
      <PageHero
        title="Cleaning services"
        subtitle="Every service has its own page—pick the fit for your home or business, then get a free quote."
        image="https://images.unsplash.com/photo-1628177142898-93e36e4e3a50?auto=format&fit=crop&w=2400&q=80"
        imageAlt="Cleaning supplies arranged neatly on a surface"
        primaryCta={{ label: "Get a free quote", href: "/quote" }}
      />

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
              href="/guides/how-much-does-house-cleaning-cost-apopka-fl"
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
    </>
  );
}
