import { Reveal } from "@/components/site/Reveal";
import { STAPPEN } from "@/lib/funnel";

/** "Wat er daarna gebeurt" — neemt de onzekerheid weg vóór de aanmelding. */
export function Stappen({ titel = "Wat er daarna gebeurt" }: { titel?: string }) {
  return (
    <div>
      <Reveal>
        <h2 className="text-[clamp(1.5rem,3vw,2rem)]">{titel}</h2>
      </Reveal>
      <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STAPPEN.map((s, i) => (
          <Reveal key={s.titel} size="item" delay={i * 0.05}>
            <li className="relative h-full rounded-2xl border border-hairline bg-canvas p-5">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-brand/10 font-sans text-sm font-semibold text-brand">
                {i + 1}
              </span>
              <h3 className="mt-3 text-base leading-snug">{s.titel}</h3>
              <p className="mt-1 text-sm leading-6 text-ink-soft">{s.tekst}</p>
            </li>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}
