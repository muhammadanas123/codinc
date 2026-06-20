"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";

import { caseStudies, type CaseStudy } from "@/lib/content";
import { cn } from "@/lib/utils";

const VISUAL_CLASS: Record<CaseStudy["visual"], string> = {
  v1: "bg-gradient-to-br from-[#0c9bab] to-[#067a86]",
  v2: "bg-gradient-to-br from-[#13202a] to-[#1d3340]",
  v3: "bg-gradient-to-br from-[#102028] to-[#0c9bab33]",
  v4: "bg-gradient-to-br from-[#1a242c] to-[#067a8655]",
  v5: "bg-gradient-to-br from-[#0c9bab] to-[#13202a]",
};

const GAP = 18;

export function WorkSlider() {
  const trackRef = useRef<HTMLDivElement>(null);
  const firstCardRef = useRef<HTMLDivElement>(null);

  const [perView, setPerView] = useState(2);
  const [page, setPage] = useState(0);
  const [dragging, setDragging] = useState(false);

  const pages = Math.max(1, caseStudies.length - perView + 1);

  // Drag state kept in a ref so listeners don't re-bind.
  // `moved` flags a real drag so the follow-up click doesn't navigate.
  const drag = useRef({ down: false, startX: 0, curX: 0, moved: false });

  // Suppress a card link click that's really the tail end of a drag/swipe.
  const handleCardClick = (e: React.MouseEvent) => {
    if (drag.current.moved) {
      e.preventDefault();
      drag.current.moved = false;
    }
  };

  const cardStep = useCallback(() => {
    const width = firstCardRef.current?.getBoundingClientRect().width ?? 0;
    return width + GAP;
  }, []);

  const applyTransform = useCallback(
    (offsetPx: number) => {
      const track = trackRef.current;
      if (track) track.style.transform = `translateX(${offsetPx}px)`;
    },
    [],
  );

  const render = useCallback(
    (targetPage: number) => {
      applyTransform(-(targetPage * cardStep()));
    },
    [applyTransform, cardStep],
  );

  // Responsive: 1 card per view on mobile, 2 on desktop.
  useEffect(() => {
    function layout() {
      const next = window.innerWidth <= 880 ? 1 : 2;
      setPerView(next);
    }
    layout();
    let t: number;
    function onResize() {
      window.clearTimeout(t);
      t = window.setTimeout(layout, 150);
    }
    window.addEventListener("resize", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      window.clearTimeout(t);
    };
  }, []);

  // Clamp page when perView changes, and re-render position.
  useEffect(() => {
    setPage((p) => Math.min(p, pages - 1));
  }, [pages]);

  useEffect(() => {
    if (!dragging) render(page);
  }, [page, perView, dragging, render]);

  const goTo = (p: number) => setPage(Math.max(0, Math.min(p, pages - 1)));
  const prev = () => goTo(page - 1);
  const next = () => goTo(page + 1);

  // Pointer drag / swipe.
  useEffect(() => {
    const viewport = trackRef.current?.parentElement;
    if (!viewport) return;

    const onDown = (clientX: number) => {
      drag.current = { down: true, startX: clientX, curX: clientX, moved: false };
      setDragging(true);
    };
    const onMove = (clientX: number) => {
      if (!drag.current.down) return;
      drag.current.curX = clientX;
      const dx = clientX - drag.current.startX;
      if (Math.abs(dx) > 5) drag.current.moved = true;
      applyTransform(-(page * cardStep()) + dx);
    };
    const onUp = () => {
      if (!drag.current.down) return;
      const dx = drag.current.curX - drag.current.startX;
      const threshold = cardStep() * 0.22;
      drag.current.down = false;
      setDragging(false);
      if (dx < -threshold) goTo(page + 1);
      else if (dx > threshold) goTo(page - 1);
      else render(page);
    };

    const mouseDown = (e: MouseEvent) => {
      onDown(e.clientX);
      e.preventDefault();
    };
    const mouseMove = (e: MouseEvent) => onMove(e.clientX);
    const touchStart = (e: TouchEvent) => onDown(e.touches[0].clientX);
    const touchMove = (e: TouchEvent) => onMove(e.touches[0].clientX);

    viewport.addEventListener("mousedown", mouseDown);
    window.addEventListener("mousemove", mouseMove);
    window.addEventListener("mouseup", onUp);
    viewport.addEventListener("touchstart", touchStart, { passive: true });
    viewport.addEventListener("touchmove", touchMove, { passive: true });
    viewport.addEventListener("touchend", onUp);

    return () => {
      viewport.removeEventListener("mousedown", mouseDown);
      window.removeEventListener("mousemove", mouseMove);
      window.removeEventListener("mouseup", onUp);
      viewport.removeEventListener("touchstart", touchStart);
      viewport.removeEventListener("touchmove", touchMove);
      viewport.removeEventListener("touchend", onUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, pages, applyTransform, cardStep, render]);

  return (
    <div className="reveal relative">
      <div className="overflow-hidden rounded-2xl">
        <div
          ref={trackRef}
          className={cn(
            "flex gap-[18px] will-change-transform",
            dragging
              ? "cursor-grabbing"
              : "cursor-grab transition-transform duration-500 ease-[cubic-bezier(0.22,0.7,0.2,1)]",
          )}
        >
          {caseStudies.map((item, index) => (
            <article
              key={item.slug}
              ref={index === 0 ? firstCardRef : undefined}
              className="w-[calc(50%-9px)] shrink-0 overflow-hidden rounded-2xl border border-line bg-panel transition-colors duration-[250ms] hover:border-peacock has-[a:focus-visible]:border-peacock max-[880px]:w-full"
            >
              <a
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                draggable={false}
                onClick={handleCardClick}
                aria-label={`${item.title} — visit site (opens in a new tab)`}
                className="group/card block rounded-2xl focus-visible:outline-none"
              >
                <div
                  className={cn(
                    "flex h-[200px] select-none items-center justify-center font-mono text-[13px] text-white/60",
                    VISUAL_CLASS[item.visual],
                  )}
                >
                  [ {item.slug} ]
                </div>
                <div className="p-6">
                  <div className="mb-[10px] font-mono text-[11px] uppercase tracking-[0.12em] text-peacock">
                    {item.label}
                  </div>
                  <h4 className="mb-2 font-display text-xl font-semibold">
                    {item.title}
                  </h4>
                  <p className="text-sm leading-[1.6] text-mist">
                    {item.description}
                  </p>
                  <span className="mt-4 inline-flex items-center gap-1 font-mono text-xs text-peacock transition-colors group-hover/card:text-paper">
                    Visit site
                    <ArrowUpRight size={14} />
                  </span>
                </div>
              </a>
            </article>
          ))}
        </div>
      </div>

      <div className="mt-[26px] flex items-center justify-between">
        <div className="flex gap-[9px]">
          {Array.from({ length: pages }).map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              className={cn(
                "h-[9px] rounded-full transition-all duration-[250ms]",
                i === page ? "w-[26px] bg-peacock" : "w-[9px] bg-line",
              )}
            />
          ))}
        </div>
        <div className="flex gap-[10px]">
          <button
            type="button"
            aria-label="Previous"
            onClick={prev}
            disabled={page <= 0}
            className="flex h-[46px] w-[46px] items-center justify-center rounded-[11px] border border-line bg-panel text-paper transition-colors hover:border-peacock hover:text-peacock disabled:cursor-default disabled:opacity-30 disabled:hover:border-line disabled:hover:text-paper"
          >
            <ArrowLeft size={18} />
          </button>
          <button
            type="button"
            aria-label="Next"
            onClick={next}
            disabled={page >= pages - 1}
            className="flex h-[46px] w-[46px] items-center justify-center rounded-[11px] border border-line bg-panel text-paper transition-colors hover:border-peacock hover:text-peacock disabled:cursor-default disabled:opacity-30 disabled:hover:border-line disabled:hover:text-paper"
          >
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
