import type { Metadata } from "next";
import Link from "next/link";
import { PencilLine } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { ScrollProgress } from "@/components/site/ScrollProgress";
import { Reveal } from "@/components/site/Reveal";
import { CtaBlock } from "@/components/site/CtaBlock";
import { BLOG, blogHero } from "@/lib/content";

export const metadata: Metadata = {
  title: "Blog",
  description:
    "Inzichten, uitleg en praktische tips over ambulante begeleiding, jeugdcoaching en de weg naar passende hulp.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndex() {
  return (
    <>
      <ScrollProgress />
      <Nav />
      <main>
        <section className="mx-auto max-w-6xl px-6 pb-10 pt-36 sm:pt-40">
          <Reveal>
            <div className="text-center">
              <span className="inline-flex items-center justify-center gap-1.5 text-grey">
                <PencilLine className="h-4 w-4" strokeWidth={1.6} />
                <span className="eyebrow">Blog</span>
              </span>
              <h1 className="mt-3 text-[clamp(2.1rem,5vw,3.25rem)] font-normal">Laatste nieuws...</h1>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2">
            {BLOG.map((a, i) => (
              <Reveal key={a.slug} delay={(i % 4) * 0.05}>
                <Link
                  href={`/blog/${a.slug}`}
                  className="group flex h-full flex-col overflow-hidden rounded-2xl border border-hairline bg-canvas shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
                >
                  <div className="relative aspect-[16/10] overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={blogHero(a.slug)}
                      alt={a.titel}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col gap-3 p-6">
                    <span className="inline-flex w-fit items-center rounded-full bg-sand px-3 py-1 text-xs font-medium text-ink-soft">
                      {a.categorie}
                    </span>
                    <h2 className="text-xl leading-snug">{a.titel}</h2>
                    {a.intro[0] && (
                      <p className="text-sm leading-relaxed text-ink-soft">{a.intro[0]}</p>
                    )}
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>

        <CtaBlock />
      </main>
      <Footer />
    </>
  );
}
