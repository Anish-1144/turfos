import type { Metadata } from "next";
import { Syne, DM_Sans } from "next/font/google";
import "./globals.css";

const fontSyne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["700", "800"], // Explicit weights as requested
});

const fontDmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500"], // Explicit weights as requested
});

export const metadata: Metadata = {
  title: "Horizon Courts | Tennis Club",
  description: "Unleash Your Inner Champion Today. All In One Place.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${fontSyne.variable} ${fontDmSans.variable} scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
