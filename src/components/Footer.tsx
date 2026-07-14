import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";
import { business, services } from "@/lib/services";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-[var(--border)] bg-[var(--lagoon)] text-white">
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 10% 100%, rgba(45, 212, 191, 0.25), transparent), radial-gradient(ellipse 40% 40% at 90% 0%, rgba(14, 116, 144, 0.35), transparent)",
        }}
      />
      <div className="relative mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-3 md:px-8 md:py-16">
        <div>
          <p className="font-[family-name:var(--font-display)] text-2xl font-semibold tracking-tight">
            {business.name}
          </p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-white/70">
            Professional residential and commercial cleaning for homes and
            workplaces across {business.area}.
          </p>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--aqua)]">
            Services
          </p>
          <ul className="mt-4 space-y-2">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  href={`/services/${s.slug}`}
                  className="cursor-pointer text-sm text-white/75 transition-colors duration-200 hover:text-white"
                >
                  {s.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--aqua)]">
            Contact
          </p>
          <ul className="mt-4 space-y-3 text-sm text-white/75">
            <li className="flex items-start gap-2.5">
              <MapPin className="mt-0.5 size-4 shrink-0 text-[var(--aqua)]" aria-hidden />
              <span>{business.city}</span>
            </li>
            <li>
              <a
                href={business.phoneHref}
                className="inline-flex cursor-pointer items-center gap-2.5 transition-colors duration-200 hover:text-white"
              >
                <Phone className="size-4 shrink-0 text-[var(--aqua)]" aria-hidden />
                {business.phone}
              </a>
            </li>
            <li>
              <a
                href={business.emailHref}
                className="inline-flex cursor-pointer items-center gap-2.5 transition-colors duration-200 hover:text-white"
              >
                <Mail className="size-4 shrink-0 text-[var(--aqua)]" aria-hidden />
                {business.email}
              </a>
            </li>
            <li className="pt-1 text-white/55">{business.hours}</li>
          </ul>
        </div>
      </div>

      <div className="relative border-t border-white/10 px-5 py-5 text-center text-xs text-white/45 md:px-8">
        © {new Date().getFullYear()} {business.name}. Serving {business.city}.
      </div>
    </footer>
  );
}
