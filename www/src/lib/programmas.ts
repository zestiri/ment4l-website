/* ============================================================================
   ment4l — datalaag voor het scholen-domein
   Eén methode (de leercyclus) + 4 categorieën, elk met 4 thema's.
   Nieuw thema toevoegen = één regel. Nieuwe categorie = één object.
   ============================================================================ */

/** Boekingslink voor een kennismaking (Calendly). */
export const KENNISMAKING_URL = "https://calendly.com/ment4l-info/30min";

export type Thema = {
  naam: string;
  kort: string; // 1 korte, kindvriendelijke zin
  leeftijd: string; // bv. "9-18 jr" — meeste thema's zijn voor alle leeftijden, sommige wat ouder
  image?: string; // 1:1 thema-foto, bv. "/images/scholen/thema/wereldkeuken-taarten.png"
};

export type Motief = "menu" | "veld" | "grid" | "golf";

export type Categorie = {
  slug: string;
  naam: string;
  kort: string; // 1 zin intro
  accent: string; // hex (categorie-accent dat eruit springt)
  iconName: string; // monoline Icon-naam
  motief: Motief; // signatuur per categorie
  image?: string; // bv. "/images/scholen/wereldkeuken.jpg" — leeg = placeholder
  eindmoment: { naam: string; tekst: string };
  themas: Thema[]; // 4
};

/* De vaste methode: meestal 7 lessen die zich herhalen als een groeicyclus.
   Het aantal stemmen we af met de school. */
export const RUGGENGRAAT = [
  { nr: 1, fase: "Kennismaken", thema: "Je veilig voelen in de groep", uitleg: "We leren elkaar kennen en maken samen een veilige sfeer." },
  { nr: 2, fase: "Ontdekken", thema: "Nieuwsgierig zijn, fouten maken mag", uitleg: "Vrij uitproberen en ontdekken, zonder druk om het meteen goed te doen." },
  { nr: 3, fase: "Maken", thema: "Doorzetten als iets niet lukt", uitleg: "Aan de slag met je eigen werk, ook als het even tegenzit." },
  { nr: 4, fase: "Verbeteren", thema: "Leren van feedback", uitleg: "Samen kijken wat beter kan en je werk stap voor stap bijschaven." },
  { nr: 5, fase: "Verdieping", thema: "Een stap verder", uitleg: "De vakdocent laat een nieuwe techniek of een gaaf voorbeeld zien." },
  { nr: 6, fase: "Oefenen", thema: "Omgaan met zenuwen", uitleg: "Oefenen voor de finale en wennen aan een beetje spanning." },
  { nr: 7, fase: "Finale", thema: "Laten zien wat je maakte", uitleg: "Je laat aan ouders en de school zien waar je de afgelopen tijd aan hebt gewerkt." },
] as const;

/* De drie doelen — voor elke categorie gelijk. */
export const DOELEN = [
  { titel: "Zelfvertrouwen", tekst: "Stap voor stap durven en trots zijn op wat je maakt." },
  { titel: "Minder faalangst", tekst: "Fouten horen erbij: proberen, aanpassen, doorgaan." },
  { titel: "Gelijke kansen", tekst: "Ieder kind ontdekt een talent, waar je ook vandaan komt." },
] as const;

