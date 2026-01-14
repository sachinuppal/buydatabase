
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
  title: {
    default: "BuyDatabase.ai | Audience Intelligence & Campaign Activation",
    template: "%s | BuyDatabase.ai"
  },
  description: "Search-native audience intelligence platform. Activate high-intent users via Google Search, AI search, and more.",
  metadataBase: new URL('https://buydatabase.ai'),
  alternates: {
    canonical: './',
  },

  // Open Graph
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://buydatabase.ai',
    siteName: 'BuyDatabase.ai',
    title: 'BuyDatabase.ai – Discover & Activate High-Intent Business Audiences',
    description: 'Discover campaign-ready business audiences by location, role, industry, and intent. Find verified B2B contacts.',
    images: [
      {
        url: '/og-image.svg',
        width: 1200,
        height: 630,
        alt: 'BuyDatabase.ai - Audience Intelligence Platform'
      }
    ]
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'BuyDatabase.ai – Discover & Activate High-Intent Business Audiences',
    description: 'Discover campaign-ready business audiences by location, role, industry, and intent.',
    images: ['/og-image.svg'],
    creator: '@buydatabase'
  },

  // Icons
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/icon.svg', type: 'image/svg+xml' }
    ],
    apple: '/apple-touch-icon.png'
  },

  // Additional Meta
  keywords: ['B2B database', 'business contacts', 'lead generation', 'audience intelligence', 'email database', 'India B2B data'],
  authors: [{ name: 'BuyDatabase.ai' }],
  robots: {
    index: true,
    follow: true
  }
};

import { LeadCaptureProvider } from "@/components/lead-capture/lead-capture-context";
import { LeadCaptureModal } from "@/components/lead-capture/lead-capture-modal";

import { CartProvider } from "@/context/cart-context";

import { AuthProvider } from "@/context/auth-context";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${outfit.variable} antialiased min-h-screen flex flex-col overflow-x-hidden`}
      >
        <AuthProvider>
          <CartProvider>
            <LeadCaptureProvider>
              <GlobalSchema />
              <Header />
              <main className="flex-1 flex flex-col">{children}</main>
              <Footer />
              <LeadCaptureModal />
            </LeadCaptureProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
