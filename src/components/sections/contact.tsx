import { getTranslations } from "next-intl/server";

import { Container } from "@/components/container";
import { ContactForm } from "@/components/contact-form";
import { BookCall } from "@/components/book-call";

export async function Contact() {
  const t = await getTranslations("contact");
  const tSite = await getTranslations("site");

  return (
    <section id="contact" className="pb-24">
      <Container>
        <div className="reveal relative overflow-hidden rounded-[22px] border border-line bg-gradient-to-b from-panel-2 to-ink px-6 py-[60px] text-center md:px-[60px]">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-[100px] left-1/2 h-[300px] w-[480px] -translate-x-1/2"
            style={{
              background:
                "radial-gradient(circle, hsl(var(--peacock) / 0.18), transparent 65%)",
            }}
          />
          <h2 className="relative mb-[18px] font-display text-[clamp(28px,4vw,46px)] font-bold tracking-[-0.02em]">
            {t("heading")}
          </h2>
          <p className="relative mb-8 text-[17px] text-mist">{t("paragraph")}</p>

          <div className="relative flex justify-center">
            <BookCall label={t("bookCta")} variant="primary" />
          </div>

          <div className="relative mx-auto mt-9 flex max-w-[520px] items-center gap-4">
            <span className="h-px flex-1 bg-line" />
            <span className="font-mono text-xs uppercase tracking-[0.12em] text-mist-dim">
              {t("orLabel")}
            </span>
            <span className="h-px flex-1 bg-line" />
          </div>

          <ContactForm />
          <div className="relative mt-[26px] font-mono text-sm text-peacock">
            {tSite("email")}
          </div>
        </div>
      </Container>
    </section>
  );
}
