import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Phone, MapPin } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { DarkPanel } from "@/components/site/DarkPanel";
import { Reveal } from "@/components/site/Reveal";
import { AanmeldForm } from "@/components/site/AanmeldForm";
import { BelBalk } from "@/components/funnel/BelBalk";
import { Tijdlijn } from "@/components/funnel/Tijdlijn";
import { CONTACT } from "@/lib/site";
import { GEMEENTEN, WACHTTIJDEN_BIJGEWERKT } from "@/lib/funnel";

/**
 * Landingspagina voor de zoekterm "ambulante begeleiding".
 *
 * Waarom deze pagina bestaat: in de negen gemeenten van West-Brabant West is dit
 * na "jeugdzorg" de meest gezochte term (90 per maand, gemeten met Keyword
 * Planner op de regio). De term hoort daarom in de title, de H1 en de eerste
 * zichtbare zin te blijven staan. Dat is geen stijlkeuze.
 *
 * Ontwerpprincipe: elk scherm beantwoordt precies een vraag van een ouder in de
 * knel, in de volgorde waarin hij hem stelt, en de actie staat op de pagina zelf
 * in plaats van achter een klik. De vorige versie had 671 zichtbare woorden, acht
 * secties, zes gelijke H2's en nul beeld; alles woog daardoor even zwaar.
 *
 * Hierarchie ontstaat hier door gelijkheid weg te halen:
 *  - een typeschaal met echt maatverschil (hero-H1 groot, ink-H2 midden,
 *    canvas-H2 bewust kleiner), niet zes koppen op dezelfde clamp;
 *  - verticaal ritme waarin geen twee buursecties dezelfde hoogte delen;
 *  - tonaal ritme canvas, foto, canvas, ink, canvas, ink, canvas. bg-mist wordt
 *    nergens als sectiewissel gebruikt: het verschil met canvas is 1,04:1 en dus
 *    visueel onbestaand.
 *
 * Een signatuurmoment: de tijdlijn. Verder beweegt er niets.
 */

export const metadata: Metadata = {
  title: "Ambulante begeleiding jeugd",
  description:
    "Ambulante begeleiding voor kinderen en jongeren in West-Brabant West. Een vaste jeugdcoach komt naar jullie toe. Geen wachtlijst, geen eigen bijdrage, reactie binnen 4 uur.",
  alternates: { canonical: "/ambulante-begeleiding" },
};

/** Drie ware feiten. Geen kaarten: een hairline-strip weegt lichter dan vier dozen. */
const FEITEN = ["Geen wachtlijst", "Geen eigen bijdrage", "Reactie binnen 4 uur", "24/7 bereikbaar"];

/**
 * De drie plekken waar de begeleiding plaatsvindt. Hier vervangt beeld de tekst:
 * hiervoor stonden er vier icoonkaartjes met elk een volle zin, samen 41 woorden,
 * om iets uit te leggen waar drie foto's voor bestaan.
 *
 * Bijsnijdingen bewust ongelijk. Bij de straatfoto is liggend een harde eis: het
 * beeld is 1264x848 en een staande uitsnede gooit de rij Nederlandse rijtjeshuizen
 * weg, precies wat er van "een straat" "jullie straat" maakt.
 */
const PLEKKEN = [
  {
    label: "Thuis, met het hele gezin",
    src: "/images/blog-1.png",
    alt: "Jeugdcoach van MENT4L in gesprek met een moeder en haar zoon aan de keukentafel.",
    cel: "sm:col-span-7",
    vorm: "aspect-[4/3]",
    sizes: "(min-width: 640px) 58vw, 100vw",
  },
  {
    label: "Op school",
    src: "/images/blog-2.png",
    alt: "Jeugdcoach van MENT4L praat met een scholiere in de gang bij de kluisjes.",
    cel: "sm:col-span-5",
    vorm: "aspect-[4/3] sm:aspect-square",
    sizes: "(min-width: 640px) 42vw, 100vw",
  },
  {
    label: "In de wijk",
    src: "/images/traject-amv.png",
    alt: "Jeugdcoach van MENT4L loopt naast een tiener door een woonstraat.",
    cel: "sm:col-span-12",
    vorm: "aspect-[16/9] sm:aspect-[21/9]",
    sizes: "100vw",
  },
];

/** Herkenning in de woorden van de ouder. Maximaal zeven woorden per regel. */
const HERKENBAAR = [
  "Thuis loopt het uit de hand",
  "Spijbelen of gedoe op school",
  "Somber, en praat er niet over",
  "Autisme of ADHD, en zoeken naar houvast",
];

