"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  HeartHandshake,
  PhoneCall,
  GraduationCap,
  Route,
  Compass,
  ChevronDown,
  ArrowUpRight,
  type LucideIcon,
} from "lucide-react";
import { Logo } from "./Logo";
import {
  NAV_AANBOD,
  NAV_PRIMAIR,
  NAV_SNEL,
  NAV_MEER,
  JEUGDHULP_HUB,
  APP_URL,
  AANMELD_URL,
  CONTACT,
  type AanbodItem,
} from "@/lib/site";

const AANBOD_ICONS: Record<AanbodItem["icon"], LucideIcon> = {
  begeleiding: HeartHandshake,
  spoed: PhoneCall,
  school: GraduationCap,
  reintegratie: Route,
  amv: Compass,
};

/**
 * `variant="landing"` kleedt de nav uit voor betaalde advertentieroutes: alleen
 * het logo, het telefoonnummer en een knop die naar het formulier scrollt. Op
 * een advertentiepagina is elke extra uitgang een lek, en de Inloggen-knop is de
 * verkeerde deur voor een hulpzoekende ouder. De reguliere site houdt de
 * volledige nav met de aanbod-dropdown.
 */
export function Nav({ variant = "volledig" }: { variant?: "volledig" | "landing" } = {}) {
  if (variant === "landing") return <LandingNav />;
  return <VolledigeNav />;
}

// ── Advertentievariant ─────────────────────────────────────────────────

function LandingNav() {
  return (
    <header className="fixed inset-x-0 top-4 z-50 flex justify-center px-4">
      <nav className="flex w-full max-w-[840px] items-center justify-between gap-3 rounded-2xl border border-white/10 bg-gradient-to-b from-[#1f1f1f]/90 to-charcoal-2/90 py-2.5 pl-5 pr-2.5 text-canvas shadow-[var(--shadow-framer-md)] backdrop-blur-[5px]">
        <Link href="/" className="shrink-0 text-white" aria-label="MENT4L home">
          <Logo variant="mark" className="h-7 md:h-8" />
        </Link>
        <div className="flex items-center gap-2">
          <a
            href={CONTACT.phoneHref}
            className="hidden min-h-11 items-center rounded-full px-3 text-sm text-white/[0.92] transition-colors hover:bg-white/10 hover:text-white sm:inline-flex"
          >
            {CONTACT.phone}
          </a>
          <a
            href="#bel-mij-terug"
            className="inline-flex min-h-11 items-center rounded-[10px] bg-brand px-4 text-[13px] font-semibold text-canvas transition-colors hover:bg-brand-2"
          >
            Bel mij terug
          </a>
        </div>
      </nav>
    </header>
  );
}

// ── Volledige site-nav ─────────────────────────────────────────────────

