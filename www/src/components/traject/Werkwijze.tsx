"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";

type Stap = { titel?: string; tekst: string };

/**
 * De werkwijze als verticale procestijdlijn — het authored motion-moment van de
 * aanbodpagina. Eén accentlijn die MET de scroll meetekent (scrubbed), plus
 * stappen die gestaffeld binnenkomen. Bewust NIET dezelfde Reveal als elke andere
 * sectie: dit is het moment dat de pagina draagt.
 *
 * Alleen gebruikt door de /trajecten/[slug]-template, dus raakt geen enkele
 * gedeelde of geadverteerde pagina.
 */
export function Werkwijze({ stappen }: { stappen: Stap[] }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLOListElement>(null);
  // De lijn tekent van boven naar beneden terwijl de lijst door het beeld schuift.
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 62%", "end 58%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <ol ref={ref} className="relative mt-14 flex flex-col gap-9 sm:gap-11">
      {/* Rail: hairline-basis + brand-lijn die met de scroll groeit. Loopt door het
          midden van de nummerbadges (h-11 → 22px, sm h-[52px] → 26px). */}
      <span aria-hidden className="absolute bottom-6 left-[22px] top-6 w-px bg-hairline sm:left-[26px]" />
      <motion.span
        aria-hidden
        className="absolute bottom-6 left-[22px] top-6 w-px origin-top bg-brand sm:left-[26px]"
        style={{ scaleY: reduce ? 1 : lineScale }}
      />
      {stappen.map((w, i) => (
        <motion.li
          key={w.titel || i}
          className="relative grid grid-cols-[44px_1fr] gap-5 sm:grid-cols-[52px_1fr] sm:gap-7"
          initial={reduce ? false : { opacity: 0, y: 22 }}
          whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "0px 0px -12% 0px" }}
          transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <span className="relative z-10 grid h-11 w-11 place-items-center rounded-full bg-brand font-display text-lg text-canvas shadow-[var(--shadow-framer-sm)] sm:h-[52px] sm:w-[52px] sm:text-xl">
            {i + 1}
          </span>
          <div className="min-w-0 pt-1.5">
            {w.titel && <h3 className="text-xl leading-snug sm:text-[1.375rem]">{w.titel}</h3>}
            <p className="mt-2 max-w-[62ch] text-ink-soft">{w.tekst}</p>
          </div>
        </motion.li>
      ))}
    </ol>
  );
}
