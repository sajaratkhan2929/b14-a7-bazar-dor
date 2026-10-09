
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BazarDor | বাজারদর",
  description: "বাংলাদেশের নিত্যপ্রয়োজনীয় পণ্যের বাজারদর জানুন।",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}