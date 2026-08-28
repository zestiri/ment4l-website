"use client";

import { useEffect, useSyncExternalStore } from "react";
import { motion, useReducedMotion } from "motion/react";
import { TAG_AAN, meldConversie } from "@/lib/conversie";
import { CONTACT } from "@/lib/site";

/**
 * De optionele Google Ads-tag en de toestemming die daarbij hoort.
 *
 * Dit is NIET de primaire meting. Die loopt via de klik-id in `KlikId.tsx` en
 * `lib/conversie.ts`, werkt zonder opslag en dus zonder toestemming. Dit
 * component is de aanvulling voor als er ooit genoeg volume is om een browsertag
 * te rechtvaardigen. Zolang NEXT_PUBLIC_GOOGLE_ADS_ID leeg is, laadt hier niets,
 * staat er geen cookie en verschijnt er geen balk.
 *
 * Waarom balk en tag in één component zitten: de balk bestaat alleen omdát de
 * tag cookies zet. Uit elkaar trekken levert gegarandeerd een keer een balk
 * zonder tag op, of erger, een tag zonder balk.
 *
 * Wat hier gebeurt:
 *  1. Bel-kliks melden, overal op de site, via één gedelegeerde listener.
 *  2. Toestemming vragen zodra de tag aanstaat, met Consent Mode v2.
 */

const KEUZE_SLEUTEL = "m4l_consent";
type Keuze = "granted" | "denied";
type Stand = Keuze | "onbekend";

function leesKeuze(): Stand {
  try {
    const k = localStorage.getItem(KEUZE_SLEUTEL);
    return k === "granted" || k === "denied" ? k : "onbekend";
  } catch {
    // Private mode of geblokkeerde opslag: dan vragen we het opnieuw.
    return "onbekend";
  }
}

// ── Kleine externe store rond localStorage ─────────────────────────────
// De keuze leeft buiten React. useSyncExternalStore is daar de juiste vorm
// voor: geen setState in een effect (dat geeft cascaderende renders) en geen
// verschil tussen server- en client-render. Een `storage`-event vuurt niet in
// het eigen tabblad, dus we melden zelf wanneer de keuze verandert.
let luisteraars: Array<() => void> = [];

function abonneer(melden: () => void) {
  luisteraars.push(melden);
  return () => {
    luisteraars = luisteraars.filter((l) => l !== melden);
  };
}

function meldWijziging() {
  for (const l of luisteraars) l();
}

/** Op de server weten we niets van localStorage, dus altijd "onbekend". */
const standOpServer = (): Stand => "onbekend";

/**
 * Zet de toestemming door naar Google en bewaart de klik-id als het mag.
 * Staat bewust buiten de component: hij gebruikt geen state en hoeft dus niet
 * bij elke render opnieuw gemaakt te worden.
 */
function pasToe(k: Keuze) {
  try {
    window.gtag?.("consent", "update", {
      ad_storage: k,
      ad_user_data: k,
      ad_personalization: k,
      analytics_storage: k,
    });
  } catch {
    // Tag nog niet geladen: de defaults uit de head blijven staan, dus geweigerd.
  }
}

/**
 * Legt de keuze vast. Stuurt zelf niets naar Google: dat doet het effect
 * hieronder zodra de store de nieuwe stand meldt. Zo is er één plek waar de
 * toestemming doorgezet wordt, in plaats van twee die uit de pas kunnen lopen.
 */
function kies(k: Keuze) {
  try {
    localStorage.setItem(KEUZE_SLEUTEL, k);
  } catch {
    // Niet kunnen opslaan betekent alleen dat we het opnieuw vragen.
  }
  meldWijziging();
}

export function Meting() {
  const reduce = useReducedMotion();
  const stand = useSyncExternalStore(abonneer, leesKeuze, standOpServer);

  // ── Bel-kliks ────────────────────────────────────────────────────────
  // Eén listener op document in plaats van een onClick op elke belknop. Er
  // staan telefoonlinks in de nav, de footer, de belbalk, het aanmeldformulier
  // en op acht funnelpagina's; die stuk voor stuk aanpassen is vragen om er
  // volgend jaar een te vergeten.
  //
  // BEWUST alleen ons EIGEN nummer, niet elke tel-link. Mocht er ergens toch een
  // ander telefoonnummer op de site staan (bijvoorbeeld een landelijke hulplijn),
  // dan is een klik daarop geen advertentieconversie van 120 euro. We tellen
  // alleen een belletje naar MENT4L zelf.
  useEffect(() => {
    function opKlik(e: MouseEvent) {
      const doel = e.target as HTMLElement | null;
      const link = doel?.closest?.<HTMLAnchorElement>('a[href^="tel:"]');
      if (link && link.getAttribute("href") === CONTACT.phoneHref) meldConversie("telefoon");
    }
    document.addEventListener("click", opKlik, true);
    return () => document.removeEventListener("click", opKlik, true);
  }, []);

  // ── De keuze doorzetten naar Google ──────────────────────────────────
  // Dit is de enige plek die `consent update` stuurt: zowel meteen na de klik
  // als bij elk volgend paginabezoek. De tag start namelijk altijd op "denied",
  // dus zonder dit zou een bezoeker die vorige week ja zei vandaag alsnog als
  // geweigerd binnenkomen. Ook een expliciete "denied" sturen we door, zodat
  // Google weet dat er echt gekozen is en niet alleen de default geldt.
  useEffect(() => {
    if (TAG_AAN && stand !== "onbekend") pasToe(stand);
  }, [stand]);

  // Geen tag, geen balk. Dit is de normale toestand tot een meet-id gezet wordt.
  if (!TAG_AAN || stand !== "onbekend") return null;

  return (
    <motion.div
      role="dialog"
      aria-label="Cookies voor advertentiemeting"
      initial={reduce ? false : { opacity: 0, y: 24 }}
      animate={reduce ? undefined : { opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 320, damping: 34 }}
      className="fixed inset-x-3 bottom-3 z-50 sm:inset-x-auto sm:bottom-4 sm:left-4 sm:max-w-[26rem]"
    >
      <div className="rounded-3xl border border-hairline bg-canvas p-5 shadow-lift">
        <p className="text-[15px] font-semibold text-ink">Mogen we meten hoe onze site gebruikt wordt?</p>
        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          Met een cookie van Google zien we welke pagina&rsquo;s mensen bekijken en of onze
          advertenties werken. We koppelen dat nooit aan wie je bent en gebruiken het nergens
          anders voor. Zeg je nee, dan werkt de site precies hetzelfde.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => kies("granted")}
            className="min-h-11 rounded-pill bg-brand px-5 py-2.5 text-sm font-semibold text-canvas transition-colors hover:bg-brand-2"
          >
            Prima
          </button>
          <button
            type="button"
            onClick={() => kies("denied")}
            className="min-h-11 rounded-pill border border-hairline px-5 py-2.5 text-sm font-semibold text-ink transition-colors hover:border-ink"
          >
            Liever niet
          </button>
        </div>
      </div>
    </motion.div>
  );
}
