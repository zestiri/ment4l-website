# MENT4L — hoofdsite (www.ment4l.nl)

Herbouw van de Framer-site in eigen code. Zelfde stack als `../scholen`:
Next.js 16 (App Router) · React 19 · Tailwind v4 · `motion` · TypeScript · Vercel.

## Ontwikkelen

```bash
cd www
npm install
npm run dev        # http://localhost:3000
```

Vanuit de repo-root kan ook via de Browser-pane: preview met de config **www**
(`.claude/launch.json`).

## Lead-flow (contactformulier → Resend)

Het contactformulier (`/contact`) POST naar `src/app/api/contact/route.ts`,
die de mail via **Resend** naar `info@ment4l.nl` stuurt.

Zolang `RESEND_API_KEY` ontbreekt, toont het formulier netjes
"nog niet geconfigureerd" (API antwoordt 503) — de rest werkt gewoon.

Aanzetten:

1. Maak een account op [resend.com](https://resend.com) en een **API-key**.
2. Verifieer verzenddomein **`send.ment4l.nl`** in Resend (voegt eigen DNS-records
   toe bij Hostinger; raakt de Google Workspace-MX niet — zie het migratieplan).
3. Kopieer `.env.example` → `.env.local` en vul in:
   - `RESEND_API_KEY`
   - `CONTACT_TO=info@ment4l.nl`
   - `CONTACT_FROM="MENT4L website <formulier@send.ment4l.nl>"`
4. Op Vercel: dezelfde variabelen als Environment Variables.

## Status (26 aug 2026) — vertical slice

Klaar en geverifieerd (build + dev):
- Scaffold, design-tokens (merk + Framer-breakpoints 600/1000/1366), fonts
  (Inter, IBM Plex Serif/Mono, Plus Jakarta — **Switzer volgt via Fontshare**).
- Gedeelde chrome: `Nav`, `Footer`, `ScrollProgress`, `Reveal`, `Logo`.
- Homepage (hero · expertises · cijfers · CTA) en `/contact` met werkend formulier.
- Resend API-route met validatie + honeypot + nette foutafhandeling.

- Homepage volledig herbouwd (hero, partners, expertises, cijfers-bento, FAQ,
  blog, testimonials) met de echte beelden van de live site.
- **Alle 19 pagina's**: `/over-ons`, `/blog` + 10 artikelen, 5 `/trajecten`.
- Switzer self-gehost (Fontshare), `sitemap.ts` + `robots.ts`.

## Scripts (Playwright, draait op systeem-Chrome — geen browserdownload)

```bash
node www/scripts/extract_content.mjs      # live DOM -> ment4l-migration/content/*.json
node www/scripts/build_content.mjs        # -> www/src/content/*.json
node www/scripts/capture_pages.mjs <url> <prefix>      # 4 page-templates
node www/scripts/capture_sections.mjs <url> <prefix>   # homepage-secties
node www/scripts/diff.mjs                 # visual diff home: live vs localhost
node www/scripts/responsive_check.mjs     # overflow + tikdoelen op 390/768/1440
node www/scripts/inspect_marquee.mjs      # meet de live testimonial-wall
node www/scripts/verify_marquee.mjs       # controleert onze marquee (maat/richting/snelheid)
```

> Let op: de full-page pixel-diff is misleidend voor deze Framer-site (secties
> renderen niet in een fullPage-capture). Stuur op de per-sectie vergelijking.

Nog te doen (volgende fase):
- Mobiel/responsive check per pagina.
- Deploy naar Vercel-preview; daarna DNS-cutover (zie migratieplan).
- Open vragen: traject-badge bevat de live typo "Ambulante Begleiding"
  (1:1 overgenomen); homepage heeft een extra CTA-blok dat de live niet heeft.

Referentiemateriaal (gerenderde HTML, assets, fonts) staat in
`../ment4l-migration/`.
