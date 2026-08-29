import { Reveal } from "./Reveal";
import { KENNISMAKING_URL } from "@/lib/programmas";

export function Cta() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-6 pb-28">
      <Reveal>
        <div className="relative overflow-hidden rounded-[36px] border border-hairline bg-cream px-8 py-16 text-center sm:px-16">
          <div className="pointer-events-none absolute -right-16 -top-16 h-56 w-56 rounded-full bg-brand/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-10 h-56 w-56 rounded-full bg-coral/10 blur-3xl" />
          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-[clamp(1.9rem,4vw,3rem)]">
              Klaar voor een blok op jullie school?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-ink-soft">
              We denken graag mee over welk programma past bij jullie leerlingen.
              Eén kennismaking is genoeg om te starten.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href={KENNISMAKING_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-pill bg-brand px-7 py-3.5 text-[15px] font-semibold text-canvas shadow-[0_12px_26px_rgba(31,102,255,0.28)] transition-transform hover:-translate-y-0.5"
              >
                Plan een kennismaking
              </a>
              <a
                href="/scholen#aanbod"
                className="rounded-pill border border-hairline px-7 py-3.5 text-[15px] font-semibold text-ink transition-colors hover:border-ink"
              >
                Bekijk het aanbod
              </a>
            </div>
            <p className="eyebrow mt-8 text-grey">
              It&apos;s all about MENT4LITY
            </p>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
