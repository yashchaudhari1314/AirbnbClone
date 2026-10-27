import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Romantic Jacuzzi 1BHK Candolim | Mirashya UG10 - Airbnb",
  description: "Stay in this cozy and stylish Jacuzzi apartment in the heart of Candolim. 3 guests · 1 bedroom · 1 bed · 1 bathroom. Rated 4.95 with 19 reviews.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en">
      <body className="min-h-full antialiased">{children}</body>
    </html>
  );
}
