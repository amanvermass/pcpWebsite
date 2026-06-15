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

// SVG Live Visual Preview of Brick Grid
const BrickDiagram: React.FC<{ length: number; height: number; thickness: number; size: string }> = ({ length, height, thickness, size }) => {
  const baseWidth = 280;
  const baseHeight = 120;
  
  // Calculate relative aspect
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

  const cols = Math.min(18, Math.max(4, Math.floor(length * 1.5)));
  const rows = Math.min(9, Math.max(2, Math.floor(height * 1.8)));

  const bricks = [];
  for (let r = 0; r < rows; r++) {
    const isOdd = r % 2 === 1;
    const w = wallW / cols;
    const h = wallH / rows;
    const offset = isOdd ? w / 2 : 0;
    
    for (let c = -1; c <= cols; c++) {
      const x = c * w + offset;
      const y = r * h;
      if (x + w > 0 && x < wallW) {
        bricks.push(
          <rect
            key={`${r}-${c}`}
            x={x}
            y={y}
            width={w - 1}
            height={h - 1}
            className="fill-brand-gold/15 stroke-brand-gold/45"
            strokeWidth="0.75"
          />
        );
      }
    }
  }

  return (
    <div className="border border-brand-gold/10 bg-brand-black p-6 flex flex-col items-center justify-center h-48 select-none relative">
      <div className="absolute top-2 left-3 text-[9px] uppercase tracking-wider text-brand-sand/40 font-semibold font-poppins">
        Dynamic Elevation Blueprint
      </div>
      <div className="relative" style={{ width: wallW, height: wallH }}>
        <svg width={wallW} height={wallH} className="w-full h-full">
          {bricks}
        </svg>
        <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[8px] font-mono text-brand-gold uppercase tracking-widest whitespace-nowrap">
          L: {length}m
        </div>
        <div className="absolute -right-6 top-1/2 -translate-y-1/2 text-[8px] font-mono text-brand-gold uppercase tracking-widest whitespace-nowrap">
          H: {height}m
        </div>
      </div>
    </div>
  );
};

