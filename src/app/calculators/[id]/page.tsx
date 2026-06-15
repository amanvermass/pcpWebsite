"use client";

import React, { useState, useEffect } from "react";
import { useParams, notFound } from "next/navigation";
import { Header } from "@/components/homepage/Header";
import { Footer } from "@/components/homepage/Footer";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ToastProvider } from "@/components/ui/Toast";

// Import calculators
import BrickCalculator from "@/components/calculators/BrickCalculator";
import HouseCalculator from "@/components/calculators/HouseCalculator";
import WallCalculator from "@/components/calculators/WallCalculator";
import RoofCalculator from "@/components/calculators/RoofCalculator";
import PaverCalculator from "@/components/calculators/PaverCalculator";

export default function CalculatorDetailPage() {
  const params = useParams();
  const id = params?.id as string;
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
    }
  }, [darkMode]);

  const calculators: Record<string, { name: string; desc: string; component: React.ReactNode }> = {
    "brick-quantity": {
      name: "Brick Quantity Calculator",
      desc: "Calculate net clay brick volume and count required for walls factoring in standard wastages.",
      component: <BrickCalculator />
    },
    "house-estimator": {
      name: "House Material Estimator",
      desc: "Estimate cement bags, sand volumes, structural concrete stones, and brick budget by floors.",
      component: <HouseCalculator />
    },
    "wall-net-area": {
      name: "Wall Area Calculator",
      desc: "Calculate net brick area by subtracting openings like doors and windows from gross surfaces.",
      component: <WallCalculator />
    },
    "roofing-tile": {
      name: "Roofing Tile Calculator",
      desc: "Estimate interlocking clay roofing tiles and ridges required taking roof slope angles into account.",
      component: <RoofCalculator />
    },
    "paver": {
      name: "Paver Calculator",
      desc: "Calculate rectangular, square, or hexagonal pavers required for civic walkways or outdoor spaces.",
      component: <PaverCalculator />
    }
  };

  const activeCalc = calculators[id];

  if (!activeCalc) {
    notFound();
  }

  return (
    <ToastProvider>
      <div className="flex flex-col min-h-screen bg-brand-black text-brand-offwhite">
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />

        <div className="pt-32 pb-12 bg-brand-black border-b border-brand-gold/10 relative">
          <div className="absolute inset-0 pointer-events-none z-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-4 h-full opacity-5">
            <div className="border-l border-brand-slate h-full" />
            <div className="border-l border-brand-slate h-full" />
            <div className="border-l border-brand-slate h-full" />
            <div className="border-l border-brand-slate h-full border-r" />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            {/* Back link */}
            <Link 
              href="/calculators" 
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-sand hover:text-brand-gold mb-6 transition-colors group font-poppins"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1.5 transition-transform text-brand-gold" />
              <span>Back to Tools Dashboard</span>
            </Link>

            {/* Heading */}
            <div className="max-w-4xl">
              <span className="text-[10px] uppercase font-bold tracking-[0.35em] text-brand-gold bg-brand-gold/5 px-4 py-1.5 border border-brand-gold/20 rounded-none w-fit block mb-4 font-poppins">
                Engineering Estimator
              </span>
              <h1 className="text-3xl sm:text-5xl font-normal font-cormorant text-brand-offwhite tracking-wide leading-none">
                {activeCalc.name}
              </h1>
              <p className="text-brand-sand/70 mt-4 text-xs sm:text-sm font-poppins leading-relaxed max-w-xl">
                {activeCalc.desc}
              </p>
            </div>
          </div>
        </div>

        {/* Form area */}
        <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16 flex-grow z-10">
          {activeCalc.component}
        </main>

        <Footer />
      </div>
    </ToastProvider>
  );
}
