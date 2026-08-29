import type { Metadata } from "next";
import Link from "next/link";
import { Phone } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { DarkPanel } from "@/components/site/DarkPanel";
import { Reveal } from "@/components/site/Reveal";
import { Stappen } from "@/components/funnel/Stappen";
import { CONTACT, AANMELD_URL } from "@/lib/site";
import { WACHTTIJDEN, WACHTTIJDEN_BIJGEWERKT } from "@/lib/funnel";

export const metadata: Metadata = {
  title: "Wachttijden",
  description:
    "Actuele wachttijden per traject bij MENT4L, wekelijks bijgewerkt. Jeugdhulp in West-Brabant zonder wachtlijst. Reactie binnen 4 uur.",
  alternates: { canonical: "/wachttijden" },
};

export default function WachttijdenPage() {
  return (
    <>
      <Nav />
      <main>
        <section className="mx-auto max-w-site px-6 pt-36 sm:pt-40">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <span className="eyebrow justify-center text-brand">Transparant</span>
              <h1 className="mt-4 text-[clamp(2.1rem,5vw,3.25rem)]">Onze actuele wachttijden</h1>
              <p className="mt-5 text-lg text-ink-soft">
                In de jeugdzorg is een wachtlijst eerder regel dan uitzondering. Wij
                publiceren daarom wekelijks per traject wanneer we kunnen starten, zodat
                je het kunt vergelijken in plaats van erop te moeten hopen.
              </p>
              <p className="mt-4 font-mono text-sm text-grey">
                Bijgewerkt op {WACHTTIJDEN_BIJGEWERKT}
              </p>
            </div>
          </Reveal>

          {/* ── TABEL ─────────────────────────────────────── */}
          <Reveal delay={0.06}>
            <div className="mx-auto mt-12 max-w-3xl overflow-hidden rounded-3xl border border-hairline bg-canvas">
              <table className="w-full text-left">
                <caption className="sr-only">Actuele wachttijd per traject</caption>
                <thead>
                  <tr className="border-b border-hairline bg-mist">
                    <th scope="col" className="eyebrow px-6 py-4 text-grey">Traject</th>
                    <th scope="col" className="eyebrow px-6 py-4 text-grey">Wachttijd</th>
                  </tr>
                </thead>
                <tbody>
                  {WACHTTIJDEN.map((w) => (
                    <tr key={w.traject} className="border-b border-hairline last:border-b-0">
                      <td className="px-6 py-5">
                        <span className="block font-semibold text-ink">{w.traject}</span>
                        <span className="mt-0.5 block text-sm text-ink-soft">{w.toelichting}</span>
                      </td>
                      <td className="px-6 py-5 align-top">
                        <span className="inline-flex whitespace-nowrap rounded-full bg-brand/10 px-3 py-1 text-sm font-semibold text-brand">
                          {w.wachttijd}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="mx-auto mt-8 max-w-3xl rounded-2xl border border-hairline bg-stone/60 p-5 text-sm text-ink-soft">
              <strong className="text-ink">Wat een wachttijd hier betekent.</strong> Dit is de
              tijd tot de kennismaking. Wanneer de begeleiding daadwerkelijk start hangt ook
              af van de verwijzing en de toewijzing door je gemeente. Dat deel ligt niet bij
              ons, maar we helpen je er wel doorheen.
            </div>
          </Reveal>

          {/* ── CTA ───────────────────────────────────────── */}
          <Reveal delay={0.14}>
            <div className="mx-auto mt-12 flex max-w-3xl flex-wrap items-center justify-center gap-3">
              <Link
                href={AANMELD_URL}
                className="rounded-pill bg-brand px-7 py-3.5 text-[15px] font-semibold text-canvas transition-colors hover:bg-brand-2"
              >
                Bel mij binnen 4 uur
              </Link>
              <a
                href={CONTACT.phoneHref}
                className="inline-flex items-center gap-2 rounded-pill border border-hairline px-7 py-3.5 text-[15px] font-semibold text-ink transition-colors hover:border-ink"
              >
                <Phone className="h-4 w-4" strokeWidth={2} />
                {CONTACT.phone}
              </a>
            </div>
          </Reveal>
        </section>

        <section className="mx-auto max-w-site px-6 py-20 sm:py-24">
          <Stappen titel="Van aanmelding tot start" />
        </section>
      </main>
      <DarkPanel>
        <Footer />
      </DarkPanel>
    </>
  );
}
