import type { Metadata } from "next";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Cryptoffiliate — Best Crypto Exchange Reviews & Comparisons",
    template: "%s | Cryptoffiliate",
  },
  description:
    "Unbiased crypto exchange reviews, live fee comparisons, and exclusive signup bonuses. Find the best exchange for your needs.",
  metadataBase: new URL("https://cryptoffiliate.com"),
  openGraph: {
    siteName: "Cryptoffiliate",
    type: "website",
    locale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-bone text-ink antialiased">
        <Nav />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
