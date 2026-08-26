import type { Metadata } from "next";
import { Phone, Clock, CalendarCheck, FileText, Wallet } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { DarkPanel } from "@/components/site/DarkPanel";
import { Reveal } from "@/components/site/Reveal";
import { AanmeldForm } from "@/components/site/AanmeldForm";
import { CONTACT } from "@/lib/site";

import { IconBadge } from "@/components/site/IconBadge";
export const metadata: Metadata = {
  title: "Aanmelden",
  description:
    "Meld je aan voor jeugdhulp bij MENT4L. Geen wachtlijst, reactie binnen 4 uur, 24/7 bereikbaar. Aanmelden mag ook zonder verwijzing.",
  alternates: { canonical: "/aanmelden" },
};

/** Vier zekerheden — kort, met icoon. Scanbaar, geen alinea's. */
const ZEKERHEDEN = [
  { Icon: Clock, kop: "Binnen 4 uur", tekst: "Ook 's avonds en in het weekend" },
  { Icon: CalendarCheck, kop: "Geen wachtlijst", tekst: "Bij spoed dezelfde dag" },
  { Icon: FileText, kop: "Geen verwijzing nodig", tekst: "Die regelen we samen" },
  { Icon: Wallet, kop: "Kost je niets", tekst: "Geen eigen bijdrage" },
];

export default function AanmeldenPage() {
  return (
    <>
      <Nav />
      <main>
        <section className="relative overflow-hidden bg-mist pt-8">
          <div className="tex-diagonal pointer-events-none absolute inset-0" aria-hidden />

          <div className="relative mx-auto w-full max-w-[1100px] rounded-t-[32px] bg-canvas">
            <div className="px-6 pb-20 pt-20 sm:pt-24">
              {/* ── Kop: kort houden ───────────────────────── */}
              <Reveal>
                <div className="mx-auto max-w-xl text-center">
                  <h1 className="text-[clamp(2rem,4.6vw,3rem)]">Aanmelden</h1>
                  <p className="mt-4 text-lg text-ink-soft">
                    Laat je nummer achter. Wij bellen binnen 4 uur.
                  </p>
                </div>
              </Reveal>

              {/* ── Formulier + zekerheden ─────────────────── */}
              <div className="mx-auto mt-12 grid max-w-4xl gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
                <Reveal>
                  <div className="rounded-[28px] border border-hairline bg-mist p-6 sm:p-8">
                    <AanmeldForm />
                  </div>
                </Reveal>

                <div className="flex flex-col gap-3">
                  {ZEKERHEDEN.map((z, i) => (
                    <Reveal key={z.kop} size="item" delay={i * 0.05}>
                      <div className="flex items-center gap-4 rounded-2xl border border-hairline bg-canvas p-4">
                        <IconBadge icon={z.Icon} />
                        <span>
                          <span className="block font-semibold text-ink">{z.kop}</span>
                          <span className="text-sm text-ink-soft">{z.tekst}</span>
                        </span>
                      </div>
                    </Reveal>
                  ))}

                  {/* Spoed: bellen is dan sneller dan een formulier */}
                  <Reveal size="item" delay={0.2}>
                    <a
                      href={CONTACT.phoneHref}
                      className="flex items-center gap-4 rounded-2xl border border-coral/30 bg-coral/[0.06] p-4 transition-colors hover:border-coral/60"
                    >
                      <IconBadge icon={Phone} tone="coral" />
                      <span>
                        <span className="block font-semibold text-ink">Spoed? Bel liever</span>
                        <span className="text-sm text-ink-soft">{CONTACT.phone} · 24/7</span>
                      </span>
                    </a>
                  </Reveal>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <DarkPanel>
        <Footer />
      </DarkPanel>
    </>
  );
}
