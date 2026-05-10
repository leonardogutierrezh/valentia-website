#!/usr/bin/env bash
# Valentia Website — one-shot deploy script
# Run this from inside Products/Valentia Website/code/ on your Mac.
# (The script cd's into its own dir, so it works as long as it lives next to the site files.)
#
#   chmod +x deploy.sh && ./deploy.sh
#
# Prereqs (one-time):
#   npm i -g vercel
#   (optional) brew install gh   # only if you also want GitHub auto-push
#
# What this does:
#   1) Cleans any stale git lock from the sandbox
#   2) Commits any pending changes
#   3) (optional) Creates/pushes a GitHub repo via gh
#   4) Deploys to Vercel production

set -e

cd "$(dirname "$0")"

echo "==> Step 1: clean stale locks (if any)"
rm -f .git/index.lock .git/HEAD.lock .git/objects/maintenance.lock 2>/dev/null || true

echo ""
echo "==> Step 2: commit pending changes"
git add -A
if git diff --cached --quiet; then
  echo "    Nothing to commit."
else
  git commit -m "Rebrand + EN/ES i18n + accurate product copy + pricing layout fix"
fi
git log --oneline -5

echo ""
echo "==> Step 3: push to GitHub (optional — skip if you don't want this)"
read -p "    Push to GitHub now? [y/N] " yn
if [[ "$yn" =~ ^[Yy]$ ]]; then
  if ! command -v gh >/dev/null 2>&1; then
    echo "    gh CLI not installed. Install with: brew install gh"
    echo "    Skipping GitHub push."
  else
    if ! git remote get-url origin >/dev/null 2>&1; then
      echo "    No 'origin' remote yet. Creating GitHub repo..."
      gh auth status >/dev/null 2>&1 || gh auth login
      gh repo create valentia-website --public --source=. --remote=origin --push
    else
      git push origin main
    fi
  fi
fi

echo ""
echo "==> Step 4: deploy to Vercel"
if ! command -v vercel >/dev/null 2>&1; then
  echo "    vercel CLI not installed."
  echo "    Install with: npm i -g vercel"
  exit 1
fi

# First-time login if needed
vercel whoami >/dev/null 2>&1 || vercel login

echo ""
read -p "    Deploy to PRODUCTION now? [y/N] " yn
if [[ "$yn" =~ ^[Yy]$ ]]; then
  vercel --prod
else
  echo "    Running preview deploy instead..."
  vercel
fi

echo ""
echo "==> Done. URL printed above."
