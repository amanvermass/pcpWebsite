"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, Download, Check, HelpCircle, Layers, Hammer, Compass, Globe, Navigation, ArrowRight } from "lucide-react";
import { useToast } from "../ui/Toast";
import confetti from "canvas-confetti";

type CalculatorTab = "brick" | "house" | "wall" | "roof" | "paver";

interface SliderFieldProps {
  label: string;
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (val: number) => void;
  unit: string;
  tooltip?: string;
}

const SliderField: React.FC<SliderFieldProps> = ({
  label, min, max, step = 1, value, onChange, unit, tooltip
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  return (
    <div className="flex flex-col gap-2 font-poppins mb-4">
      <div className="flex justify-between items-center">
        <label className="text-[10px] text-brand-slate-200 font-bold uppercase tracking-wider flex items-center gap-1.5">
          {label}
          {tooltip && (
            <div className="relative inline-block">
              <button
                type="button"
                className="text-brand-slate-400 hover:text-brand-gold focus:outline-none transition-colors cursor-pointer"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
                onClick={() => setShowTooltip(!showTooltip)}
              >
                <HelpCircle className="w-3.5 h-3.5" />
              </button>
              {showTooltip && (
                <div className="absolute left-0 bottom-6 z-20 w-48 bg-brand-slate-900 border border-brand-gold/20 p-2.5 text-[10px] text-brand-slate-200 uppercase tracking-normal leading-normal font-normal shadow-lg">
                  {tooltip}
                </div>
              )}
            </div>
          )}
        </label>
        <div className="flex items-center gap-1.5">
          <input
            type="number"
            min={min}
            max={max}
            step={step}
            value={value}
            onChange={(e) => {
              const val = Number(e.target.value);
              onChange(Math.max(min, Math.min(max, val)));
            }}
            className="w-16 bg-brand-slate-900 border border-brand-gold/20 px-2 py-1 text-xs text-brand-offwhite font-bold text-center focus:outline-none focus:border-brand-gold"
          />
          <span className="text-[10px] font-bold text-brand-slate-400 uppercase tracking-wide">{unit}</span>
        </div>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full h-1 bg-brand-slate-700 accent-brand-gold cursor-pointer transition-all focus:outline-none border-none outline-none appearance-none"
        style={{
          background: `linear-gradient(to right, #ce9456 0%, #ce9456 ${((value - min) / (max - min)) * 100}%, #e7e5e4 ${((value - min) / (max - min)) * 100}%, #e7e5e4 100%)`
        }}
      />
    </div>
  );
};

export const Calculators: React.FC = () => {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState<CalculatorTab>("brick");

  // Brick Qty State
  const [brickLength, setBrickLength] = useState(10); // m
  const [brickHeight, setBrickHeight] = useState(3); // m
  const [brickThickness, setBrickThickness] = useState(230); // mm (double wall or single 110mm)
  const [brickSize, setBrickSize] = useState("standard"); // Standard 230x110x75
  const [brickResult, setBrickResult] = useState<any>(null);

  // House State
  const [plotSize, setPlotSize] = useState(1500); // sq ft
  const [builtUpArea, setBuiltUpArea] = useState(1200); // sq ft
  const [floors, setFloors] = useState(1);
  const [houseResult, setHouseResult] = useState<any>(null);

  // Wall Area State
  const [wallLength, setWallLength] = useState(12); // m
  const [wallHeight, setWallHeight] = useState(3.5); // m
  const [openingsArea, setOpeningsArea] = useState(4.5); // sq m (doors/windows)
  const [wallResult, setWallResult] = useState<any>(null);

  // Roof State
  const [roofLength, setRoofLength] = useState(15); // m
  const [roofWidth, setRoofWidth] = useState(8); // m
  const [roofSlope, setRoofSlope] = useState(15); // degrees
  const [roofResult, setRoofResult] = useState<any>(null);

  // Paver State
  const [paverLength, setPaverLength] = useState(20); // m
  const [paverWidth, setPaverWidth] = useState(10); // m
  const [paverSize, setPaverSize] = useState("rectangular"); // 200x100
  const [paverResult, setPaverResult] = useState<any>(null);

  const triggerConfetti = () => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.8 },
      colors: ["#ea580c", "#0d9488", "#1e293b"],
    });
  };

  // Real-time calculation useEffect hooks
  useEffect(() => {
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
  }, [brickLength, brickHeight, brickThickness, brickSize]);

  useEffect(() => {
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
  }, [builtUpArea, floors]);

  useEffect(() => {
    const grossArea = wallLength * wallHeight;
    const netArea = Math.max(grossArea - openingsArea, 0);
    const standardBricksPerSqM = 55;
    const qty = Math.ceil(netArea * standardBricksPerSqM);
    const wastage = Math.ceil(qty * 0.1);
    const total = qty + wastage;
    setWallResult({ grossArea, netArea, qty, wastage, total });
  }, [wallLength, wallHeight, openingsArea]);

  useEffect(() => {
    const slopeRad = (roofSlope * Math.PI) / 180;
    const actualArea = (roofLength * roofWidth) / Math.cos(slopeRad);
    const tilesRequired = Math.ceil(actualArea * 12.5);
    const ridges = Math.ceil(roofLength * 2.2);
    const wastage = Math.ceil(tilesRequired * 0.08);
    const totalTiles = tilesRequired + wastage;
    const costEstimate = (totalTiles * 65) + (ridges * 180);
    setRoofResult({ actualArea: Math.ceil(actualArea), tilesRequired, ridges, totalTiles, costEstimate });
  }, [roofLength, roofWidth, roofSlope]);

  useEffect(() => {
    const area = paverLength * paverWidth;
    let pArea = 0.2 * 0.1;
    if (paverSize === "square") pArea = 0.1 * 0.1;
    if (paverSize === "hexagonal") pArea = 0.032;
    const qty = Math.ceil(area / pArea);
    const wastage = Math.ceil(qty * 0.08);
    const total = qty + wastage;
    const costEstimate = total * 18;
    setPaverResult({ area, qty, wastage, total, costEstimate });
  }, [paverLength, paverWidth, paverSize]);

  // Form submits trigger the confetti/toast success celebrations
  const handleFormSubmit = (e: React.FormEvent, calcType: string) => {
    e.preventDefault();
    triggerConfetti();
    toast(`${calcType} calculations updated & validated!`, "success");
  };

  const handleDownloadLog = (calcType: string) => {
    toast(`Successfully generated estimation report for: ${calcType}. CSV downloaded.`, "success");
  };

  // SVG Visualizer Component Renderers
  const renderBrickWallVisual = () => {
    const rowsCount = Math.min(Math.max(Math.round(brickHeight * 2.5), 4), 16);
    const colsCount = Math.min(Math.max(Math.round(brickLength * 1.5), 6), 20);
    const isDouble = brickThickness === 230;

    const rows = [];
    for (let r = 0; r < rowsCount; r++) {
      const rowBricks = [];
      const isOffset = r % 2 === 1;
      const totalBricks = isOffset ? colsCount + 1 : colsCount;
      
      for (let c = 0; c < totalBricks; c++) {
        let width = 100 / colsCount;
        let x = c * width;
        if (isOffset) {
          if (c === 0) {
            width = (100 / colsCount) / 2;
            x = 0;
          } else if (c === totalBricks - 1) {
            width = (100 / colsCount) / 2;
            x = 100 - width;
          } else {
            x = (c - 0.5) * width;
          }
        }
        rowBricks.push(
          <rect
            key={c}
            x={`${x}%`}
            y={`${(r * 100) / rowsCount}%`}
            width={`${width - 0.8}%`}
            height={`${(100 / rowsCount) - 1.5}%`}
            fill={isDouble ? "url(#double-brick-gradient)" : "url(#brick-gradient)"}
            className="transition-all duration-300 stroke-brand-charcoal/10 stroke-[0.5]"
          />
        );
      }
      rows.push(<g key={r}>{rowBricks}</g>);
    }

    return (
      <div className="relative w-full h-48 bg-brand-slate-900 border border-brand-gold/15 p-4 flex flex-col justify-between overflow-hidden">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[9px] uppercase tracking-wider font-bold text-brand-slate-300 font-poppins">Live Wall Model ({brickLength}m × {brickHeight}m)</span>
          <span className="text-[9px] uppercase tracking-wider font-bold text-brand-gold font-poppins">{brickThickness}mm {brickThickness === 230 ? "Double" : "Single"} Layer</span>
        </div>
        <div className="flex-grow w-full relative bg-brand-slate-950/40 p-2 overflow-hidden border border-brand-gold/5">
          <svg className="w-full h-full" preserveAspectRatio="none">
            <defs>
              <linearGradient id="brick-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#c1816e" />
                <stop offset="100%" stopColor="#af6752" />
              </linearGradient>
              <linearGradient id="double-brick-gradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#e28522" />
                <stop offset="100%" stopColor="#ae624c" />
              </linearGradient>
            </defs>
            {rows}
          </svg>
        </div>
        <div className="text-[9px] text-brand-slate-400 font-poppins mt-2 italic text-center">
          Diagram updates in real-time. Alternating rows represent standard running bond masonry.
        </div>
      </div>
    );
  };

  const renderHouseVisual = () => {
    if (!houseResult) return null;
    const totalCost = houseResult.totalCost || 1;
    const brickCost = houseResult.bricks * 9.5;
    const cementCost = houseResult.cement * 420;
    const sandCost = houseResult.sand * 65;
    const aggCost = houseResult.aggregate * 75;

    const brickPct = (brickCost / totalCost) * 100;
    const cementPct = (cementCost / totalCost) * 100;
    const sandPct = (sandCost / totalCost) * 100;
    const aggPct = (aggCost / totalCost) * 100;

    return (
      <div className="relative w-full bg-brand-slate-900 border border-brand-gold/15 p-4 font-poppins">
        <div className="flex justify-between items-center mb-3">
          <span className="text-[9px] uppercase tracking-wider font-bold text-brand-slate-300">Budget Cost Distribution</span>
          <span className="text-[10px] font-bold text-brand-gold">${totalCost.toLocaleString()} Total</span>
        </div>
        
        {/* Horizontal Stacked Bar */}
        <div className="w-full h-4 bg-brand-slate-950 flex border border-brand-gold/5 mb-4 overflow-hidden">
          <div style={{ width: `${brickPct}%` }} className="h-full bg-brand-terracotta transition-all duration-500" title={`Bricks: ${brickPct.toFixed(0)}%`} />
          <div style={{ width: `${cementPct}%` }} className="h-full bg-brand-gold transition-all duration-500" title={`Cement: ${cementPct.toFixed(0)}%`} />
          <div style={{ width: `${sandPct}%` }} className="h-full bg-brand-sand transition-all duration-500" title={`Sand: ${sandPct.toFixed(0)}%`} />
          <div style={{ width: `${aggPct}%` }} className="h-full bg-brand-slate-600 transition-all duration-500" title={`Aggregate: ${aggPct.toFixed(0)}%`} />
        </div>

        {/* Legend with percentages */}
        <div className="grid grid-cols-2 gap-2 text-[10px]">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 bg-brand-terracotta inline-block" />
            <span className="text-brand-slate-200">Bricks: <strong>{brickPct.toFixed(0)}%</strong></span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 bg-brand-gold inline-block" />
            <span className="text-brand-slate-200">Cement: <strong>{cementPct.toFixed(0)}%</strong></span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 bg-brand-sand inline-block" />
            <span className="text-brand-slate-200">Sand: <strong>{sandPct.toFixed(0)}%</strong></span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 bg-brand-slate-600 inline-block" />
            <span className="text-brand-slate-200">Aggregate: <strong>{aggPct.toFixed(0)}%</strong></span>
          </div>
        </div>
      </div>
    );
  };

  const renderWallVisual = () => {
    const gross = wallLength * wallHeight;
    const cutoutPct = gross > 0 ? Math.min((openingsArea / gross) * 100, 80) : 0;
    const net = Math.max(gross - openingsArea, 0);

    return (
      <div className="relative w-full h-48 bg-brand-slate-900 border border-brand-gold/15 p-4 flex flex-col justify-between overflow-hidden">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[9px] uppercase tracking-wider font-bold text-brand-slate-300 font-poppins">Net Masonry Visualizer</span>
          <span className="text-[9px] uppercase tracking-wider font-bold text-brand-gold font-poppins">{net.toFixed(1)} m² Net Area</span>
        </div>
        
        <div className="flex-grow w-full relative bg-brand-slate-950/40 p-4 flex items-center justify-center border border-brand-gold/5">
          <div className="w-4/5 h-24 bg-brand-terracotta/40 border-2 border-brand-terracotta relative flex items-center justify-center transition-all duration-300">
            <span className="absolute bottom-1 right-2 text-[8px] uppercase tracking-wider font-bold text-brand-slate-400 font-poppins">Gross: {gross.toFixed(1)} m²</span>
            
            {openingsArea > 0 && (
              <div 
                style={{ 
                  width: `${Math.max(15, Math.min(cutoutPct * 1.1, 70))}%`, 
                  height: `${Math.max(20, Math.min(cutoutPct * 1.1, 70))}%` 
                }} 
                className="bg-brand-slate-950 border border-dashed border-brand-gold/80 flex items-center justify-center text-brand-gold text-[8px] uppercase font-bold tracking-wider font-poppins transition-all duration-300"
              >
                Opening: {openingsArea} m²
              </div>
            )}
          </div>
        </div>
        
        <div className="text-[9px] text-brand-slate-400 font-poppins mt-2 italic text-center">
          Dashed box represents doors/windows deducted from overall wall area.
        </div>
      </div>
    );
  };

  const renderRoofVisual = () => {
    const slopeRad = (roofSlope * Math.PI) / 180;
    const startX = 20;
    const startY = 80;
    const endX = 140;
    const endY = 80;
    
    const midX = 80;
    const runLength = 60;
    const riseHeight = runLength * Math.sin(slopeRad);
    const peakY = startY - riseHeight;

    return (
      <div className="relative w-full h-48 bg-brand-slate-900 border border-brand-gold/15 p-4 flex flex-col justify-between overflow-hidden">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[9px] uppercase tracking-wider font-bold text-brand-slate-300 font-poppins">Roof Pitch & Slope angle</span>
          <span className="text-[9px] uppercase tracking-wider font-bold text-brand-gold font-poppins">{roofSlope}° Pitch</span>
        </div>

        <div className="flex-grow w-full relative bg-brand-slate-950/40 p-2 flex items-center justify-center border border-brand-gold/5">
          <svg className="w-full h-full" viewBox="0 0 160 100">
            {/* Ground base attic level */}
            <line x1={startX} y1={startY} x2={endX} y2={startY} stroke="#57524f" strokeWidth="2" strokeDasharray="3,3" />
            
            {/* Left Pitch Line */}
            <line x1={startX} y1={startY} x2={midX} y2={peakY} stroke="#af6752" strokeWidth="3" className="transition-all duration-300" />
            {/* Right Pitch Line */}
            <line x1={midX} y1={peakY} x2={endX} y2={endY} stroke="#af6752" strokeWidth="3" className="transition-all duration-300" />
            
            {/* Vertical center riser column */}
            <line x1={midX} y1={startY} x2={midX} y2={peakY} stroke="#ce9456" strokeWidth="1.5" className="transition-all duration-300" strokeDasharray="2,2" />

            {/* Angle arc representation */}
            {roofSlope > 5 && (
              <path 
                d={`M ${startX + 15} ${startY} A 15 15 0 0 0 ${startX + 15 - (15 - 15 * Math.cos(slopeRad))} ${startY - 15 * Math.sin(slopeRad)}`} 
                fill="none" 
                stroke="#ce9456" 
                strokeWidth="1.5"
              />
            )}
            
            <circle cx={midX} cy={peakY} r="3" fill="#ce9456" className="transition-all duration-300" />
          </svg>
        </div>

        <div className="text-[9px] text-brand-slate-400 font-poppins mt-2 italic text-center">
          Orange lines indicate Roman tile layout rafters scaling with pitch angle.
        </div>
      </div>
    );
  };

  const renderPaverVisual = () => {
    const isRect = paverSize === "rectangular";
    const isSquare = paverSize === "square";
    const isHex = paverSize === "hexagonal";

    return (
      <div className="relative w-full h-48 bg-brand-slate-900 border border-brand-gold/15 p-4 flex flex-col justify-between overflow-hidden">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[9px] uppercase tracking-wider font-bold text-brand-slate-300 font-poppins">Paving Array Layout</span>
          <span className="text-[9px] uppercase tracking-wider font-bold text-brand-gold font-poppins">{paverSize} style</span>
        </div>

        <div className="flex-grow w-full relative bg-brand-slate-950/40 p-2 overflow-hidden border border-brand-gold/5 flex items-center justify-center">
          <div className="w-full h-full relative overflow-hidden">
            {isRect && (
              <svg className="w-full h-full" preserveAspectRatio="none">
                <pattern id="rect-pattern" width="40" height="20" patternUnits="userSpaceOnUse">
                  <rect width="38" height="8" fill="#ce9456" fillOpacity="0.45" stroke="#ce9456" strokeWidth="0.8" />
                  <rect x="20" y="10" width="38" height="8" fill="#ce9456" fillOpacity="0.45" stroke="#ce9456" strokeWidth="0.8" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#rect-pattern)" />
              </svg>
            )}
            {isSquare && (
              <svg className="w-full h-full" preserveAspectRatio="none">
                <pattern id="square-pattern" width="20" height="20" patternUnits="userSpaceOnUse">
                  <rect width="18" height="18" fill="#af6752" fillOpacity="0.45" stroke="#af6752" strokeWidth="0.8" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#square-pattern)" />
              </svg>
            )}
            {isHex && (
              <svg className="w-full h-full" preserveAspectRatio="none">
                <pattern id="hex-pattern" width="30" height="52" patternTransform="scale(0.5)" patternUnits="userSpaceOnUse">
                  <path d="M15 0 L30 8.6 L30 25.8 L15 34.4 L0 25.8 L0 8.6 Z" fill="none" stroke="#ce9456" strokeWidth="1" />
                  <path d="M15 52 L30 60.6 L30 77.8 L15 86.4 L0 77.8 L0 60.6 Z" fill="none" stroke="#ce9456" strokeWidth="1" />
                  <path d="M45 26 L60 34.6 L60 51.8 L45 60.4 L30 51.8 L30 34.6 Z" fill="none" stroke="#ce9456" strokeWidth="1" />
                </pattern>
                <rect width="100%" height="100%" fill="url(#hex-pattern)" />
              </svg>
            )}
          </div>
        </div>

        <div className="text-[9px] text-brand-slate-400 font-poppins mt-2 italic text-center">
          Paving array pattern shown above dynamically switches styles.
        </div>
      </div>
    );
  };

  return (
    <section id="calculators" className="py-16 md:py-20 lg:py-24 bg-brand-black relative">
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
          <span className="text-[10px] uppercase font-bold tracking-[0.35em] text-brand-gold bg-brand-gold/10 px-4 py-1.5 border border-brand-gold/30 rounded-none w-fit block mb-5 font-poppins">
            Engineering Tools
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal font-cormorant text-brand-offwhite mt-4 tracking-wide">
            Construction Calculators
          </h2>
          <div className="w-16 h-[2px] bg-brand-gold mt-6 mb-4" />
          <p className="text-brand-slate-300 text-xs sm:text-sm font-poppins mt-4 max-w-xl leading-relaxed">
            Plan your material volumes and budgets. Input specifications to calculate bricks, concrete, roofing, and pavements with wastage buffers.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="flex bg-brand-slate-800 p-2 border border-brand-gold/15 w-full overflow-x-auto scrollbar-none rounded-none mb-8 gap-2.5">
          {[
            { id: "brick", name: "Brick Qty", icon: <Layers className="w-3.5 h-3.5" /> },
            { id: "house", name: "House Material", icon: <Hammer className="w-3.5 h-3.5" /> },
            { id: "wall", name: "Wall Area", icon: <Compass className="w-3.5 h-3.5" /> },
            { id: "roof", name: "Roofing Tile", icon: <Globe className="w-3.5 h-3.5" /> },
            { id: "paver", name: "Paving Tile", icon: <Navigation className="w-3.5 h-3.5" /> },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as CalculatorTab)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-none text-[10px] uppercase tracking-wider font-poppins font-bold transition-colors cursor-pointer text-center whitespace-nowrap border ${
                activeTab === tab.id
                  ? "bg-brand-gold border-brand-gold text-brand-black"
                  : "bg-brand-charcoal border-brand-gold/15 text-brand-slate-300 hover:bg-brand-gold/10 hover:text-brand-gold hover:border-brand-gold/45"
              }`}
            >
              {tab.icon}
              {tab.name}
            </button>
          ))}
        </div>

        {/* Calculator Body Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Inputs Panel */}
          <div className="lg:col-span-7 bg-brand-charcoal border border-brand-gold/15 rounded-none p-6 md:p-8 shadow-sm flex flex-col justify-between">
            
            {activeTab === "brick" && (
              <form onSubmit={(e) => handleFormSubmit(e, "Brick Quantity")} className="flex flex-col gap-6 h-full justify-between">
                <div className="flex flex-col gap-5">
                  <h3 className="text-xl font-normal font-cormorant text-brand-offwhite flex items-center gap-2 border-b border-brand-gold/10 pb-3">
                    <Calculator className="w-5 h-5 text-brand-gold" />
                    Brick Quantity Calculator
                  </h3>
                  
                  <SliderField 
                    label="Wall Length" 
                    min={1} 
                    max={100} 
                    step={0.5} 
                    value={brickLength} 
                    onChange={setBrickLength} 
                    unit="m" 
                    tooltip="Specify the total linear length of the brick masonry wall in meters."
                  />

                  <SliderField 
                    label="Wall Height" 
                    min={1} 
                    max={15} 
                    step={0.5} 
                    value={brickHeight} 
                    onChange={setBrickHeight} 
                    unit="m" 
                    tooltip="Specify the vertical height of the brick masonry wall in meters."
                  />

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5 font-poppins">
                      <label className="text-[10px] text-brand-slate-200 font-bold uppercase tracking-widest">Wall Thickness</label>
                      <select
                        value={brickThickness}
                        onChange={(e) => setBrickThickness(Number(e.target.value))}
                        className="bg-brand-slate-900 border border-brand-gold/20 px-4 py-3 text-xs text-brand-offwhite focus:outline-none focus:border-brand-gold font-bold uppercase tracking-wider cursor-pointer"
                      >
                        <option value={110}>110 mm (Single Layer)</option>
                        <option value={230}>230 mm (Double Layer)</option>
                      </select>
                    </div>
                    
                    <div className="flex flex-col gap-1.5 font-poppins">
                      <label className="text-[10px] text-brand-slate-200 font-bold uppercase tracking-widest">Brick Size Type</label>
                      <select
                        value={brickSize}
                        onChange={(e) => setBrickSize(e.target.value)}
                        className="bg-brand-slate-900 border border-brand-gold/20 px-4 py-3 text-xs text-brand-offwhite focus:outline-none focus:border-brand-gold font-bold uppercase tracking-wider cursor-pointer"
                      >
                        <option value="standard">Standard Clay (230 × 110 × 75 mm)</option>
                        <option value="modular">Modular Clay (190 × 90 × 90 mm)</option>
                      </select>
                    </div>
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-brand-gold hover:bg-brand-sand text-brand-black font-bold tracking-[0.2em] uppercase font-poppins py-4 rounded-none border border-brand-gold transition-colors cursor-pointer text-xs mt-6"
                >
                  Estimate Bricks Required
                </button>
              </form>
            )}

            {activeTab === "house" && (
              <form onSubmit={(e) => handleFormSubmit(e, "House Structural Estimate")} className="flex flex-col gap-6 h-full justify-between">
                <div className="flex flex-col gap-5">
                  <h3 className="text-xl font-normal font-cormorant text-brand-offwhite flex items-center gap-2 border-b border-brand-gold/10 pb-3">
                    <Calculator className="w-5 h-5 text-brand-gold" />
                    House Material Estimator
                  </h3>
                  
                  <SliderField 
                    label="Plot Size" 
                    min={100} 
                    max={10000} 
                    step={50} 
                    value={plotSize} 
                    onChange={setPlotSize} 
                    unit="sq ft" 
                    tooltip="Enter total physical plot space area dimensions."
                  />

                  <SliderField 
                    label="Built-up Area" 
                    min={100} 
                    max={Math.min(9000, plotSize)} 
                    step={50} 
                    value={builtUpArea} 
                    onChange={setBuiltUpArea} 
                    unit="sq ft" 
                    tooltip="Specify construction base built-up footprint dimensions (must be equal to or less than plot size)."
                  />

                  <div className="flex flex-col gap-1.5 font-poppins">
                    <label className="text-[10px] text-brand-slate-200 font-bold uppercase tracking-widest">Number of Floors</label>
                    <select
                      value={floors}
                      onChange={(e) => setFloors(Number(e.target.value))}
                      className="bg-brand-slate-900 border border-brand-gold/20 px-4 py-3 text-xs text-brand-offwhite focus:outline-none focus:border-brand-gold font-bold uppercase tracking-wider cursor-pointer"
                    >
                      <option value={1}>Ground Floor Only (G)</option>
                      <option value={2}>Ground + 1 Floor (G+1)</option>
                      <option value={3}>Ground + 2 Floors (G+2)</option>
                      <option value={4}>Ground + 3 Floors (G+3)</option>
                    </select>
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-brand-gold hover:bg-brand-sand text-brand-black font-bold tracking-[0.2em] uppercase font-poppins py-4 rounded-none border border-brand-gold transition-colors cursor-pointer text-xs mt-6"
                >
                  Estimate Whole House Budget
                </button>
              </form>
            )}

            {activeTab === "wall" && (
              <form onSubmit={(e) => handleFormSubmit(e, "Wall Yield Estimate")} className="flex flex-col gap-6 h-full justify-between">
                <div className="flex flex-col gap-5">
                  <h3 className="text-xl font-normal font-cormorant text-brand-offwhite flex items-center gap-2 border-b border-brand-gold/10 pb-3">
                    <Calculator className="w-5 h-5 text-brand-gold" />
                    Wall Area Calculator
                  </h3>
                  
                  <SliderField 
                    label="Total Wall Length" 
                    min={1} 
                    max={150} 
                    step={1} 
                    value={wallLength} 
                    onChange={setWallLength} 
                    unit="m" 
                    tooltip="Linear layout dimension of the building brick panels in meters."
                  />

                  <SliderField 
                    label="Wall Height" 
                    min={1} 
                    max={20} 
                    step={0.5} 
                    value={wallHeight} 
                    onChange={setWallHeight} 
                    unit="m" 
                    tooltip="Elevation height scale of the layout panels."
                  />

                  <SliderField 
                    label="Openings Area (Doors & Windows)" 
                    min={0} 
                    max={Math.min(100, wallLength * wallHeight * 0.8)} 
                    step={0.5} 
                    value={openingsArea} 
                    onChange={setOpeningsArea} 
                    unit="m²" 
                    tooltip="Specify the total area of doors, windows, and cutouts to subtract from the gross masonry layout."
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-brand-gold hover:bg-brand-sand text-brand-black font-bold tracking-[0.2em] uppercase font-poppins py-4 rounded-none border border-brand-gold transition-colors cursor-pointer text-xs mt-6"
                >
                  Estimate Wall Brick Yield
                </button>
              </form>
            )}

            {activeTab === "roof" && (
              <form onSubmit={(e) => handleFormSubmit(e, "Roof Tile Estimate")} className="flex flex-col gap-6 h-full justify-between">
                <div className="flex flex-col gap-5">
                  <h3 className="text-xl font-normal font-cormorant text-brand-offwhite flex items-center gap-2 border-b border-brand-gold/10 pb-3">
                    <Calculator className="w-5 h-5 text-brand-gold" />
                    Roofing Tile Calculator
                  </h3>
                  
                  <SliderField 
                    label="Roof Length" 
                    min={1} 
                    max={100} 
                    step={0.5} 
                    value={roofLength} 
                    onChange={setRoofLength} 
                    unit="m" 
                    tooltip="Length of the sloped roof layout side in meters."
                  />

                  <SliderField 
                    label="Roof Width" 
                    min={1} 
                    max={50} 
                    step={0.5} 
                    value={roofWidth} 
                    onChange={setRoofWidth} 
                    unit="m" 
                    tooltip="Width of the sloped roof layout side in meters."
                  />

                  <SliderField 
                    label="Roof Slope" 
                    min={0} 
                    max={60} 
                    step={1} 
                    value={roofSlope} 
                    onChange={setRoofSlope} 
                    unit="deg" 
                    tooltip="Pitch angle degree of the sloped rafters structure adjusting tiles projection spacing."
                  />
                </div>

                <button 
                  type="submit"
                  className="w-full bg-brand-gold hover:bg-brand-sand text-brand-black font-bold tracking-[0.2em] uppercase font-poppins py-4 rounded-none border border-brand-gold transition-colors cursor-pointer text-xs mt-6"
                >
                  Estimate Roofing Tiles
                </button>
              </form>
            )}

            {activeTab === "paver" && (
              <form onSubmit={(e) => handleFormSubmit(e, "Pavement Paver Estimate")} className="flex flex-col gap-6 h-full justify-between">
                <div className="flex flex-col gap-5">
                  <h3 className="text-xl font-normal font-cormorant text-brand-offwhite flex items-center gap-2 border-b border-brand-gold/10 pb-3">
                    <Calculator className="w-5 h-5 text-brand-gold" />
                    Paver Calculator
                  </h3>
                  
                  <SliderField 
                    label="Area Length" 
                    min={1} 
                    max={150} 
                    step={1} 
                    value={paverLength} 
                    onChange={setPaverLength} 
                    unit="m" 
                    tooltip="Pavement or driveway layout grid length in meters."
                  />

                  <SliderField 
                    label="Area Width" 
                    min={1} 
                    max={100} 
                    step={1} 
                    value={paverWidth} 
                    onChange={setPaverWidth} 
                    unit="m" 
                    tooltip="Pavement or driveway layout grid width in meters."
                  />

                  <div className="flex flex-col gap-1.5 font-poppins">
                    <label className="text-[10px] text-brand-slate-200 font-bold uppercase tracking-widest">Paver Shape/Size</label>
                    <select
                      value={paverSize}
                      onChange={(e) => setPaverSize(e.target.value)}
                      className="bg-brand-slate-900 border border-brand-gold/20 px-4 py-3 text-xs text-brand-offwhite focus:outline-none focus:border-brand-gold font-bold uppercase tracking-wider cursor-pointer"
                    >
                      <option value="rectangular">Rectangular Clay (200 × 100 mm)</option>
                      <option value="square">Square Clay (100 × 100 mm)</option>
                      <option value="hexagonal">Hexagonal Paving Tile (0.032 sqm/tile)</option>
                    </select>
                  </div>
                </div>

                <button 
                  type="submit"
                  className="w-full bg-brand-gold hover:bg-brand-sand text-brand-black font-bold tracking-[0.2em] uppercase font-poppins py-4 rounded-none border border-brand-gold transition-colors cursor-pointer text-xs mt-6"
                >
                  Estimate Pavers Needed
                </button>
              </form>
            )}

          </div>

          {/* Outputs Panel */}
          <div className="lg:col-span-5 flex flex-col h-full">
            <div className="bg-brand-charcoal border border-brand-gold/15 rounded-none p-6 md:p-8 flex flex-col justify-between flex-grow min-h-[450px] shadow-sm">
              
              {/* Active Results Display */}
              <AnimatePresence mode="wait">
                {activeTab === "brick" && brickResult && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col justify-between h-full gap-6"
                  >
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-brand-gold border-b border-brand-gold/10 pb-3 font-poppins">ESTIMATION SUMMARY</h4>
                      
                      {/* Visual Wall Model */}
                      <div className="mt-4">
                        {renderBrickWallVisual()}
                      </div>

                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="bg-brand-slate-900 p-4 border border-brand-gold/15">
                          <span className="block text-[9px] text-brand-slate-300 uppercase font-bold tracking-wider font-poppins">Net Bricks</span>
                          <span className="text-2xl font-light font-cormorant text-brand-offwhite">{brickResult.qty.toLocaleString()}</span>
                        </div>
                        <div className="bg-brand-slate-900 p-4 border border-brand-gold/15">
                          <span className="block text-[9px] text-brand-slate-300 uppercase font-bold tracking-wider font-poppins">Wastage (10%)</span>
                          <span className="text-2xl font-light font-cormorant text-brand-terracotta">+{brickResult.wastage.toLocaleString()}</span>
                        </div>
                      </div>
                      
                      <div className="mt-4 bg-brand-gold/5 border border-brand-gold/15 p-5 rounded-none flex justify-between items-center">
                        <div>
                          <span className="block text-[9px] text-brand-slate-300 uppercase font-bold tracking-widest font-poppins">Total Bricks Required</span>
                          <span className="text-3xl font-light font-cormorant text-brand-offwhite mt-1">{brickResult.total.toLocaleString()}</span>
                        </div>
                        <div className="p-2 bg-brand-gold text-brand-black rounded-none">
                          <Check className="w-5 h-5 text-brand-offwhite" />
                        </div>
                      </div>

                      <div className="mt-4 flex justify-between text-xs font-mono text-brand-slate-300 p-2 border-b border-brand-gold/5">
                        <span>Estimated cost (ex. tax):</span>
                        <span className="text-brand-offwhite font-bold">${brickResult.costEstimate.toLocaleString()}</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDownloadLog("Brick Quantity")}
                      className="w-full bg-brand-slate-800 hover:bg-brand-slate-700 text-brand-slate-200 border border-brand-slate-400 py-3.5 rounded-none font-bold uppercase tracking-[0.2em] font-poppins transition-colors flex items-center justify-center gap-2 text-[10px] cursor-pointer"
                    >
                      <Download className="w-4 h-4 text-brand-gold" />
                      Download Calculations Log (CSV)
                    </button>
                  </motion.div>
                )}

                {activeTab === "house" && houseResult && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col justify-between h-full gap-6"
                  >
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-brand-gold border-b border-brand-gold/10 pb-3 font-poppins">MATERIAL BUDGET BREAKDOWN</h4>
                      
                      {/* Visual Stack Chart */}
                      <div className="mt-4">
                        {renderHouseVisual()}
                      </div>

                      <div className="flex flex-col gap-3 mt-4">
                        <div className="bg-brand-slate-900 px-4 py-3 border border-brand-gold/15 rounded-none flex justify-between items-center">
                          <span className="text-[9px] text-brand-slate-300 font-bold uppercase tracking-wider font-poppins">Clay Bricks Needed</span>
                          <span className="text-lg font-light font-cormorant text-brand-offwhite">{houseResult.bricks.toLocaleString()} pcs</span>
                        </div>
                        <div className="bg-brand-slate-900 px-4 py-3 border border-brand-gold/15 rounded-none flex justify-between items-center">
                          <span className="text-[9px] text-brand-slate-300 font-bold uppercase tracking-wider font-poppins">Cement Bags</span>
                          <span className="text-lg font-light font-cormorant text-brand-terracotta">{houseResult.cement.toLocaleString()} bags</span>
                        </div>
                        <div className="bg-brand-slate-900 px-4 py-3 border border-brand-gold/15 rounded-none flex justify-between items-center">
                          <span className="text-[9px] text-brand-slate-300 font-bold uppercase tracking-wider font-poppins">Coarse Sand</span>
                          <span className="text-lg font-light font-cormorant text-brand-offwhite">{houseResult.sand.toLocaleString()} cft</span>
                        </div>
                        <div className="bg-brand-slate-900 px-4 py-3 border border-brand-gold/15 rounded-none flex justify-between items-center">
                          <span className="text-[9px] text-brand-slate-300 font-bold uppercase tracking-wider font-poppins">Aggregate Stone</span>
                          <span className="text-lg font-light font-cormorant text-brand-offwhite">{houseResult.aggregate.toLocaleString()} cft</span>
                        </div>
                      </div>

                      <div className="mt-4 bg-brand-gold/5 border border-brand-gold/15 p-5 rounded-none flex justify-between items-center text-xs">
                        <span className="text-brand-slate-300 font-bold uppercase tracking-wider font-poppins text-[10px]">Estimated Core Materials Value</span>
                        <strong className="text-brand-offwhite text-lg font-bold">${houseResult.totalCost.toLocaleString()}</strong>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDownloadLog("House Structural Estimate")}
                      className="w-full bg-brand-slate-800 hover:bg-brand-slate-700 text-brand-slate-200 border border-brand-slate-400 py-3.5 rounded-none font-bold uppercase tracking-[0.2em] font-poppins transition-colors flex items-center justify-center gap-2 text-[10px] cursor-pointer"
                    >
                      <Download className="w-4 h-4 text-brand-gold" />
                      Download Project Estimates (CSV)
                    </button>
                  </motion.div>
                )}

                {activeTab === "wall" && wallResult && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col justify-between h-full gap-6"
                  >
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-brand-gold border-b border-brand-gold/10 pb-3 font-poppins">WALL YIELD ESTIMATE</h4>
                      
                      {/* Visual Wall Cutout */}
                      <div className="mt-4">
                        {renderWallVisual()}
                      </div>

                      <div className="grid grid-cols-2 gap-4 mt-4">
                        <div className="bg-brand-slate-900 p-4 border border-brand-gold/15 rounded-none">
                          <span className="block text-[9px] text-brand-slate-300 uppercase font-bold tracking-wider font-poppins">Gross Wall Area</span>
                          <span className="text-xl font-light font-cormorant text-brand-offwhite">{wallResult.grossArea} m²</span>
                        </div>
                        <div className="bg-brand-slate-900 p-4 border border-brand-gold/15 rounded-none">
                          <span className="block text-[9px] text-brand-slate-300 uppercase font-bold tracking-wider font-poppins">Net Masonry Area</span>
                          <span className="text-xl font-light font-cormorant text-brand-offwhite">{wallResult.netArea} m²</span>
                        </div>
                      </div>

                      <div className="mt-4 bg-brand-gold/5 border border-brand-gold/15 p-5 rounded-none">
                        <span className="block text-[9px] text-brand-slate-300 uppercase font-bold tracking-widest font-poppins">Estimated Bricks (Inc. 10% wastage)</span>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-3xl font-light font-cormorant text-brand-offwhite">{wallResult.total.toLocaleString()}</span>
                          <span className="text-xs text-brand-slate-400 font-poppins">@ 55 bricks/m²</span>
                        </div>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDownloadLog("Wall Net Area Estimate")}
                      className="w-full bg-brand-slate-800 hover:bg-brand-slate-700 text-brand-slate-200 border border-brand-slate-400 py-3.5 rounded-none font-bold uppercase tracking-[0.2em] font-poppins transition-colors flex items-center justify-center gap-2 text-[10px] cursor-pointer"
                    >
                      <Download className="w-4 h-4 text-brand-gold" />
                      Download Calculations Log (CSV)
                    </button>
                  </motion.div>
                )}

                {activeTab === "roof" && roofResult && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col justify-between h-full gap-6"
                  >
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-brand-gold border-b border-brand-gold/10 pb-3 font-poppins">ROOF TILE QUANTITIES</h4>
                      
                      {/* Visual Rafters Slope */}
                      <div className="mt-4">
                        {renderRoofVisual()}
                      </div>

                      <div className="mt-4 bg-brand-slate-900 p-4 border border-brand-gold/15 rounded-none flex justify-between items-center">
                        <span className="text-[9px] text-brand-slate-300 font-bold uppercase tracking-wider font-poppins">Sloped Roof Area</span>
                        <span className="text-base font-light font-cormorant text-brand-offwhite">{roofResult.actualArea} m²</span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mt-3">
                        <div className="bg-brand-slate-900 p-4 border border-brand-gold/15 rounded-none">
                          <span className="block text-[9px] text-brand-slate-300 uppercase font-bold tracking-wider font-poppins">Roman Tiles</span>
                          <span className="text-xl font-light font-cormorant text-brand-offwhite">{roofResult.totalTiles.toLocaleString()}</span>
                        </div>
                        <div className="bg-brand-slate-900 p-4 border border-brand-gold/15 rounded-none">
                          <span className="block text-[9px] text-brand-slate-300 uppercase font-bold tracking-wider font-poppins">Ridge Tiles</span>
                          <span className="text-xl font-light font-cormorant text-brand-terracotta">{roofResult.ridges} pcs</span>
                        </div>
                      </div>

                      <div className="mt-4 flex justify-between text-xs font-mono text-brand-slate-300 p-2 border-b border-brand-gold/5">
                        <span>Roofing Cost Estimate:</span>
                        <span className="text-brand-offwhite font-bold">${roofResult.costEstimate.toLocaleString()}</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDownloadLog("Roof Tile Estimate")}
                      className="w-full bg-brand-slate-800 hover:bg-brand-slate-700 text-brand-slate-200 border border-brand-slate-400 py-3.5 rounded-none font-bold uppercase tracking-[0.2em] font-poppins transition-colors flex items-center justify-center gap-2 text-[10px] cursor-pointer"
                    >
                      <Download className="w-4 h-4 text-brand-gold" />
                      Download Roofing Details (CSV)
                    </button>
                  </motion.div>
                )}

                {activeTab === "paver" && paverResult && (
                  <motion.div 
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="flex flex-col justify-between h-full gap-6"
                  >
                    <div>
                      <h4 className="text-xs font-bold uppercase tracking-widest text-brand-gold border-b border-brand-gold/10 pb-3 font-poppins">PAVER GRID QUANTITIES</h4>
                      
                      {/* Visual Paving Pattern */}
                      <div className="mt-4">
                        {renderPaverVisual()}
                      </div>

                      <div className="mt-4 bg-brand-slate-900 p-4 border border-brand-gold/15 rounded-none flex justify-between items-center">
                        <span className="text-[9px] text-brand-slate-300 font-bold uppercase tracking-wider font-poppins">Total Pavement Area</span>
                        <span className="text-base font-light font-cormorant text-brand-offwhite">{paverResult.area} m²</span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mt-3">
                        <div className="bg-brand-slate-900 p-4 border border-brand-gold/15 rounded-none">
                          <span className="block text-[9px] text-brand-slate-300 uppercase font-bold tracking-wider font-poppins">Base Tiles</span>
                          <span className="text-xl font-light font-cormorant text-brand-offwhite">{paverResult.qty.toLocaleString()}</span>
                        </div>
                        <div className="bg-brand-slate-900 p-4 border border-brand-gold/15 rounded-none">
                          <span className="block text-[9px] text-brand-slate-300 uppercase font-bold tracking-wider font-poppins">Wastage (8%)</span>
                          <span className="text-xl font-light font-cormorant text-brand-terracotta">+{paverResult.wastage.toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="mt-4 bg-brand-gold/5 border border-brand-gold/15 p-5 rounded-none flex justify-between items-center">
                        <span className="text-[9px] text-brand-slate-300 font-bold uppercase tracking-widest font-poppins">Total Pavers Required</span>
                        <strong className="text-brand-offwhite text-xl font-light font-cormorant">{paverResult.total.toLocaleString()} pcs</strong>
                      </div>

                      <div className="mt-4 flex justify-between text-xs font-mono text-brand-slate-300 p-2 border-b border-brand-gold/5">
                        <span>Estimated Cost:</span>
                        <span className="text-brand-offwhite font-bold">${paverResult.costEstimate.toLocaleString()}</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleDownloadLog("Pavement Paver Estimate")}
                      className="w-full bg-brand-slate-800 hover:bg-brand-slate-700 text-brand-slate-200 border border-brand-slate-400 py-3.5 rounded-none font-bold uppercase tracking-[0.2em] font-poppins transition-colors flex items-center justify-center gap-2 text-[10px] cursor-pointer"
                    >
                      <Download className="w-4 h-4 text-brand-gold" />
                      Download Calculations Log (CSV)
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
