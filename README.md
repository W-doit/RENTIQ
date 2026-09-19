# RentIQ

AI property management PWA for New Zealand landlords and tenants.

## Stack

- React + Vite + TypeScript
- Tailwind CSS v4
- Supabase (auth, DB, storage, realtime)
- Lucide icons · Recharts · vite-plugin-pwa

## Design & voice

**Porcelain & Steep** — cool porcelain, pāua blue (not green), basalt sidebar, amber for “needs you.” Tea-cup/house mark.

**Positioning vs Keel:** Keel sells less admin. RentIQ sells nothing-slips-through — clarity, paper trail, and certainty you can check.

**AI assistant:** Iris (not Skip — Keel’s name). Facts + one recommendation. Nothing sends without sign-off.

**Hero:** Sit down. It’s handled.

## Quick start

```bash
npm install
cp .env.example .env   # add Supabase anon key
npm run dev
```

Demo auth (any password):

- Landlord: `/login` → `sam@rentiq.nz`
- Tenant: `/tenant/login` → `mahuta@email.nz`

The UI ships with rich mock data so you can explore every screen without wiring live rows first.

## Supabase schema

Apply `supabase/migrations/001_rentiq_schema.sql` via the Supabase SQL editor or MCP `apply_migration`. Tables: `users`, `properties`, `tenants`, `listings`, `applications`, `maintenance_tickets`, `compliance`, `transactions`.

## Scripts

| Command        | Action              |
| -------------- | ------------------- |
| `npm run dev`  | Local dev server    |
| `npm run build`| Production build    |
| `npm run preview` | Preview PWA build |

## Routes

**Landlord:** `/dashboard`, `/properties`, `/properties/:id` (+ listing, screening, agreement, …), `/maintenance`, `/compliance`, `/financials`, `/settings`

**Tenant:** `/tenant/dashboard`, `/tenant/maintenance`, `/tenant/documents`, `/tenant/chat`
