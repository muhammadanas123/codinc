# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev        # start dev server (http://localhost:3000)
npm run build      # production build (static prerender)
npm start          # serve the production build
npm run lint       # ESLint (flat config, next/core-web-vitals)
npm run typecheck  # tsc --noEmit
```

There is **no test suite** in this repo. Use `npm run typecheck` + `npm run build` as the correctness gate.

Node is pinned to **24** via `.nvmrc` (`engines.node >= 20.9`); run `nvm use` first. Package manager is **npm** (`package-lock.json`).

## What this is

A single-page marketing site for Codinc (product & engineering studio). One route — `/` — statically prerendered. Next.js 16 App Router, React 19, TypeScript (strict), Tailwind CSS v4.

## Architecture — the big picture

**Content is data, not markup.** All copy, services, case studies, team, stats, and `siteConfig` (name/email/url/location/tagline) live in [src/lib/content.ts](src/lib/content.ts). Components read from it; to change text or projects you edit `content.ts`, never the JSX. Treat this file as the single source of truth — anything that serializes site data (e.g. JSON-LD, metadata) should derive from it so it can't drift.

**Page composition.** [src/app/page.tsx](src/app/page.tsx) composes the section components from [src/components/sections/](src/components/sections/) inside a single `<main>`. [src/app/layout.tsx](src/app/layout.tsx) owns fonts and `metadata`. Component tiers:
- `components/ui/` — shadcn-style primitives (`Button`, `Card`, `Dialog`).
- `components/sections/` — full page sections (hero, services, work, team, about, contact, footer, industries-strip).
- `components/` root — compound/shared pieces (`site-header`, `work-slider`, `terminal`, `contact-form`, `team-member-dialog`, `container`, `section-head`, `brand-mark`).

**Theming pipeline (Tailwind v4, CSS-first — there is no `tailwind.config`).** [src/app/globals.css](src/app/globals.css) defines the brand palette once as HSL CSS variables in `:root` (`--peacock`, `--ink`, `--panel`, `--line`, …) plus shadcn semantic tokens (`--primary`, `--card`, …). An `@theme inline { --color-*: hsl(var(--token)) }` block maps those into Tailwind utilities (`bg-peacock`, `text-mist`, `border-border`) and registers fonts/radius/animations. Change a value in `:root` and it propagates to utilities, shadcn tokens, and raw `hsl(var(--…))` usages alike. Animations use `tw-animate-css` (not `tailwindcss-animate`). The `* { @apply border-border }` rule is load-bearing — it sets the default border color (v4 defaults borders to `currentColor`); don't remove it.

**React 19 conventions.** Components use the **ref-as-prop** pattern, not `forwardRef`/`React.ElementRef` (both are legacy here). Type props with `React.ComponentProps<T>` (which includes `ref`) and spread `{...props}` — no explicit ref forwarding or `displayName`. Match this when adding components.

**Server vs client.** Default to server components. Add `"use client"` only for hooks/state/refs/browser APIs — currently `site-header`, `work-slider`, `terminal`, `contact-form`, `team-member-dialog`, `scroll-reveal-provider`, and the `use-scroll-reveal` / `use-contact-form` hooks. `layout.tsx` and `page.tsx` stay server components. The page must remain statically prerenderable: read URL state via `window.location.hash` in an effect (see [use-contact-form.ts](src/hooks/use-contact-form.ts)), not `useSearchParams`.

**Scroll reveal.** Elements get the `.reveal` class and are revealed by an IntersectionObserver in [src/hooks/use-scroll-reveal.ts](src/hooks/use-scroll-reveal.ts) (mounted via `scroll-reveal-provider`). It is fail-safe: content is visible if JS/observer is absent, and the whole system is disabled under `prefers-reduced-motion`.

## Conventions

- Files are **kebab-case**; hooks prefixed `use-`. Import via the `@/*` alias (→ `src/`), not relative cross-component paths.
- Combine classes with `cn()` from [src/lib/utils.ts](src/lib/utils.ts) (clsx + tailwind-merge).
- Fonts are self-hosted via `next/font/local` from `src/app/fonts/` and exposed as `--font-display` / `--font-sans` / `--font-mono`. No external font/network dependency.
- The favicon uses the App Router file convention ([src/app/icon.svg](src/app/icon.svg)) — no manual `<link>`.
- ESLint uses flat config ([eslint.config.mjs](eslint.config.mjs)); `react-hooks/set-state-in-effect` is intentionally downgraded to `warn` for a few valid effect patterns.

## Deploy

Vercel auto-detects Next.js (no config). Production domain is `codinc.co` (`siteConfig.url`).
