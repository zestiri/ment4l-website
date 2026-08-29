"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Icon, type IconName } from "./Icon";

type Step = {
  nr: number;
  fase: string;
  thema: string;
  uitleg: string;
};

const ICONS: Record<number, IconName> = {
  1: "bubble",
  2: "sparkles",
  3: "palette",
  4: "loop",
  5: "bolt",
  6: "target",
  7: "medal",
};

export function BlokReis({ steps, accent }: { steps: readonly Step[]; accent: string }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const count = steps.length;

  // doorlopende cyclus: de reis loopt vanzelf door (pauzeert bij hover/focus)
  useEffect(() => {
    if (paused || reduce) return;
    const t = setInterval(() => setActive((a) => (a + 1) % count), 3200);
    return () => clearInterval(t);
  }, [paused, reduce, count]);

  const step = steps[active];
  const progress = count > 1 ? (active / (count - 1)) * 100 : 0;

  return (
    <div
      className="mt-8"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
    >
      <p className="mb-7 text-sm text-grey">
        Tik op een les om te zien wat erin gebeurt. De reis loopt vanzelf door.
      </p>

      {/* TRACK + NODES */}
      <div className="relative px-1">
        {/* basislijn */}
        <div className="absolute inset-x-1 top-5 h-0.5 -translate-y-1/2 rounded-full bg-hairline" />
        {/* voortgang */}
        <motion.div
          className="absolute left-1 top-5 h-0.5 -translate-y-1/2 rounded-full"
          style={{ backgroundColor: accent }}
          animate={{ width: `calc(${progress}% - 0.5rem)` }}
          transition={{ type: "spring", stiffness: 120, damping: 20 }}
        />
        {/* doorlopende puls langs de lijn (visuele ondersteuning) */}
        {!reduce && (
          <motion.span
            aria-hidden
            className="absolute top-5 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ backgroundColor: accent, boxShadow: `0 0 0 4px ${accent}22` }}
            animate={{ left: ["2%", "98%"] }}
            transition={{ duration: 3.2, ease: "easeInOut", repeat: Infinity, repeatType: "reverse" }}
          />
        )}

        {/* knooppunten */}
        <div className="relative flex justify-between gap-1">
          {steps.map((s, i) => {
            const isActive = i === active;
            const reached = i <= active;
            return (
              <button
                key={s.nr}
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Les ${s.nr}: ${s.fase}`}
                aria-current={isActive}
                className="group flex flex-col items-center gap-2 rounded-lg outline-none"
              >
                <span
                  className="relative grid h-10 w-10 place-items-center rounded-full border-2 bg-canvas font-serif text-sm font-bold transition-colors duration-300"
                  style={
                    reached
                      ? { backgroundColor: accent, borderColor: accent, color: "#fff" }
                      : { borderColor: "var(--color-hairline)", color: "var(--color-grey)" }
                  }
                >
                  {s.nr}
                  {isActive && !reduce && (
                    <motion.span
                      className="absolute inset-0 rounded-full"
                      style={{ border: `2px solid ${accent}` }}
                      animate={{ scale: [1, 1.7], opacity: [0.6, 0] }}
                      transition={{ duration: 1.6, repeat: Infinity, ease: "easeOut" }}
                    />
                  )}
                </span>
                <span
                  className={`hidden max-w-[8ch] text-center text-[11px] font-semibold leading-tight sm:block ${
                    isActive ? "text-ink" : "text-grey"
                  }`}
                >
                  {s.fase}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* DETAILKAART */}
      <div className="mt-8 min-h-[170px]">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? undefined : { opacity: 0, y: -12 }}
            transition={{ duration: 0.32, ease: "easeOut" }}
            className="grid items-center gap-6 rounded-3xl border border-hairline bg-canvas p-7 sm:grid-cols-[auto_1fr] sm:p-8"
          >
            <div
              className="grid h-16 w-16 place-items-center rounded-2xl"
              style={{ backgroundColor: `${accent}14`, color: accent }}
            >
              <Icon name={ICONS[step.nr] ?? "sparkles"} className="h-8 w-8" strokeWidth={1.6} />
            </div>
            <div>
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="font-mono text-xs uppercase tracking-wider text-grey">
                  Les {step.nr} / {count}
                </span>
                {step.nr === count && (
                  <span
                    className="rounded-full px-2 py-0.5 font-mono text-[10px] uppercase tracking-wide"
                    style={{ backgroundColor: `${accent}14`, color: accent }}
                  >
                    Finale
                  </span>
                )}
              </div>
              <h3 className="mt-2 text-2xl">{step.fase}</h3>
              <p className="mt-1 font-medium text-ink">{step.thema}</p>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">{step.uitleg}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
