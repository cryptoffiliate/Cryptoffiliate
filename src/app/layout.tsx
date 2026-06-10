import type { Metadata } from "next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={dmSans.variable}>
      <body className="bg-slate-50 text-slate-900 antialiased">
        <Nav />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
