/* ============================================================================
   ment4l — datamodel (zie docs/00-framework.md §9)
   Eén nieuw programma toevoegen = alleen een object aan PROGRAMMAS toevoegen.
   De coachende "motor" (lesthema's + ritueel) staat vast in BLOK_RUGGENGRAAT.
   ============================================================================ */

/* De vaste coachende ruggengraat — geldt voor ELK programma (de "motor"). */
const BLOK_RUGGENGRAAT = [
  { nr: 1, fase: "Veilige basis",      thema: "Veiligheid & erbij horen" },
  { nr: 2, fase: "Durven beginnen",    thema: "Fouten mogen maken — fouten = data" },
  { nr: 3, fase: "Ontdekken",          thema: "Nieuwsgierigheid boven perfectie" },
  { nr: 4, fase: "Bouwen",             thema: "Doorzetten bij tegenslag" },
  { nr: 5, fase: "Bijschaven",         thema: "Feedback is een cadeau" },
  { nr: 6, fase: "Meesterles",         thema: "Rolmodellen & 'ik kan dit ook'", expert: true },
  { nr: 7, fase: "Generale",           thema: "Spanning hoort erbij — omgaan met zenuwen" },
  { nr: 8, fase: "Podiummoment",       thema: "Trots & erkenning" },
];

/* Het vaste lesritueel (elke les). */
const RITUEEL = [
  { stap: "Check-in",      duur: "5 min",  tekst: "Hoe sta je erbij? (duimen / stemmingsmeter)" },
  { stap: "ment4l-moment", duur: "10 min", tekst: "Coachingsthema van de les" },
  { stap: "Doen",          duur: "40–60 min", tekst: "Werken aan de skill / het eindproduct" },
  { stap: "Check-out",     duur: "10 min", tekst: "Groeimeter: wat lukte, waar trots op, volgende keer?" },
];

/* De coachingsdoelen (de motor) — voor alle programma's gelijk. */
const COACHINGSDOELEN = [
  { icon: "🌱", titel: "Zelfvertrouwen", tekst: "Stap voor stap durven, en trots voelen op wat je maakt." },
  { icon: "🔁", titel: "Faalangst",      tekst: "Fouten worden data: proberen, bijstellen, doorgaan." },
  { icon: "⚖️", titel: "Gelijke kansen", tekst: "Talent zichtbaar maken, ongeacht waar je vandaan komt." },
];

/* ---------------------------------------------------------------------------
   De programma's (het "vehikel"). Vehikel-activiteit + mijlpaal per les.
   --------------------------------------------------------------------------- */
const PROGRAMMAS = [
  {
    id: "wereldkeuken",
    titel: "Wereldkeuken Bakken",
    accent: "#EE634E",
    icoon: "🍳",
    pitch: "Samen koken & bakken met gerechten uit de hele wereld — en trots zijn op je eigen verhaal.",
    vehikel: "Koken & bakken",
    doelgroep: "PO & VO",
    showcase: { titel: "Pop-up proeverij", tekst: "Een wereldmarkt waar kinderen hun signatuurgerecht presenteren en publiek laten proeven." },
    haak: "Jouw achtergrond is iets om trots op te zijn — en verbrande koekjes horen erbij.",
    lessen: [
      "Kennismaken via eten: 'welk gerecht hoort bij jou?'. Iedereen heeft een verhaal.",
      "Eerste bak-opdracht met bewuste 'oeps-momenten' (pannenkoeken/muffins) — mislukken mag.",
      "Smaken van de wereld proeven en verkennen: kruiden, deeg, bakken vs. koken.",
      "Eerste versie van het eigen signatuurgerecht maken.",
      "Proeverij in tweetallen: feedback geven, ontvangen en het recept aanpassen.",
      "Gastkok/bakker: eigen verhaal (incl. mislukkingen) + masterclass bord-presentatie.",
      "Definitief gerecht maken + oefenen hoe je het presenteert en aanbiedt.",
      "Pop-up proeverij voor publiek: presenteren, laten proeven, het verhaal vertellen.",
    ],
    mijlpalen: [
      "Groeidoel gekozen", "Eerste poging gemaakt", "Richting gerecht gekozen", "Versie 1 af",
      "Versie 2 + feedback", "Tip expert verwerkt", "Eindproduct + pitch klaar", "Showcase + certificaat",
    ],
  },
  {
    id: "rap",
    titel: "Rap & Muziektalent",
    accent: "#1F66FF",
    icoon: "🎤",
    pitch: "Van woord en ritme naar een echte track — en je eigen stem durven laten horen.",
    vehikel: "Muziek & rap",
    doelgroep: "PO & VO",
    showcase: { titel: "Showcase-concert", tekst: "Een live optreden waar elk kind de eigen track op een echt podium brengt." },
    haak: "Jouw stem en jouw verhaal doen ertoe — podium leer je, stapje voor stapje.",
    lessen: [
      "Muziek waar jij sterk van wordt; groepsafspraken; samen een beat meeklappen.",
      "Laagdrempelige eerste opdracht: een paar regels op een beat / freestyle in een veilige kring.",
      "Experimenteren met beats, rijmschema's en stijlen (rap/zang/spoken word).",
      "Eerste couplet/tekst schrijven op de gekozen beat.",
      "Teksten delen in kleine kring; feedback verwerken, flow en rijm aanscherpen.",
      "Gastrapper/producer: eigen verhaal (incl. afwijzingen) + masterclass flow & podium.",
      "Track afmaken/opnemen + het optreden oefenen op het podium.",
      "Showcase-concert: live optreden voor publiek met de eigen track.",
    ],
    mijlpalen: [
      "Groeidoel gekozen", "Eerste regels gemaakt", "Thema track gekozen", "Versie 1 tekst af",
      "Versie 2 + feedback", "Tip expert verwerkt", "Track + optreden klaar", "Showcase + certificaat",
    ],
  },
  {
    id: "ai",
    titel: "AI-applicatie Bouwen",
    accent: "#28293E",
    icoon: "🤖",
    pitch: "Van idee naar een werkende AI-app — en ontdekken dat een bug een puzzel is, geen falen.",
    vehikel: "Tech & AI",
    doelgroep: "PO & VO",
    showcase: { titel: "Demo-day", tekst: "Een pitch-event waar elk kind de werkende app toont en uitlegt welk probleem het oplost." },
    haak: "Jij kunt iets bouwen dat een probleem oplost — vastlopen hoort bij maken.",
    lessen: [
      "Wat zou jij willen dat een app oplost? Samen één bestaande AI-app uitproberen.",
      "Eerste mini-opdracht: iets kleins laten werken, mét 'het werkt nog niet'-momenten.",
      "Mogelijkheden van de tool verkennen: tekst, beeld, vraag-antwoord, simpele logica.",
      "Eerste werkende versie van de app bouwen (een prototype, hoe simpel ook).",
      "Apps onderling testen (gebruikerstest in tweetallen) en verbeteren.",
      "Gast-developer/AI-maker: eigen verhaal (incl. bugs) + masterclass idee & pitch.",
      "App afmaken + de pitch/demo oefenen (probleem → oplossing → demo).",
      "Demo-day: pitchen en de werkende app demonstreren voor publiek.",
    ],
    mijlpalen: [
      "Groeidoel gekozen", "Eerste poging + bug opgelost", "Probleem/idee gekozen", "Versie 1 prototype",
      "Versie 2 + feedback", "Tip expert verwerkt", "App + pitch klaar", "Showcase + certificaat",
    ],
  },
];
