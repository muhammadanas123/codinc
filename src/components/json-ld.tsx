import { getTranslations } from "next-intl/server";

/**
 * Organization + WebSite structured data (schema.org), rendered once in the
 * root layout. All values derive from the `site` block in messages/en.yml so
 * the schema can't drift from the visible copy. Enables rich results / the
 * Google knowledge panel.
 */
export async function JsonLd() {
  const t = await getTranslations("site");
  const url = t("url");
  const name = t("name");

  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        "@id": `${url}/#organization`,
        name,
        url,
        description: t("metaDescription"),
        email: t("email"),
        logo: `${url}/icon.svg`,
        slogan: t("tagline"),
      },
      {
        "@type": "WebSite",
        "@id": `${url}/#website`,
        name,
        url,
        description: t("metaDescription"),
        publisher: { "@id": `${url}/#organization` },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // Serialized server-side; content is static site config, not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
