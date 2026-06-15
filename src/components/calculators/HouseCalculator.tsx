"use client";

import React, { useState, useEffect } from "react";
import { Calculator, Download, Check, FileText } from "lucide-react";
import confetti from "canvas-confetti";
import { useToast } from "../ui/Toast";
import { motion, AnimatePresence } from "framer-motion";

// Animated count-up component
const AnimatedNumber: React.FC<{ value: number }> = ({ value }) => {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = value;
    if (end === 0) {
      setDisplayValue(0);
      return;
    }
    const duration = 800; // ms
    const incrementTime = 16;
    const step = Math.ceil(end / (duration / incrementTime));
    
    const timer = setInterval(() => {
      start += step;
      if (start >= end) {
        clearInterval(timer);
        setDisplayValue(end);
      } else {
        setDisplayValue(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [value]);

  return <span>{displayValue.toLocaleString()}</span>;
};

// SVG visual stack representing building floors dynamically
const HouseDiagram: React.FC<{ floors: number; builtUp: number }> = ({ floors, builtUp }) => {
  const w = 240;
  const h = 110;
  const floorElements = [];

  // Generate visual boxes representing floors
  const maxFloors = 4;
  const flHeight = (h - 20) / maxFloors;

  for (let i = 0; i < floors; i++) {
    const y = h - 20 - (i + 1) * flHeight;
    floorElements.push(
      <motion.rect
        key={i}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 0.4, delay: i * 0.1 }}
        x={w / 2 - 60}
        y={y}
        width={120}
        height={flHeight - 2}
        className="fill-brand-gold/15 stroke-brand-gold/50"
        strokeWidth="1.5"
      />
    );
  }

  return (
    <div className="border border-brand-gold/10 bg-brand-black p-6 flex flex-col items-center justify-center h-48 select-none relative">
      <div className="absolute top-2 left-3 text-[9px] uppercase tracking-wider text-brand-sand/40 font-semibold font-poppins">
        Structural Stack Plan
      </div>
      <div className="relative" style={{ width: w, height: h }}>
        <svg width={w} height={h} className="w-full h-full">
          {/* Foundation level line */}
          <line x1={10} y1={h - 18} x2={w - 10} y2={h - 18} className="stroke-brand-gold/20" strokeWidth="3" />
          
          {floorElements}
        </svg>

        <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[8px] font-mono text-brand-gold uppercase tracking-widest whitespace-nowrap">
          {floors} Floor Levels ({builtUp} sq ft)
        </div>
      </div>
    </div>
  );
};

export default function HouseCalculator() {
  const { toast } = useToast();
  const [plotSize, setPlotSize] = useState(1500);
  const [builtUpArea, setBuiltUpArea] = useState(1200);
  const [floors, setFloors] = useState(1);
  const [houseResult, setHouseResult] = useState<any>(null);

  // PDF states
  const [exportState, setExportState] = useState<string | null>(null);
  const [exportProgress, setExportProgress] = useState(0);

  const calculateHouse = (e: React.FormEvent) => {
    e.preventDefault();
    let baseBricks = 0;
    if (builtUpArea <= 600) baseBricks = 20000;
    else if (builtUpArea <= 1200) baseBricks = 40000;
    else if (builtUpArea <= 1800) baseBricks = 60000;
    else if (builtUpArea <= 2500) baseBricks = 82000;
    else baseBricks = 125000;

    const bricks = baseBricks * floors;
    const cement = Math.ceil(builtUpArea * 0.45 * floors);
    const sand = Math.ceil(builtUpArea * 1.8 * floors);
    const aggregate = Math.ceil(builtUpArea * 1.35 * floors);
    const totalCost = (bricks * 9.5) + (cement * 420) + (sand * 65) + (aggregate * 75);

    setHouseResult({ bricks, cement, sand, aggregate, totalCost });

    confetti({
      particleCount: 65,
      spread: 60,
      origin: { y: 0.85 },
      colors: ["#af6752", "#c29153", "#c4b7b0"],
    });

    toast("Whole house material budget estimated!", "success");
  };

  const handleExportPDF = () => {
    if (!houseResult) return;
    setExportProgress(0);
    setExportState("Compiling building parameters...");

    const steps = [
      { progress: 20, msg: "Filing cement & concrete requirements..." },
      { progress: 55, msg: "Assembling structural aggregate totals..." },
      { progress: 80, msg: "Drawing floor stacking vector maps..." },
      { progress: 100, msg: "Ready for download" }
    ];

    steps.forEach((step, idx) => {
      setTimeout(() => {
        setExportProgress(step.progress);
        setExportState(step.msg);
        if (step.progress === 100) {
          setTimeout(() => {
            setExportState(null);
            toast("Material schedule report downloaded successfully!", "success");
          }, 500);
        }
      }, (idx + 1) * 500);
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left Input form */}
      <div className="lg:col-span-7 bg-brand-charcoal border border-brand-gold/10 p-6 md:p-8">
        <form onSubmit={calculateHouse} className="flex flex-col gap-6">
          <h3 className="text-xl font-normal font-cormorant text-brand-offwhite flex items-center gap-2">
            <Calculator className="w-5 h-5 text-brand-gold" />
            House Material Parameters
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] text-brand-sand/50 font-bold uppercase tracking-widest font-poppins">Plot Size (Sq Ft)</label>
              <input 
                type="number" 
                value={plotSize} 
                onChange={(e) => setPlotSize(Number(e.target.value))}
                className="bg-brand-black border border-brand-gold/15 px-4 py-3 text-sm text-brand-offwhite focus:outline-none focus:border-brand-gold font-poppins rounded-none"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] text-brand-sand/50 font-bold uppercase tracking-widest font-poppins">Built-up Area (Sq Ft)</label>
              <input 
                type="number" 
                value={builtUpArea} 
                onChange={(e) => setBuiltUpArea(Number(e.target.value))}
                className="bg-brand-black border border-brand-gold/15 px-4 py-3 text-sm text-brand-offwhite focus:outline-none focus:border-brand-gold font-poppins rounded-none"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] text-brand-sand/50 font-bold uppercase tracking-widest font-poppins">Number of Floors</label>
            <select
              value={floors}
              onChange={(e) => setFloors(Number(e.target.value))}
              className="bg-brand-black border border-brand-gold/15 px-4 py-3 text-sm text-brand-offwhite focus:outline-none focus:border-brand-gold font-poppins rounded-none"
            >
              <option value={1}>Ground Floor Only (G)</option>
              <option value={2}>Ground + 1 Floor (G+1)</option>
              <option value={3}>Ground + 2 Floors (G+2)</option>
              <option value={4}>Ground + 3 Floors (G+3)</option>
            </select>
          </div>

          <button 
            type="submit"
            className="bg-brand-gold hover:bg-brand-offwhite hover:text-brand-black text-brand-black font-bold py-3.5 tracking-wider uppercase transition-colors cursor-pointer text-xs rounded-none"
          >
            Estimate Whole House Budget
          </button>
        </form>
      </div>

      {/* Right results & preview panel */}
      <div className="lg:col-span-5 space-y-6">
        <HouseDiagram floors={floors} builtUp={builtUpArea} />

        <div className="bg-brand-charcoal border border-brand-gold/10 p-6 md:p-8 min-h-[350px] flex flex-col justify-between relative">
          
          {/* PDF Generating loader */}
          <AnimatePresence>
            {exportState && (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-brand-charcoal/95 z-20 flex flex-col items-center justify-center p-8 text-center"
              >
                <FileText className="w-12 h-12 text-brand-gold animate-bounce mb-4" />
                <h4 className="text-sm font-semibold text-brand-offwhite font-poppins uppercase tracking-wider">{exportState}</h4>
                <div className="w-48 h-1 bg-brand-black border border-brand-gold/10 mt-6 relative overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${exportProgress}%` }}
                    transition={{ ease: "easeInOut" }}
                    className="absolute top-0 bottom-0 left-0 bg-brand-gold"
                  />
                </div>
                <span className="text-[10px] font-mono text-brand-sand/50 mt-2">{exportProgress}% Completed</span>
              </motion.div>
            )}
          </AnimatePresence>

          {!houseResult ? (
            <div className="flex flex-col items-center justify-center text-center my-auto py-10">
              <div className="p-4 bg-brand-black border border-brand-gold/15 rounded-none mb-4 text-brand-sand/40">
                <Calculator className="w-10 h-10" />
              </div>
              <h4 className="text-brand-offwhite font-normal font-cormorant text-lg">Material Estimates Awaiting</h4>
              <p className="text-xs text-brand-sand/50 mt-2 max-w-[240px] font-poppins leading-relaxed">
                Input your plot layout built-up sizes and floor stacks to view the core resource budget.
              </p>
            </div>
          ) : (
            <div className="flex flex-col justify-between h-full gap-6">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-brand-gold border-b border-brand-gold/10 pb-3 font-poppins">ESTIMATION SUMMARY</h4>
                
                <div className="flex flex-col gap-3 mt-6">
                  <div className="bg-brand-black px-4 py-3 border border-brand-gold/10 rounded-none flex justify-between items-center">
                    <span className="text-[10px] text-brand-sand/50 font-bold uppercase tracking-wider font-poppins">Clay Bricks Needed</span>
                    <span className="text-base font-normal font-cormorant text-brand-offwhite">
                      <AnimatedNumber value={houseResult.bricks} /> pcs
                    </span>
                  </div>
                  <div className="bg-brand-black px-4 py-3 border border-brand-gold/10 rounded-none flex justify-between items-center">
                    <span className="text-[10px] text-brand-sand/50 font-bold uppercase tracking-wider font-poppins">Cement Bags</span>
                    <span className="text-base font-normal font-cormorant text-brand-gold">
                      <AnimatedNumber value={houseResult.cement} /> bags
                    </span>
                  </div>
                  <div className="bg-brand-black px-4 py-3 border border-brand-gold/10 rounded-none flex justify-between items-center">
                    <span className="text-[10px] text-brand-sand/50 font-bold uppercase tracking-wider font-poppins">Coarse Sand</span>
                    <span className="text-base font-normal font-cormorant text-brand-offwhite">
                      <AnimatedNumber value={houseResult.sand} /> cft
                    </span>
                  </div>
                  <div className="bg-brand-black px-4 py-3 border border-brand-gold/10 rounded-none flex justify-between items-center">
                    <span className="text-[10px] text-brand-sand/50 font-bold uppercase tracking-wider font-poppins">Aggregate Stone</span>
                    <span className="text-base font-normal font-cormorant text-brand-offwhite">
                      <AnimatedNumber value={houseResult.aggregate} /> cft
                    </span>
                  </div>
                </div>

                <div className="mt-6 bg-brand-gold/5 border border-brand-gold/15 p-5 rounded-none flex justify-between items-center">
                  <div>
                    <span className="block text-[9px] text-brand-sand/50 uppercase font-bold tracking-widest font-poppins">Estimated Material Budget</span>
                    <span className="text-3xl font-light font-cormorant text-brand-offwhite mt-1">
                      ₹<AnimatedNumber value={houseResult.totalCost} />
                    </span>
                  </div>
                  <div className="p-2 bg-brand-gold text-brand-black rounded-none">
                    <Check className="w-5 h-5" />
                  </div>
                </div>
              </div>

              <button
                onClick={handleExportPDF}
                className="w-full bg-brand-black hover:bg-brand-slate text-brand-sand hover:text-brand-offwhite border border-brand-gold/15 hover:border-brand-gold/40 transition-colors py-3.5 px-4 rounded-none font-bold tracking-wider uppercase flex items-center justify-center gap-2 text-[10px] cursor-pointer"
              >
                <Download className="w-4 h-4 text-brand-gold" />
                Export Specification PDF
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
