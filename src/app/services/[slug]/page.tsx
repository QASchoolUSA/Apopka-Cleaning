import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Check } from "lucide-react";
import { Button } from "@/components/Button";
import { PageHero } from "@/components/PageHero";
import { getService, services } from "@/lib/services";

type Props = { params: Promise<{ slug: string }> };

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
  };
}

export default async function ServiceDetailPage({ params }: Props) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  return (
    <>
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
              {service.description}
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
                  ${service.startingAt}
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
