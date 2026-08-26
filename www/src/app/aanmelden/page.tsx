import type { Metadata } from "next";
import { Phone, Clock, ShieldCheck, FileText } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { DarkPanel } from "@/components/site/DarkPanel";
import { Reveal } from "@/components/site/Reveal";
import { AanmeldForm } from "@/components/site/AanmeldForm";
import { CONTACT, WBW_GEMEENTEN } from "@/lib/site";

export const metadata: Metadata = {
  title: "Aanmelden",
  description:
    "Meld je aan voor jeugdhulp bij MENT4L. Geen wachtlijst, reactie binnen 4 uur, 24/7 bereikbaar. Aanmelden mag ook zonder verwijzing — wij helpen je daarbij.",
  alternates: { canonical: "/aanmelden" },
};

const STAPPEN = [
  { titel: "Je meldt je aan", tekst: "Vul het korte formulier in of bel ons. Een paar zinnen is genoeg." },
  { titel: "Wij bellen binnen 4 uur", tekst: "We bespreken wat er speelt en of we kunnen helpen. Ook buiten kantooruren." },
  { titel: "We regelen de verwijzing", tekst: "Heb je nog geen verwijzing? Dan helpen we je die te krijgen bij huisarts of gemeente." },
  { titel: "We starten", tekst: "Geen wachtlijst. Bij spoed kunnen we dezelfde dag bij je zijn." },
];

const ZEKERHEDEN = [
  { Icon: Clock, titel: "Geen wachtlijst", tekst: "We starten zo snel mogelijk, bij spoed dezelfde dag." },
  { Icon: Phone, titel: "24/7 bereikbaar", tekst: "Ook 's avonds en in het weekend bereikbaar." },
  { Icon: FileText, titel: "Wij doen het papierwerk", tekst: "Ook zonder verwijzing kun je je alvast aanmelden." },
  { Icon: ShieldCheck, titel: "Geen eigen bijdrage", tekst: "Jeugdhulp via de Jeugdwet kost je niets." },
];

export default function AanmeldenPage() {
  return (
    <>
      <Nav />
      <main>
        <section className="mx-auto max-w-site px-6 pb-24 pt-36 sm:pt-40">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center">
              <span className="eyebrow text-brand">Aanmelden jeugdhulp</span>
              <h1 className="mt-3 text-[clamp(2.2rem,5vw,3.25rem)]">
                Aanmelden kan nu al — ook zonder verwijzing
              </h1>
              <p className="mt-5 text-lg text-ink-soft">
                Geen wachtlijst. Je hoort binnen 4 uur van ons, ook buiten kantooruren.
                Wij helpen je met de verwijzing en de aanvraag bij je gemeente.
              </p>
            </div>
          </Reveal>

          {/* Spoed staat bewust bovenaan: bellen is dan de snelste weg */}
          <Reveal delay={0.06}>
            <a
              href={CONTACT.phoneHref}
              className="mx-auto mt-8 flex max-w-2xl items-center justify-center gap-3 rounded-2xl border border-coral/30 bg-coral/[0.06] px-5 py-4 text-center transition-colors hover:border-coral/60"
            >
              <Phone className="h-5 w-5 shrink-0 text-coral" strokeWidth={1.9} />
              <span className="text-sm text-ink-soft">
                <span className="font-semibold text-ink">Spoed of crisis?</span> Bel direct{" "}
                <span className="font-semibold text-ink">{CONTACT.phone}</span> — dan schakelen we vrijwel direct.
              </span>
            </a>
          </Reveal>

          <div className="mt-14 grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
            {/* formulier */}
            <Reveal>
              <div className="rounded-[32px] border border-hairline bg-mist p-6 sm:p-9">
                <AanmeldForm />
              </div>
            </Reveal>

            {/* wat er daarna gebeurt */}
            <div>
              <Reveal delay={0.06}>
                <h2 className="text-[clamp(1.5rem,3vw,2rem)]">Wat er daarna gebeurt</h2>
                <ol className="mt-6 flex flex-col gap-5">
                  {STAPPEN.map((s, i) => (
                    <li key={s.titel} className="flex gap-4">
                      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-brand/10 font-sans text-sm font-semibold text-brand">
                        {i + 1}
                      </span>
                      <span>
                        <span className="block font-semibold text-ink">{s.titel}</span>
                        <span className="mt-0.5 block text-sm text-ink-soft">{s.tekst}</span>
                      </span>
                    </li>
                  ))}
                </ol>
              </Reveal>

              <Reveal delay={0.12}>
                <div className="mt-10 grid gap-3 sm:grid-cols-2">
                  {ZEKERHEDEN.map((z) => (
                    <div key={z.titel} className="rounded-2xl border border-hairline bg-canvas p-4">
                      <z.Icon className="h-5 w-5 text-brand" strokeWidth={1.9} />
                      <div className="mt-2 text-sm font-semibold text-ink">{z.titel}</div>
                      <p className="mt-0.5 text-sm text-ink-soft">{z.tekst}</p>
                    </div>
                  ))}
                </div>
              </Reveal>

              <Reveal delay={0.18}>
                <div className="mt-8 rounded-2xl bg-sand p-5">
                  <h3 className="text-base">Waar we direct kunnen starten</h3>
                  <p className="mt-2 text-sm text-ink-soft">
                    MENT4L is gecontracteerd voor jeugdhulp in {WBW_GEMEENTEN.join(", ")}.
                    Woon je in een andere gemeente? Meld je gerust aan — dan kijken we samen
                    naar de mogelijkheden.
                  </p>
                </div>
              </Reveal>
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
