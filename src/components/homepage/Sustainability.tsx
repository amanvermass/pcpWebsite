"use client";

import React from "react";
import { Leaf, Award, Recycle, Wind, Droplets, ArrowRight } from "lucide-react";
import { useToast } from "../ui/Toast";
import { ImageReveal, TextReveal } from "../ui/ScrollReveal";
import { Magnetic } from "../ui/Magnetic";

export const Sustainability: React.FC = () => {
  const { toast } = { ...useToast() };

  const metrics = [
    {
      icon: <Recycle className="w-6 h-6 text-brand-gold" />,
      value: "38%",
      label: "Recycled Content",
      desc: "Incorporating fly ash, slag, and crushed firing waste back into product raw mixes, reducing landfill dependencies.",
    },
    {
      icon: <Droplets className="w-6 h-6 text-brand-gold" />,
      value: "100%",
      label: "Water Recovery",
      desc: "Operating a closed-loop zero liquid discharge system that recycles all industrial runoff from brick formatting.",
    },
    {
      icon: <Wind className="w-6 h-6 text-brand-gold" />,
      value: "52k Tons",
      label: "Annual CO2 Prevented",
      desc: "Advanced energy recovery systems capture heat from high-efficiency tunnel kilns to run preliminary dryers.",
    },
    {
      icon: <Leaf className="w-6 h-6 text-brand-gold" />,
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
    <section id="sustainability" className="py-24 bg-brand-black relative">
      {/* Structural Lines */}
      <div className="absolute inset-0 pointer-events-none z-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-4 h-full opacity-10">
        <div className="border-l border-brand-slate h-full" />
        <div className="border-l border-brand-slate h-full" />
        <div className="border-l border-brand-slate h-full" />
        <div className="border-l border-brand-slate h-full border-r" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header Split Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-16">
          <div className="lg:col-span-7 flex flex-col gap-4">
            <span className="text-[10px] uppercase font-bold tracking-[0.35em] text-brand-gold bg-brand-gold/5 px-4 py-1.5 border border-brand-gold/20 rounded-none w-fit inline-flex items-center gap-2">
              <Leaf className="w-3.5 h-3.5 text-brand-gold" />
              Green Commitment
            </span>
            <TextReveal
              text="Pioneering Zero-Waste Ceramic Firing"
              className="text-3xl sm:text-4xl lg:text-5xl font-normal font-cormorant text-brand-offwhite mt-2 tracking-wide"
            />
            <p className="text-brand-sand/70 text-sm sm:text-base font-poppins leading-relaxed max-w-2xl mt-3">
              We engineer building materials that protect the planet. Through thermal energy recovery, recycled raw materials, and clean fuels, our factories are laying the groundwork for a circular construction economy.
            </p>

            <div className="mt-6">
              <Magnetic>
                <button
                  onClick={handleDownloadReport}
                  className="flex items-center gap-2 bg-brand-charcoal hover:bg-brand-slate border border-brand-gold/15 hover:border-brand-gold/50 text-brand-sand hover:text-brand-offwhite font-semibold tracking-wider font-poppins text-xs px-6 py-4 rounded-none transition-colors cursor-pointer"
                >
                  Download Sustainability Report
                  <ArrowRight className="w-4 h-4 text-brand-gold" />
                </button>
              </Magnetic>
            </div>
          </div>

          {/* Editorial Facade Image on Right with Swipe Reveal */}
          <div className="lg:col-span-5 h-[320px] rounded-none overflow-hidden border border-brand-gold/15 bg-brand-charcoal">
            <ImageReveal>
              <img
                src="https://images.unsplash.com/photo-1590069261209-f8e9b8642343?auto=format&fit=crop&w=800&q=80"
                alt="Terracotta facade architecture"
                className="object-cover w-full h-full"
              />
            </ImageReveal>
          </div>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {metrics.map((item, idx) => (
            <div
              key={idx}
              className="bg-brand-charcoal border border-brand-gold/10 p-6 rounded-none flex flex-col justify-between hover:border-brand-gold/40 transition-colors shadow-lg group"
            >
              <div className="flex justify-between items-start">
                <div className="p-3 bg-brand-black rounded-none border border-brand-gold/10">
                  {item.icon}
                </div>
                <span className="text-3xl font-normal font-cormorant text-brand-offwhite group-hover:text-brand-gold transition-colors">
                  {item.value}
                </span>
              </div>
              <div className="mt-8">
                <h4 className="font-semibold text-brand-offwhite text-sm font-poppins uppercase tracking-wider">{item.label}</h4>
                <p className="text-xs text-brand-sand/65 mt-2 leading-relaxed font-poppins">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Certifications and Audits Panel */}
        <div className="glass-panel border border-brand-gold/15 rounded-none p-6 md:p-8 bg-brand-charcoal/40">
          <div className="flex items-center gap-2.5 mb-6">
            <Award className="w-5 h-5 text-brand-gold" />
            <h3 className="font-normal font-cormorant text-brand-offwhite text-xl">Environmental Standards & Certifications</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {certifications.map((cert, idx) => (
              <div key={idx} className="bg-brand-black border border-brand-gold/10 p-5 rounded-none flex items-start gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-gold mt-2 shrink-0 animate-pulse" />
                <div>
                  <h4 className="font-semibold text-brand-offwhite text-sm font-poppins">{cert.title}</h4>
                  <p className="text-xs text-brand-sand/65 mt-2 leading-snug font-poppins">{cert.org}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom fine border */}
        <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-brand-gold/15 to-transparent mt-24" />

      </div>
    </section>
  );
};
