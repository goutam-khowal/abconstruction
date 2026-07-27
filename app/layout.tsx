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
    "Expert laying and grinding of Italian and granite marble, Kota & Dholpur stones, and high-performance tiles. Founded in 1977. Serving Delhi and across India.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${jakartaFont.variable} scroll-smooth`}>
      <body className="antialiased bg-white text-slate-900 font-sans selection:bg-brand-blue selection:text-white">
        <Navbar />
        <main id="main-content-stream">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

// 5k client
// 10M+ square feet
// 2K plus completed projects
// company marquee animation
// what we have worked for list with google maps location and images/logos