import type { Metadata, Viewport } from "next";
import { Montserrat, Tajawal, IBM_Plex_Sans_Arabic } from "next/font/google";
import { SmoothScrollProvider } from "@/components/motion/SmoothScrollProvider";
import { ScrollAnchor } from "@/components/motion/ScrollAnchor";
import { LanguageProvider } from "@/lib/i18n/LanguageProvider";
import { Nav } from "@/components/Nav";
import { en } from "@/lib/locales/en";
import { assetPath } from "@/lib/assetPath";
import "./globals.css";

const headingEn = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-heading-en",
  display: "swap",
});

const bodyEn = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-body-en",
  display: "swap",
});

const headingAr = Tajawal({
  subsets: ["arabic"],
  weight: ["400", "500", "700"],
  variable: "--font-heading-ar",
  display: "swap",
});

const bodyAr = IBM_Plex_Sans_Arabic({
  subsets: ["arabic"],
  weight: ["300", "400", "500"],
  variable: "--font-body-ar",
  display: "swap",
});

export const metadata: Metadata = {
  title: `${en.brand.name} — ${en.brand.tagline}`,
  description:
    "A Saudi-American production house built on relentless craft, discipline, and cinematic ambition — executing scripts and creative direction into finished film, photography, and content at the highest standard.",
  metadataBase: new URL(`https://${en.brand.website}`),
  openGraph: {
    title: `${en.brand.name} — ${en.brand.tagline}`,
    description:
      "Saudi-American production house. Film & commercial production, live events, post production, and AI-powered production.",
    url: `https://${en.brand.website}`,
    siteName: en.brand.name,
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `${en.brand.name} — ${en.brand.tagline}`,
    description:
      "Saudi-American production house. Film & commercial production, live events, post production, and AI-powered production.",
  },
  icons: {
    icon: assetPath("/assets/brand/logo-nawa-gold.png"),
    apple: assetPath("/assets/brand/logo-nawa-gold.png"),
  },
};

export const viewport: Viewport = {
  themeColor: "#050505",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${headingEn.variable} ${bodyEn.variable} ${headingAr.variable} ${bodyAr.variable}`}
      suppressHydrationWarning
    >
      <body className="font-sans" suppressHydrationWarning>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){history.scrollRestoration='manual';window.scrollTo(0,0);try{var l=localStorage.getItem('nawa-locale');if(l==='ar'){document.documentElement.lang='ar';document.documentElement.dir='rtl';document.body.dataset.locale='ar';}}catch(e){}})();`,
          }}
        />
        <LanguageProvider>
          <SmoothScrollProvider>
            <ScrollAnchor />
            <Nav />
            {children}
          </SmoothScrollProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
