import { Container } from "@/components/container";
import { BrandMark } from "@/components/brand-mark";
import { navLinks } from "@/lib/content";

export function SiteFooter() {
  return (
    <footer className="border-t border-line py-[46px]">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-6">
          <a href="#" aria-label="Codinc home">
            <BrandMark className="text-xl" />
          </a>
          <div className="flex gap-10 text-sm text-mist">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-peacock"
              >
                {link.label}
              </a>
            ))}
            <a href="#contact" className="transition-colors hover:text-peacock">
              Contact
            </a>
          </div>
          <div className="mt-2 w-full border-t border-line pt-6 font-mono text-xs text-mist-dim">
            © 2026 Codinc. Built in Lahore, shipped everywhere.
          </div>
        </div>
      </Container>
    </footer>
  );
}
