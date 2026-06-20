import { getTranslations } from "next-intl/server";

import { Container } from "@/components/container";
import { SectionHead } from "@/components/section-head";
import { WorkSlider } from "@/components/work-slider";

export async function Work() {
  const t = await getTranslations("work");

  return (
    <section id="work" className="pb-24">
      <Container>
        <SectionHead
          className="reveal"
          eyebrow={t("eyebrow")}
          title={t("title")}
          sub={t("sub")}
        />
        <WorkSlider />
      </Container>
    </section>
  );
}
