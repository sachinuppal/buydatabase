
import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { GlobalSchema } from "@/components/seo/global-schema";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BuyDatabase.ai | Audience Intelligence & Campaign Activation",
  description: "Search-native audience intelligence platform. Activate high-intent users via Google Search, AI search, and more.",
  metadataBase: new URL('https://buydatabase.ai'),
  alternates: {
    canonical: './',
  }
};

import { LeadCaptureProvider } from "@/components/lead-capture/lead-capture-context";
import { LeadCaptureModal } from "@/components/lead-capture/lead-capture-modal";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${outfit.variable} antialiased`}
      >
        <LeadCaptureProvider>
          <GlobalSchema />
          <Header />
          <main className="flex-1 flex flex-col">{children}</main>
          <Footer />
          <LeadCaptureModal />
        </LeadCaptureProvider>
      </body>
    </html>
  );
}
