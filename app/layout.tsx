import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import { SmoothScrollProvider } from "@/components/motion/SmoothScrollProvider";
import { Nav } from "@/components/Nav";
import { Preloader } from "@/components/Preloader";
import { brand } from "@/lib/content";
import "./globals.css";

const display = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-display",
  display: "swap",
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${brand.name} — ${brand.tagline}`,
  description:
    "A Saudi production house crafting original content, commercial campaigns, and live experiences that leave a lasting impact.",
  metadataBase: new URL(`https://${brand.website}`),
  openGraph: {
    title: `${brand.name} — ${brand.tagline}`,
    description:
      "Saudi production house. Film, commercials, live events, post production, and AI-powered creative.",
    url: `https://${brand.website}`,
    siteName: brand.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${brand.name} — ${brand.tagline}`,
    description:
      "Saudi production house. Film, commercials, live events, post production, and AI-powered creative.",
  },
};

export const viewport: Viewport = {
  themeColor: "#05030A",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable}`} suppressHydrationWarning>
      <body className="font-sans" suppressHydrationWarning>
        <SmoothScrollProvider>
          <Preloader />
          <Nav />
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
