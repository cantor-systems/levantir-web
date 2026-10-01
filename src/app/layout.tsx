import type { Metadata } from "next";
import { Suspense } from "react";
import { Montserrat, Playfair_Display } from "next/font/google";
import { siteConfig } from "@/config/site";
import "@/styles/globals.css";
import { Navigation } from "@/components/layout/Navigation";
import { Footer } from "@/components/layout/Footer";
import { AdvisoryModal } from "@/components/ui/AdvisoryModal";
import { ConsentProvider } from "@/components/analytics/ConsentProvider";
import { ConsentBanner } from "@/components/analytics/ConsentBanner";

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.defaultTitle,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.defaultDescription,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "es_MX",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.defaultTitle,
    description: siteConfig.defaultDescription,
  },
  icons: {
    icon: "/brand/levantir-logo-reference.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={siteConfig.locale}>
      <body className={`${playfair.variable} ${montserrat.variable}`}>
        <ConsentProvider>
          <div className="min-h-screen flex flex-col bg-white text-[#2E2E2E]">
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:bg-[#D4A737] focus:text-[#0B2D58] focus:font-semibold focus:rounded-sm focus:shadow-md"
            >
              Saltar al contenido principal
            </a>
            <Navigation />
            <main id="main-content" className="flex-1 flex flex-col">
              {children}
            </main>
            <Footer />
            <Suspense fallback={null}>
              <AdvisoryModal />
            </Suspense>
            <ConsentBanner />
          </div>
        </ConsentProvider>
      </body>
    </html>
  );
}