function VolledigeNav() {
  const path = usePathname();
  const reduce = useReducedMotion();
  const [aanbodOpen, setAanbodOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const panelId = useId();

  const aanbodActief =
    NAV_AANBOD.some((i) => path.startsWith(i.href)) ||
    NAV_SNEL.some((s) => path.startsWith(s.href)) ||
    path.startsWith(JEUGDHULP_HUB.href);

  // Route-wissel sluit alles. Zonder dit blijft de dropdown na een klik hangen.
  useEffect(() => {
    setAanbodOpen(false);
    setMenuOpen(false);
  }, [path]);

  // Escape en klik-buiten sluiten de dropdown; Escape geeft de focus terug.
  useEffect(() => {
    if (!aanbodOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setAanbodOpen(false);
        triggerRef.current?.focus();
      }
    }
    function onPointer(e: PointerEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setAanbodOpen(false);
    }
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [aanbodOpen]);

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
        {/* Links: logo + primaire ingangen */}
        <div className="flex items-center gap-3 sm:gap-4">
          <Link href="/" className="shrink-0 text-white" aria-label="MENT4L home">
            <Logo variant="mark" className="h-7 md:h-8" />
          </Link>

          <div className="hidden items-center gap-1 md:flex">
            {/* Ons aanbod — dropdown */}
            <div
              ref={wrapRef}
              className="relative"
              onMouseEnter={() => setAanbodOpen(true)}
              onMouseLeave={() => setAanbodOpen(false)}
              onBlur={(e) => {
                if (!wrapRef.current?.contains(e.relatedTarget as Node)) setAanbodOpen(false);
              }}
            >
              <button
                ref={triggerRef}
                type="button"
                aria-expanded={aanbodOpen}
                aria-haspopup="menu"
                aria-controls={panelId}
                onClick={() => setAanbodOpen((v) => !v)}
                className={`group inline-flex items-center gap-1 ${topLink} ${aanbodActief ? "text-white" : ""}`}
              >
                Ons aanbod
                <ChevronDown
                  aria-hidden
                  className={`h-3.5 w-3.5 text-white/60 transition-transform duration-200 ${aanbodOpen ? "rotate-180" : ""}`}
                />
              </button>

              <AnimatePresence>
                {aanbodOpen && (
                  <motion.div
                    id={panelId}
                    role="menu"
                    aria-label="Ons aanbod"
                    initial={reduce ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.98 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={reduce ? { opacity: 0 } : { opacity: 0, y: 6, scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 460, damping: 34 }}
                    style={{ transformOrigin: "top left" }}
                    className="absolute left-0 top-full z-50 w-72 pt-3"
                  >
                    <div className="overflow-hidden rounded-3xl border border-hairline bg-canvas p-2 text-ink shadow-[var(--shadow-lift)]">
                      <div className="flex flex-col">
                        {NAV_AANBOD.map((item) => (
                          <AanbodRij key={item.href} item={item} onKlik={() => setAanbodOpen(false)} />
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {NAV_PRIMAIR.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className={`${topLink} ${path.startsWith(l.href) ? topLinkActief : ""}`}
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>

        {/* Rechts: spoed + contact + aanmelden */}
        <div className="flex items-center gap-1.5">
          <Link
            href="/contact"
            className={`hidden ${topLink} ${path.startsWith("/contact") ? topLinkActief : ""} md:inline-flex`}
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
            <p className="eyebrow px-2 pb-1 pt-1 text-grey">Ons aanbod</p>
            <div className="flex flex-col">
              {NAV_AANBOD.map((item) => (
                <AanbodRij key={item.href} item={item} onKlik={() => setMenuOpen(false)} />
              ))}
            </div>

            <span className="my-2 block border-t border-hairline" />

            <div className="flex flex-col">
              {[...NAV_PRIMAIR, { href: "/contact", label: "Contact" }, ...NAV_SNEL, ...NAV_MEER].map(
                (l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className="rounded-2xl px-3 py-2.5 text-[15px] text-ink-soft transition-colors hover:bg-sand"
                  >
                    {l.label}
                  </Link>
                ),
              )}
            </div>

            <Link
              href={AANMELD_URL}
              onClick={() => setMenuOpen(false)}
              className="mt-2 flex items-center justify-center rounded-2xl bg-brand px-4 py-3 text-center text-sm font-semibold text-canvas transition-colors hover:bg-brand-2"
            >
              Aanmelden voor jeugdhulp
            </Link>

            <a
              href={APP_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMenuOpen(false)}
              className="mt-2 flex items-center justify-center gap-1.5 rounded-2xl border border-hairline px-4 py-3 text-center text-[13px] font-medium text-ink-soft transition-colors hover:border-ink"
            >
              Inloggen voor zorgprofessionals
              <ArrowUpRight aria-hidden className="h-3.5 w-3.5" strokeWidth={2} />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

// ── Gedeelde dienst-rij (dropdown én mobiel menu) ──────────────────────

function AanbodRij({ item, onKlik }: { item: AanbodItem; onKlik: () => void }) {
  const Icon = AANBOD_ICONS[item.icon];
  return (
    <Link
      href={item.href}
      role="menuitem"
      onClick={onKlik}
      className="group flex items-center gap-3 rounded-2xl px-3 py-2.5 outline-none transition-colors hover:bg-sand focus-visible:bg-sand"
    >
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-brand/10 text-brand transition-colors group-hover:bg-brand/15">
        <Icon aria-hidden className="h-[17px] w-[17px]" strokeWidth={1.9} />
      </span>
      <span className="text-[14.5px] font-semibold text-ink">{item.label}</span>
    </Link>
  );
}
