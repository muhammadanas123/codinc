import { getTranslations } from "next-intl/server";
import { ChevronDown } from "lucide-react";

import { Container } from "@/components/container";
import { BookCall } from "@/components/book-call";
import type { FaqItem } from "@/lib/content";

/**
 * FAQ accordion built on native <details>/<summary> — no client JS, so it stays
 * statically prerenderable and works without hydration. The chevron rotates via
 * the `group-open:` variant.
 */
export async function Faq() {
  const t = await getTranslations("faq");
  const items = t.raw("items") as FaqItem[];

  return (
    <section id="faq" className="py-24">
      <Container>
        <div className="grid grid-cols-1 gap-[50px] lg:grid-cols-[0.8fr_1.2fr]">
          <div className="reveal">
            <p className="mb-[14px] font-mono text-[13px] uppercase tracking-[0.16em] text-peacock">
              {t("eyebrow")}
            </p>
            <h2 className="mb-5 max-w-[14ch] font-display text-[clamp(28px,4vw,44px)] font-bold leading-[1.08] tracking-[-0.02em]">
              {t("title")}
            </h2>
            <p className="mb-7 max-w-[34ch] text-base leading-[1.6] text-mist">
              {t("sub")}
            </p>
            <BookCall label={t("askLabel")} variant="ghost" />
          </div>

          <div className="reveal flex flex-col gap-3">
            {items.map((item) => (
              <details
                key={item.question}
                className="group rounded-[14px] border border-line bg-panel px-5 transition-colors open:border-peacock hover:border-peacock"
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 font-display text-[16px] font-semibold [&::-webkit-details-marker]:hidden">
                  {item.question}
                  <ChevronDown
                    size={18}
                    className="shrink-0 text-peacock transition-transform duration-300 group-open:rotate-180"
                  />
                </summary>
                <p className="pb-5 text-[14.5px] leading-[1.7] text-mist">
                  {item.answer}
                </p>
              </details>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
