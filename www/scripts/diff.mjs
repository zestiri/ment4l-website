// Visual-diff harness: vergelijkt de live Framer-site (golden) met de rebuild
// (localhost) per breakpoint. Output: PNG's + diff% in ment4l-migration/diff/.
//
// Gebruik:  node www/scripts/diff.mjs [pad]        (default pad = "/")
//   Zorg dat de dev-server op http://localhost:3000 draait.
//
// Meet twee dingen per breakpoint:
//   fold      = boven-de-vouw (viewport width x 900), exact vergelijkbaar
//   fullpage  = hele pagina, bijgesneden tot de gemeenschappelijke hoogte
//               (+ hoogteverschil als los signaal — mist een sectie = groot verschil)

import { chromium } from "playwright";
import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(__dirname, "../../ment4l-migration/diff");
fs.mkdirSync(OUT, { recursive: true });

const PATHPART = process.argv[2] || "/";
const SLUG = PATHPART === "/" ? "home" : PATHPART.replace(/^\//, "").replace(/\//g, "__");

const GOLDEN_BASE = "https://www.ment4l.nl";
const LOCAL_BASE = "http://localhost:3000";

// Representatieve breedtes per Framer-tier (≤599 / 600-999 / 1000-1365 / ≥1366).
const WIDTHS = [390, 768, 1280, 1440];
const FOLD_H = 900;

function readPNG(buf) {
  return PNG.sync.read(buf);
}
function crop(png, w, h) {
  const out = new PNG({ width: w, height: h });
  PNG.bitblt(png, out, 0, 0, w, h, 0, 0);
  return out;
}

async function grab(page, url, width, out) {
  await page.setViewportSize({ width, height: FOLD_H });
  await page.goto(url, { waitUntil: "load", timeout: 60000 }).catch(() => {});
  // laat een eventuele client-side redirect/hydratie settlen
  await page.waitForTimeout(1200);
  // traag door de hele pagina scrollen zodat scroll-reveals (Framer CSS + motion JS)
  // ECHT triggeren. NIET vooraf animaties uitzetten — dat bevriest Framer op opacity:0.
  try {
    await page.evaluate(async () => {
      const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
      const h = document.body.scrollHeight;
      for (let y = 0; y < h; y += 400) { window.scrollTo(0, y); await sleep(170); }
      window.scrollTo(0, document.body.scrollHeight); await sleep(400);
      window.scrollTo(0, 0); await sleep(400);
    });
  } catch {}
  try { await page.evaluate(() => document.fonts && document.fonts.ready); } catch {}
  // wacht tot alle (lazy) afbeeldingen echt geladen zijn
  try {
    await page.evaluate(() =>
      Promise.all(
        Array.from(document.images)
          .filter((i) => !i.complete)
          .map((i) => new Promise((r) => { i.addEventListener("load", r); i.addEventListener("error", r); setTimeout(r, 4000); })),
      ),
    );
  } catch {}
  await page.waitForTimeout(900);
  // PAS NU lopende animaties (marquee/ping) bevriezen — reveals zijn al zichtbaar.
  try {
    await page.addStyleTag({
      content: `*,*::before,*::after{animation-play-state:paused!important;transition:none!important;scroll-behavior:auto!important}`,
    });
  } catch {}
  await page.waitForTimeout(300);
  const fold = await page.screenshot({ clip: { x: 0, y: 0, width, height: FOLD_H } });
  const full = await page.screenshot({ fullPage: true });
  fs.writeFileSync(path.join(OUT, `${SLUG}-${width}-${out}-fold.png`), fold);
  fs.writeFileSync(path.join(OUT, `${SLUG}-${width}-${out}-full.png`), full);
  return { fold: readPNG(fold), full: readPNG(full) };
}

function diff(aPNG, bPNG, outFile) {
  const w = Math.min(aPNG.width, bPNG.width);
  const h = Math.min(aPNG.height, bPNG.height);
  const a = aPNG.width === w && aPNG.height === h ? aPNG : crop(aPNG, w, h);
  const b = bPNG.width === w && bPNG.height === h ? bPNG : crop(bPNG, w, h);
  const out = new PNG({ width: w, height: h });
  const mismatch = pixelmatch(a.data, b.data, out.data, w, h, { threshold: 0.1, includeAA: false });
  fs.writeFileSync(outFile, PNG.sync.write(out));
  return { pct: (mismatch / (w * h)) * 100, w, h };
}

// Gebruik het systeem-Chrome (geen Playwright-browserdownload nodig).
// Valt terug op de gedeelde Playwright-Chromium-cache als Chrome ontbreekt.
let browser;
try {
  browser = await chromium.launch({ channel: "chrome" });
} catch {
  browser = await chromium.launch();
}
const rows = [];
for (const width of WIDTHS) {
  const gp = await browser.newPage({ deviceScaleFactor: 1 });
  const g = await grab(gp, `${GOLDEN_BASE}${PATHPART}`, width, "golden");
  await gp.close();

  const rp = await browser.newPage({ deviceScaleFactor: 1 });
  const r = await grab(rp, `${LOCAL_BASE}${PATHPART}`, width, "rebuild");
  await rp.close();

  const fold = diff(g.fold, r.fold, path.join(OUT, `${SLUG}-${width}-diff-fold.png`));
  const full = diff(g.full, r.full, path.join(OUT, `${SLUG}-${width}-diff-full.png`));
  rows.push({
    width,
    foldPct: fold.pct,
    fullPct: full.pct,
    goldenH: g.full.height,
    rebuildH: r.full.height,
  });
}
await browser.close();

console.log(`\n=== VISUAL DIFF — ${SLUG} (${PATHPART}) ===`);
console.log("bp     fold%   full%   golden_h  rebuild_h  Δhoogte");
for (const r of rows) {
  console.log(
    `${String(r.width).padEnd(6)} ${r.foldPct.toFixed(2).padStart(5)}  ${r.fullPct
      .toFixed(2)
      .padStart(6)}   ${String(r.goldenH).padStart(7)}  ${String(r.rebuildH).padStart(8)}  ${String(
      r.rebuildH - r.goldenH,
    ).padStart(6)}`,
  );
}
console.log(`\nPNG's + diff-beelden: ${OUT}`);
