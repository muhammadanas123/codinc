import type { Metadata } from "next";
import localFont from "next/font/local";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";

import { JsonLd } from "@/components/json-ld";
import "./globals.css";

const spaceGrotesk = localFont({
  src: "./fonts/SpaceGrotesk.ttf",
  variable: "--font-space-grotesk",
  display: "swap",
  adjustFontFallback: false,
  fallback: ["sans-serif"],
});

const manrope = localFont({
  src: [
    { path: "./fonts/Manrope-Regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Manrope-Medium.woff2", weight: "500", style: "normal" },
    { path: "./fonts/Manrope-SemiBold.woff2", weight: "600", style: "normal" },
    { path: "./fonts/Manrope-Bold.woff2", weight: "700", style: "normal" },
  ],
  variable: "--font-manrope",
  display: "swap",
  adjustFontFallback: false,
  fallback: ["sans-serif"],
});

const jetbrainsMono = localFont({
  src: [
    { path: "./fonts/JetBrainsMono-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/JetBrainsMono-Medium.ttf", weight: "500", style: "normal" },
    { path: "./fonts/JetBrainsMono-Bold.ttf", weight: "700", style: "normal" },
  ],
  variable: "--font-jetbrains-mono",
  display: "swap",
  adjustFontFallback: false,
  fallback: ["monospace"],
});

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("site");
  const title = `${t("name")} \u2014 ${t("tagline")}`;

  return {
    metadataBase: new URL(t("url")),
    title,
    description: t("metaDescription"),
    alternates: { canonical: "/" },
    robots: { index: true, follow: true },
    openGraph: {
      title,
      description: t("ogDescription"),
      url: t("url"),
      siteName: t("name"),
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: t("ogDescription"),
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const messages = await getMessages();

  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${manrope.variable} ${jetbrainsMono.variable}`}
    >
      <body>
        <JsonLd />
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
