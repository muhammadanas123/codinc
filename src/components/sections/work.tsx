import { Container } from "@/components/container";
import { SectionHead } from "@/components/section-head";
import { WorkSlider } from "@/components/work-slider";

export function Work() {
  return (
    <section id="work" className="pb-24">
      <Container>
        <SectionHead
          className="reveal"
          eyebrow="// selected work"
          title="Things we've shipped."
          sub="A sample of recent projects. Names withheld where clients asked; outcomes are real."
        />
        <WorkSlider />
      </Container>
    </section>
  );
}
