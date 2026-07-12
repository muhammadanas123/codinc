import { getTranslations } from "next-intl/server";
import { Instagram, Linkedin, Twitter } from "lucide-react";

import { Container } from "@/components/container";
import { BrandMark } from "@/components/brand-mark";
import type { NavLink, Social } from "@/lib/content";

export async function SiteFooter() {
  const tNav = await getTranslations("nav");
  const tFooter = await getTranslations("footer");
  const tSite = await getTranslations("site");
  const navLinks = tNav.raw("links") as NavLink[];
  const social = tSite.raw("social") as Social;

  const socials = [
    { label: "LinkedIn", href: social.linkedin, Icon: Linkedin },
    { label: "Instagram", href: social.instagram, Icon: Instagram },
    { label: "X", href: social.x, Icon: Twitter },
  ].filter((s) => s.href);

  return (
    <footer className="border-t border-line py-6">
      <Container>
        <div className="flex flex-col items-center gap-5 text-center md:flex-row md:justify-between md:gap-6 md:text-left">
          <a
            href="#"
            aria-label={tNav("homeAriaLabel")}
            className="shrink-0"
          >
            <BrandMark className="text-xl" />
          </a>

          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-mist">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-peacock"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex shrink-0 items-center gap-4">
            <div className="flex items-center gap-1">
              {socials.map(({ label, href, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-mist transition-colors hover:bg-panel-2 hover:text-peacock"
                >
                  <Icon size={17} />
                </a>
              ))}
            </div>
            <span className="font-mono text-[11px] text-mist-dim">
              {tFooter("copyright")}
            </span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
