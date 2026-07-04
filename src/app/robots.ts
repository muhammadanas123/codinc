import type { MetadataRoute } from "next";
import { getTranslations } from "next-intl/server";

export default async function robots(): Promise<MetadataRoute.Robots> {
  const t = await getTranslations("site");
  const base = t("url");

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${base}/sitemap.xml`,
    host: base,
  };
}