/**
 * De FAQ draagt de SEO-diepte, zodat het scherm rustig blijft. Antwoorden kort en
 * waar: dit gaat ook als FAQPage-schema naar Google, dus elke onhoudbare claim
 * hier is een claim in een rich result.
 */
const VRAGEN: { v: string; a: string; jsx?: React.ReactNode }[] = [
  {
    v: "Wat is ambulante begeleiding?",
    a: "Ambulante begeleiding betekent dat de hulp naar jullie toe komt in plaats van andersom. Een vaste jeugdcoach werkt samen met je kind en met jullie als gezin aan concrete doelen, thuis, op school of in de wijk. Je kind blijft gewoon thuis wonen.",
  },
  {
    v: "Waarvoor kun je ambulante begeleiding aanvragen?",
    a: "Voor de dingen die in het dagelijks leven vastlopen. Denk aan spijbelen, gedoe in de klas of cijfers die afzakken. Aan spanning thuis waar jullie samen niet meer uit komen. Aan een kind dat somber is en er niet over praat. Aan houvast zoeken bij een diagnose zoals autisme of ADHD. Wat er precies nodig is bepalen we niet vooraf, dat kijken we samen in het eerste gesprek.",
    jsx: (
      <>
        Voor de dingen die in het dagelijks leven vastlopen. Denk aan spijbelen, gedoe in de klas
        of cijfers die afzakken. Aan spanning thuis waar jullie samen niet meer uit komen. Aan een
        kind dat somber is en er niet over praat. Aan houvast zoeken bij een diagnose zoals autisme
        of ADHD. Wat er precies nodig is bepalen we niet vooraf, dat kijken we samen in het eerste
        gesprek.{" "}
        <Link href="/blog/waar-helpt-ambulante-begeleiding-bij" className="text-brand underline underline-offset-2">
          Lees waar ambulante begeleiding bij kan helpen
        </Link>
        .
      </>
    ),
  },
  {
    v: "Wat kost ambulante begeleiding?",
    a: "Voor jullie niets. De gemeente betaalt de jeugdhulp vanuit de Jeugdwet en er is geen eigen bijdrage. Ook het kennismakingsgesprek kost niets.",
  },
  {
    v: "Heb ik een verwijzing nodig?",
    a: "Om ons te bellen niet. Voor vergoede jeugdhulp is wel een verwijzing nodig, van de huisarts, de jeugdarts, een medisch specialist, het wijkteam of een gecertificeerde instelling. Wij geven die verwijzing niet zelf af, maar we helpen je eraan: we leggen uit wat je moet vragen en bij wie.",
    jsx: (
      <>
        Om ons te bellen niet. Voor vergoede jeugdhulp is wel een verwijzing nodig, van de
        huisarts, de jeugdarts, een medisch specialist, het wijkteam of een gecertificeerde
        instelling. Wij geven die verwijzing niet zelf af, maar we helpen je eraan: we leggen uit
        wat je moet vragen en bij wie.{" "}
        <Link href="/blog/hoe-vraag-ik-ambulante-begeleiding-aan" className="text-brand underline underline-offset-2">
          Lees hoe je ambulante begeleiding aanvraagt
        </Link>
        .
      </>
    ),
  },
  {
    v: "Hoe lang is de wachttijd?",
    a: `Wij werken zonder wachtlijst. De kennismaking plannen we binnen een week nadat de verwijzing rond is. Onze actuele wachttijden per traject staan op de wachttijdenpagina. Bijgewerkt op ${WACHTTIJDEN_BIJGEWERKT}.`,
    jsx: (
      <>
        Wij werken zonder wachtlijst. De kennismaking plannen we binnen een week nadat de
        verwijzing rond is. Onze{" "}
        <Link href="/wachttijden" className="text-brand underline underline-offset-2">
          actuele wachttijden per traject
        </Link>{" "}
        staan op de wachttijdenpagina. Bijgewerkt op {WACHTTIJDEN_BIJGEWERKT}.
      </>
    ),
  },
  {
    v: "Voor welke leeftijd is ambulante begeleiding?",
    a: "Voor kinderen en jongeren van 0 tot 18 jaar. Ouders horen erbij, en broers en zussen ook: een kind staat nooit los van thuis.",
  },
  {
    v: "In welke gemeenten kan ik ambulante begeleiding aanvragen?",
    a: "MENT4L is actief in de negen gemeenten van West-Brabant West: Bergen op Zoom, Etten-Leur, Halderberge, Moerdijk, Roosendaal, Rucphen, Steenbergen, Woensdrecht en Zundert. Welke gemeente de zorg betaalt, hangt af van waar je kind woont.",
  },
  {
    v: "Wat is het verschil met ambulante spoedhulp?",
    a: "Ambulante begeleiding is er voor de langere lijn: samen werken aan doelen, in een rustig tempo. Ambulante spoedhulp is voor een acute crisis, waarbij we vrijwel direct schakelen om een uithuisplaatsing te voorkomen.",
  },
];

