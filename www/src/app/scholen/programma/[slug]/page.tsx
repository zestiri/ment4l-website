import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav } from "@/components/scholen/Nav";
import { Footer } from "@/components/scholen/Footer";
import { Reveal } from "@/components/scholen/Reveal";
import { ScrollProgress } from "@/components/scholen/ScrollProgress";
import { Icon, type IconName } from "@/components/scholen/Icon";
import { Doodle } from "@/components/scholen/Doodle";
import { Leeftijd } from "@/components/scholen/Leeftijd";
import { Photo } from "@/components/scholen/Photo";
import { BlokReis } from "@/components/scholen/BlokReis";
import { CATEGORIEEN, RUGGENGRAAT, KENNISMAKING_URL, getCategorie } from "@/lib/programmas";

export const dynamicParams = false;

export function generateStaticParams() {
  return CATEGORIEEN.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const c = getCategorie(slug);
  if (!c) return { title: "Niet gevonden" };
  return { title: c.naam, description: c.kort };
}

export default async function CategoriePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const c = getCategorie(slug);
  if (!c) notFound();

  const anderen = CATEGORIEEN.filter((x) => x.slug !== c.slug);
  const ages = c.themas.flatMap((t) => (t.leeftijd.match(/\d+/g) ?? []).map(Number));
  const leeftijdRange = `${Math.min(...ages)}-${Math.max(...ages)} jaar`;

  return (
    <>
      <ScrollProgress />
      <Nav />
      <main>
        {/* ── HERO ─────────────────────────────────────── */}
        <section className="relative overflow-hidden border-b border-hairline">
          <div
            className="pointer-events-none absolute inset-0"
            style={{ background: `linear-gradient(180deg, ${c.accent}10, transparent 55%)` }}
          />
          <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-6 pb-16 pt-32 sm:pt-36 lg:grid-cols-[1.05fr_0.95fr]">
            <div>
              <Reveal>
                <Link
                  href="/scholen#aanbod"
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-grey transition-colors hover:text-ink"
                >
                  <span aria-hidden>←</span> Alle richtingen
                </Link>
              </Reveal>
              <Reveal delay={0.05}>
                <div className="mt-6 flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: c.accent }} />
                  <span className="eyebrow" style={{ color: c.accent }}>
                    Categorie · 4 thema&apos;s
                  </span>
                </div>
              </Reveal>
              <Reveal delay={0.1}>
                <h1 className="mt-4 text-[clamp(2.4rem,6vw,4.25rem)] leading-[1.02]">
                  {c.naam}
                </h1>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-soft">
                  {c.kort}
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <div className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm">
                  <span className="inline-flex items-center gap-2">
                    <span style={{ color: c.accent }}>
                      <Icon name={c.iconName as IconName} className="h-[18px] w-[18px]" strokeWidth={1.8} />
                    </span>
                    <span className="font-semibold text-ink">4 thema&apos;s</span>
                  </span>
                  <span className="h-4 w-px bg-hairline" />
                  <span className="inline-flex items-center gap-2">
                    <span style={{ color: c.accent }}>
                      <Icon name="steps" className="h-[18px] w-[18px]" strokeWidth={1.8} />
                    </span>
                    <span className="text-ink-soft">± 7 lessen per blok</span>
                  </span>
                  <span className="h-4 w-px bg-hairline" />
                  <span className="inline-flex items-center gap-2">
                    <span style={{ color: c.accent }}>
                      <Icon name="flag" className="h-[18px] w-[18px]" strokeWidth={1.8} />
                    </span>
                    <span className="text-ink-soft">finale met certificaat</span>
                  </span>
                </div>
              </Reveal>
              <Reveal delay={0.25}>
                <div className="mt-5 flex flex-wrap items-center gap-2">
                  <span className="text-sm text-grey">Geschikt voor:</span>
                  <Leeftijd leeftijd={leeftijdRange} />
                </div>
              </Reveal>
              <Reveal delay={0.3}>
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
                className="animate-twinkle absolute -left-3 -top-4 z-10 hidden h-6 w-6 sm:block"
                style={{ color: c.accent }}
              />
              <Photo
                src={c.image}
                alt={`Kinderen tijdens ${c.naam}`}
                accent={c.accent}
                icon={<Icon name={c.iconName as IconName} className="h-11 w-11" strokeWidth={1.5} />}
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="aspect-[4/3] w-full shadow-[var(--shadow-lift)]"
              />
              <span
                className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-canvas/90 shadow-[var(--shadow-soft)] ring-1 ring-black/[0.04] backdrop-blur-md"
                style={{ color: c.accent }}
              >
                <Icon name={c.iconName as IconName} className="h-5 w-5" strokeWidth={1.8} />
              </span>
            </Reveal>
          </div>
        </section>

        {/* ── KIES JE THEMA ────────────────────────────── */}
        <section className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
          <Reveal>
            <span className="eyebrow text-brand">Kies je thema</span>
            <h2 className="mt-3 text-[clamp(1.9rem,4vw,2.75rem)]">Vier thema&apos;s</h2>
            <p className="mt-4 max-w-xl text-ink-soft">
              Elk thema volgt dezelfde methode. De meeste zijn geschikt voor alle
              leeftijden die we begeleiden, sommige zijn wat ouder. Kies wat past
              bij de groep.
            </p>
          </Reveal>

          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {c.themas.map((t, i) => (
              <Reveal key={t.naam} delay={i * 0.06}>
                <article className="group flex h-full flex-col overflow-hidden rounded-3xl border border-hairline bg-canvas transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]">
                  <div className="relative">
                    <Photo
                      src={t.image}
                      alt={`Kinderen tijdens ${t.naam}`}
                      accent={c.accent}
                      icon={<Icon name={c.iconName as IconName} className="h-8 w-8" strokeWidth={1.6} />}
                      rounded="rounded-none"
                      sizes="(max-width: 640px) 100vw, 25vw"
                      className="aspect-square w-full"
                    />
                    <span
                      className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"
                      style={{ backgroundColor: c.accent }}
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <div className="flex items-center gap-2">
                      <span className="h-2 w-2 rounded-full" style={{ backgroundColor: c.accent }} />
                      <h3 className="text-lg">{t.naam}</h3>
                    </div>
                    <p className="mt-1.5 text-sm leading-relaxed text-ink-soft">{t.kort}</p>
                    <Leeftijd leeftijd={t.leeftijd} className="mt-3 self-start" />
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── ZO WERKT EEN BLOK ────────────────────────── */}
        <section className="border-y border-hairline bg-mist">
          <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
            <Reveal>
              <span className="eyebrow text-brand">Zo werkt een blok</span>
              <h2 className="mt-3 text-[clamp(1.9rem,4vw,2.75rem)]">
                Van kennismaken tot finale
              </h2>
              <p className="mt-4 max-w-xl text-ink-soft">
                Een blok is meestal zeven lessen die op elkaar voortbouwen. Het
                aantal stemmen we af met de school. Elke les iets nieuws, met de
                jeugdcoach erbij.
              </p>
            </Reveal>

            <BlokReis steps={RUGGENGRAAT} accent={c.accent} />
          </div>
        </section>

        {/* ── EINDMOMENT ───────────────────────────────── */}
        <section className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
          <Reveal>
            <div className="relative overflow-hidden rounded-[36px] bg-charcoal p-8 text-canvas sm:p-12">
              <div
                className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full blur-3xl"
                style={{ backgroundColor: `${c.accent}40` }}
              />
              <div className="relative grid items-center gap-10 lg:grid-cols-2">
                <div>
                  <span className="eyebrow" style={{ color: c.accent }}>
                    De finale
                  </span>
                  <h2 className="mt-3 text-[clamp(1.9rem,4vw,3rem)] text-white">
                    {c.eindmoment.naam}
                  </h2>
                  <p className="mt-4 max-w-2xl text-white/70">{c.eindmoment.tekst}</p>
                  <p className="mt-6 text-sm text-white/55">
                    Leerlingen laten aan ouders en school zien waar ze aan
                    werkten, en eindigen met eigen werk en een certificaat.
                  </p>
                </div>
                <Photo
                  src={`/images/scholen/eindmoment-${c.slug}.png`}
                  alt={`${c.eindmoment.naam}: het eindmoment van ${c.naam}`}
                  accent={c.accent}
                  icon={<Icon name="camera" className="h-10 w-10" strokeWidth={1.5} />}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="aspect-video w-full shadow-[var(--shadow-lift)]"
                />
              </div>
            </div>
          </Reveal>
        </section>

        {/* ── ANDERE RICHTINGEN ────────────────────────── */}
        <section className="mx-auto max-w-6xl px-6 pb-8">
          <Reveal>
            <h2 className="text-2xl">Andere richtingen</h2>
          </Reveal>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {anderen.map((a, i) => (
              <Reveal key={a.slug} delay={i * 0.06}>
                <Link
                  href={`/scholen/programma/${a.slug}`}
                  className="group flex items-center gap-3 rounded-3xl border border-hairline bg-canvas p-5 transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-soft)]"
                >
                  <span
                    className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl"
                    style={{ backgroundColor: `${a.accent}1A`, color: a.accent }}
                  >
                    <Icon name={a.iconName as IconName} className="h-6 w-6" strokeWidth={1.7} />
                  </span>
                  <span className="flex-1 font-serif text-lg leading-tight">{a.naam}</span>
                  <span className="text-grey transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── CTA ──────────────────────────────────────── */}
        <section className="mx-auto max-w-6xl px-6 pb-28 pt-12">
          <Reveal>
            <div className="flex flex-col items-center gap-6 rounded-[36px] border border-hairline bg-cream px-8 py-14 text-center">
              <h2 className="max-w-xl text-[clamp(1.7rem,3.5vw,2.5rem)]">
                {c.naam} op jullie school?
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
                  Alle richtingen
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
