import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";

// Route segment config — 1200x630 is the canonical OG/Twitter card size.
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Codinc — software, shipped";

// Brand tokens mirrored from globals.css :root (kept in sync by hand — these
// are the resolved hex values of --ink, --peacock, --peacock-deep, --mist).
const INK = "#0a0e12";
const PANEL = "#0f151b";
const PEACOCK = "#19c4d6";
const PEACOCK_DEEP = "#067a86";
const MIST = "#8593a0";

export default async function Image() {
  const t = await getTranslations("site");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background: `radial-gradient(1200px 600px at 85% -10%, ${PEACOCK_DEEP}55, ${INK} 60%), ${INK}`,
          border: `1px solid ${PANEL}`,
        }}
      >
        {/* Brand mark */}
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <div
            style={{
              width: "96px",
              height: "96px",
              borderRadius: "24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: `linear-gradient(135deg, ${PEACOCK}, ${PEACOCK_DEEP})`,
              color: INK,
              fontSize: "64px",
              fontWeight: 700,
            }}
          >
            C
          </div>
          <span style={{ color: "#f4f7fa", fontSize: "48px", fontWeight: 700 }}>
            {t("name")}
          </span>
        </div>

        {/* Headline + tagline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
          <span
            style={{
              color: "#f4f7fa",
              fontSize: "84px",
              fontWeight: 700,
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            {t("tagline")}
          </span>
          <span style={{ color: MIST, fontSize: "34px", lineHeight: 1.3, maxWidth: "900px" }}>
            {t("ogDescription")}
          </span>
        </div>

        {/* Footer url */}
        <span style={{ color: PEACOCK, fontSize: "30px", fontWeight: 600 }}>
          {t("url").replace(/^https?:\/\//, "")}
        </span>
      </div>
    ),
    size,
  );
}
