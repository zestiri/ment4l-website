// ── Centrale datalaag voor de MENT4L hoofdsite ──────────────────────────
// Content geëxtraheerd uit de live Framer-site (26 aug 2026). Nog te verrijken
// per pagina tijdens de 1:1-herbouw.

/**
 * BELANGRIJK — twee gescheiden doelgroepen, twee gescheiden routes:
 *
 *  AANMELD_URL  → cliënten (ouders, jongeren, verwijzers) die hulp zoeken.
 *                 Blijft op ment4l.nl zelf, kort formulier, geen BSN.
 *  APP_URL      → "Het platform voor zorgprofessionals": inlogomgeving voor
 *                 onze eigen coaches/zorgverleners. NOOIT als CTA voor cliënten
 *                 gebruiken — daar komt een hulpzoekende ouder verkeerd terecht.
 */
export const AANMELD_URL = "/aanmelden";
export const APP_URL = "https://app.ment4l.nl";

/** Gemeenten waar MENT4L gecontracteerd is voor jeugdhulp (regio West-Brabant West). */
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

export const PARTNER_LOGOS = [
  "/images/partner-1.png",
  "/images/partner-2.png",
  "/images/partner-3.png",
  "/images/partner-4.png",
  "/images/partner-5.png",
  "/images/partner-6.png",
] as const;

export const WORKSHOPS_SLUG = "workshops-jeugd-digitale-wereld";

// Hoofdnavigatie (volgorde zoals in de Framer-nav).
export const NAV_LINKS = [
  { href: "/#expertises", label: "Trajecten" },
  { href: `/trajecten/${WORKSHOPS_SLUG}`, label: "Workshops" },
  { href: "/blog", label: "Blog" },
  { href: "/over-ons", label: "Over ons" },
  { href: "/contact", label: "Contact" },
] as const;

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
      "Ambulante jeugdcoaching is begeleiding op maat in de eigen omgeving van de jongere — thuis, op school of in de wijk. Een vaste jeugdcoach werkt samen aan concrete doelen.",
  },
  {
    vraag: "Welke soort jeugdcoaching bied MENT4L?",
    antwoord:
      "Onder meer ambulante spoedhulp, re-integratiebegeleiding, jeugdcoaching op scholen en begeleiding van alleenstaande minderjarige vreemdelingen.",
  },
  {
    vraag: "Hoelang is de wachttijd?",
    antwoord:
      "Wij werken zonder wachtlijst. Je hoort binnen 4 uur van ons en we starten zo snel mogelijk. Gaat het om spoed of crisis? Bel ons dan meteen op 085 130 7522 — dan schakelen we vrijwel direct.",
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
