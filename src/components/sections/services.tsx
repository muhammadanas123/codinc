import { getTranslations } from "next-intl/server";

import { Container } from "@/components/container";
import { SectionHead } from "@/components/section-head";
import { Card, CardContent } from "@/components/ui/card";
import type { Service } from "@/lib/content";

export async function Services() {
  const t = await getTranslations("services");
  const services = t.raw("items") as Service[];

  return (
    <section id="services" className="py-24">
      <Container>
        <SectionHead
          className="reveal"
          eyebrow={t("eyebrow")}
          title={t("title")}
          sub={t("sub")}
        />
        <div className="grid grid-cols-1 gap-[18px] md:grid-cols-3">
          {services.map((service) => (
            <Card
              key={service.num}
              className="reveal group transition-all duration-[250ms] hover:-translate-y-1 hover:border-peacock"
            >
              <CardContent>
                <div className="mb-[50px] font-mono text-xs tracking-[0.1em] text-peacock">
                  {service.num}
                </div>
                <h3 className="mb-3 font-display text-[21px] font-semibold tracking-[-0.01em]">
                  {service.title}
                </h3>
                <p className="text-[14.5px] leading-[1.65] text-mist">
                  {service.description}
                </p>
                <div className="mt-[18px] flex flex-wrap gap-[7px]">
                  {service.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-[7px] border border-line px-[9px] py-1 font-mono text-[11px] text-mist-dim"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Container>
    </section>
  );
}