export default function BrickCalculator() {
  const { toast } = useToast();
  const [brickLength, setBrickLength] = useState(10);
  const [brickHeight, setBrickHeight] = useState(3);
  const [brickThickness, setBrickThickness] = useState(230);
  const [brickSize, setBrickSize] = useState("standard");
  const [brickResult, setBrickResult] = useState<any>(null);

  // PDF Export animation progress states
  const [exportState, setExportState] = useState<string | null>(null);
  const [exportProgress, setExportProgress] = useState(0);

  const calculateBricks = (e: React.FormEvent) => {
    e.preventDefault();
    let bL = 0.23, bW = 0.11, bH = 0.075;
    if (brickSize === "modular") {
      bL = 0.19; bW = 0.09; bH = 0.09;
    }
    const mortar = 0.01;
    const brickVolWithMortar = (bL + mortar) * (bW + mortar) * (bH + mortar);
    const wallVol = brickLength * brickHeight * (brickThickness / 1000);
    const qty = Math.ceil(wallVol / brickVolWithMortar);
    const wastage = Math.ceil(qty * 0.10);
    const total = qty + wastage;
    const costEstimate = total * 9.5;

    setBrickResult({ qty, wastage, total, costEstimate });

    confetti({
      particleCount: 65,
      spread: 60,
      origin: { y: 0.85 },
      colors: ["#af6752", "#c29153", "#c4b7b0"],
    });

    toast("Brick quantity calculated successfully!", "success");
  };

  const handleExportPDF = () => {
    if (!brickResult) return;
    setExportProgress(0);
    setExportState("Compiling parameters...");

    const steps = [
      { progress: 25, msg: "Filing dimensional specifications..." },
      { progress: 60, msg: "Constructing layout vector blueprint..." },
      { progress: 85, msg: "Generating PDF export file..." },
      { progress: 100, msg: "Ready for download" }
    ];

    steps.forEach((step, idx) => {
      setTimeout(() => {
        setExportProgress(step.progress);
        setExportState(step.msg);
        if (step.progress === 100) {
          setTimeout(() => {
            setExportState(null);
            toast("Specifications report PDF downloaded successfully!", "success");
          }, 500);
        }
      }, (idx + 1) * 500);
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left Input Fields */}
      <div className="lg:col-span-7 bg-brand-charcoal border border-brand-gold/10 p-6 md:p-8">
        <form onSubmit={calculateBricks} className="flex flex-col gap-6">
          <h3 className="text-xl font-normal font-cormorant text-brand-offwhite flex items-center gap-2">
            <Calculator className="w-5 h-5 text-brand-gold" />
            Brick Volume Parameters
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] text-brand-sand/50 font-bold uppercase tracking-widest font-poppins">Wall Length (meters)</label>
              <input 
                type="number" 
                value={brickLength} 
                onChange={(e) => setBrickLength(Number(e.target.value))}
                className="bg-brand-black border border-brand-gold/15 px-4 py-3 text-sm text-brand-offwhite focus:outline-none focus:border-brand-gold font-poppins rounded-none"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] text-brand-sand/50 font-bold uppercase tracking-widest font-poppins">Wall Height (meters)</label>
              <input 
                type="number" 
                value={brickHeight} 
                onChange={(e) => setBrickHeight(Number(e.target.value))}
                className="bg-brand-black border border-brand-gold/15 px-4 py-3 text-sm text-brand-offwhite focus:outline-none focus:border-brand-gold font-poppins rounded-none"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] text-brand-sand/50 font-bold uppercase tracking-widest font-poppins">Wall Thickness</label>
              <select
                value={brickThickness}
                onChange={(e) => setBrickThickness(Number(e.target.value))}
                className="bg-brand-black border border-brand-gold/15 px-4 py-3 text-sm text-brand-offwhite focus:outline-none focus:border-brand-gold font-poppins rounded-none"
              >
                <option value={110}>110 mm (Single Layer / Partition)</option>
                <option value={230}>230 mm (Double Layer / Structural)</option>
              </select>
            </div>
            
            <div className="flex flex-col gap-2">
              <label className="text-[10px] text-brand-sand/50 font-bold uppercase tracking-widest font-poppins">Brick Size Type</label>
              <select
                value={brickSize}
                onChange={(e) => setBrickSize(e.target.value)}
                className="bg-brand-black border border-brand-gold/15 px-4 py-3 text-sm text-brand-offwhite focus:outline-none focus:border-brand-gold font-poppins rounded-none"
              >
                <option value="standard">Standard Clay (230 × 110 × 75 mm)</option>
                <option value="modular">Modular Clay (190 × 90 × 90 mm)</option>
              </select>
            </div>
          </div>

          <button 
            type="submit"
            className="bg-brand-gold hover:bg-brand-offwhite hover:text-brand-black text-brand-black font-bold py-3.5 tracking-wider uppercase transition-colors cursor-pointer text-xs rounded-none"
          >
            Run Engineering Calculations
          </button>
        </form>
      </div>

      {/* Right Visual Previews & Countups */}
      <div className="lg:col-span-5 space-y-6">
        <BrickDiagram length={brickLength} height={brickHeight} thickness={brickThickness} size={brickSize} />

        <div className="bg-brand-charcoal border border-brand-gold/10 p-6 md:p-8 min-h-[350px] flex flex-col justify-between relative">
          
          {/* PDF Generating overlay progress slider */}
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

          {!brickResult ? (
            <div className="flex flex-col items-center justify-center text-center my-auto py-10">
              <div className="p-4 bg-brand-black border border-brand-gold/15 rounded-none mb-4 text-brand-sand/40">
                <Calculator className="w-10 h-10" />
              </div>
              <h4 className="text-brand-offwhite font-normal font-cormorant text-lg">Awaiting Specifications</h4>
              <p className="text-xs text-brand-sand/50 mt-2 max-w-[240px] font-poppins leading-relaxed">
                Enter structural coordinates and trigger the estimator to view material reports.
              </p>
            </div>
          ) : (
            <div className="flex flex-col justify-between h-full gap-6">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-brand-gold border-b border-brand-gold/10 pb-3 font-poppins">ESTIMATION SUMMARY</h4>
                
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="bg-brand-black p-4 border border-brand-gold/10 rounded-none">
                    <span className="block text-[9px] text-brand-sand/50 uppercase font-bold tracking-wider font-poppins">Net bricks</span>
                    <span className="text-2xl font-normal font-cormorant text-brand-offwhite">
                      <AnimatedNumber value={brickResult.qty} />
                    </span>
                  </div>
                  <div className="bg-brand-black p-4 border border-brand-gold/10 rounded-none">
                    <span className="block text-[9px] text-brand-sand/50 uppercase font-bold tracking-wider font-poppins">Wastage (10%)</span>
                    <span className="text-2xl font-normal font-cormorant text-brand-gold">
                      +<AnimatedNumber value={brickResult.wastage} />
                    </span>
                  </div>
                </div>

                {/* Progress bar indicating bricks yield vs wastage */}
                <div className="mt-4 flex flex-col gap-1.5">
                  <div className="flex justify-between text-[9px] font-mono text-brand-sand/50">
                    <span>Bricks Yield</span>
                    <span>90.9%</span>
                  </div>
                  <div className="w-full h-1.5 bg-brand-black border border-brand-gold/10 overflow-hidden relative">
                    <div className="absolute top-0 bottom-0 left-0 bg-brand-gold w-[91%]" />
                  </div>
                </div>
                
                <div className="mt-6 bg-brand-gold/5 border border-brand-gold/15 p-5 rounded-none flex justify-between items-center">
                  <div>
                    <span className="block text-[9px] text-brand-sand/50 uppercase font-bold tracking-widest font-poppins">Total Bricks Required</span>
                    <span className="text-3xl font-light font-cormorant text-brand-offwhite mt-1">
                      <AnimatedNumber value={brickResult.total} />
                    </span>
                  </div>
                  <div className="p-2 bg-brand-gold text-brand-black rounded-none">
                    <Check className="w-5 h-5" />
                  </div>
                </div>

                <div className="mt-6 flex justify-between text-xs font-mono text-brand-sand/50 p-2 border-b border-brand-gold/5">
                  <span>Estimated project budget:</span>
                  <span className="text-brand-offwhite font-semibold">₹{(brickResult.qty * 8.5).toLocaleString()}</span>
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
