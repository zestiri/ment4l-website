"use client";

import Link from "next/link";
import { useState } from "react";
import { Logo } from "./Logo";
import { NAV_LINKS, APP_URL, AANMELD_URL } from "@/lib/site";

const LEFT = NAV_LINKS.slice(0, 4); // Trajecten, Workshops, Blog, Over ons

export function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav className="flex w-full max-w-[840px] items-center justify-between gap-3 rounded-2xl border border-white/10 bg-gradient-to-b from-[#1f1f1f]/90 to-charcoal-2/90 py-2.5 pl-5 pr-2.5 text-canvas shadow-[var(--shadow-framer-md)] backdrop-blur-[5px]">
        <div className="flex items-center gap-3 sm:gap-6">
          <Link href="/" className="shrink-0 text-white" aria-label="MENT4L home">
            <Logo className="text-xl md:text-2xl" />
          </Link>
          <div className="hidden items-center gap-1 md:flex">
            {LEFT.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-full px-3 py-2 text-sm text-white/[0.92] transition-colors hover:bg-white/10 hover:text-white"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <Link
            href="/contact"
            className="hidden rounded-full px-3 py-2 text-sm text-white/[0.92] transition-colors hover:bg-white/10 hover:text-white md:inline-flex"
          >
            Contact
          </Link>
          {/* Cliënt-actie: blijft op ment4l.nl */}
          <Link
            href={AANMELD_URL}
            className="hidden items-center rounded-[10px] bg-brand px-4 py-2.5 text-[13px] font-semibold text-canvas transition-colors hover:bg-brand-2 sm:inline-flex"
          >
            Aanmelden
          </Link>
          {/* Inlogomgeving voor onze eigen zorgprofessionals — bewust apart en gelabeld */}
          <a
            href={APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            title="Inloggen op het platform voor zorgprofessionals"
            className="hidden items-center gap-1.5 rounded-[10px] bg-[#4d4d4d] px-3.5 py-2.5 text-[13px] font-medium text-white/90 ring-1 ring-[#454545] transition-colors hover:bg-[#5a5a5a] md:inline-flex"
          >
            Inloggen
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
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 font-display text-lg text-ink hover:bg-sand"
              >
                {l.label}
              </Link>
            ))}
            <Link
              href={AANMELD_URL}
              onClick={() => setOpen(false)}
              className="mt-1 flex items-center justify-center rounded-2xl bg-brand px-4 py-3 text-center text-sm font-semibold text-canvas"
            >
              Aanmelden voor jeugdhulp
            </Link>
            <a
              href={APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mt-2 flex items-center justify-center gap-1.5 rounded-2xl border border-hairline px-4 py-3 text-center text-sm font-medium text-ink-soft"
            >
              Inloggen voor zorgprofessionals <span aria-hidden>↗</span>
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
