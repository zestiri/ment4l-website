import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { DarkPanel } from "@/components/site/DarkPanel";
import { Reveal } from "@/components/site/Reveal";
import { FaqSection } from "@/components/site/FaqSection";
import { Bewijs } from "@/components/funnel/Bewijs";
import { Stappen } from "@/components/funnel/Stappen";
import { CONTACT, AANMELD_URL, TRAJECTEN } from "@/lib/site";
import { GEMEENTEN, getGemeente, WACHTTIJDEN_BIJGEWERKT } from "@/lib/funnel";

export const dynamicParams = false;

export function generateStaticParams() {
  return GEMEENTEN.map((g) => ({ gemeente: g.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ gemeente: string }>;
}): Promise<Metadata> {
  const { gemeente } = await params;
  const g = getGemeente(gemeente);
  if (!g) return { title: "Niet gevonden" };
  return {
    title: `Jeugdhulp in ${g.naam}`,
    description: `Ambulante jeugdhulp en jeugdcoaching in ${g.naam}. Geen wachtlijst, reactie binnen 4 uur, 24/7 bereikbaar. MENT4L is gecontracteerd in ${g.naam}.`,
    alternates: { canonical: `/jeugdhulp/${g.slug}` },
  };
}

export default async function GemeentePage({
  params,
}: {
  params: Promise<{ gemeente: string }>;
}) {
  const { gemeente } = await params;
  const g = getGemeente(gemeente);
  if (!g) notFound();

  const anderen = GEMEENTEN.filter((x) => x.slug !== g.slug);

  return (
    <>
      <Nav />
      <main>
        {/* ── HERO ────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-mist pt-8">
          <div className="tex-diagonal pointer-events-none absolute inset-0" aria-hidden />
          <div className="relative mx-auto w-full max-w-[1100px] rounded-t-[32px] bg-canvas">
            <div className="px-6 pb-16 pt-24 sm:pt-28">
              <div className="mx-auto max-w-3xl text-center">
                <span className="eyebrow justify-center text-brand">Jeugdhulp · {g.naam}</span>
                <h1 className="mt-4 text-[clamp(2rem,4.8vw,3.1rem)]">
                  Jeugdhulp in {g.naam}, zonder wachtlijst
                </h1>
                <p className="mx-auto mt-5 max-w-xl text-lg text-ink-soft">
                  Ambulante begeleiding en jeugdcoaching bij jullie thuis, op school of in de
                  wijk — in {g.kernen.slice(0, 3).join(", ")} en de rest van de gemeente. Je
                  hoort binnen 4 uur van ons.
                </p>
                <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                  <Link
                    href={AANMELD_URL}
                    className="rounded-pill bg-brand px-7 py-3.5 text-[15px] font-semibold text-canvas transition-colors hover:bg-brand-2"
                  >
                    Bel mij binnen 4 uur
                  </Link>
                  <a
                    href={CONTACT.phoneHref}
                    className="inline-flex items-center gap-2 rounded-pill border border-hairline px-7 py-3.5 text-[15px] font-semibold text-ink transition-colors hover:border-ink"
                  >
                    <Phone className="h-4 w-4" strokeWidth={2} />
                    {CONTACT.phone}
                  </a>
                </div>
              </div>
              <div className="mt-14">
                <Bewijs />
              </div>
            </div>
          </div>
        </section>

        {/* ── LOKAAL ──────────────────────────────────────── */}
        <section className="mx-auto max-w-site px-6 py-20 sm:py-24">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <span className="eyebrow text-brand">Werkgebied</span>
              <h2 className="mt-3 text-[clamp(1.75rem,4vw,2.5rem)]">
                Wij komen naar {g.naam} toe
              </h2>
              <p className="mt-5 text-ink-soft">
                Ambulante hulp betekent dat wij komen, niet dat jullie moeten reizen. Onze
                jeugdcoaches werken in {g.kernen.join(", ")} — thuis, op school of ergens
                waar je kind zich prettig voelt.
              </p>
              <p className="mt-4 text-ink-soft">
                MENT4L is gecontracteerd voor jeugdhulp onder de Jeugdwet in {g.naam}. De
                gemeente betaalt; er is <strong className="text-ink">geen eigen bijdrage</strong>.
              </p>
              <Link
                href="/wachttijden"
                className="mt-6 inline-flex items-center gap-1.5 text-[15px] font-semibold text-brand hover:underline"
              >
                Bekijk onze actuele wachttijden <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </Link>
            </Reveal>

            <Reveal delay={0.06}>
              <div className="rounded-3xl bg-sand p-7">
                <h3 className="text-lg">Wachttijd in {g.naam}</h3>
                <div className="mt-4 flex items-baseline gap-3">
                  <span className="font-sans text-[42px] font-medium leading-none tracking-[-0.02em] text-ink">
                    Geen
                  </span>
                  <span className="text-ink-soft">wachtlijst</span>
                </div>
                <p className="mt-4 text-sm text-ink-soft">
                  We plannen de kennismaking binnen een week. Bij spoed schakelen we
                  vrijwel direct — dan kun je ons het beste bellen.
                </p>
                <p className="mt-4 font-mono text-xs text-grey">
                  Bijgewerkt op {WACHTTIJDEN_BIJGEWERKT}
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── STAPPEN ─────────────────────────────────────── */}
        <section className="border-y border-hairline bg-mist">
          <div className="mx-auto max-w-site px-6 py-20 sm:py-24">
            <Stappen />
          </div>
        </section>

        {/* ── TRAJECTEN ───────────────────────────────────── */}
        <section className="mx-auto max-w-site px-6 py-20 sm:py-24">
          <Reveal>
            <div className="text-center">
              <span className="eyebrow justify-center text-brand">Onze trajecten</span>
              <h2 className="mt-3 text-[clamp(1.75rem,4vw,2.5rem)]">
                Waar we in {g.naam} bij helpen
              </h2>
            </div>
          </Reveal>
          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {TRAJECTEN.map((t, i) => (
              <Reveal key={t.slug} size="item" delay={i * 0.05}>
                <Link
                  href={`/trajecten/${t.slug}`}
                  className="group relative flex aspect-[16/11] flex-col justify-end overflow-hidden rounded-3xl"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={t.image} alt={t.naam} className="absolute inset-0 h-full w-full object-cover" />
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(51,54,81,0)_51%,rgb(163,162,160)_103%)]" />
                  <div className="relative p-5">
                    <h3 className="font-sans text-[22px] font-bold leading-[30px] tracking-[-0.02em] text-white">
                      {t.naam}
                    </h3>
                    <p className="mt-1.5 text-sm text-white/90">{t.tagline}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── ANDERE GEMEENTEN ────────────────────────────── */}
        <section className="border-t border-hairline bg-mist">
          <div className="mx-auto max-w-site px-6 py-16">
            <Reveal>
              <h2 className="text-xl">Ook actief in</h2>
            </Reveal>
            <div className="mt-6 flex flex-wrap gap-2">
              {anderen.map((a) => (
                <Link
                  key={a.slug}
                  href={`/jeugdhulp/${a.slug}`}
                  className="rounded-full border border-hairline bg-canvas px-4 py-2 text-sm text-ink transition-colors hover:border-ink/25"
                >
                  {a.naam}
                </Link>
              ))}
            </div>
          </div>
        </section>

        <FaqSection />
      </main>
      <DarkPanel>
        <Footer />
      </DarkPanel>
    </>
  );
}
