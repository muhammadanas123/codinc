import { getTranslations } from "next-intl/server";

import { Container } from "@/components/container";
import { BookCall } from "@/components/book-call";
import { cn } from "@/lib/utils";

/**
 * Reusable "Book a call" banner. `ns` selects which block in en.yml supplies the
 * copy (ctaMid / ctaFinal); `align` picks a compact horizontal band or a big
 * centered one.
 */
export async function CtaBand({
  ns,
  align = "center",
  fullBleed = false,
}: {
  ns: "ctaMid" | "ctaFinal";
  align?: "center" | "between";
  /** Full-width, edge-to-edge closing band (sits directly above the footer). */
  fullBleed?: boolean;
}) {
  const t = await getTranslations(ns);
  const hasEyebrow = t.has("eyebrow");

  if (fullBleed) {
    return (
      <section
        className="relative overflow-hidden border-t border-line py-[110px] text-center"
        style={{
          background:
            "linear-gradient(180deg, hsl(var(--peacock-deep) / 0.22), hsl(var(--peacock-deep) / 0.06) 55%, hsl(var(--ink)))",
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[820px] -translate-x-1/2 -translate-y-1/2"
          style={{
            background:
              "radial-gradient(ellipse, hsl(var(--peacock) / 0.14), transparent 70%)",
          }}
        />
        <Container>
          <div className="reveal relative mx-auto max-w-[46ch]">
            {hasEyebrow && (
              <p className="mb-4 font-mono text-[13px] uppercase tracking-[0.18em] text-peacock">
                {t("eyebrow")}
              </p>
            )}
            <h2 className="font-display text-[clamp(30px,4.6vw,52px)] font-bold leading-[1.05] tracking-[-0.02em]">
              {t("title")}
            </h2>
            <p className="mx-auto mt-5 max-w-[42ch] text-[17px] leading-[1.6] text-mist">
              {t("sub")}
            </p>
            <div className="mt-9 flex justify-center">
              <BookCall label={t("button")} variant="primary" />
            </div>
          </div>
        </Container>
      </section>
    );
  }

  const centered = align === "center";

  return (
    <section className="pb-24">
      <Container>
        <div
          className={cn(
            "reveal relative overflow-hidden rounded-[22px] border border-line bg-gradient-to-b from-panel-2 to-ink px-6 md:px-[60px]",
            centered
              ? "py-[60px] text-center"
              : "flex flex-col items-start justify-between gap-7 py-[42px] text-left md:flex-row md:items-center",
          )}
        >
          <div
            aria-hidden
            className="pointer-events-none absolute -top-[100px] left-1/2 h-[300px] w-[480px] -translate-x-1/2"
            style={{
              background:
                "radial-gradient(circle, hsl(var(--peacock) / 0.16), transparent 65%)",
            }}
          />
          <div className={cn("relative", centered && "mx-auto max-w-[42ch]")}>
            {hasEyebrow && (
              <p className="mb-[14px] font-mono text-[13px] uppercase tracking-[0.16em] text-peacock">
                {t("eyebrow")}
              </p>
            )}
            <h2 className="font-display text-[clamp(26px,3.6vw,40px)] font-bold tracking-[-0.02em]">
              {t("title")}
            </h2>
            <p className="mt-3 text-[16px] leading-[1.6] text-mist">{t("sub")}</p>
          </div>
          <div
            className={cn(
              "relative shrink-0",
              centered && "mt-8 flex justify-center",
            )}
          >
            <BookCall label={t("button")} variant="primary" />
          </div>
        </div>
      </Container>
    </section>
  );
}
