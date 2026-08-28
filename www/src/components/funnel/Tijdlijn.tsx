"use client";

import { motion, useReducedMotion } from "motion/react";

/**
 * De tijdlijn op de donkere band: het enige signatuurmoment van de pagina.
 *
 * De as is bewust TIJD en niet 1 tot 4. De vraag van een wachtende ouder is
 * wanneer, niet in welke volgorde. Daarmee wordt een generieke stappenlijst een
 * belofte met een klok erin.
 *
 * De lijn tekent zichzelf per segment en pas daarna verschijnt de bijbehorende
 * tijdmarkering. Alleen transform en opacity, niets boven 500ms. Bij
 * prefers-reduced-motion staat de lijn compleet getekend en zijn alle
 * markeringen meteen zichtbaar.
 */

type Stap = { tijd: string; label: string; sub?: string };

const STAPPEN: Stap[] = [
  { tijd: "Nu", label: "Je laat je nummer achter" },
  { tijd: "Binnen 4 uur", label: "Wij bellen je terug", sub: "ook 's avonds en in het weekend" },
  { tijd: "Daarna", label: "Nog geen verwijzing? Wij helpen je die te krijgen" },
  { tijd: "Binnen een week", label: "Kennismaking, zodra de verwijzing rond is" },
];

const EASE = [0.22, 1, 0.36, 1] as const;

export function Tijdlijn() {
  const reduce = useReducedMotion();

  // De lijn en de tekst delen een stagger, zodat de tekst het spoor volgt dat de
  // lijn net getrokken heeft in plaats van er los overheen te vallen.
  const container = {
    rust: {},
    beeld: { transition: { staggerChildren: 0.09 } },
  };
  const lijnX = {
    rust: { scaleX: 0 },
    beeld: { scaleX: 1, transition: { duration: 0.22, ease: EASE } },
  };
  const lijnY = {
    rust: { scaleY: 0 },
    beeld: { scaleY: 1, transition: { duration: 0.22, ease: EASE } },
  };
  const tekst = {
    rust: { opacity: 0, y: 12 },
    beeld: { opacity: 1, y: 0, transition: { duration: 0.2, ease: "easeOut" as const, delay: 0.12 } },
  };

  return (
    <motion.ol
      className="grid gap-0 sm:grid-cols-4 sm:gap-6"
      initial={reduce ? false : "rust"}
      whileInView={reduce ? undefined : "beeld"}
      viewport={{ once: true, amount: 0.3 }}
      variants={container}
    >
      {STAPPEN.map((s) => (
        <li key={s.tijd} className="relative pb-9 pl-8 last:pb-0 sm:pb-0 sm:pl-0 sm:pt-9">
          {/* Knooppunt, met een zachte brand-halo zodat het op de donkere band
              als een lichtpunt leest in plaats van een platte stip. */}
          <span
            aria-hidden
            className="absolute left-0 top-1.5 h-2.5 w-2.5 rounded-full bg-brand-2 shadow-[0_0_0_4px_rgba(77,133,255,0.16)] sm:left-0 sm:top-0"
          />

          {/* Verbindingslijn: verticaal op mobiel, horizontaal vanaf sm.
              Twee elementen, want je kunt niet per breekpunt van transform wisselen. */}
          <motion.span
            aria-hidden
            variants={reduce ? undefined : lijnY}
            style={{ transformOrigin: "top" }}
            className="absolute left-[4px] top-1.5 h-full w-[2px] origin-top bg-brand-2/35 sm:hidden"
          />
          <motion.span
            aria-hidden
            variants={reduce ? undefined : lijnX}
            style={{ transformOrigin: "left" }}
            className="absolute left-0 top-[4px] hidden h-[2px] w-full origin-left bg-brand-2/35 sm:block"
          />

          <motion.div variants={reduce ? undefined : tekst}>
            <span className="block font-sans text-[clamp(1.6rem,5vw,2.4rem)] font-semibold leading-none tracking-[-0.03em] text-brand-2">
              {s.tijd}
            </span>
            <span className="mt-3 block text-[16px] leading-6 text-white">{s.label}</span>
            {s.sub && <span className="mt-1 block text-sm text-white/70">{s.sub}</span>}
          </motion.div>
        </li>
      ))}
    </motion.ol>
  );
}
