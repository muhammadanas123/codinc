import { getTranslations } from "next-intl/server";

import { Container } from "@/components/container";
import { Terminal } from "@/components/terminal";
import { BookCall } from "@/components/book-call";
import { Button } from "@/components/ui/button";
import { HeroSphere } from "@/components/hero-sphere";

export async function Hero() {
  const t = await getTranslations("hero");

  return (
    <section className="relative isolate overflow-hidden pb-[70px] pt-[88px]">
      {/* ambient glow behind the code panel (behind content) */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div
          className="absolute -right-24 -top-[80px] h-[600px] w-[600px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, hsl(var(--peacock) / 0.16), transparent 62%)",
          }}
        />
      </div>

      {/* peacock glyph-orb cluster, on the right (wide screens) */}
      <HeroSphere className="pointer-events-none absolute -right-16 top-10 hidden aspect-square w-155 lg:block 2xl:right-4" />

      <Container>
        <p className="mb-6 flex items-center gap-[10px] font-mono text-[13px] uppercase tracking-[0.18em] text-peacock">
          <span className="h-px w-7 bg-peacock" />
          {t("eyebrow")}
        </p>

        <h1 className="mb-[26px] max-w-[14ch] font-display text-[clamp(40px,7vw,82px)] font-bold leading-[1.02] tracking-[-0.03em]">
          {t("headingPrefix")}{" "}
          <span className="text-peacock">{t("headingEmphasis")}</span>.
        </h1>

        <p className="mb-[38px] max-w-[52ch] text-[clamp(16px,2vw,19px)] leading-[1.65] text-mist">
          {t("paragraph")}
        </p>

        <div className="flex flex-wrap gap-[14px]">
          <BookCall label={t("ctaPrimary")} variant="primary" />
          <Button asChild variant="ghost">
            <a href="#case-studies">{t("ctaSecondary")}</a>
          </Button>
        </div>

        <Terminal />
      </Container>
    </section>
  );
}
