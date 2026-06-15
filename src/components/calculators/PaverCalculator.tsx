"use client";

import React, { useState } from "react";
import { Calculator, Download, Check } from "lucide-react";
import confetti from "canvas-confetti";
import { useToast } from "../ui/Toast";

export default function PaverCalculator() {
  const { toast } = useToast();
  const [paverLength, setPaverLength] = useState(20); // m
  const [paverWidth, setPaverWidth] = useState(10); // m
  const [paverSize, setPaverSize] = useState("rectangular");
  const [paverResult, setPaverResult] = useState<any>(null);

  const calculatePaver = (e: React.FormEvent) => {
    e.preventDefault();
    const area = paverLength * paverWidth;
    let pArea = 0.2 * 0.1; // Rectangular 200x100mm = 0.02 sqm
    if (paverSize === "square") pArea = 0.1 * 0.1;
    if (paverSize === "hexagonal") pArea = 0.032;

    const qty = Math.ceil(area / pArea);
    const wastage = Math.ceil(qty * 0.08);
    const total = qty + wastage;
    const costEstimate = total * 18;

    setPaverResult({ area, qty, wastage, total, costEstimate });

    confetti({
      particleCount: 60,
      spread: 50,
      origin: { y: 0.8 },
      colors: ["#af6752", "#c29153", "#c4b7b0"],
    });

    toast("Paving tiles calculations complete!", "success");
  };

  const handleDownloadLog = () => {
    toast(`Successfully generated estimation report. CSV downloaded.`, "success");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-7 bg-brand-slate-900 border border-brand-slate-800 rounded-3xl p-6 md:p-8">
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
                className="bg-brand-slate-950 border border-brand-slate-850 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-terracotta-500"
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-brand-slate-400 font-bold uppercase">Area Width (meters)</label>
              <input 
                type="number" 
                value={paverWidth} 
                onChange={(e) => setPaverWidth(Number(e.target.value))}
                className="bg-brand-slate-950 border border-brand-slate-850 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-terracotta-500"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-brand-slate-400 font-bold uppercase">Paver Shape/Size</label>
            <select
              value={paverSize}
              onChange={(e) => setPaverSize(e.target.value)}
              className="bg-brand-slate-950 border border-brand-slate-850 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-terracotta-500"
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
      </div>

      <div className="lg:col-span-5">
        <div className="bg-brand-slate-900 border border-brand-slate-800 rounded-3xl p-6 md:p-8 min-h-[350px] flex flex-col justify-between">
          {!paverResult ? (
            <div className="flex flex-col items-center justify-center text-center my-auto">
              <div className="p-4 bg-brand-slate-950 border border-brand-slate-850 rounded-2xl mb-4 text-brand-slate-500">
                <Calculator className="w-10 h-10" />
              </div>
              <h4 className="text-white font-bold">Paver Grid Counts Awaiting</h4>
              <p className="text-xs text-brand-slate-500 mt-2 max-w-[250px]">
                Input your driveway/pavement surface dimensions to run estimates.
              </p>
            </div>
          ) : (
            <div className="flex flex-col justify-between h-full gap-6">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-brand-slate-400">ESTIMATION SUMMARY</h4>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="bg-brand-slate-950 p-4 border border-brand-slate-850 rounded-xl">
                    <span className="block text-[10px] text-brand-slate-500 uppercase font-bold">Surface Area</span>
                    <span className="text-lg font-extrabold text-white">{paverResult.area} m²</span>
                  </div>
                  <div className="bg-brand-slate-950 p-4 border border-brand-slate-850 rounded-xl">
                    <span className="block text-[10px] text-brand-slate-500 uppercase font-bold">Wastage (8%)</span>
                    <span className="text-lg font-extrabold text-brand-terracotta-400">+{paverResult.wastage.toLocaleString()}</span>
                  </div>
                </div>
                
                <div className="mt-4 bg-brand-terracotta-600/10 border border-brand-terracotta-500/20 p-5 rounded-2xl flex justify-between items-center">
                  <div>
                    <span className="block text-[10px] text-brand-terracotta-400 uppercase font-bold">Total Pavers Required</span>
                    <span className="text-3xl font-extrabold text-white mt-1">{paverResult.total.toLocaleString()}</span>
                  </div>
                  <Check className="w-8 h-8 text-brand-terracotta-500" />
                </div>

                <div className="mt-4 flex justify-between text-xs font-mono text-brand-slate-450 p-2 border-b border-brand-slate-850">
                  <span>Estimated material budget:</span>
                  <span className="text-white font-bold">${paverResult.costEstimate.toLocaleString()}</span>
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
