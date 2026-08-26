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
    <div className="mx-auto mt-6 flex max-w-[718px] flex-col gap-0.5 rounded-3xl p-2.5">
      {FAQ_ITEMS.map((item, i) => {
        const isOpen = open === i;
        const Icon = FAQ_ICONS[i] ?? Play;
        return (
          <div
            key={item.vraag}
            className={`group overflow-hidden rounded-[10px] bg-sand transition-colors duration-[350ms] ${
              isOpen ? "cursor-default" : "hover:bg-charcoal-2"
            }`}
          >
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full cursor-pointer items-center justify-between gap-4 px-6 py-7 text-left"
            >
              <span className="flex items-center gap-3">
                <Icon
                  className={`h-5 w-5 shrink-0 text-ink transition-colors duration-[350ms] ${isOpen ? "" : "group-hover:text-canvas"}`}
                  strokeWidth={1.6}
                />
                <span
                  className={`text-base text-[#0d0d0d] transition-colors duration-[350ms] ${isOpen ? "" : "group-hover:text-canvas"}`}
                >
                  {item.vraag}
                </span>
              </span>
              <span
                className={`text-2xl font-light leading-none text-ink opacity-30 transition-all duration-[350ms] ${
                  isOpen ? "rotate-45 opacity-100" : "group-hover:text-sand group-hover:opacity-100"
                }`}
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
