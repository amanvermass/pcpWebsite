import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "../components/ui/Toast";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PCP Clay | Premium Fired Clay Bricks, Terracotta Facades & AAC Blocks",
  description: "Prayag Clay Productions (PCP) manufactures high-performance architectural fired clay bricks, natural terracotta cladding tiles, concrete pavers, and thermal AAC blocks. Complete with BIM objects and calculators for architects and builders.",
  keywords: ["prayag clay", "pcp clay", "clay bricks", "terracotta bricks", "cladding tile", "roofing tiles", "pavers", "AAC blocks", "BIM objects", "construction calculators"],
  openGraph: {
    title: "Prayag Clay Productions | Premium Architectural Building Materials",
    description: "Eco-friendly fired clay cladding, insulation blocks, and engineering pavers by Prayag Clay Productions (PCP). Custom CAD downloads and structural calculators.",
    type: "website",
    url: "https://www.prayagclay.com",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-brand-slate-950 text-slate-100">
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}

