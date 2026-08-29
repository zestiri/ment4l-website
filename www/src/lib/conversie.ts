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

/** Staat de optionele Google Ads-tag aan? Bepaalt de Ads-conversie. */
export const METING_AAN = ADS_ID.length > 0;

/**
 * GA4-analytics, los van Ads en optioneel. Zelfde gtag, eigen meet-id, achter
 * dezelfde toestemmingsbalk. Statistiek zoals concurrenten (Youz e.a.) dat doen.
 * Google Signals en ad-personalisatie staan UIT (zie layout.tsx), zodat het
 * pure bezoekcijfers zijn en geen personalisatie op gevoelig gedrag.
 *
 * GA4-conversies (generate_lead voor een aanmelding, telefoon_klik) mogen wel
 * naar Ads geimporteerd worden, maar alleen als SECUNDAIRE conversie: puur meten
 * en rapporteren, nooit als bod-signaal. De grens die we niet overgaan is
 * conversie-gestuurd Smart Bidding (Max. conversies / tCPA) en enhanced
 * conversions; beide zouden neerkomen op bieden op of hashen van gevoelig
 * zorggedrag, en die blijven uit. Bij handmatig CPC is de import zuiver meting.
 */
export const GA4_ID = process.env.NEXT_PUBLIC_GA4_ID ?? "";
export const GA4_AAN = GA4_ID.length > 0;

/** Staat er een Google-tag aan die cookies zet? Bepaalt het tag-script én de balk. */
export const TAG_AAN = METING_AAN || GA4_AAN;

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
 * De klik-id van dit bezoek, in de vorm `gclid:abc123`.
 *
 * Waarom een variabele in het geheugen en geen cookie: opslag op het apparaat
 * vraagt toestemming, een variabele niet. De site is één client-side app, dus
 * deze waarde overleeft alle navigatie van landingspagina naar formulier. Bij
 * een harde herlading is hij weg, en dat is het eerlijke gedrag: dan hebben we
 * niets bewaard om terug te halen.
 *
 * LET OP: eerder probeerden we de id mee te geven door het href-attribuut van
 * interne links te herschrijven. Dat werkt niet: de Next-router navigeert op de
 * React-prop, niet op het DOM-attribuut, dus de herschrijving werd genegeerd.
 * Vandaar deze opzet.
 */
let onthouden = "";

/** Leest de klik-id uit de huidige URL en onthoudt hem voor de rest van het bezoek. */
export function onthoudKlikId(): string {
  if (typeof window === "undefined") return "";
  const uitUrl = klikIdUit(window.location.search);
  if (uitUrl) onthouden = uitUrl;
  return onthouden;
}

/** De onthouden klik-id, met de huidige URL als terugval. */
export function leesKlikId(): string {
  if (typeof window === "undefined") return "";
  return onthouden || klikIdUit(window.location.search);
}

/**
 * Zet de klik-id terug in de adresbalk als hij daar ontbreekt, zonder een
 * navigatie te veroorzaken. Puur zodat een herlading of een gedeelde link de
 * id niet verliest; de meting zelf leunt op `leesKlikId`.
 */
export function schrijfKlikIdInUrl() {
  if (typeof window === "undefined" || !onthouden) return;
  const scheiding = onthouden.indexOf(":");
  if (scheiding < 1) return;
  const naam = onthouden.slice(0, scheiding);
  const waarde = onthouden.slice(scheiding + 1);
  if (!waarde) return;
  try {
    const url = new URL(window.location.href);
    if (KLIK_PARAMS.some((p) => url.searchParams.has(p))) return;
    url.searchParams.set(naam, waarde);
    window.history.replaceState(window.history.state, "", url.toString());
  } catch {
    // De adresbalk bijwerken is een extraatje, geen voorwaarde.
  }
}

// ── Laag 2: de optionele Google Ads-tag ────────────────────────────────

/** Contactgegevens voor enhanced conversions. Los meegegeven, nooit opgeslagen. */
export type Contactgegevens = { email?: string; telefoon?: string };

/** Nederlands telefoonnummer naar E.164 (+31...) voor enhanced conversions. Leeg bij twijfel. */
export function telefoonE164(ruw?: string): string {
  if (!ruw) return "";
  let s = ruw.replace(/[^\d+]/g, "");
  if (s.startsWith("00")) s = "+" + s.slice(2);
  if (!s.startsWith("+")) s = s.startsWith("0") ? "+31" + s.slice(1) : "+31" + s;
  return s.length >= 11 && s.length <= 15 ? s : "";
}

/**
 * Ruwe contactgegevens naar het user_data-formaat van enhanced conversions.
 * gtag hasht de waarden zelf (SHA-256) vóór verzending; wij normaliseren alleen.
 * Alleen niet-lege, plausibele velden. Niets bruikbaars: null.
 */
function maakUserData(gegevens?: Contactgegevens): Record<string, string> | null {
  if (!gegevens) return null;
  const uit: Record<string, string> = {};
  const email = gegevens.email?.trim().toLowerCase();
  if (email && email.includes("@") && email.length >= 6) uit.email = email;
  const tel = telefoonE164(gegevens.telefoon);
  if (tel) uit.phone_number = tel;
  return Object.keys(uit).length ? uit : null;
}

/**
 * Meldt een conversie aan Google Ads. Veilig aan te roepen zonder tag, zonder
 * toestemming en tijdens server-rendering: dan gebeurt er niets. Dit is de
 * aanvulling, niet de basis. De basis is de klik-id in de leadmail.
 *
 * `gegevens` (e-mail/telefoon) zijn voor enhanced conversions: gtag hasht ze
 * client-side en stuurt ze alleen mee als de bezoeker toestemming gaf. Consent
 * Mode houdt ad_user_data anders op 'denied', dan verlaat er niets de browser.
 */
export function meldConversie(soort: Conversie, gegevens?: Contactgegevens) {
  if (typeof window === "undefined") return;
  try {
    window.dataLayer = window.dataLayer ?? [];
    // Altijd het losse event: ook zonder tag blijft de dataLayer bruikbaar.
    window.dataLayer.push({ event: EVENT_NAAM[soort] });

    if (typeof window.gtag !== "function") return;

    // GA4: het funnelmoment als event, zonder persoonsgegevens. generate_lead is
    // GA4's standaardconversie voor een lead; bel en contact als eigen event.
    if (GA4_AAN) {
      window.gtag("event", soort === "aanmelding" ? "generate_lead" : EVENT_NAAM[soort], {
        send_to: GA4_ID,
      });
    }

    // Ads: alleen met een geldige conversielabel.
    if (METING_AAN) {
      const label = LABELS[soort];
      if (label) {
        // Enhanced conversions: contactgegevens klaarzetten vóór het event. gtag
        // hasht ze zelf en stuurt ze alleen als ad_user_data 'granted' is.
        const userData = maakUserData(gegevens);
        if (userData) window.gtag("set", "user_data", userData);
        window.gtag("event", "conversion", {
          send_to: `${ADS_ID}/${label}`,
          value: WAARDE[soort],
          currency: "EUR",
        });
      }
    }
  } catch {
    // Stil falen. Een kapotte meting mag nooit een aanmelding blokkeren.
  }
}
