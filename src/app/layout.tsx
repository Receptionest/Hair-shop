import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://manetropics-nelspruit.co.za"),
  title: "MANE TROPICS NELSPRUIT | Luxury Human Hair Blends | Heat-Defying Wigs & Bundles",
  description: "Nelspruit's most vibrant hair sanctuary! Premium Human Hair Blends engineered to defy the Lowveld heat and humidity. Same-day delivery across Mbombela or pickup at Sonpark Centre.",
  keywords: "human hair blend nelspruit, wigs nelspruit, mbombela hair shop, hair bundles nelspruit, glueless wigs mpumalanga, white river hair extensions",
  openGraph: {
    title: "MANE TROPICS NELSPRUIT | Luxury Human Hair Blends",
    description: "Heat-proof, humidity-proof human hair blend wigs and bundles in Nelspruit. Shop online or visit our Sonpark fitting lounge.",
    images: ["/images/hero-hair-baddie.jpg"],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-[#FAF7F5] text-[#241A24] antialiased selection:bg-[#F472B6] selection:text-white">
        {children}
      </body>
    </html>
  );
}
