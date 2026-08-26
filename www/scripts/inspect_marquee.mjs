// Analyseert de live testimonials-sectie: kaartafmetingen, rijen, animatie.
import { chromium } from "playwright";

let browser;
try { browser = await chromium.launch({ channel: "chrome" }); } catch { browser = await chromium.launch(); }
const page = await browser.newPage({ deviceScaleFactor: 1 });
await page.setViewportSize({ width: 1440, height: 1000 });
await page.goto("https://www.ment4l.nl/", { waitUntil: "load", timeout: 60000 }).catch(() => {});
await page.waitForTimeout(1200);
await page.evaluate(async () => {
  const s = (ms) => new Promise((r) => setTimeout(r, ms));
  const h = document.body.scrollHeight;
  for (let y = 0; y < h; y += 450) { window.scrollTo(0, y); await s(140); }
  await s(400);
});
// scroll de sectie in beeld
await page.evaluate(() => {
  const h = [...document.querySelectorAll("h1,h2,h3")].find((e) => /Echte verhalen/i.test(e.textContent || ""));
  if (h) { const s = h.closest("section") || h.parentElement; window.scrollTo(0, window.scrollY + s.getBoundingClientRect().top - 40); }
});
await page.waitForTimeout(900);

const info = await page.evaluate(() => {
  const NAMEN = ["Ibrahim T.", "Jeroen S.", "Angela W.", "Sophie T."];
  // vind alle elementen die precies één naam bevatten en kaart-achtig zijn
  const kaarten = [];
  for (const el of document.querySelectorAll("div,article,li,figure")) {
    const t = el.innerText || "";
    const hits = NAMEN.filter((n) => t.includes(n));
    if (hits.length !== 1) continue;
    const r = el.getBoundingClientRect();
    if (r.width < 200 || r.height < 120 || r.width > 900) continue;
    // alleen de buitenste per naam-instantie
    if (kaarten.some((k) => k.node.contains(el))) continue;
    kaarten.push({ node: el, naam: hits[0], w: Math.round(r.width), h: Math.round(r.height), x: Math.round(r.left), y: Math.round(r.top) });
  }
  const rijen = {};
  for (const k of kaarten) {
    const key = Math.round(k.y / 80) * 80;
    (rijen[key] = rijen[key] || []).push(`${k.naam} x=${k.x} w=${k.w}`);
  }
  // animaties + transforms in de sectie
  const h = [...document.querySelectorAll("h1,h2,h3")].find((e) => /Echte verhalen/i.test(e.textContent || ""));
  let sec = h ? (h.closest("section") || h.parentElement) : document.body;
  for (let k = 0; k < 6 && sec.parentElement; k++) {
    if ((sec.innerText || "").includes("Ibrahim") && (sec.innerText || "").includes("Sophie")) break;
    sec = sec.parentElement;
  }
  const anim = [];
  for (const el of sec.querySelectorAll("*")) {
    const cs = getComputedStyle(el);
    if (cs.animationName && cs.animationName !== "none") {
      anim.push({ animatie: cs.animationName, duur: cs.animationDuration, richting: cs.animationDirection, timing: cs.animationTimingFunction });
    }
  }
  // rijcontainers: brede elementen met veel kinderen
  const rijBoxen = [];
  for (const el of sec.querySelectorAll("div")) {
    const r = el.getBoundingClientRect();
    if (r.width > 1400 && el.children.length >= 3 && r.height > 150 && r.height < 500) {
      rijBoxen.push({ kinderen: el.children.length, w: Math.round(r.width), h: Math.round(r.height), overflowX: getComputedStyle(el).overflowX, transform: getComputedStyle(el).transform.slice(0, 40) });
    }
  }
  return {
    sectieHoogte: Math.round(sec.getBoundingClientRect().height),
    aantalKaartInstanties: kaarten.length,
    kaarten: kaarten.map((k) => `${k.naam} ${k.w}x${k.h} @x=${k.x} y=${k.y}`),
    rijen,
    animaties: anim.slice(0, 8),
    rijBoxen: rijBoxen.slice(0, 6),
  };
});

console.log(JSON.stringify(info, null, 2));
await browser.close();
