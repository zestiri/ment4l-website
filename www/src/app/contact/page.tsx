import type { Metadata } from "next";
import { Phone } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { DarkPanel } from "@/components/site/DarkPanel";
import { Reveal } from "@/components/site/Reveal";
import { ContactForm } from "@/components/site/ContactForm";
import { CONTACT } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Neem contact op met MENT4L. Vragen over een aanmelding? Bel 085 130 7522 of stuur je hulpvraag via het formulier.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <Nav />
      <main>
        <section className="mx-auto max-w-site px-6 pb-24 pt-36 sm:pt-40">
          <div className="grid gap-12 md:grid-cols-[0.9fr_1.1fr] md:gap-16">
            {/* linkerkolom — intro + gegevens */}
            <div>
              <Reveal>
                <span className="eyebrow text-brand">IT&apos;S ALL ABOUT MENT4LITY</span>
              </Reveal>
              <Reveal delay={0.06}>
                <h1 className="mt-4 text-[clamp(2.3rem,5vw,3.5rem)]">Neem contact op!</h1>
              </Reveal>
              <Reveal delay={0.12}>
                <p className="mt-5 max-w-md text-lg text-ink-soft">
                  Geen wachtlijst. Je hoort binnen 4 uur van ons — ook buiten
                  kantooruren.
                </p>
              </Reveal>

              {/* Spoed/crisis: bellen is hier de gewenste actie, geen formulier */}
              <Reveal delay={0.16}>
                <a
                  href={CONTACT.phoneHref}
                  className="mt-6 flex items-start gap-4 rounded-2xl border border-coral/30 bg-coral/[0.06] p-5 transition-colors hover:border-coral/60"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-coral/15 text-coral">
                    <Phone className="h-5 w-5" strokeWidth={1.9} />
                  </span>
                  <span>
                    <span className="block font-semibold text-ink">
                      Spoed of crisis? Bel ons direct
                    </span>
                    <span className="mt-0.5 block text-sm text-ink-soft">
                      Dan schakelen we vrijwel direct —{" "}
                      <span className="font-semibold text-ink">{CONTACT.phone}</span>, 24/7
                      bereikbaar.
                    </span>
                  </span>
                </a>
              </Reveal>

              <Reveal delay={0.18}>
                <dl className="mt-10 flex flex-col gap-5">
                  <div>
                    <dt className="eyebrow text-grey">Telefoon</dt>
                    <dd className="mt-1">
                      <a href={CONTACT.phoneHref} className="text-lg text-ink hover:text-brand">{CONTACT.phone}</a>
                    </dd>
                  </div>
                  <div>
                    <dt className="eyebrow text-grey">E-mail</dt>
                    <dd className="mt-1">
                      <a href={`mailto:${CONTACT.email}`} className="text-lg text-ink hover:text-brand">{CONTACT.email}</a>
                    </dd>
                  </div>
                  <div>
                    <dt className="eyebrow text-grey">Bezoek</dt>
                    <dd className="mt-1 text-lg text-ink">{CONTACT.address}</dd>
                  </div>
                </dl>
              </Reveal>
            </div>

            {/* rechterkolom — formulier */}
            <Reveal delay={0.1} className="rounded-[32px] border border-hairline bg-mist p-6 sm:p-9">
              <ContactForm />
            </Reveal>
          </div>
        </section>
      </main>
      <DarkPanel>
        <Footer />
      </DarkPanel>
    </>
  );
}
