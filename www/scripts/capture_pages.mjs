// Legt de bovenkant van meerdere pagina's vast (golden of rebuild).
// Gebruik: node www/scripts/capture_pages.mjs <baseUrl> <prefix>
import { chromium } from "playwright";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(__dirname, "../../ment4l-migration/diff");
fs.mkdirSync(OUT, { recursive: true });

const BASE = (process.argv[2] || "https://www.ment4l.nl").replace(/\/$/, "");
const PREFIX = process.argv[3] || "live";
const WIDTH = 1440;

const PAGES = [
  { p: "/over-ons", name: "p-overons", h: 1500 },
  { p: "/blog", name: "p-blogindex", h: 1500 },
  { p: "/blog/hoe-krijg-je-ambulante-begeleiding", name: "p-blogpost", h: 1500 },
  { p: "/trajecten/ambulante-spoedhulp", name: "p-traject", h: 1600 },
];

let browser;
try { browser = await chromium.launch({ channel: "chrome" }); } catch { browser = await chromium.launch(); }
const page = await browser.newPage({ deviceScaleFactor: 1 });
await page.setViewportSize({ width: WIDTH, height: 1000 });

for (const item of PAGES) {
  await page.goto(`${BASE}${item.p}`, { waitUntil: "load", timeout: 60000 }).catch(() => {});
  await page.waitForTimeout(1100);
  await page.evaluate(async () => {
    const s = (ms) => new Promise((r) => setTimeout(r, ms));
    const h = document.body.scrollHeight;
    for (let y = 0; y < h; y += 450) { window.scrollTo(0, y); await s(140); }
    window.scrollTo(0, 0); await s(400);
  });
  try { await page.evaluate(() => document.fonts && document.fonts.ready); } catch {}
  try {
    await page.evaluate(() => Promise.all(Array.from(document.images).filter((i) => !i.complete).map((i) => new Promise((r) => { i.addEventListener("load", r); i.addEventListener("error", r); setTimeout(r, 4000); }))));
  } catch {}
  await page.waitForTimeout(500);
  const file = path.join(OUT, `${PREFIX}-${item.name}.png`);
  await page.screenshot({ path: file, clip: { x: 0, y: 0, width: WIDTH, height: item.h } });
  console.log(`OK ${item.p.padEnd(46)} -> ${path.basename(file)}`);
}
await browser.close();
