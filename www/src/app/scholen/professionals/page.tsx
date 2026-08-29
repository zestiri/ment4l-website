import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/scholen/Nav";
import { Footer } from "@/components/scholen/Footer";
import { Reveal } from "@/components/scholen/Reveal";
import { ScrollProgress } from "@/components/scholen/ScrollProgress";
import { Photo } from "@/components/scholen/Photo";
import { Icon, type IconName } from "@/components/scholen/Icon";
import { Doodle } from "@/components/scholen/Doodle";
import { CountUp } from "@/components/scholen/CountUp";
import { DOELEN, KENNISMAKING_URL } from "@/lib/programmas";

export const metadata: Metadata = {
  title: "Onze professionals",
  description:
    "De professionals achter MENT4L: een vast team van jeugdcoaches en vakdocenten met jarenlange ervaring in het sociaal domein. Veilig, vertrouwd en met een frisse kijk op jeugdbegeleiding.",
};

// Teamfoto (gegenereerd met nano-banana, uniform via referentie)
const GROEP_IMG: string | undefined = "/images/scholen/team.png";

const stats: { prefix?: string; to: number; suffix?: string; label: string }[] = [
  { to: 100, suffix: "%", label: "VOG gecheckt" },
  { to: 1, label: "vaste coach per blok" },
  { to: 4, label: "richtingen om uit te kiezen" },
  { prefix: "±", to: 7, label: "lessen per blok" },
];

const waarden: { icon: IconName; titel: string; tekst: string }[] = [
  {
    icon: "bolt",
    titel: "Sociale innovatie",
    tekst: "We durven anders te denken, vanuit de jongere en vanuit ons eigen vak.",
  },
  {
    icon: "compass",
    titel: "Praktisch en dichtbij",
    tekst: "Geen moeilijke woorden of ingewikkelde processen. Gewoon concrete hulp.",
  },
  {
    icon: "heart",
    titel: "Samen sterker",
    tekst: "We brengen culturen samen en geven elke jongere de ruimte om te groeien.",
  },
];

const veilig: { icon: IconName; titel: string; tekst: string }[] = [
  { icon: "medal", titel: "Gediplomeerd", tekst: "Coaches en vakdocenten met de juiste opleiding." },
  { icon: "shield", titel: "VOG verplicht", tekst: "Iedereen heeft een Verklaring Omtrent Gedrag." },
  { icon: "compass", titel: "Vaste gezichten", tekst: "Dezelfde begeleiding het hele blok." },
  { icon: "heart", titel: "Kleine groepen", tekst: "Genoeg aandacht voor elk kind." },
];

const cardHover =
  "group h-full rounded-3xl border border-hairline bg-canvas p-7 transition-all duration-300 hover:-translate-y-1.5 hover:border-brand/30 hover:shadow-[var(--shadow-lift)]";
const iconHover = "transition-transform duration-300 group-hover:scale-110";

