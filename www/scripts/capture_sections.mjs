// Legt in één page-load meerdere secties schoon vast (per sectie ingescrolld,
// zodat scroll-reveals triggeren). Gebruik:
//   node www/scripts/capture_sections.mjs <baseUrl> <prefix>
// bv. ... https://www.ment4l.nl/ live   |   ... http://localhost:3000/ rebuild
import { chromium } from "playwright";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(__dirname, "../../ment4l-migration/diff");
fs.mkdirSync(OUT, { recursive: true });

const BASE = process.argv[2] || "https://www.ment4l.nl/";
const PREFIX = process.argv[3] || "live";
const WIDTH = 1440;

const SECTIONS = [
  { needle: "Expertises op gebied", h: 1500, name: "expertise" },
  { needle: "Jouw vragen", h: 1450, name: "faq" },
  { needle: "Inzichten", h: 1000, name: "blog" },
  { needle: "Echte verhalen", h: 1300, name: "testimonials" },
];

let browser;
try { browser = await chromium.launch({ channel: "chrome" }); } catch { browser = await chromium.launch(); }
const page = await browser.newPage({ deviceScaleFactor: 1 });
await page.setViewportSize({ width: WIDTH, height: 1000 });
await page.goto(BASE, { waitUntil: "load", timeout: 60000 }).catch(() => {});
await page.waitForTimeout(1200);
// traag door de hele pagina zodat reveals triggeren + lazy images laden
await page.evaluate(async () => {
  const s = (ms) => new Promise((r) => setTimeout(r, ms));
  const h = document.body.scrollHeight;
  for (let y = 0; y < h; y += 400) { window.scrollTo(0, y); await s(160); }
  await s(400);
});
try { await page.evaluate(() => document.fonts && document.fonts.ready); } catch {}
try {
  await page.evaluate(() => Promise.all(Array.from(document.images).filter((i) => !i.complete).map((i) => new Promise((r) => { i.addEventListener("load", r); i.addEventListener("error", r); setTimeout(r, 4000); }))));
} catch {}

for (const sec of SECTIONS) {
  const found = await page.evaluate((needle) => {
    const el = [...document.querySelectorAll("h1,h2,h3")].find((e) => (e.textContent || "").includes(needle));
    if (!el) return false;
    const s = el.closest("section") || el.parentElement;
    window.scrollTo(0, Math.max(0, window.scrollY + s.getBoundingClientRect().top - 20));
    return true;
  }, sec.needle);
  await page.waitForTimeout(700);
  const file = path.join(OUT, `${PREFIX}-${sec.name}.png`);
  await page.screenshot({ path: file, clip: { x: 0, y: 0, width: WIDTH, height: sec.h } });
  console.log(`${found ? "OK " : "?? "} ${sec.name} -> ${path.basename(file)}`);
}
await browser.close();
