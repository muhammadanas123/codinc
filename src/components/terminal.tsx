"use client";

import { useEffect, useRef, useState } from "react";

interface Segment {
  text: string;
  className: string;
}

/** Each line is an array of colored segments — plain text, no HTML entities. */
const LINES: { segments: Segment[]; speed: number }[] = [
  {
    segments: [
      { text: "codinc ~ %", className: "text-peacock" },
      { text: " whoami", className: "text-paper" },
    ],
    speed: 60,
  },
  {
    segments: [
      { text: "a product & engineering studio", className: "text-paper" },
    ],
    speed: 18,
  },
  {
    segments: [
      { text: "# design \u00b7 build \u00b7 ship \u00b7 run", className: "text-mist-dim" },
    ],
    speed: 18,
  },
  {
    segments: [
      { text: "codinc ~ %", className: "text-peacock" },
      { text: " run build --your-idea", className: "text-paper" },
    ],
    speed: 60,
  },
  {
    segments: [
      { text: "\u2713 scoped", className: "text-[#28c840]" },
      { text: "  ", className: "" },
      { text: "\u2713 designed", className: "text-[#28c840]" },
      { text: "  ", className: "" },
      { text: "\u2713 built", className: "text-[#28c840]" },
      { text: "  ", className: "" },
      { text: "\u2713 shipped", className: "text-[#28c840]" },
    ],
    speed: 30,
  },
];

export function Terminal() {
  const bodyRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  // Start typing once the console scrolls into view.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      setStarted(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setStarted(true);
          obs.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    const body = bodyRef.current;
    if (!body) return;
    body.innerHTML = "";

    const timers: number[] = [];
    let lineIndex = 0;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    function makeLineEl() {
      const div = document.createElement("div");
      body!.appendChild(div);
      return div;
    }

    function fullText(segs: Segment[]) {
      return segs.map((s) => s.text).join("");
    }

    function renderColored(div: HTMLDivElement, segs: Segment[]) {
      div.innerHTML = "";
      segs.forEach((seg) => {
        const span = document.createElement("span");
        if (seg.className) span.className = seg.className;
        span.textContent = seg.text;
        div.appendChild(span);
      });
    }

    function appendCursor() {
      const div = makeLineEl();
      const prompt = document.createElement("span");
      prompt.className = "text-peacock";
      prompt.textContent = "codinc ~ %";
      const cursor = document.createElement("span");
      cursor.className =
        "ml-2 inline-block h-[18px] w-[9px] translate-y-[3px] animate-blink bg-peacock align-baseline";
      div.appendChild(prompt);
      div.appendChild(cursor);
    }

    function typeLine() {
      if (lineIndex >= LINES.length) {
        appendCursor();
        return;
      }
      const line = LINES[lineIndex];
      const div = makeLineEl();

      if (prefersReduced) {
        renderColored(div, line.segments);
        lineIndex += 1;
        timers.push(window.setTimeout(typeLine, 120));
        return;
      }

      const plain = fullText(line.segments);
      const typer = document.createElement("span");
      typer.className = line.segments[0]?.className ?? "text-paper";
      div.appendChild(typer);

      let i = 0;
      const interval = window.setInterval(() => {
        i += 1;
        typer.textContent = plain.slice(0, i);
        if (i >= plain.length) {
          window.clearInterval(interval);
          renderColored(div, line.segments); // swap to final colored version
          lineIndex += 1;
          timers.push(window.setTimeout(typeLine, 180));
        }
      }, line.speed);
      timers.push(interval);
    }

    const start = window.setTimeout(typeLine, 400);
    timers.push(start);

    return () => timers.forEach((t) => window.clearTimeout(t));
  }, [started]);

  return (
    <div
      ref={containerRef}
      className="mt-16 overflow-hidden rounded-2xl border border-line bg-gradient-to-b from-panel to-ink shadow-[0_40px_80px_-40px_rgba(0,0,0,0.8)]"
    >
      <div className="flex items-center gap-2 border-b border-line bg-panel-2 px-[18px] py-[14px]">
        <i className="inline-block h-[11px] w-[11px] rounded-full bg-[#ff5f57]" />
        <i className="inline-block h-[11px] w-[11px] rounded-full bg-[#febc2e]" />
        <i className="inline-block h-[11px] w-[11px] rounded-full bg-[#28c840]" />
        <span className="ml-[14px] font-mono text-xs text-mist-dim">
          ~/codinc — zsh
        </span>
      </div>
      <div
        ref={bodyRef}
        className="min-h-[180px] p-[26px] font-mono text-[14.5px] leading-[2]"
      />
    </div>
  );
}
