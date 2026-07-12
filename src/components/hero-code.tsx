import type { ReactNode } from "react";

// syntax token colors
const K = "text-peacock"; // keyword
const F = "text-[#8fd6e6]"; // function
const S = "text-[#9bd7a6]"; // string
const N = "text-[#e0a878]"; // number
const T = "text-[#e6cf8b]"; // type
const C = "text-mist-dim"; // comment

function Ln({ n, children }: { n: number; children: ReactNode }) {
  return (
    <div className="flex">
      <span className="mr-4 w-4 shrink-0 select-none text-right text-mist-dim/50">
        {n}
      </span>
      <span className="whitespace-pre">{children}</span>
    </div>
  );
}

export function HeroCode({ className }: { className?: string }) {
  return (
    <div aria-hidden className={className}>
      <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-panel/70 shadow-[0_40px_100px_-30px_rgba(0,0,0,0.9)] backdrop-blur-md">
        {/* glass sheen */}
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-br from-white/[0.07] via-transparent to-transparent"
        />
        {/* tab bar */}
        <div className="relative flex items-center gap-2 border-b border-white/[0.06] px-4 py-3">
          <span className="h-2 w-2 rounded-full bg-peacock" />
          <span className="font-mono text-[11px] tracking-[0.04em] text-mist">
            ship.ts
          </span>
        </div>

        {/* code */}
        <div className="relative px-4 py-4 font-mono text-[12px] leading-[2] text-mist">
          <Ln n={1}>
            <span className={C}>// turn an idea into shipped software</span>
          </Ln>
          <Ln n={2}>
            <span className={K}>export async function</span>{" "}
            <span className={F}>ship</span>
            {"(idea: "}
            <span className={T}>Idea</span>
            {") {"}
          </Ln>
          <Ln n={3}>
            {"  "}
            <span className={K}>const</span>
            {" spec = "}
            <span className={K}>await</span>{" "}
            <span className={F}>design</span>
            {"(idea)"}
          </Ln>
          <Ln n={4}>
            {"  "}
            <span className={K}>const</span>
            {" app = "}
            <span className={K}>await</span>{" "}
            <span className={F}>build</span>
            {"(spec) "}
            <span className={C}>// web · mobile</span>
          </Ln>
          <Ln n={5}>
            {"  "}
            <span className={K}>await</span>{" "}
            <span className={F}>test</span>
            {"(app, { coverage: "}
            <span className={N}>0.9</span>
            {" })"}
          </Ln>
          <Ln n={6}>
            {"  "}
            <span className={K}>return</span>{" "}
            <span className={F}>deploy</span>
            {"(app, { region: "}
            <span className={S}>&quot;auto&quot;</span>
            {" })"}
          </Ln>
          <Ln n={7}>
            {"}"}
            <span className="ml-1 inline-block h-[1.05em] w-[7px] translate-y-[2px] animate-blink bg-peacock/80 align-middle" />
          </Ln>
        </div>
      </div>
    </div>
  );
}
