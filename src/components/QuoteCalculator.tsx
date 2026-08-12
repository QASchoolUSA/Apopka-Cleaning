"use client";

import { useMemo, useState } from "react";
import { Check, ChevronRight } from "lucide-react";
import { business, services, type ServiceSlug } from "@/lib/services";
import {
  DEFAULT_PRICING_CONFIG,
  calculateQuote,
  type Frequency,
  type PricingConfig,
} from "@/lib/pricing";
import { Button } from "@/components/Button";
import { cn } from "@/lib/utils";

type Step = "calc" | "book" | "done";

export function QuoteCalculator({
  defaultService = "residential",
  config = DEFAULT_PRICING_CONFIG,
}: {
  defaultService?: ServiceSlug;
  config?: PricingConfig;
}) {
  const { addOns, frequencies } = config;
  const [step, setStep] = useState<Step>("calc");
  const [serviceSlug, setServiceSlug] = useState<ServiceSlug>(defaultService);
  const [bedrooms, setBedrooms] = useState(3);
  const [bathrooms, setBathrooms] = useState(2);
  const [sqFt, setSqFt] = useState(1500);
  const [frequency, setFrequency] = useState<Frequency>("biweekly");
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    date: "",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const quote = useMemo(
    () =>
      calculateQuote(
        {
          serviceSlug,
          bedrooms,
          bathrooms,
          sqFt,
          frequency,
          addOnIds: selectedAddOns,
        },
        config,
      ),
    [serviceSlug, bedrooms, bathrooms, sqFt, frequency, selectedAddOns, config],
  );

  const isCommercial =
    serviceSlug === "commercial" || serviceSlug === "office";

  function toggleAddOn(id: string) {
    setSelectedAddOns((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  }

  async function handleBook(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError(null);
    setSubmitting(true);
    try {
      const freqLabel =
        frequencies.find((f) => f.key === frequency)?.label ?? frequency;
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer_name: form.name.trim(),
          email: form.email.trim(),
          phone: form.phone.trim(),
          address: form.address.trim(),
          service_type: quote.service.name,
          preferred_date: form.date,
          intent: "quote",
          notes: form.notes.trim() || undefined,
          property: {
            bedrooms: isCommercial ? undefined : bedrooms,
            bathrooms,
            square_feet: sqFt,
            home_type: quote.service.shortName,
          },
          quote: {
            estimate: quote.total,
            currency: "USD",
            frequency: freqLabel,
            add_ons: selectedAddOns.map((id) => {
              const addOn = addOns.find((a) => a.key === id);
              return { label: addOn?.label ?? id, price: addOn?.price };
            }),
            payment_terms: "Due after cleaning is complete",
          },
        }),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        message?: string;
      };
      if (!res.ok || data.ok === false) {
        setSubmitError(
          data.message || "Unable to submit booking. Please try again.",
        );
        return;
      }
      setStep("done");
    } catch {
      setSubmitError("Unable to submit booking. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (step === "done") {
    return (
      <div className="animate-fade-up rounded-2xl bg-white p-8 text-center shadow-[0_20px_60px_-30px_rgba(10,61,69,0.35)] md:p-12">
        <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-[var(--aqua-soft)] text-[var(--lagoon)]">
          <Check className="size-7" strokeWidth={2.5} />
        </div>
        <h2 className="mt-5 font-[family-name:var(--font-display)] text-3xl font-semibold text-[var(--lagoon-ink)]">
          Request received
        </h2>
        <p className="mx-auto mt-3 max-w-md text-[var(--muted-fg)]">
          Thanks, {form.name || "there"}. We&apos;ll confirm your{" "}
          {quote.service.shortName.toLowerCase()} estimate of{" "}
          <strong className="text-[var(--lagoon)]">${quote.total}</strong> and
          preferred date shortly. Prefer to talk now? Call{" "}
          <a
            href={business.phoneHref}
            className="cursor-pointer font-semibold text-[var(--lagoon)] underline-offset-2 hover:underline"
          >
            {business.phone}
          </a>
          .
        </p>
        <Button
          className="mt-8"
          variant="outline"
          onClick={() => {
            setStep("calc");
            setForm({
              name: "",
              email: "",
              phone: "",
              address: "",
              date: "",
              notes: "",
            });
          }}
        >
          Start another quote
        </Button>
      </div>
    );
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1.15fr_0.85fr]">
      <div className="animate-fade-up rounded-2xl bg-white p-6 shadow-[0_20px_60px_-30px_rgba(10,61,69,0.3)] md:p-8">
        {step === "calc" ? (
          <div className="space-y-8">
            <div>
              <h2 className="font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--lagoon-ink)] md:text-3xl">
                Free quote calculator
              </h2>
              <p className="mt-2 text-sm text-[var(--muted-fg)]">
                Instant estimate for Apopka-area cleans. Book in the next step—
                no obligation.
              </p>
            </div>

            <fieldset>
              <legend className="text-sm font-semibold text-[var(--lagoon-ink)]">
                Service type
              </legend>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {services.map((s) => (
                  <button
                    key={s.slug}
                    type="button"
                    onClick={() => setServiceSlug(s.slug)}
                    className={cn(
                      "cursor-pointer rounded-xl border px-4 py-3 text-left text-sm font-medium transition-all duration-200",
                      serviceSlug === s.slug
                        ? "border-[var(--aqua)] bg-[var(--aqua-soft)] text-[var(--lagoon-ink)]"
                        : "border-[var(--border)] text-[var(--muted-fg)] hover:border-[var(--lagoon)]/30 hover:bg-[var(--mist)]",
                    )}
                  >
                    {s.shortName}
                  </button>
                ))}
              </div>
            </fieldset>

            {!isCommercial && (
              <div className="grid gap-6 sm:grid-cols-2">
                <CountPills
                  label="Bedrooms"
                  value={bedrooms}
                  min={0}
                  max={5}
                  zeroLabel="Studio"
                  onChange={setBedrooms}
                />
                <CountPills
                  label="Bathrooms"
                  value={bathrooms}
                  min={1}
                  max={4}
                  onChange={setBathrooms}
                />
              </div>
            )}

            {isCommercial && (
              <CountPills
                label="Restrooms"
                value={bathrooms}
                min={1}
                max={8}
                onChange={setBathrooms}
              />
            )}

            <div>
              <div className="flex items-baseline justify-between">
                <label
                  htmlFor="sqft"
                  className="text-sm font-semibold text-[var(--lagoon-ink)]"
                >
                  Square footage
                </label>
                <span className="font-[family-name:var(--font-display)] text-lg font-semibold text-[var(--lagoon)]">
                  {sqFt.toLocaleString()} sq ft
                </span>
              </div>
              <input
                id="sqft"
                type="range"
                min={600}
                max={5000}
                step={50}
                value={sqFt}
                onChange={(e) => setSqFt(Number(e.target.value))}
                className="mt-3 w-full cursor-pointer accent-[var(--aqua)]"
              />
              <div className="mt-1 flex justify-between text-xs text-[var(--muted-fg)]">
                <span>600</span>
                <span>5,000</span>
              </div>
            </div>

            <fieldset>
              <legend className="text-sm font-semibold text-[var(--lagoon-ink)]">
                How often?
              </legend>
              <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
                {frequencies.map((f) => (
                  <button
                    key={f.key}
                    type="button"
                    onClick={() => setFrequency(f.key)}
                    className={cn(
                      "cursor-pointer rounded-xl border px-3 py-3 text-center text-sm font-medium transition-all duration-200",
                      frequency === f.key
                        ? "border-[var(--aqua)] bg-[var(--aqua-soft)] text-[var(--lagoon-ink)]"
                        : "border-[var(--border)] text-[var(--muted-fg)] hover:border-[var(--lagoon)]/30",
                    )}
                  >
                    {f.label}
                    {f.discount > 0 && (
                      <span className="mt-0.5 block text-[10px] font-normal text-[var(--lagoon)]">
                        Save {Math.round(f.discount * 100)}%
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend className="text-sm font-semibold text-[var(--lagoon-ink)]">
                Add-ons
              </legend>
              <div className="mt-3 grid gap-2 sm:grid-cols-2">
                {addOns.map((a) => {
                  const selected = selectedAddOns.includes(a.key);
                  return (
                    <button
                      key={a.key}
                      type="button"
                      onClick={() => toggleAddOn(a.key)}
                      className={cn(
                        "flex cursor-pointer items-center justify-between rounded-xl border px-4 py-3 text-left text-sm transition-all duration-200",
                        selected
                          ? "border-[var(--aqua)] bg-[var(--aqua-soft)]"
                          : "border-[var(--border)] hover:border-[var(--lagoon)]/30",
                      )}
                    >
                      <span className="font-medium text-[var(--lagoon-ink)]">
                        {a.label}
                      </span>
                      <span className="text-[var(--muted-fg)]">+${a.price}</span>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <Button
              className="w-full sm:w-auto"
              onClick={() => setStep("book")}
            >
              Book this clean
              <ChevronRight className="size-4" aria-hidden />
            </Button>
          </div>
        ) : (
          <form onSubmit={handleBook} className="space-y-6">
            <div>
              <button
                type="button"
                onClick={() => setStep("calc")}
                className="cursor-pointer text-sm font-medium text-[var(--lagoon)] transition-opacity duration-200 hover:opacity-80"
              >
                ← Back to calculator
              </button>
              <h2 className="mt-3 font-[family-name:var(--font-display)] text-2xl font-semibold text-[var(--lagoon-ink)] md:text-3xl">
                Book your cleaning
              </h2>
              <p className="mt-2 text-sm text-[var(--muted-fg)]">
                Estimated total{" "}
                <strong className="text-[var(--lagoon)]">${quote.total}</strong>{" "}
                · {quote.service.shortName} ·{" "}
                {frequencies.find((f) => f.key === frequency)?.label}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field
                label="Full name"
                required
                value={form.name}
                onChange={(v) => setForm((f) => ({ ...f, name: v }))}
              />
              <Field
                label="Phone"
                type="tel"
                required
                value={form.phone}
                onChange={(v) => setForm((f) => ({ ...f, phone: v }))}
              />
              <Field
                label="Email"
                type="email"
                required
                value={form.email}
                onChange={(v) => setForm((f) => ({ ...f, email: v }))}
                className="sm:col-span-2"
              />
              <Field
                label="Service address"
                required
                value={form.address}
                onChange={(v) => setForm((f) => ({ ...f, address: v }))}
                className="sm:col-span-2"
                placeholder="Street, Apopka, FL"
              />
              <Field
                label="Preferred date"
                type="date"
                required
                value={form.date}
                onChange={(v) => setForm((f) => ({ ...f, date: v }))}
              />
            </div>

            <div>
              <label
                htmlFor="notes"
                className="text-sm font-semibold text-[var(--lagoon-ink)]"
              >
                Notes (optional)
              </label>
              <textarea
                id="notes"
                rows={3}
                value={form.notes}
                onChange={(e) =>
                  setForm((f) => ({ ...f, notes: e.target.value }))
                }
                className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--mist)] px-4 py-3 text-sm text-[var(--lagoon-ink)] outline-none transition-shadow duration-200 focus:ring-2 focus:ring-[var(--aqua)]"
                placeholder="Pets, gate codes, focus areas…"
              />
            </div>

            {submitError && (
              <p className="text-sm font-medium text-red-700" role="alert">
                {submitError}
              </p>
            )}

            <Button type="submit" className="w-full sm:w-auto" disabled={submitting}>
              {submitting ? "Sending…" : "Request booking"}
            </Button>
          </form>
        )}
      </div>

      <aside className="animate-fade-up-delay sticky top-8 h-fit rounded-2xl bg-[var(--lagoon)] p-6 text-white shadow-[0_20px_60px_-30px_rgba(10,61,69,0.45)] md:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--aqua)]">
          Your estimate
        </p>
        <p className="mt-4 font-[family-name:var(--font-display)] text-5xl font-semibold tracking-tight">
          ${quote.total}
        </p>
        <p className="mt-1 text-sm text-white/65">
          {frequencies.find((f) => f.key === frequency)?.label} ·{" "}
          {quote.service.shortName}
        </p>

        <dl className="mt-8 space-y-3 border-t border-white/15 pt-6 text-sm">
          <Row label="Base package" value={`$${quote.subtotal + quote.discount}`} />
          {quote.discount > 0 && (
            <Row label="Recurring discount" value={`−$${quote.discount}`} />
          )}
          <Row label="Estimated total" value={`$${quote.total}`} strong />
        </dl>

        <ul className="mt-8 space-y-2 text-sm text-white/70">
          <li className="flex gap-2">
            <Check className="mt-0.5 size-4 shrink-0 text-[var(--aqua)]" aria-hidden />
            Free estimates · no card required to request
          </li>
          <li className="flex gap-2">
            <Check className="mt-0.5 size-4 shrink-0 text-[var(--aqua)]" aria-hidden />
            Fully insured local team in {business.city}
          </li>
          <li className="flex gap-2">
            <Check className="mt-0.5 size-4 shrink-0 text-[var(--aqua)]" aria-hidden />
            Final price confirmed before we arrive
          </li>
        </ul>
      </aside>
    </div>
  );
}

/** One tap per answer beats stepping a counter, especially on mobile. */
function CountPills({
  label,
  value,
  min,
  max,
  zeroLabel,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  zeroLabel?: string;
  onChange: (n: number) => void;
}) {
  const choices = Array.from({ length: max - min + 1 }, (_, i) => min + i);

  return (
    <div>
      <p className="text-sm font-semibold text-[var(--lagoon-ink)]">{label}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {choices.map((choice) => (
          <button
            key={choice}
            type="button"
            aria-pressed={value === choice}
            onClick={() => onChange(choice)}
            className={cn(
              "min-w-11 cursor-pointer rounded-full border px-3.5 py-2 text-sm font-medium transition-all duration-200",
              value === choice
                ? "border-[var(--aqua)] bg-[var(--aqua-soft)] text-[var(--lagoon-ink)]"
                : "border-[var(--border)] text-[var(--muted-fg)] hover:border-[var(--lagoon)]/30 hover:bg-[var(--mist)]",
            )}
          >
            {choice === 0 && zeroLabel
              ? zeroLabel
              : choice === max
                ? `${choice}+`
                : choice}
          </button>
        ))}
      </div>
    </div>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
  required,
  className,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
  required?: boolean;
  className?: string;
  placeholder?: string;
}) {
  const id = label.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className={className}>
      <label htmlFor={id} className="text-sm font-semibold text-[var(--lagoon-ink)]">
        {label}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full rounded-xl border border-[var(--border)] bg-[var(--mist)] px-4 py-3 text-sm text-[var(--lagoon-ink)] outline-none transition-shadow duration-200 focus:ring-2 focus:ring-[var(--aqua)]"
      />
    </div>
  );
}

function Row({
  label,
  value,
  strong,
}: {
  label: string;
  value: string;
  strong?: boolean;
}) {
  return (
    <div className="flex justify-between gap-4">
      <dt className={strong ? "font-semibold text-white" : "text-white/65"}>
        {label}
      </dt>
      <dd className={strong ? "font-semibold text-[var(--aqua)]" : "text-white"}>
        {value}
      </dd>
    </div>
  );
}
