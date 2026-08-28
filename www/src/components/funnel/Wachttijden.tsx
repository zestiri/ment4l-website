"use client";

import { useSyncExternalStore } from "react";
import { WACHTTIJDEN, WACHTTIJDEN_BIJGEWERKT, WACHTTIJDEN_BIJGEWERKT_ISO } from "@/lib/funnel";

/**
 * Live-status van de wachttijden, direct in de funnel in plaats van een
 * doorverwijzing naar /wachttijden. De ouder wil weten of hij lang moet wachten;
 * dat antwoord hoort op de pagina zelf te staan, niet achter een klik.
 *
 * De widget degradeert EERLIJK. Een pulserende "live" stip boven een verouderde
 * datum is een leugen op de meest vertrouwensgevoelige plek van de funnel.
 * Daarom checkt hij in de browser hoe oud de datum is: tot tien dagen toont hij
 * de groene puls en "Nu geen wachtlijst"; daarna valt de puls weg en zegt hij
 * alleen nog "Geen wachtlijst", met de datum als eerlijke kanttekening.
 *
 * De vers-check draait client-side omdat alleen de browser de echte datum van nu
 * kent; een statisch gebouwde pagina zou anders de bouwdatum bevriezen. Server
 * rendert de veilige (niet-live) stand, de client zet de puls aan als het mag.
 *
 * LET OP: werk WACHTTIJDEN_BIJGEWERKT en _ISO wekelijks bij in lib/funnel.ts.
 */

const VERS_DAGEN = 10;

/** Is de datum vers genoeg om de status als "live" te presenteren? Client-side,
 *  want alleen de browser kent de echte datum van nu. */
function berekenVers(): boolean {
  const gezet = new Date(WACHTTIJDEN_BIJGEWERKT_ISO).getTime();
  if (Number.isNaN(gezet)) return false;
  const dagen = (Date.now() - gezet) / 86_400_000;
  return dagen >= 0 && dagen <= VERS_DAGEN;
}

export function Wachttijden() {
  const hoofd = WACHTTIJDEN.find((w) => w.traject === "Ambulante begeleiding jeugd");
  const overig = WACHTTIJDEN.filter((w) => w !== hoofd);

  // Server rendert de veilige, niet-live stand (false); de client bepaalt na
  // hydratie of de datum vers genoeg is. useSyncExternalStore houdt server en
  // client uit elkaar zonder setState-in-effect en zonder hydratie-mismatch.
  const vers = useSyncExternalStore(
    () => () => {},
    berekenVers,
    () => false,
  );

  return (
    <div className="mx-auto max-w-2xl rounded-3xl border border-black/[0.06] bg-mist p-5 shadow-[var(--shadow-framer-sm)] sm:p-6">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        {/* Status-indicator. De ping alleen als de datum vers is. */}
        <span aria-hidden className="relative flex h-2.5 w-2.5 shrink-0">
          {vers && (
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-good/60 motion-reduce:hidden" />
          )}
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-good" />
        </span>

        <div className="min-w-0 flex-1">
          <p className="text-[15px] font-semibold text-ink">
            {vers ? "Nu geen wachtlijst" : "Geen wachtlijst"}
          </p>
          <p className="mt-0.5 text-sm text-ink-soft">
            Ambulante begeleiding: de kennismaking plannen we binnen een week nadat de
            verwijzing rond is.
          </p>
        </div>

        <p className="w-full text-xs text-grey sm:w-auto sm:text-right">
          Bijgewerkt op <time dateTime={WACHTTIJDEN_BIJGEWERKT_ISO}>{WACHTTIJDEN_BIJGEWERKT}</time>
        </p>
      </div>

      {/* De overige trajecten blijven subtiel: dichtgeklapt, want deze funnel gaat
          over ambulante begeleiding. Wie meer wil weten, klapt hem uit. */}
      <details className="group mt-4 border-t border-hairline pt-3 [&_summary::-webkit-details-marker]:hidden">
        <summary className="flex min-h-11 cursor-pointer list-none items-center gap-1.5 text-sm font-medium text-brand-ink">
          Andere trajecten
          <svg
            aria-hidden
            viewBox="0 0 24 24"
            className="h-4 w-4 transition-transform duration-200 group-open:rotate-180 motion-reduce:transition-none"
            fill="none"
          >
            <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </summary>
        <ul className="mt-2 flex flex-col gap-2">
          {overig.map((w) => (
            <li key={w.traject} className="flex items-baseline gap-2.5 text-sm">
              <span aria-hidden className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-good" />
              <span className="text-ink">{w.traject}</span>
              <span className="ml-auto whitespace-nowrap text-ink-soft">{w.wachttijd}</span>
            </li>
          ))}
        </ul>
      </details>
    </div>
  );
}
