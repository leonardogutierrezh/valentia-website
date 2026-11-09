

## Plan: Replace Dashboard Placeholder with Actual Screenshot

**What**: Replace the "INSERT SCREENSHOT HERE" placeholder in the Hero section with the uploaded dashboard overview image.

**Steps**:
1. Copy `user-uploads://img_dashboard.png` to `src/assets/img_dashboard.png`
2. Update `Hero.tsx` to import and display the dashboard image instead of the placeholder div with the icon/text

The image will be shown inside the existing frosted-glass browser chrome frame, replacing the centered placeholder content with the actual screenshot.

