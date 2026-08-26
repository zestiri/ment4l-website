import Link from "next/link";
import { TrendingUp, GraduationCap, ClipboardCheck, Star, BarChart3, ArrowUpRight } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { ScrollProgress } from "@/components/site/ScrollProgress";
import { Reveal } from "@/components/site/Reveal";
import { FaqSection } from "@/components/site/FaqSection";
import { Testimonials } from "@/components/site/Testimonials";
import {
  TRAJECTEN,
  BLOG_TEASERS,
  HERO_AVATARS,
  PARTNER_LOGOS,
  APP_REGISTER_URL,
} from "@/lib/site";

const STAT_CARDS: { waarde: string; label: string; Icon: LucideIcon }[] = [
  { waarde: "54", label: "Workshops op scholen gegeven door onze professionals", Icon: GraduationCap },
  { waarde: "100+", label: "Gezinnen geholpen die zichzelf in een crisissituatie bevonden", Icon: ClipboardCheck },
  { waarde: "4.9/5", label: "Waardering gebaseerd op ervaringen", Icon: Star },
  { waarde: "98%", label: "Aanmeldingen verwerken wij binnen 1 dag", Icon: BarChart3 },
];

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Nav />
      <main>
        {/* ── HERO ─────────────────────────────────────── */}
        <section className="relative overflow-hidden">
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-brand/[0.04] to-transparent" aria-hidden />
          <div className="relative mx-auto flex max-w-4xl flex-col items-center px-6 pb-20 pt-36 text-center sm:pt-44">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-hairline bg-canvas px-3.5 py-1.5 text-sm font-medium text-ink-soft shadow-[var(--shadow-soft)]">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500/60" />
                  <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
                </span>
                24/7 Bereikbaar
              </span>
            </Reveal>
            <Reveal delay={0.06}>
              <h1 className="mt-8 text-[clamp(2.3rem,5.2vw,4.15rem)] leading-[1.06]">
                Ambulante (spoed) Hulp
                <br />
                <span className="inline-flex items-center gap-3">
                  Jeugd
                  <span className="inline-grid h-[0.82em] w-[0.82em] place-items-center rounded-[0.26em] bg-sand text-brand">
                    <TrendingUp className="h-1/2 w-1/2" strokeWidth={2.2} />
                  </span>
                  Coaching
                </span>
              </h1>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="mt-9 flex items-center justify-center gap-2.5">
                <a
                  href={APP_REGISTER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-pill bg-brand px-7 py-3.5 text-[15px] font-semibold text-canvas shadow-[0_12px_26px_rgba(31,102,255,0.28)] transition-transform hover:-translate-y-0.5"
                >
                  Direct Aanmelden
                </a>
                <a
                  href={APP_REGISTER_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Direct aanmelden"
                  className="grid h-12 w-12 place-items-center rounded-full bg-brand text-lg text-canvas transition-transform hover:-translate-y-0.5"
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
        </section>

        {/* ── PARTNERS ─────────────────────────────────── */}
        <section className="border-y border-hairline bg-mist">
          <div className="mx-auto max-w-6xl px-6 py-10">
            <p className="eyebrow text-center text-grey">Onze samenwerkingen</p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
              {PARTNER_LOGOS.map((src) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  key={src}
                  src={src}
                  alt="Samenwerkingspartner"
                  className="h-8 w-auto object-contain sm:h-10"
                />
              ))}
            </div>
          </div>
        </section>

        {/* ── EXPERTISES ───────────────────────────────── */}
        <section id="expertises" className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
          <Reveal>
            <div className="text-center">
              <span className="eyebrow text-brand">Trajecten</span>
              <h2 className="mt-3 text-[clamp(1.9rem,4vw,2.75rem)]">
                Expertises op gebied van jeugdcoaching
              </h2>
            </div>
          </Reveal>

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
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
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-transparent" />
                  <span className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-white text-ink shadow-md transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                    <ArrowUpRight className="h-5 w-5" strokeWidth={2} />
                  </span>
                  <div className="relative p-7">
                    <h3 className="text-2xl font-bold leading-tight text-white">{t.naam}</h3>
                    <p className="mt-1.5 text-sm text-white/85">{t.tagline}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        {/* ── CIJFERS (bento) ──────────────────────────── */}
        <section className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
          <Reveal>
            <h2 className="text-[clamp(1.9rem,4vw,2.75rem)]">Uw zorg, onze taak</h2>
            <p className="mt-2 text-lg text-ink-soft">wij staan voor groei &amp; vooruitgang</p>
          </Reveal>

          {/* bovenblok: foto-kaart (10+) + 2x2 stat-grid */}
          <div className="mt-10 grid gap-4 lg:grid-cols-3">
            <Reveal className="lg:row-span-2">
              <div className="relative h-full min-h-[280px] overflow-hidden rounded-3xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/stats-ervaring.png" alt="Jaren ervaring" className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/55 to-transparent p-6">
                  <div className="font-display text-4xl font-extrabold text-white">10+</div>
                  <div className="text-sm text-white/90">Jaren ervaring</div>
                </div>
              </div>
            </Reveal>
            {STAT_CARDS.map((s, i) => (
              <Reveal key={s.label} delay={i * 0.05}>
                <div className="flex h-full items-start justify-between gap-4 rounded-3xl border border-hairline bg-canvas p-6">
                  <div>
                    <div className="font-display text-4xl font-extrabold text-ink">{s.waarde}</div>
                    <p className="mt-2 text-sm text-ink-soft">{s.label}</p>
                  </div>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-coral/10 text-coral">
                    <s.Icon className="h-5 w-5" strokeWidth={1.9} />
                  </span>
                </div>
              </Reveal>
            ))}
          </div>

          {/* onderblok: wereldkaart (100+) + 98% foto */}
          <div className="mt-4 grid gap-4 lg:grid-cols-2">
            <Reveal>
              <div className="flex h-full flex-col rounded-3xl border border-hairline bg-mist p-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/stats-map.jpg" alt="Jeugdcoaches van verschillende culturen" className="w-full rounded-2xl object-contain" />
                <div className="mt-5">
                  <div className="font-display text-4xl font-extrabold text-ink">100+</div>
                  <p className="mt-1 text-sm text-ink-soft">Jeugdcoaches van verschillende culturen</p>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.06}>
              <div className="relative h-full min-h-[320px] overflow-hidden rounded-3xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/images/stats-98.png" alt="Jongeren voelen zich geholpen" className="absolute inset-0 h-full w-full object-cover" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-6">
                  <div className="font-display text-5xl font-extrabold text-white">98%</div>
                  <p className="mt-1 max-w-xs text-white/90">Van de jongeren voelt zich daadwerkelijk geholpen</p>
                </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── FAQ ──────────────────────────────────────── */}
        <FaqSection />

        {/* ── BLOG ─────────────────────────────────────── */}
        <section className="border-t border-hairline bg-mist">
          <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
            <Reveal>
              <span className="eyebrow text-brand">Updates</span>
              <h2 className="mt-3 text-[clamp(1.9rem,4vw,2.75rem)]">Inzichten &amp; meer</h2>
              <p className="mt-4 max-w-xl text-ink-soft">
                Jouw bron voor inspiratie, strategieën en succesverhalen.
              </p>
            </Reveal>
            <div className="mt-10 grid gap-5 sm:grid-cols-2">
              {BLOG_TEASERS.map((b, i) => (
                <Reveal key={b.slug} delay={i * 0.06}>
                  <Link
                    href={`/blog/${b.slug}`}
                    className="group flex h-full flex-col overflow-hidden rounded-2xl border border-hairline bg-canvas transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
                  >
                    <div className="relative aspect-[16/10] overflow-hidden">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={b.image}
                        alt={b.titel}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
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

        {/* ── TESTIMONIALS (donker) ────────────────────── */}
        <Testimonials />

      </main>
      <Footer />
    </>
  );
}
