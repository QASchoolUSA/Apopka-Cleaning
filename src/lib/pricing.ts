import { getService, type Service, type ServiceSlug } from "@/lib/services";

/**
 * Every number this site charges. Booking Broom is the source of truth; the
 * values in `DEFAULT_PRICING_CONFIG` are what shipped and are used whenever the
 * dashboard cannot be reached, so a quote is never blocked on it.
 */
export type ServiceRate = {
  key: string;
  /** Floor the discounted total can never fall below. */
  startingAt: number;
  baseRate: number;
  perBedroom: number;
  perBathroom: number;
  perSqFt: number;
};

export type PricingConfig = {
  kind: "room-plus-sqft";
  serviceRates: ServiceRate[];
  /** Square footage included before perSqFt starts applying. */
  freeSqFt: number;
  addOns: { key: string; label: string; price: number }[];
  frequencies: { key: string; label: string; discount: number }[];
};

export const DEFAULT_PRICING_CONFIG: PricingConfig = {
  kind: "room-plus-sqft",
  serviceRates: [
    {
      key: "residential",
      startingAt: 129,
      baseRate: 89,
      perBedroom: 25,
      perBathroom: 30,
      perSqFt: 0.05,
    },
    {
      key: "deep-cleaning",
      startingAt: 249,
      baseRate: 179,
      perBedroom: 40,
      perBathroom: 45,
      perSqFt: 0.08,
    },
    {
      key: "move-in-out",
      startingAt: 299,
      baseRate: 219,
      perBedroom: 45,
      perBathroom: 50,
      perSqFt: 0.09,
    },
    {
      key: "commercial",
      startingAt: 199,
      baseRate: 149,
      perBedroom: 0,
      perBathroom: 35,
      perSqFt: 0.06,
    },
    {
      key: "office",
      startingAt: 159,
      baseRate: 119,
      perBedroom: 0,
      perBathroom: 30,
      perSqFt: 0.055,
    },
    {
      key: "carpet-upholstery",
      startingAt: 149,
      baseRate: 99,
      perBedroom: 35,
      perBathroom: 0,
      perSqFt: 0.12,
    },
  ],
  freeSqFt: 800,
  addOns: [
    { key: "fridge", label: "Inside fridge", price: 35 },
    { key: "oven", label: "Inside oven", price: 35 },
    { key: "windows", label: "Interior windows", price: 45 },
    { key: "laundry", label: "Laundry (1 load)", price: 25 },
    { key: "blinds", label: "Blinds dusted", price: 30 },
    { key: "garage", label: "Garage sweep", price: 40 },
  ],
  frequencies: [
    { key: "one-time", label: "One-time", discount: 0 },
    { key: "weekly", label: "Weekly", discount: 0.2 },
    { key: "biweekly", label: "Biweekly", discount: 0.15 },
    { key: "monthly", label: "Monthly", discount: 0.1 },
  ],
};

export type Frequency = string;

/**
 * Guards against a remote config that parses as JSON but has no rate for a
 * service the site sells, which would otherwise quote that service at $0.
 */
export function isUsablePricingConfig(value: unknown): value is PricingConfig {
  if (!value || typeof value !== "object") return false;
  const config = value as Partial<PricingConfig>;
  if (config.kind !== "room-plus-sqft") return false;
  if (typeof config.freeSqFt !== "number") return false;
  if (!Array.isArray(config.addOns) || config.addOns.length === 0) return false;
  if (!Array.isArray(config.frequencies) || config.frequencies.length === 0) {
    return false;
  }
  if (!Array.isArray(config.serviceRates)) return false;

  return DEFAULT_PRICING_CONFIG.serviceRates.every((shipped) =>
    config.serviceRates!.some((rate) => rate.key === shipped.key)
  );
}

export function rateFor(
  slug: ServiceSlug,
  config: PricingConfig = DEFAULT_PRICING_CONFIG
): ServiceRate | undefined {
  return config.serviceRates.find((rate) => rate.key === slug);
}

/** The "from $X" figure published on service pages. */
export function startingAt(
  slug: ServiceSlug,
  config: PricingConfig = DEFAULT_PRICING_CONFIG
): number {
  return rateFor(slug, config)?.startingAt ?? 0;
}

export type QuoteInput = {
  serviceSlug: ServiceSlug;
  bedrooms: number;
  bathrooms: number;
  sqFt: number;
  frequency: Frequency;
  addOnIds: string[];
};

export function calculateQuote(
  input: QuoteInput,
  config: PricingConfig = DEFAULT_PRICING_CONFIG
): {
  subtotal: number;
  discount: number;
  total: number;
  service: Service;
} {
  const service = getService(input.serviceSlug);
  if (!service) {
    throw new Error("Unknown service");
  }

  const rate = rateFor(input.serviceSlug, config);
  if (!rate) {
    throw new Error(`No pricing for service "${input.serviceSlug}"`);
  }

  const roomCost =
    rate.baseRate +
    input.bedrooms * rate.perBedroom +
    input.bathrooms * rate.perBathroom +
    Math.max(0, input.sqFt - config.freeSqFt) * rate.perSqFt;

  const addOnCost = input.addOnIds.reduce((sum, id) => {
    const addOn = config.addOns.find((a) => a.key === id);
    return sum + (addOn?.price ?? 0);
  }, 0);

  const subtotal = Math.round(roomCost + addOnCost);
  const freq = config.frequencies.find((f) => f.key === input.frequency);
  const discount = Math.round(subtotal * (freq?.discount ?? 0));
  const total = Math.max(subtotal - discount, rate.startingAt);

  return { subtotal, discount, total, service };
}
