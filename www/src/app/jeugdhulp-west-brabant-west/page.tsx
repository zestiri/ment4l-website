import type { Metadata } from "next";
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
import { GEMEENTEN, VERWIJZERS } from "@/lib/funnel";

import { CheckBullet } from "@/components/site/IconBadge";
export const metadata: Metadata = {
  title: "Jeugdhulp in West-Brabant West",
  description:
    "Ambulante jeugdhulp in Bergen op Zoom, Roosendaal, Etten-Leur en de hele regio West-Brabant West. Geen wachtlijst, reactie binnen 4 uur, 24/7 bereikbaar.",
  alternates: { canonical: "/jeugdhulp-west-brabant-west" },
};

export default function HubPage() {
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
                <span className="eyebrow justify-center text-brand">Jeugdhulp · West-Brabant West</span>
                <h1 className="mt-4 text-[clamp(2.1rem,5vw,3.4rem)]">
                  Hulp voor je kind, zonder wachtlijst
                </h1>
                <p className="mx-auto mt-5 max-w-xl text-lg text-ink-soft">
                  Ambulante begeleiding en jeugdcoaching bij jullie thuis, op school of in de
                  wijk. Je hoort binnen 4 uur van ons — ook buiten kantooruren.
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

        {/* ── WAT KOST HET / VERWIJZING ───────────────────── */}
        <section className="mx-auto max-w-site px-6 py-20 sm:py-24">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <span className="eyebrow text-brand">Kosten en verwijzing</span>
              <h2 className="mt-3 text-[clamp(1.75rem,4vw,2.5rem)]">
                Jeugdhulp kost je niets
              </h2>
              <p className="mt-5 text-ink-soft">
                Jeugdhulp valt onder de Jeugdwet en wordt betaald door je gemeente. Er is
                <strong className="text-ink"> geen eigen bijdrage</strong> voor hulp aan je kind.
              </p>
              <p className="mt-4 text-ink-soft">
                Voor jeugdhulp is wel een verwijzing nodig. Heb je die nog niet? Meld je
                gerust alvast aan — we helpen je die te regelen.
              </p>
              <Link
                href="/verwijzing-huisarts"
                className="mt-6 inline-flex items-center gap-1.5 text-[15px] font-semibold text-brand hover:underline"
              >
                Zo werkt een verwijzing <ArrowRight className="h-4 w-4" strokeWidth={2} />
              </Link>
            </Reveal>

            <Reveal delay={0.06}>
              <div className="rounded-3xl bg-sand p-7">
                <h3 className="text-lg">Wie mag verwijzen?</h3>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {VERWIJZERS.map((v) => (
                    <li key={v} className="flex items-start gap-3 text-sm text-ink">
                      <CheckBullet className="mt-0.5" />
                      {v}
                    </li>
                  ))}
                </ul>
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
                Waar we bij kunnen helpen
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

        {/* ── GEMEENTEN ───────────────────────────────────── */}
        <section className="border-t border-hairline bg-mist">
          <div className="mx-auto max-w-site px-6 py-20 sm:py-24">
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <span className="eyebrow justify-center text-brand">Werkgebied</span>
                <h2 className="mt-3 text-[clamp(1.75rem,4vw,2.5rem)]">
                  Actief in negen gemeenten
                </h2>
                <p className="mt-4 text-ink-soft">
                  Woon je hier? Dan kunnen we direct starten zodra de verwijzing rond is.
                </p>
              </div>
            </Reveal>
            <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {GEMEENTEN.map((g, i) => (
                <Reveal key={g.slug} size="item" delay={(i % 3) * 0.04}>
                  <Link
                    href={`/jeugdhulp/${g.slug}`}
                    className="group flex h-full items-center justify-between gap-3 rounded-2xl border border-hairline bg-canvas p-5 transition-colors hover:border-ink/25"
                  >
                    <span>
                      <span className="block font-semibold text-ink">{g.naam}</span>
                      <span className="mt-0.5 block text-xs text-grey">{g.kernen.slice(0, 3).join(" · ")}</span>
                    </span>
                    <ArrowRight
                      className="h-4 w-4 shrink-0 text-grey transition-transform group-hover:translate-x-1"
                      strokeWidth={2}
                    />
                  </Link>
                </Reveal>
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
