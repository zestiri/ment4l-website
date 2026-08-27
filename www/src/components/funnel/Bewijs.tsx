import { Reveal } from "@/components/site/Reveal";
import { BEWIJS } from "@/lib/funnel";

/**
 * Kernbewijs-strip: de cijfers die op elke landingspagina terugkomen.
 * Waren er vier; "1000+ jongeren begeleid" is eruit omdat die claim niet houdbaar
 * is naast een KVK-inschrijving van 12-02-2026 met twee werknemers.
 */
export function Bewijs() {
  return (
    <div className="grid gap-3 sm:grid-cols-3">
      {BEWIJS.map((b, i) => (
        <Reveal key={b.label} size="item" delay={i * 0.04}>
          <div className="h-full rounded-2xl border border-hairline bg-canvas p-5">
            <div className="font-sans text-[32px] font-medium leading-none tracking-[-0.02em] text-ink">
              {b.waarde}
            </div>
            <p className="mt-2 text-sm leading-6 text-ink-soft">{b.label}</p>
          </div>
        </Reveal>
      ))}
    </div>
  );
}
