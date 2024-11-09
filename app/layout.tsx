import type { Metadata } from "next";
import { Inter, Jaldi } from "next/font/google";
import { Footer, Navbar } from "./(components)/layout";

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
  description: "DALL-E Midjourney Clone",
};

export default function RootLayout(
  {children}: Readonly<{ children: React.ReactNode }>
) {
  return (
    <html lang="en">
      <body className={`antialiased ${jaldi.variable} ${inter.variable} overflow-x-hidden`}>
        <Navbar />
        <main className="container mx-auto px-4 py-4 md:px-0">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
