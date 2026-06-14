import { cn } from "@/lib/utils";

export function BrandMark({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "flex items-center font-display text-2xl font-bold tracking-[-0.02em]",
        className,
      )}
    >
      <span className="text-paper">cod</span>
      <span className="ml-[5px] rounded-lg bg-peacock px-[9px] py-[2px] text-white">
        inc
      </span>
    </span>
  );
}
