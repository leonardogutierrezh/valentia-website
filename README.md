# Valentia Software — Corporate Website

Static HTML/CSS/JS marketing site for Valentia Software. Plain static — no build step, no framework.

## Product

Valentia is a **vacation rental intelligence layer built on Hostify**. Three modules:
- **Operations**: live Hostify sync, smart-lock orchestration (9+ types), per-property protocols, multi-company access
- **Marketing**: guest intelligence — LTV, nationality maps (Mapbox), demographic breakdowns, Excel export
- **Finance**: AI revenue analysis (GPT-4) — ADR, occupancy, pickup forecasting, channel performance

## Stack
- Plain HTML, CSS, vanilla JS
- Inter font via Google Fonts
- Bilingual EN / ES via `i18n.js` + `data-i18n` attributes
- Deployed on Vercel as a static site (no build command)

## Pages
- `index.html` — home / hero / modules overview
- `features.html` — Operations, Marketing, Finance modules in detail
- `pricing.html` — pricing tiers (all "Custom — contact us")
- `contact.html` — contact form (client-side, mailto fallback)

## Files
- `i18n.js` — all visible copy, EN + ES (edit here for any text change)
- `styles.css` — brand palette + layout
- `script.js` — language toggle, mobile nav, contact form
- `logo.svg` / `logo-wordmark.svg` / `favicon.svg` — brand mark
  - **Replace these with your official brand files when available.** The current SVGs are an approximation built from screenshots.

## Local preview

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Deploy to Vercel (CLI)

```bash
# one-time
npm i -g vercel
vercel login

# preview deploy
vercel

# production
vercel --prod
```

Vercel detects this as a static site automatically. `vercel.json` is preconfigured with cache headers, security headers, and clean URLs.

## Pushing to GitHub later

```bash
gh repo create valentia-website --public --source=. --remote=origin --push
```

Then connect the repo in the Vercel dashboard for auto-deploys on push.

## Editing copy

All visible text lives in `i18n.js` under two top-level keys: `en` and `es`. Add or change a string in both, save, reload — done. Page-level meta (titles, descriptions) are also in there, keyed `meta.<page>.title` / `meta.<page>.desc`.

## Brand
- Navy: `#1e4d7b` (primary)
- Teal: `#5fb3b3` (secondary)
- Orange: `#f08020` (accent)
- Ink: `#11253c`

Edit the `:root` block in `styles.css` to rebrand.

## Contact form

Client-side validation only, then opens a `mailto:hello@valentia.software` with the form contents pre-filled. To make it submit to a real backend, swap out the `setupContactForm` block in `script.js` with a `fetch()` call to your endpoint (Vercel function, Formspree, Resend, etc.).
