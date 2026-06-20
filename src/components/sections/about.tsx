import { getTranslations } from "next-intl/server";

import { Container } from "@/components/container";
import type { Stat } from "@/lib/content";

export async function About() {
  const t = await getTranslations("about");
  const stats = t.raw("stats") as Stat[];

  return (
    <section id="about" className="pb-24">
      <Container>
        <div className="grid grid-cols-1 items-center gap-[60px] md:grid-cols-[1.2fr_0.8fr]">
          <div className="reveal">
            <p className="mb-[14px] font-mono text-[13px] uppercase tracking-[0.16em] text-peacock">
              {t("eyebrow")}
            </p>
            <h2 className="mb-6 max-w-[18ch] font-display text-[clamp(28px,4vw,44px)] font-bold leading-[1.08] tracking-[-0.02em]">
              {t("title")}
            </h2>
            <p className="mb-[18px] text-[17px] leading-[1.75] text-paper">
              {t("paragraph1")}
            </p>
            <p className="text-[15.5px] leading-[1.75] text-mist">
              {t("paragraph2")}
            </p>
          </div>

          <div className="reveal grid grid-cols-2 gap-6">
            {stats.map((stat) => (
              <div key={stat.label}>
                <div className="font-display text-[46px] font-bold leading-none tracking-[-0.03em] text-peacock">
                  {stat.value}
                </div>
                <div className="mt-2 font-mono text-xs tracking-[0.04em] text-mist">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
