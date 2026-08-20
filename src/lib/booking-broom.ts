import { readEnv } from "@/lib/env";

/** Structured fields Booking Broom stores outside of the free-text notes. */
export type BookingBroomProperty = {
  bedrooms?: number;
  bathrooms?: number;
  square_feet?: number;
  size_label?: string;
  home_type?: string;
};

export type BookingBroomQuote = {
  estimate?: number;
  estimate_low?: number;
  estimate_high?: number;
  currency?: string;
  service_level?: string;
  frequency?: string;
  add_ons?: { label: string; price?: number }[];
  payment_terms?: string;
};

export type BookingBroomPayload = {
  customer_name: string;
  email?: string;
  phone?: string;
  address?: string;
  service_type?: string;
  preferred_date?: string;
  preferred_time?: string;
  notes?: string;
  intent?: "quote" | "book";
  property?: BookingBroomProperty;
  quote?: BookingBroomQuote;
};

export type BookingBroomResult = {
  ok: boolean;
  id?: string;
  message?: string;
  error?: string;
};

async function getConfig() {
  return {
    baseUrl: (
      (await readEnv("BOOKING_BROOM_URL")) || "https://bookings.kedrik.com"
    ).replace(/\/$/, ""),
    apiKey: (await readEnv("BOOKING_BROOM_API_KEY")) || "",
    siteSlug: (await readEnv("BOOKING_BROOM_SITE_SLUG")) || "apopka",
  };
}

export async function createBooking(
  payload: BookingBroomPayload,
): Promise<BookingBroomResult> {
  const config = await getConfig();

  if (!config.apiKey) {
    console.error("[booking-broom] BOOKING_BROOM_API_KEY is not set");
    return {
      ok: false,
      message: "Booking is not configured. Please call us.",
    };
  }

  const body = {
    site_slug: config.siteSlug,
    api_key: config.apiKey,
    ...payload,
  };

  const res = await fetch(`${config.baseUrl}/api/bookings`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const text = await res.text().catch(() => "");
    let upstream = text.slice(0, 300);
    try {
      const parsed = JSON.parse(text) as { error?: string };
      if (parsed.error) upstream = parsed.error;
    } catch {
      // Keep raw body snippet.
    }
    console.error("[booking-broom] error", res.status, upstream);
    return {
      ok: false,
      message: "Unable to submit booking. Please try again or call us.",
      error: upstream || `HTTP ${res.status}`,
    };
  }

  const data = (await res.json().catch(() => ({}))) as {
    id?: string;
    booking_id?: string;
    message?: string;
  };

  return {
    ok: true,
    id: data.id || data.booking_id,
    message: data.message || "Booking received.",
  };
}
