import { getTranslations } from "next-intl/server";

import { Container } from "@/components/container";
import { SectionHead } from "@/components/section-head";
import { BookCall } from "@/components/book-call";
import type { ProcessStep } from "@/lib/content";

export async function Process() {
  const t = await getTranslations("process");
  const steps = t.raw("steps") as ProcessStep[];

  return (
    <section id="process" className="py-24">
      <Container>
        <SectionHead
          className="reveal"
          eyebrow={t("eyebrow")}
          title={t("title")}
          sub={t("sub")}
        />
        <div className="grid grid-cols-1 gap-[18px] sm:grid-cols-2 lg:grid-cols-5">
          {steps.map((step) => (
            <div
              key={step.num}
              className="reveal rounded-2xl border border-line bg-panel p-6 transition-colors duration-[250ms] hover:border-peacock"
            >
              <div className="mb-5 font-display text-[40px] font-bold leading-none tracking-[-0.03em] text-peacock/25">
                {step.num}
              </div>
              <h3 className="mb-2 font-display text-[19px] font-semibold tracking-[-0.01em]">
                {step.title}
              </h3>
              <p className="text-[14px] leading-[1.6] text-mist">
                {step.description}
              </p>
            </div>
          ))}
        </div>
        <div className="reveal mt-11 flex justify-center">
          <BookCall label={t("cta")} variant="primary" />
        </div>
      </Container>
    </section>
  );
}
