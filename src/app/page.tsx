import { SiteHeader } from "@/components/site-header";
import { Hero } from "@/components/sections/hero";
import { IndustriesStrip } from "@/components/sections/industries-strip";
import { Services } from "@/components/sections/services";
import { CtaBand } from "@/components/sections/cta-band";
import { CaseStudies } from "@/components/sections/case-studies";
import { About } from "@/components/sections/about";
import { Process } from "@/components/sections/process";
import { Testimonials } from "@/components/sections/testimonials";
import { Faq } from "@/components/sections/faq";
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
        <CtaBand ns="ctaMid" align="between" />
        <CaseStudies />
        <About />
        <Process />
        <Testimonials />
        <Faq />
        <Contact />
        <CtaBand ns="ctaFinal" fullBleed />
      </main>
      <SiteFooter />
    </ScrollRevealProvider>
  );
}
