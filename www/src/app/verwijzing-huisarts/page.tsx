import type { Metadata } from "next";
import Link from "next/link";
import { Phone } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { DarkPanel } from "@/components/site/DarkPanel";
import { Reveal } from "@/components/site/Reveal";
import { FaqSection } from "@/components/site/FaqSection";
import { Stappen } from "@/components/funnel/Stappen";
import { CONTACT, AANMELD_URL } from "@/lib/site";
import { VERWIJZERS } from "@/lib/funnel";

import { CheckBullet } from "@/components/site/IconBadge";
export const metadata: Metadata = {
  title: "Verwijzing voor jeugdhulp",
  description:
    "Heb je een verwijzing van de huisarts voor jeugdhulp? Dan mag je zelf kiezen bij welke aanbieder je start. Meld je aan bij MENT4L — geen wachtlijst, reactie binnen 4 uur.",
  alternates: { canonical: "/verwijzing-huisarts" },
};

export default function VerwijzingPage() {
  return (
    <>
      <Nav />
      <main>
        <section className="mx-auto max-w-site px-6 pt-36 sm:pt-40">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <span className="eyebrow justify-center text-brand">Verwijzing</span>
              <h1 className="mt-4 text-[clamp(2.1rem,5vw,3.25rem)]">
                Je hebt een verwijzing. En nu?
              </h1>
              <p className="mt-5 text-lg text-ink-soft">
                Met een verwijzing van de huisarts, jeugdarts of medisch specialist mag je
                <strong className="text-ink"> zelf kiezen</strong> waar je kind start. Je hoeft niet te wachten tot iemand dat voor je
                invult.
              </p>
              <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                <Link
                  href={AANMELD_URL}
                  className="rounded-pill bg-brand px-7 py-3.5 text-[15px] font-semibold text-canvas transition-colors hover:bg-brand-2"
                >
                  Aanmelden met verwijzing
                </Link>
                <a
                  href={CONTACT.phoneHref}
                  className="inline-flex items-center gap-2 rounded-pill border border-hairline px-7 py-3.5 text-[15px] font-semibold text-ink transition-colors hover:border-ink"
                >
                  <Phone className="h-4 w-4" strokeWidth={2} />
                  {CONTACT.phone}
                </a>
              </div>
            </div>
          </Reveal>
        </section>

        {/* ── NOG GEEN VERWIJZING ─────────────────────────── */}
        <section className="mx-auto max-w-site px-6 py-20 sm:py-24">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <h2 className="text-[clamp(1.75rem,4vw,2.5rem)]">Nog geen verwijzing?</h2>
              <p className="mt-5 text-ink-soft">
                Dat hoeft je niet tegen te houden. Je kunt je alvast bij ons aanmelden — we
                bespreken dan telefonisch wat er speelt en helpen je de verwijzing te
                regelen bij je huisarts of het wijkteam van je gemeente.
              </p>
              <p className="mt-4 text-ink-soft">
                Zo verlies je geen weken met uitzoeken hoe het systeem werkt.
              </p>
              <Link
                href={AANMELD_URL}
                className="mt-6 inline-flex rounded-pill bg-brand px-7 py-3.5 text-[15px] font-semibold text-canvas transition-colors hover:bg-brand-2"
              >
                Meld je alvast aan
              </Link>
            </Reveal>

            <Reveal delay={0.06}>
              <div className="rounded-3xl bg-sand p-7">
                <h3 className="text-lg">Wie mag een verwijzing geven?</h3>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {VERWIJZERS.map((v) => (
                    <li key={v} className="flex items-start gap-3 text-sm text-ink">
                      <CheckBullet className="mt-0.5" />
                      {v}
                    </li>
                  ))}
                </ul>
                <p className="mt-5 text-sm text-ink-soft">
                  De gemeente betaalt de jeugdhulp vanuit de Jeugdwet. Er is geen eigen
                  bijdrage voor hulp aan je kind.
                </p>
              </div>
            </Reveal>
          </div>
        </section>

        <section className="border-y border-hairline bg-mist">
          <div className="mx-auto max-w-site px-6 py-20 sm:py-24">
            <Stappen />
          </div>
        </section>

        <FaqSection />
      </main>
      <DarkPanel>
        <Footer />
      </DarkPanel>
    </>
  );
}
