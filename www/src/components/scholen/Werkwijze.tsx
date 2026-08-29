import { Reveal } from "./Reveal";
import { GroeiLoop } from "./GroeiLoop";
import { Icon } from "./Icon";

export function Werkwijze() {
  return (
    <section id="werkwijze" className="mx-auto max-w-6xl px-6 py-24 sm:py-28">
      <div className="grid items-center gap-14 lg:grid-cols-2">
        <Reveal>
          <div>
            {/* KOP-CLUSTER — luider geschaald, dan veel lucht eronder */}
            <span className="eyebrow text-brand">De MENT4L-aanpak</span>
            <h2 className="mt-3 text-[clamp(2.4rem,5.5vw,3.75rem)] leading-[1.02]">
              Groeien door te doen
            </h2>
            <p className="mt-5 max-w-sm text-ink-soft">
              Kinderen leren het meest door iets echts te maken. Ze doen het,
              kijken samen terug en groeien. Elke keer een stapje verder.
            </p>

            {/* HET GROOTBOEK — smalle ghost-index + brede tekstkolom langs één hairline-spine.
                Twee genummerde beats: 01 het middel (licht) → 02 het doel (charcoal-climax). */}
            <ol className="group/ledger mt-12 grid grid-cols-[auto_1fr] gap-x-5 sm:gap-x-7">
              {/* BEAT 01 — HET MIDDEL (licht, geen doos) */}
              <li className="contents">
                <span
                  aria-hidden="true"
                  className="min-w-[2.75rem] select-none font-serif text-[clamp(2.75rem,7vw,4.5rem)] font-bold leading-none text-grey-2/30"
                >
                  01
                </span>
                <div className="border-l border-hairline pl-5 sm:pl-7">
                  <h3 className="eyebrow font-medium text-grey">Het middel</h3>
                  <p className="mt-2 font-serif text-2xl leading-snug text-ink">
                    De activiteit: bakken, sporten, maken
                  </p>
                  {/* connector: richting-cue omlaag — rijmt op de tick-pijltjes in de ring rechts */}
                  <div className="mt-6 flex items-center gap-2 text-brand/50 transition-colors duration-[400ms] ease-[var(--ease-out)] group-hover/ledger:text-brand">
                    <Icon name="arrow" className="h-4 w-4 rotate-90" strokeWidth={1.7} />
                    <span className="eyebrow text-grey-2">naar het doel</span>
                  </div>
                </div>
              </li>

              {/* royale verticale sprong = witruimte als materiaal */}
              <li aria-hidden="true" className="col-span-2 h-10 sm:h-14" />

              {/* BEAT 02 — HET DOEL (de climax: het ENIGE charcoal-vlak) */}
              <li className="contents">
                <span
                  aria-hidden="true"
                  className="min-w-[2.75rem] select-none font-serif text-[clamp(2.75rem,7vw,4.5rem)] font-bold leading-none text-grey-2/30"
                >
                  02
                </span>
                <div className="texture rounded-2xl bg-charcoal p-6 text-canvas shadow-[var(--shadow-soft)] transition duration-[400ms] ease-[var(--ease-out)] hover:-translate-y-0.5 hover:shadow-[var(--shadow-lift)] sm:-mr-4 sm:p-7">
                  <h3 className="eyebrow font-medium text-brand-2">Het doel</h3>
                  <p className="mt-2 font-serif text-[clamp(1.6rem,3.5vw,2.25rem)] font-bold leading-tight text-white">
                    Zelfvertrouwen <span className="text-brand-2">&amp;</span> groei
                  </p>
                  {/* waarom het duo werkt — subtiel, als ondersteunende regel in het doel */}
                  <p className="mt-4 border-t border-white/15 pt-4 text-[13px] leading-relaxed text-canvas/70">
                    Het duo maakt het verschil: de jeugdcoach vangt signalen op, zoals
                    faalangst of juist talent, en sluit daar met gerichte begeleiding op aan.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <GroeiLoop />
        </Reveal>
      </div>
    </section>
  );
}
