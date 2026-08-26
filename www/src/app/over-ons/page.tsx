import type { Metadata } from "next";
import { BookOpen, Target, Footprints, Sparkles } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { DarkPanel } from "@/components/site/DarkPanel";
import { Reveal } from "@/components/site/Reveal";
import { FaqSection } from "@/components/site/FaqSection";
import { CtaBlock } from "@/components/site/CtaBlock";
import { Testimonials } from "@/components/site/Testimonials";
import { PARTNER_LOGOS } from "@/lib/site";

import { IconBadge } from "@/components/site/IconBadge";
export const metadata: Metadata = {
  title: "Over ons",
  description:
    "MENT4L is een frisse benadering van sociaal werk, speciaal voor de jongeren van nu. Lees ons verhaal en onze methodiek.",
  alternates: { canonical: "/over-ons" },
};

const VERHAAL = [
  "Wij zijn een groep professionals die al jaren actief zijn in het sociaal domein. Gedurende onze carrière hebben we vaak gezien dat het systeem niet goed aansluit bij wat jongeren echt nodig hebben.",
  "Dat was voor ons het moment om in actie te komen. We vroegen ons af: kan het niet beter? En het antwoord was volmondig ja.",
  "MENT4L is een frisse benadering van sociaal werk, speciaal voor de jongeren van nu. We bieden praktische begeleiding die aansluit bij hun leefwereld.",
];

const METHODIEK = [
  { titel: "Toekomstgerichte aanpak", tekst: "De methodiek verhoogt de motivatie om doelen na te streven en te bereiken.", Icon: Target },
  { titel: "Stap voor stap - Op eigen tempo", tekst: "Jongeren leren positieve keuzes te maken, zelfs in moeilijke situaties.", Icon: Footprints },
  { titel: "Geloven in jezelf", tekst: "We helpen jongeren een groeimindset te ontwikkelen, zodat ze in zichzelf geloven.", Icon: Sparkles },
];

export default function OverOnsPage() {
  return (
    <>
      <Nav />
      <main>
        {/* ── HERO ─────────────────────────────────────── */}
        <section className="mx-auto max-w-site px-6 pt-36 sm:pt-40">
          <Reveal>
            <div className="text-center">
              <span className="inline-flex rounded-pill bg-brand px-4 py-1.5 text-sm font-semibold text-canvas">
                Over ons
              </span>
              <h1 className="mt-6 text-[clamp(2.2rem,5.4vw,3.25rem)]">
                Voor de Jeugd van Nu
              </h1>
              <p className="mt-4 text-ink-soft">Een frisse benadering van sociaal werk.</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="mt-10 overflow-hidden rounded-3xl">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/images/overons-hero.png"
                alt="Het team van MENT4L"
                className="aspect-[24/11] w-full object-cover"
              />
            </div>
          </Reveal>
        </section>

        {/* ── ONS VERHAAL ──────────────────────────────── */}
        <section className="mx-auto max-w-site px-6 py-20 sm:py-24">
          <div className="grid gap-10 md:grid-cols-2 md:gap-14">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-pill bg-brand px-4 py-1.5 text-sm font-semibold text-canvas">
                <BookOpen className="h-4 w-4" strokeWidth={1.9} /> Ons verhaal
              </span>
              <h2 className="mt-6 text-[clamp(1.9rem,4vw,2.5rem)]">
                De Toekomst van Jeugdbegeleiding — MENT4L
              </h2>
            </Reveal>
            <Reveal delay={0.06}>
              <div className="flex flex-col gap-4 text-[17px] leading-relaxed text-ink-soft">
                {VERHAAL.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        {/* ── SAMENWERKINGEN ───────────────────────────── */}
        <section className="border-y border-hairline bg-mist">
          <div className="mx-auto max-w-site px-6 py-20 sm:py-24">
            <Reveal>
              <div className="mx-auto max-w-3xl text-center">
                <span className="eyebrow text-grey">Samenwerkingen</span>
                <h2 className="mt-3 text-[clamp(1.5rem,3.2vw,2.25rem)] leading-snug">
                  MENT4L brengt diverse culturen samen om jongeren te empoweren. We durven anders te
                  denken en te vernieuwen.
                </h2>
              </div>
            </Reveal>
            <div className="mt-12 flex flex-wrap items-center justify-center gap-x-12 gap-y-8">
              {PARTNER_LOGOS.map((src) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img key={src} src={src} alt="Samenwerkingspartner" className="h-8 w-auto object-contain sm:h-10" />
              ))}
            </div>
          </div>
        </section>

        {/* ── METHODIEK ────────────────────────────────── */}
        <section className="mx-auto max-w-site px-6 py-20 sm:py-24">
          <div className="grid gap-10 md:grid-cols-[0.9fr_1.1fr] md:gap-14">
            <Reveal>
              <div className="overflow-hidden rounded-3xl">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/overons-team.png"
                  alt="Jeugdcoach van MENT4L"
                  className="aspect-[4/5] w-full object-cover"
                />
              </div>
            </Reveal>
            <Reveal delay={0.06}>
              <span className="eyebrow text-brand">Stap voor stap</span>
              <h2 className="mt-3 text-[clamp(1.75rem,4vw,2.5rem)]">MENT4L Methodiek</h2>
              <div className="mt-8 flex flex-col gap-4">
                {METHODIEK.map((m) => (
                  <div key={m.titel} className="flex items-start gap-4 rounded-2xl border border-hairline bg-canvas p-6">
                    <IconBadge icon={m.Icon} />
                    <div>
                      <h3 className="text-lg leading-snug">{m.titel}</h3>
                      <p className="mt-1 text-sm text-ink-soft">{m.tekst}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </section>

        <FaqSection />
        <CtaBlock />
      </main>
      <DarkPanel>
        <Testimonials />
        <Footer />
      </DarkPanel>
    </>
  );
}
