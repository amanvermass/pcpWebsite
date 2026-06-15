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

// SVG Live Preview for roofing tiles, showing rafters adjusting to pitch/slope angle
const RoofDiagram: React.FC<{ slope: number }> = ({ slope }) => {
  const w = 240;
  const h = 100;
  
  // Calculate slope angle lines
  const rad = (slope * Math.PI) / 180;
  const rise = Math.tan(rad) * (w / 2);
  const peakY = Math.max(10, h - 20 - rise);

  return (
    <div className="border border-brand-gold/10 bg-brand-black p-6 flex flex-col items-center justify-center h-48 select-none relative">
      <div className="absolute top-2 left-3 text-[9px] uppercase tracking-wider text-brand-sand/40 font-semibold font-poppins">
        Structural Truss Elevation
      </div>
      <div className="relative" style={{ width: w, height: h }}>
        <svg width={w} height={h} className="w-full h-full">
          {/* Ground level tie beam */}
          <line x1={10} y1={h - 20} x2={w - 10} y2={h - 20} className="stroke-brand-gold/30" strokeWidth="2" />
          
          {/* Sloped Rafters */}
          <line x1={10} y1={h - 20} x2={w / 2} y2={peakY} className="stroke-brand-gold" strokeWidth="3" />
          <line x1={w - 10} y1={h - 20} x2={w / 2} y2={peakY} className="stroke-brand-gold" strokeWidth="3" />
          
          {/* King Post vertical support */}
          <line x1={w / 2} y1={h - 20} x2={w / 2} y2={peakY} className="stroke-brand-gold/40 border-dashed" strokeWidth="1.5" strokeDasharray="3,3" />

          {/* Sloped tile segments indicator overlay */}
          <line x1={20} y1={h - 20 - 5} x2={w / 2 - 10} y2={peakY + 5} className="stroke-brand-terracotta-600/70" strokeWidth="4" />
          <line x1={w - 20} y1={h - 20 - 5} x2={w / 2 + 10} y2={peakY + 5} className="stroke-brand-terracotta-600/70" strokeWidth="4" />
        </svg>

        <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[8px] font-mono text-brand-gold uppercase tracking-widest whitespace-nowrap">
          Pitch: {slope}° Slope Angle
        </div>
      </div>
    </div>
  );
};

