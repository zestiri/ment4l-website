// Datalaag voor de acquisitiefunnel (jeugdhulp West-Brabant West).
// Losgekoppeld van de content die uit de oude Framer-site komt.

export type Gemeente = {
  slug: string;
  naam: string;
  /** Grotere kernen binnen de gemeente — helpt bij lokale herkenning. */
  kernen: string[];
};

/** De 9 gemeenten van regio West-Brabant West waar MENT4L actief is. */
export const GEMEENTEN: Gemeente[] = [
  { slug: "bergen-op-zoom", naam: "Bergen op Zoom", kernen: ["Bergen op Zoom", "Halsteren", "Lepelstraat"] },
  { slug: "etten-leur", naam: "Etten-Leur", kernen: ["Etten-Leur"] },
  { slug: "halderberge", naam: "Halderberge", kernen: ["Oudenbosch", "Oud Gastel", "Hoeven", "Bosschenhoofd"] },
  { slug: "moerdijk", naam: "Moerdijk", kernen: ["Zevenbergen", "Klundert", "Fijnaart", "Willemstad"] },
  { slug: "roosendaal", naam: "Roosendaal", kernen: ["Roosendaal", "Wouw", "Nispen", "Heerle"] },
  { slug: "rucphen", naam: "Rucphen", kernen: ["Rucphen", "Sprundel", "St. Willebrord", "Zegge"] },
  { slug: "steenbergen", naam: "Steenbergen", kernen: ["Steenbergen", "Dinteloord", "Kruisland", "Nieuw-Vossemeer"] },
  { slug: "woensdrecht", naam: "Woensdrecht", kernen: ["Hoogerheide", "Putte", "Ossendrecht", "Huijbergen"] },
  { slug: "zundert", naam: "Zundert", kernen: ["Zundert", "Rijsbergen", "Achtmaal", "Wernhout"] },
];

export const getGemeente = (slug: string) => GEMEENTEN.find((g) => g.slug === slug);

/**
 * Leidt de gemeente af uit een vrij ingevulde woonplaats.
 * We vragen de bezoeker bewust NIET om een gemeente te kiezen — een ouder weet
 * "Oudenbosch", niet "Halderberge". Wij zoeken de gemeente er zelf bij, zodat de
 * aanmelding meteen goed gerouteerd is.
 * Geeft null terug als de plaats niet in ons werkgebied ligt; dat is informatie,
 * geen afwijzing.
 */
export function gemeenteVoorPlaats(woonplaats: string): string | null {
  const norm = (s: string) =>
    s
      .toLowerCase()
      .normalize("NFD")
      .replace(/[̀-ͯ]/g, "")
      .replace(/[^a-z]/g, "");
  const p = norm(woonplaats);
  if (!p) return null;
  for (const g of GEMEENTEN) {
    if (norm(g.naam) === p) return g.naam;
    if (g.kernen.some((k) => norm(k) === p)) return g.naam;
  }
  return null;
}

/**
 * Actuele startdatum per traject.
 * LET OP: dit is het sterkste bewijsstuk van de hele funnel — maar alleen zolang
 * het klopt. Werk `bijgewerkt` en `wachttijd` wekelijks bij; een verouderde
 * wachttijdpagina is schadelijker dan geen wachttijdpagina.
 */
export const WACHTTIJDEN_BIJGEWERKT = "26 augustus 2026";

export type Wachttijd = { traject: string; wachttijd: string; toelichting: string };

export const WACHTTIJDEN: Wachttijd[] = [
  { traject: "Ambulante spoedhulp (ASH)", wachttijd: "Direct", toelichting: "Bij crisis schakelen we vrijwel direct. Bel ons." },
  { traject: "Ambulante begeleiding jeugd", wachttijd: "Geen wachttijd", toelichting: "We plannen de kennismaking binnen een week." },
  { traject: "Jeugdcoaching op school", wachttijd: "Geen wachttijd", toelichting: "In overleg met school, meestal binnen twee weken." },
  { traject: "Re-integratiebegeleiding jeugd", wachttijd: "Geen wachttijd", toelichting: "Start in overleg met de instelling of reclassering." },
  { traject: "Begeleiding AMV", wachttijd: "Geen wachttijd", toelichting: "We stemmen af met voogd en opvanglocatie." },
];

/** Wie mag verwijzen naar jeugdhulp onder de Jeugdwet. */
export const VERWIJZERS = [
  "Huisarts",
  "Jeugdarts",
  "Medisch specialist",
  "Gemeente of wijkteam",
  "Gecertificeerde instelling (jeugdbescherming of jeugdreclassering)",
];

/** Officiële nummers bij acute onveiligheid — altijd tonen náást ons eigen nummer. */
export const CRISISNUMMERS = [
  { nummer: "112", href: "tel:112", wanneer: "Direct gevaar of een noodsituatie" },
  { nummer: "0800-0113", href: "tel:08000113", wanneer: "Zelfmoordgedachten: 113 Zelfmoordpreventie, 24/7" },
  { nummer: "0800-2000", href: "tel:08002000", wanneer: "Veilig Thuis: advies bij huiselijk geweld of kindermishandeling" },
];

/** Wat een gezin kan verwachten na de aanmelding. */
export const STAPPEN = [
  { titel: "Je meldt je aan", tekst: "Via het formulier of telefonisch. Een paar zinnen over wat er speelt is genoeg." },
  { titel: "Wij bellen binnen 4 uur", tekst: "Ook 's avonds en in het weekend. We bespreken de situatie en of we passend zijn." },
  { titel: "We regelen de verwijzing", tekst: "Nog geen verwijzing? We helpen je die te krijgen bij de huisarts of het wijkteam." },
  { titel: "Kennismaking en start", tekst: "Zodra de verwijzing rond is, plannen we de kennismaking. Geen wachtlijst." },
];

/** Kernbewijs dat op elke landingspagina terugkomt. */
export const BEWIJS = [
  { waarde: "4 uur", label: "Streeftijd waarbinnen we reageren" },
  { waarde: "24/7", label: "Bereikbaar, ook buiten kantooruren" },
  { waarde: "9", label: "Gemeenten waar we actief zijn" },
  { waarde: "1000+", label: "Jongeren begeleid" },
];
