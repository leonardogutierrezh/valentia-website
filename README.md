# Valentia Software — Corporate Website

Static HTML/CSS/JS marketing site for Valentia Software. Plain static — no build step, no framework.

## Stack
- Plain HTML, CSS, vanilla JS
- Inter font via Google Fonts
- Deployed on Vercel as a static site (no build command)

## Pages
- `index.html` — home / hero / modules overview
- `features.html` — Operations, Marketing, Finance modules in detail
- `pricing.html` — pricing tiers (all "Contact us" for now)
- `contact.html` — contact form (client-side, mailto fallback)

## Local preview

Any static server works. Pick one:

```bash
# Python 3
python3 -m http.server 8080

# Node (if you have it)
npx serve .
```

Then open `http://localhost:8080`.

## Deploy to Vercel (CLI)

You only need to do this once per environment.

1. Install the CLI (one time):
   ```bash
   npm i -g vercel
   ```

2. From this folder, log in:
   ```bash
   vercel login
   ```

3. Deploy preview:
   ```bash
   vercel
   ```
   Accept defaults. Vercel detects this as a static site (no framework, no build command).

4. Deploy to production:
   ```bash
   vercel --prod
   ```

That's it. Vercel will print the live URL.

## Pushing to GitHub later

When you're ready to push to GitHub:

```bash
gh repo create valentia-website --public --source=. --remote=origin --push
```

Then connect the repo in the Vercel dashboard for automatic deploys on push.

## Editing copy

All copy lives directly in the HTML files. No CMS. Search-and-replace is fine for small edits.

## Branding notes
- Primary: `#4f46e5` (indigo)
- Secondary: `#7c3aed` (violet)
- Accent: `#06b6d4` (cyan)
- Ink: `#0b1020`

Edit the `:root` block in `styles.css` to rebrand.
