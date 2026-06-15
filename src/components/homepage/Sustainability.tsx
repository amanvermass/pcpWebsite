"use client";

import React from "react";
import { Leaf, Award, Recycle, Wind, Droplets, ArrowRight } from "lucide-react";
import { useToast } from "../ui/Toast";

export const Sustainability: React.FC = () => {
  const { toast } = { ...useToast() };

  const metrics = [
    {
      icon: <Recycle className="w-6 h-6 text-brand-emerald-500" />,
      value: "38%",
      label: "Recycled Content",
      desc: "Incorporating fly ash, slag, and crushed firing waste back into product raw mixes, reducing landfill dependencies.",
    },
    {
      icon: <Droplets className="w-6 h-6 text-brand-emerald-500" />,
      value: "100%",
      label: "Water Recovery",
      desc: "Operating a closed-loop zero liquid discharge system that recycles all industrial runoff from brick formatting.",
    },
    {
      icon: <Wind className="w-6 h-6 text-brand-emerald-500" />,
      value: "52k Tons",
      label: "Annual CO2 Prevented",
      desc: "Advanced energy recovery systems capture heat from high-efficiency tunnel kilns to run preliminary dryers.",
    },
    {
      icon: <Leaf className="w-6 h-6 text-brand-emerald-500" />,
      value: "45%",
      label: "Clean Energy Share",
      desc: "Powered by solar rooftops and localized biomass fuels, phasing out coal firing in our manufacturing plants.",
    },
  ];

  const certifications = [
    {
      title: "ISO 14001:2015",
      org: "Environmental Management Systems standard certification.",
    },
    {
      title: "LEED Qualification",
      org: "Products qualify for regional Green Building Council credits.",
    },
    {
      title: "GRI Standard",
      org: "Sustainably audited reporting according to Global Reporting Initiative.",
    },
  ];

  const handleDownloadReport = () => {
    toast("PCP 2025 Sustainability & ESG Report download queued.", "success");
  };

  return (
    <section id="sustainability" className="py-24 bg-brand-slate-900 bg-grid-pattern relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          <div className="lg:col-span-7">
            <span className="text-xs uppercase font-extrabold tracking-widest text-brand-emerald-500 bg-brand-emerald-500/10 px-3.5 py-1 rounded-full inline-flex items-center gap-1.5 mb-4">
              <Leaf className="w-3.5 h-3.5" />
              Green Commitment
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Pioneering Zero-Waste Ceramic Firing
            </h2>
            <p className="text-brand-slate-400 mt-4 text-base sm:text-lg leading-relaxed max-w-2xl">
              We engineer building materials that protect the planet. Through thermal energy recovery, recycled raw materials, and clean fuels, our factories are laying the groundwork for a circular construction economy.
            </p>
          </div>
          <div className="lg:col-span-5 flex lg:justify-end">
            <button
              onClick={handleDownloadReport}
              className="flex items-center gap-2 bg-brand-slate-950 hover:bg-brand-slate-900 border border-brand-slate-800 hover:border-brand-slate-700 text-brand-slate-200 hover:text-white font-semibold px-6 py-3.5 rounded-xl transition-all cursor-pointer text-sm"
            >
              Download Sustainability Report
              <ArrowRight className="w-4 h-4 text-brand-emerald-500" />
            </button>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {metrics.map((item, idx) => (
            <div
              key={idx}
              className="bg-brand-slate-950 border border-brand-slate-800/80 p-6 rounded-2xl flex flex-col justify-between hover:border-brand-emerald-500/30 hover:shadow-xl hover:shadow-brand-emerald-500/5 transition-all group"
            >
              <div className="flex justify-between items-start">
                <div className="p-3 bg-brand-slate-900 rounded-xl border border-brand-slate-800">
                  {item.icon}
                </div>
                <span className="text-3xl font-extrabold text-white group-hover:text-brand-emerald-500 transition-colors">
                  {item.value}
                </span>
              </div>
              <div className="mt-8">
                <h4 className="font-bold text-white text-base">{item.label}</h4>
                <p className="text-xs text-brand-slate-400 mt-2 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Certifications and Audits Panel */}
        <div className="glass-panel border border-brand-slate-800/60 rounded-3xl p-6 md:p-8 bg-brand-slate-950/40">
          <div className="flex items-center gap-2.5 mb-6">
            <Award className="w-5 h-5 text-brand-terracotta-500" />
            <h3 className="font-bold text-white text-lg">Environmental Standards & Certifications</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {certifications.map((cert, idx) => (
              <div key={idx} className="bg-brand-slate-950 border border-brand-slate-900 p-5 rounded-xl flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-brand-emerald-500 mt-2 shrink-0 animate-pulse-subtle" />
                <div>
                  <h4 className="font-bold text-white text-sm">{cert.title}</h4>
                  <p className="text-xs text-brand-slate-400 mt-1.5 leading-snug">{cert.org}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};
