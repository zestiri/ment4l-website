import Link from "next/link";
import { Reveal } from "./Reveal";
import { Photo } from "./Photo";
import { Doodle } from "./Doodle";
import { Icon } from "./Icon";
import { CountUp } from "./CountUp";

// Hero-foto (gegenereerd met nano-banana, v3a — moderne groepsactiviteit)
const HERO_IMG: string | undefined = "/images/scholen/hero.png";

function StatBadge() {
  return (
    <div className="flex items-center gap-3 rounded-[20px] border border-hairline bg-canvas/95 px-5 py-4 shadow-[var(--shadow-lift)] backdrop-blur-xl">
      <span className="grid h-10 w-10 place-items-center rounded-xl bg-brand/10 text-brand">
        <Icon name="heart" className="h-5 w-5" strokeWidth={1.8} />
      </span>
      <div>
        <div className="font-serif text-2xl font-bold leading-none text-brand">
          <CountUp to={1000} suffix="+" />
        </div>
        <div className="mt-1 text-[11px] text-grey">talenten ontwikkeld</div>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="texture pointer-events-none absolute inset-0 [mask-image:linear-gradient(90deg,#000_0,transparent_14%,transparent_52%,#000_100%)]" />
      <div className="animate-floaty pointer-events-none absolute -left-28 top-56 h-[360px] w-[360px] rounded-full bg-coral/10 blur-3xl" />

      {/* Desktop: foto vult ~57% van het scherm met een diagonale snede in het midden */}
      <div className="absolute inset-y-0 right-0 hidden w-[57%] lg:block">
        <div className="group relative h-full w-full [clip-path:polygon(15%_0,100%_0,100%_100%,0_100%)]">
          <Photo
            src={HERO_IMG}
            alt="Kinderen in actie tijdens een naschools ment4l-programma"
            icon={<Icon name="camera" className="h-11 w-11" strokeWidth={1.5} />}
            label="Hero-foto volgt"
            priority
            sizes="55vw"
            rounded="rounded-none"
            className="h-full w-full"
          />
          {/* zachte canvas-fade langs de diagonale naad voor een vloeiende overgang */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-canvas/45 via-transparent to-transparent" />
        </div>
        <div className="absolute bottom-12 left-[19%] hidden xl:block">
          <StatBadge />
        </div>
      </div>

      {/* Content links */}
      <div className="relative z-10 mx-auto max-w-7xl px-6 pb-16 pt-36 sm:pt-40">
        <div className="lg:flex lg:min-h-[80vh] lg:max-w-[40%] lg:flex-col lg:justify-center lg:pb-12 lg:pr-6">
          <div className="relative">
            <Doodle
              name="sparkle"
              className="animate-twinkle absolute -left-5 top-8 hidden h-6 w-6 text-coral sm:block"
            />
            <Reveal>
              <span className="eyebrow text-brand">Naschools aanbod voor scholen</span>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="mt-5 text-[clamp(3rem,7vw,5.25rem)] leading-[0.95]">
                Waar kinderen{" "}
                <span className="relative whitespace-nowrap text-brand">
                  groeien
                  <Doodle
                    name="underline"
                    strokeWidth={5}
                    className="absolute -bottom-1 left-0 h-3 w-full text-coral"
                  />
                </span>
                .
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-md text-lg text-ink-soft">
                Bakken, rappen of bouwen is het middel. Zelfvertrouwen en talent zijn het doel.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  href="/scholen#aanbod"
                  className="rounded-pill bg-brand px-7 py-3.5 text-[15px] font-semibold text-canvas shadow-[0_12px_26px_rgba(31,102,255,0.28)] transition-transform hover:-translate-y-0.5"
                >
                  Bekijk het aanbod
                </Link>
                <Link
                  href="/scholen#werkwijze"
                  className="rounded-pill border border-hairline px-7 py-3.5 text-[15px] font-semibold text-ink transition-colors hover:border-ink"
                >
                  Hoe het werkt
                </Link>
              </div>
            </Reveal>
          </div>
        </div>

        {/* Mobiel: foto gestapeld eronder */}
        <Reveal delay={0.1} y={26} className="group relative mt-12 lg:hidden">
          <Photo
            src={HERO_IMG}
            alt="Kinderen in actie tijdens een naschools ment4l-programma"
            icon={<Icon name="camera" className="h-11 w-11" strokeWidth={1.5} />}
            label="Hero-foto volgt"
            priority
            sizes="100vw"
            className="aspect-[4/5] w-full shadow-[var(--shadow-lift)]"
          />
          <div className="absolute -bottom-5 -left-3 flex sm:-left-5">
            <StatBadge />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
