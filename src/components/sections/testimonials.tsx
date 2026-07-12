import { getTranslations } from "next-intl/server";
import { Star } from "lucide-react";

import { Container } from "@/components/container";
import { SectionHead } from "@/components/section-head";
import type { Stat, Testimonial } from "@/lib/content";

/** First letters of the first two words of a name, for the avatar chip. */
function initials(name: string): string {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export async function Testimonials() {
  const t = await getTranslations("testimonials");
  const stats = t.raw("stats") as Stat[];
  const items = t.raw("items") as Testimonial[];

  return (
    <section id="testimonials" className="py-24">
      <Container>
        <SectionHead
          className="reveal"
          eyebrow={t("eyebrow")}
          title={t("title")}
          sub={t("sub")}
        />

        <div className="reveal mb-12 grid grid-cols-3 gap-4 rounded-2xl border border-line bg-panel/50 px-6 py-7 text-center">
          {stats.map((stat) => (
            <div key={stat.label}>
              <div className="font-display text-[clamp(24px,4vw,34px)] font-bold leading-none tracking-[-0.02em] text-peacock">
                {stat.value}
              </div>
              <div className="mt-2 font-mono text-[11px] uppercase tracking-[0.08em] text-mist">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-[18px] md:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <figure
              key={item.name}
              className="reveal flex flex-col rounded-2xl border border-line bg-panel p-6 transition-colors duration-[250ms] hover:border-peacock"
            >
              <div className="mb-4 flex gap-1 text-peacock">
                {Array.from({ length: item.rating }).map((_, i) => (
                  <Star key={i} size={15} fill="currentColor" strokeWidth={0} />
                ))}
              </div>
              <blockquote className="flex-1 text-[14.5px] leading-[1.7] text-paper">
                {`“${item.quote}”`}
              </blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-line bg-panel-2 font-mono text-xs text-peacock">
                  {initials(item.name)}
                </span>
                <span>
                  <span className="block font-display text-[15px] font-semibold">
                    {item.name}
                  </span>
                  <span className="block font-mono text-[11px] tracking-[0.04em] text-mist">
                    {item.company}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
