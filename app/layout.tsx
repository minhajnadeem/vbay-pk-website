import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { PromoBanner } from "@/components/shared/PromoBanner";
import { Navbar } from "@/components/shared/Navbar";
import { CategoryBar } from "@/components/shared/CategoryBar";
import { Footer } from "@/components/shared/Footer";
import { StickyWhatsAppButton } from "@/components/shared/StickyWhatsAppButton";
import { ClientProviders } from "@/components/providers/ClientProviders";
import { DEFAULT_SITE_URL } from "@/constants/siteInfo";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from '@vercel/speed-insights/next';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(DEFAULT_SITE_URL),
  title: {
    default: "Easy, quick and hassle-free shopping | Vbay.pk",
    template: "%s | Vbay.pk",
  },
  description:
    "Browse trending products at Vbay.pk and order directly on WhatsApp. Fast delivery across Pakistan, quick support, and a simple no-checkout buying experience.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Easy, quick and hassle-free shopping | Vbay.pk",
    description:
      "Browse trending products at Vbay.pk and order directly on WhatsApp across Pakistan.",
    url: DEFAULT_SITE_URL,
    siteName: "Vbay.pk",
    locale: "en_PK",
    type: "website",
  },
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/favicon.ico"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} flex min-h-screen flex-col antialiased`}
      >
        <PromoBanner />
        <Navbar />
        <CategoryBar />
        <main className="flex-1">{children}</main>
        <Footer />
        <StickyWhatsAppButton />
        <ClientProviders />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
