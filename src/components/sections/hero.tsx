import { getTranslations } from "next-intl/server";

import { Container } from "@/components/container";
import { Terminal } from "@/components/terminal";
import { BookCall } from "@/components/book-call";
import { Button } from "@/components/ui/button";

export async function Hero() {
  const t = await getTranslations("hero");

  return (
    <section className="relative overflow-hidden pb-[70px] pt-[88px]">
      {/* ambient glow */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-[120px] h-[560px] w-[560px] rounded-full"
        style={{
          background:
            "radial-gradient(circle, hsl(var(--peacock) / 0.18), transparent 65%)",
        }}
      />
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
