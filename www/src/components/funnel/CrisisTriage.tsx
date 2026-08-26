import { CRISISNUMMERS } from "@/lib/funnel";

/**
 * Eerlijke triage bovenaan crisis-gerichte pagina's.
 * MENT4L is geen crisisdienst; bij acute onveiligheid horen de officiële,
 * gratis 24/7-nummers bovenaan te staan — náást ons eigen nummer.
 */
export function CrisisTriage() {
  return (
    <div className="rounded-2xl border border-hairline bg-stone/60 p-5">
      <h2 className="text-base">Is er direct gevaar?</h2>
      <p className="mt-1 text-sm text-ink-soft">
        Bel dan eerst een van deze nummers. Ze zijn gratis en 24 uur per dag bereikbaar.
      </p>
      <ul className="mt-4 flex flex-col gap-2">
        {CRISISNUMMERS.map((c) => (
          <li key={c.nummer} className="flex flex-wrap items-baseline gap-x-3 gap-y-1 text-sm">
            <a href={c.href} className="font-mono font-semibold text-ink hover:text-brand">
              {c.nummer}
            </a>
            <span className="text-ink-soft">{c.wanneer}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
