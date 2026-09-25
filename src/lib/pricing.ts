import { getService, type Service, type ServiceSlug } from "@/lib/services";

/**
 * sqft-rate-min engine (Davenport pattern) with STANDARD rates.
 * Booking Broom is the source of truth; DEFAULT_PRICING_CONFIG is the offline fallback.
 */

export type ServiceTypeId =
  | "house"
  | "apartment"
  | "move"
  | "airbnb"
  | "post-construction"
  | "maintenance"
  | "deep";

export type FrequencyId = "one-time" | "weekly" | "bi-weekly" | "monthly";

export type AddonId =
  | "kitchen-deep"
  | "oven"
  | "fridge"
  | "windows-interior"
  | "windows-exterior"
  | "laundry"
  | "cabinets"
  | "garage"
  | "balcony"
  | "pets";

export type PricingConfig = {
  kind: "sqft-rate-min";
  serviceRates: { key: string; perSqft: number; minBase: number }[];
  bedroomRate: number;
  bathroomRate: number;
  frequencyMultipliers: { key: string; label: string; multiplier: number }[];
  addOns: { key: string; label: string; price: number }[];
  sqftPresets: { label: string; value: number }[];
  minSqft: number;
  maxSqft: number;
};

export const DEFAULT_PRICING_CONFIG: PricingConfig = {
  kind: "sqft-rate-min",
  serviceRates: [
    { key: "house", perSqft: 0.15, minBase: 129 },
    { key: "apartment", perSqft: 0.15, minBase: 99 },
    { key: "move", perSqft: 0.23, minBase: 189 },
    { key: "airbnb", perSqft: 0.12, minBase: 149 },
    { key: "post-construction", perSqft: 0.39, minBase: 249 },
    { key: "maintenance", perSqft: 0.15, minBase: 109 },
    { key: "deep", perSqft: 0.2, minBase: 199 },
  ],
  bedroomRate: 18,
  bathroomRate: 28,
  frequencyMultipliers: [
    { key: "one-time", label: "One-time", multiplier: 1 },
    { key: "weekly", label: "Weekly", multiplier: 0.85 },
    { key: "bi-weekly", label: "Bi-weekly", multiplier: 0.9 },
    { key: "monthly", label: "Monthly", multiplier: 0.95 },
  ],
  addOns: [
    { key: "kitchen-deep", label: "Kitchen deep clean", price: 45 },
    { key: "oven", label: "Oven cleaning", price: 35 },
    { key: "fridge", label: "Fridge cleaning", price: 35 },
    { key: "windows-interior", label: "Windows (interior)", price: 40 },
    { key: "windows-exterior", label: "Windows (exterior)", price: 55 },
    { key: "laundry", label: "Laundry fold & put away", price: 25 },
    { key: "cabinets", label: "Inside cabinets", price: 40 },
    { key: "garage", label: "Garage sweep & wipe", price: 50 },
    { key: "balcony", label: "Patio / balcony", price: 30 },
    { key: "pets", label: "Pet-friendly detail", price: 20 },
  ],
  sqftPresets: [
    { label: "Under 800 sq ft", value: 600 },
    { label: "800\u20131,200 sq ft", value: 1000 },
    { label: "1,200\u20132,000 sq ft", value: 1600 },
    { label: "2,000\u20132,600 sq ft", value: 2200 },
    { label: "2,600+ sq ft", value: 3000 },
  ],
  minSqft: 400,
  maxSqft: 6000,
};

/** Marketing page slugs → unified BB service keys. */
export const SERVICE_SLUG_TO_TYPE: Record<ServiceSlug, ServiceTypeId> = {
  residential: "house",
  "deep-cleaning": "deep",
  "move-in-out": "move",
  commercial: "house",
  office: "apartment",
  "carpet-upholstery": "house",
};

const SERVICE_TYPE_IDS: ServiceTypeId[] = [
  "house",
  "apartment",
  "move",
  "airbnb",
  "post-construction",
  "maintenance",
  "deep",
];

const ADDON_IDS: AddonId[] = [
  "kitchen-deep",
  "oven",
  "fridge",
  "windows-interior",
  "windows-exterior",
  "laundry",
  "cabinets",
  "garage",
  "balcony",
  "pets",
];

const FREQUENCY_IDS: FrequencyId[] = [
  "one-time",
  "weekly",
  "bi-weekly",
  "monthly",
];

