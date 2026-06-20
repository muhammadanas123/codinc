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
          title="Things we've contributed and shipped."
          sub="A sample of products we've helped design, build, and ship — explore them live."
        />
        <WorkSlider />
      </Container>
    </section>
  );
}
