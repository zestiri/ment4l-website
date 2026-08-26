import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Mail, Clock, MapPin, ArrowRight } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { DarkPanel } from "@/components/site/DarkPanel";
import { Reveal } from "@/components/site/Reveal";
import { CONTACT, WBW_GEMEENTEN, TRAJECTEN } from "@/lib/site";
import { WACHTTIJDEN, WACHTTIJDEN_BIJGEWERKT } from "@/lib/funnel";

export const metadata: Metadata = {
  title: "Voor verwijzers",
  description:
    "Verwijs in twee minuten naar MENT4L. Gecontracteerd voor jeugdhulp in West-Brabant West, geen wachtlijst, 24/7 bereikbaar. Wij nemen binnen 4 uur contact op met het gezin.",
  alternates: { canonical: "/verwijzers" },
};

const FEITEN = [
  { Icon: MapPin, titel: "Werkgebied", tekst: "De 9 gemeenten van West-Brabant West" },
  { Icon: Clock, titel: "Reactietijd", tekst: "Binnen 4 uur contact met het gezin" },
  { Icon: Phone, titel: "Bereikbaar", tekst: "24/7, ook in het weekend" },
];

export default function VerwijzersPage() {
  return (
    <>
      <Nav />
      <main>
        {/* ── HERO ────────────────────────────────────────── */}
        <section className="mx-auto max-w-site px-6 pt-36 sm:pt-40">
          <Reveal>
            <div className="max-w-3xl">
              <span className="eyebrow text-brand">Voor professionals</span>
              <h1 className="mt-4 text-[clamp(2.1rem,5vw,3.25rem)]">
                Verwijs in twee minuten
              </h1>
              <p className="mt-5 text-lg text-ink-soft">
                Bel of stuur het gezinsplan. Wij nemen binnen 4 uur contact op met het gezin
                en houden je op de hoogte. Geen wachtlijst, ook niet bij spoed.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href={CONTACT.phoneHref}
                  className="inline-flex items-center gap-2 rounded-pill bg-brand px-7 py-3.5 text-[15px] font-semibold text-canvas transition-colors hover:bg-brand-2"
                >
                  <Phone className="h-4 w-4" strokeWidth={2} />
                  {CONTACT.phone}
                </a>
                <a
                  href={`mailto:${CONTACT.email}?subject=Verwijzing%20jeugdhulp`}
                  className="inline-flex items-center gap-2 rounded-pill border border-hairline px-7 py-3.5 text-[15px] font-semibold text-ink transition-colors hover:border-ink"
                >
                  <Mail className="h-4 w-4" strokeWidth={2} />
                  Stuur een verwijzing
                </a>
              </div>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-4 sm:grid-cols-3">
            {FEITEN.map((f, i) => (
              <Reveal key={f.titel} size="item" delay={i * 0.05}>
                <div className="h-full rounded-2xl border border-hairline bg-canvas p-5">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-brand/10 text-brand">
                    <f.Icon className="h-4 w-4" strokeWidth={2} />
                  </span>
                  <div className="mt-3 text-sm font-semibold text-ink">{f.titel}</div>
                  <p className="mt-0.5 text-sm text-ink-soft">{f.tekst}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── BESCHIKBAARHEID ─────────────────────────────── */}
        <section className="mx-auto max-w-site px-6 py-20 sm:py-24">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <Reveal>
              <span className="eyebrow text-brand">Beschikbaarheid</span>
              <h2 className="mt-3 text-[clamp(1.75rem,4vw,2.5rem)]">
                Wat je van ons kunt verwachten
              </h2>
              <p className="mt-5 text-ink-soft">
                We publiceren onze wachttijden wekelijks, zodat je bij het adviseren van een
                gezin niet hoeft te gokken of er plek is.
              </p>
              <p className="mt-4 text-ink-soft">
                Twijfel je of een casus bij ons past? Bel gerust even — we denken mee, ook
                als het uiteindelijk ergens anders thuishoort.
              </p>
              <Link
                href="/spoed"
                className="mt-6 inline-flex items-center gap-1.5 text-[15px] font-semibold text-brand hover:underline"
              >
                Spoed of dreigende uithuisplaatsing <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </Link>
            </Reveal>

            <Reveal delay={0.06}>
              <div className="overflow-hidden rounded-3xl border border-hairline bg-canvas">
                <table className="w-full text-left text-sm">
                  <caption className="sr-only">Wachttijd per traject</caption>
                  <thead>
                    <tr className="border-b border-hairline bg-mist">
                      <th scope="col" className="eyebrow px-5 py-3 text-grey">Traject</th>
                      <th scope="col" className="eyebrow px-5 py-3 text-grey">Wachttijd</th>
                    </tr>
                  </thead>
                  <tbody>
                    {WACHTTIJDEN.map((w) => (
                      <tr key={w.traject} className="border-b border-hairline last:border-b-0">
                        <td className="px-5 py-4 text-ink">{w.traject}</td>
                        <td className="px-5 py-4">
                          <span className="inline-flex whitespace-nowrap rounded-full bg-brand/10 px-2.5 py-0.5 text-xs font-semibold text-brand">
                            {w.wachttijd}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <p className="border-t border-hairline px-5 py-3 font-mono text-xs text-grey">
                  Bijgewerkt op {WACHTTIJDEN_BIJGEWERKT}
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── AANBOD + WERKGEBIED ─────────────────────────── */}
        <section className="border-y border-hairline bg-mist">
          <div className="mx-auto max-w-site px-6 py-20 sm:py-24">
            <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
              <Reveal>
                <h2 className="text-[clamp(1.5rem,3vw,2rem)]">Ons aanbod</h2>
                <ul className="mt-6 flex flex-col gap-3">
                  {TRAJECTEN.map((t) => (
                    <li key={t.slug}>
                      <Link
                        href={`/trajecten/${t.slug}`}
                        className="group flex items-center justify-between gap-3 rounded-2xl border border-hairline bg-canvas p-4 transition-colors hover:border-ink/25"
                      >
                        <span>
                          <span className="block font-semibold text-ink">{t.naam}</span>
                          <span className="mt-0.5 block text-sm text-ink-soft">{t.tagline}</span>
                        </span>
                        <ArrowRight
                          className="h-4 w-4 shrink-0 text-grey transition-transform group-hover:translate-x-1"
                          strokeWidth={2}
                        />
                      </Link>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={0.06}>
                <h2 className="text-[clamp(1.5rem,3vw,2rem)]">Werkgebied</h2>
                <p className="mt-4 text-ink-soft">
                  Gecontracteerd voor jeugdhulp onder de Jeugdwet in regio West-Brabant West:
                </p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {WBW_GEMEENTEN.map((g) => (
                    <span
                      key={g}
                      className="rounded-full border border-hairline bg-canvas px-4 py-2 text-sm text-ink"
                    >
                      {g}
                    </span>
                  ))}
                </div>
                <div className="mt-8 rounded-2xl bg-sand p-5 text-sm text-ink-soft">
                  <strong className="text-ink">Buiten deze gemeenten?</strong> Neem gerust
                  contact op. We kijken dan samen naar de mogelijkheden, bijvoorbeeld via een
                  pgb, of verwijzen je door naar een passende aanbieder.
                </div>
              </Reveal>
            </div>
          </div>
        </section>
      </main>
      <DarkPanel>
        <Footer />
      </DarkPanel>
    </>
  );
}
