"use client";

import Link from "next/link";
import { useCallback, useEffect, useState, type CSSProperties } from "react";
import useEmblaCarousel from "embla-carousel-react";
import type { Categorie } from "@/lib/programmas";
import { Reveal } from "./Reveal";
import { Photo } from "./Photo";
import { Icon, type IconName } from "./Icon";

function CategorieKaart({ c }: { c: Categorie }) {
  return (
    <Link
      href={`/scholen/programma/${c.slug}`}
      style={{ "--cat": c.accent } as CSSProperties}
      className="group flex h-full flex-col overflow-hidden rounded-[26px] border border-hairline bg-canvas transition-all duration-300 ease-out hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
    >
      <div className="relative">
        <Photo
          src={c.image}
          alt={`Kinderen tijdens ${c.naam}`}
          accent={c.accent}
          icon={<Icon name={c.iconName as IconName} className="h-9 w-9" strokeWidth={1.6} />}
          rounded="rounded-none"
          sizes="(max-width: 640px) 86vw, (max-width: 1024px) 48vw, 32vw"
          className="aspect-[4/3] w-full"
        />
        {/* subtiel merkje: helder glas, alleen het icoon draagt de categoriekleur */}
        <span
          className="absolute right-3.5 top-3.5 grid h-10 w-10 place-items-center rounded-full bg-canvas/90 shadow-[var(--shadow-soft)] ring-1 ring-black/[0.04] backdrop-blur-md"
          style={{ color: c.accent }}
        >
          <Icon name={c.iconName as IconName} className="h-[18px] w-[18px]" strokeWidth={1.8} />
        </span>
        {/* accentlijn verschijnt subtiel bij hover (micro-interactie) */}
        <span
          className="absolute inset-x-0 bottom-0 h-[3px] origin-left scale-x-0 transition-transform duration-300 ease-out group-hover:scale-x-100"
          style={{ backgroundColor: c.accent }}
        />
      </div>
      <div className="flex flex-1 flex-col p-6 sm:p-7">
        <div className="flex items-center gap-2.5">
          <span className="h-2 w-2 shrink-0 rounded-full" style={{ backgroundColor: c.accent }} />
          <h3 className="text-2xl">{c.naam}</h3>
        </div>
        <p className="mt-2.5 text-sm leading-relaxed text-ink-soft">{c.kort}</p>
        <div className="mt-4 flex flex-wrap gap-1.5">
          {c.themas.map((t) => (
            <span
              key={t.naam}
              className="rounded-full bg-mist px-2.5 py-1 text-xs font-medium text-ink-soft"
            >
              {t.naam}
            </span>
          ))}
        </div>
        <div className="mt-auto flex items-center justify-between pt-6">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-grey">
            4 thema&apos;s
          </span>
          <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-ink">
            Bekijk
            <span
              className="transition-transform duration-300 group-hover:translate-x-1"
              style={{ color: c.accent }}
            >
              →
            </span>
          </span>
        </div>
      </div>
    </Link>
  );
}

// Volgorde in de carrousel: Wereldkeuken, Muziek & dans, AI & Tech, Sport
const VOLGORDE = ["wereldkeuken", "muziek-dans", "ai-tech", "sport"];

export function Aanbod({ categorieen }: { categorieen: Categorie[] }) {
  const cats = [...categorieen].sort(
    (a, b) => VOLGORDE.indexOf(a.slug) - VOLGORDE.indexOf(b.slug),
  );
  const [emblaRef, emblaApi] = useEmblaCarousel({ align: "start", loop: false, containScroll: "trimSnaps" });
  const [selected, setSelected] = useState(0);
  const [snaps, setSnaps] = useState<number[]>([]);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelected(emblaApi.selectedScrollSnap());
    setCanPrev(emblaApi.canScrollPrev());
    setCanNext(emblaApi.canScrollNext());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    setSnaps(emblaApi.scrollSnapList());
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  const arrow =
    "grid h-10 w-10 place-items-center rounded-full border border-hairline bg-canvas text-lg text-ink transition-colors hover:border-ink disabled:cursor-default disabled:opacity-30 disabled:hover:border-hairline";

  return (
    <section id="aanbod" className="bg-mist py-24 sm:py-28">
      <div className="mx-auto max-w-6xl px-6">
        <Reveal>
          <div className="flex items-end justify-between gap-6">
            <div>
              <span className="eyebrow text-brand">Het aanbod</span>
              <h2 className="mt-3 text-[clamp(2rem,4.5vw,3.25rem)]">
                Vier richtingen, één methode
              </h2>
              <p className="mt-4 max-w-xl text-ink-soft">
                Kies een richting die je leerlingen leuk vinden. Elke richting heeft
                vier thema&apos;s om uit te kiezen.
              </p>
            </div>
            {/* pijlen, desktop */}
            <div className="hidden shrink-0 gap-2 sm:flex">
              <button type="button" onClick={() => emblaApi?.scrollPrev()} disabled={!canPrev} aria-label="Vorige" className={arrow}>
                ←
              </button>
              <button type="button" onClick={() => emblaApi?.scrollNext()} disabled={!canNext} aria-label="Volgende" className={arrow}>
                →
              </button>
            </div>
          </div>
        </Reveal>

        {/* carrousel */}
        <div className="mt-10 overflow-hidden" ref={emblaRef}>
          <div className="flex gap-5">
            {cats.map((c) => (
              <div
                key={c.slug}
                className="min-w-0 flex-[0_0_86%] sm:flex-[0_0_48%] lg:flex-[0_0_28%]"
              >
                <CategorieKaart c={c} />
              </div>
            ))}
          </div>
        </div>

        {/* dots */}
        <div className="mt-7 flex items-center justify-center gap-2 sm:justify-start">
          {snaps.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => emblaApi?.scrollTo(i)}
              aria-label={`Ga naar kaart ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                i === selected ? "w-6 bg-ink" : "w-2 bg-ink/25 hover:bg-ink/40"
              }`}
            />
          ))}
        </div>

        {/* Kwaliteit-teaser */}
        <Reveal delay={0.1}>
          <Link
            href="/scholen/professionals"
            className="group mt-8 flex items-center gap-5 overflow-hidden rounded-[28px] border border-hairline bg-canvas p-5 transition-all hover:-translate-y-1 hover:shadow-[var(--shadow-soft)] sm:gap-7 sm:p-6"
          >
            <Photo
              src="/images/scholen/professional-hero.png"
              alt="Een ment4l jeugdcoach"
              accent="#1F66FF"
              icon={<Icon name="compass" className="h-7 w-7" strokeWidth={1.6} />}
              rounded="rounded-2xl"
              sizes="160px"
              className="hidden h-28 w-28 shrink-0 sm:block"
            />
            <div className="flex-1">
              <span className="eyebrow text-brand">Onze professionals</span>
              <h3 className="mt-1.5 font-serif text-xl leading-tight">
                Benieuwd wie het geeft?
              </h3>
              <p className="mt-1 text-sm text-ink-soft">
                Lees over onze coaches en hoe we kwaliteit en veiligheid borgen.
              </p>
            </div>
            <span className="text-brand transition-transform group-hover:translate-x-1">→</span>
          </Link>
        </Reveal>
      </div>
    </section>
  );
}
