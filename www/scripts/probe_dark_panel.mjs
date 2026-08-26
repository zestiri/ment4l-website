// Meet de geometrie van het donkere paneel (testimonials + footer) op de live site,
// rechtstreeks uit de DOM — geen pixelschatting.
import { chromium } from "playwright";

let browser;
try { browser = await chromium.launch({ channel: "chrome" }); } catch { browser = await chromium.launch(); }
const page = await browser.newPage({ deviceScaleFactor: 1 });
await page.setViewportSize({ width: 1440, height: 1000 });
await page.goto("https://www.ment4l.nl/", { waitUntil: "load", timeout: 60000 }).catch(() => {});
await page.waitForTimeout(1300);
await page.evaluate(async () => {
  const s = (ms) => new Promise((r) => setTimeout(r, ms));
  const h = document.body.scrollHeight;
  for (let y = 0; y < h; y += 450) { window.scrollTo(0, y); await s(130); }
  await s(400);
});

const res = await page.evaluate(() => {
  const donker = (c) => {
    const m = (c || "").match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?/);
    if (!m) return false;
    const alpha = m[4] === undefined ? 1 : parseFloat(m[4]);
    if (alpha < 0.5) return false; // transparant telt niet
    return +m[1] < 60 && +m[2] < 60 && +m[3] < 60;
  };
  const out = [];
  for (const el of document.querySelectorAll("*")) {
    const cs = getComputedStyle(el);
    if (!donker(cs.backgroundColor)) continue;
    const r = el.getBoundingClientRect();
    if (r.width < 600 || r.height < 200) continue;
    out.push({
      tag: el.tagName.toLowerCase(),
      breedte: Math.round(r.width),
      hoogte: Math.round(r.height),
      left: Math.round(r.left),
      right: Math.round(window.innerWidth - r.right),
      top: Math.round(r.top + window.scrollY),
      bg: cs.backgroundColor,
      radius: cs.borderRadius,
      bevatTestimonial: (el.innerText || "").includes("Ibrahim"),
      bevatFooter: (el.innerText || "").includes("Privacybeleid"),
      overflow: cs.overflow,
    });
  }
  // dedupe op geometrie
  const uniek = [];
  for (const o of out) {
    if (!uniek.some((u) => u.breedte === o.breedte && u.top === o.top && u.hoogte === o.hoogte)) uniek.push(o);
  }
  return { viewport: window.innerWidth, panelen: uniek.slice(0, 10) };
});

console.log(JSON.stringify(res, null, 2));
await browser.close();
