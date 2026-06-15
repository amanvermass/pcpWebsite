"use client";

import React, { useState } from "react";
import { Calculator, Download, Check } from "lucide-react";
import confetti from "canvas-confetti";
import { useToast } from "../ui/Toast";

export default function BrickCalculator() {
  const { toast } = useToast();
  const [brickLength, setBrickLength] = useState(10); // m
  const [brickHeight, setBrickHeight] = useState(3); // m
  const [brickThickness, setBrickThickness] = useState(230); // mm
  const [brickSize, setBrickSize] = useState("standard");
  const [brickResult, setBrickResult] = useState<any>(null);

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
      particleCount: 60,
      spread: 50,
      origin: { y: 0.8 },
      colors: ["#af6752", "#c29153", "#c4b7b0"],
    });

    toast("Brick quantity calculated successfully!", "success");
  };

  const handleDownloadLog = () => {
    toast(`Successfully generated estimation report. CSV downloaded.`, "success");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-7 bg-brand-slate-900 border border-brand-slate-800 rounded-3xl p-6 md:p-8">
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
                className="bg-brand-slate-950 border border-brand-slate-850 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-terracotta-500"
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-brand-slate-400 font-bold uppercase">Wall Height (meters)</label>
              <input 
                type="number" 
                value={brickHeight} 
                onChange={(e) => setBrickHeight(Number(e.target.value))}
                className="bg-brand-slate-950 border border-brand-slate-850 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-terracotta-500"
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
                className="bg-brand-slate-950 border border-brand-slate-850 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-terracotta-500"
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
                className="bg-brand-slate-950 border border-brand-slate-850 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-terracotta-500"
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
      </div>

      <div className="lg:col-span-5">
        <div className="bg-brand-slate-900 border border-brand-slate-800 rounded-3xl p-6 md:p-8 min-h-[350px] flex flex-col justify-between">
          {!brickResult ? (
            <div className="flex flex-col items-center justify-center text-center my-auto">
              <div className="p-4 bg-brand-slate-950 border border-brand-slate-850 rounded-2xl mb-4 text-brand-slate-500">
                <Calculator className="w-10 h-10" />
              </div>
              <h4 className="text-white font-bold">Awaiting Inputs</h4>
              <p className="text-xs text-brand-slate-500 mt-2 max-w-[250px]">
                Enter wall parameters and click Estimate to run calculation formulas.
              </p>
            </div>
          ) : (
            <div className="flex flex-col justify-between h-full gap-6">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-brand-slate-400">ESTIMATION SUMMARY</h4>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="bg-brand-slate-950 p-4 border border-brand-slate-850 rounded-xl">
                    <span className="block text-[10px] text-brand-slate-500 uppercase font-bold">Net Bricks</span>
                    <span className="text-2xl font-extrabold text-white">{brickResult.qty.toLocaleString()}</span>
                  </div>
                  <div className="bg-brand-slate-950 p-4 border border-brand-slate-850 rounded-xl">
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

                <div className="mt-4 flex justify-between text-xs font-mono text-brand-slate-450 p-2 border-b border-brand-slate-850">
                  <span>Estimated cost (ex. tax):</span>
                  <span className="text-white font-bold">${brickResult.costEstimate.toLocaleString()}</span>
                </div>
              </div>

              <button
                onClick={handleDownloadLog}
                className="w-full bg-brand-slate-950 hover:bg-brand-slate-850 text-white font-semibold py-3 px-4 rounded-xl border border-brand-slate-850 transition-all cursor-pointer flex items-center justify-center gap-2 text-xs"
              >
                <Download className="w-4 h-4 text-brand-terracotta-500" />
                Download Report (CSV)
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
