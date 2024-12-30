import type { Metadata } from "next";
import { Inter, Jaldi } from "next/font/google";
import { Footer, Navbar } from "./(components)/layout";
import { SpeedInsights } from '@vercel/speed-insights/next';

import "./globals.css";

const jaldi = Jaldi({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jaldi"
});

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter"
});

export const metadata: Metadata = {
  title: "DOLLY AI",
  description: "A DALLE Midjourney clone, with text-to-image generative AI models developed by OpenAI. Create and download AI art for free, and share your masterpieces with the community.",
};

export default function RootLayout(
  {children}: Readonly<{ children: React.ReactNode }>
) {
  return (
    <html lang="en">
      <body className={`antialiased ${jaldi.variable} ${inter.variable} overflow-x-hidden lg:overflow-y-hidden`}>
        <Navbar />
        <main className="container mx-auto px-5 py-5 lg:px-0">
          {children}
          <SpeedInsights />
        </main>
        <Footer />
      </body>
    </html>
  );
}
