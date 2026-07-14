import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/Button";
import { PageHero } from "@/components/PageHero";
import { business } from "@/lib/services";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${business.name} in ${business.city} for cleaning quotes and bookings.`,
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact us"
        subtitle={`Reach the ${business.name} team—we're happy to talk through your space in ${business.city}.`}
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
              Prefer to skip the form? Call or email and we&apos;ll help you pick the
              right service and schedule.
            </p>
            <ul className="mt-8 space-y-5">
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
          </div>

          <form
            className="rounded-2xl bg-white p-6 shadow-[0_20px_60px_-30px_rgba(10,61,69,0.3)] md:p-8"
            action="/quote"
            method="get"
          >
            <h3 className="font-[family-name:var(--font-display)] text-xl font-semibold text-[var(--lagoon-ink)]">
              Fastest path: free quote
            </h3>
            <p className="mt-2 text-sm text-[var(--muted-fg)]">
              The calculator prices your clean and lets you request a booking in one
              flow.
            </p>
            <Button href="/quote" className="mt-6 w-full" variant="primary">
              Open quote calculator
            </Button>
            <Button href="tel:+14075550148" className="mt-3 w-full" variant="outline">
              Call {business.phone}
            </Button>
          </form>
        </div>
      </section>
    </>
  );
}
