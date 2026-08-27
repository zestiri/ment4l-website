import type { Metadata } from "next";
import Link from "next/link";
import { Phone, ArrowRight, Home, School, Users, Compass } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { DarkPanel } from "@/components/site/DarkPanel";
import { Reveal } from "@/components/site/Reveal";
import { IconBadge, CheckBullet } from "@/components/site/IconBadge";
import { Bewijs } from "@/components/funnel/Bewijs";
import { Stappen } from "@/components/funnel/Stappen";
import { CONTACT, AANMELD_URL, FINANCIERING_UITLEG } from "@/lib/site";
import { GEMEENTEN, WACHTTIJDEN_BIJGEWERKT } from "@/lib/funnel";

/**
 * Landingspagina voor de zoekterm "ambulante begeleiding".
 *
 * Waarom deze pagina bestaat: in de negen gemeenten van West-Brabant West is
 * dit na "jeugdzorg" de meest gezochte term (90 per maand, gemeten met Keyword
 * Planner op de regio). Tot nu toe stond het woord alleen in de lopende tekst
 * van de regiopagina, nergens in een title of H1. Advertentieverkeer op die
 * term kwam dus neer op een berichtmismatch, en dat kost kwaliteitsscore.
 *
 * Let op bij het bijwerken: de term hoort in de title, de H1 en de eerste zin
 * te blijven staan. Dat is geen stijlkeuze maar de reden dat de pagina er is.
 */

export const metadata: Metadata = {
  title: "Ambulante begeleiding jeugd",
  description:
    "Ambulante begeleiding voor jeugd in West-Brabant West. Hulp bij jullie thuis, op school of in de wijk. Geen wachtlijst en je hoort binnen 4 uur van ons.",
  alternates: { canonical: "/ambulante-begeleiding" },
};

/** Waar de begeleiding plaatsvindt. Icoon met zichtbaar label, geen alinea's. */
const PLEKKEN = [
  { Icon: Home, kop: "Thuis", tekst: "De coach komt bij jullie langs, in de eigen omgeving." },
  { Icon: School, kop: "Op school", tekst: "Waar het vastloopt: in de klas, in de pauze, bij de mentor." },
  { Icon: Compass, kop: "In de wijk", tekst: "Op een plek waar je kind zich prettig voelt." },
  { Icon: Users, kop: "Met het gezin", tekst: "Ouders horen erbij. Een kind staat nooit los van thuis." },
];

/** Waar ouders ons voor bellen. Herkenbaar, in hun woorden. */
const HERKENBAAR = [
  "Thuis loopt het steeds vaker uit de hand en jullie komen er samen niet meer uit",
  "Je kind zit niet lekker in zijn vel en praat er niet over",
  "School meldt spijbelen, gedoe in de klas of afzakkende cijfers",
  "Er is een diagnose zoals autisme of ADHD en jullie zoeken houvast in het dagelijks leven",
  "De stap naar zelfstandigheid komt eraan en je kind is er nog niet klaar voor",
];

/**
 * De FAQ draagt hier de SEO-diepte, zodat het scherm zelf rustig blijft.
 * Antwoorden kort en waar: dit gaat ook als JSON-LD naar Google.
 */
