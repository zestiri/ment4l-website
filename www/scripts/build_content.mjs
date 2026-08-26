// Zet de ruwe extractie (ment4l-migration/content/*.json) om naar gestructureerde
// content voor de app: www/src/content/blog.json en www/src/content/trajecten.json
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SRC = path.resolve(__dirname, "../../ment4l-migration/content");
const DST = path.resolve(__dirname, "../src/content");
fs.mkdirSync(DST, { recursive: true });

const read = (f) => JSON.parse(fs.readFileSync(path.join(SRC, f), "utf8"));

// Typefouten die in de Framer-bron staan en we bij de herbouw corrigeren.
// (blijft gelden als de content opnieuw uit de live site wordt gehaald)
const TYPOS = [[/\bBegleiding\b/g, "Begeleiding"]];
const fixTypos = (s) =>
  typeof s === "string" ? TYPOS.reduce((acc, [re, rep]) => acc.replace(re, rep), s) : s;

// blokken die tot de gedeelde chrome horen (nav/footer/FAQ/CTA/testimonials)
const NAV = ["Trajecten", "Workshops", "Blog", "Over ons", "Contact", "App"];
const STOP = [
  "Jouw vragen, beantwoord",
  "Benieuwd hoe we je kunnen helpen?",
  "SUCCESS VERHALEN",
  "Echte verhalen, echte resultaten",
  "ITS ALL ABOUT MENT4LITY.",
];

function stripChrome(blocks) {
  // voorloop-nav weghalen
  let start = 0;
  while (start < blocks.length && NAV.includes(blocks[start].text)) start++;
  // afkappen bij de eerste gedeelde sectie
  let end = blocks.length;
  for (let i = start; i < blocks.length; i++) {
    if (STOP.some((s) => blocks[i].text === s)) { end = i; break; }
  }
  return blocks.slice(start, end);
}

// ---------- BLOG ----------
const BLOG_SLUGS = [
  "wat-valt-onder-ambulante-begeleiding",
  "vormen-van-ambulante-zorg",
  "in-aanmerking-ambulante-begeleiding",
  "waar-helpt-ambulante-begeleiding-bij",
  "verschil-ambulant-persoonlijk-begeleider",
  "welke-indicatie-ambulante-begeleiding",
  "hoe-krijg-je-ambulante-begeleiding",
  "hoe-vraag-ik-ambulante-begeleiding-aan",
  "indicatie-begeleid-wonen",
  "hoe-kom-je-aan-een-wmo-indicatie",
];

const blog = BLOG_SLUGS.map((slug) => {
  const d = read(`blog__${slug}.json`);
  const b = stripChrome(d.blocks);
  const categorie = b[0]?.tag === "p" ? b[0].text : "Ambulante begeleiding";
  const tIdx = b.findIndex((x) => x.tag === "h2");
  const titel = b[tIdx]?.text || slug;
  const rest = b.slice(tIdx + 1);

  // intro = paragrafen tot de eerste h2
  const firstH2 = rest.findIndex((x) => x.tag === "h2");
  const intro = (firstH2 === -1 ? rest : rest.slice(0, firstH2))
    .filter((x) => x.tag === "p").map((x) => x.text);

  // secties: h2/h3 + volgende paragrafen
  const secties = [];
  for (let i = firstH2 === -1 ? rest.length : firstH2; i < rest.length; i++) {
    const el = rest[i];
    if (el.tag === "h2" || el.tag === "h3") {
      secties.push({ level: el.tag, kop: el.text, alineas: [] });
    } else if (el.tag === "p" && secties.length) {
      secties[secties.length - 1].alineas.push(el.text);
    }
  }

  return {
    slug,
    categorie: fixTypos(categorie),
    titel: fixTypos(titel),
    // titel-suffix van Framer afknippen voor onze eigen metadata
    pageTitle: fixTypos((d.title || "").split(" - ")[0]),
    description: d.description,
    intro: intro.map(fixTypos),
    secties: secties.map((s) => ({ ...s, kop: fixTypos(s.kop), alineas: s.alineas.map(fixTypos) })),
  };
});

