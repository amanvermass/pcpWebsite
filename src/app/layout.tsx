import type { Metadata } from "next";
import { Inter, Poppins, Playfair_Display, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { ToastProvider } from "../components/ui/Toast";
import { SmoothScroll } from "../components/ui/SmoothScroll";
import { PageLoader } from "../components/ui/PageLoader";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
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
    <html lang="en" className={`${inter.variable} ${poppins.variable} ${playfair.variable} ${cormorant.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-brand-slate-950 text-slate-100 relative">
        <PageLoader />

        {/* Global Dessau-inspired Background Grid Guide Lines */}
        <div className="fixed inset-0 z-0 pointer-events-none max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-4 h-full opacity-25">
          <div className="border-l border-brand-slate-800/10 dark:border-brand-slate-200/5 h-full" />
          <div className="border-l border-brand-slate-800/10 dark:border-brand-slate-200/5 h-full" />
          <div className="border-l border-brand-slate-800/10 dark:border-brand-slate-200/5 h-full" />
          <div className="border-l border-brand-slate-800/10 dark:border-brand-slate-200/5 h-full border-r" />
        </div>

        <ToastProvider>
          <SmoothScroll />
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}

