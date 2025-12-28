import type React from "react";
import type { Metadata } from "next";

import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import { LanguageProvider } from "@/contexts/language-context";
import { CursorGlow } from "@/components/cursor-glow";

import {
  JetBrains_Mono,
  Geist as Fresh_Font_Geist,
  Geist_Mono as Fresh_Font_Geist_Mono,
  Source_Serif_4 as Fresh_Font_Source_Serif_4,
} from "next/font/google";

// Initialize fonts
const _geist = Fresh_Font_Geist({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
const _geistMono = Fresh_Font_Geist_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
const _sourceSerif_4 = Fresh_Font_Source_Serif_4({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
});

const _jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains",
});

export const metadata: Metadata = {
  title: "Gildácio Lopes | Software Engineer",
  description:
    "Mid-level Full-Stack Software Engineer specializing in scalable platforms and custom solutions",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/logo.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/logo.png",
        type: "image/png",
      },
    ],
    apple: "/logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR" className="dark">
      <body
        className={`font-sans antialiased bg-[#0a0a0f] text-white min-h-screen overflow-x-hidden`}
      >
        <LanguageProvider>
          <CursorGlow />
          {children}
        </LanguageProvider>
        <Analytics />
      </body>
    </html>
  );
}
