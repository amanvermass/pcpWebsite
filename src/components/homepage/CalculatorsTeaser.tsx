"use client";

import React, { useRef } from "react";
import Link from "next/link";
import { useInView, motion } from "framer-motion";
import { Calculator, Layers, Hammer, ArrowRight } from "lucide-react";
import { Magnetic } from "../ui/Magnetic";

interface CalculatorCardProps {
  id: string;
  name: string;
  desc: string;
  icon: React.ReactNode;
  targetCount: number;
  suffix: string;
  label: string;
}

const CalculatorCard: React.FC<CalculatorCardProps> = ({ 
  id, name, desc, icon, targetCount, suffix, label 
}) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, margin: "-80px" });
  
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 1500; // 1.5s
    const end = targetCount;
    const incrementTime = Math.max(Math.floor(duration / end), 20);

    const timer = setInterval(() => {
      start += Math.ceil(end / (duration / incrementTime));
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [isInView, targetCount]);

  return (
    <div ref={cardRef} className="h-full">
      <Link
        href={`/calculators?id=${id}`}
        className="flex flex-col justify-between h-full bg-brand-charcoal border border-brand-gold/10 hover:border-brand-gold/40 rounded-none p-8 hover:shadow-[0_0_30px_rgba(197,139,69,0.15)] transition-all group duration-300"
      >
        <div>
          {/* Header icon row */}
          <div className="flex justify-between items-start mb-6">
            <div className="p-3 bg-brand-black border border-brand-gold/15 rounded-none text-brand-gold group-hover:border-brand-gold/40 transition-colors">
              {icon}
            </div>
            
            {/* Animated counter preview */}
            <div className="text-right">
              <span className="block text-[9px] uppercase tracking-widest text-brand-sand/55 font-poppins">
                {label}
              </span>
              <span className="text-2xl font-light font-cormorant text-brand-gold">
                {count.toLocaleString()} {suffix}
              </span>
            </div>
          </div>

          <h3 className="text-xl font-normal font-cormorant text-brand-offwhite group-hover:text-brand-gold transition-colors">
            {name}
          </h3>
          <p className="text-xs font-poppins text-brand-sand/65 mt-3 leading-relaxed">
            {desc}
          </p>
        </div>

        <div className="mt-8 flex items-center justify-center gap-2 py-3 rounded-none text-[10px] uppercase font-poppins tracking-wider font-semibold bg-brand-gold/10 group-hover:bg-brand-gold text-brand-gold group-hover:text-brand-black border border-brand-gold/25 group-hover:border-brand-gold transition-colors">
          Use Estimator
          <ArrowRight className="w-3.5 h-3.5" />
        </div>
      </Link>
    </div>
  );
};

export const CalculatorsTeaser: React.FC = () => {
  const calculatorsList = [
    {
      id: "brick-quantity",
      name: "Brick Quantity Calculator",
      desc: "Calculate brick count, volumes, and mortar requirements with customizable wastage margins.",
      icon: <Calculator className="w-6 h-6" />,
      targetCount: 2450,
      suffix: "Bricks",
      label: "average yield"
    },
    {
      id: "paver",
      name: "Paver Cost Calculator",
      desc: "Calculate structural paver count presets for roads, pathways, and square patios.",
      icon: <Layers className="w-6 h-6" />,
      targetCount: 1200,
      suffix: "Pavers",
      label: "estimated count"
    },
    {
      id: "wall-net-area",
      name: "Net Wall Area Calculator",
      desc: "Compute exact wall areas by subtracting windows, doors, and architectural columns.",
      icon: <Hammer className="w-6 h-6" />,
      targetCount: 420,
      suffix: "sq ft",
      label: "net square area"
    }
  ];

  return (
    <section id="calculators" className="py-24 bg-brand-black relative">
      {/* Background guide lines */}
      <div className="absolute inset-0 pointer-events-none z-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-4 h-full opacity-5">
        <div className="border-l border-brand-slate h-full" />
        <div className="border-l border-brand-slate h-full" />
        <div className="border-l border-brand-slate h-full" />
        <div className="border-l border-brand-slate h-full border-r" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center">
          <span className="text-[10px] uppercase font-bold tracking-[0.35em] text-brand-gold bg-brand-gold/5 px-4 py-1.5 border border-brand-gold/20 rounded-none w-fit block">
            ENGINEERING DATA
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal font-cormorant text-brand-offwhite mt-6 tracking-wide">
            Construction Estimators
          </h2>
          <p className="text-brand-sand/70 text-xs sm:text-sm font-poppins mt-4 max-w-xl leading-relaxed">
            Minimize material waste and estimate costs in seconds using our precision architectural and masonry calculators.
          </p>
        </div>

        {/* Dynamic Calculator Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {calculatorsList.map((calc) => (
            <CalculatorCard
              key={calc.id}
              id={calc.id}
              name={calc.name}
              desc={calc.desc}
              icon={calc.icon}
              targetCount={calc.targetCount}
              suffix={calc.suffix}
              label={calc.label}
            />
          ))}
        </div>

        {/* Explore All CTA */}
        <div className="text-center mt-16">
          <Magnetic>
            <Link
              href="/calculators"
              className="inline-flex items-center gap-2 bg-brand-gold hover:bg-brand-sand text-brand-black px-8 py-4 rounded-none font-semibold uppercase tracking-[0.2em] font-poppins text-xs transition-colors border border-brand-gold cursor-pointer"
            >
              Explore All Estimators
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Magnetic>
        </div>
      </div>
    </section>
  );
};

export default CalculatorsTeaser;
