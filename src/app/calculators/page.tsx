"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Header } from "@/components/homepage/Header";
import { Footer } from "@/components/homepage/Footer";
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
    <div className="flex flex-col min-h-screen bg-brand-black text-brand-offwhite">
      {/* Top Banner section */}
      <div className="pt-32 pb-12 bg-brand-black relative border-b border-brand-gold/10">
        <div className="absolute inset-0 pointer-events-none z-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-4 h-full opacity-5">
          <div className="border-l border-brand-slate h-full" />
          <div className="border-l border-brand-slate h-full" />
          <div className="border-l border-brand-slate h-full" />
          <div className="border-l border-brand-slate h-full border-r" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="text-[10px] uppercase font-bold tracking-[0.35em] text-brand-gold bg-brand-gold/5 px-4 py-1.5 border border-brand-gold/20 rounded-none w-fit block mb-4 font-poppins">
              Engineering Estimators Desk
            </span>
            <h1 className="text-4xl sm:text-6xl font-normal font-cormorant text-brand-offwhite mt-4 tracking-wide leading-none">
              Material Calculators.
            </h1>
            <p className="text-brand-sand/70 mt-6 text-sm sm:text-base leading-relaxed font-poppins max-w-xl">
              Estimate structural material volumes, interlocking paving arrays, sloped roof layouts, and net structural dimensions in real-time.
            </p>
          </div>
        </div>
      </div>

      {/* Tabs Menu Panel */}
      <div className="sticky top-[72px] z-30 bg-brand-black/95 border-b border-brand-gold/10 py-5 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
          <div className="flex gap-2.5 bg-brand-charcoal p-2 border border-brand-gold/10 w-full md:w-auto overflow-x-auto scrollbar-none rounded-none">
            {calculatorsList.map((calc) => {
              const isActive = calc.id === activeCalc.id;
              return (
                <button
                  key={calc.id}
                  onClick={() => handleSelectTab(calc.id)}
                  className={`flex items-center gap-2 px-5 py-3 rounded-none text-[10px] uppercase tracking-wider font-poppins font-semibold transition-colors whitespace-nowrap cursor-pointer flex-grow md:flex-grow-0 justify-center border ${
                    isActive
                      ? "bg-brand-gold border-brand-gold text-brand-black"
                      : "bg-brand-black border-brand-gold/5 text-brand-sand hover:text-brand-offwhite"
                  }`}
                >
                  {calc.icon}
                  <span>{calc.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main active calculator */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16 flex-grow z-10">
        <div className="max-w-4xl mx-auto mb-12 text-center space-y-4">
          <h2 className="text-3xl font-normal font-cormorant text-brand-offwhite">
            {activeCalc.fullName}
          </h2>
          <p className="text-xs sm:text-sm text-brand-sand/70 leading-relaxed max-w-xl mx-auto font-poppins">
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
      <div className="flex flex-col min-h-screen bg-brand-black text-brand-offwhite">
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        <Suspense fallback={
          <div className="flex-grow flex items-center justify-center min-h-[50vh] bg-brand-black text-brand-sand/50">
            <span className="w-8 h-8 rounded-none border-2 border-brand-gold border-t-transparent animate-spin" />
          </div>
        }>
          <CalculatorsPageContent />
        </Suspense>
        <Footer />
      </div>
    </ToastProvider>
  );
}
