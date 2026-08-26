// Vangt één sectie van de live site schoon vast (heading-tekst -> screenshot).
// Gebruik: node www/scripts/capture_section.mjs "Uw zorg" 1300 stats
import { chromium } from "playwright";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(__dirname, "../../ment4l-migration/diff");
fs.mkdirSync(OUT, { recursive: true });

const NEEDLE = process.argv[2] || "Uw zorg";
const HEIGHT = parseInt(process.argv[3] || "1300", 10);
const NAME = process.argv[4] || "section";
const BASE = process.argv[5] || "https://www.ment4l.nl/";
const WIDTH = 1440;

let browser;
try { browser = await chromium.launch({ channel: "chrome" }); } catch { browser = await chromium.launch(); }
const page = await browser.newPage({ deviceScaleFactor: 1 });
await page.setViewportSize({ width: WIDTH, height: 1000 });
await page.goto(BASE, { waitUntil: "load", timeout: 60000 }).catch(() => {});
await page.waitForTimeout(1200);
// scroll traag door zodat reveals triggeren
await page.evaluate(async () => {
  const s = (ms) => new Promise((r) => setTimeout(r, ms));
  const h = document.body.scrollHeight;
  for (let y = 0; y < h; y += 400) { window.scrollTo(0, y); await s(160); }
  await s(400);
});
try { await page.evaluate(() => document.fonts && document.fonts.ready); } catch {}
// scroll de sectie in beeld en meet de top
const top = await page.evaluate((needle) => {
  const el = [...document.querySelectorAll("h1,h2,h3")].find((e) => (e.textContent || "").includes(needle));
  if (!el) return null;
  const sec = el.closest("section") || el.parentElement;
  const y = window.scrollY + sec.getBoundingClientRect().top;
  window.scrollTo(0, Math.max(0, y - 20));
  return y;
}, NEEDLE);
await page.waitForTimeout(700);
// afbeeldingen laten laden
try {
  await page.evaluate(() => Promise.all(Array.from(document.images).filter((i) => !i.complete).map((i) => new Promise((r) => { i.addEventListener("load", r); i.addEventListener("error", r); setTimeout(r, 4000); }))));
} catch {}
await page.waitForTimeout(600);
const file = path.join(OUT, `live-${NAME}.png`);
await page.screenshot({ path: file, clip: { x: 0, y: 0, width: WIDTH, height: HEIGHT } });
await browser.close();
console.log(top === null ? `heading "${NEEDLE}" niet gevonden` : `OK -> ${file} (sectie-top was op ~${Math.round(top)}px)`);
