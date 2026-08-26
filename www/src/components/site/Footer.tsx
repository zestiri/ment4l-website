import Link from "next/link";
import { Logo } from "./Logo";
import { CONTACT, SLOGAN, APP_REGISTER_URL } from "@/lib/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-charcoal text-canvas">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-16 sm:grid-cols-2 md:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <Link href="/" aria-label="MENT4L" className="inline-block text-white">
            <Logo className="text-2xl" />
          </Link>
          <p className="mt-3 max-w-xs text-sm text-white/55">
            Ambulante (spoed)hulp en jeugdcoaching door echte professionals.
            Wij staan voor groei &amp; vooruitgang.
          </p>
          <a
            href={APP_REGISTER_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex rounded-pill bg-brand px-5 py-2.5 text-sm font-semibold text-canvas transition-transform hover:-translate-y-0.5"
          >
            Direct aanmelden ↗
          </a>
        </div>

        {/* py-1.5 vergroot het tikgebied op mobiel (links worden ~32px hoog) */}
        <div className="flex flex-col gap-0.5 text-sm text-white/70">
          <span className="eyebrow mb-1.5 text-white/40">Snelle links</span>
          <Link href="/over-ons" className="py-1.5 hover:text-white">Over ons</Link>
          <Link href="/contact" className="py-1.5 hover:text-white">Contact</Link>
          <Link href="/blog" className="py-1.5 hover:text-white">Blog</Link>
          <a href="/privacybeleid.pdf" className="py-1.5 hover:text-white">Privacybeleid</a>
          <a href="/algemene-voorwaarden.pdf" className="py-1.5 hover:text-white">Algemene voorwaarden</a>
        </div>

        <div className="flex flex-col gap-0.5 text-sm text-white/70">
          <span className="eyebrow mb-1.5 text-white/40">Contact</span>
          <a href={CONTACT.phoneHref} className="py-1.5 hover:text-white">{CONTACT.phone}</a>
          <a href={`mailto:${CONTACT.email}`} className="py-1.5 hover:text-white">{CONTACT.email}</a>
          <span className="py-1.5 text-white/55">{CONTACT.address}</span>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-5 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <span className="font-mono uppercase tracking-[0.14em]">{SLOGAN}</span>
          <span>© {year} MENT4L</span>
        </div>
      </div>
    </footer>
  );
}
