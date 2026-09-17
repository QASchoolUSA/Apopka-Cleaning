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
};

export const services: Service[] = [
  {
    slug: "residential",
    name: "Residential Cleaning",
    shortName: "Residential",
    tagline: "Weekly or one-time house cleaning for Apopka homes.",
    description:
      "Kitchens, baths, floors, and living spaces cleaned on a schedule that fits your week.",
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
  },
  {
    slug: "deep-cleaning",
    name: "Deep Cleaning",
    shortName: "Deep Clean",
    tagline: "Extra time for the corners weekly cleaning skips.",
    description:
      "Baseboards, inside appliances, and kitchen and bath buildup — good seasonally or before guests.",
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
  },
  {
    slug: "move-in-out",
    name: "Move-In / Move-Out Cleaning",
    shortName: "Move-In/Out",
    tagline: "Empty-home cleans for landlords, tenants, and new owners.",
    description:
      "Vacant-home cleaning across Apopka and nearby Orange County so keys change hands with a clean space.",
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
  },
  {
    slug: "commercial",
    name: "Commercial Cleaning",
    shortName: "Commercial",
    tagline: "Retail, clinics, and light commercial spaces on your hours.",
    description:
      "Scheduled cleaning for Apopka businesses so the workday keeps moving.",
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
  },
  {
    slug: "office",
    name: "Office Cleaning",
    shortName: "Office",
    tagline: "Desks, meeting rooms, and kitchens kept ready for work.",
    description:
      "Nightly or weekly office cleans for Apopka teams who do not want to manage it themselves.",
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
  },
  {
    slug: "carpet-upholstery",
    name: "Carpet & Upholstery",
    shortName: "Carpet & Upholstery",
    tagline: "Carpet and upholstery cleaning beyond what vacuuming can do.",
    description:
      "Targeted refresh for living rooms, offices, and high-traffic areas that need more than a vacuum.",
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
  },
];

export function getService(slug: string): Service | undefined {
  return services.find((s) => s.slug === slug);
}

export const business = {
  name: "Apopka Cleaning",
  city: "Apopka, FL",
  url: "https://apopkacleaning.com",
  /** Empty until a real number is set — do not publish placeholders. */
  phone: "",
  phoneHref: "",
  email: "hello@apopkacleaning.com",
  emailHref: "mailto:hello@apopkacleaning.com",
  hours: "Mon–Sat · 8am–6pm",
  area: "Apopka & nearby Orange County",
};

export const hasPhone = Boolean(business.phone && business.phoneHref);
