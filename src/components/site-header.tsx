"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import { Container } from "@/components/container";
import { BrandMark } from "@/components/brand-mark";
import type { NavLink } from "@/lib/content";
import { cn } from "@/lib/utils";

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const t = useTranslations("nav");
  const tSite = useTranslations("site");
  const navLinks = t.raw("links") as NavLink[];
  const calLink = tSite("calLink");

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-ink/70 backdrop-blur-[14px]">
      <Container>
        <nav className="flex h-[70px] items-center justify-between">
          <a href="#" aria-label={t("homeAriaLabel")}>
            <BrandMark />
          </a>

          <div className="hidden items-center gap-7 lg:flex">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-mist transition-colors hover:text-paper"
              >
                {link.label}
              </a>
            ))}
            <a
              href={calLink}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-[9px] border border-peacock px-4 py-[9px] font-mono text-[13px] text-peacock transition-colors hover:bg-peacock hover:text-[#031013]"
            >
              {t("cta")}
            </a>
          </div>

          <button
            type="button"
            aria-label={t("toggleMenu")}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex flex-col gap-[5px] lg:hidden"
          >
            <span className="h-0.5 w-6 bg-paper" />
            <span className="h-0.5 w-6 bg-paper" />
            <span className="h-0.5 w-6 bg-paper" />
          </button>
        </nav>
      </Container>

      {/* Mobile menu */}
      <div
        className={cn(
          "overflow-hidden border-t border-line transition-[max-height] duration-300 lg:hidden",
          open ? "max-h-[380px]" : "max-h-0",
        )}
      >
        <Container>
          <div className="flex flex-col gap-1 py-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-3 text-sm font-medium text-mist transition-colors hover:text-paper"
              >
                {link.label}
              </a>
            ))}
            <a
              href={calLink}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setOpen(false)}
              className="mt-2 inline-flex w-fit rounded-[9px] border border-peacock px-4 py-[9px] font-mono text-[13px] text-peacock"
            >
              {t("cta")}
            </a>
          </div>
        </Container>
      </div>
    </header>
  );
}
