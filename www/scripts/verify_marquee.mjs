// Verifieert onze eigen testimonial-wall: kaartafmetingen, rijen, richting en snelheid.
import { chromium } from "playwright";

const BASE = process.argv[2] || "http://localhost:3000";

let browser;
try { browser = await chromium.launch({ channel: "chrome" }); } catch { browser = await chromium.launch(); }
const page = await browser.newPage({ deviceScaleFactor: 1 });
await page.setViewportSize({ width: 1440, height: 1000 });
await page.goto(`${BASE}/`, { waitUntil: "load", timeout: 60000 }).catch(() => {});
await page.waitForTimeout(1000);
await page.evaluate(async () => {
  const s = (ms) => new Promise((r) => setTimeout(r, ms));
  const h = document.body.scrollHeight;
  for (let y = 0; y < h; y += 450) { window.scrollTo(0, y); await s(120); }
  await s(300);
});
await page.evaluate(() => {
  const h = [...document.querySelectorAll("h2")].find((e) => /Echte verhalen/i.test(e.textContent || ""));
  if (h) { const s = h.closest("section"); window.scrollTo(0, window.scrollY + s.getBoundingClientRect().top - 40); }
});
await page.waitForTimeout(800);

const meet = () => page.evaluate(() => {
  const res = { t: performance.now(), kaarten: [], perNaam: {} };
  for (const el of document.querySelectorAll("figure")) {
    const r = el.getBoundingClientRect();
    if (r.width < 400) continue;
    const naam = el.querySelector("figcaption div div")?.textContent?.trim() || "?";
    res.kaarten.push({ naam, w: Math.round(r.width), h: Math.round(r.height), y: Math.round(r.top) });
    if (res.perNaam[naam] === undefined || r.left < res.perNaam[naam]) res.perNaam[naam] = r.left;
  }
  return res;
});

const a = await meet();
await page.waitForTimeout(2000);
const b = await meet();
const dt = (b.t - a.t) / 1000;

const rijen = {};
for (const k of a.kaarten) { const key = Math.round(k.y / 80) * 80; (rijen[key] = rijen[key] || new Set()).add(k.naam); }

console.log(`kaarten totaal : ${a.kaarten.length}`);
console.log(`kaartafmeting  : ${a.kaarten[0]?.w}x${a.kaarten[0]?.h}  (live: 528x380)`);
console.log(`rijen          : ${Object.entries(rijen).map(([y, s]) => `y≈${y}: ${[...s].join(" + ")}`).join(" | ")}`);
for (const naam of Object.keys(a.perNaam)) {
  const d = b.perNaam[naam] - a.perNaam[naam];
  if (Number.isFinite(d)) {
    console.log(`${naam.padEnd(12)} ${(d / dt).toFixed(1).padStart(6)} px/s  (${d < 0 ? "naar LINKS" : "naar RECHTS"})`);
  }
}
await browser.close();
