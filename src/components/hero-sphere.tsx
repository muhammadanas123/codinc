"use client";

import { useEffect, useRef } from "react";

type Orb = {
  /** center as a fraction of canvas width / height */
  cx: number;
  cy: number;
  /** radius as a fraction of min(width, height) */
  r: number;
  n: number;
  speed: number;
  phase: number;
};

const ORBS: Orb[] = [
  { cx: 0.52, cy: 0.5, r: 0.4, n: 760, speed: 1, phase: 0 },
  { cx: 0.84, cy: 0.19, r: 0.15, n: 150, speed: -1.5, phase: 1.2 },
  { cx: 0.24, cy: 0.82, r: 0.11, n: 90, speed: 1.8, phase: 2.7 },
];

const HUE = 186; // peacock

export function HeroSphere({ className }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = 0;
    let H = 0;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      W = rect.width;
      H = rect.height;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    // Even point spread over a unit sphere (golden-angle / Fibonacci).
    const golden = Math.PI * (3 - Math.sqrt(5));
    const makePoints = (n: number) => {
      const pts: { x: number; y: number; z: number; big: boolean }[] = [];
      for (let i = 0; i < n; i++) {
        const y = 1 - (i / (n - 1)) * 2;
        const rad = Math.sqrt(1 - y * y);
        const th = golden * i;
        pts.push({
          x: Math.cos(th) * rad,
          y,
          z: Math.sin(th) * rad,
          big: i % 9 === 0,
        });
      }
      return pts;
    };
    const orbPts = ORBS.map((o) => makePoints(o.n));

    // Loose dots drifting around the cluster (fixed seeds, gentle sine drift).
    const loose = Array.from({ length: 30 }, (_, i) => {
      const s = Math.sin(i * 12.9898) * 43758.5453;
      const s2 = Math.sin(i * 78.233) * 12543.1234;
      return {
        x: s - Math.floor(s),
        y: s2 - Math.floor(s2),
        z: (i % 5) / 4,
        drift: 4 + (i % 4) * 3,
        phase: i,
      };
    });

    const tilt = -0.3;
    const cosT = Math.cos(tilt);
    const sinT = Math.sin(tilt);
    let clock = 0;

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      const unit = Math.min(W, H);

      // loose drifting dots (behind the orbs)
      for (const d of loose) {
        const dx = Math.sin(clock * 0.6 + d.phase) * d.drift;
        const dy = Math.cos(clock * 0.5 + d.phase) * d.drift;
        const a = 0.05 + d.z * 0.12;
        ctx.fillStyle = `hsla(${HUE}, 45%, ${40 + d.z * 20}%, ${a.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(d.x * W + dx, d.y * H + dy, 0.7 + d.z * 0.8, 0, Math.PI * 2);
        ctx.fill();
      }

      ORBS.forEach((o, oi) => {
        const cx = o.cx * W;
        const cy = o.cy * H;
        const R = unit * o.r;
        const angle = clock * o.speed + o.phase;
        const cosA = Math.cos(angle);
        const sinA = Math.sin(angle);

        const proj = orbPts[oi].map((p) => {
          const x = p.x * cosA + p.z * sinA;
          const zr = -p.x * sinA + p.z * cosA;
          const y2 = p.y * cosT - zr * sinT;
          const z2 = p.y * sinT + zr * cosT;
          return { sx: cx + x * R, sy: cy + y2 * R, z: z2, big: p.big };
        });
        proj.sort((a, b) => a.z - b.z); // back-to-front

        for (const p of proj) {
          const t = (p.z + 1) / 2; // 0 = back, 1 = front
          // rim glow: dots near the silhouette get a small lift
          const rim = Math.hypot(p.sx - cx, p.sy - cy) / R;
          const edge = Math.max(0, rim - 0.75) * 1.4;
          const light = 28 + t * 34 + edge * 12;
          const alpha = 0.08 + t * 0.72 + edge * 0.12;
          const size = (p.big ? 1 : 0.6) + t * 1.3;
          ctx.fillStyle = `hsla(${HUE}, ${68 + t * 16}%, ${light.toFixed(1)}%, ${Math.min(alpha, 0.95).toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(p.sx, p.sy, size, 0, Math.PI * 2);
          ctx.fill();
        }
      });
    };

    let raf = 0;
    let last = 0;
    const loop = (ts: number) => {
      if (last) clock += (ts - last) / 1000 / 6; // ~1 rev per ~38s
      last = ts;
      draw();
      raf = requestAnimationFrame(loop);
    };

    resize();
    draw();

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const onResize = () => {
      resize();
      draw();
    };
    window.addEventListener("resize", onResize);

    let io: IntersectionObserver | undefined;
    if (!reduce) {
      io = new IntersectionObserver(
        ([e]) => {
          cancelAnimationFrame(raf);
          last = 0;
          if (e.isIntersecting) raf = requestAnimationFrame(loop);
        },
        { threshold: 0 },
      );
      io.observe(canvas);
    }

    return () => {
      cancelAnimationFrame(raf);
      io?.disconnect();
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={ref} aria-hidden className={className} />;
}
