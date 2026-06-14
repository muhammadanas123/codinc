import { cn } from "@/lib/utils";

export function SectionHead({
  eyebrow,
  title,
  sub,
  className,
}: {
  eyebrow: string;
  title: string;
  sub: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-[52px] flex flex-wrap items-end justify-between gap-[30px]",
        className,
      )}
    >
      <div>
        <p className="mb-[14px] font-mono text-[13px] uppercase tracking-[0.16em] text-peacock">
          {eyebrow}
        </p>
        <h2 className="max-w-[18ch] font-display text-[clamp(28px,4vw,44px)] font-bold leading-[1.08] tracking-[-0.02em]">
          {title}
        </h2>
      </div>
      <p className="max-w-[38ch] text-base leading-[1.6] text-mist">{sub}</p>
    </div>
  );
}
