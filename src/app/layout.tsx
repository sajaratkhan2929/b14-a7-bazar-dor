import type { Metadata } from "next";
import { Suspense } from "react";
import "@fontsource-variable/noto-sans-bengali";
import "./globals.css";
import Navbar from "@/components/navbar";
import SiteNav from "@/components/site-nav";
import Ticker from "@/components/ticker";
import Footer from "@/components/footer";
import AppToaster from "@/components/toaster";

export const metadata: Metadata = {
  title: { default: "বাজার দর", template: "%s | বাজার দর" },
  description: "প্রয়োজনীয় পণ্যের দাম এক নজরে।",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="bn" data-theme="light">
      <body className="flex min-h-screen flex-col font-sans antialiased">
        <header className="sticky top-0 z-40">
          <Suspense fallback={<Navbar categories={[]} />}>
            <SiteNav />
          </Suspense>
          <Suspense fallback={<div className="h-9 bg-green-900" />}>
            <Ticker />
          </Suspense>
        </header>
        <main className="flex-1">{children}</main>
        <Footer />
        <AppToaster />
      </body>
    </html>
  );
}