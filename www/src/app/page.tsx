import Link from "next/link";
import { TrendingUp, GraduationCap, ClipboardCheck, Star, BarChart3, ArrowUpRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { DarkPanel } from "@/components/site/DarkPanel";
import { Reveal } from "@/components/site/Reveal";
import { CharReveal } from "@/components/site/CharReveal";
import { FaqSection } from "@/components/site/FaqSection";
import { Testimonials } from "@/components/site/Testimonials";
import {
  TRAJECTEN,
  BLOG_TEASERS,
  HERO_AVATARS,
  AANMELD_URL,
} from "@/lib/site";

const STAT_CARDS: { waarde: string; label: string; Icon: LucideIcon }[] = [
  { waarde: "54", label: "Workshops op scholen gegeven door onze professionals", Icon: GraduationCap },
  { waarde: "100+", label: "Gezinnen geholpen die zichzelf in een crisissituatie bevonden", Icon: ClipboardCheck },
  { waarde: "4.9/5", label: "Waardering gebaseerd op ervaringen", Icon: Star },
  { waarde: "98%", label: "Aanmeldingen verwerken wij binnen 4 uur", Icon: BarChart3 },
];

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        {/* ── HERO + PARTNERS ──────────────────────────
            Live is dit één band: een ingelegd crème paneel (1100px, ronde
            bovenhoeken) op een gestreepte textuurachtergrond. */}
        <section className="relative overflow-hidden bg-mist pt-8">
          <div className="tex-diagonal pointer-events-none absolute inset-0" aria-hidden />
          <div className="relative mx-auto w-full max-w-[1100px] rounded-t-[32px] bg-canvas">
          <div className="relative mx-auto flex max-w-4xl flex-col items-center px-6 pb-16 pt-28 text-center sm:pt-32">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-hairline bg-canvas px-3.5 py-1.5 text-sm font-medium text-ink-soft shadow-[var(--shadow-soft)]">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500/60" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
                </span>
                24/7 Bereikbaar
              </span>
            </Reveal>
            <h1 className="mt-8 text-[clamp(2.3rem,5.2vw,3.625rem)]">
              <CharReveal startDelay={0.15}>Ambulante (spoed) Hulp</CharReveal>
              <br />
              <span className="inline-flex items-center gap-3">
                <CharReveal startDelay={0.45}>Jeugd</CharReveal>
                {/* scheef, glanzend tegeltje: het handtekening-detail van de live hero */}
                <span className="inline-grid h-[0.82em] w-[0.82em] rotate-[10deg] place-items-center rounded-[16px] border border-black/[0.09] bg-[radial-gradient(86%_150%_at_26.3%_24.4%,rgb(255,248,235)_0%,rgb(238,235,255)_100%)] text-brand shadow-[var(--shadow-framer-sm)] transition-transform duration-500 hover:scale-110">
                  <TrendingUp className="h-1/2 w-1/2" strokeWidth={2.2} />
                </span>
                <CharReveal startDelay={0.6}>Coaching</CharReveal>
              </span>
            </h1>
            <Reveal delay={0.12}>
              <div className="mt-9 flex items-center justify-center gap-2.5">
                <a
                  href={AANMELD_URL}
                  className="rounded-pill bg-brand px-7 py-3.5 text-[15px] font-semibold text-canvas transition-colors"
                >
                  Direct Aanmelden
                </a>
                <a
                  href={AANMELD_URL}
                  aria-label="Direct aanmelden"
                  className="grid h-12 w-12 place-items-center rounded-full bg-brand-2 text-lg text-canvas transition-colors"
                >
                  ↗
                </a>
              </div>
            </Reveal>
            <Reveal delay={0.18}>
              <div className="mt-8 flex items-center justify-center gap-3">
                <div className="flex -space-x-3">
                  {HERO_AVATARS.map((src) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={src}
                      src={src}
                      alt=""
                      width={36}
                      height={36}
                      loading="eager"
                      className="h-9 w-9 rounded-full border-2 border-canvas object-cover"
                    />
                  ))}
                </div>
                <span className="text-sm text-grey">
                  <span className="font-semibold text-ink">1000+</span> jongeren begeleid door MENT4L
                </span>
              </div>
            </Reveal>
          </div>

            {/* Feitelijke autoriteitsband: eigen, aantoonbare status i.p.v. geleende logo's.
                Geen overheids- of gemeentelogo's: die vragen toestemming en suggereren endorsement. */}
            <div className="px-6 pb-14">
              <p className="text-center text-[19px] text-ink">Onderdeel van de jeugdhulp in West-Brabant</p>
              <div className="mx-auto mt-8 flex max-w-3xl flex-wrap items-center justify-center gap-x-8 gap-y-3 text-center text-[15px] font-medium text-ink-soft">
                <span>Gecontracteerd voor jeugdhulp in West-Brabant</span>
                <span aria-hidden className="hidden h-1 w-1 rounded-full bg-grey sm:inline-block" />
                <span>SKJ-geregistreerde jeugdprofessionals</span>
                <span aria-hidden className="hidden h-1 w-1 rounded-full bg-grey sm:inline-block" />
                <span>Actief in 14 gemeenten</span>
              </div>
            </div>
          </div>
        </section>

        {/* ── EXPERTISES ───────────────────────────────── */}
        <section id="expertises" className="mx-auto max-w-site px-6 py-20 sm:py-24">
          <Reveal>
            <div className="text-center">
              <span className="eyebrow text-brand">Trajecten</span>
              <h2 className="mt-3 text-[clamp(1.75rem,4vw,2.5rem)]">
                Expertises op gebied van jeugdcoaching
              </h2>
            </div>
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {TRAJECTEN.map((t, i) => (
              <Reveal key={t.slug} delay={i * 0.06}>
                <Link
                  href={`/trajecten/${t.slug}`}
                  className="group relative flex aspect-[16/11] flex-col justify-end overflow-hidden rounded-3xl"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={t.image}
                    alt={t.naam}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  {/* live gebruikt een lichte grijze scrim, geen zwarte gradient */}
                  <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(51,54,81,0)_51%,rgb(163,162,160)_103%)]" />
                  <span className="absolute right-3 top-3 grid h-12 w-12 place-items-center rounded-full bg-white text-ink transition-colors duration-[850ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:bg-brand group-hover:text-white">
                    <ArrowUpRight className="h-[14px] w-[14px] transition-transform duration-[850ms] group-hover:rotate-45" strokeWidth={2} />
                  </span>
                  <div className="relative p-5">
                    <h3 className="font-sans text-[22px] font-bold leading-[30px] tracking-[-0.02em] text-white">{t.naam}</h3>
                    <p className="mt-1.5 text-sm text-white/90">{t.tagline}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── CIJFERS (bento) ──────────────────────────── */}
        <section className="mx-auto max-w-site px-6 py-20 sm:py-24">
          <Reveal>
            <h2 className="text-[clamp(1.75rem,4vw,2.5rem)]">Uw zorg, onze taak</h2>
            <p className="mt-2 text-lg text-ink-soft">wij staan voor groei &amp; vooruitgang</p>
          </Reveal>

          {/* bovenblok: foto-kaart (10+) + 2x2 stat-grid.
              Live is dit een strak lijnenraster met de foto's als lichte vlakken. */}
          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            <Reveal className="lg:row-span-2">
              <div className="relative h-full min-h-[280px] overflow-hidden rounded-3xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/stats-ervaring.png" alt="Jaren ervaring" className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute bottom-6 left-6 rounded-2xl border border-[#222] bg-white/25 px-4 py-3 backdrop-blur-md">
                  <div className="font-sans text-[40px] font-medium leading-none tracking-[-0.02em] text-ink">10+</div>
                  <div className="mt-1 text-sm text-ink-soft">Jaren ervaring</div>
                </div>
              </div>
            </Reveal>
            {STAT_CARDS.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.05}>
                <div className="flex h-full items-start justify-between gap-4 rounded-3xl border border-[#222] bg-transparent p-6">
                  <div>
                    <div className="font-sans text-[48px] font-medium leading-none tracking-[-0.02em] text-ink">{s.waarde}</div>
                    <p className="mt-2 text-base leading-6 text-ink">{s.label}</p>
                  </div>
                  <span className="shrink-0 text-coral">
                    <s.Icon className="h-5 w-5" strokeWidth={1.9} />
                  </span>
                </div>
              </Reveal>
            ))}
          </div>

          {/* onderblok: wereldkaart (100+) + 98% foto */}
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            <Reveal>
              <div className="flex h-full flex-col rounded-3xl bg-sand p-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/stats-map.jpg" alt="Jeugdcoaches van verschillende culturen" className="w-full rounded-2xl object-contain" />
                <div className="mt-5">
                  <div className="font-sans text-[48px] font-medium leading-none tracking-[-0.02em] text-ink">100+</div>
                  <p className="mt-2 text-base leading-6 text-ink">Jeugdcoaches van verschillende culturen</p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.06}>
              <div className="relative h-full min-h-[320px] overflow-hidden rounded-3xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/stats-98.png" alt="Jongeren voelen zich geholpen" className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute bottom-6 left-6 max-w-xs rounded-2xl border border-[#222] bg-white/25 px-4 py-3 backdrop-blur-md">
                  <div className="font-sans text-[48px] font-medium leading-none tracking-[-0.02em] text-ink">98%</div>
                  <p className="mt-2 text-base leading-6 text-ink-soft">Van de jongeren voelt zich daadwerkelijk geholpen</p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────── */}
        <FaqSection />

        {/* ── BLOG ─────────────────────────────────────── */}
        <section className="border-t border-hairline bg-mist">
          <div className="mx-auto max-w-site px-6 py-20 sm:py-24">
            <Reveal>
              <span className="eyebrow text-brand">Updates</span>
              <h2 className="mt-3 text-[clamp(1.75rem,4vw,2.5rem)]">Inzichten &amp; meer</h2>
              <p className="mt-4 max-w-xl text-ink-soft">
                Jouw bron voor inspiratie, strategieën en succesverhalen.
              </p>
            </Reveal>
            <div className="mt-14 grid gap-6 sm:grid-cols-2">
              {BLOG_TEASERS.map((b, i) => (
                <Reveal key={b.slug} delay={i * 0.06}>
                  <Link
                    href={`/blog/${b.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-hairline bg-canvas transition-shadow"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={b.image}
                        alt={b.titel}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col gap-3 p-6">
                      <span className="inline-flex w-fit items-center rounded-full bg-brand px-3 py-1 text-xs font-medium text-canvas">
                        {b.categorie}
                      </span>
                      <h3 className="text-xl leading-snug">{b.titel}</h3>
                      <p className="text-sm leading-relaxed text-ink-soft">{b.excerpt}</p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
            <Reveal>
              <div className="mt-10 flex justify-center">
                <Link
                  href="/blog"
                  className="rounded-xl border border-hairline bg-canvas px-6 py-3 text-[15px] font-medium text-ink transition-colors hover:border-ink/30"
                >
                  Lees Meer
                </Link>
              </div>
            </Reveal>
          </div>
        </section>

      </main>
      {/* live: testimonials en footer zitten samen in één donker paneel */}
      <DarkPanel>
        <Testimonials />
        <Footer />
      </DarkPanel>
    </>
  );
}
