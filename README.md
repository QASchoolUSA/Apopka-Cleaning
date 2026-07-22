# Apopka Cleaning

Marketing site for **Apopka Cleaning** — a local cleaning company serving Apopka, FL.

## Features

- Home page with brand-led hero and service overview
- Dedicated pages for each service type
- Interactive free quote calculator with booking request flow
- Contact page with local business details

## Develop

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Booking Broom

Quote → book posts to `/api/bookings`, which forwards to Booking Broom.

Set in `.env.local`:

- `BOOKING_BROOM_URL=https://bookings.kedrik.com`
- `BOOKING_BROOM_SITE_SLUG=apopka`
- `BOOKING_BROOM_API_KEY=bb_apopka_dev_key`

## Build

```bash
npm run build        # OpenNext bundle for Cloudflare Workers
npm run build:next   # Next.js only (local check)
npm start
```
