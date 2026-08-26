import Link from "next/link";
import { Reveal } from "./Reveal";
import { AANMELD_URL } from "@/lib/site";

/** Gedeelde CTA onderaan trajecten-, blog- en over-ons-pagina's. */
export function CtaBlock() {
  return (
    <section className="mx-auto max-w-site px-6 py-20 sm:py-24">
      <Reveal>
        <div className="relative overflow-hidden rounded-[36px] bg-charcoal p-8 text-canvas sm:p-14">
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-brand/25 blur-3xl" />
          <div className="relative flex flex-col items-start gap-6">
            <span className="eyebrow text-white/60">We denken graag met je mee</span>
            <h2 className="max-w-2xl text-[clamp(1.8rem,4vw,3rem)] text-white">
              Benieuwd hoe we je kunnen helpen? Laat het ons weten
            </h2>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/contact"
                className="rounded-pill bg-brand px-7 py-3.5 text-[15px] font-semibold text-canvas transition-transform hover:-translate-y-0.5"
              >
                Stel je vraag
              </Link>
              <a
                href={AANMELD_URL}
                className="rounded-pill border border-white/25 px-7 py-3.5 text-[15px] font-semibold text-white transition-colors hover:border-white"
              >
                Direct aanmelden
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