/** De vier artikelen die in de voetregel blijven staan, gedempt. */
const MEER_LEZEN = [
  { slug: "wat-valt-onder-ambulante-begeleiding", titel: "Wat valt er onder ambulante begeleiding?" },
  { slug: "hoe-vraag-ik-ambulante-begeleiding-aan", titel: "Hoe vraag ik ambulante begeleiding aan?" },
  { slug: "waar-helpt-ambulante-begeleiding-bij", titel: "Waar kan het bij helpen?" },
  { slug: "hoe-krijg-je-ambulante-begeleiding", titel: "Hoe krijg je ambulante begeleiding?" },
];

const CRISIS = (
  <>
    Direct gevaar? Bel 112. Crisis thuis?{" "}
    <Link href="/spoed" className="underline underline-offset-2">
      Kijk bij ambulante spoedhulp
    </Link>
    .
  </>
);

export default function AmbulanteBegeleidingPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: VRAGEN.map((q) => ({
      "@type": "Question",
      name: q.v,
      // Bewust de platte tekst, niet de JSX-variant met links.
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
      "Ambulante begeleiding voor kinderen en jongeren van 0 tot 18 jaar in West-Brabant West. Een vaste jeugdcoach begeleidt thuis, op school of in de wijk.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify([faqSchema, dienstSchema]) }}
      />
      <Nav variant="landing" />

      {/* pb-24 zodat de sticky belbalk de laatste regel nooit afdekt */}
      <main id="inhoud" className="pb-24">
        {/* ── HERO: vraag 1, wat is dit en kan ik nu iets doen ───────── */}
        <section className="relative overflow-hidden bg-canvas">
          {/* Fluistertextuur, dezelfde die de andere funnelheroes dragen: geeft de
              hero materiaal zonder de rust te breken. */}
          <div aria-hidden className="tex-diagonal pointer-events-none absolute inset-0 opacity-60" />
          <div className="relative mx-auto max-w-site px-6 pb-16 pt-28 sm:pt-32">
            <Reveal>
              <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-16">
                {/* Linkerkolom: de belofte en de telefoon */}
                <div>
                  {/* Geen uppercase kicker: de H1 draagt zelf. De kwalificatie
                      (regio, leeftijd) staat als meta-regel met icoon onder de belofte. */}
                  <h1 className="max-w-[15ch] font-display text-[clamp(2.6rem,5.4vw,4.15rem)] leading-[0.96] tracking-[-0.045em] text-balance">
                    Ambulante begeleiding voor je kind,{" "}
                    <em className="italic text-brand">gewoon thuis</em>
                  </h1>
                  <p className="mt-5 max-w-[46ch] text-[17px] leading-[1.6] text-ink-soft text-pretty">
                    Ambulante begeleiding betekent: een vaste jeugdcoach komt naar jullie toe.
                  </p>
                  <p className="mt-4 flex flex-wrap items-center gap-x-2 gap-y-1 text-[14px] text-grey">
                    <MapPin aria-hidden className="h-4 w-4 text-brand" strokeWidth={2} />
                    West-Brabant West
                    <span aria-hidden className="h-1 w-1 rounded-full bg-grey-2" />
                    Voor kinderen en jongeren van 0 tot 18 jaar
                  </p>

                  <ul className="mt-7 flex flex-wrap items-center gap-x-5 gap-y-2 border-y border-hairline py-3.5 text-[15px] text-ink">
                    {FEITEN.map((f) => (
                      <li key={f} className="flex items-center gap-2">
                        <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-brand" />
                        {f}
                      </li>
                    ))}
                  </ul>

                  <a
                    href={CONTACT.phoneHref}
                    className="mt-7 inline-flex min-h-12 items-center gap-2.5 rounded-pill border border-ink/45 px-7 text-[16px] font-semibold text-ink transition-colors hover:border-ink"
                  >
                    <Phone className="h-4 w-4" strokeWidth={2} />
                    Bel {CONTACT.phone}
                  </a>

                  <p className="mt-4 max-w-[46ch] text-sm text-grey">{CRISIS}</p>
                </div>

                {/* Rechterkolom: het conversiepunt zelf. Geen doorklik meer naar
                    /aanmelden, want daar breekt het geurspoor van de advertentie
                    precies op het punt van de grootste twijfel. */}
                <div id="bel-mij-terug" className="scroll-mt-28">
                  <div className="rounded-[28px] border border-black/[0.06] bg-sand p-6 shadow-[var(--shadow-framer-md)] sm:p-8">
                    <h2 className="text-[clamp(1.35rem,2.4vw,1.7rem)] leading-[1.1] tracking-[-0.03em]">
                      Wij bellen je terug, binnen 4 uur
                    </h2>
                    <div className="mt-5">
                      <AanmeldForm variant="landing" submitId="bel-mij-terug-knop" />
                    </div>
                  </div>
                  {/* Controleerbaar autoriteitssignaal, geen keurmerk-badge: SKJ
                      registreert individuele professionals, niet organisaties, dus
                      geen logo. De ouder kan het zelf naslaan. */}
                  <p className="mt-4 text-center text-sm text-ink-soft">
                    Onze jeugdcoaches staan in het{" "}
                    <a
                      href="https://register.skjeugd.nl/"
                      target="_blank"
                      rel="noopener"
                      className="font-medium text-brand-ink underline underline-offset-2"
                    >
                      SKJ-register
                    </a>
                    , het wettelijke kwaliteitsregister voor de jeugdzorg.
                  </p>
                  <p className="mt-2 text-center text-sm text-grey">
                    Actief in {GEMEENTEN.map((g) => g.naam).slice(0, -1).join(", ")} en{" "}
                    {GEMEENTEN[GEMEENTEN.length - 1].naam}.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── PLEKKEN: vraag 2, moet mijn kind ergens heen ───────────── */}
        <section className="bg-canvas">
          <div className="mx-auto max-w-site px-6 py-14 sm:py-16">
            <Reveal size="item">
              <h2 className="text-[clamp(1.6rem,2.8vw,2.1rem)] leading-[1.1] tracking-[-0.04em]">
                Je kind hoeft nergens heen
              </h2>
              <div className="mt-7 grid gap-3 sm:grid-cols-12">
                {PLEKKEN.map((p) => (
                  <figure
                    key={p.label}
                    className={`relative overflow-hidden rounded-3xl ring-1 ring-black/[0.06] ${p.cel} ${p.vorm}`}
                  >
                    <Image
                      src={p.src}
                      alt={p.alt}
                      fill
                      sizes={p.sizes}
                      className="object-cover object-center"
                    />
                    {/* Zachtere, diepere scrim in twee stops: het label blijft leesbaar
                        zonder dat de foto er donker uitziet. */}
                    <div
                      aria-hidden
                      className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 via-40% to-transparent"
                    />
                    <figcaption className="absolute bottom-4 left-5 flex items-center gap-2 text-[15px] font-semibold tracking-[-0.01em] text-white">
                      <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-brand-2" />
                      {p.label}
                    </figcaption>
                  </figure>
                ))}
              </div>
              <p className="mt-3 text-xs text-grey">Beeld ter illustratie</p>
            </Reveal>
          </div>
        </section>

        {/* ── HERKENNING: vraag 3, is het bij ons wel erg genoeg ─────── */}
        <section className="bg-canvas">
          <div className="mx-auto max-w-site px-6 py-10 sm:py-12">
            <Reveal size="item">
              <div className="max-w-[46ch]">
                <h2 className="text-[clamp(1.6rem,2.8vw,2.1rem)] leading-[1.1] tracking-[-0.04em]">
                  Herken je hier iets in?
                </h2>
                <ul className="mt-5">
                  {HERKENBAAR.map((h) => (
                    <li
                      key={h}
                      className="flex items-start gap-3 border-b border-hairline py-3 text-[17px] leading-6 text-ink-soft last:border-b-0"
                    >
                      {/* Neutrale stip, geen vinkje: een vinkje betekent "goed,
                          afgevinkt" en dit zijn problemen. */}
                      <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-ink-soft/30" />
                      {h}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-[15px] text-grey">
                  Twijfel je of het erg genoeg is? Bel gerust, meedenken kost niets.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── INK: vraag 4, wat gebeurt er nadat ik bel ──────────────── */}
        <section className="relative overflow-hidden bg-charcoal text-white">
          <div aria-hidden className="tex-grain pointer-events-none absolute inset-0" />
          <div className="relative mx-auto max-w-site px-6 py-24 sm:py-32">
            <Reveal>
              <h2 className="max-w-[18ch] text-[clamp(2rem,4.4vw,3.25rem)] leading-[1.05] tracking-[-0.04em] text-white">
                Wat er gebeurt <em className="italic text-brand-2">nadat je belt</em>
              </h2>
            </Reveal>
            <div className="mt-12 sm:mt-16">
              <Tijdlijn />
            </div>
          </div>
        </section>

        {/* ── FAQ: hier leeft de SEO-diepte ─────────────────────────── */}
        <section className="bg-canvas">
          <div className="mx-auto max-w-site px-6 py-16 sm:py-20">
            <Reveal size="item">
              <div className="mx-auto max-w-3xl">
                <h2 className="text-[clamp(1.6rem,2.8vw,2.1rem)] leading-[1.1] tracking-[-0.04em]">
                  Wat ouders vragen over ambulante begeleiding
                </h2>
                <div className="mt-7">
                  {VRAGEN.map((q) => (
                    <details
                      key={q.v}
                      className="group border-b border-hairline [&_summary::-webkit-details-marker]:hidden"
                    >
                      <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-4 py-4 text-[17px] font-semibold text-ink">
                        {q.v}
                        <span
                          aria-hidden
                          className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand/10 text-brand transition-transform duration-200 group-open:rotate-45 motion-reduce:transition-none"
                        >
                          <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none">
                            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" />
                          </svg>
                        </span>
                      </summary>
                      <p className="max-w-[62ch] pb-5 text-[16px] leading-[1.6] text-ink-soft">
                        {q.jsx ?? q.a}
                      </p>
                    </details>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── SLOT-CTA op ink ───────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-charcoal text-white">
          <div aria-hidden className="tex-grain pointer-events-none absolute inset-0" />
          <div className="relative mx-auto max-w-site px-6 py-20 text-center sm:py-24">
            <Reveal size="item">
              <h2 className="mx-auto max-w-[16ch] text-[clamp(2rem,4.4vw,3.25rem)] leading-[1.05] tracking-[-0.04em] text-white">
                Zullen we bellen?
              </h2>
              <p className="mx-auto mt-4 max-w-[46ch] text-[17px] text-white/70">
                Binnen 4 uur, ook &rsquo;s avonds en in het weekend.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <a
                  href="#bel-mij-terug"
                  className="inline-flex min-h-12 items-center rounded-pill bg-brand px-7 text-[15px] font-semibold text-canvas transition-colors hover:bg-brand-2"
                >
                  Bel mij terug
                </a>
                <a
                  href={CONTACT.phoneHref}
                  className="inline-flex min-h-12 items-center gap-2 rounded-pill border border-white/40 px-7 text-[15px] font-semibold text-white transition-colors hover:border-white"
                >
                  <Phone className="h-4 w-4" strokeWidth={2} />
                  {CONTACT.phone}
                </a>
              </div>
              <p className="mx-auto mt-6 max-w-[46ch] text-sm text-white/55">{CRISIS}</p>
            </Reveal>
          </div>
        </section>

        {/* ── STILLE VOETREGEL ──────────────────────────────────────── */}
        <section className="bg-canvas">
          <div className="mx-auto grid max-w-site gap-8 px-6 py-10 sm:grid-cols-2">
            <div>
              <h2 className="text-sm font-semibold text-ink">Ook actief in</h2>
              <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                {GEMEENTEN.map((g) => (
                  <li key={g.slug}>
                    <Link
                      href={`/jeugdhulp/${g.slug}`}
                      className="inline-flex min-h-11 items-center text-sm text-grey hover:text-ink hover:underline"
                    >
                      {g.naam}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-sm font-semibold text-ink">Meer lezen</h2>
              <ul className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
                {MEER_LEZEN.map((a) => (
                  <li key={a.slug}>
                    <Link
                      href={`/blog/${a.slug}`}
                      className="inline-flex min-h-11 items-center text-sm text-grey hover:text-ink hover:underline"
                    >
                      {a.titel}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/wachttijden"
                    className="inline-flex min-h-11 items-center text-sm text-grey hover:text-ink hover:underline"
                  >
                    Actuele wachttijden
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </main>

      {/* Volgt de VERZENDKNOP, niet de formuliercontainer: bij een lang formulier
          is de container nog in beeld terwijl de knop er allang uit is. */}
      <BelBalk
        label="Liever direct bellen?"
        volgSelector="#bel-mij-terug-knop"
        terugNaar="#bel-mij-terug"
      />

      <DarkPanel>
        <Footer />
      </DarkPanel>
    </>
  );
}