export default function ProfessionalsPage() {
  return (
    <>
      <ScrollProgress />
      <Nav />
      <main>
        {/* ── HERO ─────────────────────────────────────── */}
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-brand/[0.06] to-transparent" />
          <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 pb-14 pt-32 sm:pt-36 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <Reveal>
                <Link
                  href="/scholen"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-grey transition-colors hover:text-ink"
                >
                  <span aria-hidden>←</span> Terug naar home
                </Link>
              </Reveal>
              <Reveal delay={0.05}>
                <span className="eyebrow mt-6 block text-brand">Onze professionals</span>
              </Reveal>
              <Reveal delay={0.1}>
                <h1 className="mt-3 text-[clamp(2.4rem,6vw,4.25rem)] leading-[1.02]">
                  De professionals achter MENT4L
                </h1>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
                  Achter elk programma staat een vast, divers team dat echt om
                  kinderen geeft, met jarenlange ervaring in het sociaal domein.
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <a
                  href={KENNISMAKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 inline-flex rounded-pill bg-brand px-7 py-3.5 text-[15px] font-semibold text-canvas shadow-[0_12px_26px_rgba(31,102,255,0.28)] transition-transform hover:-translate-y-0.5"
                >
                  Plan een kennismaking
                </a>
              </Reveal>
            </div>
            <Reveal delay={0.15} y={26} className="group relative">
              <Doodle
                name="sparkle"
                className="animate-twinkle absolute -left-3 -top-4 z-10 hidden h-6 w-6 text-coral sm:block"
              />
              <Photo
                src={GROEP_IMG}
                alt="Het team van MENT4L"
                accent="#1F66FF"
                icon={<Icon name="camera" className="h-11 w-11" strokeWidth={1.5} />}
                label="Groepsfoto volgt"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="aspect-[4/3] w-full shadow-[var(--shadow-lift)]"
              />
            </Reveal>
          </div>

          {/* ── STAT-BAND (animated) ─────────────────────── */}
          <div className="relative mx-auto max-w-6xl px-6 pb-16">
            <div className="grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-hairline bg-hairline sm:grid-cols-4">
              {stats.map((s, i) => (
                <Reveal key={s.label} delay={i * 0.07}>
                  <div className="h-full bg-canvas px-6 py-7 text-center sm:text-left">
                    <div className="font-serif text-[clamp(2.2rem,4vw,2.9rem)] font-bold leading-none text-brand">
                      {s.prefix}
                      <CountUp to={s.to} suffix={s.suffix} />
                    </div>
                    <div className="mt-2 text-sm leading-snug text-grey">{s.label}</div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── WIE WIJ ZIJN ─────────────────────────────── */}
        <section className="border-y border-hairline bg-mist">
          <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
            <Reveal>
              <span className="eyebrow text-brand">Wie wij zijn</span>
              <h2 className="mt-3 max-w-2xl text-[clamp(1.9rem,4vw,2.75rem)]">
                Een frisse kijk op jeugdbegeleiding
              </h2>
            </Reveal>
            <Reveal delay={0.05}>
              <div className="mt-6 max-w-2xl space-y-4 text-lg leading-relaxed text-ink-soft">
                <p>
                  Wij werken al jaren in het sociaal domein. Steeds zagen we
                  hetzelfde: het systeem is vaak te complex en te afstandelijk
                  voor wat jongeren echt nodig hebben.
                </p>
                <p>
                  Daarom begonnen we MENT4L. Praktische, toegankelijke hulp die
                  aansluit bij de leefwereld van jongeren, zodat elk kind de
                  ruimte krijgt om te groeien.
                </p>
              </div>
            </Reveal>

            <div className="mt-10 grid gap-5 sm:grid-cols-3">
              {waarden.map((w, i) => (
                <Reveal key={w.titel} delay={i * 0.08}>
                  <div className={cardHover}>
                    <span className="grid h-12 w-12 place-items-center rounded-2xl bg-brand/[0.08] text-brand">
                      <Icon name={w.icon} className={`h-6 w-6 ${iconHover}`} strokeWidth={1.7} />
                    </span>
                    <h3 className="mt-5 text-lg">{w.titel}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{w.tekst}</p>
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.1}>
              <a
                href="https://www.ment4l.nl/over-ons"
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-9 inline-flex items-center gap-2 text-sm font-semibold text-brand transition-colors hover:text-ink"
              >
                Lees ons hele verhaal op ment4l.nl
                <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
              </a>
            </Reveal>
          </div>
        </section>

        {/* ── VEILIG & VERTROUWD ───────────────────────── */}
        <section className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
          <Reveal>
            <span className="eyebrow text-brand">Veilig &amp; vertrouwd</span>
            <h2 className="mt-3 text-[clamp(1.9rem,4vw,2.75rem)]">Goed geregeld voor de school</h2>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {veilig.map((v, i) => (
              <Reveal key={v.titel} delay={i * 0.07}>
                <div className={cardHover}>
                  <span className="grid h-11 w-11 place-items-center rounded-2xl bg-brand/[0.08] text-brand">
                    <Icon name={v.icon} className={`h-5 w-5 ${iconHover}`} strokeWidth={1.7} />
                  </span>
                  <h3 className="mt-4 text-base">{v.titel}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-grey">{v.tekst}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── ONZE BELOFTE ─────────────────────────────── */}
        <section className="border-t border-hairline bg-mist">
          <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
            <Reveal>
              <span className="eyebrow text-brand">Onze belofte</span>
              <h2 className="mt-3 text-[clamp(1.9rem,4vw,2.75rem)]">Waar we voor gaan</h2>
            </Reveal>
            <div className="mt-10 grid gap-5 sm:grid-cols-3">
              {DOELEN.map((d, i) => (
                <Reveal key={d.titel} delay={i * 0.08}>
                  <div className={`${cardHover} flex flex-col`}>
                    <span className="font-mono text-xs font-bold uppercase tracking-[0.18em] text-brand">
                      0{i + 1}
                    </span>
                    <h3 className="mt-3 text-xl">{d.titel}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-soft">{d.tekst}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────── */}
        <section className="mx-auto max-w-6xl px-6 pb-28 pt-20">
          <Reveal>
            <div className="flex flex-col items-center gap-6 rounded-[36px] border border-hairline bg-cream px-8 py-14 text-center">
              <h2 className="max-w-xl text-[clamp(1.7rem,3.5vw,2.5rem)]">
                Maak kennis met ons team
              </h2>
              <div className="flex flex-wrap justify-center gap-3">
                <a
                  href={KENNISMAKING_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-pill bg-brand px-7 py-3.5 text-[15px] font-semibold text-canvas shadow-[0_12px_26px_rgba(31,102,255,0.28)] transition-transform hover:-translate-y-0.5"
                >
                  Plan een kennismaking
                </a>
                <Link
                  href="/scholen#aanbod"
                  className="rounded-pill border border-hairline px-7 py-3.5 text-[15px] font-semibold text-ink transition-colors hover:border-ink"
                >
                  Bekijk het aanbod
                </Link>
              </div>
            </div>
          </Reveal>
        </section>
      </main>
      <Footer />
    </>
  );
}
