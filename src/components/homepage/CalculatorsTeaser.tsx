"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Calculator, 
  FileText, 
  SlidersHorizontal, 
  ArrowRight, 
  FileDown, 
  FileCode, 
  Layers, 
  BookOpen, 
  CheckCircle2, 
  ChevronsLeftRight 
} from "lucide-react";

export const CalculatorsTeaser: React.FC = () => {
  const [sliderPos, setSliderPos] = useState(50);

  return (
    <section id="calculators" className="py-16 md:py-20 lg:py-24 bg-transparent relative select-none">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center px-4">
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] uppercase font-bold tracking-[0.35em] text-brand-terracotta-500 block font-poppins">
              TOOLS & RESOURCES
            </span>
            <div className="w-8 h-[1px] bg-brand-terracotta-500/40 my-1" />
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal font-cormorant text-brand-offwhite mt-3 tracking-wide">
            Practical Tools. Expert Guidance. Better Builds.
          </h2>

          <p className="text-xs sm:text-sm font-poppins text-brand-sand/75 mt-4 max-w-2xl leading-relaxed">
            Self-serve utilities and expert resources to help you design, specify and build with confidence.
          </p>
        </div>

        {/* 3 Main Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-10">

          {/* Card 1: Material Calculator */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-brand-slate-950 border border-brand-slate-800 hover:border-brand-terracotta-500/40 rounded-2xl overflow-hidden flex flex-col justify-between group transition-all shadow-xl hover:shadow-2xl text-left"
          >
            {/* Top Graphic Area: Interactive UI Preview */}
            <div className="relative h-64 bg-brand-black/90 p-4 overflow-hidden border-b border-brand-slate-800 flex items-center justify-between gap-3">
              {/* Mini Calculator UI Card */}
              <div className="bg-brand-slate-900 border border-brand-slate-800 p-3 rounded-xl shadow-lg w-[62%] text-[10px] font-poppins space-y-2 shrink-0 z-10">
                <div className="flex justify-between items-center border-b border-brand-slate-800 pb-1.5">
                  <span className="font-bold text-brand-offwhite text-[11px]">Brick Calculator</span>
                  <span className="text-[8px] bg-brand-terracotta-500/10 text-brand-terracotta-500 px-1.5 py-0.5 rounded font-mono">LIVE</span>
                </div>

                <div className="space-y-1">
                  <span className="text-[8px] text-brand-sand/60 block uppercase">Project Type</span>
                  <div className="bg-brand-black border border-brand-slate-800 px-2 py-1 rounded text-brand-offwhite flex justify-between items-center">
                    <span>Wall</span>
                    <span className="text-[8px] text-brand-sand/50">▼</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-1.5">
                  <div>
                    <span className="text-[7px] text-brand-sand/60 block uppercase">Wall Area (m²)</span>
                    <div className="bg-brand-black border border-brand-slate-800 px-2 py-0.5 rounded text-brand-offwhite font-mono">
                      100
                    </div>
                  </div>
                  <div>
                    <span className="text-[7px] text-brand-sand/60 block uppercase">Thickness</span>
                    <div className="bg-brand-black border border-brand-slate-800 px-2 py-0.5 rounded text-brand-offwhite font-mono">
                      230 mm
                    </div>
                  </div>
                </div>

                <div className="bg-brand-terracotta-600/10 border border-brand-terracotta-500/30 p-2 rounded-lg space-y-0.5">
                  <div className="flex justify-between text-brand-offwhite font-bold text-[10px]">
                    <span>Est. Quantity</span>
                    <span className="text-brand-terracotta-500 font-mono">2,850 Blocks</span>
                  </div>
                  <div className="flex justify-between text-brand-sand/70 text-[8px]">
                    <span>Mortar required</span>
                    <span className="font-mono text-brand-sand">1.62 m³</span>
                  </div>
                </div>
              </div>

              {/* Bricks Image Graphic */}
              <div className="absolute right-0 top-0 bottom-0 w-[48%] overflow-hidden">
                <img
                  src="/images/hero-2.jpg"
                  alt="Ecotherm Clay Hollow Bricks"
                  className="w-full h-full object-cover opacity-80 group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-brand-slate-900 via-transparent to-transparent" />
              </div>
            </div>

            {/* Bottom Content Area */}
            <div className="p-6 sm:p-7 flex flex-col justify-between flex-grow">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-brand-terracotta-500/10 border border-brand-terracotta-500/20 flex items-center justify-center shrink-0">
                    <Calculator className="w-5 h-5 text-brand-terracotta-500" />
                  </div>
                  <h3 className="text-xl font-normal font-cormorant text-brand-offwhite">
                    Material Calculator
                  </h3>
                </div>
                <p className="text-xs font-poppins text-brand-sand/75 leading-relaxed">
                  Estimate quantities, mortar and cost for your project with ease.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-brand-slate-800/80">
                <Link
                  href="/calculators"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-terracotta-500 hover:text-brand-gold transition-colors font-poppins group-hover:translate-x-1 duration-300"
                >
                  Try Calculator
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Card 2: Installation Guides */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-brand-slate-950 border border-brand-slate-800 hover:border-brand-terracotta-500/40 rounded-2xl overflow-hidden flex flex-col justify-between group transition-all shadow-xl hover:shadow-2xl text-left"
          >
            {/* Top Graphic Area: Bricklaying Photograph with Floating Step Cards */}
            <div className="relative h-64 bg-brand-black/90 overflow-hidden border-b border-brand-slate-800">
              <img
                src="/images/hero-4.jpg"
                alt="Masonry bricklaying process"
                className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-slate-950 via-brand-slate-950/40 to-transparent" />

              {/* Floating Step Cards Overlay */}
              <div className="absolute right-3 top-3 bottom-3 w-[55%] flex flex-col justify-center gap-1.5 text-[9px] font-poppins">
                {[
                  "Surface Preparation",
                  "Laying the First Course",
                  "Vertical Alignment",
                  "Joint Thickness",
                  "Curing & Protection"
                ].map((step, i) => (
                  <div
                    key={i}
                    className="bg-brand-slate-950/90 border border-brand-slate-800 backdrop-blur-md px-2.5 py-1 rounded-lg text-brand-offwhite flex items-center gap-1.5 shadow-md"
                  >
                    <CheckCircle2 className="w-3 h-3 text-brand-terracotta-500 shrink-0" />
                    <span className="truncate">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom Content Area */}
            <div className="p-6 sm:p-7 flex flex-col justify-between flex-grow">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-brand-terracotta-500/10 border border-brand-terracotta-500/20 flex items-center justify-center shrink-0">
                    <FileText className="w-5 h-5 text-brand-terracotta-500" />
                  </div>
                  <h3 className="text-xl font-normal font-cormorant text-brand-offwhite">
                    Installation Guides
                  </h3>
                </div>
                <p className="text-xs font-poppins text-brand-sand/75 leading-relaxed">
                  Step-by-step guides and best practices for lasting performance.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-brand-slate-800/80">
                <Link
                  href="/resources?type=Installation Guide"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-terracotta-500 hover:text-brand-gold transition-colors font-poppins group-hover:translate-x-1 duration-300"
                >
                  Explore Guides
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Card 3: Product Comparison */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="bg-brand-slate-950 border border-brand-slate-800 hover:border-brand-terracotta-500/40 rounded-2xl overflow-hidden flex flex-col justify-between group transition-all shadow-xl hover:shadow-2xl text-left"
          >
            {/* Top Graphic Area: Split Comparison Slider Graphic */}
            <div className="relative h-64 bg-brand-black/90 overflow-hidden border-b border-brand-slate-800">
              {/* Left Side: Tettenhall Red */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ width: `${sliderPos}%` }}
              >
                <img
                  src="/images/hero-3.jpg"
                  alt="Tettenhall Red Brick Texture"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute bottom-3 left-3 bg-brand-black/85 border border-brand-slate-800 px-2.5 py-1 rounded text-[9px] font-semibold text-brand-offwhite font-poppins">
                  Tettenhall Red
                </div>
              </div>

              {/* Right Side: London Stock */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ left: `${sliderPos}%` }}
              >
                <img
                  src="/images/hero-1.jpg"
                  alt="London Stock Brick Texture"
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ width: "100%", marginLeft: `-${sliderPos}%` }}
                />
                <div className="absolute bottom-3 right-3 bg-brand-black/85 border border-brand-slate-800 px-2.5 py-1 rounded text-[9px] font-semibold text-brand-offwhite font-poppins">
                  London Stock
                </div>
              </div>

              {/* Center Slider Divider Bar & Handle */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-brand-terracotta-500 cursor-ew-resize z-20 flex items-center justify-center"
                style={{ left: `calc(${sliderPos}% - 2px)` }}
              >
                <div className="w-8 h-8 rounded-full bg-brand-black border-2 border-brand-terracotta-500 text-brand-terracotta-500 flex items-center justify-center shadow-lg">
                  <ChevronsLeftRight className="w-4 h-4" />
                </div>
              </div>
            </div>

            {/* Bottom Content Area */}
            <div className="p-6 sm:p-7 flex flex-col justify-between flex-grow">
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full bg-brand-terracotta-500/10 border border-brand-terracotta-500/20 flex items-center justify-center shrink-0">
                    <SlidersHorizontal className="w-5 h-5 text-brand-terracotta-500" />
                  </div>
                  <h3 className="text-xl font-normal font-cormorant text-brand-offwhite">
                    Product Comparison
                  </h3>
                </div>
                <p className="text-xs font-poppins text-brand-sand/75 leading-relaxed">
                  Compare products, specs and performance to choose the right solution.
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-brand-slate-800/80">
                <Link
                  href="/resources"
                  className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-terracotta-500 hover:text-brand-gold transition-colors font-poppins group-hover:translate-x-1 duration-300"
                >
                  Compare Now
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Bottom Full-Width Resources Bar (1:1 Mockup Alignment) */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-brand-slate-950 border border-brand-slate-800 rounded-2xl p-6 sm:p-7 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center shadow-xl text-left"
        >
          {/* Left Block: Looking for CAD/BIM */}
          <div className="lg:col-span-5 flex items-center gap-4 border-b lg:border-b-0 lg:border-r border-brand-slate-800 pb-5 lg:pb-0 lg:pr-6">
            <div className="w-12 h-12 rounded-full bg-brand-terracotta-500/10 border border-brand-terracotta-500/20 flex items-center justify-center shrink-0">
              <FileDown className="w-5 h-5 text-brand-terracotta-500" />
            </div>
            <div>
              <p className="text-xs sm:text-sm font-poppins font-medium text-brand-offwhite">
                Looking for technical documents, CAD files or BIM models?
              </p>
              <Link
                href="/resources"
                className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-brand-terracotta-500 hover:text-brand-gold transition-colors font-poppins mt-1"
              >
                Visit Resources Centre
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Right Block: 3 Quick Resource Links */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-3 gap-5">
            {/* Item 1 */}
            <div className="flex items-start gap-3">
              <div className="p-2 bg-brand-black border border-brand-slate-800 rounded-lg text-brand-terracotta-500 shrink-0 mt-0.5">
                <FileCode className="w-4 h-4" />
              </div>
              <div>
                <h5 className="text-xs font-semibold text-brand-offwhite font-poppins">
                  Technical Datasheets
                </h5>
                <span className="text-[10px] text-brand-sand/60 font-poppins block mt-0.5">
                  Available for all products
                </span>
              </div>
            </div>

            {/* Item 2 */}
            <div className="flex items-start gap-3">
              <div className="p-2 bg-brand-black border border-brand-slate-800 rounded-lg text-brand-terracotta-500 shrink-0 mt-0.5">
                <Layers className="w-4 h-4" />
              </div>
              <div>
                <h5 className="text-xs font-semibold text-brand-offwhite font-poppins">
                  CAD & BIM Files
                </h5>
                <span className="text-[10px] text-brand-sand/60 font-poppins block mt-0.5">
                  For seamless planning
                </span>
              </div>
            </div>

            {/* Item 3 */}
            <div className="flex items-start gap-3">
              <div className="p-2 bg-brand-black border border-brand-slate-800 rounded-lg text-brand-terracotta-500 shrink-0 mt-0.5">
                <BookOpen className="w-4 h-4" />
              </div>
              <div>
                <h5 className="text-xs font-semibold text-brand-offwhite font-poppins">
                  Case Studies & Whitepapers
                </h5>
                <span className="text-[10px] text-brand-sand/60 font-poppins block mt-0.5">
                  Insights for professionals
                </span>
              </div>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default CalculatorsTeaser;
