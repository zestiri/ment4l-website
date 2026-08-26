import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Check } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { ScrollProgress } from "@/components/site/ScrollProgress";
import { Reveal } from "@/components/site/Reveal";
import { FaqSection } from "@/components/site/FaqSection";
import { CtaBlock } from "@/components/site/CtaBlock";
import { Testimonials } from "@/components/site/Testimonials";
import { TRAJECT_PAGINAS, getTrajectPagina, trajectHero } from "@/lib/content";
import { APP_REGISTER_URL } from "@/lib/site";

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

  return (
    <>
      <ScrollProgress />
      <Nav />
      <main>
        {/* ── HERO ─────────────────────────────────────── */}
        <section className="mx-auto max-w-6xl px-6 pt-36 sm:pt-40">
          <Reveal>
            <div className="text-center">
              {t.eyebrow && (
                <span className="inline-flex rounded-pill bg-brand px-4 py-1.5 text-sm font-semibold text-canvas">
                  {t.eyebrow}
                </span>
              )}
              <h1 className="mt-6 text-[clamp(2.1rem,5vw,3.75rem)] font-normal">{t.titel}</h1>
              {t.tagline && <p className="mt-4 text-ink-soft">{t.tagline}</p>}
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10 overflow-hidden rounded-3xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={trajectHero(t.slug)}
                alt={t.titel}
                className="aspect-[16/9] w-full object-cover"
              />
            </div>
          </Reveal>
        </section>

        {/* ── SAMENVATTING ─────────────────────────────── */}
        {t.samenvatting.length > 0 && (
          <section className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
            <div className="grid gap-10 md:grid-cols-[0.85fr_1.15fr] md:gap-14">
              <Reveal>
                <div className="overflow-hidden rounded-3xl">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={trajectHero(t.slug)}
                    alt=""
                    className="aspect-[4/5] w-full object-cover"
                  />
                </div>
              </Reveal>
              <Reveal delay={0.06}>
                <h2 className="text-[clamp(1.9rem,4vw,2.75rem)] font-normal">Samenvatting</h2>
                <div className="mt-5 flex flex-col gap-4 text-ink-soft">
                  {t.samenvatting.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>
                {t.subkop && (
                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <span className="font-display text-lg">{t.subkop}</span>
                    <a
                      href={APP_REGISTER_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-pill bg-brand px-6 py-3 text-[15px] font-semibold text-canvas transition-transform hover:-translate-y-0.5"
                    >
                      Direct aanmelden ↗
                    </a>
                  </div>
                )}
              </Reveal>
            </div>
          </section>
        )}

        {/* ── VOORDELEN ────────────────────────────────── */}
        {t.voordelen.length > 0 && (
          <section className="border-y border-hairline bg-mist">
            <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
              <Reveal>
                <h2 className="text-[clamp(1.9rem,4vw,2.75rem)] font-normal">Voordelen</h2>
              </Reveal>
              <div className="mt-10 grid gap-4 sm:grid-cols-2">
                {t.voordelen.map((v, i) => (
                  <Reveal key={v} delay={i * 0.05}>
                    <div className="flex h-full items-start gap-3 rounded-2xl border border-hairline bg-canvas p-6">
                      <span className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-brand/10 text-brand">
                        <Check className="h-3.5 w-3.5" strokeWidth={2.5} />
                      </span>
                      <span className="text-ink">{v}</span>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* ── WERKWIJZE ────────────────────────────────── */}
        {t.werkwijze.length > 0 && (
          <section className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
            <Reveal>
              <h2 className="text-[clamp(1.9rem,4vw,2.75rem)] font-normal">Werkwijze</h2>
            </Reveal>
            <div className="mt-10 flex flex-col gap-4">
              {t.werkwijze.map((w, i) => (
                <Reveal key={w.titel || i} delay={i * 0.04}>
                  <div className="grid gap-4 rounded-3xl border border-hairline bg-canvas p-7 sm:grid-cols-[auto_1fr] sm:gap-7">
                    <span className="font-display text-3xl font-bold leading-none text-brand">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      {w.titel && <h3 className="text-xl leading-snug">{w.titel}</h3>}
                      <p className="mt-2 text-ink-soft">{w.tekst}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </section>
        )}

        <FaqSection />
        <CtaBlock />
        <Testimonials />

        {/* ── ANDERE TRAJECTEN ─────────────────────────── */}
        <section className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
          <Reveal>
            <h2 className="text-2xl font-normal">Andere trajecten</h2>
          </Reveal>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {anderen.map((a, i) => (
              <Reveal key={a.slug} delay={i * 0.05}>
                <Link
                  href={`/trajecten/${a.slug}`}
                  className="group relative flex aspect-[4/3] flex-col justify-end overflow-hidden rounded-2xl"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={trajectHero(a.slug)}
                    alt={a.titel}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent" />
                  <span className="relative p-5 font-display text-base font-bold leading-tight text-white">
                    {a.titel}
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
