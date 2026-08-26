import { Reveal } from "@/components/site/Reveal";
import { BEWIJS } from "@/lib/funnel";

/** Kernbewijs-strip: vier cijfers die op elke landingspagina terugkomen. */
export function Bewijs() {
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
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
