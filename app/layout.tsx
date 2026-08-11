import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import "./globals.css";

const jakartaFont = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "A&B Construction | Premier Stone & Marble Installation India",
  description:
    "Expert laying and grinding of Italian, Onyx and granite marble & Dholpur stones, and high-performance tiles. Founded in 1977. Serving Delhi and across India.",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/icon0.png", type: "image/png" },
      { url: "/icon1.png", type: "image/png" },
      {
        url: "/web-app-manifest-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        url: "/web-app-manifest-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/apple-icon.png",
        type: "image/png",
      },
    ],
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakartaFont.variable} scroll-smooth`}>
      <body className="antialiased bg-stone-50 text-stone-900 font-sans selection:bg-amber-600 selection:text-white">
        <Navbar />
        <main id="main-content-stream">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
