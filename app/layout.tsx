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
    icon: "https://a-bconstruction.in/wp-content/uploads/2025/01/cropped-AB-Con-Logo-1-3-80x64.png",
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
