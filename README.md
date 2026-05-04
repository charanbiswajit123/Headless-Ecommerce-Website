# Headless commerce storefront

React **Next.js** (App Router) storefront with **Sanity** content, **Stripe Checkout**, **Redux Toolkit** cart (persisted to `localStorage`), and **Tailwind CSS**.

## Architecture

```
Sanity CMS ──GROQ──► Next.js (RSC + Route Handlers) ──► Stripe Checkout Session
                           │
                     Redux (cart)
```

- **API routes** live under `app/api/` (Next.js convention); shared helpers are in `lib/`.

## Prerequisites

- Node.js 20+
- A [Sanity](https://www.sanity.io/) project
- A [Stripe](https://stripe.com/) account (test mode is fine)

## Quick start

```bash
cp .env.example .env.local
# Fill in Sanity + Stripe variables (see below)

npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Copy `.env.example` to `.env.local` and set:

| Variable | Purpose |
|----------|---------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Sanity project ID |
| `NEXT_PUBLIC_SANITY_DATASET` | Dataset name (often `production`) |
| `NEXT_PUBLIC_SITE_URL` | Public site URL (Stripe redirect URLs) |
| `STRIPE_SECRET_KEY` | Stripe secret key (`sk_test_…` or live) |
| `STRIPE_WEBHOOK_SECRET` | Signing secret from Stripe Dashboard → Webhooks |

Optional:

- `SANITY_API_READ_TOKEN` — private datasets or draft perspective (server-only).

## Sanity setup

1. Create a project at [sanity.io/manage](https://www.sanity.io/manage) (or `npm create sanity@latest` elsewhere and link the same project ID).

2. This repo includes schemas in `sanity/schemas/` (`product`, `homepage`) and config files `sanity.config.ts` / `sanity.cli.ts`.

3. Run the Studio locally from **this** project (loads `.env.local`):

   ```bash
   npm run studio
   ```

4. In Studio, create **Product** documents (title, slug, price, category, images, description).

5. Create a **Homepage** document: hero **banners** and optional **featured products** (references to products).

6. Confirm API access: dataset must allow **public read** for anonymous Next.js fetches, or set `SANITY_API_READ_TOKEN` for protected datasets.

## Stripe setup

1. In the [Stripe Dashboard](https://dashboard.stripe.com/), copy your **Secret key** into `STRIPE_SECRET_KEY`.

2. Add a **Webhook endpoint** URL for production:

   `https://your-domain.com/api/webhooks/stripe`

   Subscribe at minimum to `checkout.session.completed`. Paste the webhook **Signing secret** into `STRIPE_WEBHOOK_SECRET`.

3. For local webhook testing, use the Stripe CLI:

   ```bash
   stripe listen --forward-to localhost:3000/api/webhooks/stripe
   ```

   Use the CLI-printed webhook secret in `.env.local`.

Checkout **always** loads unit amounts from Sanity on the server so clients cannot tamper with prices.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Next.js dev server |
| `npm run build` | Production build |
| `npm run start` | Run production server |
| `npm run studio` | Sanity Studio for content |

## Project layout

| Path | Role |
|------|------|
| `app/` | Routes: home PLP, `product/[slug]` PDP (ISR), `cart`, checkout pages, `app/api/*` |
| `components/` | UI: `Navbar`, `ProductCard`, `CartDrawer`, checkout button, skeletons |
| `store/` | Redux Toolkit slice + `redux-persist` |
| `lib/sanity/` | Sanity client, GROQ queries, image URLs |
| `lib/stripe/` | Stripe server helper |
| `sanity/schemas/` | CMS schemas |
| `types/` | Shared TypeScript types |

## Deployment notes

- Set `NEXT_PUBLIC_SITE_URL` to your production URL so Stripe success/cancel redirects work.
- Configure `images.remotePatterns` in `next.config.ts` if you add image hosts beyond `cdn.sanity.io`.
