import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import {
  Bricolage_Grotesque,
  Instrument_Serif,
  Caveat,
  Space_Grotesk,
} from "next/font/google";
import "./globals.css";

const display = Bricolage_Grotesque({
  variable: "--font-display",
  subsets: ["latin"],
});

const serifAccent = Instrument_Serif({
  variable: "--font-serif-accent",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

const hand = Caveat({
  variable: "--font-hand",
  subsets: ["latin"],
});

const body = Space_Grotesk({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HAIRAPY Nelspruit — Human Hair Blends, Bundles & Wigs",
  description:
    "Nelspruit's most-loved hair shop. 100% human hair blends, glueless wigs, HD lace and legendary service. Same-day pickup in the CBD, lay-bye welcomed, crowns handed out daily.",
};

export const viewport: Viewport = {
  themeColor: "#2B1226",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${display.variable} ${serifAccent.variable} ${hand.variable} ${body.variable} bg-cream font-body text-ink antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
