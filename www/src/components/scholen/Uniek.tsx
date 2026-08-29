import Link from "next/link";
import { Reveal } from "./Reveal";
import { Slideshow, type Slide } from "./Slideshow";
import { Icon, type IconName } from "./Icon";
import { Doodle } from "./Doodle";

// Wat ons uniek maakt — auto-loop diashow: de reis van aanbod naar trots resultaat
const SLIDES: Slide[] = [
  { src: "/images/scholen/uniek-aanbod.png", alt: "Een ment4l jeugdcoach met een groepje kinderen tijdens een activiteit", caption: "Het aanbod" },
  { src: "/images/scholen/uniek-finale.png", alt: "Kinderen laten in de finale hun werk zien aan ouders en school", caption: "De finale" },
  { src: "/images/scholen/uniek-certificaat.png", alt: "Een trotse leerling laat het certificaat zien", caption: "Het resultaat" },
  { src: "/images/scholen/uniek-viering.png", alt: "Kinderen vieren samen het einde van een blok", caption: "Trots samen" },
];

const punten: { icon: IconName; titel: string; regel: string }[] = [
  { icon: "compass", titel: "Vaste jeugdcoach", regel: "Een vertrouwd gezicht bij elke les." },
  { icon: "steps", titel: "Eén duidelijke methode", regel: "Vast ritme, meestal 7 lessen per blok." },
  { icon: "mic", titel: "Echte finale", regel: "Laten zien aan ouders en school waar je aan werkte." },
  { icon: "sparkles", titel: "Echte vakdocent", regel: "Een expert in het thema geeft elke les." },
  { icon: "medal", titel: "Tastbaar resultaat", regel: "Eigen werk en een certificaat." },
  { icon: "scale", titel: "Voor ieder kind", regel: "Gericht op gelijke kansen." },
];

export function Uniek() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-24 sm:py-28">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <Reveal y={26} className="relative order-last lg:order-first">
          <Doodle
            name="snake"
            className="animate-bob absolute -right-2 -top-6 z-10 hidden h-9 w-24 text-coral sm:block"
            strokeWidth={2.2}
          />
          <Slideshow
            slides={SLIDES}
            interval={4500}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="aspect-[4/5] w-full shadow-[var(--shadow-lift)]"
          />
        </Reveal>

        <Reveal>
          <div>
            <span className="eyebrow text-brand">Waarom MENT4L</span>
            <h2 className="mt-3 text-[clamp(2rem,4.5vw,3.25rem)]">Wat ons uniek maakt</h2>
            <p className="mt-4 max-w-md text-ink-soft">
              Achter elk programma staan echte mensen die om kinderen geven.
            </p>

            <ul className="mt-7 divide-y divide-hairline border-y border-hairline">
              {punten.map((p) => (
                <li key={p.titel} className="flex items-start gap-4 py-4">
                  <Icon name={p.icon} className="mt-0.5 h-5 w-5 shrink-0 text-brand" strokeWidth={1.8} />
                  <div>
                    <h3 className="text-base">{p.titel}</h3>
                    <p className="text-sm text-grey">{p.regel}</p>
                  </div>
                </li>
              ))}
            </ul>

            <Link
              href="/scholen/professionals"
              className="mt-7 inline-flex items-center gap-2 rounded-pill border border-hairline px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-ink"
            >
              Meer over onze professionals
              <span aria-hidden>→</span>
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
