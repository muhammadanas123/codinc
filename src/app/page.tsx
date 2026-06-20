import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/sections/hero";
import { IndustriesStrip } from "@/components/sections/industries-strip";
import { Services } from "@/components/sections/services";
import { Work } from "@/components/sections/work";
import { About } from "@/components/sections/about";
import { Team } from "@/components/sections/team";
import { Contact } from "@/components/sections/contact";
import { SiteFooter } from "@/components/sections/footer";
import { ScrollRevealProvider } from "@/components/scroll-reveal-provider";

export default function HomePage() {
  return (
    <ScrollRevealProvider>
      <SiteHeader />
      <main>
        <Hero />
        <IndustriesStrip />
        <Services />
        <Work />
        <About />
        <Team />
        <Contact />
      </main>
      <SiteFooter />
    </ScrollRevealProvider>
  );
}
