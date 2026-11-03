import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";
export const metadata: Metadata = {
  "title": "Danny's Crocant Food — Frango crocante, história de família",
  "description": "Danny's Crocant Food: frango crocante, combos e shawarma. Conheça nossa história e peça pelo cardápio oficial.",
  "openGraph": {
    "type": "website",
    "title": "Danny's Crocant Food — Crocância que virou história",
    "description": "De Jaguariaíva para Ponta Grossa: uma história de família, coragem e frango crocante.",
    "locale": "pt_BR"
  }
};
export const viewport: Viewport = { themeColor: "#260d10" };
export default function RootLayout({ children }: { children: ReactNode }) { return <html lang="pt-BR"><head><link rel="preconnect" href="https://fonts.googleapis.com" /><link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" /><link rel="stylesheet" href={"https://fonts.googleapis.com/css2?family=Anton&family=DM+Sans:wght@400;500;600;700;800&family=IBM+Plex+Mono:wght@400;500;600&family=Playfair+Display:ital,wght@0,500;0,600;0,700;1,500;1,600&display=swap"} /></head><body>{children}</body></html>; }
