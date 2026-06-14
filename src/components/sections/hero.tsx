import { Container } from "@/components/container";
import { Terminal } from "@/components/terminal";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/content";

export function Hero() {
  return (
    <section className="relative pb-[70px] pt-[88px]">
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
          Software studio · {siteConfig.location}
        </p>

        <h1 className="mb-[26px] max-w-[14ch] font-display text-[clamp(40px,7vw,82px)] font-bold leading-[1.02] tracking-[-0.03em]">
          We turn ideas into software that{" "}
          <span className="text-peacock">ships</span>.
        </h1>

        <p className="mb-[38px] max-w-[52ch] text-[clamp(16px,2vw,19px)] leading-[1.65] text-mist">
          Codinc is a product &amp; engineering studio. We design, build, and
          run web and mobile applications for teams who need them done right
          &mdash; and done.
        </p>

        <div className="flex flex-wrap gap-[14px]">
          <Button asChild variant="primary">
            <a href="#contact">Start a project →</a>
          </Button>
          <Button asChild variant="ghost">
            <a href="#work">See our work</a>
          </Button>
        </div>

        <Terminal />
      </Container>
    </section>
  );
}
