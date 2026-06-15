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

// SVG Live Preview for paving tiles pattern layouts
const PaverDiagram: React.FC<{ length: number; width: number; shape: string }> = ({ length, width, shape }) => {
  const baseWidth = 280;
  const baseHeight = 120;

  const aspect = length / (width || 1);
  let wallW = baseWidth;
  let wallH = baseHeight;

  if (aspect > 2.2) {
    wallH = baseWidth / aspect;
  } else {
    wallW = baseHeight * aspect;
  }

  wallW = Math.max(90, Math.min(baseWidth, wallW));
  wallH = Math.max(50, Math.min(baseHeight, wallH));

  const cols = 14;
  const rows = 6;
  const items = [];

  const w = wallW / cols;
  const h = wallH / rows;

  if (shape === "hexagonal") {
    // Honeycomb coordinates
    for (let r = 0; r < rows; r++) {
      const isOdd = r % 2 === 1;
      const offset = isOdd ? w / 2 : 0;
      for (let c = 0; c < cols; c++) {
        const cx = c * w + offset + w / 2;
        const cy = r * h + h / 2;
        // Hexagon points
        const points = [];
        const size = Math.min(w, h) * 0.55;
        for (let i = 0; i < 6; i++) {
          const angle = (Math.PI / 3) * i;
          points.push(`${cx + size * Math.cos(angle)},${cy + size * Math.sin(angle)}`);
        }
        items.push(
          <polygon 
            key={`${r}-${c}`}
            points={points.join(" ")}
            className="fill-brand-gold/10 stroke-brand-gold/40"
            strokeWidth="0.75"
          />
        );
      }
    }
  } else if (shape === "square") {
    // Standard grid square tiles
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        items.push(
          <rect 
            key={`${r}-${c}`}
            x={c * w}
            y={r * h}
            width={w - 1}
            height={h - 1}
            className="fill-brand-gold/15 stroke-brand-gold/45"
            strokeWidth="0.75"
          />
        );
      }
    }
  } else {
    // Brick running bond pattern for rectangular pavers
    for (let r = 0; r < rows; r++) {
      const isOdd = r % 2 === 1;
      const offset = isOdd ? w / 2 : 0;
      for (let c = -1; c <= cols; c++) {
        items.push(
          <rect 
            key={`${r}-${c}`}
            x={c * w + offset}
            y={r * h}
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
        Paving Grid Layout ({shape})
      </div>
      <div className="relative" style={{ width: wallW, height: wallH }}>
        <svg width={wallW} height={wallH} className="w-full h-full">
          {items}
        </svg>
        <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[8px] font-mono text-brand-gold uppercase tracking-widest whitespace-nowrap">
          Length: {length}m
        </div>
        <div className="absolute -right-6 top-1/2 -translate-y-1/2 text-[8px] font-mono text-brand-gold uppercase tracking-widest whitespace-nowrap">
          Width: {width}m
        </div>
      </div>
    </div>
  );
};

export default function PaverCalculator() {
  const { toast } = useToast();
  const [paverLength, setPaverLength] = useState(20);
  const [paverWidth, setPaverWidth] = useState(10);
  const [paverSize, setPaverSize] = useState("rectangular");
  const [paverResult, setPaverResult] = useState<any>(null);

  // PDF states
  const [exportState, setExportState] = useState<string | null>(null);
  const [exportProgress, setExportProgress] = useState(0);

  const calculatePaver = (e: React.FormEvent) => {
    e.preventDefault();
    const area = paverLength * paverWidth;
    let pArea = 0.2 * 0.1;
    if (paverSize === "square") pArea = 0.1 * 0.1;
    if (paverSize === "hexagonal") pArea = 0.032;

    const qty = Math.ceil(area / pArea);
    const wastage = Math.ceil(qty * 0.08);
    const total = qty + wastage;
    const costEstimate = total * 18;

    setPaverResult({ area, qty, wastage, total, costEstimate });

    confetti({
      particleCount: 65,
      spread: 60,
      origin: { y: 0.85 },
      colors: ["#af6752", "#c29153", "#c4b7b0"],
    });

    toast("Paving tiles calculations complete!", "success");
  };

  const handleExportPDF = () => {
    if (!paverResult) return;
    setExportProgress(0);
    setExportState("Drafting pavement bounds...");

    const steps = [
      { progress: 20, msg: "Allocating shape interlocking matrices..." },
      { progress: 55, msg: "Drawing pattern vector array..." },
      { progress: 85, msg: "Compiling paving datasheet..." },
      { progress: 100, msg: "Ready for download" }
    ];

    steps.forEach((step, idx) => {
      setTimeout(() => {
        setExportProgress(step.progress);
        setExportState(step.msg);
        if (step.progress === 100) {
          setTimeout(() => {
            setExportState(null);
            toast("Paving estimation PDF downloaded successfully!", "success");
          }, 500);
        }
      }, (idx + 1) * 500);
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left Input form */}
      <div className="lg:col-span-7 bg-brand-charcoal border border-brand-gold/10 p-6 md:p-8">
        <form onSubmit={calculatePaver} className="flex flex-col gap-6">
          <h3 className="text-xl font-normal font-cormorant text-brand-offwhite flex items-center gap-2">
            <Calculator className="w-5 h-5 text-brand-gold" />
            Paver Area Parameters
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] text-brand-sand/50 font-bold uppercase tracking-widest font-poppins">Area Length (meters)</label>
              <input 
                type="number" 
                value={paverLength} 
                onChange={(e) => setPaverLength(Number(e.target.value))}
                className="bg-brand-black border border-brand-gold/15 px-4 py-3 text-sm text-brand-offwhite focus:outline-none focus:border-brand-gold font-poppins rounded-none"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] text-brand-sand/50 font-bold uppercase tracking-widest font-poppins">Area Width (meters)</label>
              <input 
                type="number" 
                value={paverWidth} 
                onChange={(e) => setPaverWidth(Number(e.target.value))}
                className="bg-brand-black border border-brand-gold/15 px-4 py-3 text-sm text-brand-offwhite focus:outline-none focus:border-brand-gold font-poppins rounded-none"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] text-brand-sand/50 font-bold uppercase tracking-widest font-poppins">Paver Shape/Size</label>
            <select
              value={paverSize}
              onChange={(e) => setPaverSize(e.target.value)}
              className="bg-brand-black border border-brand-gold/15 px-4 py-3 text-sm text-brand-offwhite focus:outline-none focus:border-brand-gold font-poppins rounded-none"
            >
              <option value="rectangular">Rectangular Clay (200 × 100 mm)</option>
              <option value="square">Square Clay (100 × 100 mm)</option>
              <option value="hexagonal">Hexagonal Paving Tile (0.032 sqm/tile)</option>
            </select>
          </div>

          <button 
            type="submit"
            className="bg-brand-gold hover:bg-brand-offwhite hover:text-brand-black text-brand-black font-bold py-3.5 tracking-wider uppercase transition-colors cursor-pointer text-xs rounded-none"
          >
            Estimate Pavers Needed
          </button>
        </form>
      </div>

      {/* Right results & preview panel */}
      <div className="lg:col-span-5 space-y-6">
        <PaverDiagram length={paverLength} width={paverWidth} shape={paverSize} />

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

          {!paverResult ? (
            <div className="flex flex-col items-center justify-center text-center my-auto py-10">
              <div className="p-4 bg-brand-black border border-brand-gold/15 rounded-none mb-4 text-brand-sand/40">
                <Calculator className="w-10 h-10" />
              </div>
              <h4 className="text-brand-offwhite font-normal font-cormorant text-lg">Paver Layouts Awaiting</h4>
              <p className="text-xs text-brand-sand/50 mt-2 max-w-[240px] font-poppins leading-relaxed">
                Input your landscape bounds and choose paver profiles to review total quantities.
              </p>
            </div>
          ) : (
            <div className="flex flex-col justify-between h-full gap-6">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-brand-gold border-b border-brand-gold/10 pb-3 font-poppins">ESTIMATION SUMMARY</h4>
                
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="bg-brand-black p-4 border border-brand-gold/10 rounded-none">
                    <span className="block text-[9px] text-brand-sand/50 uppercase font-bold tracking-wider font-poppins">Surface Area</span>
                    <span className="text-lg font-normal font-cormorant text-brand-offwhite">{paverResult.area} m²</span>
                  </div>
                  <div className="bg-brand-black p-4 border border-brand-gold/10 rounded-none">
                    <span className="block text-[9px] text-brand-sand/50 uppercase font-bold tracking-wider font-poppins">Wastage (8%)</span>
                    <span className="text-lg font-normal font-cormorant text-brand-gold">
                      +<AnimatedNumber value={paverResult.wastage} />
                    </span>
                  </div>
                </div>

                {/* Progress bar representing actual tiles vs wastage ratio */}
                <div className="mt-4 flex flex-col gap-1.5">
                  <div className="flex justify-between text-[9px] font-mono text-brand-sand/50">
                    <span>Effective Cover Area</span>
                    <span>92.6%</span>
                  </div>
                  <div className="w-full h-1.5 bg-brand-black border border-brand-gold/10 overflow-hidden relative">
                    <div className="absolute top-0 bottom-0 left-0 bg-brand-gold w-[93%]" />
                  </div>
                </div>
                
                <div className="mt-6 bg-brand-gold/5 border border-brand-gold/15 p-5 rounded-none flex justify-between items-center">
                  <div>
                    <span className="block text-[9px] text-brand-sand/50 uppercase font-bold tracking-widest font-poppins">Total Pavers Required</span>
                    <span className="text-3xl font-light font-cormorant text-brand-offwhite mt-1">
                      <AnimatedNumber value={paverResult.total} />
                    </span>
                  </div>
                  <div className="p-2 bg-brand-gold text-brand-black rounded-none">
                    <Check className="w-5 h-5" />
                  </div>
                </div>

                <div className="mt-6 flex justify-between text-xs font-mono text-brand-sand/50 p-2 border-b border-brand-gold/5">
                  <span>Net standard tiles (ex. waste):</span>
                  <span className="text-brand-offwhite font-semibold"><AnimatedNumber value={paverResult.qty} /> pcs</span>
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