export const CATEGORIEEN: Categorie[] = [
  {
    slug: "wereldkeuken",
    naam: "Wereldkeuken",
    kort: "Koken en bakken uit de hele wereld, en trots op je eigen gerecht.",
    accent: "#EE634E",
    iconName: "chefhat",
    motief: "menu",
    image: "/images/scholen/wereldkeuken.png",
    eindmoment: {
      naam: "Pop-up proeverij",
      tekst: "Een proeverij op school waar ouders en klasgenoten jouw gerechten proeven.",
    },
    themas: [
      { naam: "Taarten & cupcakes", kort: "Bakken, versieren en trots laten zien.", leeftijd: "9-18 jr", image: "/images/scholen/thema/wereldkeuken-taarten.png" },
      { naam: "Koekjes & brownies", kort: "Zoet bakken dat altijd lukt (of grappig mislukt).", leeftijd: "9-18 jr", image: "/images/scholen/thema/wereldkeuken-koekjes.png" },
      { naam: "Wereldgerechten", kort: "Een gerecht uit jouw land en uit dat van een ander.", leeftijd: "12-18 jr", image: "/images/scholen/thema/wereldkeuken-wereldgerechten.png" },
      { naam: "Snacks & streetfood", kort: "Snel, lekker en samen maken.", leeftijd: "9-18 jr", image: "/images/scholen/thema/wereldkeuken-snacks.png" },
    ],
  },
  {
    slug: "sport",
    naam: "Sport & beweging",
    kort: "Bewegen, samenwerken en doorzetten, met plezier.",
    accent: "#16A34A",
    iconName: "bolt",
    motief: "veld",
    image: "/images/scholen/sport.png",
    eindmoment: {
      naam: "Eindtoernooi",
      tekst: "Een toernooi of demo voor de klas en de ouders.",
    },
    themas: [
      { naam: "Urban sports", kort: "Skaten en freerunning op je eigen tempo.", leeftijd: "12-18 jr", image: "/images/scholen/thema/sport-urban.png" },
      { naam: "Voetbal talent", kort: "Samenspelen, winnen en verliezen.", leeftijd: "9-18 jr", image: "/images/scholen/thema/sport-voetbal.png" },
      { naam: "Bootcamp", kort: "Sterker worden met leuke uitdagingen.", leeftijd: "12-18 jr", image: "/images/scholen/thema/sport-bootcamp.png" },
      { naam: "Zelfverdediging", kort: "Veilig en sterk voelen, stap voor stap.", leeftijd: "9-18 jr", image: "/images/scholen/thema/sport-zelfverdediging.png" },
    ],
  },
  {
    slug: "ai-tech",
    naam: "AI & Tech",
    kort: "Maak je eigen digitale wereld, van website tot game.",
    accent: "#6D5CF0",
    iconName: "chip",
    motief: "grid",
    image: "/images/scholen/ai-tech.png",
    eindmoment: {
      naam: "Demo-day",
      tekst: "Je laat je werk live zien aan ouders en klasgenoten.",
    },
    themas: [
      { naam: "Website bouwen", kort: "Je eigen pagina online zetten.", leeftijd: "12-18 jr", image: "/images/scholen/thema/ai-tech-website.png" },
      { naam: "Game maken", kort: "Bedenk en bouw je eigen spel.", leeftijd: "9-18 jr", image: "/images/scholen/thema/ai-tech-game.png" },
      { naam: "AI-kunst maken", kort: "Maak beeld en verhalen met AI.", leeftijd: "9-18 jr", image: "/images/scholen/thema/ai-tech-aikunst.png" },
      { naam: "App bouwen", kort: "Van idee naar een werkende app.", leeftijd: "12-18 jr", image: "/images/scholen/thema/ai-tech-app.png" },
    ],
  },
  {
    slug: "muziek-dans",
    naam: "Muziek & dans",
    kort: "Jouw stem, je ritme en je moves op het podium.",
    accent: "#E5398B",
    iconName: "waveform",
    motief: "golf",
    image: "/images/scholen/muziek-dans.png",
    eindmoment: {
      naam: "Showcase",
      tekst: "Een optreden voor ouders, klas en school.",
    },
    themas: [
      { naam: "Rap & tekst", kort: "Schrijf je eigen woorden op een beat.", leeftijd: "9-18 jr", image: "/images/scholen/thema/muziek-dans-rap.png" },
      { naam: "Dans & choreografie", kort: "Maak samen je eigen dans.", leeftijd: "9-18 jr", image: "/images/scholen/thema/muziek-dans-dans.png" },
      { naam: "Beats & producen", kort: "Maak je eigen muziek op de laptop.", leeftijd: "12-18 jr", image: "/images/scholen/thema/muziek-dans-beats.png" },
      { naam: "Zang & podium", kort: "Je stem laten horen, durven schitteren.", leeftijd: "9-18 jr", image: "/images/scholen/thema/muziek-dans-zang.png" },
    ],
  },
];

export function getCategorie(slug: string): Categorie | undefined {
  return CATEGORIEEN.find((c) => c.slug === slug);
}
