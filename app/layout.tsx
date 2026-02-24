import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { PromoBanner } from "@/components/shared/PromoBanner";
import { Navbar } from "@/components/shared/Navbar";
import { CategoryBar } from "@/components/shared/CategoryBar";
import { Footer } from "@/components/shared/Footer";
import { ClientProviders } from "@/components/providers/ClientProviders";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Vbay.pk | Premium E-commerce Catalog",
  description: "Premium, minimalist e-commerce catalog for the Pakistani market.",
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
        <ClientProviders />
      </body>
    </html>
  );
}
