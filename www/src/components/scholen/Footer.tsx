import Link from "next/link";
import { Logo } from "./Logo";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-charcoal text-canvas">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-14 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link href="/scholen" aria-label="ment4l" className="inline-block text-white">
            <Logo className="h-11" />
          </Link>
          <p className="mt-2 max-w-xs text-sm text-white/55">
            Naschools aanbod dat werkt aan zelfvertrouwen, talent en gelijke
            kansen.
          </p>
        </div>
        <div className="flex flex-col gap-3 text-sm text-white/70 sm:items-end">
          <a href="mailto:info@ment4l.nl" className="hover:text-white">
            info@ment4l.nl
          </a>
          <div className="flex gap-5">
            <Link href="/scholen#werkwijze" className="hover:text-white">Werkwijze</Link>
            <Link href="/scholen#aanbod" className="hover:text-white">Aanbod</Link>
            <Link href="/scholen#scholen" className="hover:text-white">Voor scholen</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-5 text-xs text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <span className="font-mono uppercase tracking-[0.14em]">
            It&apos;s all about MENT4LITY
          </span>
          <span>© {year} MENT4L · Naschoolse activiteiten voor scholen</span>
        </div>
      </div>
    </footer>
  );
}
