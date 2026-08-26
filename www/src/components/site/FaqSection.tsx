import { MessageCircle } from "lucide-react";
import { Reveal } from "./Reveal";
import { Faq } from "./Faq";
import { AANMELD_URL } from "@/lib/site";

/** 'Jouw vragen, beantwoord' — gedeeld door home, trajecten en blog. */
export function FaqSection() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      {/* ruitjespapier-textuur, zoals de live FAQ-zone */}
      <div aria-hidden className="tex-grid pointer-events-none absolute inset-0" />
      <div className="relative mx-auto max-w-site px-6">
      <Reveal>
        <div className="text-center">
          <span className="inline-flex items-center justify-center gap-1.5 text-grey">
            <MessageCircle className="h-4 w-4" strokeWidth={1.6} />
            <span className="eyebrow">FAQ</span>
          </span>
          <h2 className="mt-3 text-[clamp(1.75rem,4vw,2.5rem)]">Jouw vragen, beantwoord</h2>
        </div>
      </Reveal>
      <Faq />
      <Reveal>
        <div className="mt-10 flex items-center justify-center gap-2.5">
          <a
            href={AANMELD_URL}
            className="rounded-pill bg-brand px-7 py-3.5 text-[15px] font-semibold text-canvas transition-transform hover:-translate-y-0.5"
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
      </div>
    </section>
  );
}
