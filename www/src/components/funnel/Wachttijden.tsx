import { WACHTTIJDEN, WACHTTIJDEN_BIJGEWERKT } from "@/lib/funnel";

/**
 * Live-status van de wachttijden, direct in de funnel in plaats van een
 * doorverwijzing naar /wachttijden. De ouder wil weten of hij lang moet wachten;
 * dat antwoord hoort op de pagina zelf te staan, niet achter een klik.
 *
 * De groene stip met de zachte ping leest als "actuele status". Semantisch:
 * groen = beschikbaar. Bij prefers-reduced-motion valt de ping stil.
 *
 * LET OP: het datumstempel maakt van een evergreen claim een bederfelijke claim.
 * De data komt uit lib/funnel.ts (WACHTTIJDEN_BIJGEWERKT); werk die wekelijks bij,
 * anders staat hier een verouderde datum op de zichtbaarste plek van de funnel.
 */
export function Wachttijden() {
  const hoofd = WACHTTIJDEN.find((w) => w.traject === "Ambulante begeleiding jeugd");
  const overig = WACHTTIJDEN.filter((w) => w !== hoofd);

  return (
    <div className="mx-auto max-w-2xl rounded-3xl border border-black/[0.06] bg-mist p-5 shadow-[var(--shadow-framer-sm)] sm:p-6">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
        {/* Live-indicator */}
        <span aria-hidden className="relative flex h-2.5 w-2.5 shrink-0">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-good/60 motion-reduce:hidden" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-good" />
        </span>

        <div className="min-w-0 flex-1">
          <p className="text-[15px] font-semibold text-ink">Nu geen wachtlijst</p>
          <p className="mt-0.5 text-sm text-ink-soft">
            Ambulante begeleiding: de kennismaking plannen we binnen een week nadat de
            verwijzing rond is.
          </p>
        </div>

        <p className="w-full text-xs text-grey sm:w-auto sm:text-right">
          Bijgewerkt op <time>{WACHTTIJDEN_BIJGEWERKT}</time>
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
