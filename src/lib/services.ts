export type ServiceSlug =
  | "residential"
  | "deep-cleaning"
  | "move-in-out"
  | "commercial"
  | "office"
  | "carpet-upholstery";

export type Service = {
  slug: ServiceSlug;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  heroImage: string;
  heroAlt: string;
  includes: string[];
  idealFor: string[];
  duration: string;
  startingAt: number;
  baseRate: number;
  perBedroom: number;
  perBathroom: number;
  perSqFt: number;
};

export const services: Service[] = [
  {
    slug: "residential",
    name: "Residential Cleaning",
    shortName: "Residential",
    tagline: "Steady freshness for the home you live in every day.",
    description:
      "Recurring or one-time house cleaning tailored to Apopka homes—kitchens, baths, floors, and living spaces left bright and ready.",
    heroImage:
      "https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=2000&q=80",
    heroAlt: "Professional cleaner wiping a kitchen counter in a bright home",
    includes: [
      "Kitchen surfaces, sink, and appliance exteriors",
      "Bathrooms scrubbed and sanitized",
      "Dusting of reachable surfaces and furniture",
      "Vacuum and mop of hard floors",
      "Bedroom and living area tidy-up",
      "Trash emptied and liners replaced",
    ],
    idealFor: [
      "Busy households",
      "Weekly or biweekly upkeep",
      "Families who want consistency",
    ],
    duration: "2–4 hours",
    startingAt: 129,
    baseRate: 89,
    perBedroom: 25,
    perBathroom: 30,
    perSqFt: 0.05,
  },
  {
    slug: "deep-cleaning",
    name: "Deep Cleaning",
    shortName: "Deep Clean",
    tagline: "A thorough reset for every corner that usually gets skipped.",
    description:
      "Detail-focused cleaning that reaches baseboards, inside appliances, and build-up in kitchens and baths—ideal seasonally or before big gatherings.",
    heroImage:
      "https://images.unsplash.com/photo-1563453392212-326f5e854473?auto=format&fit=crop&w=2000&q=80",
    heroAlt: "Sparkling clean bathroom with fresh towels",
    includes: [
      "Everything in a residential clean, plus",
      "Baseboards, door frames, and light switches",
      "Inside microwave and oven exterior deep scrub",
      "Detailed bathroom scale and grout attention",
      "Ceiling fan blades within reach",
      "Cabinet fronts and window sills wiped",
    ],
    idealFor: [
      "Seasonal resets",
      "First-time cleanings",
      "Homes that need extra attention",
    ],
    duration: "4–7 hours",
    startingAt: 249,
    baseRate: 179,
    perBedroom: 40,
    perBathroom: 45,
    perSqFt: 0.08,
  },
  {
    slug: "move-in-out",
    name: "Move-In / Move-Out Cleaning",
    shortName: "Move-In/Out",
    tagline: "Leave keys with confidence—empty homes, spotless finish.",
    description:
      "Vacant-home cleans built for landlords, tenants, and new owners across Apopka and nearby Orange County communities.",
    heroImage:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=2000&q=80",
    heroAlt: "Bright empty living room ready for move-in",
    includes: [
      "Full kitchen including inside cabinets & appliances",
      "All bathrooms deep-sanitized",
      "Closets wiped and vacuumed",
      "Windowsills, tracks, and interior glass wipe",
      "Floors vacuumed and mopped end-to-end",
      "Wipe-down of vents and fixtures within reach",
    ],
    idealFor: [
      "Lease turnovers",
      "Home sales",
      "New homeowners before unpacking",
    ],
    duration: "5–8 hours",
    startingAt: 299,
    baseRate: 219,
    perBedroom: 45,
    perBathroom: 50,
    perSqFt: 0.09,
  },
  {
    slug: "commercial",
    name: "Commercial Cleaning",
    shortName: "Commercial",
    tagline: "Clean spaces that support the work you do every day.",
    description:
      "Reliable cleaning for retail, clinics, and light commercial spaces in Apopka—scheduled around your hours so business never stops.",
    heroImage:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=2000&q=80",
    heroAlt: "Modern commercial office interior with clean floors",
    includes: [
      "Common areas and restrooms",
      "Floor care for lobby and corridors",
      "Trash and recycling removal",
      "Dusting of desks and fixtures (as directed)",
      "Glass entryways wiped",
      "Restocked consumables when supplied",
    ],
    idealFor: [
      "Storefronts",
      "Medical & wellness suites",
      "Shared workspaces",
    ],
    duration: "Custom schedule",
    startingAt: 199,
    baseRate: 149,
    perBedroom: 0,
    perBathroom: 35,
    perSqFt: 0.06,
  },
  {
    slug: "office",
    name: "Office Cleaning",
    shortName: "Office",
    tagline: "Desks, meeting rooms, and kitchens kept presentation-ready.",
    description:
      "Nightly or weekly office cleans for Apopka teams who want a polished workplace without managing it themselves.",
    heroImage:
      "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=2000&q=80",
    heroAlt: "Clean modern open office workspace",
    includes: [
      "Workstations dusted and surfaces wiped",
      "Conference rooms reset",
      "Kitchenette and breakroom cleaned",
      "Restrooms sanitized",
      "Vacuum and mop of office floors",
      "Reception area refreshed",
    ],
    idealFor: [
      "Small to mid-size offices",
      "Co-working suites",
      "Professional practices",
    ],
    duration: "2–5 hours",
    startingAt: 159,
    baseRate: 119,
    perBedroom: 0,
    perBathroom: 30,
    perSqFt: 0.055,
  },
  {
    slug: "carpet-upholstery",
    name: "Carpet & Upholstery",
    shortName: "Carpet & Upholstery",
    tagline: "Revive soft surfaces that vacuuming alone can’t refresh.",
    description:
      "Targeted carpet and upholstery refresh for living rooms, offices, and high-traffic areas—removing soil so spaces feel lighter again.",
    heroImage:
      "https://images.unsplash.com/photo-1558317374-067fb5f30001?auto=format&fit=crop&w=2000&q=80",
    heroAlt: "Freshly cleaned carpet in a sunny living room",
    includes: [
      "Pre-treatment of high-traffic paths",
      "Carpet extraction or shampoo as suited",
      "Upholstery spot and surface cleaning",
      "Furniture moved and returned (reasonable weight)",
      "Faster dry-time methods when available",
      "Odor-neutralizing finish when requested",
    ],
    idealFor: [
      "Pet households",
      "After parties or spills",
      "Seasonal refresh",
    ],
    duration: "2–4 hours",
    startingAt: 149,
    baseRate: 99,
    perBedroom: 35,
    perBathroom: 0,
    perSqFt: 0.12,
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export const addOns = [
  { id: "fridge", label: "Inside fridge", price: 35 },
  { id: "oven", label: "Inside oven", price: 35 },
  { id: "windows", label: "Interior windows", price: 45 },
  { id: "laundry", label: "Laundry (1 load)", price: 25 },
  { id: "blinds", label: "Blinds dusted", price: 30 },
  { id: "garage", label: "Garage sweep", price: 40 },
] as const;

export type Frequency = "one-time" | "weekly" | "biweekly" | "monthly";

export const frequencies: {
  id: Frequency;
  label: string;
  discount: number;
}[] = [
  { id: "one-time", label: "One-time", discount: 0 },
  { id: "weekly", label: "Weekly", discount: 0.2 },
  { id: "biweekly", label: "Biweekly", discount: 0.15 },
  { id: "monthly", label: "Monthly", discount: 0.1 },
];

export type QuoteInput = {
  serviceSlug: ServiceSlug;
  bedrooms: number;
  bathrooms: number;
  sqFt: number;
  frequency: Frequency;
  addOnIds: string[];
};

export function calculateQuote(input: QuoteInput): {
  subtotal: number;
  discount: number;
  total: number;
  service: Service;
} {
  const service = getService(input.serviceSlug);
  if (!service) {
    throw new Error("Unknown service");
  }

  const roomCost =
    service.baseRate +
    input.bedrooms * service.perBedroom +
    input.bathrooms * service.perBathroom +
    Math.max(0, input.sqFt - 800) * service.perSqFt;

  const addOnCost = input.addOnIds.reduce((sum, id) => {
    const addOn = addOns.find((a) => a.id === id);
    return sum + (addOn?.price ?? 0);
  }, 0);

  const subtotal = Math.round(roomCost + addOnCost);
  const freq = frequencies.find((f) => f.id === input.frequency);
  const discount = Math.round(subtotal * (freq?.discount ?? 0));
  const total = Math.max(subtotal - discount, service.startingAt);

  return { subtotal, discount, total, service };
}

export const business = {
  name: "Apopka Cleaning",
  city: "Apopka, FL",
  phone: "(407) 555-0148",
  phoneHref: "tel:+14075550148",
  email: "hello@apopkacleaning.com",
  emailHref: "mailto:hello@apopkacleaning.com",
  hours: "Mon–Sat · 8am–6pm",
  area: "Apopka & nearby Orange County",
};
