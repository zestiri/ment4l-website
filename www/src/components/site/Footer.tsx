import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Logo } from "./Logo";
import { CONTACT, SLOGAN, AANMELD_URL, APP_URL, JEUGDHULP_HUB } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="text-canvas">
      <div className="mx-auto grid max-w-site gap-10 px-6 py-16 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
        <div>
          <Link href="/" aria-label="MENT4L" className="inline-block text-white">
            <Logo variant="mark" className="h-9" />
          </Link>
          <p className="mt-3 max-w-xs text-sm text-white/55">
            Ambulante (spoed)hulp en jeugdcoaching door echte professionals.
            Wij staan voor groei &amp; vooruitgang.
          </p>
          <a
            href={AANMELD_URL}
            className="mt-5 inline-flex rounded-pill bg-brand px-5 py-2.5 text-sm font-semibold text-canvas transition-transform hover:-translate-y-0.5"
          >
            Direct aanmelden
          </a>
        </div>

        {/* py-1.5 vergroot het tikgebied op mobiel (links worden ~32px hoog) */}
        <div className="flex flex-col gap-0.5 text-sm text-white/70">
          <span className="eyebrow mb-1.5 text-white/40">Hulp nodig</span>
          <Link href={AANMELD_URL} className="py-1.5 hover:text-white">Aanmelden voor jeugdhulp</Link>
          <Link href={JEUGDHULP_HUB.href} className="py-1.5 hover:text-white">Jeugdhulp West-Brabant West</Link>
          <Link href="/spoed" className="py-1.5 hover:text-white">Ambulante spoedhulp</Link>
          <Link href="/wachttijden" className="py-1.5 hover:text-white">Wachttijden</Link>
          <Link href="/jongeren" className="py-1.5 hover:text-white">Voor jongeren (16+)</Link>
          <Link href="/verwijzers" className="py-1.5 hover:text-white">Voor verwijzers</Link>
        </div>

        <div className="flex flex-col gap-0.5 text-sm text-white/70">
          <span className="eyebrow mb-1.5 text-white/40">Over MENT4L</span>
          <Link href="/over-ons" className="py-1.5 hover:text-white">Over ons</Link>
          <Link href="/blog" className="py-1.5 hover:text-white">Blog</Link>
          <Link href="/trajecten/workshops-jeugd-digitale-wereld" className="py-1.5 hover:text-white">Workshops</Link>
          <Link href="/verwijzing-huisarts" className="py-1.5 hover:text-white">Verwijzing via de huisarts</Link>
        </div>

        <div className="flex flex-col gap-0.5 text-sm text-white/70">
          <span className="eyebrow mb-1.5 text-white/40">Contact</span>
          <a href={CONTACT.phoneHref} className="py-1.5 hover:text-white">{CONTACT.phone}</a>
          <a href={`mailto:${CONTACT.email}`} className="py-1.5 hover:text-white">{CONTACT.email}</a>
          <span className="py-1.5 text-white/55">{CONTACT.address}</span>
          {/* Personeelsportaal — bewust hier, niet in de hoofdnav */}
          <a
            href={APP_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1.5 inline-flex items-center gap-1 py-1.5 text-white/55 hover:text-white"
          >
            Inloggen zorgprofessionals
            <ArrowUpRight aria-hidden className="h-3.5 w-3.5" strokeWidth={2} />
          </a>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-site flex-col gap-3 px-6 py-5 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <span className="font-mono uppercase tracking-[0.14em]">{SLOGAN}</span>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <a href="/privacybeleid.pdf" className="hover:text-white/80">Privacybeleid</a>
            <a href="/algemene-voorwaarden.pdf" className="hover:text-white/80">Algemene voorwaarden</a>
            <span>© {year} MENT4L</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
