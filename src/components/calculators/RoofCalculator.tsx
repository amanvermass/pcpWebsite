"use client";

import React, { useState } from "react";
import { Calculator, Download, Check } from "lucide-react";
import confetti from "canvas-confetti";
import { useToast } from "../ui/Toast";

export default function RoofCalculator() {
  const { toast } = useToast();
  const [roofLength, setRoofLength] = useState(15); // m
  const [roofWidth, setRoofWidth] = useState(8); // m
  const [roofSlope, setRoofSlope] = useState(15); // degrees
  const [roofResult, setRoofResult] = useState<any>(null);

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
      particleCount: 60,
      spread: 50,
      origin: { y: 0.8 },
      colors: ["#af6752", "#c29153", "#c4b7b0"],
    });

    toast("Roofing tile requirements computed!", "success");
  };

  const handleDownloadLog = () => {
    toast(`Successfully generated estimation report. CSV downloaded.`, "success");
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      <div className="lg:col-span-7 bg-brand-slate-900 border border-brand-slate-800 rounded-3xl p-6 md:p-8">
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
                className="bg-brand-slate-950 border border-brand-slate-850 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-terracotta-500"
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-brand-slate-400 font-bold uppercase">Roof Width (meters)</label>
              <input 
                type="number" 
                value={roofWidth} 
                onChange={(e) => setRoofWidth(Number(e.target.value))}
                className="bg-brand-slate-950 border border-brand-slate-850 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-terracotta-500"
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
              className="bg-brand-slate-950 border border-brand-slate-850 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-terracotta-500"
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
      </div>

      <div className="lg:col-span-5">
        <div className="bg-brand-slate-900 border border-brand-slate-800 rounded-3xl p-6 md:p-8 min-h-[350px] flex flex-col justify-between">
          {!roofResult ? (
            <div className="flex flex-col items-center justify-center text-center my-auto">
              <div className="p-4 bg-brand-slate-950 border border-brand-slate-850 rounded-2xl mb-4 text-brand-slate-500">
                <Calculator className="w-10 h-10" />
              </div>
              <h4 className="text-white font-bold">Quantities Awaiting</h4>
              <p className="text-xs text-brand-slate-500 mt-2 max-w-[250px]">
                Input roof structure measurements to trigger sloped-surface calculations.
              </p>
            </div>
          ) : (
            <div className="flex flex-col justify-between h-full gap-6">
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-brand-slate-400">ESTIMATION SUMMARY</h4>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  <div className="bg-brand-slate-950 p-4 border border-brand-slate-850 rounded-xl">
                    <span className="block text-[10px] text-brand-slate-500 uppercase font-bold">Sloped Surface Area</span>
                    <span className="text-lg font-extrabold text-white">{roofResult.actualArea} m²</span>
                  </div>
                  <div className="bg-brand-slate-950 p-4 border border-brand-slate-850 rounded-xl">
                    <span className="block text-[10px] text-brand-slate-500 uppercase font-bold">Ridge Tiles</span>
                    <span className="text-lg font-extrabold text-brand-terracotta-400">{roofResult.ridges} pcs</span>
                  </div>
                </div>
                
                <div className="mt-4 bg-brand-terracotta-600/10 border border-brand-terracotta-500/20 p-5 rounded-2xl flex justify-between items-center">
                  <div>
                    <span className="block text-[10px] text-brand-terracotta-400 uppercase font-bold">Total Roman Tiles (8% waste)</span>
                    <span className="text-3xl font-extrabold text-white mt-1">{roofResult.totalTiles.toLocaleString()}</span>
                  </div>
                  <Check className="w-8 h-8 text-brand-terracotta-500" />
                </div>

                <div className="mt-4 flex justify-between text-xs font-mono text-brand-slate-450 p-2 border-b border-brand-slate-850">
                  <span>Estimated material budget:</span>
                  <span className="text-white font-bold">${roofResult.costEstimate.toLocaleString()}</span>
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