export type Frequency = FrequencyId | string;

export function isUsablePricingConfig(value: unknown): value is PricingConfig {
  if (!value || typeof value !== "object") return false;
  const config = value as Partial<PricingConfig>;
  if (config.kind !== "sqft-rate-min") return false;
  if (typeof config.bedroomRate !== "number") return false;
  if (typeof config.bathroomRate !== "number") return false;
  if (typeof config.minSqft !== "number") return false;
  if (typeof config.maxSqft !== "number") return false;
  if (!Array.isArray(config.sqftPresets) || config.sqftPresets.length === 0) {
    return false;
  }
  if (!Array.isArray(config.serviceRates)) return false;
  if (!Array.isArray(config.frequencyMultipliers)) return false;
  if (!Array.isArray(config.addOns)) return false;

  return (
    SERVICE_TYPE_IDS.every((id) =>
      config.serviceRates!.some((rate) => rate.key === id),
    ) &&
    FREQUENCY_IDS.every((id) =>
      config.frequencyMultipliers!.some((freq) => freq.key === id),
    ) &&
    ADDON_IDS.every((id) => config.addOns!.some((addOn) => addOn.key === id))
  );
}

function normalizeFrequency(key: string): FrequencyId {
  if (key === "biweekly") return "bi-weekly";
  if ((FREQUENCY_IDS as string[]).includes(key)) return key as FrequencyId;
  return "one-time";
}

export function calculatePrice(
  input: {
    serviceType: ServiceTypeId;
    sqft: number;
    bedrooms: number;
    bathrooms: number;
    frequency: FrequencyId;
    addons: string[];
  },
  config: PricingConfig = DEFAULT_PRICING_CONFIG,
) {
  const sqft = Math.max(config.minSqft, Math.min(config.maxSqft, input.sqft));
  const bedrooms = Math.max(0, Math.min(8, input.bedrooms));
  const bathrooms = Math.max(1, Math.min(8, input.bathrooms));

  const rate = config.serviceRates.find((r) => r.key === input.serviceType);
  const rawBase = sqft * (rate?.perSqft ?? 0);
  const base = Math.max(rate?.minBase ?? 0, Math.round(rawBase));
  const bedroomCost = bedrooms * config.bedroomRate;
  const bathroomCost = bathrooms * config.bathroomRate;
  const addonCost = input.addons.reduce((sum, id) => {
    const addOn = config.addOns.find((a) => a.key === id);
    return sum + (addOn?.price ?? 0);
  }, 0);

  const subtotal = base + bedroomCost + bathroomCost + addonCost;
  const frequencyMultiplier =
    config.frequencyMultipliers.find((f) => f.key === input.frequency)
      ?.multiplier ?? 1;
  const total = Math.round(subtotal * frequencyMultiplier);
  const frequencyDiscount = Math.round(subtotal - total);

  return {
    base,
    bedrooms: bedroomCost,
    bathrooms: bathroomCost,
    addons: addonCost,
    subtotal,
    frequencyMultiplier,
    frequencyDiscount,
    total,
  };
}

/** Published "from $X" on service cards (maps marketing slug → minBase). */
export function startingAt(
  slug: ServiceSlug,
  config: PricingConfig = DEFAULT_PRICING_CONFIG,
): number {
  const type = SERVICE_SLUG_TO_TYPE[slug];
  return config.serviceRates.find((r) => r.key === type)?.minBase ?? 0;
}

export type QuoteInput = {
  serviceSlug: ServiceSlug;
  bedrooms: number;
  bathrooms: number;
  sqFt: number;
  frequency: Frequency;
  addOnIds: string[];
};

/** Site calculator adapter over sqft-rate-min. */
export function calculateQuote(
  input: QuoteInput,
  config: PricingConfig = DEFAULT_PRICING_CONFIG,
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

  const breakdown = calculatePrice(
    {
      serviceType: SERVICE_SLUG_TO_TYPE[input.serviceSlug],
      sqft: input.sqFt,
      bedrooms: input.bedrooms,
      bathrooms: Math.max(1, input.bathrooms),
      frequency: normalizeFrequency(input.frequency),
      addons: input.addOnIds,
    },
    config,
  );

  return {
    subtotal: breakdown.subtotal,
    discount: breakdown.frequencyDiscount,
    total: breakdown.total,
    service,
  };
}
