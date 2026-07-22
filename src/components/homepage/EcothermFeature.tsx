"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Zap, Scale, Flame, ShieldAlert, FileDown } from "lucide-react";
import Link from "next/link";
import { ImageReveal, TextReveal } from "../ui/ScrollReveal";

export const EcothermFeature: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: false, margin: "-80px" });

  const stats = [
    {
      icon: <Zap className="w-5 h-5 text-brand-terracotta-500" />,
      value: "3x Faster",
      label: "Construction Speed",
      desc: "Large block format accelerates wall assembly times."
    },
    {
      icon: <Scale className="w-5 h-5 text-brand-terracotta-500" />,
      value: "60% Lighter",
      label: "Dead Load Reduction",
      desc: "Reduces concrete and steel requirements in columns."
    },
    {
      icon: <Flame className="w-5 h-5 text-brand-terracotta-500" />,
      value: "U-Value 1.1",
      label: "Thermal Shielding",
      desc: "Fired clay hollow cells act as natural barrier to heat."
    },
    {
      icon: <ShieldAlert className="w-5 h-5 text-brand-terracotta-500" />,
      value: "40% Savings",
      label: "Mortar Jointing",
      desc: "Precision interlocking joints reduce mortar wastage."
    }
  ];

  return (
    <section 
      id="ecotherm-showcase" 
      ref={containerRef}
      className="py-16 md:py-20 lg:py-24 bg-brand-slate-950 border-t border-brand-slate-900 relative overflow-hidden"
    >
      {/* Background sketch overlay */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ce9456_1px,transparent_1px),linear-gradient(to_bottom,#ce9456_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* Left Column: Description & Statistics */}
          <div className="lg:col-span-7 flex flex-col gap-6 text-left">
            <div className="flex items-center gap-3">
              <span className="w-8 h-[1px] bg-brand-gold shrink-0" />
              <span className="text-[10px] uppercase font-bold tracking-[0.35em] text-brand-gold font-poppins">
                FLAGSHIP CLAY BLOCK
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal font-cormorant text-brand-offwhite leading-tight">
              Ecotherm Clay Hollow Blocks: The Future of Walling
            </h2>

            <p className="text-sm sm:text-base font-poppins text-brand-sand/80 leading-relaxed max-w-xl">
              Specifying wall structures shouldn't compromise building speed or energy efficiency. Ecotherm blocks combine the durability of fired clay with a multi-chambered air cell design, offering exceptional thermal insulation, fire protection, and rapid layout times. 
            </p>

            <div className="flex items-center gap-4 mt-1 flex-wrap">
              <span className="text-[9px] font-bold tracking-widest uppercase border border-brand-gold/30 text-brand-gold px-3 py-1.5 font-poppins bg-brand-gold/5">
                GRIHA Listed Product
              </span>
              <span className="text-[9px] font-bold tracking-widest uppercase border border-brand-terracotta/30 text-brand-terracotta px-3 py-1.5 font-poppins bg-brand-terracotta/5">
                EPD Certified
              </span>
            </div>

            {/* Core Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="bg-brand-charcoal border border-brand-gold/10 p-5 rounded-none hover:border-brand-gold/30 transition-all group text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-brand-black border border-brand-gold/10 rounded-lg group-hover:border-brand-gold/45 transition-colors">
                      {stat.icon}
                    </div>
                    <div>
                      <h4 className="text-lg font-bold text-brand-offwhite font-cormorant leading-none">
                        {stat.value}
                      </h4>
                      <span className="text-[10px] tracking-wide text-brand-gold uppercase block mt-1 font-poppins font-semibold">
                        {stat.label}
                      </span>
                    </div>
                  </div>
                  <p className="text-[11px] text-brand-sand/65 leading-relaxed mt-3 font-poppins">
                    {stat.desc}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-6 mt-4">
              <Link
                href="/contact?product=ecotherm"
                className="inline-flex items-center justify-center gap-1.5 bg-brand-terracotta-600 hover:bg-brand-terracotta-700 text-brand-offwhite px-6 py-3.5 text-xs font-bold uppercase tracking-wider transition-colors duration-300 font-poppins shadow-lg"
              >
                Request a Sample
                <ArrowRight className="w-4 h-4 text-brand-offwhite" />
              </Link>
              
              <Link
                href="/resources?type=Technical Datasheet"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-gold hover:text-brand-sand transition-colors font-poppins"
              >
                <FileDown className="w-4 h-4 text-brand-gold" />
                Technical Datasheet (TDS)
              </Link>
            </div>
          </div>

          {/* Right Column: Premium Image Showcase */}
          <div className="lg:col-span-5 w-full h-[550px] overflow-hidden border border-brand-gold/15 hover:border-brand-gold/40 bg-brand-charcoal relative shadow-2xl group">
            <ImageReveal>
              <img
                src="/images/ecotherm-hollow.jpg"
                alt="Terraplast bespoke earthy plasters color chart showing 22+ earthy tones"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
            </ImageReveal>

            {/* Dark vignette gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-slate-950/70 to-transparent pointer-events-none z-10" />

            {/* Interactive Dimension Overlay (Mock Blueprint Label) */}
            <div className="absolute bottom-6 left-6 z-20 bg-brand-black/90 p-4 border border-brand-gold/20 backdrop-blur-sm text-left max-w-xs">
              <span className="text-[8px] tracking-[0.25em] font-bold text-brand-gold uppercase block font-poppins">
                PLASTER TONES SHOWCASE
              </span>
              <h5 className="text-sm font-semibold text-brand-offwhite mt-1 font-cormorant">
                Terraplast Bespoke Plasters
              </h5>
              <p className="text-[10px] text-brand-sand/70 leading-normal mt-1 font-poppins">
                22+ earthy tones from earth reds to warm creams and golden ochres.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default EcothermFeature;
