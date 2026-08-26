import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { DarkPanel } from "@/components/site/DarkPanel";
import { Reveal } from "@/components/site/Reveal";
import { FaqSection } from "@/components/site/FaqSection";
import { CtaBlock } from "@/components/site/CtaBlock";
import { BLOG, getArtikel, blogHero } from "@/lib/content";

export const dynamicParams = false;

export function generateStaticParams() {
  return BLOG.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const a = getArtikel(slug);
  if (!a) return { title: "Niet gevonden" };
  return {
    title: a.pageTitle || a.titel,
    description: a.intro[0] ?? a.description ?? undefined,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: { type: "article", title: a.titel, images: [blogHero(slug)] },
  };
}

export default async function BlogArtikelPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const a = getArtikel(slug);
  if (!a) notFound();

  const anderen = BLOG.filter((x) => x.slug !== a.slug).slice(0, 3);

  return (
    <>
      <Nav />
      <main>
        <article className="mx-auto max-w-[808px] px-6 pt-36 sm:pt-40">
          <Reveal>
            <span className="inline-flex rounded-full bg-sand px-3 py-1 text-sm font-medium text-ink-soft">
              {a.categorie}
            </span>
            <h1 className="mt-5 text-[clamp(2rem,4.6vw,2.5rem)]">{a.titel}</h1>
            <hr className="mt-8 border-t border-dashed border-hairline" />
          </Reveal>

          <Reveal delay={0.06}>
            <div className="mt-8 overflow-hidden rounded-2xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={blogHero(a.slug)}
                alt={a.titel}
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mt-8 flex flex-col gap-4 text-[17px] leading-relaxed text-ink-soft">
              {a.intro.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          </Reveal>

          <div className="mt-10 flex flex-col gap-8">
            {a.secties.map((s, i) => (
              <Reveal key={`${s.kop}-${i}`}>
                <section>
                  {s.level === "h3" ? (
                    <h3 className="text-xl leading-snug">{s.kop}</h3>
                  ) : (
                    <h2 className="text-[clamp(1.4rem,2.8vw,1.85rem)] leading-snug">
                      {s.kop}
                    </h2>
                  )}
                  <div className="mt-3 flex flex-col gap-4 text-[17px] leading-relaxed text-ink-soft">
                    {s.alineas.map((p, j) => (
                      <p key={j}>{p}</p>
                    ))}
                  </div>
                </section>
              </Reveal>
            ))}
          </div>
        </article>

        {/* ── MEER LEZEN ───────────────────────────────── */}
        <section className="mx-auto max-w-site px-6 pt-20">
          <Reveal>
            <h2 className="text-2xl">Meer lezen</h2>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {anderen.map((o, i) => (
              <Reveal key={o.slug} delay={i * 0.05}>
                <Link
                  href={`/blog/${o.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-hairline bg-canvas transition-shadow"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={blogHero(o.slug)}
                      alt={o.titel}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-2 p-5">
                    <span className="eyebrow text-grey">{o.categorie}</span>
                    <h3 className="text-lg leading-snug">{o.titel}</h3>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        <FaqSection />
        <CtaBlock />
      </main>
      <DarkPanel>
        <Footer />
      </DarkPanel>
    </>
  );
}
