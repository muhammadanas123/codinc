import { Container } from "@/components/container";
import { stats } from "@/lib/content";

export function About() {
  return (
    <section id="about" className="pb-24">
      <Container>
        <div className="grid grid-cols-1 items-center gap-[60px] md:grid-cols-[1.2fr_0.8fr]">
          <div className="reveal">
            <p className="mb-[14px] font-mono text-[13px] uppercase tracking-[0.16em] text-peacock">
              // who we are
            </p>
            <h2 className="mb-6 max-w-[18ch] font-display text-[clamp(28px,4vw,44px)] font-bold leading-[1.08] tracking-[-0.02em]">
              Small team. Senior hands. Real ownership.
            </h2>
            <p className="mb-[18px] text-[17px] leading-[1.75] text-paper">
              Codinc is a tight engineering studio. We take on a focused number
              of projects so each one gets people who actually care about the
              outcome.
            </p>
            <p className="text-[15.5px] leading-[1.75] text-mist">
              We work the way good software gets made: short feedback loops,
              working software early, and a bias for shipping over talking. When
              we hand something over, it&apos;s documented, tested, and yours.
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
