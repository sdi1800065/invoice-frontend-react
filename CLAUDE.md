# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Build & Development Commands

```bash
npm run dev          # Start Vite dev server (http://localhost:5173)
npm run build        # Production build → dist/
npm run preview      # Preview production build locally
npm run lint         # ESLint (flat config, React hooks + refresh plugins)
```

No test framework is configured.

## Architecture

**Frameflat** — a web design & maintenance subscription service website. Vite 8 + React 19 SPA, primarily in Greek.

### Routing (`src/App.jsx`)

All routes wrapped in `HelmetProvider` → `BrowserRouter`. Greek URL slugs (`/ypiresies`, `/epikoinwnia`) mixed with English project slugs (`/cretan-fleur`). Blog uses dynamic `/blog/:slug` matched against `articles.js` data.

### Page Pattern

Every page follows this structure:
```jsx
<div className="page">
  <Helmet>{/* SEO meta + JSON-LD from seo/ */}</Helmet>
  <Header />
  <main>{/* Content with .fade-up elements */}</main>
  <Footer />
</div>
```

Pages call `useScrollReveal()` to activate IntersectionObserver-based fade-in on `.fade-up` / `.fade-in` elements.

### SEO System (`src/seo/`)

- **`meta.js`** — Centralized `SEO` object with bilingual (`el`/`en`) title, description, keywords per page. Pages consume via `SEO.home.el`.
- **`structuredData.js`** — JSON-LD schemas: `homeBusiness` (LocalBusiness), `projectsGallery`, `contactPage`, `articleSchema()`, `blogListSchema()`. Injected via `<script type="application/ld+json">` inside Helmet.
- **`public/sitemap.xml`** and **`public/robots.txt`** — must be manually updated when routes or articles change.

### Data Layer

- **`src/data/articles.js`** — Array of article objects with `slug`, `lang`, `title`, `excerpt`, `datePublished`, `category`, `coverImage`, `body` (raw HTML rendered via `dangerouslySetInnerHTML`).

### Styling

- **CSS Modules** (`*.module.css`) per component/page for scoped styles.
- **`src/styles/variables.css`** — CSS custom properties (colors, fonts, spacing, transitions).
- **`src/styles/global.css`** — Font-face declarations, reset, `.btn` utility, `.fade-up`/`.fade-in` animation classes.
- No CSS-in-JS or Tailwind — plain CSS throughout.

### Static Assets

All in `public/assets/` — images in `images/`, fonts in `fonts/`. Referenced with absolute paths (`/assets/images/...`). Hero images use `loading="eager"`, everything else `loading="lazy"`.

## Key Conventions

- **Language**: Greek is primary. UI text, articles, and SEO default to Greek. English exists as alternate SEO metadata.
- **Adding a page**: Create in `src/pages/` → add route in `App.jsx` → add SEO entry in `meta.js` → add structured data if needed → update `sitemap.xml`.
- **Adding an article**: Append to the array in `src/data/articles.js` → update `sitemap.xml`.
- **ESLint rule**: Unused vars starting with uppercase or `_` are allowed (`varsIgnorePattern: '^[A-Z_]'`).
- **No backend**: Contact form has a TODO placeholder. No API calls exist.
