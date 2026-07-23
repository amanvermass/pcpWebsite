"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/homepage/Header";
import { Footer } from "@/components/homepage/Footer";
import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { BlueprintGlobalBackground } from "@/components/ui/BlueprintGlobalBackground";

interface ApplicationData {
  id: string;
  title: string;
  desc: string;
  categories: {
    title: string;
    desc: string;
    image: string;
    link: string;
    specs: string[];
  }[];
}

interface ApplicationClientProps {
  appData: ApplicationData;
}

export default function ApplicationClient({ appData }: ApplicationClientProps) {
  const [darkMode, setDarkMode] = useState(true);

  // Sync theme class to document documentElement
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
    }
  }, [darkMode]);

  return (
    <div className="flex flex-col min-h-screen bg-brand-slate-950 text-slate-100 relative font-poppins">
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className="flex-grow relative pt-28 pb-20">
        <BlueprintGlobalBackground />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          {/* Header Block */}
          <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center">
            <span className="text-[10px] uppercase font-bold tracking-[0.35em] text-brand-gold bg-brand-gold/5 px-4 py-1.5 border border-brand-gold/20 rounded-none w-fit block">
              APPLICATION ROUTER
            </span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-normal font-cormorant text-brand-offwhite mt-6 tracking-wide leading-tight">
              {appData.title}
            </h1>
            <p className="text-brand-slate-300 text-xs sm:text-sm font-poppins mt-4 max-w-xl leading-relaxed">
              {appData.desc}
            </p>
          </div>

          {/* Cards Grid */}
          <div className={`grid grid-cols-1 gap-8 max-w-6xl mx-auto ${
            appData.categories.length === 2 ? "md:grid-cols-2 max-w-4xl" : "md:grid-cols-3"
          }`}>
            {appData.categories.map((cat, idx) => (
              <div 
                key={idx}
                className="bg-brand-charcoal border border-brand-gold/10 rounded-none overflow-hidden flex flex-col justify-between group hover:border-brand-gold/30 transition-all shadow-xl"
              >
                <div className="relative h-60 bg-brand-black overflow-hidden border-b border-brand-slate-900">
                  <img
                    src={cat.image}
                    alt={cat.title}
                    className="w-full h-full object-cover opacity-75 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal via-transparent to-transparent" />
                </div>

                <div className="p-6 md:p-8 flex flex-col justify-between flex-grow">
                  <div>
                    <h3 className="text-xl md:text-2xl font-normal font-cormorant text-brand-offwhite mb-3 group-hover:text-brand-gold transition-colors">
                      {cat.title}
                    </h3>
                    <p className="text-xs text-brand-sand/70 leading-relaxed mb-6 font-poppins">
                      {cat.desc}
                    </p>

                    <div className="w-full h-[1px] bg-brand-slate-800/80 mb-6" />

                    {/* Spec Bullets */}
                    <div className="space-y-2 mb-8">
                      {cat.specs.map((spec, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs text-brand-sand/80 font-poppins">
                          <CheckCircle2 className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                          <span>{spec}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <Link
                    href={cat.link}
                    className="inline-flex items-center justify-center gap-2 bg-brand-gold hover:bg-brand-sand text-brand-black py-3.5 px-6 rounded-none text-xs font-bold uppercase tracking-wider font-poppins transition-colors duration-300 border border-brand-gold cursor-pointer"
                  >
                    <span>View Specifications & Files</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
