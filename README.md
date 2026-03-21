# Frameflat Photography — React App

Professional real estate and Airbnb photography studio website.
Transformed from the original [frameflat.gr](https://frameflat.gr) into a self-contained Vite + React application.

## Tech Stack

- **Vite** + **React 19**
- **React Router DOM** — client-side routing
- **React Helmet Async** — per-page SEO meta tags and JSON-LD structured data
- **Plain CSS + CSS Modules** — no CSS-in-JS, no Tailwind

## Getting Started

```bash
npm install
npm run dev       # development server → http://localhost:5173
npm run build     # production build → dist/
npm run preview   # preview production build locally
```

## Pages & Routes

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | `Home` | Hero, services, drone section, website promo |
| `/portfolio` | `Projects` | Portfolio grid — 3 project cards |
| `/cretan-fleur` | `CretanFleur` | Photo gallery — Elafonisos property |
| `/urban-suites` | `UrbanSuites` | Photo gallery — Alimos luxury suites |
| `/athens-view` | `AthensView` | Photo gallery — Athens Acropolis-view Airbnb |
| `/ypiresies` | `Websites` | Web design services page |
| `/fotografia` | `Photography` | Photography services page |
| `/epikoinwnia` | `Contact` | Contact form + social links |
| `/blog` | `Blog` | Article listing grid |
| `/blog/:slug` | `BlogPost` | Individual article with full SEO |
| `/checkout` | `Checkout` | Stripe checkout flow |
| `/checkout/success` | `CheckoutSuccess` | Post-payment confirmation |
| `/admin` | `Admin` | Admin dashboard (session-protected) |
| `*` | `NotFound` | 404 catch-all page |

## Assets

All assets are stored locally — no external CDN dependencies.

| Type | Path | Notes |
|------|------|-------|
| Images | `public/assets/images/` | 50+ original images downloaded from Zyrosite CDN |
| Fonts | `public/assets/fonts/` | Outfit, Inter, Fira Code Bold, Fira Code Light |
| Favicon | `public/assets/images/favicon.png` | Referenced from `index.html` |
| Sitemap | `public/sitemap.xml` | All 13 routes listed |
| Robots | `public/robots.txt` | Points to sitemap |

## SEO

- Per-page `<Helmet>` with `<title>`, `<meta name="description">`, `<meta name="keywords">`
- Open Graph tags (og:title, og:description, og:image, og:url, og:locale)
- Twitter Card tags
- JSON-LD structured data: `LocalBusiness` (home), `ImageGallery` (projects), `Article` (blog posts), `ItemList` (blog listing)
- Bilingual coverage: Greek primary + English alternate in `src/seo/meta.js`
- Static `sitemap.xml` with all routes and blog articles
- `robots.txt` allowing all crawlers

## Blog / Articles

12 articles covering web design, SEO, invoicing, and MyData topics (all in Greek).

Article content lives in `src/data/articles.js`.

## Contact Form

The contact form (`/epikoinwnia`) sends `POST /api/contact` to the backend with `{ email, message }`. The backend validates the input, sends an admin alert email via SMTP, and returns `{ ok: true }`. Rate limited to 5 requests per 15 minutes.

## Deployment

The `dist/` output of `npm run build` is fully self-contained and can be deployed to any static host (Vercel, Netlify, Cloudflare Pages).

For SPA routing (React Router), configure the host to serve `index.html` for all routes.
Netlify example — add `public/_redirects`:
```
/* /index.html 200
```
