"use client";

import Link from "next/link";
import { useState } from "react";
import { Logo } from "./Logo";
import { KENNISMAKING_URL } from "@/lib/programmas";

const links = [
  { href: "/scholen#werkwijze", label: "Werkwijze" },
  { href: "/scholen#aanbod", label: "Aanbod" },
  { href: "/scholen/professionals", label: "Professionals" },
  { href: "/scholen#scholen", label: "Voor scholen" },
  { href: "/", label: "Jeugdhulp" },
];

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav className="flex w-full max-w-5xl items-center justify-between gap-3 rounded-[28px] border border-white/10 bg-gradient-to-b from-charcoal-2/90 to-charcoal/90 py-2.5 pl-5 pr-2.5 text-canvas shadow-[inset_0_1px_0_rgba(255,255,255,0.08),0_18px_40px_rgba(0,0,0,0.28)] backdrop-blur-xl backdrop-saturate-150">
        {/* links: logo + navigatie */}
        <div className="flex items-center gap-3 sm:gap-6">
          <Link href="/scholen" className="shrink-0 text-white" aria-label="ment4l home">
            <Logo className="h-10 md:h-14" />
          </Link>
          <div className="hidden items-center gap-1 md:flex">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-full px-3 py-2 text-[13.5px] text-white/75 transition-colors hover:bg-white/10 hover:text-white"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* rechts: divider + CTA + mobiel menu */}
        <div className="flex items-center gap-2.5">
          <span className="hidden h-6 w-px bg-white/15 sm:block" />
          <a
            href={KENNISMAKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-1.5 rounded-2xl bg-brand px-4 py-2.5 text-[13px] font-semibold text-canvas transition-transform hover:-translate-y-0.5 sm:inline-flex"
          >
            Plan een kennismaking
            <span aria-hidden className="text-[11px]">↗</span>
          </a>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Menu sluiten" : "Menu openen"}
            aria-expanded={open}
            className="grid h-10 w-10 place-items-center rounded-2xl bg-white/12 text-white transition-colors hover:bg-white/20 md:hidden"
          >
            <span className="text-lg leading-none">{open ? "✕" : "☰"}</span>
          </button>
        </div>
      </nav>

      {open && (
        <div className="absolute inset-x-4 top-[84px] rounded-3xl border border-hairline bg-canvas p-3 shadow-[var(--shadow-lift)] md:hidden">
          <div className="flex flex-col">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 font-serif text-lg text-ink hover:bg-sand"
              >
                {l.label}
              </Link>
            ))}
            <a
              href={KENNISMAKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mt-1 flex items-center justify-center gap-1.5 rounded-2xl bg-brand px-4 py-3 text-center text-sm font-semibold text-canvas"
            >
              Plan een kennismaking <span aria-hidden>↗</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
