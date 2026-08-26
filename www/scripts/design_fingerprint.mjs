// Leest de ECHTE computed styles uit van kernelementen, zodat we live en rebuild
// feitelijk kunnen vergelijken (geen giswerk).
// Gebruik: node www/scripts/design_fingerprint.mjs <baseUrl> <label>
import { chromium } from "playwright";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(__dirname, "../../ment4l-migration/design");
fs.mkdirSync(OUT, { recursive: true });

const BASE = (process.argv[2] || "https://www.ment4l.nl").replace(/\/$/, "");
const LABEL = process.argv[3] || "live";

let browser;
try { browser = await chromium.launch({ channel: "chrome" }); } catch { browser = await chromium.launch(); }
const page = await browser.newPage({ deviceScaleFactor: 1 });
await page.setViewportSize({ width: 1440, height: 1000 });
await page.goto(`${BASE}/`, { waitUntil: "load", timeout: 60000 }).catch(() => {});
await page.waitForTimeout(1300);
await page.evaluate(async () => {
  const s = (ms) => new Promise((r) => setTimeout(r, ms));
  const h = document.body.scrollHeight;
  for (let y = 0; y < h; y += 450) { window.scrollTo(0, y); await s(130); }
  window.scrollTo(0, 0); await s(400);
});
try { await page.evaluate(() => document.fonts && document.fonts.ready); } catch {}

const fp = await page.evaluate(() => {
  const pick = (el, props) => {
    if (!el) return null;
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    const o = { _box: `${Math.round(r.width)}x${Math.round(r.height)}@${Math.round(r.left)}` };
    for (const p of props) o[p] = cs.getPropertyValue(p);
    return o;
  };
  const byText = (sel, re) => [...document.querySelectorAll(sel)].find((e) => re.test(e.textContent || ""));

  const TXT = ["font-family", "font-size", "font-weight", "line-height", "letter-spacing", "color", "text-transform"];
  const BOX = ["background-color", "background-image", "border-radius", "border-top-width", "border-color", "box-shadow", "padding-top", "padding-left"];

  // achtergrond-lagen op html/body en de eerste paginacontainer
  const layers = [];
  for (const el of [document.documentElement, document.body, ...document.body.children]) {
    const cs = getComputedStyle(el);
    const r = el.getBoundingClientRect();
    layers.push({
      tag: el.tagName.toLowerCase() + (el.id ? "#" + el.id : ""),
      w: Math.round(r.width), left: Math.round(r.left),
      bg: cs.backgroundColor,
      bgImage: (cs.backgroundImage || "none").slice(0, 120),
      maxWidth: cs.maxWidth, margin: cs.margin, borderRadius: cs.borderRadius,
      boxShadow: (cs.boxShadow || "none").slice(0, 90),
      border: cs.borderLeftWidth + " " + cs.borderLeftStyle + " " + cs.borderLeftColor,
    });
  }

  const h1 = document.querySelector("h1");
  const h2 = byText("h2", /Expertises|Uw zorg|Jouw vragen/);
  const cta = [...document.querySelectorAll("a")].find((a) => /Direct Aanmelden/i.test(a.textContent || ""));
  const faqCard = byText("div", /Hoe meld ik een jongere aan/);
  const body = document.body;

  return {
    viewport: window.innerWidth,
    docHeight: document.body.scrollHeight,
    layers,
    h1: pick(h1, TXT),
    h2: pick(h2, TXT),
    bodyText: pick(body, TXT),
    ctaKnop: cta ? { ...pick(cta, TXT), ...pick(cta, BOX) } : null,
    faqKaart: faqCard ? pick(faqCard, BOX) : null,
  };
});

fs.writeFileSync(path.join(OUT, `${LABEL}.json`), JSON.stringify(fp, null, 2), "utf8");
console.log(JSON.stringify(fp, null, 2));
await browser.close();
