// ── Conversiemeting ────────────────────────────────────────────────────
//
// De primaire meting loopt via de Google-klik-id, niet via een browsertag.
// Dat is een bewuste keuze, en de redenering hoort hier te staan omdat het
// anders over een half jaar als een omissie leest:
//
//  1. Modellering helpt ons niet. Google vult gaten van geweigerde toestemming
//     pas op vanaf ongeveer 700 advertentieklikken per dag. Wij verwachten er
//     15 tot 25 per maand. Wat de banner wegneemt, komt dus nooit terug.
//  2. Een banner kost bij een EU-opt-in van rond de 46% ongeveer de helft van
//     de meting. Op 1 tot 3 aanmeldingen per maand blijft er dan niets over om
//     op te sturen, en de site zou een cookiebanner krijgen voor ouders die in
//     de knel zitten.
//  3. Enhanced conversions, de methode die Google normaal aanraadt, mogen hier
//     niet: jeugdhulp valt onder de gevoelige categorieen.
//
// Daarom twee gescheiden lagen:
//
//  Laag 1 — de klik-id. Altijd aan. Geen cookie, geen localStorage, geen enkele
//  opslag op het apparaat, dus geen toestemming nodig. De id reist mee in de URL
//  (zoals Google's eigen url_passthrough dat doet), komt als verborgen veld mee
//  met het formulier en belandt in de leadmail. Daar upload je hem later mee
//  terug naar Ads als de lead een intake wordt.
//
//  Laag 2 — de Google Ads-tag. Optioneel en standaard uit. Alleen als
//  NEXT_PUBLIC_GOOGLE_ADS_ID gezet is laadt er een script, komt er een cookie en
//  verschijnt de toestemmingsbalk. Zonder die variabele blijft de site
//  cookieloos. Laag 1 werkt volledig zelfstandig, ook als laag 2 nooit aangaat.

export const ADS_ID = process.env.NEXT_PUBLIC_GOOGLE_ADS_ID ?? "";

/** Staat de optionele Google Ads-tag aan? Bepaalt tag én toestemmingsbalk. */
export const METING_AAN = ADS_ID.length > 0;

const LABELS: Record<Conversie, string> = {
  aanmelding: process.env.NEXT_PUBLIC_GADS_LABEL_AANMELDING ?? "",
  contact: process.env.NEXT_PUBLIC_GADS_LABEL_CONTACT ?? "",
  telefoon: process.env.NEXT_PUBLIC_GADS_LABEL_TELEFOON ?? "",
};

export type Conversie = "aanmelding" | "contact" | "telefoon";

/** Naam van het event in de dataLayer, ook bruikbaar voor een latere koppeling. */
const EVENT_NAAM: Record<Conversie, string> = {
  aanmelding: "aanmelding_verstuurd",
  contact: "contact_verstuurd",
  telefoon: "telefoon_klik",
};

/**
 * Waarde per conversie in euro. Geen omzet, maar een verhouding zodat Smart
 * Bidding later weet wat zwaarder weegt. Een bel-klik telt hoger dan een
 * formulier omdat een ouder die belt vaker doorgaat; een contactvraag is vaak
 * nog oriënterend. Deze waardes moeten gelijk blijven aan wat er bij de
 * conversieacties in Google Ads staat.
 */
const WAARDE: Record<Conversie, number> = {
  aanmelding: 100,
  telefoon: 120,
  contact: 40,
};

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

// ── Laag 1: de klik-id ─────────────────────────────────────────────────

/**
 * De parameters die Google aan een advertentieklik hangt.
 * wbraid en gbraid komen van iOS-verkeer waar geen gclid beschikbaar is.
 */
export const KLIK_PARAMS = ["gclid", "wbraid", "gbraid"] as const;

/** Haalt de klik-id uit een zoekstring. Los getest, vandaar apart. */
export function klikIdUit(zoekstring: string): string {
  try {
    const params = new URLSearchParams(zoekstring);
    for (const naam of KLIK_PARAMS) {
      const waarde = params.get(naam);
      if (waarde) return `${naam}:${waarde}`;
    }
  } catch {
    // Kapotte zoekstring: dan is er gewoon geen klik-id.
  }
  return "";
}

/**
 * De klik-id van de huidige pagina, in de vorm `gclid:abc123`.
 * Leest alleen de URL. Bewust geen cookie of localStorage: opslag op het
 * apparaat vraagt toestemming, de URL lezen niet.
 */
export function leesKlikId(): string {
  if (typeof window === "undefined") return "";
  return klikIdUit(window.location.search);
}

/**
 * Plakt de klik-id aan een interne URL, zodat hij de navigatie overleeft
 * zonder ergens opgeslagen te worden. Laat een bestaande klik-id staan en
 * raakt externe links niet aan.
 */
export function metKlikId(href: string, klikId: string): string {
  if (!klikId) return href;
  // Splitsen op de eerste dubbele punt: de waarde zelf mag er ook een bevatten.
  const scheiding = klikId.indexOf(":");
  if (scheiding < 1) return href;
  const naam = klikId.slice(0, scheiding);
  const waarde = klikId.slice(scheiding + 1);
  if (!waarde) return href;
  try {
    const url = new URL(href, window.location.origin);
    if (url.origin !== window.location.origin) return href;
    if (KLIK_PARAMS.some((p) => url.searchParams.has(p))) return href;
    url.searchParams.set(naam, waarde);
    return url.pathname + url.search + url.hash;
  } catch {
    return href;
  }
}

// ── Laag 2: de optionele Google Ads-tag ────────────────────────────────

/**
 * Meldt een conversie aan Google Ads. Veilig aan te roepen zonder tag, zonder
 * toestemming en tijdens server-rendering: dan gebeurt er niets. Dit is de
 * aanvulling, niet de basis. De basis is de klik-id in de leadmail.
 */
export function meldConversie(soort: Conversie) {
  if (typeof window === "undefined") return;
  try {
    window.dataLayer = window.dataLayer ?? [];
    // Altijd het losse event: ook zonder Ads-id blijft de dataLayer bruikbaar
    // voor een latere koppeling.
    window.dataLayer.push({ event: EVENT_NAAM[soort] });

    if (!METING_AAN || typeof window.gtag !== "function") return;

    const label = LABELS[soort];
    if (!label) return;

    window.gtag("event", "conversion", {
      send_to: `${ADS_ID}/${label}`,
      value: WAARDE[soort],
      currency: "EUR",
    });
  } catch {
    // Stil falen. Een kapotte meting mag nooit een aanmelding blokkeren.
  }
}
