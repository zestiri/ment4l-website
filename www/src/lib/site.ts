// ── Centrale datalaag voor de MENT4L hoofdsite ──────────────────────────
// Content geëxtraheerd uit de live Framer-site (26 aug 2026). Nog te verrijken
// per pagina tijdens de 1:1-herbouw.

/**
 * BELANGRIJK — twee gescheiden doelgroepen, twee gescheiden routes:
 *
 *  AANMELD_URL  → cliënten (ouders, jongeren, verwijzers) die hulp zoeken.
 *                 Blijft op ment4l.nl zelf, kort formulier, geen BSN.
 *  APP_URL        → "Het platform voor zorgprofessionals": login voor onze eigen
 *                   coaches/zorgverleners. NOOIT als CTA voor cliënten gebruiken —
 *                   daar komt een hulpzoekende ouder verkeerd terecht.
 *  WERKEN_BIJ_URL → registratie in datzelfde portaal (/register), voor NIEUWE
 *                   zorgprofessionals die bij ons willen werken. Geen login- maar
 *                   een aanmeldpagina; hoort bij "Werken bij", niet bij "Inloggen".
 */
export const AANMELD_URL = "/aanmelden";
export const APP_URL = "https://app.ment4l.nl";
export const WERKEN_BIJ_URL = "https://app.ment4l.nl/register";

/**
 * Wat de bezoeker over financiering moet weten — meer niet.
 * Onze contractvorm (onderaannemerschap) is voor de lezer irrelevant en hoort
 * niet op de site. Schrijf wel "wij zijn actief in", niet "wij zijn gecontracteerd".
 */
export const FINANCIERING_UITLEG =
  "De gemeente betaalt de jeugdhulp. Er is geen eigen bijdrage.";

/** De 14 gemeenten waar MENT4L jeugdhulp levert: West-Brabant en Oost. */
export const WBW_GEMEENTEN = [
  "Bergen op Zoom",
  "Etten-Leur",
  "Halderberge",
  "Moerdijk",
  "Roosendaal",
  "Rucphen",
  "Steenbergen",
  "Woensdrecht",
  "Zundert",
  "Breda",
  "Oosterhout",
  "Drimmelen",
  "Geertruidenberg",
  "Altena",
] as const;

export const CONTACT = {
  phone: "085 130 7522",
  phoneHref: "tel:+31851307522",
  email: "info@ment4l.nl",
  address: "Weena 690, Rotterdam",
} as const;

export const SLOGAN = "IT'S ALL ABOUT MENT4LITY";

export type Traject = {
  slug: string;
  naam: string;
  tagline: string;
  image: string;
};

// De expertises/trajecten zoals op de homepage getoond.
export const TRAJECTEN: Traject[] = [
  {
    slug: "re-integratie-begeleiding-jeugd-gedetineerden",
    naam: "Re-integratiebegeleiding Jeugd",
    tagline: "Van instelling naar een nieuwe start",
    image: "/images/traject-re-integratie.png",
  },
  {
    slug: "ambulante-spoedhulp",
    naam: "Ambulante Spoedhulp (ASH)",
    tagline: "Direct thuis, wanneer het niet meer alleen kan",
    image: "/images/traject-ambulante-spoedhulp.png",
  },
  {
    slug: "jeugdcoaching-op-scholen",
    naam: "Jeugdcoaching op Scholen",
    tagline: "Coaching op school, waar het verschil wordt gemaakt",
    image: "/images/traject-jeugdcoaching-op-scholen.png",
  },
  {
    slug: "alleenstaande-minderjarige-vreemdelingen",
    naam: "Alleenstaande Minderjarige Vreemdelingen (AMV)",
    tagline: "Een veilige basis voor jongeren ver van huis",
    image: "/images/traject-amv.png",
  },
];

// Hero-avatargroep (5 foto's) en partner-logo's (6), exact van de live site.
export const HERO_AVATARS = [
  "/images/avatar-2.jpg",
  "/images/avatar-3.webp",
  "/images/avatar-4.jpg",
  "/images/avatar-5.jpeg",
  "/images/avatar-e.png",
] as const;

/** Officiele logo's van de gemeenten waar MENT4L mee samenwerkt (van de eigen
 *  gemeente-sites gehaald). Volgorde gelijk aan WBW_GEMEENTEN. */
