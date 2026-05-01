import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "LUXE | Premium Fashion & Lifestyle",
  description: "Elevate your style with LUXE - curated collection of premium fashion, luxury watches, jewelry, and accessories. Experience timeless elegance.",
  keywords: ["luxury fashion", "premium clothing", "designer watches", "jewelry", "accessories"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-cream">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
