import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Cryptoffiliate — AI-Powered Crypto Intelligence",
  description:
    "Live fee data, AI-powered exchange recommendations, and unbiased crypto reviews.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
