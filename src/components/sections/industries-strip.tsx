import { Container } from "@/components/container";
import { industries } from "@/lib/content";

export function IndustriesStrip() {
  return (
    <div className="border-y border-line py-[42px]">
      <Container>
        <p className="mb-[26px] text-center font-mono text-xs uppercase tracking-[0.16em] text-mist-dim">
          Trusted by teams building in
        </p>
        <div className="flex flex-wrap items-center justify-center gap-x-[54px] gap-y-4 opacity-60">
          {industries.map((industry) => (
            <span
              key={industry}
              className="font-display text-[19px] font-semibold text-mist"
            >
              {industry}
            </span>
          ))}
        </div>
      </Container>
    </div>
  );
}
