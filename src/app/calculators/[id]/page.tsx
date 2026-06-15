"use client";

import React, { useState, useEffect } from "react";
import { useParams, notFound } from "next/navigation";
import { Header } from "@/components/homepage/Header";
import { ContactUs } from "@/components/homepage/ContactUs";
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
      <div className="flex flex-col min-h-screen bg-brand-slate-950">
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />

        <div className="pt-24 pb-10 bg-brand-slate-900 bg-grid-pattern border-b border-brand-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


            {/* Back link */}
            <Link href="/calculators" className="inline-flex items-center gap-2 text-sm font-bold text-brand-slate-350 hover:text-white mb-6 transition-colors group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Tools Dashboard
            </Link>

            {/* Heading */}
            <div className="max-w-4xl">
              <span className="text-xs uppercase font-extrabold tracking-widest text-brand-terracotta-500 bg-brand-terracotta-500/10 px-3 py-1 rounded-full">
                Engineering Estimators
              </span>
              <h1 className="text-3xl sm:text-5xl font-extrabold text-white mt-4 tracking-tight leading-tight">
                {activeCalc.name}
              </h1>
              <p className="text-brand-slate-400 mt-3 text-sm sm:text-base leading-relaxed">
                {activeCalc.desc}
              </p>
            </div>
          </div>
        </div>

        {/* Form area */}
        <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 flex-grow">
          {activeCalc.component}
        </main>

        <ContactUs />
      </div>
    </ToastProvider>
  );
}
