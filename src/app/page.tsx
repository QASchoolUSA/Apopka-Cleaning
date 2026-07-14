import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/Button";
import { PageHero } from "@/components/PageHero";
import { business, services } from "@/lib/services";

const proofs = [
  {
    icon: ShieldCheck,
    title: "Insured & vetted",
    text: "Background-aware team you can trust in your home or workplace.",
  },
  {
    icon: Sparkles,
    title: "Fresh every visit",
    text: "Clear checklists so kitchens, baths, and floors stay consistently clean.",
  },
  {
    icon: Clock,
    title: "On your schedule",
    text: "One-time resets or recurring visits that fit Apopka life.",
  },
];

export default function HomePage() {
  return (
    <>
      <PageHero
        brand
        title="Homes and workplaces that feel freshly reset."
        subtitle={`Local cleaning for ${business.city}—get an instant quote and book the visit that fits your space.`}
        image="https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=2400&q=80"
        imageAlt="Cleaner caring for a bright Florida kitchen"
        primaryCta={{ label: "Get a free quote", href: "/quote" }}
        secondaryCta={{ label: "View services", href: "/services" }}
      />

      <section className="mist-wash border-b border-[var(--border)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-3 md:px-8 md:py-20">
          {proofs.map((item, i) => (
            <div
              key={item.title}
              className={
                i === 0
                  ? "animate-fade-up"
                  : i === 1
                    ? "animate-fade-up-delay"
                    : "animate-fade-up-delay-2"
              }
            >
              <item.icon
                className="size-7 text-[var(--lagoon)]"
                strokeWidth={1.75}
                aria-hidden
              />
              <h2 className="mt-4 font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--lagoon-ink)]">
                {item.title}
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-[var(--muted-fg)]">
                {item.text}
              </p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-5 py-16 md:px-8 md:py-24">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--lagoon)]">
              What we clean
            </p>
            <h2 className="mt-3 font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--lagoon-ink)] md:text-4xl">
              Services built for Apopka homes and businesses.
            </h2>
            <p className="mt-3 text-[var(--muted-fg)]">
              Choose a service for details—or jump to the calculator for a free estimate
              and booking.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group relative block aspect-[4/5] cursor-pointer overflow-hidden rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--aqua)]"
              >
                <Image
                  src={service.heroImage}
                  alt={service.heroAlt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--lagoon-ink)]/90 via-[var(--lagoon-ink)]/35 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6">
                  <p className="font-[family-name:var(--font-display)] text-2xl font-semibold text-white">
                    {service.shortName}
                  </p>
                  <p className="mt-1 line-clamp-2 text-sm text-white/75">
                    {service.tagline}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-[var(--aqua)] transition-gap duration-200 group-hover:gap-2">
                    Explore
                    <ArrowRight className="size-4" aria-hidden />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[var(--lagoon)] text-white">
        <div
          className="pointer-events-none absolute -right-20 top-0 h-80 w-80 rounded-full bg-[var(--aqua)]/20 blur-3xl"
          aria-hidden
        />
        <div className="relative mx-auto flex max-w-6xl flex-col items-start gap-6 px-5 py-16 md:flex-row md:items-end md:justify-between md:px-8 md:py-24">
          <div className="max-w-xl">
            <h2 className="font-[family-name:var(--font-display)] text-3xl font-semibold md:text-4xl">
              Know your price before we arrive.
            </h2>
            <p className="mt-3 text-white/75">
              Use the free quote calculator, then book a preferred date—we confirm the
              details and show up ready.
            </p>
          </div>
          <Button href="/quote" variant="primary">
            Open quote calculator
          </Button>
        </div>
      </section>
    </>
  );
}
