"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Header } from "@/components/homepage/Header";
import { ContactUs } from "@/components/homepage/ContactUs";
import { Calculator, Layers, Hammer, Compass } from "lucide-react";
import { ToastProvider } from "@/components/ui/Toast";

// Import calculators
import BrickCalculator from "@/components/calculators/BrickCalculator";
import HouseCalculator from "@/components/calculators/HouseCalculator";
import WallCalculator from "@/components/calculators/WallCalculator";
import RoofCalculator from "@/components/calculators/RoofCalculator";
import PaverCalculator from "@/components/calculators/PaverCalculator";

interface CalculatorItem {
  id: string;
  name: string;
  fullName: string;
  desc: string;
  icon: React.ReactNode;
  component: React.ReactNode;
}

function CalculatorsPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const activeCalcId = searchParams.get("id") || "brick-quantity";

  const calculatorsList: CalculatorItem[] = [
    {
      id: "brick-quantity",
      name: "Brick Quantity",
      fullName: "Brick Quantity Calculator",
      desc: "Estimate number of bricks and wastage buffers required based on wall length, height, thickness, and brick size styles.",
      icon: <Calculator className="w-4 h-4" />,
      component: <BrickCalculator />
    },
    {
      id: "house-estimator",
      name: "House Estimator",
      fullName: "House Material Estimator",
      desc: "Perform quick structural estimates for core materials like clay bricks, cement bags, coarse sand, and aggregates by built-up area and floors.",
      icon: <Layers className="w-4 h-4" />,
      component: <HouseCalculator />
    },
    {
      id: "wall-net-area",
      name: "Wall Net Area",
      fullName: "Net Wall Area Calculator",
      desc: "Calculate exact masonry area by subtracting windows and doors openings to compute brick yields.",
      icon: <Hammer className="w-4 h-4" />,
      component: <WallCalculator />
    },
    {
      id: "roofing-tile",
      name: "Roofing Tile",
      fullName: "Roofing Tile Calculator",
      desc: "Calculate Roman interlocking tile requirements and ridges counts adjusting for structural slope angle degrees.",
      icon: <Compass className="w-4 h-4" />,
      component: <RoofCalculator />
    },
    {
      id: "paver",
      name: "Paver Estimator",
      fullName: "Paver Calculator",
      desc: "Calculate standard rectangular, square, or hexagonal clay pavers required for outdoor walkways, patios, and heavy-duty driveways.",
      icon: <Calculator className="w-4 h-4" />,
      component: <PaverCalculator />
    }
  ];

  const activeCalc = calculatorsList.find(c => c.id === activeCalcId) || calculatorsList[0];

  const handleSelectTab = (id: string) => {
    router.push(`/calculators?id=${id}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-brand-slate-950">
      {/* Header spacing / Top banner */}
      <div className="pt-24 pb-10 bg-brand-slate-900 bg-grid-pattern border-b border-brand-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <span className="text-xs uppercase font-extrabold tracking-widest text-brand-terracotta-500 bg-brand-terracotta-500/10 px-3 py-1 rounded-full">
              Engineering Tools
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mt-4 tracking-tight">
              Construction Calculators
            </h1>
            <p className="text-brand-slate-400 mt-4 text-sm sm:text-base leading-relaxed">
              Estimate material volumes, concrete structure requirements, paving grids, and roofing counts in real-time.
            </p>
          </div>
        </div>
      </div>

      {/* Tabs navigation panel */}
      <div className="sticky top-[72px] z-30 bg-brand-slate-950/80 backdrop-blur-md border-b border-brand-slate-800/60 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
          <div className="flex gap-1 bg-brand-slate-900/60 p-1.5 rounded-2xl border border-brand-slate-850 w-full md:w-auto overflow-x-auto scrollbar-none">
            {calculatorsList.map((calc) => {
              const isActive = calc.id === activeCalc.id;
              return (
                <button
                  key={calc.id}
                  onClick={() => handleSelectTab(calc.id)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer flex-grow md:flex-grow-0 justify-center ${
                    isActive
                      ? "bg-brand-terracotta-600 text-white shadow-lg shadow-brand-terracotta-600/25"
                      : "text-brand-slate-400 hover:text-white"
                  }`}
                >
                  {calc.icon}
                  {calc.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main active form container */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 flex-grow">
        <div className="max-w-4xl mx-auto mb-10 text-center space-y-2">
          <h2 className="text-2xl font-extrabold text-white tracking-tight">
            {activeCalc.fullName}
          </h2>
          <p className="text-xs sm:text-sm text-brand-slate-400 leading-relaxed max-w-2xl mx-auto">
            {activeCalc.desc}
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {activeCalc.component}
        </div>
      </main>
    </div>
  );
}

export default function CalculatorsPage() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
    }
  }, [darkMode]);

  return (
    <ToastProvider>
      <div className="flex flex-col min-h-screen">
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        <Suspense fallback={
          <div className="flex-grow flex items-center justify-center min-h-[50vh] bg-brand-slate-950 text-brand-slate-400">
            <span className="w-8 h-8 rounded-full border-2 border-brand-terracotta-600 border-t-transparent animate-spin" />
          </div>
        }>
          <CalculatorsPageContent />
        </Suspense>
        <ContactUs />
      </div>
    </ToastProvider>
  );
}