fs.writeFileSync(path.join(DST, "blog.json"), JSON.stringify(blog, null, 2), "utf8");

// ---------- TRAJECTEN ----------
const TRAJECT_SLUGS = [
  "re-integratie-begeleiding-jeugd-gedetineerden",
  "ambulante-spoedhulp",
  "jeugdcoaching-op-scholen",
  "alleenstaande-minderjarige-vreemdelingen",
  "workshops-jeugd-digitale-wereld",
];

const trajecten = TRAJECT_SLUGS.map((slug) => {
  const d = read(`trajecten__${slug}.json`);
  const b = stripChrome(d.blocks);
  const eyebrow = b[0]?.tag === "p" ? b[0].text : null;
  const h1 = b.find((x) => x.tag === "h1")?.text || d.h1 || slug;
  const h1i = b.findIndex((x) => x.tag === "h1");
  const tagline = b[h1i + 1]?.tag === "p" ? b[h1i + 1].text : "";
  const sub = b.find((x) => x.tag === "h3")?.text || null;

  const grab = (kop) => {
    const i = b.findIndex((x) => (x.tag === "h2" || x.tag === "h3") && x.text === kop);
    if (i === -1) return [];
    const out = [];
    for (let j = i + 1; j < b.length; j++) {
      if (b[j].tag === "h2" || b[j].tag === "h3") break;
      if (b[j].tag === "p" || b[j].tag === "li") out.push(b[j].text);
    }
    return out;
  };

  // Werkwijze-stappen: titel en beschrijving zijn samengeplakt door innerText.
  // De beschrijving begint bij het eerste woord ná het eerste woord dat met een
  // hoofdletter start ("Stabilisatie in de thuissituatie | We komen bij ...").
  const splitStap = (tekst) => {
    const woorden = tekst.split(" ");
    for (let i = 1; i < woorden.length; i++) {
      if (/^[A-Z]/.test(woorden[i])) {
        return { titel: woorden.slice(0, i).join(" "), tekst: woorden.slice(i).join(" ") };
      }
    }
    return { titel: "", tekst };
  };

  const werkwijze = grab("Werkwijze")
    .filter((t) => t !== "FAQ" && t.length > 40)
    .map(splitStap);

  return {
    slug,
    eyebrow: fixTypos(eyebrow),
    titel: fixTypos(h1),
    tagline: fixTypos(tagline),
    subkop: fixTypos(sub),
    pageTitle: (d.title || "").split(" - ")[0],
    description: d.description,
    samenvatting: grab("Samenvatting").map(fixTypos),
    voordelen: grab("Voordelen").map(fixTypos),
    werkwijze: werkwijze.map((w) => ({ titel: fixTypos(w.titel), tekst: fixTypos(w.tekst) })),
  };
});

fs.writeFileSync(path.join(DST, "trajecten.json"), JSON.stringify(trajecten, null, 2), "utf8");

// ---------- OVER ONS ----------
const ov = read("over-ons.json");
fs.writeFileSync(
  path.join(DST, "over-ons.json"),
  JSON.stringify({ title: ov.title, description: ov.description, blocks: stripChrome(ov.blocks) }, null, 2),
  "utf8",
);

console.log(`blog.json:      ${blog.length} artikelen`);
blog.forEach((a) => console.log(`   ${a.slug.padEnd(45)} secties:${String(a.secties.length).padStart(2)} intro:${a.intro.length}`));
console.log(`trajecten.json: ${trajecten.length} trajecten`);
trajecten.forEach((t) => console.log(`   ${t.slug.padEnd(45)} voordelen:${t.voordelen.length} werkwijze:${t.werkwijze.length} samenv:${t.samenvatting.length}`));
console.log(`over-ons.json:  ${stripChrome(ov.blocks).length} blokken`);
