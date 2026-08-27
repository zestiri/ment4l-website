import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Clock, Home, Users, ArrowRight } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { DarkPanel } from "@/components/site/DarkPanel";
import { Reveal } from "@/components/site/Reveal";
import { BelBalk } from "@/components/funnel/BelBalk";
import { CrisisTriage } from "@/components/funnel/CrisisTriage";
import { CONTACT, AANMELD_URL, WBW_GEMEENTEN } from "@/lib/site";

import { IconBadge } from "@/components/site/IconBadge";
export const metadata: Metadata = {
  title: "Ambulante spoedhulp",
  description:
    "Crisis in het gezin? MENT4L biedt ambulante spoedhulp in West-Brabant West. 24/7 bereikbaar, we schakelen vrijwel direct. Bel 085 130 7522.",
  alternates: { canonical: "/spoed" },
};

const EERSTE_24_UUR = [
  { Icon: Phone, titel: "Je belt, wij nemen op", tekst: "Ook 's nachts en in het weekend. We horen wat er speelt en bepalen samen wat er nu nodig is." },
  { Icon: Clock, titel: "Snel een plan", tekst: "We overleggen direct met jou en, waar nodig, met de verwijzer of het wijkteam." },
  { Icon: Home, titel: "We komen naar jullie toe", tekst: "Ambulante spoedhulp betekent hulp thuis, in de eigen omgeving van het gezin." },
  { Icon: Users, titel: "Het hele gezin", tekst: "Een crisis raakt iedereen. We begeleiden niet alleen het kind, maar het gezin als geheel." },
];

export default function SpoedPage() {
  return (
    <>
      <Nav />
      <main>
        {/* ── HERO: bellen is de enige primaire actie ─────── */}
        <section className="relative overflow-hidden bg-charcoal text-canvas">
          <div aria-hidden className="tex-grain pointer-events-none absolute inset-0" />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 h-[380px] bg-[radial-gradient(50%_100%_at_50%_0%,rgba(255,255,255,0.16),rgba(255,255,255,0))]"
          />
          <div className="relative mx-auto max-w-site px-6 pb-16 pt-36 sm:pt-40">
            <div className="mx-auto max-w-2xl text-center">
              <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.06] px-3.5 py-1.5 text-sm text-white/90">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-coral-2/70" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-coral-2" />
                </span>
                24/7 bereikbaar
              </span>
              <h1 className="mt-6 text-[clamp(2.1rem,5vw,3.25rem)] text-white">
                Crisis in het gezin? Bel ons nu.
              </h1>
              <p className="mt-5 text-lg text-white/70">
                Ambulante spoedhulp in West-Brabant West. We schakelen vrijwel direct,
                ook &rsquo;s avonds, in het weekend en op feestdagen.
              </p>

              <a
                href={CONTACT.phoneHref}
                className="mt-9 inline-flex items-center gap-3 rounded-pill bg-brand px-8 py-4 text-lg font-semibold text-canvas transition-colors hover:bg-brand-2"
              >
                <Phone className="h-5 w-5" strokeWidth={2.2} />
                {CONTACT.phone}
              </a>
              <p className="mt-4 text-sm text-white/55">
                Liever eerst schrijven?{" "}
                <Link href={AANMELD_URL} className="underline hover:text-white">
                  Meld je aan
                </Link>
                , dan bellen we binnen 4 uur terug.
              </p>
            </div>
          </div>
        </section>

        {/* ── TRIAGE: eerlijk doorverwijzen bij acuut gevaar ── */}
        <section className="mx-auto max-w-site px-6 py-14">
          <div className="mx-auto max-w-2xl">
            <CrisisTriage />
          </div>
        </section>

        {/* ── WAT ER GEBEURT ──────────────────────────────── */}
        <section className="border-y border-hairline bg-mist">
          <div className="mx-auto max-w-site px-6 py-20 sm:py-24">
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <span className="eyebrow text-brand">Ambulante spoedhulp</span>
                <h2 className="mt-3 text-[clamp(1.75rem,4vw,2.5rem)]">
                  Wat er gebeurt als je belt
                </h2>
                <p className="mt-4 text-ink-soft">
                  Spoedhulp is erop gericht de situatie te stabiliseren en een
                  uithuisplaatsing te voorkomen.
                </p>
              </div>
            </Reveal>
            <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {EERSTE_24_UUR.map((s, i) => (
                <Reveal key={s.titel} size="item" delay={i * 0.05}>
                  <div className="h-full rounded-3xl border border-hairline bg-canvas p-6">
                    <IconBadge icon={s.Icon} />
                    <h3 className="mt-4 text-lg leading-snug">{s.titel}</h3>
                    <p className="mt-1.5 text-sm leading-6 text-ink-soft">{s.tekst}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ── VOOR VERWIJZERS ─────────────────────────────── */}
        <section className="mx-auto max-w-site px-6 py-20 sm:py-24">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <span className="eyebrow text-brand">Voor professionals</span>
              <h2 className="mt-3 text-[clamp(1.75rem,4vw,2.5rem)]">
                Een dreigende uithuisplaatsing op je bureau?
              </h2>
              <p className="mt-5 text-ink-soft">
                Werk je bij een wijkteam, een gecertificeerde instelling, Veilig Thuis of
                als huisarts? Bel ons rechtstreeks. We denken direct mee over wat er
                vandaag nodig is en of wij kunnen instappen.
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                <a
                  href={CONTACT.phoneHref}
                  className="inline-flex items-center gap-2 rounded-pill bg-brand px-7 py-3.5 text-[15px] font-semibold text-canvas transition-colors hover:bg-brand-2"
                >
                  <Phone className="h-4 w-4" strokeWidth={2} />
                  {CONTACT.phone}
                </a>
                <Link
                  href="/verwijzers"
                  className="inline-flex items-center gap-1.5 rounded-pill border border-hairline px-7 py-3.5 text-[15px] font-semibold text-ink transition-colors hover:border-ink"
                >
                  Info voor verwijzers <ArrowRight className="h-4 w-4" strokeWidth={2} />
                </Link>
              </div>
              <div className="mt-5">
                <Link
                  href="/trajecten/ambulante-spoedhulp"
                  className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-brand hover:underline"
                >
                  Lees meer over het traject Ambulante Spoedhulp (ASH)
                  <ArrowRight className="h-4 w-4" strokeWidth={2} />
                </Link>
              </div>
            </Reveal>

            <Reveal delay={0.06}>
              <div className="rounded-3xl bg-sand p-7">
                <h3 className="text-lg">Waar we kunnen instappen</h3>
                <p className="mt-2 text-sm text-ink-soft">
                  Wij zijn actief in de regio West-Brabant West:
                </p>
                <ul className="mt-4 grid grid-cols-2 gap-x-4 gap-y-1.5 text-sm text-ink">
                  {WBW_GEMEENTEN.map((g) => (
                    <li key={g}>{g}</li>
                  ))}
                </ul>
                <p className="mt-5 text-sm text-ink-soft">
                  Voor jeugdhulp is een verwijzing nodig van een huisarts, jeugdarts,
                  medisch specialist, de gemeente of een gecertificeerde instelling. Heb je
                  die nog niet? Bel gerust. We denken mee.
                </p>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <BelBalk label="Crisis? Wij zijn bereikbaar." />

      <DarkPanel>
        <Footer />
      </DarkPanel>
    </>
  );
}
