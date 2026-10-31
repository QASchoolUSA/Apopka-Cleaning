export type ServiceSlug =
  | "residential"
  | "deep-cleaning"
  | "move-in-out"
  | "commercial"
  | "office"
  | "carpet-upholstery";

export type RoomChecklist = {
  room: string;
  tasks: string[];
};

export type ServiceFaq = {
  q: string;
  a: string;
};

export type ServiceProcess = {
  step: string;
  title: string;
  description: string;
};

export type Service = {
  slug: ServiceSlug;
  name: string;
  shortName: string;
  tagline: string;
  description: string;
  /** Extra unique body for indexing depth — scope/fit only, no invented local facts. */
  detail: string;
  localContext: string;
  roomChecklist: RoomChecklist[];
  process: ServiceProcess[];
  addOns?: string[];
  faqs: ServiceFaq[];
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
    detail:
      "Recurring residential cleans keep occupied Apopka homes on the same kitchen, bath, floor, and living-area checklist each visit. Choose this when you want weekly, bi-weekly, or monthly upkeep—not a first-time reset or vacant-home turnover. Planning ranges by home size live in our Apopka house cleaning cost guide.",
    localContext:
      "Apopka's sub-tropical climate brings heavy summer humidity, fine quartz sand tracked from lake trails and yards, and strong spring oak pollen. Our routine residential cleans prioritize dust mitigation, pet hair removal, and hard-floor care to prevent sand abrasions on tile and hardwood finishes across Orange County homes.",
    roomChecklist: [
      {
        room: "Kitchen",
        tasks: [
          "Sanitize countertops, backsplash, and island surfaces",
          "Scrub and polish sinks and faucet fixtures",
          "Wipe exterior surfaces of refrigerator, oven, dishwasher, and hood",
          "Clean interior and exterior of microwave",
          "Wipe dining table, breakfast bar, and accessible chair backs",
        ],
      },
      {
        room: "Bathrooms",
        tasks: [
          "Scrub, sanitize, and rinse shower surrounds, bathtubs, and glass doors",
          "Disinfect toilets inside bowl, exterior rim, tank, and base",
          "Clean and shine mirrors and polished chrome hardware",
          "Scrub sink basins, vanities, and clean countertop clutter",
          "Hand-wipe switch plates and sanitize tile flooring",
        ],
      },
      {
        room: "Living & Family Areas",
        tasks: [
          "Dust accessible shelving, media consoles, side tables, and picture frames",
          "Dust ceiling fan blades and light fixtures within reach",
          "Vacuum upholstered furniture surfaces and straighten accent pillows",
          "Clean interior sliding glass door tracks and patio entry glass",
        ],
      },
      {
        room: "Bedrooms",
        tasks: [
          "Dust dressers, nightstands, lamps, and decorative surfaces",
          "Make beds and change bed linens when clean sets are left on the bed",
          "Vacuum carpets, rugs, and underneath bed perimeter where accessible",
          "Empty bedroom wastebaskets and reline containers",
        ],
      },
      {
        room: "Floors & Waste",
        tasks: [
          "Vacuum all rugs and carpets with high-filtration vacuums",
          "Damp mop all tile, vinyl plank, and sealed hardwood floors",
          "Empty trash from all rooms and replace with fresh liners",
        ],
      },
    ],
    process: [
      {
        step: "1",
        title: "Quote & Cadence Selection",
        description:
          "Choose weekly, bi-weekly, or monthly visits via our instant online quote tool based on your home size and lifestyle.",
      },
      {
        step: "2",
        title: "Initial Arrival & Prep",
        description:
          "Our background-checked cleaners arrive during your scheduled window with commercial-grade, pet-safe supplies and sanitized microfiber cloths.",
      },
      {
        step: "3",
        title: "Systematic Top-to-Bottom Cleaning",
        description:
          "We follow a strict 50-point checklist through each room, working top to bottom so dust and soils are thoroughly extracted.",
      },
      {
        step: "4",
        title: "Quality Verification",
        description:
          "A final walkthrough ensures every kitchen counter, bathroom fixture, and floor meets our high local standard before departure.",
      },
    ],
    addOns: [
      "Inside refrigerator wipe & sanitize",
      "Inside oven deep degrease",
      "Interior window pane glass cleaning",
      "Detailed baseboards hand-wiping",
      "Patio / porch sweeping",
    ],
    faqs: [
      {
        q: "Do I need to be home during my residential cleaning appointment?",
        a: "No, you do not need to be present. Many Apopka clients leave a door key, smart lock keypad code, or garage code. Our cleaning team is fully vetted, insured, and background-checked for complete peace of mind.",
      },
      {
        q: "What cleaning supplies and equipment do you bring?",
        a: "We bring all necessary supplies, including high-filtration HEPA vacuums, fresh microfiber cloths, extension dusters, and surface-safe sanitizers. If you have specialty stone counters or preferred wood cleaners, simply leave them out and we will gladly use them.",
      },
      {
        q: "How does recurring house cleaning pricing work in Apopka?",
        a: "Recurring cleaning (weekly or bi-weekly) receives discounted rates compared to one-off visits because the home stays maintained between sessions. You can review typical price ranges in our Apopka house cleaning cost guide.",
      },
      {
        q: "What is your cancellation and rescheduling policy?",
        a: "We ask for at least 24 to 48 hours notice to reschedule or cancel without a fee. We understand that family and work schedules change and we do our best to accommodate your calendar.",
      },
      {
        q: "Are you pet-friendly?",
        a: "Yes! We love pets and use pet-safe, non-toxic cleaning products. We just ask that friendly pets be comfortable with vacuum noises or secured in a comfortable room while we clean.",
      },
    ],
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
    detail:
      "Deep cleans add baseboards, detailed kitchens and baths, and inside appliances when scoped. First visits, seasonal resets, and homes idle 60+ days usually need this before switching to maintenance. Compare price bands with residential cleaning in the local cost guide, then quote online for your address.",
    localContext:
      "Central Florida's sustained humidity accelerates bathroom tile mold and grout staining, while seasonal pollen and AC circulation coat baseboards and door casings with fine grime. Our Apopka deep clean targets these neglected areas with intensive hand scrubbing and degreasing to reset your home to baseline cleanliness.",
    roomChecklist: [
      {
        room: "Detailed Kitchen Scrub",
        tasks: [
          "Hand-wipe cabinet exterior fronts and handles to remove grease build-up",
          "Deep scrub stovetop grates, burner rings, and exterior vent hood",
          "Scrub and descale backsplash tile grout behind cooking and sink areas",
          "Sanitize interior and exterior microwave, including turntable",
          "Polish stainless steel appliance exteriors with protective sheen",
        ],
      },
      {
        room: "Intensive Bathrooms",
        tasks: [
          "Scrub hard-water mineral deposits and soap scum from glass doors",
          "Detailed toothbrush-level scrubbing around faucet fixtures and drains",
          "Deep sanitization and scale removal on shower tile grout lines",
          "Disinfect entire toilet fixture, including rear porcelain and floor bolts",
          "Wipe clean light sconces, exhaust fan vent grilles, and baseboards",
        ],
      },
      {
        room: "Baseboards, Doors & Trim",
        tasks: [
          "Hand-wash baseboards throughout the entire home to remove dust and scuffs",
          "Wipe interior door frames, door panels, and light switch plates",
          "Clean reachable ceiling fans, blades, motor housing, and pull chains",
          "Wipe window sills, interior tracks, and horizontal blind slats",
        ],
      },
      {
        room: "Living Areas & Bedrooms",
        tasks: [
          "Move lightweight furniture to vacuum and mop floor perimeters",
          "Edge vacuum along room perimeters and baseboard joints",
          "Detailed hand dusting of knickknacks, shelving, and home electronics",
          "Dust crown moulding and corner cobwebs using high-reach poles",
        ],
      },
    ],
    process: [
      {
        step: "1",
        title: "Scope Assessment",
        description:
          "We confirm your home square footage, bathroom count, and add-on choices like inside the oven or refrigerator.",
      },
      {
        step: "2",
        title: "High-Dusting & Pre-Treatment",
        description:
          "We begin high: removing ceiling cobwebs and dusting fans, while applying specialized breakdown cleaners to bathroom scale and kitchen grease.",
      },
      {
        step: "3",
        title: "Hand-Detailing & Scrubbing",
        description:
          "Our technicians hand-scrub baseboards, door frames, tile grout lines, and bathroom glass fixtures systematically.",
      },
      {
        step: "4",
        title: "Deep Floor Extraction & Inspection",
        description:
          "After surfaces are restored, floors receive thorough vacuuming and multiple damp-mop passes, concluding with a quality review.",
      },
    ],
    addOns: [
      "Inside oven deep cleaning",
      "Inside refrigerator & freezer detailing",
      "Interior window panes and glass tracks",
      "Inside kitchen cabinets and pantry shelves",
    ],
    faqs: [
      {
        q: "What makes a deep clean different from a regular cleaning?",
        a: "A regular cleaning focuses on weekly surface maintenance (countertops, bathroom sanitization, vacuuming, mopping). A deep clean includes exhaustive hand-wiping of baseboards, door trim, light switches, detailed tile grout scrubbing, scale removal on shower glass, and deep grime removal that standard upkeep skips.",
      },
      {
        q: "How long does a deep cleaning take for an average Apopka home?",
        a: "Most 3-bedroom, 2-bathroom homes in Apopka take between 4 and 7 hours depending on the home's square footage, whether pets are present, and the time elapsed since the last professional clean.",
      },
      {
        q: "Do I need a deep clean before starting recurring cleaning?",
        a: "We highly recommend a deep clean as the initial visit. It resets the home to a pristine baseline, allowing future bi-weekly or monthly maintenance visits to be faster, more consistent, and more economical.",
      },
      {
        q: "Can I add inside-the-oven and inside-the-fridge cleaning to my deep clean?",
        a: "Yes! You can easily select interior oven degreasing and interior refrigerator/freezer sanitization when building your quote online or mentioning it before your service visit.",
      },
    ],
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
    detail:
      "Vacant-home cleaning across Apopka and nearby Orange County so keys change hands with a clean space. We sanitize empty homes from baseboard to ceiling fan, cleaning inside cabinetry, pantries, closets, and appliances so moving day is hassle-free.",
    localContext:
      "Moving in or out in Apopka often involves tight real estate closing deadlines and strict lease inspection requirements. Vacant spaces reveal settled dust, closet lint, and scuffed baseboards that were previously covered by furniture. We help tenants secure full security deposit refunds and allow new homeowners to unpack in a fully sanitized environment.",
    roomChecklist: [
      {
        room: "Kitchen & Pantry",
        tasks: [
          "Wipe and sanitize inside and outside of all kitchen cabinets and drawers",
          "Clean inside, outside, and behind accessible refrigerator and freezer",
          "Degrease oven interior, oven racks, and stovetop drip pans",
          "Deep clean dishwasher interior rim and exterior door",
          "Wipe pantry shelving and vacuum crumb buildup",
        ],
      },
      {
        room: "Bathrooms",
        tasks: [
          "Total descaling of tub and shower surround tile and glass doors",
          "Sanitize toilet interior, exterior, tank lid, and floor perimeter",
          "Clean inside medicine cabinets and under-sink vanity drawers",
          "Polish mirrors, vanity faucets, towel bars, and paper holders",
          "Hand-wipe baseboards and mop all bathroom tile floor areas",
        ],
      },
      {
        room: "Closets & Bedrooms",
        tasks: [
          "Vacuum all bedroom closet floors and wipe shelving and hanging rods",
          "Dust ceiling fans, light fixtures, and wall vents",
          "Wipe interior doors, door handles, and strike plates",
          "Edge vacuum along wall-to-wall carpeting and perimeter baseboards",
        ],
      },
      {
        room: "Windows, Trims & Common Spaces",
        tasks: [
          "Hand-wash all baseboards and moulding throughout the empty property",
          "Clean interior window sills, tracks, and sliding glass patio doors",
          "Vacuum and mop all hard flooring wall-to-wall without furniture obstructions",
          "Remove lingering cobwebs in hallways, entryways, and stairwells",
        ],
      },
    ],
    process: [
      {
        step: "1",
        title: "Vacant Property Scheduling",
        description:
          "Schedule your clean after moving trucks are loaded or before furniture delivery to ensure maximum surface access.",
      },
      {
        step: "2",
        title: "Utilities & Condition Check",
        description:
          "We verify that power and water are active, then conduct an initial walkthrough to note any high-priority areas or scuffs.",
      },
      {
        step: "3",
        title: "Top-to-Bottom Sanitization",
        description:
          "Our crew systematically cleans all interior cabinetry, appliances, bathrooms, doors, baseboards, and living spaces.",
      },
      {
        step: "4",
        title: "Inspection-Ready Handover",
        description:
          "All floors are vacuumed and mopped out toward the exit, leaving the home spotless for property managers or incoming buyers.",
      },
    ],
    addOns: [
      "Interior garage sweeping & spiderweb clearing",
      "Patio / screened lanai sweeping",
      "Carpet deep extraction add-on",
    ],
    faqs: [
      {
        q: "Do water and electric utilities need to be on for move-out cleaning?",
        a: "Yes. Our team requires running water for sanitizing and mopping, as well as working electricity for high-power vacuums and lighting. Working air conditioning is also essential during Florida warm weather.",
      },
      {
        q: "Does move-out cleaning include inside cabinets and appliances?",
        a: "Yes. Our standard move-in / move-out service includes cleaning the interior and exterior of all kitchen cabinets, drawers, pantry shelves, refrigerator, and oven, as long as the home is vacant.",
      },
      {
        q: "Will this cleaning help me get my rental security deposit back?",
        a: "Yes! Our checklist is built directly around standard Florida landlord and property management checkout requirements. We leave kitchens, baths, closets, and floors in move-in condition.",
      },
      {
        q: "How far in advance should I schedule my move-in or move-out clean in Apopka?",
        a: "Because moving dates can be competitive (especially at month-end), we recommend booking 1 to 2 weeks in advance. However, we also accommodate last-minute closing schedule changes whenever possible.",
      },
    ],
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
    detail:
      "Scheduled cleaning for Apopka businesses so the workday keeps moving. We deliver reliable janitorial support for storefronts, healthcare suites, wellness practices, and shared commercial properties across Orange County on off-peak hours.",
    localContext:
      "Apopka's expanding business corridors—including US-441, Kelly Park Crossings, and downtown commercial plazas—rely on pristine customer environments. From high-touch door hardware to sanitary public restrooms and spotless lobby floors, our commercial cleaning preserves your brand reputation and employee health.",
    roomChecklist: [
      {
        room: "Entryway & Customer Reception",
        tasks: [
          "Clean front entrance glass doors and remove handprints and smudges",
          "Disinfect reception counter surfaces, guest pens, and check-in tablets",
          "Vacuum walk-off entrance floor mats and polish entryway tile flooring",
          "Sanitize client waiting room chairs, armrests, and magazine tables",
        ],
      },
      {
        room: "Public & Employee Restrooms",
        tasks: [
          "Commercial-grade disinfection of toilets, urinals, and privacy stalls",
          "Scrub and sanitize sinks, vanity counters, and polished chrome faucets",
          "Clean and streak-free polish all bathroom mirrors",
          "Restock paper towels, toilet paper, and soap dispensers from customer supply",
          "Mop and deodorize restroom tile floors with hospital-grade disinfectant",
        ],
      },
      {
        room: "Breakrooms & Kitchens",
        tasks: [
          "Clean and sanitize countertop surfaces and food prep areas",
          "Wipe exterior surfaces of refrigerators, microwaves, and water coolers",
          "Scrub breakroom sink basin and polish fixtures",
          "Disinfect shared dining tables, chair surfaces, and trash can lids",
        ],
      },
      {
        room: "Waste & Floor Maintenance",
        tasks: [
          "Empty all desk wastebaskets and recycling receptacles into exterior dumpsters",
          "Reline all trash cans with appropriate commercial bag sizes",
          "Dust mop and damp mop all commercial VCT, tile, and polished concrete floors",
          "Vacuum all commercial carpet walkways and high-traffic corridors",
        ],
      },
    ],
    process: [
      {
        step: "1",
        title: "Facility Walkthrough",
        description:
          "We review your facility layout, high-touch priority zones, operating hours, and specific security procedures.",
      },
      {
        step: "2",
        title: "Tailored Scope & Schedule",
        description:
          "Choose evening, early morning, or weekend visits at a frequency that matches your customer traffic (nightly, 3x/week, or weekly).",
      },
      {
        step: "3",
        title: "Consistent Vetted Crew",
        description:
          "Dedicated, insured cleaning staff perform scheduled services using standardized commercial checklists.",
      },
      {
        step: "4",
        title: "Account Oversight",
        description:
          "Direct communication with our local team ensures supply replenishment and scope adjustments are handled promptly.",
      },
    ],
    addOns: [
      "Commercial carpet extraction",
      "Tile and grout mechanical scrub",
      "Interior office window washing",
    ],
    faqs: [
      {
        q: "Can commercial cleanings be performed after normal business hours?",
        a: "Yes. Most of our commercial clients in Apopka schedule evening or weekend cleanings so daily business operations, clients, and staff are never disrupted.",
      },
      {
        q: "Are your cleaners insured and bonded for commercial facilities?",
        a: "Yes, Apopka Cleaning is fully insured and bonded. Our cleaners undergo background checks and adhere to strict security and keycard management protocols.",
      },
      {
        q: "What types of commercial facilities do you clean in Apopka?",
        a: "We service retail storefronts, professional practices, medical and dental clinics, fitness and wellness studios, daycare facilities, and commercial office suites throughout Orange County.",
      },
      {
        q: "Do you require long-term lock-in contracts?",
        a: "No. We believe in earning your business visit by visit. We offer flexible service agreements with simple 30-day cancellation terms.",
      },
    ],
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
    detail:
      "Nightly or weekly office cleans for Apopka teams who do not want to manage it themselves. From conference table polishing to kitchenette sanitizing and trash removal, we maintain productive, hygienic office environments.",
    localContext:
      "Offices in Central Florida face high AC circulation that traps airborne dust and allergen particles. Regular office sanitation prevents the spread of workplace colds and flu while presenting an organized, professional image to visiting clients and corporate partners in Apopka.",
    roomChecklist: [
      {
        room: "Workstations & Desks",
        tasks: [
          "Dust open desk surfaces without disturbing active paperwork",
          "Disinfect computer keyboards, mouse accessories, and telephone handsets",
          "Wipe executive chairs, desk bases, and partition dividers",
          "Empty individual workstation trash and recycling bins",
        ],
      },
      {
        room: "Conference & Meeting Rooms",
        tasks: [
          "Sanitize and polish large conference tables streak-free",
          "Dust TV display screens, presentation monitors, and AV consoles",
          "Wipe down conference room chairs and neatly arrange seating",
          "Clean glass partitions and wipe whiteboard markers / eraser trays",
        ],
      },
      {
        room: "Office Kitchen & Coffee Station",
        tasks: [
          "Wipe and sanitize coffee maker exteriors and water dispenser taps",
          "Clean sink basin, faucet, and sanitize countertop counters",
          "Wipe exterior and interior turntable of microwave",
          "Wipe exterior of office refrigerator and handle hardware",
        ],
      },
      {
        room: "Restrooms & Floor Care",
        tasks: [
          "Daily disinfection of all restroom fixtures, sinks, and partition doors",
          "Replenish hand soaps, paper towels, and toilet paper",
          "Vacuum office carpets and floor mats thoroughly",
          "Damp mop hard surfaces and tile entryways with neutral cleaner",
        ],
      },
    ],
    process: [
      {
        step: "1",
        title: "Office Consultation",
        description:
          "We evaluate your office square footage, desk count, conference spaces, and high-priority sanitation needs.",
      },
      {
        step: "2",
        title: "Security & Access Protocol",
        description:
          "We set up keycard or keypad access, alarm codes, and lock-up checklists so your workplace remains secure.",
      },
      {
        step: "3",
        title: "Off-Hours Execution",
        description:
          "Our professional team cleans silently after business hours, emptying trash and resetting workspaces for the next day.",
      },
      {
        step: "4",
        title: "Morning-Ready Finish",
        description:
          "Your team arrives each morning to an immaculate, sanitized office with empty bins, clean desks, and fresh air.",
      },
    ],
    addOns: [
      "Interior office window glass wipe",
      "Executive suite refrigerator detailing",
      "Office carpet extraction",
    ],
    faqs: [
      {
        q: "How do cleaners handle papers and sensitive files left on desks?",
        a: "Our cleaning technicians are trained to never move, shuffle, or disturb paperwork or confidential files. We clean around clear surfaces and only wipe exposed desktop spaces.",
      },
      {
        q: "What frequency of office cleaning is best for small teams?",
        a: "Teams of 5 to 15 people typically do well with 1 to 2 visits per week. Larger teams, medical offices, or client-facing legal/accounting firms often choose 3 to 5 visits per week.",
      },
      {
        q: "Do you provide your own cleaning products and equipment?",
        a: "Yes. We supply all commercial-grade vacuums, microfiber systems, and disinfectants. If your facility has specific green-cleaning requirements, we will happily tailor our supplies.",
      },
      {
        q: "Are office cleaners vetted for building security?",
        a: "All Apopka Cleaning team members undergo thorough background checks, identity verification, and training on confidentiality and building security protocols.",
      },
    ],
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
    detail:
      "Carpet and upholstery cleaning adds pre-treatment and extraction beyond what a standard floor vacuum covers—useful for high-traffic paths, pet households, and after spills. Pair it with residential or deep cleaning when hard floors and bathrooms also need a full visit, or book it alone when soft surfaces are the priority.",
    localContext:
      "Central Florida homes experience unique challenges with ultra-fine sandy loam and high atmospheric moisture. Fine sand particles act like sandpaper under foot traffic, cutting into carpet pile and dulling upholstery fabrics. Our professional deep extraction dissolves embedded soils, extracts pet dander, and neutralizes odors with fast drying times.",
    roomChecklist: [
      {
        room: "High-Traffic Carpet Lanes",
        tasks: [
          "Pre-inspect fiber composition and assess stain severity",
          "Apply specialized fiber pre-treatment to break down tracked-in soil",
          "Deep hot water extraction lifting soil from carpet backing",
          "Targeted spot treatment for stubborn beverage, pet, or food marks",
        ],
      },
      {
        room: "Living Room Upholstery",
        tasks: [
          "Vacuum sofa and sectional cushions to extract dry dust and hair",
          "Pre-treat armrests, headrests, and seating zones for body oils",
          "Gentle fabric-safe extraction lifting dirt without over-saturating padding",
          "Clean accent chairs, dining chair cushions, and fabric ottomans",
        ],
      },
      {
        room: "Area Rugs & Runners",
        tasks: [
          "Identify delicate wool, synthetic, or blended area rug materials",
          "Controlled extraction removing sand without damaging rug fringe",
          "Surface grooming to restore pile direction and softness",
        ],
      },
      {
        room: "Odor Neutralization",
        tasks: [
          "Apply non-toxic, pet-safe enzymes to neutralize odor-causing bacteria",
          "Deodorize soft fibers leaving rooms fresh without heavy artificial scents",
          "Optimize airflow and moisture extraction for rapid 2-4 hour drying",
        ],
      },
    ],
    process: [
      {
        step: "1",
        title: "Inspection & Fiber Assessment",
        description:
          "We examine carpet and upholstery fiber types, heavy wear zones, and spot treatment requirements.",
      },
      {
        step: "2",
        title: "Pre-Treatment Spray",
        description:
          "We apply an eco-friendly emulsion that loosens bonded grease, oils, and soils from deep within the fibers.",
      },
      {
        step: "3",
        title: "High-Power Extraction",
        description:
          "Our extraction equipment flushes the fibers with heated solution and immediately vacuums up 95%+ of the moisture.",
      },
      {
        step: "4",
        title: "Deodorize & Rapid Dry",
        description:
          "An enzymatic freshener is applied while fibers are groomed, leaving carpets touch-dry in just a few hours.",
      },
    ],
    addOns: [
      "Stain protection fiber shield",
      "Pet urine deep enzyme saturation",
      "Mattress sanitizing and extraction",
    ],
    faqs: [
      {
        q: "How long will my carpets and sofas take to dry after cleaning?",
        a: "With our advanced moisture-extraction process, most carpets dry within 2 to 4 hours. Sofas and upholstery generally dry in 3 to 6 hours depending on ambient humidity and air circulation.",
      },
      {
        q: "Are the carpet cleaning products safe for children and pets?",
        a: "Yes. We use eco-friendly, non-toxic, and hypoallergenic cleaning solutions that are completely safe for children, dogs, cats, and allergy sufferers.",
      },
      {
        q: "Can you remove tough pet urine stains and odors?",
        a: "Yes. We utilize specialized enzymatic treatments that break down uric acid crystals and bacterial sources rather than just masking the odor with artificial fragrance.",
      },
      {
        q: "How frequently should carpets be professionally cleaned in Apopka?",
        a: "For typical Apopka homes, professional cleaning every 6 to 12 months is recommended. Homes with multiple pets, young children, or active outdoor hobbies benefit from cleaning every 4 to 6 months.",
      },
    ],
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
