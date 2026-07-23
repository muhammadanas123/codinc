"use client";

import { useState } from "react";
import { ArrowUpRight, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";

import { Container } from "@/components/container";
import { SectionHead } from "@/components/section-head";
import type { CaseStudy } from "@/lib/content";
import { cn } from "@/lib/utils";

const VISUAL_CLASS: Record<CaseStudy["visual"], string> = {
  v1: "bg-gradient-to-br from-[#0c9bab] to-[#067a86]",
  v2: "bg-gradient-to-br from-[#13202a] to-[#1d3340]",
  v3: "bg-gradient-to-br from-[#102028] to-[#0c9bab33]",
  v4: "bg-gradient-to-br from-[#1a242c] to-[#067a8655]",
  v5: "bg-gradient-to-br from-[#0c9bab] to-[#13202a]",
};

const ALL = "all";

export function CaseStudies() {
  const t = useTranslations("caseStudies");
  const items = t.raw("items") as CaseStudy[];
  const categories = t.raw("categories") as string[];
  const [active, setActive] = useState<string>(ALL);

  const tabs = [ALL, ...categories];
  const isVisible = (item: CaseStudy) =>
    active === ALL || item.category === active;

  return (
    <section id="case-studies" className="py-24">
      <Container>
        <SectionHead
          className="reveal"
          eyebrow={t("eyebrow")}
          title={t("title")}
          sub={t("sub")}
        />

        {/* Category filter — all cards stay mounted; filtering toggles display
            so scroll-reveal never leaves a re-shown card stuck hidden. */}
        <div className="reveal mb-9 flex flex-wrap gap-2">
          {tabs.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActive(tab)}
              aria-pressed={active === tab}
              className={cn(
                "rounded-full border px-4 py-2 font-mono text-[12px] transition-colors",
                active === tab
                  ? "border-peacock bg-peacock/10 text-peacock"
                  : "border-line text-mist hover:border-peacock hover:text-paper",
              )}
            >
              {tab === ALL ? t("allLabel") : tab}
            </button>
          ))}
        </div>

        {/* Reveal lives on this static container, not the cards. The cards'
            className changes when filtering (toggling `hidden`), and React would
            overwrite the imperatively-added `.in` reveal class on every such
            re-render — leaving re-shown cards stuck at opacity:0. */}
        <div className="reveal grid grid-cols-1 gap-[18px]">
          {items.map((item) => (
            <article
              key={item.slug}
              className={cn(
                "grid grid-cols-1 overflow-hidden rounded-2xl border border-line bg-panel transition-colors duration-[250ms] hover:border-peacock md:grid-cols-[300px_1fr]",
                !isVisible(item) && "hidden",
              )}
            >
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={t("visitAriaLabel", { title: item.title })}
                className={cn(
                  "flex min-h-[180px] select-none items-center justify-center font-mono text-[13px] text-white/60 focus-visible:outline-hidden",
                  VISUAL_CLASS[item.visual],
                )}
              >
                [ {item.slug} ]
              </a>

              <div className="p-6 md:p-8">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-peacock">
                    {item.label}
                  </span>
                  <span className="inline-flex shrink-0 items-center gap-1 font-mono text-[11px] uppercase tracking-[0.08em] text-mist">
                    <MapPin size={12} className="text-peacock" />
                    {item.country}
                  </span>
                </div>
                <h3 className="mb-2 font-display text-[22px] font-semibold tracking-[-0.01em]">
                  {item.title}
                </h3>
                <p className="mb-5 max-w-[62ch] text-[14.5px] leading-[1.6] text-mist">
                  {item.description}
                </p>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div>
                    <div className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-mist-dim">
                      {t("challengeLabel")}
                    </div>
                    <p className="text-[13px] leading-[1.55] text-mist">
                      {item.challenge}
                    </p>
                  </div>
                  <div>
                    <div className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-mist-dim">
                      {t("solutionLabel")}
                    </div>
                    <p className="text-[13px] leading-[1.55] text-mist">
                      {item.solution}
                    </p>
                  </div>
                  <div>
                    <div className="mb-1.5 font-mono text-[10px] uppercase tracking-[0.14em] text-mist-dim">
                      {t("resultLabel")}
                    </div>
                    <p className="text-[13px] leading-[1.55] text-mist">
                      {item.result}
                    </p>
                  </div>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {item.metrics.map((metric) => (
                    <span
                      key={metric}
                      className="rounded-[7px] border border-peacock/30 bg-peacock/5 px-2.5 py-1 font-mono text-[11px] text-peacock"
                    >
                      {metric}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
                  <div className="flex flex-wrap gap-[7px]">
                    {item.tech.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-[7px] border border-line px-[9px] py-1 font-mono text-[11px] text-mist-dim"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 font-mono text-xs text-peacock transition-colors hover:text-paper"
                  >
                    {t("visitSite")}
                    <ArrowUpRight size={14} />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
