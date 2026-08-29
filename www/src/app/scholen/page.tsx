import { ScrollProgress } from "@/components/scholen/ScrollProgress";
import { Nav } from "@/components/scholen/Nav";
import { Hero } from "@/components/scholen/Hero";
import { Marquee } from "@/components/scholen/Marquee";
import { Werkwijze } from "@/components/scholen/Werkwijze";
import { Uniek } from "@/components/scholen/Uniek";
import { Aanbod } from "@/components/scholen/Aanbod";
import { Gka } from "@/components/scholen/Gka";
import { Cta } from "@/components/scholen/Cta";
import { Footer } from "@/components/scholen/Footer";
import { CATEGORIEEN } from "@/lib/programmas";

export default function Home() {
  return (
    <>
      <ScrollProgress />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Werkwijze />
        <Uniek />
        <Aanbod categorieen={CATEGORIEEN} />
        <Gka />
        <Cta />
      </main>
      <Footer />
    </>
  );
}
