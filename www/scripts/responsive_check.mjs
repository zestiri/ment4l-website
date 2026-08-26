// Controleert alle pagina's op mobiel/tablet/desktop:
//  - horizontale overflow (body breder dan viewport)
//  - elementen die buiten de viewport steken
//  - te kleine tikdoelen (<40px) op mobiel
// Gebruik: node www/scripts/responsive_check.mjs [baseUrl]
import { chromium } from "playwright";

const BASE = (process.argv[2] || "http://localhost:3000").replace(/\/$/, "");
const WIDTHS = [390, 768, 1440];

const PAGES = [
  "/", "/contact", "/over-ons", "/blog",
  "/blog/hoe-krijg-je-ambulante-begeleiding",
  "/blog/indicatie-begeleid-wonen",
  "/trajecten/ambulante-spoedhulp",
  "/trajecten/workshops-jeugd-digitale-wereld",
];

let browser;
try { browser = await chromium.launch({ channel: "chrome" }); } catch { browser = await chromium.launch(); }

let problems = 0;
for (const width of WIDTHS) {
  console.log(`\n===== ${width}px =====`);
  const page = await browser.newPage({ deviceScaleFactor: 1 });
  await page.setViewportSize({ width, height: 900 });

  for (const p of PAGES) {
    await page.goto(`${BASE}${p}`, { waitUntil: "load", timeout: 60000 }).catch(() => {});
    await page.waitForTimeout(500);
    // lazy content triggeren
    await page.evaluate(async () => {
      const s = (ms) => new Promise((r) => setTimeout(r, ms));
      const h = document.body.scrollHeight;
      for (let y = 0; y < h; y += 700) { window.scrollTo(0, y); await s(70); }
      window.scrollTo(0, 0); await s(150);
    });

    const res = await page.evaluate((vw) => {
      const docW = document.documentElement.scrollWidth;
      const overflow = docW - vw;
      const offenders = [];
      if (overflow > 1) {
        for (const el of document.querySelectorAll("body *")) {
          const r = el.getBoundingClientRect();
          if (r.width === 0 || r.height === 0) continue;
          if (r.right > vw + 1) {
            const cls = (typeof el.className === "string" ? el.className : "").slice(0, 60);
            offenders.push(`${el.tagName.toLowerCase()}${cls ? "." + cls.split(" ")[0] : ""} right=${Math.round(r.right)}`);
            if (offenders.length >= 3) break;
          }
        }
      }
      // kleine tikdoelen
      let tiny = 0;
      if (vw < 700) {
        for (const el of document.querySelectorAll("a,button")) {
          const r = el.getBoundingClientRect();
          if (r.width > 0 && r.height > 0 && (r.height < 32 || r.width < 32)) tiny++;
        }
      }
      return { overflow, offenders, tiny, docW };
    }, width);

    const bad = res.overflow > 1;
    if (bad) problems++;
    const flag = bad ? "OVERFLOW" : "ok";
    console.log(`  ${p.padEnd(48)} ${flag.padEnd(9)} ${bad ? `+${res.overflow}px  ${res.offenders.join(" | ")}` : ""}${res.tiny ? `  (kleine tikdoelen: ${res.tiny})` : ""}`);
  }
  await page.close();
}
await browser.close();
console.log(`\n${problems === 0 ? "GEEN horizontale overflow gevonden." : `${problems} pagina/breedte-combinaties met overflow.`}`);
