# Aditya — A Friendship Built in Blocks

Static site: HTML + CSS + vanilla JS. No build step, no dependencies (only Google Fonts, with fallbacks).

## Run
Open `index.html` in a browser, or upload the folder to any static host (Netlify Drop, GitHub Pages, Vercel static).

## Customise
Everything personal lives in `birthdayConfig` at the top of `js/script.js`:
name, server, birthdayDate (e.g. "12 March" — leave "" to hide), letter paragraphs (`personalMessage`),
`finalMessage`, `signature`, and the signature line.

## Ambient audio (optional)
Sound is OFF until the visitor taps the speaker button. Put your own licensed/royalty-free loop at
`assets/audio/ambient.mp3`. If the file is missing, a soft synthesised ambient pad plays instead.
Do not use copyrighted Minecraft music.

## Notes
- All scenery is generated procedurally as SVG in `js/script.js` (no photos, no external images).
- `prefers-reduced-motion` is respected.

## Mobile-first notes (v2)
- Phone is the primary target (320–430px portrait); desktop still supported.
- Navigation: a thumb-reach menu button (bottom-left) opens a bottom sheet; it closes on selection or by tapping outside, and highlights the current section.
- World: on phones the scene is zoomed and the camera follows the player. Tap the pulsing dots, tap the ground, or use the ◀ ▶ buttons. "Continue to the letter" is always visible below.
- All interactions are tap-based; hover styles only apply on devices that have hover.
- Animations pause when a scene is off-screen; particle counts are reduced on phones; `prefers-reduced-motion` is respected.
- Volume slider is hidden on phones (use the device volume); the speaker button still toggles sound. Audio never autoplays.

## Deploy
Upload the whole folder to any static host (Netlify Drop, GitHub Pages, Cloudflare Pages) and share the HTTPS link. No server needed.
Tip: before sharing, open the link once in WhatsApp/Instagram on a real phone.
