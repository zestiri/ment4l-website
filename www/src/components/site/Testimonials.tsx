import { Lightbulb } from "lucide-react";
import { Reveal } from "./Reveal";
import { TESTIMONIALS } from "@/lib/site";

type Item = (typeof TESTIMONIALS)[number];

/**
 * Donkere 'Success verhalen'-sectie met een full-bleed testimonial-wall.
 * Twee rijen die in tegengestelde richting schuiven, zoals de live site:
 * rij 1 naar rechts (~25px/s), rij 2 naar links (~35px/s).
 * Kaarten zijn 528x380 met 32px tussenruimte; elk paar wordt 4x herhaald
 * zodat de baan naadloos kan loopen op translateX(-50%).
 */
function Kaart({ t, index }: { t: Item; index: number }) {
  return (
    <figure className="relative flex h-[380px] w-[528px] shrink-0 flex-col gap-5 overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-7">
      <span
        aria-hidden
        className="pointer-events-none absolute right-6 top-2 font-display text-7xl leading-none text-white/12"
      >
        &rdquo;
      </span>
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full border border-white/12 bg-white/[0.06] px-3 py-1 text-xs font-medium text-white/80">
          {t.categorie}
        </span>
        <span className="rounded-full border border-white/12 bg-white/[0.06] px-3 py-1 text-xs font-medium text-white/80">
          {t.rol}
        </span>
      </div>
      <blockquote className="relative flex-1 font-mono text-sm leading-relaxed tracking-tight text-white/75">
        {t.quote}
      </blockquote>
      <figcaption className="flex items-center gap-3">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/images/review-${index + 1}.jpg`}
          alt={t.naam}
          className="h-11 w-11 rounded-full object-cover"
        />
        <div>
          <div className="font-semibold text-white">{t.naam}</div>
          <div className="text-sm text-white/50">{t.functie}</div>
        </div>
      </figcaption>
    </figure>
  );
}

function Rij({
  items,
  animatie,
}: {
  items: { t: Item; index: number }[];
  animatie: string;
}) {
  // 4x het paar = 8 kaarten; de baan is dus 2x zo breed als één helft,
  // waardoor translateX(-50%) naadloos aansluit.
  const baan = [...items, ...items, ...items, ...items];
  return (
    <div className="overflow-hidden">
      <div className={`flex w-max gap-8 ${animatie}`}>
        {baan.map((k, i) => (
          <Kaart key={`${k.t.naam}-${i}`} t={k.t} index={k.index} />
        ))}
      </div>
    </div>
  );
}

export function Testimonials() {
  const rij1 = [0, 1].map((i) => ({ t: TESTIMONIALS[i], index: i }));
  const rij2 = [2, 3].map((i) => ({ t: TESTIMONIALS[i], index: i }));

  return (
    <section className="relative overflow-hidden bg-charcoal py-20 text-white/90 sm:py-24">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-72 bg-[radial-gradient(60%_100%_at_50%_0%,rgba(255,255,255,0.10),transparent)]"
      />
      <div className="relative">
        <Reveal>
          <div className="mx-auto max-w-2xl px-6 text-center">
            <span className="eyebrow inline-flex items-center gap-2 text-white/60">
              <Lightbulb className="h-4 w-4" strokeWidth={1.8} /> Success verhalen
            </span>
            <h2 className="mt-3 text-[clamp(1.9rem,4vw,2.75rem)] font-normal text-white">
              Echte verhalen, echte resultaten
            </h2>
            <p className="mt-4 text-white/60">
              Lees hoe gebruikers MENT4L hebben toegepast in hun leven.
            </p>
          </div>
        </Reveal>

        {/* full-bleed wall: kaarten lopen bewust door tot buiten het scherm */}
        <div className="mt-12 flex flex-col gap-8">
          <Rij items={rij1} animatie="animate-wall-ltr" />
          <Rij items={rij2} animatie="animate-wall-rtl" />
        </div>
      </div>
    </section>
  );
}
