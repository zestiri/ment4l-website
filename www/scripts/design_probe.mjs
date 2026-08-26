// Diepe meting van specifieke design-details op de live site of onze rebuild.
// Gebruik: node www/scripts/design_probe.mjs <baseUrl> <label>
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

const data = await page.evaluate(() => {
  const st = (el) => (el ? getComputedStyle(el) : null);
  const box = (el) => { const r = el.getBoundingClientRect(); return `${Math.round(r.width)}x${Math.round(r.height)}@x${Math.round(r.left)},y${Math.round(r.top + window.scrollY)}`; };
  const findTxt = (sel, re) => [...document.querySelectorAll(sel)].find((e) => re.test((e.textContent || "").trim()));

  const res = {};

  // 1. Elementen met een achtergrondafbeelding (texturen/patronen) + hun positie
  res.textureLagen = [];
  for (const el of document.querySelectorAll("*")) {
    const cs = getComputedStyle(el);
    const bi = cs.backgroundImage;
    if (bi && bi !== "none") {
      const r = el.getBoundingClientRect();
      if (r.width > 100 && r.height > 100) {
        res.textureLagen.push({
          tag: el.tagName.toLowerCase(), box: box(el),
          bgImage: bi.slice(0, 110), bgRepeat: cs.backgroundRepeat, bgSize: cs.backgroundSize,
          opacity: cs.opacity, position: cs.position, zIndex: cs.zIndex,
        });
      }
    }
    if (res.textureLagen.length > 14) break;
  }

  // 2. Randen/lijnen: elementen met een zichtbare border of dashed/dotted styling
  res.lijnen = [];
  for (const el of document.querySelectorAll("*")) {
    const cs = getComputedStyle(el);
    const styles = [cs.borderLeftStyle, cs.borderTopStyle, cs.borderRightStyle];
    if (styles.some((s) => s === "dashed" || s === "dotted")) {
      const r = el.getBoundingClientRect();
      if (r.width > 20 || r.height > 20) {
        res.lijnen.push({ tag: el.tagName.toLowerCase(), box: box(el), style: `${cs.borderLeftStyle}/${cs.borderTopStyle}`, kleur: cs.borderLeftColor, breedte: cs.borderLeftWidth });
      }
    }
    if (res.lijnen.length > 10) break;
  }

  // 3. Nav
  const nav = document.querySelector("nav") || document.querySelector("header");
  if (nav) {
    const cs = st(nav);
    res.nav = { box: box(nav), bg: cs.backgroundColor, bgImage: cs.backgroundImage.slice(0, 70), radius: cs.borderRadius, shadow: cs.boxShadow.slice(0, 120), backdrop: cs.backdropFilter, padding: cs.padding, border: `${cs.borderTopWidth} ${cs.borderTopStyle} ${cs.borderTopColor}` };
  }

  // 4. De primaire CTA-knop ('Direct Aanmelden') — pak het element met achtergrondkleur
  const knoppen = [...document.querySelectorAll("a,button")].filter((a) => /Direct Aanmelden/i.test(a.textContent || ""));
  res.ctaKnoppen = knoppen.slice(0, 3).map((el) => {
    const cs = st(el);
    // zoek het gestylede kind indien de <a> zelf transparant is
    let target = el;
    if (cs.backgroundColor === "rgba(0, 0, 0, 0)") {
      const kid = [...el.querySelectorAll("*")].find((k) => getComputedStyle(k).backgroundColor !== "rgba(0, 0, 0, 0)");
      if (kid) target = kid;
    }
    const t = st(target);
    return { box: box(target), bg: t.backgroundColor, radius: t.borderRadius, shadow: t.boxShadow.slice(0, 110), padding: t.padding, fontSize: t.fontSize, fontWeight: t.fontWeight, fontFamily: t.fontFamily.slice(0, 40), color: t.color, letterSpacing: t.letterSpacing };
  });

  // 5. Sectie-paddings: alle direct zichtbare secties met hun verticale ruimte
  res.secties = [];
  const koppen = ["Onze samenwerkingen", "Expertises", "Uw zorg", "Jouw vragen", "Inzichten", "Echte verhalen"];
  for (const k of koppen) {
    const el = findTxt("h1,h2,h3,p,span", new RegExp(k, "i"));
    if (!el) continue;
    let sec = el.closest("section") || el.parentElement;
    for (let i = 0; i < 4 && sec.parentElement; i++) {
      const r = sec.getBoundingClientRect();
      if (r.width > 1200) break;
      sec = sec.parentElement;
    }
    const cs = st(sec);
    res.secties.push({ kop: k, box: box(sec), bg: cs.backgroundColor, paddingTop: cs.paddingTop, paddingBottom: cs.paddingBottom, borderTop: `${cs.borderTopWidth} ${cs.borderTopStyle} ${cs.borderTopColor}` });
  }

  // 6. Kaarten: traject-kaart + FAQ-item + stat-kaart
  const kaartVan = (re, sel = "a,div,article") => {
    const el = findTxt(sel, re);
    if (!el) return null;
    let n = el;
    for (let i = 0; i < 5 && n.parentElement; i++) {
      const cs = getComputedStyle(n);
      if (cs.borderRadius !== "0px" && (cs.backgroundColor !== "rgba(0, 0, 0, 0)" || cs.backgroundImage !== "none")) break;
      n = n.parentElement;
    }
    const cs = st(n);
    return { box: box(n), bg: cs.backgroundColor, radius: cs.borderRadius, shadow: cs.boxShadow.slice(0, 110), border: `${cs.borderTopWidth} ${cs.borderTopStyle} ${cs.borderTopColor}`, padding: cs.padding };
  };
  res.trajectKaart = kaartVan(/Ambulante Spoedhulp \(ASH\)/);
  res.faqItem = kaartVan(/^Hoe meld ik een jongere aan\?$/);
  res.statKaart = kaartVan(/Jaren ervaring/);

  // 7. Kleuren die daadwerkelijk voorkomen (top 12 achtergrondkleuren)
  const kleuren = {};
  for (const el of document.querySelectorAll("*")) {
    const c = getComputedStyle(el).backgroundColor;
    if (c && c !== "rgba(0, 0, 0, 0)") kleuren[c] = (kleuren[c] || 0) + 1;
  }
  res.topAchtergrondkleuren = Object.entries(kleuren).sort((a, b) => b[1] - a[1]).slice(0, 12);

  // 8. Alle unieke border-radius waarden
  const radii = {};
  for (const el of document.querySelectorAll("*")) {
    const r = getComputedStyle(el).borderRadius;
    if (r && r !== "0px") radii[r] = (radii[r] || 0) + 1;
  }
  res.topRadii = Object.entries(radii).sort((a, b) => b[1] - a[1]).slice(0, 10);

  // 9. Alle unieke box-shadows
  const shadows = {};
  for (const el of document.querySelectorAll("*")) {
    const s = getComputedStyle(el).boxShadow;
    if (s && s !== "none") shadows[s.slice(0, 80)] = (shadows[s.slice(0, 80)] || 0) + 1;
  }
  res.topShadows = Object.entries(shadows).sort((a, b) => b[1] - a[1]).slice(0, 8);

  return res;
});

fs.writeFileSync(path.join(OUT, `probe-${LABEL}.json`), JSON.stringify(data, null, 2), "utf8");
console.log(`opgeslagen: probe-${LABEL}.json`);
await browser.close();
