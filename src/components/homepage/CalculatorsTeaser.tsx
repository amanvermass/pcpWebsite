"use client";

import React from "react";
import Link from "next/link";
import { Calculator, Layers, Hammer, Compass, ArrowRight } from "lucide-react";

interface CalculatorItem {
  id: string;
  name: string;
  desc: string;
  icon: React.ReactNode;
}

export const CalculatorsTeaser: React.FC = () => {
  const calculatorsList: CalculatorItem[] = [
    {
      id: "brick-quantity",
      name: "Brick Quantity Calculator",
      desc: "Calculate brick count, volumes, and mortar requirements with customizable wastage margins.",
      icon: <Calculator className="w-6 h-6 text-brand-terracotta-500" />
    },
    {
      id: "house-estimator",
      name: "House Material Estimator",
      desc: "Estimate volume counts for structural elements like cement bags, sand, aggregates, and brick yields.",
      icon: <Layers className="w-6 h-6 text-brand-terracotta-500" />
    },
    {
      id: "wall-net-area",
      name: "Net Wall Area Calculator",
      desc: "Compute exact wall areas by subtracting windows, doors, and architectural columns.",
      icon: <Hammer className="w-6 h-6 text-brand-terracotta-500" />
    },
    {
      id: "roofing-tile",
      name: "Roofing Tile Estimator",
      desc: "Estimate Roman tiles and ridge pieces adjusted for sloped roof angles.",
      icon: <Compass className="w-6 h-6 text-brand-terracotta-500" />
    },
    {
      id: "paver",
      name: "Paver Calculator",
      desc: "Calculate structural paver count presets for roads, pathways, and square patios.",
      icon: <Calculator className="w-6 h-6 text-brand-terracotta-500" />
    }
  ];

  return (
    <section id="calculators" className="py-24 bg-brand-slate-900 bg-grid-pattern relative border-b border-brand-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-extrabold tracking-widest text-brand-terracotta-500 bg-brand-terracotta-500/10 px-3 py-1 rounded-full">
            Engineering Estimates
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 tracking-tight">
            Construction Estimators
          </h2>
          <p className="text-brand-slate-400 mt-3 text-base sm:text-lg">
            Minimize material waste and estimate costs in seconds using our precision architectural and masonry calculators.
          </p>
        </div>

        {/* Lightweight Grid Block */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {calculatorsList.map((calc) => (
            <Link
              key={calc.id}
              href={`/calculators?id=${calc.id}`}
              className="bg-brand-slate-950 border border-brand-slate-850 hover:border-brand-slate-700 rounded-3xl p-6 flex flex-col justify-between hover:shadow-2xl hover:shadow-brand-terracotta-500/5 hover:-translate-y-1 transition-all group duration-300 cursor-pointer block"
            >
              <div>
                <div className="p-3 bg-brand-slate-900/50 border border-brand-slate-800 rounded-2xl w-fit mb-5">
                  {calc.icon}
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-brand-terracotta-400 transition-colors">
                  {calc.name}
                </h3>
                <p className="text-xs text-brand-slate-400 mt-2.5 leading-relaxed">
                  {calc.desc}
                </p>
              </div>

              <div
                className="mt-6 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold bg-brand-terracotta-600/10 group-hover:bg-brand-terracotta-600 text-brand-terracotta-400 group-hover:text-white transition-all border border-brand-terracotta-600/20"
              >
                Use Estimator
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </Link>
          ))}
        </div>

        {/* Explore All CTA */}
        <div className="text-center mt-16">
          <Link
            href="/calculators"
            className="inline-flex items-center gap-2 bg-brand-terracotta-600 hover:bg-brand-terracotta-700 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-brand-terracotta-600/20 cursor-pointer"
          >
            Explore All Calculators
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};
