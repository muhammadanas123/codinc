# Codinc — Marketing Site

A one-page marketing site for Codinc, built with **Next.js (App Router) + TypeScript + Tailwind CSS** and a few **shadcn/ui** primitives. Dark theme, Peacock accent (`#067A86` family), with an animated terminal hero and a draggable “work” slider.

## Tech stack

- **Next.js 16** (App Router, React 19, static prerender)
- **TypeScript** (strict)
- **Tailwind CSS** with design tokens as CSS variables (shadcn convention)
- **shadcn/ui** primitives (`Button`, `Card`) themed to the brand palette
- **lucide-react** for icons
- Fonts self-hosted via `next/font/local` (Space Grotesk, Manrope, JetBrains Mono) — no external font dependency at build or runtime

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
```

Build and run production locally:

```bash
npm run build
npm start
```

## Project structure

```
src/
  app/
    fonts/                 # self-hosted .ttf files
    globals.css            # design tokens + base styles
    layout.tsx             # fonts + metadata
    page.tsx               # composes the sections
  components/
    ui/                    # shadcn primitives (button, card)
    sections/              # hero, services, work, about, contact, footer
    site-header.tsx        # sticky nav + mobile menu
    terminal.tsx           # animated console (client)
    work-slider.tsx        # draggable slider w/ arrows + dots (client)
    brand-mark.tsx         # cod|inc wordmark
    container.tsx          # max-width wrapper
    section-head.tsx       # shared section heading
    scroll-reveal-provider.tsx
  hooks/
    use-scroll-reveal.ts   # fail-safe scroll reveal
  lib/
    content.ts             # ALL copy/data — edit here, not in markup
    utils.ts               # cn() helper
```

## Editing content

All copy, services, case studies, and stats live in **`src/lib/content.ts`**.
Swap the placeholder projects and numbers for real ones there — the components
read from it, so you never touch JSX to update text.

The contact email is `siteConfig.email` in the same file.

## Design tokens

Brand colors are defined once in `src/app/globals.css` as HSL CSS variables
(`--peacock`, `--ink`, `--panel`, etc.) and mapped to both Tailwind utilities
(`bg-peacock`, `text-mist`, …) and shadcn semantic tokens (`--primary`,
`--card`, …). Change a value there and it updates everywhere.

## Deploy to Vercel

1. Push this folder to a GitHub repository.
2. In Vercel, **Add New → Project** and import the repo. No configuration needed —
   Vercel detects Next.js automatically.
3. Deploy. SSL is issued automatically.
4. Add your domain (`codinc.co`) under **Project → Settings → Domains** and follow
   the DNS instructions. HTTPS is provisioned for you.

## Notes

- The home page is statically prerendered, so it’s fast and cheap to host.
- Respects `prefers-reduced-motion` (animations disabled for users who ask).
- The case studies and stats are realistic placeholders — replace before launch.
