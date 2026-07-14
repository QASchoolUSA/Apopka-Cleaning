import Image from "next/image";
import { Button } from "@/components/Button";

type PageHeroProps = {
  brand?: boolean;
  title: string;
  subtitle: string;
  image: string;
  imageAlt: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
};

export function PageHero({
  brand,
  title,
  subtitle,
  image,
  imageAlt,
  primaryCta,
  secondaryCta,
}: PageHeroProps) {
  return (
    <section className="relative min-h-[88vh] overflow-hidden bg-[var(--lagoon)]">
      <Image
        src={image}
        alt={imageAlt}
        fill
        priority
        className="object-cover"
        sizes="100vw"
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(105deg, rgba(8, 42, 48, 0.88) 0%, rgba(8, 42, 48, 0.62) 42%, rgba(8, 42, 48, 0.35) 100%)",
        }}
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-30 mix-blend-soft-light"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative mx-auto flex min-h-[88vh] max-w-6xl flex-col justify-end px-5 pb-16 pt-28 md:px-8 md:pb-24 md:pt-32">
        <div className="max-w-2xl animate-fade-up">
          {brand ? (
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2.75rem,8vw,5.25rem)] font-semibold leading-[0.95] tracking-tight text-white">
              Apopka Cleaning
            </h1>
          ) : (
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(2.25rem,6vw,4rem)] font-semibold leading-[1.05] tracking-tight text-white">
              {title}
            </h1>
          )}
          {brand && (
            <p className="mt-4 font-[family-name:var(--font-display)] text-xl text-white/90 md:text-2xl">
              {title}
            </p>
          )}
          <p className="mt-4 max-w-lg text-base leading-relaxed text-white/80 md:text-lg">
            {subtitle}
          </p>
          {(primaryCta || secondaryCta) && (
            <div className="mt-8 flex flex-wrap gap-3">
              {primaryCta && (
                <Button href={primaryCta.href} variant="primary">
                  {primaryCta.label}
                </Button>
              )}
              {secondaryCta && (
                <Button href={secondaryCta.href} variant="ghost">
                  {secondaryCta.label}
                </Button>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
