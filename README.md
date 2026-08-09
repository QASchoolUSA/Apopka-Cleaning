# Apopka Cleaning

Marketing site for **Apopka Cleaning** — a local cleaning company serving Apopka, FL.

## Features

- Home page with brand-led hero and service overview
- Dedicated pages for each service type
- Interactive free quote calculator with booking request flow
- Contact page with local business details

## Develop

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Booking Broom

Quote → book posts to `/api/bookings`, which forwards to Booking Broom.

Set in `.env.local` for local dev. Production values live in `wrangler.jsonc` (`vars`) and deploy with the Worker.

Cloudflare dashboard **Build variables** are not enough for `/api/bookings` — runtime vars must be set under **Variables & Secrets**, or use the `wrangler.jsonc` `vars` block (current setup).

- `BOOKING_BROOM_URL=https://bookings.kedrik.com`
- `BOOKING_BROOM_SITE_SLUG=apopka`
- `BOOKING_BROOM_API_KEY=bb_apopka_dev_key`

## Build

```bash
pnpm build        # OpenNext bundle for Cloudflare Workers
pnpm build:next   # Next.js only (local check)
pnpm start
```
