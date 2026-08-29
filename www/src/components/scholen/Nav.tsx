"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { Logo } from "@/components/site/Logo";
import { WorldSwitcher } from "@/components/site/WorldSwitcher";
import { KENNISMAKING_URL } from "@/lib/programmas";

// De scholen-nav deelt bewust exact dezelfde schil, logo, stijl en het mobiele
// menu-patroon met de hoofd-nav (components/site/Nav.tsx). Enige verschil is de
// inhoud: binnen-de-wereld-links + een eigen CTA. De oversteek naar Jeugdhulp
// loopt via dezelfde WorldSwitcher, zodat de twee werelden aanvoelen als één site.

const LINKS = [
  { href: "/scholen#werkwijze", label: "Werkwijze" },
  { href: "/scholen#aanbod", label: "Aanbod" },
  { href: "/scholen/professionals", label: "Professionals" },
] as const;

export function Nav() {
  const path = usePathname();
  const reduce = useReducedMotion();
  const [menuOpen, setMenuOpen] = useState(false);

  // Route-wissel sluit het menu.
  useEffect(() => {
    setMenuOpen(false);
  }, [path]);

  // Body-scroll vastzetten zolang het mobiele menu open is.
  useEffect(() => {
    if (!menuOpen) return;
    const vorig = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = vorig;
    };
  }, [menuOpen]);

  const topLink =
    "rounded-full px-3 py-2 text-sm text-white/[0.92] transition-colors hover:bg-white/10 hover:text-white";
  const topLinkActief = "bg-white/10 text-white";

  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav className="flex w-full max-w-[1040px] items-center justify-between gap-3 rounded-2xl border border-white/10 bg-gradient-to-b from-[#1f1f1f]/90 to-charcoal-2/90 py-2.5 pl-5 pr-2.5 text-canvas shadow-[var(--shadow-framer-md)] backdrop-blur-[5px]">
        {/* Links: logo + wereld-schakelaar + binnen-de-wereld-links */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          <Link href="/scholen" className="shrink-0 text-white" aria-label="MENT4L Scholen home">
            <Logo variant="mark" className="h-7 md:h-8" />
          </Link>

          {/* Wereld: waar je bent (Scholen) + één klik naar Jeugdhulp. */}
          <WorldSwitcher active="scholen" className="hidden md:inline-flex" />

          <div className="hidden items-center gap-1 md:flex">
            {LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`${topLink} ${l.href === "/scholen/professionals" && path.startsWith("/scholen/professionals") ? topLinkActief : ""}`}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Rechts: CTA + mobiel menu */}
        <div className="flex items-center gap-1.5">
          <a
            href={KENNISMAKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center rounded-[10px] bg-brand px-4 py-2.5 text-[13px] font-semibold text-canvas transition-colors hover:bg-brand-2 sm:inline-flex"
          >
            Plan een kennismaking
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Menu sluiten" : "Menu openen"}
            aria-expanded={menuOpen}
            className="grid h-10 w-10 place-items-center rounded-2xl bg-white/12 text-white transition-colors hover:bg-white/20 md:hidden"
          >
            <span className="text-lg leading-none">{menuOpen ? "✕" : "☰"}</span>
          </button>
        </div>
      </nav>

      {/* Mobiel menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -8 }}
            transition={{ type: "spring", stiffness: 460, damping: 36 }}
            className="absolute inset-x-4 top-[84px] max-h-[calc(100dvh-6.5rem)] overflow-y-auto overscroll-contain rounded-3xl border border-hairline bg-canvas p-3 text-ink shadow-[var(--shadow-lift)] md:hidden"
          >
            {/* Wereld-schakelaar bovenaan: dezelfde keuze als op desktop. */}
            <WorldSwitcher
              active="scholen"
              tone="light"
              block
              onNavigate={() => setMenuOpen(false)}
              className="mb-3"
            />

            <p className="eyebrow px-2 pb-1 pt-1 text-grey">Op school</p>
            <div className="flex flex-col">
              {LINKS.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  className="rounded-2xl px-3 py-2.5 text-[15px] text-ink-soft transition-colors hover:bg-sand"
                >
                  {l.label}
                </Link>
              ))}
            </div>

            <a
              href={KENNISMAKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="mt-2 flex items-center justify-center rounded-2xl bg-brand px-4 py-3 text-center text-sm font-semibold text-canvas transition-colors hover:bg-brand-2"
            >
              Plan een kennismaking
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
