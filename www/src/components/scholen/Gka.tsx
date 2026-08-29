import { Reveal } from "./Reveal";
import { Icon, type IconName } from "./Icon";

const doelen: { icon: IconName; titel: string; tekst: string }[] = [
  { icon: "sprout", titel: "Talentontwikkeling", tekst: "Ieder kind ontdekt een talent, waar je ook vandaan komt." },
  { icon: "sparkles", titel: "Verrijkend aanbod", tekst: "Leuke, zinvolle activiteiten na schooltijd." },
  { icon: "heart", titel: "Sociaal-emotionele ontwikkeling", tekst: "Werken aan zelfvertrouwen en minder faalangst." },
  { icon: "medal", titel: "Tastbaar resultaat", tekst: "Elk kind eindigt met eigen werk en een certificaat." },
];

export function Gka() {
  return (
    <section id="scholen" className="mx-auto max-w-6xl px-6 py-24">
      <div className="overflow-hidden rounded-[36px] bg-charcoal px-8 py-14 text-canvas sm:px-14">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr]">
          <Reveal>
            <div>
              <span className="eyebrow text-brand-2">Voor de school</span>
              <h2 className="mt-3 text-[clamp(1.9rem,3.5vw,2.75rem)] text-white">
                Een leuk programma, helemaal geregeld
              </h2>
              <p className="mt-4 max-w-md text-white/70">
                Wij regelen de coaches, de vakdocenten en alles eromheen. Zo
                kunnen jullie je gewoon richten op de leerlingen.
              </p>
              <p className="mt-3 max-w-md text-sm text-white/45">
                Past binnen bestaande regelingen voor naschools aanbod.
              </p>
            </div>
          </Reveal>

          <div className="grid gap-px overflow-hidden rounded-3xl bg-white/10 sm:grid-cols-2">
            {doelen.map((d, i) => (
              <Reveal key={d.titel} delay={i * 0.06}>
                <div className="flex h-full gap-4 bg-charcoal-2 p-6">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/[0.08] text-brand-2">
                    <Icon name={d.icon} className="h-5 w-5" strokeWidth={1.7} />
                  </span>
                  <div>
                    <h3 className="text-base text-white">{d.titel}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-white/65">{d.tekst}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
