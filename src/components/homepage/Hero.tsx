"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Flame, Shield, HelpCircle, HardHat, FileText } from "lucide-react";

export const Hero: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1920&q=80",
      tagline: "FIRING THE FUTURE OF DESIGN",
      title: "Premium Terracotta & Clay Brick Architectural Systems",
      desc: "Crafting durable, thermal-efficient, and aesthetically unmatched clay products for modern facades and heavy-duty masonry projects.",
      btn1: "Explore Brick Catalog",
      btn2: "Brick Quantity Calculator",
      link1: "#products",
      link2: "#calculators",
    },
    {
      image: "https://images.unsplash.com/photo-1590381105924-c72589b9ef3f?auto=format&fit=crop&w=1920&q=80",
      tagline: "SUSTAINABLE STRUCTURAL EXCELLENCE",
      title: "Eco-Friendly AAC Blocks & Hollow Structural Tiles",
      desc: "Build lighter and smarter. High compressive strength combined with superior fire-rating and insulation for green buildings.",
      btn1: "Technical Documents",
      btn2: "Material Recommendation Quiz",
      link1: "#resources",
      link2: "#recommender",
    },
    {
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?auto=format&fit=crop&w=1920&q=80",
      tagline: "LANDSCAPING & CIVIL PAVEMENT",
      title: "High-Traffic Engineering Pavers & Slate Tiles",
      desc: "Designed for resilience. Extreme load capabilities, frost resistance, and custom textures matching high-traffic public squares.",
      btn1: "Paving Solutions",
      btn2: "Paver Cost Calculator",
      link1: "#products",
      link2: "#calculators",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handleScrollTo = (selector: string) => {
    const element = document.querySelector(selector);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const whyChooseUsData = [
    {
      icon: <Flame className="w-5 h-5 text-brand-terracotta-500" />,
      title: "Fired clay precision",
      desc: "Fired at 1200°C for extreme durability, low absorption, and natural hues.",
    },
    {
      icon: <Shield className="w-5 h-5 text-brand-emerald-500" />,
      title: "ECO certifications",
      desc: "ISO 14001 certified eco-friendly processes with recycled fly ash and clay mix.",
    },
    {
      icon: <HardHat className="w-5 h-5 text-brand-terracotta-500" />,
      title: "Architect Grade",
      desc: "Full structural datasheets, BIM objects, and strict dimensional tolerances.",
    },
  ];

  return (
    <section className="relative min-h-[92vh] flex flex-col justify-between pt-24 lg:pt-0 overflow-hidden bg-brand-slate-950">
      {/* Background slider with fade transitions */}
      <div className="absolute inset-0 z-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slides[currentSlide].image})` }}
          >
            {/* Immersive overlay gradients */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-slate-950 via-brand-slate-950/70 to-brand-slate-950/20" />
            <div className="absolute inset-0 bg-gradient-to-r from-brand-slate-950/90 via-transparent to-brand-slate-950/30" />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-grow flex items-center">
        <div className="max-w-3xl py-12 lg:py-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-5"
            >
              <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-brand-terracotta-600/20 border border-brand-terracotta-500/30 rounded-full text-brand-terracotta-400 font-bold text-xs uppercase tracking-widest w-fit">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-terracotta-500 animate-pulse" />
                {slides[currentSlide].tagline}
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-none drop-shadow-md">
                {slides[currentSlide].title}
              </h1>

              <p className="text-base sm:text-lg text-brand-slate-300 leading-relaxed drop-shadow">
                {slides[currentSlide].desc}
              </p>

              <div className="flex flex-wrap gap-4 mt-2">
                <button
                  onClick={() => handleScrollTo(slides[currentSlide].link1)}
                  className="flex items-center gap-2 bg-brand-terracotta-600 hover:bg-brand-terracotta-700 text-white font-bold px-7 py-3.5 rounded-xl shadow-lg shadow-brand-terracotta-600/30 transition-all hover:-translate-y-0.5 cursor-pointer text-sm"
                >
                  {slides[currentSlide].btn1}
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  onClick={() => handleScrollTo(slides[currentSlide].link2)}
                  className="flex items-center gap-2 bg-brand-slate-900 hover:bg-brand-slate-800 text-brand-slate-200 border border-brand-slate-700 font-semibold px-7 py-3.5 rounded-xl transition-all hover:-translate-y-0.5 cursor-pointer text-sm"
                >
                  {slides[currentSlide].btn2}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Slide Indicators & Why Choose Us Banner */}
      <div className="relative z-10 w-full bg-brand-slate-950/60 border-t border-brand-slate-900/60 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-center">
            {/* Why choose us text */}
            <div className="lg:border-r border-brand-slate-800/80 pr-4">
              <span className="text-[10px] uppercase font-bold tracking-widest text-brand-terracotta-500">WHY CONTRACTORS CHOOSE US</span>
              <h3 className="text-lg font-bold text-white mt-0.5">Built on Structural Integrity</h3>
            </div>

            {/* Features list */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:col-span-3 gap-6">
              {whyChooseUsData.map((item, idx) => (
                <div key={idx} className="flex gap-3">
                  <div className="p-2 bg-brand-slate-900/80 rounded-lg shrink-0 w-fit h-fit border border-brand-slate-800">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                    <p className="text-xs text-brand-slate-400 mt-0.5 leading-snug">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Slider dots */}
          <div className="flex justify-center gap-2 mt-6">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  currentSlide === idx ? "w-8 bg-brand-terracotta-600" : "w-2 bg-brand-slate-700 hover:bg-brand-slate-500"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