export const GEMEENTE_LOGOS = [
  { naam: "Bergen op Zoom", src: "/images/gemeenten/bergen-op-zoom.svg" },
  { naam: "Etten-Leur", src: "/images/gemeenten/etten-leur.svg" },
  { naam: "Halderberge", src: "/images/gemeenten/halderberge.svg" },
  { naam: "Moerdijk", src: "/images/gemeenten/moerdijk.svg" },
  { naam: "Roosendaal", src: "/images/gemeenten/roosendaal.svg" },
  { naam: "Rucphen", src: "/images/gemeenten/rucphen.png" },
  { naam: "Steenbergen", src: "/images/gemeenten/steenbergen.svg" },
  { naam: "Woensdrecht", src: "/images/gemeenten/woensdrecht.svg" },
  { naam: "Zundert", src: "/images/gemeenten/zundert.png" },
  { naam: "Breda", src: "/images/gemeenten/breda.svg" },
  { naam: "Oosterhout", src: "/images/gemeenten/oosterhout.svg" },
  { naam: "Drimmelen", src: "/images/gemeenten/drimmelen.svg" },
  { naam: "Geertruidenberg", src: "/images/gemeenten/geertruidenberg.svg" },
  { naam: "Altena", src: "/images/gemeenten/altena.svg" },
] as const;

export const WORKSHOPS_SLUG = "workshops-jeugd-digitale-wereld";

// ── Navigatie ──────────────────────────────────────────────────────────
//
// Opgebouwd rond wat een ouder of verwijzer zoekt, niet rond de oude Framer-
// indeling. Eerder hingen de funnelpagina's en de trajectpagina's als één platte
// lijst naast elkaar, terwijl het dezelfde diensten zijn. Nu bundelt "Ons aanbod"
// ze als een kale lijst; de randzaken (workshops, blog, huisartsverwijzing)
// zakken naar de footer, net als het personeelsportaal (APP_URL) — dat is de
// verkeerde deur voor een hulpzoekende ouder.
//
// De losse /spoed-funnel is opgeheven: de crisis-triage met landelijke
// noodnummers hoort niet bij MENT4L. De dienst "ambulante spoedhulp" blijft als
// trajectpagina bestaan en zit gewoon in Ons aanbod.

/** Icoon-sleutel; Nav.tsx mapt hem op een lucide-component. */
export type AanbodItem = {
  href: string;
  label: string;
  omschrijving: string;
  icon: "begeleiding" | "spoed" | "school" | "reintegratie" | "amv";
  /** Markeert de spoedingang, krijgt een eigen (coral) accent. */
  spoed?: boolean;
};

/** De diensten, gebundeld onder "Ons aanbod". */
export const NAV_AANBOD: AanbodItem[] = [
  {
    href: "/ambulante-begeleiding",
    label: "Ambulante begeleiding",
    omschrijving: "Een vaste jeugdcoach, gewoon bij jullie thuis.",
    icon: "begeleiding",
  },
  {
    href: "/trajecten/ambulante-spoedhulp",
    label: "Ambulante spoedhulp",
    omschrijving: "Direct hulp wanneer het thuis vastloopt.",
    icon: "spoed",
  },
  {
    href: "/scholen",
    label: "Jeugdcoaching op school",
    omschrijving: "Naschoolse talentprogramma's op scholen.",
    icon: "school",
  },
  {
    href: "/trajecten/re-integratie-begeleiding-jeugd-gedetineerden",
    label: "Re-integratiebegeleiding",
    omschrijving: "Van instelling terug naar een eigen leven.",
    icon: "reintegratie",
  },
  {
    href: "/trajecten/alleenstaande-minderjarige-vreemdelingen",
    label: "Begeleiding AMV",
    omschrijving: "Een veilige basis voor jongeren ver van huis.",
    icon: "amv",
  },
];

/** De regionale hub; als "bekijk alles"-anker onderin de aanbod-dropdown. */
export const JEUGDHULP_HUB = {
  href: "/jeugdhulp-west-brabant-west",
  label: "Alle jeugdhulp in West-Brabant",
} as const;

/** Top-level items naast de aanbod-dropdown. */
export const NAV_PRIMAIR = [
  { href: "/scholen", label: "Voor scholen" },
  { href: "/verwijzers", label: "Voor verwijzers" },
  { href: "/over-ons", label: "Over ons" },
] as const;

// Wachttijden, jongeren, workshops, huisartsverwijzing en blog staan alleen nog
// in de footer — bewust uit het mobiele menu gehaald om het rustig te houden.

// Kerncijfers (statistieken-sectie) — exact van de live homepage.
export const STATS = [
  { waarde: "10+", label: "Jaren ervaring" },
  { waarde: "100+", label: "Jeugdcoaches van verschillende culturen" },
  { waarde: "98%", label: "Van de jongeren voelt zich daadwerkelijk geholpen" },
] as const;

