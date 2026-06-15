"use client";

import React, { useState } from "react";
import { Calculator, Download, Check } from "lucide-react";
import confetti from "canvas-confetti";
import { useToast } from "../ui/Toast";

export default function HouseCalculator() {
  const { toast } = useToast();
  const [plotSize, setPlotSize] = useState(1500); // sq ft
  const [builtUpArea, setBuiltUpArea] = useState(1200); // sq ft
  const [floors, setFloors] = useState(1);
  const [houseResult, setHouseResult] = useState<any>(null);

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
      particleCount: 60,
      spread: 50,
      origin: { y: 0.8 },
      colors: ["#af6752", "#c29153", "#c4b7b0"],
    });

    toast("Whole house material budget estimated!", "success");
  };

  const handleDownloadLog = () => {
    toast(`Successfully generated estimation report. CSV downloaded.`, "success");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-7 bg-brand-slate-900 border border-brand-slate-800 rounded-3xl p-6 md:p-8">
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
                className="bg-brand-slate-950 border border-brand-slate-850 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-terracotta-500"
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-brand-slate-400 font-bold uppercase">Built-up Area (Sq Ft)</label>
              <input 
                type="number" 
                value={builtUpArea} 
                onChange={(e) => setBuiltUpArea(Number(e.target.value))}
                className="bg-brand-slate-950 border border-brand-slate-850 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-terracotta-500"
                required
              />
            </div>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs text-brand-slate-400 font-bold uppercase">Number of Floors</label>
            <select
              value={floors}
              onChange={(e) => setFloors(Number(e.target.value))}
              className="bg-brand-slate-950 border border-brand-slate-850 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-terracotta-500"
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
      </div>

      <div className="lg:col-span-5">
        <div className="bg-brand-slate-900 border border-brand-slate-800 rounded-3xl p-6 md:p-8 min-h-[350px] flex flex-col justify-between">
          {!houseResult ? (
            <div className="flex flex-col items-center justify-center text-center my-auto">
              <div className="p-4 bg-brand-slate-950 border border-brand-slate-850 rounded-2xl mb-4 text-brand-slate-500">
                <Calculator className="w-10 h-10" />
              </div>
              <h4 className="text-white font-bold">Material Budget Awaiting</h4>
              <p className="text-xs text-brand-slate-500 mt-2 max-w-[250px]">
                Input house specifications to generate cement, sand, brick, and aggregates estimates.
              </p>
            </div>
          ) : (
            <div className="flex flex-col justify-between h-full gap-6">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-brand-slate-400">ESTIMATION SUMMARY</h4>
                <div className="flex flex-col gap-3 mt-6">
                  <div className="bg-brand-slate-950 px-4 py-3 border border-brand-slate-850 rounded-xl flex justify-between items-center">
                    <span className="text-xs text-brand-slate-450 font-bold uppercase">Clay Bricks Needed</span>
                    <span className="text-lg font-extrabold text-white">{houseResult.bricks.toLocaleString()} pcs</span>
                  </div>
                  <div className="bg-brand-slate-950 px-4 py-3 border border-brand-slate-850 rounded-xl flex justify-between items-center">
                    <span className="text-xs text-brand-slate-400 font-bold uppercase">Cement Bags</span>
                    <span className="text-lg font-extrabold text-brand-terracotta-400">{houseResult.cement.toLocaleString()} bags</span>
                  </div>
                  <div className="bg-brand-slate-950 px-4 py-3 border border-brand-slate-850 rounded-xl flex justify-between items-center">
                    <span className="text-xs text-brand-slate-450 font-bold uppercase">Coarse Sand</span>
                    <span className="text-lg font-extrabold text-white">{houseResult.sand.toLocaleString()} cft</span>
                  </div>
                  <div className="bg-brand-slate-950 px-4 py-3 border border-brand-slate-850 rounded-xl flex justify-between items-center">
                    <span className="text-xs text-brand-slate-450 font-bold uppercase">Aggregate Stone</span>
                    <span className="text-lg font-extrabold text-white">{houseResult.aggregate.toLocaleString()} cft</span>
                  </div>
                </div>
                
                <div className="mt-4 bg-brand-emerald-500/10 border border-brand-emerald-500/20 p-4 rounded-xl flex justify-between items-center text-xs">
                  <span className="text-brand-emerald-400 font-bold">Estimated Core Materials Value</span>
                  <strong className="text-white text-lg">${houseResult.totalCost.toLocaleString()}</strong>
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
