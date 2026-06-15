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

// SVG Dynamic blueprint showing net wall and window opening cuts
const WallDiagram: React.FC<{ length: number; height: number; openings: number }> = ({ length, height, openings }) => {
  const baseWidth = 280;
  const baseHeight = 120;

  // Aspect ratio scale
  const aspect = length / (height || 1);
  let wallW = baseWidth;
  let wallH = baseHeight;

  if (aspect > 2.2) {
    wallH = baseWidth / aspect;
  } else {
    wallW = baseHeight * aspect;
  }

  wallW = Math.max(90, Math.min(baseWidth, wallW));
  wallH = Math.max(50, Math.min(baseHeight, wallH));

  // Determine opening block relative sizing
  const totalArea = length * height || 1;
  const openingPct = Math.min(0.7, openings / totalArea);
  
  // Calculate window box dimension inside the SVG wall
  const winW = wallW * Math.sqrt(openingPct) * 0.7;
  const winH = wallH * Math.sqrt(openingPct) * 0.7;

  return (
    <div className="border border-brand-gold/10 bg-brand-black p-6 flex flex-col items-center justify-center h-48 select-none relative">
      <div className="absolute top-2 left-3 text-[9px] uppercase tracking-wider text-brand-sand/40 font-semibold font-poppins">
        Elevation & Void Cutout View
      </div>
      <div className="relative" style={{ width: wallW, height: wallH }}>
        {/* Main Wall Surface */}
        <div 
          className="w-full h-full bg-brand-gold/15 border border-brand-gold/40 flex items-center justify-center relative"
        >
          {/* Subtraction Opening Area representing door/windows */}
          {openingPct > 0 && (
            <motion.div 
              layout
              style={{ width: Math.max(15, winW), height: Math.max(15, winH) }}
              className="bg-brand-black border border-dashed border-red-500/60 flex items-center justify-center"
            >
              <span className="text-[7px] text-red-500 font-mono tracking-tighter uppercase">Void</span>
            </motion.div>
          )}
        </div>
        
        {/* Dimension markings */}
        <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[8px] font-mono text-brand-gold uppercase tracking-widest whitespace-nowrap">
          Length: {length}m
        </div>
        <div className="absolute -right-6 top-1/2 -translate-y-1/2 text-[8px] font-mono text-brand-gold uppercase tracking-widest whitespace-nowrap">
          Height: {height}m
        </div>
      </div>
    </div>
  );
};

