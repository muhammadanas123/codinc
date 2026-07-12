import { getTranslations } from "next-intl/server";

import { Button, type ButtonProps } from "@/components/ui/button";

/**
 * The single booking CTA. Reads `site.calLink` from messages/en.yml and opens
 * the Cal.com scheduler in a new tab. Change the link in one place (en.yml) and
 * every "Book a call" button across the site updates.
 *
 * Server component — for the client site-header, read `calLink` via
 * useTranslations("site") and style its own anchor instead.
 */
export async function BookCall({
  label,
  variant = "primary",
  className,
}: {
  label: string;
  variant?: ButtonProps["variant"];
  className?: string;
}) {
  const t = await getTranslations("site");
  const calLink = t("calLink");

  return (
    <Button asChild variant={variant} className={className}>
      <a href={calLink} target="_blank" rel="noopener noreferrer">
        {label}
      </a>
    </Button>
  );
}
