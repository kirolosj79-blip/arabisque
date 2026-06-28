# Arabesque by Mimo — Website

> When Authentic Egyptian Flavors Meet Nostalgia

A premium restaurant website for **Arabesque by Mimo**, an authentic Egyptian restaurant in California.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Animation**: Framer Motion
- **Database**: Supabase
- **Auth**: Supabase Auth
- **Storage**: Supabase Storage
- **Deployment**: Netlify

## Quick Start

```bash
npm install
cp .env.local.example .env.local
# Fill in your Supabase credentials
npm run dev
```

## Environment Variables

```
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-key
ADMIN_SECRET=your-admin-secret
NEXT_PUBLIC_SITE_URL=https://arabesque-by-mimo.com
```

## Database Setup

Run `lib/supabase/schema.sql` in your Supabase SQL editor.

## Admin Dashboard

Visit `/admin` — default demo password: `arabesque2025`

Change this in production by setting `ADMIN_SECRET` env var and updating the auth check.

## Menu Data

All menu items are in `lib/data/menu.ts`. Items can be managed via Admin Dashboard once Supabase is connected.

## Deployment

### Netlify (Recommended)

1. Push to GitHub
2. Connect to Netlify
3. Set environment variables in Netlify dashboard
4. Deploy

```bash
npm install -g netlify-cli
netlify deploy --prod
```

## Brand

- **Colors**: Deep black (#0A0803), Gold (#C9A84C), Amber (#E8C97A)
- **Fonts**: Cormorant Garamond (display), Cinzel (headings), Inter (body)
- **Halal Certified**: All meats are 100% Halal

---

*Something Worth Finding* ✨
