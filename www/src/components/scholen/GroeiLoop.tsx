"use client";

import { motion, useReducedMotion } from "motion/react";
import { Icon, type IconName } from "./Icon";

/* De drie fasen, NET BUITEN de ringlijn (gedeelde radius ~41%, klok-posities).
   01 boven iets ingetrokken voor bovenrand-veiligheid; 02/03 symmetrisch op de zij-radius.
   12u = Doen, 4u = Reflecteren, 8u = Groeien — met de klok mee, 01 → 02 → 03 → terug. */
const phases: {
  n: string;
  top: string;
  left: string;
  icon: IconName;
  title: string;
  sub: string;
}[] = [
  { n: "01", top: "13%", left: "50%", icon: "palette", title: "Doen", sub: "een echte activiteit" },
  { n: "02", top: "71%", left: "85%", icon: "bubble", title: "Reflecteren", sub: "samen terugkijken" },
  { n: "03", top: "71%", left: "15%", icon: "sprout", title: "Groeien", sub: "een stapje verder" },
];

/* Statische richtingspijltjes tussen de fasen, op de ring, met de klok mee.
   Altijd zichtbaar (ook bij reduced-motion) — dragen 'het loopt rond' zonder beweging. */
const ticks: { top: string; left: string; rotate: number }[] = [
  { top: "32%", left: "75%", rotate: 60 }, // tussen 01 (12u) en 02 (4u)
  { top: "84%", left: "50%", rotate: 180 }, // tussen 02 (4u) en 03 (8u), onderlangs
  { top: "32%", left: "25%", rotate: -60 }, // tussen 03 (8u) en 01 (12u)
];

export function GroeiLoop() {
  const reduce = useReducedMotion();

  return (
    <div className="mx-auto flex w-full max-w-[400px] flex-col items-center">
      <p className="sr-only">
        Een duo van vakdocent en jeugdcoach begeleidt een herhalende cyclus van doen, reflecteren en
        groeien, wat leidt tot talentontdekking.
      </p>

      {/* ── RING-ZONE ─────────────────────────────────────────────── */}
      <div className="relative aspect-square w-full">
        {/* Open hairline-ring: echt gat op 6 uur waar de lus uittreedt. */}
        <svg
          viewBox="0 0 100 100"
          className="absolute inset-[16%] h-[68%] w-[68%] overflow-visible"
          aria-hidden="true"
          fill="none"
        >
          <circle
            cx="50"
            cy="50"
            r="50"
            pathLength={100}
            stroke="var(--color-hairline)"
            strokeWidth="0.6"
            strokeLinecap="round"
            strokeDasharray="21.5 7 71.5"
          />
        </svg>

        {/* Statische richtingscue: drie hairline-pijltjes met de klok mee. */}
        {ticks.map((t, i) => (
          <span
            key={i}
            aria-hidden="true"
            className="absolute -translate-x-1/2 -translate-y-1/2 text-grey-2"
            style={{ top: t.top, left: t.left, transform: `translate(-50%,-50%) rotate(${t.rotate}deg)` }}
          >
            <Icon name="arrow" className="h-3 w-3" strokeWidth={1.7} />
          </span>
        ))}

        {/* De enige beweging: blauwe stip met de klok mee. Bij reduced-motion
            bevriest animate-orbit op 360°≡0° = 12 uur, dus de stip blijft zichtbaar. */}
        <div className="animate-orbit absolute inset-[16%]">
          <span className="absolute left-1/2 top-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand shadow-[0_0_0_4px_rgba(31,102,255,0.12)]" />
        </div>

        {/* ── HART: het duo, enige zware vorm ─────────────────────── */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="relative mx-auto flex h-16 w-[6.5rem] items-center justify-center">
            {/* Vakdocent — het vak / de activiteit */}
            <div className="grid h-16 w-16 place-items-center rounded-full bg-charcoal text-canvas">
              <Icon name="palette" className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.7} />
            </div>
            {/* Jeugdcoach — reflectie / zorg. ring-canvas = zichtbare naad → leest als TWEE. */}
            <div className="-ml-5 grid h-16 w-16 place-items-center rounded-full bg-charcoal-2 text-canvas ring-2 ring-canvas">
              <Icon name="bubble" className="h-[1.15rem] w-[1.15rem]" strokeWidth={1.7} />
            </div>
            {/* Overlap-sliver = 'samen' (enig blauw in het hart). */}
            <span
              aria-hidden="true"
              className="pointer-events-none absolute left-1/2 top-1/2 h-9 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/15 ring-1 ring-brand/30"
            />
          </div>
          <div className="eyebrow mt-2.5 text-grey-2">Het duo</div>
          <div className="mt-0.5 text-[13px] font-medium leading-tight text-ink">
            Vakdocent <span className="text-brand">&amp;</span> Jeugdcoach
          </div>
        </div>

        {/* ── DRIE FASEN: chrome-loze labels, net buiten de ring ──── */}
        {phases.map((p) => (
          <div
            key={p.n}
            className="absolute w-24 -translate-x-1/2 -translate-y-1/2 text-center"
            style={{ top: p.top, left: p.left }}
          >
            <Icon name={p.icon} className="mx-auto h-5 w-5 text-charcoal" strokeWidth={1.7} />
            <div className="eyebrow mt-1 text-grey-2">{p.n}</div>
            <div className="font-serif text-[15px] font-bold leading-tight text-ink">{p.title}</div>
            <div className="mt-0.5 hidden text-[11px] leading-tight text-grey sm:block">{p.sub}</div>
          </div>
        ))}
      </div>

      {/* ── UITLOOP-LIJN + UITKOMST ─────────────────────────────── */}
      <div className="-mt-1 h-9 w-px bg-hairline" aria-hidden="true" />
      <motion.div
        className="text-center"
        initial={reduce ? false : { opacity: 0, y: 8 }}
        whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "0px 0px -12% 0px" }}
        transition={{ duration: 0.4, ease: [0.2, 0.8, 0.2, 1], delay: 0.35 }}
      >
        <div className="eyebrow text-brand">Leidt tot</div>
        <div className="mt-1.5 inline-flex items-center gap-2 rounded-[var(--radius-pill)] border border-hairline bg-cream px-4 py-2 shadow-[var(--shadow-soft)]">
          <Icon name="sparkles" className="h-4 w-4 text-brand" strokeWidth={1.7} />
          <span className="font-serif text-[15px] font-bold text-ink">Talentontdekking</span>
        </div>
      </motion.div>
    </div>
  );
}
