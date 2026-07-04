import type { MetadataRoute } from "next";
import { getTranslations } from "next-intl/server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const t = await getTranslations("site");

  return [
    {
      url: t("url"),
      changeFrequency: "monthly",
      priority: 1,
    },
  ];
}
