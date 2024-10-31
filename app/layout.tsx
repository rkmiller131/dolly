import type { Metadata } from "next";
import { Inter, Jaldi } from "next/font/google";

import "./globals.css";

const jaldi = Jaldi({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jaldi'
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter'
});

export const metadata: Metadata = {
  title: "Dolly AI",
  description: "DALL-E Midjourney Clone",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased ${jaldi.variable} ${inter.variable}`}
      >
        <p className="font-primary">Testing primary</p>
        <p className="font-secondary">Testing secondary</p>
        {children}
      </body>
    </html>
  );
}
