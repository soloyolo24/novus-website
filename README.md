# Novus Solutions — Next.js App Router

AI automation studio site. Multi-page, fully routed, Framer Motion transitions.

## Stack
- Next.js 15 (App Router)
- Tailwind CSS
- Framer Motion
- Lucide React
- TypeScript

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Colour system (tailwind.config.ts)

| Role | Token | Hex |
|---|---|---|
| 70% — Midnight Navy | `navy-950/900/800/700/600` | `#04081A` → `#22325F` |
| 20% — White / Silver | `silver-50` → `silver-500` | `#FFFFFF` → `#6B7A96` |
| 10% — Electric Blue | `electric-400/500/600` | `#4D8BFF` / `#2E6BFF` / `#1A52E0` |

## Routes

| Route | File |
|---|---|
| `/` | `app/page.tsx` |
| `/services` | `app/services/page.tsx` |
| `/services/[slug]` | `app/services/[slug]/page.tsx` — 8 static params |
| `/work` | `app/work/page.tsx` — client-side category filter |
| `/work/[slug]` | `app/work/[slug]/page.tsx` |
| `/about` | `app/about/page.tsx` |
| `/pricing` | `app/pricing/page.tsx` |
| `/insights` | `app/insights/page.tsx` |
| `/insights/[slug]` | `app/insights/[slug]/page.tsx` |
| `/contact` | `app/contact/page.tsx` |

## Content

All content lives in `app/lib/data.ts` — services, projects, pricing tiers, posts,
process steps, stats. Edit there, not in the page components.

## Wiring up the contact form

The form posts to `process.env.NEXT_PUBLIC_LEAD_ENDPOINT`. Set it in `.env.local`:

```
NEXT_PUBLIC_LEAD_ENDPOINT=https://script.google.com/macros/s/YOUR_ID/exec
```

Point it at the Apps Script Web App URL from `Novus_Lead_Capture_v2.gs`. Without it
set, the form still validates and shows the success state but doesn't transmit.

## Before launch

- [ ] Replace `(312) 555-0000` with the real number (Footer, Contact)
- [ ] Replace placeholder LinkedIn / Instagram URLs
- [ ] Replace the testimonial placeholder on `/` with a real client quote
- [ ] Set `NEXT_PUBLIC_LEAD_ENDPOINT`
- [ ] Add `app/opengraph-image.png` (1200×630) for link previews
