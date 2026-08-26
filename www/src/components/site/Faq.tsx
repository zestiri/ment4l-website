"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Play, AlignLeft, Contact, History, Inbox, Image as ImageIcon } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { FAQ_ITEMS } from "@/lib/site";

// leading-iconen per vraag (volgorde = FAQ_ITEMS), zoals op de live site
const FAQ_ICONS: LucideIcon[] = [Play, AlignLeft, Contact, History, Inbox, ImageIcon];

export function Faq() {
  const [open, setOpen] = useState<number | null>(null);
  const reduce = useReducedMotion();

  return (
    <div className="mx-auto mt-10 flex max-w-3xl flex-col gap-3">
      {FAQ_ITEMS.map((item, i) => {
        const isOpen = open === i;
        const Icon = FAQ_ICONS[i] ?? Play;
        return (
          <div key={item.vraag} className="overflow-hidden rounded-2xl bg-sand">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="flex items-center gap-3">
                <Icon className="h-5 w-5 shrink-0 text-ink" strokeWidth={1.6} />
                <span className="text-[15px] font-normal text-ink">{item.vraag}</span>
              </span>
              <span
                className={`text-2xl font-light leading-none text-ink transition-transform ${isOpen ? "rotate-45" : ""}`}
                aria-hidden
              >
                +
              </span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={reduce ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduce ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.28, ease: [0.2, 0.8, 0.2, 1] }}
                >
                  <p className="px-5 pb-5 pl-[52px] text-sm text-ink-soft">{item.antwoord}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