// Blog-teasers op de homepage (2 recente artikelen).
export const BLOG_TEASERS = [
  {
    slug: "wat-valt-onder-ambulante-begeleiding",
    categorie: "Ambulante begeleiding",
    titel: "Wat valt er onder ambulante begeleiding?",
    excerpt:
      "Ambulante begeleiding betekent dat professionele hulp bij jou thuis of in jouw omgeving komt. Maar wat valt er precies onder?",
    image: "/images/blog-1.png",
  },
  {
    slug: "vormen-van-ambulante-zorg",
    categorie: "Ambulante begeleiding",
    titel: "Welke vormen van ambulante zorg zijn er mogelijk?",
    excerpt:
      "Er zijn verschillende vormen van ambulante zorg. Van begeleiding thuis tot coaching op school. Ontdek welke vorm het beste bij jou of jouw kind past.",
    image: "/images/blog-2.png",
  },
] as const;

// Testimonials (success verhalen) — quotes exact van de live site.
export const TESTIMONIALS = [
  {
    categorie: "Asielzoeker",
    rol: "Jongere",
    quote:
      "De begeleiding hielp me mijn weg te vinden in een nieuwe cultuur. Ik voel me nu meer op mijn gemak en zelfverzekerd. Ik kan terecht bij me coach wanneer ik hem nodig heb.",
    naam: "Ibrahim T.",
    functie: "AMV | Begeleiding",
  },
  {
    categorie: "MENT4L",
    rol: "Jeugdcoach",
    quote:
      "Werken bij MENT4L biedt de kans om jongeren op een effectieve en persoonlijke manier te ondersteunen. Het team is professioneel, flexibel en altijd bereid om samen te werken aan innovatieve oplossingen.",
    naam: "Jeroen S.",
    functie: "Jeugdcoach | Team MENT4L",
  },
  {
    categorie: "Sociaal domein",
    rol: "Verwijzer",
    quote:
      "De samenwerking met dit team is snel, flexibel en innovatief. Ze reageren direct op de behoeften van onze cliënten en bieden op maat gemaakte oplossingen. Het is altijd prettig om met een professioneel en oplossingsgericht team samen te werken.",
    naam: "Angela W.",
    functie: "Verwijzer | Gemeente",
  },
  {
    categorie: "Middelbare scholier",
    rol: "Jongere",
    quote:
      "De begeleiding sessies maakten het makkelijker om open te zijn over mijn gevoelens en de dingen die me dwarszaten. Ik voel me nu sterker en bewuster van mezelf.",
    naam: "Sophie T.",
    functie: "Jeugdcoaching | Op school",
  },
] as const;

// FAQ — vragen exact van de live site. LET OP: antwoorden zijn concept
// (de live accordion laadt ze pas bij uitklappen) — nog verifiëren.
export const FAQ_ITEMS = [
  {
    vraag: "Hoe meld ik een jongere aan?",
    antwoord:
      "Aanmelden kan via 'Direct aanmelden' of telefonisch via 085 130 7522. We streven ernaar binnen 4 uur te reageren, ook buiten kantooruren. Bij spoed of crisis: bel ons, dan schakelen we vrijwel direct.",
  },
  {
    vraag: "Wat is (ambulante) jeugdcoaching?",
    antwoord:
      "Ambulante jeugdcoaching is begeleiding op maat in de eigen omgeving van de jongere: thuis, op school of in de wijk. Een vaste jeugdcoach werkt samen aan concrete doelen.",
  },
  {
    vraag: "Welke soort jeugdcoaching bied MENT4L?",
    antwoord:
      "Onder meer ambulante spoedhulp, re-integratiebegeleiding, jeugdcoaching op scholen en begeleiding van alleenstaande minderjarige vreemdelingen.",
  },
  {
    vraag: "Hoelang is de wachttijd?",
    antwoord:
      "Wij werken zonder wachtlijst. Je hoort binnen 4 uur van ons en we starten zo snel mogelijk. Gaat het om spoed of crisis? Bel ons dan meteen op 085 130 7522. Dan schakelen we vrijwel direct.",
  },
  {
    vraag: "Heb ik een verwijzing nodig",
    antwoord:
      "Vaak verloopt de financiering via de gemeente (WMO/Jeugdwet) of een verwijzer. Twijfel je? Neem contact op, dan kijken we samen naar de mogelijkheden.",
  },
  {
    vraag: "Geven jullie ook workshops?",
    antwoord:
      "Ja. MENT4L verzorgt workshops voor jongeren op scholen, onder andere over de digitale wereld. Neem contact op voor de mogelijkheden.",
  },
] as const;
