// Haalt schone, gestructureerde content op van de live site voor alle pagina's
// die we nog moeten herbouwen. Output: ment4l-migration/content/*.json
import { chromium } from "playwright";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const OUT = path.resolve(__dirname, "../../ment4l-migration/content");
fs.mkdirSync(OUT, { recursive: true });

const PAGES = [
  "/over-ons",
  "/blog",
  "/blog/wat-valt-onder-ambulante-begeleiding",
  "/blog/vormen-van-ambulante-zorg",
  "/blog/in-aanmerking-ambulante-begeleiding",
  "/blog/waar-helpt-ambulante-begeleiding-bij",
  "/blog/verschil-ambulant-persoonlijk-begeleider",
  "/blog/welke-indicatie-ambulante-begeleiding",
  "/blog/hoe-krijg-je-ambulante-begeleiding",
  "/blog/hoe-vraag-ik-ambulante-begeleiding-aan",
  "/blog/indicatie-begeleid-wonen",
  "/blog/hoe-kom-je-aan-een-wmo-indicatie",
  "/trajecten/re-integratie-begeleiding-jeugd-gedetineerden",
  "/trajecten/ambulante-spoedhulp",
  "/trajecten/jeugdcoaching-op-scholen",
  "/trajecten/alleenstaande-minderjarige-vreemdelingen",
  "/trajecten/workshops-jeugd-digitale-wereld",
];

let browser;
try { browser = await chromium.launch({ channel: "chrome" }); } catch { browser = await chromium.launch(); }
const page = await browser.newPage({ deviceScaleFactor: 1 });
await page.setViewportSize({ width: 1440, height: 1000 });

for (const p of PAGES) {
  const url = `https://www.ment4l.nl${p}`;
  await page.goto(url, { waitUntil: "load", timeout: 60000 }).catch(() => {});
  await page.waitForTimeout(1000);
  // scroll zodat reveals + lazy images triggeren
  await page.evaluate(async () => {
    const s = (ms) => new Promise((r) => setTimeout(r, ms));
    const h = document.body.scrollHeight;
    for (let y = 0; y < h; y += 500) { window.scrollTo(0, y); await s(120); }
    window.scrollTo(0, 0); await s(250);
  });

  const data = await page.evaluate(() => {
    const hashOf = (u) => { const m = (u || "").match(/images\/([^/?"')]+)/); return m ? m[1] : null; };
    const meta = (sel, attr = "content") => document.querySelector(sel)?.getAttribute(attr) || null;

    // Blokken in DOM-volgorde: headings + paragrafen + lijstitems
    const blocks = [];
    const seen = new Set();
    for (const el of document.querySelectorAll("h1,h2,h3,h4,p,li")) {
      const txt = (el.innerText || "").replace(/\s+/g, " ").trim();
      if (!txt || txt.length < 2) continue;
      // sla elementen over die alleen tekst van kinderen herhalen
      if (seen.has(txt)) continue;
      seen.add(txt);
      blocks.push({ tag: el.tagName.toLowerCase(), text: txt });
    }

    const images = [...document.querySelectorAll("img")]
      .map((i) => ({ hash: hashOf(i.currentSrc || i.src), alt: i.alt || "", w: Math.round(i.getBoundingClientRect().width) }))
      .filter((i) => i.hash);

    return {
      title: document.title,
      description: meta('meta[name="description"]'),
      ogImage: meta('meta[property="og:image"]'),
      canonical: document.querySelector('link[rel="canonical"]')?.href || null,
      h1: document.querySelector("h1")?.innerText?.replace(/\s+/g, " ").trim() || null,
      blocks,
      images,
      height: document.body.scrollHeight,
    };
  });

  const name = p === "/" ? "home" : p.replace(/^\//, "").replace(/\//g, "__");
  fs.writeFileSync(path.join(OUT, `${name}.json`), JSON.stringify(data, null, 2), "utf8");
  console.log(`${p.padEnd(58)} blocks:${String(data.blocks.length).padStart(3)}  imgs:${String(data.images.length).padStart(2)}  h:${data.height}`);
}

await browser.close();
console.log(`\nContent opgeslagen in: ${OUT}`);
