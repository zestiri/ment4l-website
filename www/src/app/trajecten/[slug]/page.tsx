import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Phone, ArrowRight } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { DarkPanel } from "@/components/site/DarkPanel";
import { Reveal } from "@/components/site/Reveal";
import { FaqSection } from "@/components/site/FaqSection";
import { CtaBlock } from "@/components/site/CtaBlock";
import { Testimonials } from "@/components/site/Testimonials";
import { Werkwijze } from "@/components/traject/Werkwijze";
import { TRAJECT_PAGINAS, getTrajectPagina, trajectHero } from "@/lib/content";
import { AANMELD_URL, CONTACT } from "@/lib/site";

import { CheckBullet } from "@/components/site/IconBadge";
export const dynamicParams = false;

export function generateStaticParams() {
  return TRAJECT_PAGINAS.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const t = getTrajectPagina(slug);
  if (!t) return { title: "Niet gevonden" };
  return {
    title: t.pageTitle || t.titel,
    description: t.description ?? undefined,
    alternates: { canonical: `/trajecten/${slug}` },
  };
}

export default async function TrajectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const t = getTrajectPagina(slug);
  if (!t) notFound();

  const anderen = TRAJECT_PAGINAS.filter((x) => x.slug !== t.slug);
  const spoed = t.slug === "ambulante-spoedhulp";

  return (
    <>
      <Nav />
      <main>
        {/* ── HERO — editoriale split: verhaal links, beeld rechts ─────────── */}
        <section className="mx-auto max-w-site px-6 pt-36 sm:pt-40">
          <div className="grid items-center gap-10 md:grid-cols-[1fr_minmax(0,45%)] md:gap-14">
            <Reveal>
              <div>
                <h1 className="text-[clamp(2.2rem,5.2vw,3.4rem)]">{t.titel}</h1>
                {t.tagline && (
                  <p className="mt-5 max-w-[46ch] text-lg leading-relaxed text-ink-soft">{t.tagline}</p>
                )}
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <a
                    href={AANMELD_URL}
                    className="rounded-pill bg-brand px-7 py-3.5 text-[15px] font-semibold text-canvas shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-0.5"
                  >
                    Direct aanmelden
                  </a>
                  <a
                    href={CONTACT.phoneHref}
                    className="inline-flex items-center gap-2 rounded-pill border border-hairline bg-canvas px-6 py-3.5 text-[15px] font-semibold text-ink transition-colors hover:border-ink"
                  >
                    <Phone className="h-4 w-4 text-brand" strokeWidth={2} />
                    Bel {CONTACT.phone}
                  </a>
                </div>
                <p className="mt-6 text-sm text-grey">
                  SKJ-geregistreerde jeugdprofessionals · actief in West-Brabant
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="overflow-hidden rounded-[28px] shadow-[var(--shadow-framer-md)]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={trajectHero(t.slug)}
                  alt={t.titel}
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>
            </Reveal>
          </div>

          {/* Spoedtraject: directe belroute naar ons eigen nummer. */}
          {spoed && (
            <Reveal delay={0.06}>
              <a
                href={CONTACT.phoneHref}
                className="mt-10 flex items-center gap-4 rounded-2xl border border-coral/30 bg-coral/[0.06] p-5 transition-colors hover:border-coral/60"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-coral text-canvas">
                  <Phone className="h-5 w-5" strokeWidth={2} />
                </span>
                <span>
                  <span className="block font-semibold text-ink">Is er nú een crisis? Bel {CONTACT.phone}</span>
                  <span className="mt-0.5 block text-sm text-ink-soft">
                    We zijn 24/7 bereikbaar en schakelen vrijwel direct.
                  </span>
                </span>
              </a>
            </Reveal>
          )}
        </section>

        {/* ── WAT WE DOEN — verhaal + voordelen-paneel ─────────────────────── */}
        {t.samenvatting.length > 0 && (
          <section className="mx-auto max-w-site px-6 py-20 sm:py-24">
            <div className="grid gap-12 md:grid-cols-[1fr_minmax(0,38%)] md:gap-16">
              <Reveal>
                <div>
                  <h2 className="text-[clamp(1.8rem,4vw,2.6rem)]">Wat we doen</h2>
                  <div className="mt-6 flex flex-col gap-5 text-[1.0625rem] leading-relaxed text-ink-soft">
                    {t.samenvatting.map((p, i) => (
                      <p key={i} className="max-w-[68ch]">
                        {p}
                      </p>
                    ))}
                  </div>
                  <a
                    href={AANMELD_URL}
                    className="mt-8 inline-flex items-center gap-2 rounded-pill bg-brand px-7 py-3.5 text-[15px] font-semibold text-canvas transition-transform hover:-translate-y-0.5"
                  >
                    Direct aanmelden
                    <ArrowRight className="h-4 w-4" strokeWidth={2.2} />
                  </a>
                </div>
              </Reveal>

              {t.voordelen.length > 0 && (
                <Reveal delay={0.08}>
                  <div className="rounded-[28px] border border-hairline bg-mist p-7 shadow-[var(--shadow-framer-sm)] sm:p-8">
                    <h3 className="font-display text-xl">Waarom MENT4L</h3>
                    <ul className="mt-6 flex flex-col gap-4">
                      {t.voordelen.map((v) => (
                        <li key={v} className="flex items-start gap-3">
                          <CheckBullet className="mt-0.5" />
                          <span className="text-ink">{v}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Reveal>
              )}
            </div>
          </section>
        )}

        {/* ── ZO WERKT HET — geanimeerde procestijdlijn (authored moment) ──── */}
        {t.werkwijze.length > 0 && (
          <section className="border-y border-hairline bg-mist">
            <div className="mx-auto max-w-site px-6 py-20 sm:py-24">
              <Reveal>
                <h2 className="max-w-[20ch] text-[clamp(1.8rem,4vw,2.6rem)]">Zo werkt het, stap voor stap</h2>
              </Reveal>
              <Werkwijze stappen={t.werkwijze} />
            </div>
          </section>
        )}

        <FaqSection />
        <CtaBlock />

        {/* ── ANDER AANBOD ─────────────────────────────────────────────────── */}
        <section className="mx-auto max-w-site px-6 py-20 sm:py-24">
          <Reveal>
            <h2 className="text-2xl">Ander aanbod</h2>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {anderen.map((a, i) => (
              <Reveal key={a.slug} delay={i * 0.05}>
                <Link
                  href={`/trajecten/${a.slug}`}
                  className="group relative flex aspect-[4/3] flex-col justify-end overflow-hidden rounded-2xl"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={trajectHero(a.slug)}
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />
                  <div className="relative flex items-end justify-between gap-3 p-5">
                    <span className="font-display text-base font-bold leading-tight text-white">{a.titel}</span>
                    <ArrowRight
                      className="h-5 w-5 shrink-0 translate-x-0 text-white/80 transition-transform duration-300 group-hover:translate-x-1"
                      strokeWidth={2}
                    />
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      </main>
      <DarkPanel>
        <Testimonials />
        <Footer />
      </DarkPanel>
    </>
  );
}
