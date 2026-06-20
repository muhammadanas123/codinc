import { Container } from "@/components/container";
import { ContactForm } from "@/components/contact-form";
import { siteConfig } from "@/lib/content";

export function Contact() {
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
            Have something to build?
          </h2>
          <p className="relative mb-2 text-[17px] text-mist">
            Tell us what you&apos;re working on. We&apos;ll tell you honestly if
            we&apos;re the right team for it.
          </p>
          <ContactForm />
          <div className="relative mt-[26px] font-mono text-sm text-peacock">
            {siteConfig.email}
          </div>
        </div>
      </Container>
    </section>
  );
}
