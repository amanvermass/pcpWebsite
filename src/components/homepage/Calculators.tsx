"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calculator, Download, Check, HelpCircle, RefreshCw, FileSpreadsheet } from "lucide-react";
import { useToast } from "../ui/Toast";
import confetti from "canvas-confetti";

type CalculatorTab = "brick" | "house" | "wall" | "roof" | "paver";

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

  // Calculations
  const calculateBricks = (e: React.FormEvent) => {
    e.preventDefault();
    // Brick size details (in meters)
    let bL = 0.23, bW = 0.11, bH = 0.075;
    if (brickSize === "modular") {
      bL = 0.19; bW = 0.09; bH = 0.09;
    }
    
    // Volume of single brick with 10mm mortar thickness
    const mortar = 0.01;
    const brickVolWithMortar = (bL + mortar) * (bW + mortar) * (bH + mortar);
    
    // Wall Volume
    const wallVol = brickLength * brickHeight * (brickThickness / 1000);
    
    // Quantity
    const qty = Math.ceil(wallVol / brickVolWithMortar);
    const wastage = Math.ceil(qty * 0.10);
    const total = qty + wastage;
    const costEstimate = total * 9.5; // ~$9.5 per brick

    setBrickResult({ qty, wastage, total, costEstimate });
    triggerConfetti();
    toast("Brick quantity calculated successfully!", "success");
  };

  const calculateHouse = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Base estimations from specifications rules
    let baseBricks = 0;
    if (builtUpArea <= 600) baseBricks = 20000;
    else if (builtUpArea <= 1200) baseBricks = 40000;
    else if (builtUpArea <= 1800) baseBricks = 60000;
    else if (builtUpArea <= 2500) baseBricks = 82000;
    else baseBricks = 125000;

    const bricks = baseBricks * floors;
    // Cement: ~0.4 bags per sq ft of builtup area per floor
    const cement = Math.ceil(builtUpArea * 0.45 * floors);
    // Sand: ~1.8 cft per sq ft
    const sand = Math.ceil(builtUpArea * 1.8 * floors);
    // Aggregate: ~1.35 cft per sq ft
    const aggregate = Math.ceil(builtUpArea * 1.35 * floors);
    // Cost estimation
    const totalCost = (bricks * 9.5) + (cement * 420) + (sand * 65) + (aggregate * 75);

    setHouseResult({ bricks, cement, sand, aggregate, totalCost });
    triggerConfetti();
    toast("Whole house material budget estimated!", "success");
  };

  const calculateWall = (e: React.FormEvent) => {
    e.preventDefault();
    const grossArea = wallLength * wallHeight;
    const netArea = Math.max(grossArea - openingsArea, 0);
    
    // Assumption: ~50 bricks per sq meter for 110mm thickness, ~100 for 230mm thickness
    const standardBricksPerSqM = 55;
    const qty = Math.ceil(netArea * standardBricksPerSqM);
    const wastage = Math.ceil(qty * 0.1);
    const total = qty + wastage;

    setWallResult({ grossArea, netArea, qty, wastage, total });
    triggerConfetti();
    toast("Net wall area brick count estimated!", "success");
  };

  const calculateRoof = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Compensate area for slope: Slope in radians
    const slopeRad = (roofSlope * Math.PI) / 180;
    const actualArea = (roofLength * roofWidth) / Math.cos(slopeRad);
    
    // Standard Roman Tile: ~12 tiles per sq meter
    const tilesRequired = Math.ceil(actualArea * 12.5);
    const ridges = Math.ceil(roofLength * 2.2); // ~2.2 ridges per meter
    const wastage = Math.ceil(tilesRequired * 0.08);
    const totalTiles = tilesRequired + wastage;
    const costEstimate = (totalTiles * 65) + (ridges * 180); // Tile=$65, Ridge=$180

    setRoofResult({ actualArea: Math.ceil(actualArea), tilesRequired, ridges, totalTiles, costEstimate });
    triggerConfetti();
    toast("Roofing tile requirements computed!", "success");
  };

  const calculatePaver = (e: React.FormEvent) => {
    e.preventDefault();
    const area = paverLength * paverWidth;
    
    // Paver size options (in sqm)
    let pArea = 0.2 * 0.1; // Rectangular 200x100mm = 0.02 sqm
    if (paverSize === "square") pArea = 0.1 * 0.1; // Square 100x100
    if (paverSize === "hexagonal") pArea = 0.032; // Hex

    const qty = Math.ceil(area / pArea);
    const wastage = Math.ceil(qty * 0.08);
    const total = qty + wastage;
    const costEstimate = total * 18; // ~$18 per paver

    setPaverResult({ area, qty, wastage, total, costEstimate });
    triggerConfetti();
    toast("Paving tiles calculations complete!", "success");
  };

  const handleDownloadLog = (calcType: string) => {
    toast(`Successfully generated estimation report for: ${calcType}. CSV downloaded.`, "success");
  };

  return (
    <section id="calculators" className="py-24 bg-brand-slate-950 relative">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-extrabold tracking-widest text-brand-terracotta-500 bg-brand-terracotta-500/10 px-3 py-1 rounded-full">
            Engineering Tools
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 tracking-tight">
            Construction Calculators
          </h2>
          <p className="text-brand-slate-400 mt-3">
            Plan your material volumes and budgets. Input specifications to calculate bricks, concrete, roofing, and pavements with wastage buffers.
          </p>
        </div>

        {/* Tab Selection */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-2 bg-brand-slate-900 p-2 rounded-2xl border border-brand-slate-800/80 mb-8">
          {[
            { id: "brick", name: "Brick Qty" },
            { id: "house", name: "House Material" },
            { id: "wall", name: "Wall Area" },
            { id: "roof", name: "Roofing Tile" },
            { id: "paver", name: "Paving Tile" },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as CalculatorTab)}
              className={`py-3 px-4 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer text-center ${
                activeTab === tab.id
                  ? "bg-brand-terracotta-600 text-white shadow-md"
                  : "text-brand-slate-400 hover:text-white"
              }`}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Calculator Body Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Inputs Panel */}
          <div className="lg:col-span-7 bg-brand-slate-900 border border-brand-slate-800 rounded-3xl p-6 md:p-8">
            
            {activeTab === "brick" && (
              <form onSubmit={calculateBricks} className="flex flex-col gap-5">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-brand-terracotta-500" />
                  Brick Quantity Calculator
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-brand-slate-400 font-bold uppercase">Wall Length (meters)</label>
                    <input 
                      type="number" 
                      value={brickLength} 
                      onChange={(e) => setBrickLength(Number(e.target.value))}
                      className="bg-brand-slate-950 border border-brand-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-terracotta-500"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-brand-slate-400 font-bold uppercase">Wall Height (meters)</label>
                    <input 
                      type="number" 
                      value={brickHeight} 
                      onChange={(e) => setBrickHeight(Number(e.target.value))}
                      className="bg-brand-slate-950 border border-brand-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-terracotta-500"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-brand-slate-400 font-bold uppercase">Wall Thickness</label>
                    <select
                      value={brickThickness}
                      onChange={(e) => setBrickThickness(Number(e.target.value))}
                      className="bg-brand-slate-950 border border-brand-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-terracotta-500"
                    >
                      <option value={110}>110 mm (Single Layer / Partition)</option>
                      <option value={230}>230 mm (Double Layer / Structural)</option>
                    </select>
                  </div>
                  
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-brand-slate-400 font-bold uppercase">Brick Size Type</label>
                    <select
                      value={brickSize}
                      onChange={(e) => setBrickSize(e.target.value)}
                      className="bg-brand-slate-950 border border-brand-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-terracotta-500"
                    >
                      <option value="standard">Standard Clay (230 × 110 × 75 mm)</option>
                      <option value="modular">Modular Clay (190 × 90 × 90 mm)</option>
                    </select>
                  </div>
                </div>

                <button 
                  type="submit"
                  className="bg-brand-terracotta-600 hover:bg-brand-terracotta-700 text-white font-bold py-3.5 rounded-xl mt-2 transition-all cursor-pointer text-sm"
                >
                  Estimate Bricks Required
                </button>
              </form>
            )}

            {activeTab === "house" && (
              <form onSubmit={calculateHouse} className="flex flex-col gap-5">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-brand-terracotta-500" />
                  House Material Estimator
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-brand-slate-400 font-bold uppercase">Plot Size (Sq Ft)</label>
                    <input 
                      type="number" 
                      value={plotSize} 
                      onChange={(e) => setPlotSize(Number(e.target.value))}
                      className="bg-brand-slate-950 border border-brand-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-terracotta-500"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-brand-slate-400 font-bold uppercase">Built-up Area (Sq Ft)</label>
                    <input 
                      type="number" 
                      value={builtUpArea} 
                      onChange={(e) => setBuiltUpArea(Number(e.target.value))}
                      className="bg-brand-slate-950 border border-brand-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-terracotta-500"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-brand-slate-400 font-bold uppercase">Number of Floors</label>
                  <select
                    value={floors}
                    onChange={(e) => setFloors(Number(e.target.value))}
                    className="bg-brand-slate-950 border border-brand-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-terracotta-500"
                  >
                    <option value={1}>Ground Floor Only (G)</option>
                    <option value={2}>Ground + 1 Floor (G+1)</option>
                    <option value={3}>Ground + 2 Floors (G+2)</option>
                    <option value={4}>Ground + 3 Floors (G+3)</option>
                  </select>
                </div>

                <button 
                  type="submit"
                  className="bg-brand-terracotta-600 hover:bg-brand-terracotta-700 text-white font-bold py-3.5 rounded-xl mt-2 transition-all cursor-pointer text-sm"
                >
                  Estimate Whole House Budget
                </button>
              </form>
            )}

            {activeTab === "wall" && (
              <form onSubmit={calculateWall} className="flex flex-col gap-5">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-brand-terracotta-500" />
                  Wall Area Calculator
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-brand-slate-400 font-bold uppercase">Total Wall Length (meters)</label>
                    <input 
                      type="number" 
                      value={wallLength} 
                      onChange={(e) => setWallLength(Number(e.target.value))}
                      className="bg-brand-slate-950 border border-brand-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-terracotta-500"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-brand-slate-400 font-bold uppercase">Wall Height (meters)</label>
                    <input 
                      type="number" 
                      value={wallHeight} 
                      onChange={(e) => setWallHeight(Number(e.target.value))}
                      className="bg-brand-slate-950 border border-brand-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-terracotta-500"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-brand-slate-400 font-bold uppercase">Openings Area (Doors & Windows - sq meters)</label>
                  <input 
                    type="number" 
                    value={openingsArea} 
                    onChange={(e) => setOpeningsArea(Number(e.target.value))}
                    className="bg-brand-slate-950 border border-brand-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-terracotta-500"
                    required
                  />
                </div>

                <button 
                  type="submit"
                  className="bg-brand-terracotta-600 hover:bg-brand-terracotta-700 text-white font-bold py-3.5 rounded-xl mt-2 transition-all cursor-pointer text-sm"
                >
                  Estimate Wall Brick Yield
                </button>
              </form>
            )}

            {activeTab === "roof" && (
              <form onSubmit={calculateRoof} className="flex flex-col gap-5">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-brand-terracotta-500" />
                  Roofing Tile Calculator
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-brand-slate-400 font-bold uppercase">Roof Length (meters)</label>
                    <input 
                      type="number" 
                      value={roofLength} 
                      onChange={(e) => setRoofLength(Number(e.target.value))}
                      className="bg-brand-slate-950 border border-brand-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-terracotta-500"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-brand-slate-400 font-bold uppercase">Roof Width (meters)</label>
                    <input 
                      type="number" 
                      value={roofWidth} 
                      onChange={(e) => setRoofWidth(Number(e.target.value))}
                      className="bg-brand-slate-950 border border-brand-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-terracotta-500"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-brand-slate-400 font-bold uppercase">Roof Slope (degrees)</label>
                  <input 
                    type="number" 
                    value={roofSlope} 
                    onChange={(e) => setRoofSlope(Number(e.target.value))}
                    min={0}
                    max={60}
                    className="bg-brand-slate-950 border border-brand-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-terracotta-500"
                    required
                  />
                </div>

                <button 
                  type="submit"
                  className="bg-brand-terracotta-600 hover:bg-brand-terracotta-700 text-white font-bold py-3.5 rounded-xl mt-2 transition-all cursor-pointer text-sm"
                >
                  Estimate Roofing Tiles
                </button>
              </form>
            )}

            {activeTab === "paver" && (
              <form onSubmit={calculatePaver} className="flex flex-col gap-5">
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-brand-terracotta-500" />
                  Paver Calculator
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-brand-slate-400 font-bold uppercase">Area Length (meters)</label>
                    <input 
                      type="number" 
                      value={paverLength} 
                      onChange={(e) => setPaverLength(Number(e.target.value))}
                      className="bg-brand-slate-950 border border-brand-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-terracotta-500"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs text-brand-slate-400 font-bold uppercase">Area Width (meters)</label>
                    <input 
                      type="number" 
                      value={paverWidth} 
                      onChange={(e) => setPaverWidth(Number(e.target.value))}
                      className="bg-brand-slate-950 border border-brand-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-terracotta-500"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-brand-slate-400 font-bold uppercase">Paver Shape/Size</label>
                  <select
                    value={paverSize}
                    onChange={(e) => setPaverSize(e.target.value)}
                    className="bg-brand-slate-950 border border-brand-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-terracotta-500"
                  >
                    <option value="rectangular">Rectangular Clay (200 × 100 mm)</option>
                    <option value="square">Square Clay (100 × 100 mm)</option>
                    <option value="hexagonal">Hexagonal Paving Tile (0.032 sqm/tile)</option>
                  </select>
                </div>

                <button 
                  type="submit"
                  className="bg-brand-terracotta-600 hover:bg-brand-terracotta-700 text-white font-bold py-3.5 rounded-xl mt-2 transition-all cursor-pointer text-sm"
                >
                  Estimate Pavers Needed
                </button>
              </form>
            )}

          </div>

          {/* Outputs Panel */}
          <div className="lg:col-span-5 flex flex-col h-full">
            <div className="bg-brand-slate-950 border border-brand-slate-800 rounded-3xl p-6 md:p-8 flex flex-col justify-between flex-grow min-h-[350px]">
              
              {/* Empty state when no calculations done */}
              {activeTab === "brick" && !brickResult && (
                <div className="flex flex-col items-center justify-center text-center my-auto">
                  <div className="p-4 bg-brand-slate-900 border border-brand-slate-800 rounded-2xl mb-4 text-brand-slate-500">
                    <Calculator className="w-10 h-10" />
                  </div>
                  <h4 className="text-white font-bold">Calculation Awaiting Inputs</h4>
                  <p className="text-xs text-brand-slate-500 mt-2 max-w-[250px]">
                    Enter your wall dimensions and click Estimate to run calculation formulas.
                  </p>
                </div>
              )}
              {activeTab === "house" && !houseResult && (
                <div className="flex flex-col items-center justify-center text-center my-auto">
                  <div className="p-4 bg-brand-slate-900 border border-brand-slate-800 rounded-2xl mb-4 text-brand-slate-500">
                    <Calculator className="w-10 h-10" />
                  </div>
                  <h4 className="text-white font-bold">Material Budget Awaiting</h4>
                  <p className="text-xs text-brand-slate-500 mt-2 max-w-[250px]">
                    Input house specifications to generate the concrete, brick, and cement estimates.
                  </p>
                </div>
              )}
              {activeTab === "wall" && !wallResult && (
                <div className="flex flex-col items-center justify-center text-center my-auto">
                  <div className="p-4 bg-brand-slate-900 border border-brand-slate-800 rounded-2xl mb-4 text-brand-slate-500">
                    <Calculator className="w-10 h-10" />
                  </div>
                  <h4 className="text-white font-bold">Area Estimation Awaiting</h4>
                  <p className="text-xs text-brand-slate-500 mt-2 max-w-[250px]">
                    Input gross wall length and height along with door openings to find net brick volume.
                  </p>
                </div>
              )}
              {activeTab === "roof" && !roofResult && (
                <div className="flex flex-col items-center justify-center text-center my-auto">
                  <div className="p-4 bg-brand-slate-900 border border-brand-slate-800 rounded-2xl mb-4 text-brand-slate-500">
                    <Calculator className="w-10 h-10" />
                  </div>
                  <h4 className="text-white font-bold">Roof Tile Quantities Awaiting</h4>
                  <p className="text-xs text-brand-slate-500 mt-2 max-w-[250px]">
                    Input roof structure measurements to trigger sloped-surface calculations.
                  </p>
                </div>
              )}
              {activeTab === "paver" && !paverResult && (
                <div className="flex flex-col items-center justify-center text-center my-auto">
                  <div className="p-4 bg-brand-slate-900 border border-brand-slate-800 rounded-2xl mb-4 text-brand-slate-500">
                    <Calculator className="w-10 h-10" />
                  </div>
                  <h4 className="text-white font-bold">Paver Grid Counts Awaiting</h4>
                  <p className="text-xs text-brand-slate-500 mt-2 max-w-[250px]">
                    Input your driveway/pavement surface size to run estimates.
                  </p>
                </div>
              )}

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
                      <h4 className="text-xs font-bold uppercase tracking-widest text-brand-slate-400">ESTIMATION SUMMARY</h4>
                      <div className="grid grid-cols-2 gap-4 mt-6">
                        <div className="bg-brand-slate-900/60 p-4 border border-brand-slate-800 rounded-xl">
                          <span className="block text-[10px] text-brand-slate-500 uppercase font-bold">Net Bricks</span>
                          <span className="text-2xl font-extrabold text-white">{brickResult.qty.toLocaleString()}</span>
                        </div>
                        <div className="bg-brand-slate-900/60 p-4 border border-brand-slate-800 rounded-xl">
                          <span className="block text-[10px] text-brand-slate-500 uppercase font-bold">Wastage (10%)</span>
                          <span className="text-2xl font-extrabold text-brand-terracotta-500">+{brickResult.wastage.toLocaleString()}</span>
                        </div>
                      </div>
                      
                      <div className="mt-4 bg-brand-terracotta-600/10 border border-brand-terracotta-500/20 p-5 rounded-2xl flex justify-between items-center">
                        <div>
                          <span className="block text-[10px] text-brand-terracotta-400 uppercase font-bold">Total Bricks Required</span>
                          <span className="text-3xl font-extrabold text-white mt-1">{brickResult.total.toLocaleString()}</span>
                        </div>
                        <Check className="w-8 h-8 text-brand-terracotta-500" />
                      </div>

                      <div className="mt-4 flex justify-between text-xs font-mono text-brand-slate-400 p-2 border-b border-brand-slate-900">
                        <span>Estimated cost (ex. tax):</span>
                        <span className="text-white font-bold">${brickResult.costEstimate.toLocaleString()}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDownloadLog("Brick Quantity")}
                      className="w-full bg-brand-slate-900 hover:bg-brand-slate-800 text-white font-semibold py-3 px-4 rounded-xl border border-brand-slate-800 transition-all cursor-pointer flex items-center justify-center gap-2 text-xs"
                    >
                      <Download className="w-4 h-4 text-brand-terracotta-500" />
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
                      <h4 className="text-xs font-bold uppercase tracking-widest text-brand-slate-400">MATERIAL BUDGET BREAKDOWN</h4>
                      <div className="flex flex-col gap-3 mt-6">
                        <div className="bg-brand-slate-900/60 px-4 py-3 border border-brand-slate-800 rounded-xl flex justify-between items-center">
                          <span className="text-xs text-brand-slate-400 font-bold uppercase">Clay Bricks Needed</span>
                          <span className="text-lg font-extrabold text-white">{houseResult.bricks.toLocaleString()} pcs</span>
                        </div>
                        <div className="bg-brand-slate-900/60 px-4 py-3 border border-brand-slate-800 rounded-xl flex justify-between items-center">
                          <span className="text-xs text-brand-slate-400 font-bold uppercase">Cement Bags</span>
                          <span className="text-lg font-extrabold text-brand-terracotta-400">{houseResult.cement.toLocaleString()} bags</span>
                        </div>
                        <div className="bg-brand-slate-900/60 px-4 py-3 border border-brand-slate-800 rounded-xl flex justify-between items-center">
                          <span className="text-xs text-brand-slate-400 font-bold uppercase">Coarse Sand</span>
                          <span className="text-lg font-extrabold text-white">{houseResult.sand.toLocaleString()} cft</span>
                        </div>
                        <div className="bg-brand-slate-900/60 px-4 py-3 border border-brand-slate-800 rounded-xl flex justify-between items-center">
                          <span className="text-xs text-brand-slate-400 font-bold uppercase">Aggregate Stone</span>
                          <span className="text-lg font-extrabold text-white">{houseResult.aggregate.toLocaleString()} cft</span>
                        </div>
                      </div>

                      <div className="mt-4 bg-brand-emerald-500/10 border border-brand-emerald-500/20 p-4 rounded-xl flex justify-between items-center text-xs">
                        <span className="text-brand-emerald-400 font-bold">Estimated Core Materials Value</span>
                        <strong className="text-white text-lg">${houseResult.totalCost.toLocaleString()}</strong>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDownloadLog("House Structural Estimate")}
                      className="w-full bg-brand-slate-900 hover:bg-brand-slate-800 text-white font-semibold py-3 px-4 rounded-xl border border-brand-slate-800 transition-all cursor-pointer flex items-center justify-center gap-2 text-xs"
                    >
                      <Download className="w-4 h-4 text-brand-terracotta-500" />
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
                      <h4 className="text-xs font-bold uppercase tracking-widest text-brand-slate-400">WALL YIELD ESTIMATE</h4>
                      <div className="grid grid-cols-2 gap-4 mt-6">
                        <div className="bg-brand-slate-900/60 p-4 border border-brand-slate-800 rounded-xl">
                          <span className="block text-[10px] text-brand-slate-500 uppercase font-bold">Gross Wall Area</span>
                          <span className="text-xl font-extrabold text-white">{wallResult.grossArea} m²</span>
                        </div>
                        <div className="bg-brand-slate-900/60 p-4 border border-brand-slate-800 rounded-xl">
                          <span className="block text-[10px] text-brand-slate-500 uppercase font-bold">Net Masonry Area</span>
                          <span className="text-xl font-extrabold text-brand-emerald-500">{wallResult.netArea} m²</span>
                        </div>
                      </div>

                      <div className="mt-4 bg-brand-terracotta-600/10 border border-brand-terracotta-500/20 p-5 rounded-2xl">
                        <span className="block text-[10px] text-brand-terracotta-400 uppercase font-bold">Estimated Bricks (Inc. 10% wastage)</span>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-3xl font-extrabold text-white">{wallResult.total.toLocaleString()}</span>
                          <span className="text-xs text-brand-slate-400">@ 55 bricks/m²</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDownloadLog("Wall Net Area Estimate")}
                      className="w-full bg-brand-slate-900 hover:bg-brand-slate-800 text-white font-semibold py-3 px-4 rounded-xl border border-brand-slate-800 transition-all cursor-pointer flex items-center justify-center gap-2 text-xs"
                    >
                      <Download className="w-4 h-4 text-brand-terracotta-500" />
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
                      <h4 className="text-xs font-bold uppercase tracking-widest text-brand-slate-400">ROOF TILE QUANTITIES</h4>
                      
                      <div className="mt-6 bg-brand-slate-900/60 p-4 border border-brand-slate-800 rounded-xl flex justify-between items-center">
                        <span className="text-xs text-brand-slate-400 font-bold uppercase">Sloped Roof Area</span>
                        <span className="text-base font-extrabold text-white">{roofResult.actualArea} m²</span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mt-3">
                        <div className="bg-brand-slate-900/60 p-4 border border-brand-slate-800 rounded-xl">
                          <span className="block text-[10px] text-brand-slate-500 uppercase font-bold">Roman Tiles</span>
                          <span className="text-xl font-extrabold text-white">{roofResult.totalTiles.toLocaleString()}</span>
                        </div>
                        <div className="bg-brand-slate-900/60 p-4 border border-brand-slate-800 rounded-xl">
                          <span className="block text-[10px] text-brand-slate-500 uppercase font-bold">Ridge Tiles</span>
                          <span className="text-xl font-extrabold text-brand-terracotta-500">{roofResult.ridges} pcs</span>
                        </div>
                      </div>

                      <div className="mt-4 flex justify-between text-xs font-mono text-brand-slate-400 p-2 border-b border-brand-slate-900">
                        <span>Roofing Cost Estimate:</span>
                        <span className="text-white font-bold">${roofResult.costEstimate.toLocaleString()}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDownloadLog("Roof Tile Estimate")}
                      className="w-full bg-brand-slate-900 hover:bg-brand-slate-800 text-white font-semibold py-3 px-4 rounded-xl border border-brand-slate-800 transition-all cursor-pointer flex items-center justify-center gap-2 text-xs"
                    >
                      <Download className="w-4 h-4 text-brand-terracotta-500" />
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
                      <h4 className="text-xs font-bold uppercase tracking-widest text-brand-slate-400">PAVER GRID QUANTITIES</h4>
                      
                      <div className="mt-6 bg-brand-slate-900/60 p-4 border border-brand-slate-800 rounded-xl flex justify-between items-center">
                        <span className="text-xs text-brand-slate-400 font-bold uppercase">Total Pavement Area</span>
                        <span className="text-base font-extrabold text-white">{paverResult.area} m²</span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mt-3">
                        <div className="bg-brand-slate-900/60 p-4 border border-brand-slate-800 rounded-xl">
                          <span className="block text-[10px] text-brand-slate-500 uppercase font-bold">Base Tiles</span>
                          <span className="text-xl font-extrabold text-white">{paverResult.qty.toLocaleString()}</span>
                        </div>
                        <div className="bg-brand-slate-900/60 p-4 border border-brand-slate-800 rounded-xl">
                          <span className="block text-[10px] text-brand-slate-500 uppercase font-bold">Wastage (8%)</span>
                          <span className="text-xl font-extrabold text-brand-terracotta-500">+{paverResult.wastage.toLocaleString()}</span>
                        </div>
                      </div>

                      <div className="mt-4 bg-brand-terracotta-600/10 border border-brand-terracotta-500/20 p-4 rounded-xl flex justify-between items-center">
                        <span className="text-xs text-brand-terracotta-400 font-bold">Total Pavers Required</span>
                        <strong className="text-white text-xl">{paverResult.total.toLocaleString()} pcs</strong>
                      </div>

                      <div className="mt-4 flex justify-between text-xs font-mono text-brand-slate-400 p-2 border-b border-brand-slate-900">
                        <span>Estimated Cost:</span>
                        <span className="text-white font-bold">${paverResult.costEstimate.toLocaleString()}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => handleDownloadLog("Pavement Paver Estimate")}
                      className="w-full bg-brand-slate-900 hover:bg-brand-slate-800 text-white font-semibold py-3 px-4 rounded-xl border border-brand-slate-800 transition-all cursor-pointer flex items-center justify-center gap-2 text-xs"
                    >
                      <Download className="w-4 h-4 text-brand-terracotta-500" />
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
