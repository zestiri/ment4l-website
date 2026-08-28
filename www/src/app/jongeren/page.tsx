import type { Metadata } from "next";
import Link from "next/link";
import { Phone, MessageCircle } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { DarkPanel } from "@/components/site/DarkPanel";
import { Reveal } from "@/components/site/Reveal";
import { CONTACT, AANMELD_URL, HERO_AVATARS } from "@/lib/site";

export const metadata: Metadata = {
  title: "Hulp voor jezelf regelen",
  description:
    "Ben je 16 of ouder? Dan mag je jezelf aanmelden voor hulp. Een coach die naar je luistert, geen wachtlijst. MENT4L in West-Brabant West.",
  alternates: { canonical: "/jongeren" },
};

/** WhatsApp-terugbelverzoek: bewust géén zorginhoud via WhatsApp. */
const WA_LINK =
  "https://wa.me/31851307522?text=" +
  encodeURIComponent("Hoi, ik wil graag teruggebeld worden over begeleiding.");

const WAT_WEL = [
  "Je krijgt een vaste coach, geen wisselend team",
  "We komen naar jou toe: thuis, op school of ergens anders",
  "Je mag vragen om een coach die jouw taal spreekt of je achtergrond kent",
  "Wat je vertelt blijft tussen jou en je coach, tenzij je onveilig bent",
];

export default function JongerenPage() {
  return (
    <>
      <Nav />
      <main>
        {/* ── HERO ────────────────────────────────────────── */}
        <section className="relative overflow-hidden bg-mist pt-8">
          <div className="tex-diagonal pointer-events-none absolute inset-0" aria-hidden />
          <div className="relative mx-auto w-full max-w-[1100px] rounded-t-[32px] bg-canvas">
            <div className="px-6 pb-16 pt-24 sm:pt-28">
              <div className="mx-auto max-w-2xl text-center">
                <span className="eyebrow justify-center text-brand">Vanaf 16 jaar</span>
                <h1 className="mt-4 text-[clamp(2.1rem,5vw,3.25rem)]">
                  Je mag dit zelf regelen
                </h1>
                <p className="mx-auto mt-5 max-w-xl text-lg text-ink-soft">
                  Ben je 16 of ouder? Dan hoef je niet te wachten tot je ouders of school
                  iets doen. Je kunt jezelf aanmelden. Wij bellen je terug, meestal binnen
                  4 uur.
                </p>

                <div className="mt-9 flex flex-wrap items-center justify-center gap-3">
                  <a
                    href={WA_LINK}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-pill bg-brand px-7 py-3.5 text-[15px] font-semibold text-canvas transition-colors hover:bg-brand-2"
                  >
                    <MessageCircle className="h-4 w-4" strokeWidth={2} />
                    App ons
                  </a>
                  <a
                    href={CONTACT.phoneHref}
                    className="inline-flex items-center gap-2 rounded-pill border border-hairline px-7 py-3.5 text-[15px] font-semibold text-ink transition-colors hover:border-ink"
                  >
                    <Phone className="h-4 w-4" strokeWidth={2} />
                    Bellen
                  </a>
                </div>
                <p className="mt-4 text-sm text-grey">
                  Liever typen?{" "}
                  <Link href={AANMELD_URL} className="underline hover:text-ink">
                    Vul het korte formulier in
                  </Link>
                </p>

                <div className="mt-9 flex items-center justify-center gap-3">
                  <div className="flex -space-x-3">
                    {HERO_AVATARS.slice(0, 4).map((src) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        key={src}
                        src={src}
                        alt=""
                        className="h-9 w-9 rounded-full border-2 border-canvas object-cover"
                      />
                    ))}
                  </div>
                  <span className="text-sm text-grey">
                    Coaches met verschillende achtergronden
                  </span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── WAT KRIJG JE ────────────────────────────────── */}
        <section className="mx-auto max-w-site px-6 py-20 sm:py-24">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
            <Reveal>
              <h2 className="text-[clamp(1.75rem,4vw,2.5rem)]">Wat je krijgt</h2>
              <ul className="mt-6 flex flex-col gap-3">
                {WAT_WEL.map((w) => (
                  <li
                    key={w}
                    className="rounded-2xl border border-hairline bg-canvas p-4 text-ink"
                  >
                    {w}
                  </li>
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.06}>
              <div className="rounded-3xl bg-sand p-7">
                <h3 className="text-lg">Kost het geld?</h3>
                <p className="mt-2 text-ink-soft">
                  Nee. Jeugdhulp wordt betaald door je gemeente. Jij of je ouders betalen
                  geen eigen bijdrage.
                </p>
                <h3 className="mt-7 text-lg">Moeten mijn ouders het weten?</h3>
                <p className="mt-2 text-ink-soft">
                  Vanaf 16 jaar beslis je zelf over je hulp. In het gesprek bespreken we wat
                  jij wilt dat er met je ouders gedeeld wordt.
                </p>
                <h3 className="mt-7 text-lg">Hoe lang duurt het voordat ik iemand spreek?</h3>
                <p className="mt-2 text-ink-soft">
                  We streven ernaar je binnen 4 uur terug te bellen, ook &rsquo;s avonds en
                  in het weekend. Er is geen wachtlijst.
                </p>
              </div>
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
