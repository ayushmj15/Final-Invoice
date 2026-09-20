import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "InvoiceMatch AI | Find every match. Catch every mismatch.",
  description: "AI-powered GST invoice reconciliation, built for India's small businesses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased scroll-smooth dark`} suppressHydrationWarning>
      <body className="min-h-full flex flex-col font-sans">
        {children}
      </body>
    </html>
  );
}
