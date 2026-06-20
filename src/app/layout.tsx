import type { Metadata } from "next";
import localFont from "next/font/local";

import { siteConfig } from "@/lib/content";
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
    { path: "./fonts/Manrope-Regular.ttf", weight: "400", style: "normal" },
    { path: "./fonts/Manrope-Medium.ttf", weight: "500", style: "normal" },
    { path: "./fonts/Manrope-SemiBold.ttf", weight: "600", style: "normal" },
    { path: "./fonts/Manrope-Bold.ttf", weight: "700", style: "normal" },
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

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: `${siteConfig.name} \u2014 ${siteConfig.tagline}`,
  description:
    "Codinc is a product & engineering studio. We design, build, and run web and mobile applications for teams who need them done right \u2014 and done.",
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    title: `${siteConfig.name} \u2014 ${siteConfig.tagline}`,
    description:
      "A product & engineering studio. We design, build, and run web and mobile applications.",
    url: siteConfig.url,
    siteName: siteConfig.name,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${manrope.variable} ${jetbrainsMono.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