const VRAGEN = [
  {
    v: "Wat is ambulante begeleiding?",
    a: "Ambulante begeleiding betekent dat de hulp naar jullie toe komt in plaats van andersom. Een vaste jeugdcoach werkt samen met je kind en met jullie als gezin aan concrete doelen, thuis, op school of in de wijk. Je kind blijft gewoon thuis wonen.",
  },
  {
    v: "Wat kost ambulante begeleiding?",
    a: "Voor jullie niets. De gemeente betaalt de jeugdhulp vanuit de Jeugdwet en er is geen eigen bijdrage.",
  },
  {
    v: "Heb ik een verwijzing nodig?",
    a: "Voor vergoede jeugdhulp is een verwijzing nodig van de huisarts, de jeugdarts, een medisch specialist, het wijkteam of een gecertificeerde instelling. Heb je die nog niet, meld je dan gerust aan. Wij helpen je die verwijzing te krijgen.",
  },
  {
    v: "Hoe lang is de wachttijd?",
    a: `Wij werken zonder wachtlijst. De kennismaking plannen we binnen een week nadat de verwijzing rond is. Bijgewerkt op ${WACHTTIJDEN_BIJGEWERKT}.`,
  },
  {
    v: "In welke gemeenten kan ik ambulante begeleiding aanvragen?",
    a: "MENT4L is actief in de negen gemeenten van West-Brabant West: Bergen op Zoom, Etten-Leur, Halderberge, Moerdijk, Roosendaal, Rucphen, Steenbergen, Woensdrecht en Zundert. Welke gemeente de zorg betaalt, hangt af van waar je kind woont.",
  },
  {
    v: "Wat is het verschil met ambulante spoedhulp?",
    a: "Ambulante begeleiding is er voor de langere lijn: samen werken aan doelen, in een rustig tempo. Ambulante spoedhulp is voor een acute crisis, waarbij we vrijwel direct schakelen om een uithuisplaatsing te voorkomen. Twijfel je wat je nodig hebt, bel ons dan.",
  },
];

/** De acht artikelen die dieper op de term ingaan. Deze pagina is hun startpunt. */
const VERDER_LEZEN = [
  { slug: "wat-valt-onder-ambulante-begeleiding", titel: "Wat valt er onder ambulante begeleiding?" },
  { slug: "hoe-vraag-ik-ambulante-begeleiding-aan", titel: "Hoe vraag ik ambulante begeleiding aan?" },
  { slug: "in-aanmerking-ambulante-begeleiding", titel: "Hoe kom ik in aanmerking?" },
  { slug: "welke-indicatie-ambulante-begeleiding", titel: "Welke indicatie heb je nodig?" },
  { slug: "waar-helpt-ambulante-begeleiding-bij", titel: "Waar kan het bij helpen?" },
  { slug: "vormen-van-ambulante-zorg", titel: "Welke vormen van ambulante zorg zijn er?" },
  { slug: "verschil-ambulant-persoonlijk-begeleider", titel: "Ambulant of persoonlijk begeleider?" },
  { slug: "hoe-krijg-je-ambulante-begeleiding", titel: "Hoe krijg je ambulante begeleiding?" },
];

export default function AmbulanteBegeleidingPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: VRAGEN.map((q) => ({
      "@type": "Question",
      name: q.v,
      acceptedAnswer: { "@type": "Answer", text: q.a },
    })),
  };

  const dienstSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Ambulante begeleiding jeugd",
    serviceType: "Ambulante jeugdhulp",
    provider: { "@type": "Organization", name: "MENT4L", url: "https://www.ment4l.nl" },
    areaServed: GEMEENTEN.map((g) => ({ "@type": "City", name: g.naam })),
    description:
      "Ambulante begeleiding voor jeugd van 0 tot 18 jaar in West-Brabant West. Een vaste jeugdcoach begeleidt thuis, op school of in de wijk.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([faqSchema, dienstSchema]) }}
      />
      <Nav />
      <main>
        {/* ── HERO: statisch, één reveal, keyword voorin ──────────── */}
        <section className="relative overflow-hidden bg-mist pt-8">
          <div className="tex-diagonal pointer-events-none absolute inset-0" aria-hidden />
          <div className="relative mx-auto w-full max-w-[1100px] rounded-t-[32px] bg-canvas">
            <div className="px-6 pb-16 pt-24 sm:pt-28">
              <div className="mx-auto max-w-3xl text-center">
                <span className="eyebrow justify-center text-brand">
                  Ambulante begeleiding &middot; West-Brabant West
                </span>
                <h1 className="mt-4 text-[clamp(2rem,4.8vw,3.1rem)]">
                  Ambulante begeleiding voor je kind, gewoon thuis
                </h1>
                <p className="mx-auto mt-5 max-w-xl text-lg text-ink-soft">
                  Een vaste jeugdcoach die naar jullie toe komt. Geen wachtlijst en je hoort
                  binnen 4 uur van ons, ook buiten kantooruren.
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

        {/* ── WAT HET IS: kop + één zin + iconen met label ─────────── */}
        <section className="mx-auto max-w-site px-6 py-20 sm:py-24">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <span className="eyebrow justify-center text-brand">Wat het is</span>
              <h2 className="mt-3 text-[clamp(1.75rem,4vw,2.5rem)]">
                De hulp komt naar jullie toe
              </h2>
              <p className="mt-4 text-ink-soft">
                Ambulant betekent: wij reizen, jullie niet. Je kind blijft gewoon thuis wonen.
              </p>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PLEKKEN.map((p, i) => (
              <Reveal key={p.kop} size="item" delay={i * 0.05}>
                <div className="flex h-full flex-col gap-3 rounded-2xl border border-hairline bg-canvas p-5">
                  <IconBadge icon={p.Icon} />
                  <h3 className="text-base leading-snug">{p.kop}</h3>
                  <p className="text-sm leading-6 text-ink-soft">{p.tekst}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── HERKENNING: de ouder moet zichzelf terugzien ─────────── */}
        <section className="border-y border-hairline bg-mist">
          <div className="mx-auto max-w-site px-6 py-20 sm:py-24">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
              <Reveal>
                <span className="eyebrow text-brand">Wanneer je ons belt</span>
                <h2 className="mt-3 text-[clamp(1.75rem,4vw,2.5rem)]">
                  Herken je hier iets in?
                </h2>
                <p className="mt-5 max-w-md text-ink-soft">
                  Je hoeft niet te wachten tot het echt misgaat. Eerder aanmelden betekent
                  meestal dat er minder nodig is.
                </p>
                <Link
                  href="/wachttijden"
                  className="mt-4 inline-flex min-h-11 items-center gap-1.5 text-[15px] font-semibold text-brand hover:underline"
                >
                  Bekijk onze actuele wachttijden <ArrowRight className="h-4 w-4" strokeWidth={2} />
                </Link>
              </Reveal>

              <Reveal delay={0.06}>
                <ul className="flex flex-col gap-3">
                  {HERKENBAAR.map((h) => (
                    <li key={h} className="flex gap-3 rounded-2xl border border-hairline bg-canvas p-4">
                      <CheckBullet />
                      <span className="text-[15px] leading-6 text-ink-soft">{h}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── STAPPEN: het signatuurmoment van de funnel ───────────── */}
        <section className="mx-auto max-w-site px-6 py-20 sm:py-24">
          <Stappen titel="Van aanmelding tot eerste afspraak" />
        </section>

        {/* ── KOSTEN EN VERWIJZING ─────────────────────────────────── */}
        <section className="border-y border-hairline bg-mist">
          <div className="mx-auto max-w-site px-6 py-20 sm:py-24">
            <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-16">
              <Reveal>
                <span className="eyebrow text-brand">Kosten en verwijzing</span>
                <h2 className="mt-3 text-[clamp(1.75rem,4vw,2.5rem)]">
                  Wat kost ambulante begeleiding?
                </h2>
                <p className="mt-5 max-w-md text-ink-soft">
                  Niets. {FINANCIERING_UITLEG} Wel is er een verwijzing nodig, en die regelen
                  we samen als je die nog niet hebt.
                </p>
              </Reveal>

              <Reveal delay={0.06}>
                <div className="rounded-3xl bg-sand p-7">
                  <h3 className="text-lg">Wachttijd</h3>
                  <div className="mt-4 flex items-baseline gap-3">
                    <span className="font-sans text-[42px] font-medium leading-none tracking-[-0.02em] text-ink">
                      Geen
                    </span>
                    <span className="text-ink-soft">wachtlijst</span>
                  </div>
                  <p className="mt-4 text-sm text-ink-soft">
                    We plannen de kennismaking binnen een week nadat de verwijzing rond is.
                  </p>
                  <p className="mt-4 font-mono text-xs text-grey">
                    Bijgewerkt op {WACHTTIJDEN_BIJGEWERKT}
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ── WERKGEBIED ───────────────────────────────────────────── */}
        <section className="mx-auto max-w-site px-6 py-20 sm:py-24">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <span className="eyebrow justify-center text-brand">Werkgebied</span>
              <h2 className="mt-3 text-[clamp(1.75rem,4vw,2.5rem)]">
                Actief in negen gemeenten
              </h2>
              <p className="mt-4 text-ink-soft">
                Welke gemeente de zorg betaalt, hangt af van waar je kind woont.
              </p>
            </div>
          </Reveal>
          <div className="mt-10 flex flex-wrap justify-center gap-2.5">
            {GEMEENTEN.map((g, i) => (
              <Reveal key={g.slug} size="item" delay={i * 0.03}>
                <Link
                  href={`/jeugdhulp/${g.slug}`}
                  className="inline-flex rounded-pill border border-hairline bg-canvas px-5 py-2.5 text-[15px] font-medium text-ink transition-colors hover:border-brand hover:text-brand"
                >
                  {g.naam}
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── FAQ: hier leeft de SEO-diepte ────────────────────────── */}
        <section className="border-t border-hairline bg-mist">
          <div className="mx-auto max-w-site px-6 py-20 sm:py-24">
            <Reveal>
              <div className="mx-auto max-w-2xl text-center">
                <span className="eyebrow justify-center text-brand">Veelgestelde vragen</span>
                <h2 className="mt-3 text-[clamp(1.75rem,4vw,2.5rem)]">
                  Wat ouders ons vragen
                </h2>
              </div>
            </Reveal>

            <div className="mx-auto mt-12 flex max-w-3xl flex-col gap-3">
              {VRAGEN.map((q, i) => (
                <Reveal key={q.v} size="item" delay={i * 0.04}>
                  <details className="group rounded-2xl border border-hairline bg-canvas px-5 py-4 [&_summary::-webkit-details-marker]:hidden">
                    {/* -my-2.5 py-2.5 vergroot het tikdoel naar 44px zonder de kaart te verschuiven */}
                    <summary className="-my-2.5 flex cursor-pointer list-none items-center justify-between gap-4 py-2.5 text-[16px] font-semibold text-ink">
                      {q.v}
                      <span
                        aria-hidden
                        className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand/10 text-brand transition-transform duration-200 group-open:rotate-45"
                      >
                        <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none">
                          <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" />
                        </svg>
                      </span>
                    </summary>
                    <p className="mt-3 text-[15px] leading-7 text-ink-soft">{q.a}</p>
                  </details>
                </Reveal>
              ))}
            </div>

            <Reveal>
              <div className="mx-auto mt-14 max-w-3xl">
                <h3 className="text-center text-base text-grey">Verder lezen</h3>
                <div className="mt-5 flex flex-wrap justify-center gap-2">
                  {VERDER_LEZEN.map((a) => (
                    <Link
                      key={a.slug}
                      href={`/blog/${a.slug}`}
                      className="inline-flex min-h-11 items-center rounded-pill border border-hairline bg-canvas px-4 py-2 text-sm text-ink-soft transition-colors hover:border-ink hover:text-ink"
                    >
                      {a.titel}
                    </Link>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── SLOT-CTA: één actie ──────────────────────────────────── */}
        <section className="mx-auto max-w-site px-6 py-20 sm:py-24">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-[clamp(1.75rem,4vw,2.5rem)]">
                Laat je nummer achter, wij bellen
              </h2>
              <p className="mt-4 text-ink-soft">
                Binnen 4 uur, ook &rsquo;s avonds en in het weekend. Een paar zinnen over wat er
                speelt is genoeg.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href={AANMELD_URL}
                  className="rounded-pill bg-brand px-7 py-3.5 text-[15px] font-semibold text-canvas transition-colors hover:bg-brand-2"
                >
                  Aanmelden
                </Link>
                <a
                  href={CONTACT.phoneHref}
                  className="inline-flex items-center gap-2 rounded-pill border border-hairline px-7 py-3.5 text-[15px] font-semibold text-ink transition-colors hover:border-ink"
                >
                  <Phone className="h-4 w-4" strokeWidth={2} />
                  {CONTACT.phone}
                </a>
              </div>
              <p className="mt-6 text-sm text-grey">
                Gaat het om een crisis? Kijk dan bij{" "}
                <Link href="/spoed" className="font-semibold text-brand hover:underline">
                  ambulante spoedhulp
                </Link>
                .
              </p>
            </div>
          </Reveal>
        </section>
      </main>
      <DarkPanel>
        <Footer />
      </DarkPanel>
    </>
  );
}