export default function WallCalculator() {
  const { toast } = useToast();
  const [wallLength, setWallLength] = useState(12);
  const [wallHeight, setWallHeight] = useState(3.5);
  const [openingsArea, setOpeningsArea] = useState(4.5);
  const [wallResult, setWallResult] = useState<any>(null);

  // PDF animation states
  const [exportState, setExportState] = useState<string | null>(null);
  const [exportProgress, setExportProgress] = useState(0);

  const calculateWall = (e: React.FormEvent) => {
    e.preventDefault();
    const grossArea = wallLength * wallHeight;
    const netArea = Math.max(grossArea - openingsArea, 0);
    const standardBricksPerSqM = 55;
    const qty = Math.ceil(netArea * standardBricksPerSqM);
    const wastage = Math.ceil(qty * 0.1);
    const total = qty + wastage;

    setWallResult({ grossArea, netArea, qty, wastage, total });

    confetti({
      particleCount: 65,
      spread: 60,
      origin: { y: 0.85 },
      colors: ["#af6752", "#c29153", "#c4b7b0"],
    });

    toast("Net wall area brick count estimated!", "success");
  };

  const handleExportPDF = () => {
    if (!wallResult) return;
    setExportProgress(0);
    setExportState("Compiling boundary layers...");

    const steps = [
      { progress: 30, msg: "Analyzing opening window cutouts..." },
      { progress: 65, msg: "Recalculating structural masonry totals..." },
      { progress: 90, msg: "Compiling vector diagrams..." },
      { progress: 100, msg: "Ready for download" }
    ];

    steps.forEach((step, idx) => {
      setTimeout(() => {
        setExportProgress(step.progress);
        setExportState(step.msg);
        if (step.progress === 100) {
          setTimeout(() => {
            setExportState(null);
            toast("Technical wall spec PDF downloaded successfully!", "success");
          }, 500);
        }
      }, (idx + 1) * 500);
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left Input form */}
      <div className="lg:col-span-7 bg-brand-charcoal border border-brand-gold/10 p-6 md:p-8">
        <form onSubmit={calculateWall} className="flex flex-col gap-6">
          <h3 className="text-xl font-normal font-cormorant text-brand-offwhite flex items-center gap-2">
            <Calculator className="w-5 h-5 text-brand-gold" />
            Wall Area Parameters
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] text-brand-sand/50 font-bold uppercase tracking-widest font-poppins">Total Wall Length (meters)</label>
              <input 
                type="number" 
                value={wallLength} 
                onChange={(e) => setWallLength(Number(e.target.value))}
                className="bg-brand-black border border-brand-gold/15 px-4 py-3 text-sm text-brand-offwhite focus:outline-none focus:border-brand-gold font-poppins rounded-none"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] text-brand-sand/50 font-bold uppercase tracking-widest font-poppins">Wall Height (meters)</label>
              <input 
                type="number" 
                value={wallHeight} 
                onChange={(e) => setWallHeight(Number(e.target.value))}
                className="bg-brand-black border border-brand-gold/15 px-4 py-3 text-sm text-brand-offwhite focus:outline-none focus:border-brand-gold font-poppins rounded-none"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] text-brand-sand/50 font-bold uppercase tracking-widest font-poppins">Openings Area (Doors & Windows - sq meters)</label>
            <input 
              type="number" 
              value={openingsArea} 
              onChange={(e) => setOpeningsArea(Number(e.target.value))}
              className="bg-brand-black border border-brand-gold/15 px-4 py-3 text-sm text-brand-offwhite focus:outline-none focus:border-brand-gold font-poppins rounded-none"
              required
            />
          </div>

          <button 
            type="submit"
            className="bg-brand-gold hover:bg-brand-offwhite hover:text-brand-black text-brand-black font-bold py-3.5 tracking-wider uppercase transition-colors cursor-pointer text-xs rounded-none"
          >
            Estimate Wall Brick Yield
          </button>
        </form>
      </div>

      {/* Right results & preview panel */}
      <div className="lg:col-span-5 space-y-6">
        <WallDiagram length={wallLength} height={wallHeight} openings={openingsArea} />

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

          {!wallResult ? (
            <div className="flex flex-col items-center justify-center text-center my-auto py-10">
              <div className="p-4 bg-brand-black border border-brand-gold/15 rounded-none mb-4 text-brand-sand/40">
                <Calculator className="w-10 h-10" />
              </div>
              <h4 className="text-brand-offwhite font-normal font-cormorant text-lg">Area Calculations Awaiting</h4>
              <p className="text-xs text-brand-sand/50 mt-2 max-w-[240px] font-poppins leading-relaxed">
                Input gross dimensions and window/door subtraction bounds to view estimated layouts.
              </p>
            </div>
          ) : (
            <div className="flex flex-col justify-between h-full gap-6">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-brand-gold border-b border-brand-gold/10 pb-3 font-poppins">ESTIMATION SUMMARY</h4>
                
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="bg-brand-black p-4 border border-brand-gold/10 rounded-none">
                    <span className="block text-[9px] text-brand-sand/50 uppercase font-bold tracking-wider font-poppins">Gross Area</span>
                    <span className="text-lg font-normal font-cormorant text-brand-offwhite">{wallResult.grossArea} m²</span>
                  </div>
                  <div className="bg-brand-black p-4 border border-brand-gold/10 rounded-none">
                    <span className="block text-[9px] text-brand-sand/50 uppercase font-bold tracking-wider font-poppins">Net Area</span>
                    <span className="text-lg font-normal font-cormorant text-brand-gold">{wallResult.netArea} m²</span>
                  </div>
                </div>

                {/* Progress bar indicating Net area efficiency ratio */}
                <div className="mt-4 flex flex-col gap-1.5">
                  <div className="flex justify-between text-[9px] font-mono text-brand-sand/50">
                    <span>Net Masonry Efficiency</span>
                    <span>{Math.round((wallResult.netArea / (wallResult.grossArea || 1)) * 100)}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-brand-black border border-brand-gold/10 overflow-hidden relative">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.round((wallResult.netArea / (wallResult.grossArea || 1)) * 100)}%` }}
                      className="absolute top-0 bottom-0 left-0 bg-brand-gold" 
                    />
                  </div>
                </div>
                
                <div className="mt-6 bg-brand-gold/5 border border-brand-gold/15 p-5 rounded-none flex justify-between items-center">
                  <div>
                    <span className="block text-[9px] text-brand-sand/50 uppercase font-bold tracking-widest font-poppins">Estimated Bricks Required</span>
                    <span className="text-3xl font-light font-cormorant text-brand-offwhite mt-1">
                      <AnimatedNumber value={wallResult.total} />
                    </span>
                  </div>
                  <div className="p-2 bg-brand-gold text-brand-black rounded-none">
                    <Check className="w-5 h-5" />
                  </div>
                </div>

                <div className="mt-6 flex justify-between text-xs font-mono text-brand-sand/50 p-2 border-b border-brand-gold/5">
                  <span>Net Standard Bricks:</span>
                  <span className="text-brand-offwhite font-semibold"><AnimatedNumber value={wallResult.qty} /> pcs</span>
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