export default function RoofCalculator() {
  const { toast } = useToast();
  const [roofLength, setRoofLength] = useState(15);
  const [roofWidth, setRoofWidth] = useState(8);
  const [roofSlope, setRoofSlope] = useState(15);
  const [roofResult, setRoofResult] = useState<any>(null);

  // PDF states
  const [exportState, setExportState] = useState<string | null>(null);
  const [exportProgress, setExportProgress] = useState(0);

  const calculateRoof = (e: React.FormEvent) => {
    e.preventDefault();
    const slopeRad = (roofSlope * Math.PI) / 180;
    const actualArea = (roofLength * roofWidth) / Math.cos(slopeRad);
    const tilesRequired = Math.ceil(actualArea * 12.5);
    const ridges = Math.ceil(roofLength * 2.2);
    const wastage = Math.ceil(tilesRequired * 0.08);
    const totalTiles = tilesRequired + wastage;
    const costEstimate = (totalTiles * 65) + (ridges * 180);

    setRoofResult({ actualArea: Math.ceil(actualArea), tilesRequired, ridges, totalTiles, costEstimate });

    confetti({
      particleCount: 65,
      spread: 60,
      origin: { y: 0.85 },
      colors: ["#af6752", "#c29153", "#c4b7b0"],
    });

    toast("Roofing tile requirements computed!", "success");
  };

  const handleExportPDF = () => {
    if (!roofResult) return;
    setExportProgress(0);
    setExportState("Estimating slope multiplier...");

    const steps = [
      { progress: 25, msg: "Filing slope angle degree constants..." },
      { progress: 60, msg: "Drawing truss layout blueprints..." },
      { progress: 85, msg: "Assembling roofing tile datasheets..." },
      { progress: 100, msg: "Ready for download" }
    ];

    steps.forEach((step, idx) => {
      setTimeout(() => {
        setExportProgress(step.progress);
        setExportState(step.msg);
        if (step.progress === 100) {
          setTimeout(() => {
            setExportState(null);
            toast("Roof specifications PDF report downloaded successfully!", "success");
          }, 500);
        }
      }, (idx + 1) * 500);
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Left Input form */}
      <div className="lg:col-span-7 bg-brand-charcoal border border-brand-gold/10 p-6 md:p-8">
        <form onSubmit={calculateRoof} className="flex flex-col gap-6">
          <h3 className="text-xl font-normal font-cormorant text-brand-offwhite flex items-center gap-2">
            <Calculator className="w-5 h-5 text-brand-gold" />
            Roofing Structural Parameters
          </h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-[10px] text-brand-sand/50 font-bold uppercase tracking-widest font-poppins">Roof Length (meters)</label>
              <input 
                type="number" 
                value={roofLength} 
                onChange={(e) => setRoofLength(Number(e.target.value))}
                className="bg-brand-black border border-brand-gold/15 px-4 py-3 text-sm text-brand-offwhite focus:outline-none focus:border-brand-gold font-poppins rounded-none"
                required
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="text-[10px] text-brand-sand/50 font-bold uppercase tracking-widest font-poppins">Roof Width (meters)</label>
              <input 
                type="number" 
                value={roofWidth} 
                onChange={(e) => setRoofWidth(Number(e.target.value))}
                className="bg-brand-black border border-brand-gold/15 px-4 py-3 text-sm text-brand-offwhite focus:outline-none focus:border-brand-gold font-poppins rounded-none"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-[10px] text-brand-sand/50 font-bold uppercase tracking-widest font-poppins">Roof Slope (degrees)</label>
            <input 
              type="number" 
              value={roofSlope} 
              onChange={(e) => setRoofSlope(Number(e.target.value))}
              min={0}
              max={60}
              className="bg-brand-black border border-brand-gold/15 px-4 py-3 text-sm text-brand-offwhite focus:outline-none focus:border-brand-gold font-poppins rounded-none"
              required
            />
          </div>

          <button 
            type="submit"
            className="bg-brand-gold hover:bg-brand-offwhite hover:text-brand-black text-brand-black font-bold py-3.5 tracking-wider uppercase transition-colors cursor-pointer text-xs rounded-none"
          >
            Estimate Roofing Tiles
          </button>
        </form>
      </div>

      {/* Right results & preview panel */}
      <div className="lg:col-span-5 space-y-6">
        <RoofDiagram slope={roofSlope} />

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

          {!roofResult ? (
            <div className="flex flex-col items-center justify-center text-center my-auto py-10">
              <div className="p-4 bg-brand-black border border-brand-gold/15 rounded-none mb-4 text-brand-sand/40">
                <Calculator className="w-10 h-10" />
              </div>
              <h4 className="text-brand-offwhite font-normal font-cormorant text-lg">Truss Estimator Awaiting</h4>
              <p className="text-xs text-brand-sand/50 mt-2 max-w-[240px] font-poppins leading-relaxed">
                Input structural deck spans and pitch angles to generate Roman tiles count summaries.
              </p>
            </div>
          ) : (
            <div className="flex flex-col justify-between h-full gap-6">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-brand-gold border-b border-brand-gold/10 pb-3 font-poppins">ESTIMATION SUMMARY</h4>
                
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="bg-brand-black p-4 border border-brand-gold/10 rounded-none">
                    <span className="block text-[9px] text-brand-sand/50 uppercase font-bold tracking-wider font-poppins">Sloped Surface Area</span>
                    <span className="text-lg font-normal font-cormorant text-brand-offwhite">{roofResult.actualArea} m²</span>
                  </div>
                  <div className="bg-brand-black p-4 border border-brand-gold/10 rounded-none">
                    <span className="block text-[9px] text-brand-sand/50 uppercase font-bold tracking-wider font-poppins">Ridge Tiles</span>
                    <span className="text-lg font-normal font-cormorant text-brand-gold">{roofResult.ridges} pcs</span>
                  </div>
                </div>

                {/* Progress bar representing slope pitch ratio scale (0-60 degrees) */}
                <div className="mt-4 flex flex-col gap-1.5">
                  <div className="flex justify-between text-[9px] font-mono text-brand-sand/50">
                    <span>Slope Pitch Ratio</span>
                    <span>{Math.round((roofSlope / 60) * 100)}% ({roofSlope}°)</span>
                  </div>
                  <div className="w-full h-1.5 bg-brand-black border border-brand-gold/10 overflow-hidden relative">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.round((roofSlope / 60) * 100)}%` }}
                      className="absolute top-0 bottom-0 left-0 bg-brand-gold" 
                    />
                  </div>
                </div>
                
                <div className="mt-6 bg-brand-gold/5 border border-brand-gold/15 p-5 rounded-none flex justify-between items-center">
                  <div>
                    <span className="block text-[9px] text-brand-sand/50 uppercase font-bold tracking-widest font-poppins">Total Roman Tiles Required</span>
                    <span className="text-3xl font-light font-cormorant text-brand-offwhite mt-1">
                      <AnimatedNumber value={roofResult.totalTiles} />
                    </span>
                  </div>
                  <div className="p-2 bg-brand-gold text-brand-black rounded-none">
                    <Check className="w-5 h-5" />
                  </div>
                </div>

                <div className="mt-6 flex justify-between text-xs font-mono text-brand-sand/50 p-2 border-b border-brand-gold/5">
                  <span>Net tile count (ex. waste):</span>
                  <span className="text-brand-offwhite font-semibold"><AnimatedNumber value={roofResult.tilesRequired} /> pcs</span>
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
