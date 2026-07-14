"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, Phone, X } from "lucide-react";
import { business, services } from "@/lib/services";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/quote", label: "Get a Quote" },
  { href: "/contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);

  return (
    <header className="absolute inset-x-0 top-0 z-50">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-5 md:px-8">
        <Link
          href="/"
          className="group relative z-10 font-[family-name:var(--font-display)] text-xl font-semibold tracking-tight text-white drop-shadow-sm transition-opacity duration-200 hover:opacity-90 md:text-2xl"
          onClick={() => setOpen(false)}
        >
          Apopka Cleaning
        </Link>

        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((item) =>
            item.href === "/services" ? (
              <div
                key={item.href}
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-white/90 transition-colors duration-200 hover:bg-white/10 hover:text-white",
                    pathname.startsWith("/services") && "bg-white/10 text-white",
                  )}
                >
                  {item.label}
                </Link>
                {servicesOpen && (
                  <div className="absolute left-0 top-full pt-2">
                    <div className="min-w-[240px] rounded-xl border border-white/15 bg-[var(--lagoon)]/95 p-2 shadow-xl backdrop-blur-md">
                      {services.map((s) => (
                        <Link
                          key={s.slug}
                          href={`/services/${s.slug}`}
                          className="block cursor-pointer rounded-lg px-3 py-2.5 text-sm text-white/90 transition-colors duration-200 hover:bg-white/10 hover:text-white"
                        >
                          {s.shortName}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "cursor-pointer rounded-md px-3 py-2 text-sm font-medium text-white/90 transition-colors duration-200 hover:bg-white/10 hover:text-white",
                  pathname === item.href && "bg-white/10 text-white",
                )}
              >
                {item.label}
              </Link>
            ),
          )}
          <a
            href={business.phoneHref}
            className="ml-2 inline-flex cursor-pointer items-center gap-2 rounded-full bg-[var(--aqua)] px-4 py-2.5 text-sm font-semibold text-[var(--lagoon-ink)] shadow-sm transition-transform duration-200 hover:scale-[1.02] hover:bg-[var(--aqua-bright)]"
          >
            <Phone className="size-4" aria-hidden />
            Call now
          </a>
        </nav>

        <button
          type="button"
          className="relative z-10 inline-flex cursor-pointer items-center justify-center rounded-md p-2 text-white lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-white/10 bg-[var(--lagoon)]/98 px-5 py-6 backdrop-blur-lg lg:hidden">
          <nav className="flex flex-col gap-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="cursor-pointer rounded-lg px-3 py-3 text-base font-medium text-white"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <p className="mt-3 px-3 text-xs font-semibold uppercase tracking-wider text-white/50">
              Service types
            </p>
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="cursor-pointer rounded-lg px-3 py-2.5 text-sm text-white/85"
                onClick={() => setOpen(false)}
              >
                {s.shortName}
              </Link>
            ))}
            <a
              href={business.phoneHref}
              className="mt-4 inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-[var(--aqua)] px-4 py-3 text-sm font-semibold text-[var(--lagoon-ink)]"
            >
              <Phone className="size-4" aria-hidden />
              {business.phone}
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
