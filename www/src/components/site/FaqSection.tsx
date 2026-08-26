import { MessageCircle } from "lucide-react";
import { Reveal } from "./Reveal";
import { Faq } from "./Faq";
import { APP_REGISTER_URL } from "@/lib/site";

/** 'Jouw vragen, beantwoord' — gedeeld door home, trajecten en blog. */
export function FaqSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
      <Reveal>
        <div className="text-center">
          <span className="inline-flex items-center justify-center gap-1.5 text-grey">
            <MessageCircle className="h-4 w-4" strokeWidth={1.6} />
            <span className="eyebrow">FAQ</span>
          </span>
          <h2 className="mt-3 text-[clamp(1.9rem,4vw,2.75rem)] font-normal">Jouw vragen, beantwoord</h2>
        </div>
      </Reveal>
      <Faq />
      <Reveal>
        <div className="mt-10 flex items-center justify-center gap-2.5">
          <a
            href={APP_REGISTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-pill bg-brand px-7 py-3.5 text-[15px] font-semibold text-canvas transition-transform hover:-translate-y-0.5"
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
    </section>
  );
}
