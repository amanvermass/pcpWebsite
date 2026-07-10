"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, ArrowRight, ArrowLeft, RefreshCw, Sparkles, Building, Home, Warehouse, Sun, Snowflake, CloudRain, ShieldCheck, Compass } from "lucide-react";
import { useToast } from "../ui/Toast";

interface QuizState {
  buildingType: string;
  climate: string;
  location: string;
  floors: string;
  budget: string;
}

export const RecommendationEngine: React.FC = () => {
  const { toast } = { ...useToast() };
  const [step, setStep] = useState(1);
  const [selections, setSelections] = useState<QuizState>({
    buildingType: "",
    climate: "",
    location: "",
    floors: "",
    budget: "",
  });

  const stepsCount = 5;

  const handleSelect = (field: keyof QuizState, value: string) => {
    setSelections((prev) => ({ ...prev, [field]: value }));
    // Auto-advance to next step with slight delay for delightful UX
    setTimeout(() => {
      setStep((prev) => Math.min(prev + 1, stepsCount + 1));
    }, 300);
  };

  const handleBack = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const resetQuiz = () => {
    setSelections({
      buildingType: "",
      climate: "",
      location: "",
      floors: "",
      budget: "",
    });
    setStep(1);
  };

  // Logic to determine recommended building materials
  const getRecommendation = () => {
    const { buildingType, budget, climate } = selections;

    if (buildingType === "Luxury Villa") {
      return {
        primary: "Natural Terracotta Cladding & Premium Fired Clay Bricks",
        reason: "Luxury villas benefit from premium clay aesthetic finishes and natural ventilated terracotta facades that offer long-term UV resistance, structural thermal mass, and a timeless upscale appeal.",
        features: ["100% natural clay pigments", "Thermal dampening properties", "UV resistance", "Low maintenance facades"],
        techSpecs: "Compressive strength > 30 N/mm² | Absorption ~6.0%",
        image: "/images/hero-3.jpg"
      };
    }

    if (buildingType === "Commercial") {
      return {
        primary: "Supreme Autoclaved Aerated Concrete (AAC) Blocks & Hollow Blocks",
        reason: "Commercial high-rises require rapid build speeds, light dead-loads, and excellent fire ratings. Terraplasts reduce foundation loads while providing excellent sound dampening and thermal shielding.",
        features: ["Up to 3x lighter than standard brick", "Acoustic insulation (STC 44)", "Class A1 4-hour fire rating", "Rapid wall construction speed"],
        techSpecs: "Density ~600 kg/m³ | Thermal conductivity 0.15 W/mK",
        image: "/images/hero-1.jpg"
      };
    }

    if (buildingType === "Industrial") {
      return {
        primary: "Heavy-Duty Cladding & Engineering Bricks",
        reason: "Industrial plants need maximum durability, low moisture ingress, and high chemical resistance. Engineering fired bricks offer extreme load capacities and low water absorption rates.",
        features: ["Extreme compressive load limits", "Acid and industrial atmosphere resistant", "Highly dense microstructure", "Minimal water capillary action"],
        techSpecs: "Compressive strength > 45 N/mm² | Absorption < 5.0%",
        image: "/images/hero-4.jpg"
      };
    }

    // Default to Residential/Standard
    if (budget === "Premium" || climate === "Hot/Dry") {
      return {
        primary: "Fired Clay Facing Bricks & Multi-Cellular Hollow Blocks",
        reason: "Fired clay bricks and hollow blocks provide optimal temperature regulation, absorbing solar heat during the day and radiating it slowly at night, creating an ideal indoor microclimate.",
        features: ["High thermal mass regulation", "Naturally soundproofing clay walls", "Structural loading capability", "Sustainable traditional clay construction"],
        techSpecs: "Compressive strength ~35 N/mm² | Density ~1900 kg/m³",
        image: "/images/hero-2.jpg"
      };
    }

    return {
      primary: "Standard Eco-Clay Bricks & AAC Wall Blocks Combo",
      reason: "Combining structural clay loadbearing outer walls with lightweight interior Terraplasts provides the perfect balance of budget efficiency, thermal insulation, and sturdy wall load capacity.",
      features: ["Optimal cost-to-performance ratio", "Fast masonry speed", "Balanced thermal envelope", "Green building compliant materials"],
      techSpecs: "Mixed compression rating | Standard load bearing compliant",
      image: "/images/hero-5.jpg"
    };
  };

  const handleRequestQuote = (materialName: string) => {
    toast(`Inquiry log registered: ${materialName} requested.`, "success");
    const contactSection = document.querySelector("#contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
      const messageTextarea = document.querySelector("#contact-message") as HTMLTextAreaElement;
      if (messageTextarea) {
        messageTextarea.value = `I completed the online Material Recommendation Quiz. The engine recommended: ${materialName}. Under the conditions of a ${selections.buildingType} building in a ${selections.climate} climate, I would like to request a detailed volume estimate and dealer quotation.`;
      }
    }
  };

  return (
    <section id="recommender" className="py-16 md:py-20 lg:py-24 bg-brand-slate-950 relative overflow-hidden">
      {/* Decorative gradient glowing elements */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-brand-terracotta-600/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-brand-emerald-500/5 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-xs uppercase font-extrabold tracking-widest text-brand-emerald-500 bg-brand-emerald-500/10 px-3.5 py-1 rounded-full inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            AI Advisor
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 tracking-tight">
            Material Recommendation Wizard
          </h2>
          <p className="text-brand-slate-400 mt-3">
            Answer 5 quick structural and environment questions to discover the optimal structural materials for your project.
          </p>
        </div>

        {/* Wizard Panel Box */}
        <div className="glass-panel rounded-3xl border border-brand-slate-800 bg-brand-slate-900/60 p-6 md:p-10 shadow-2xl relative">

          {/* Progress bar */}
          {step <= stepsCount && (
            <div className="w-full bg-brand-slate-950 rounded-full h-1.5 mb-8 overflow-hidden border border-brand-slate-800">
              <div
                className="bg-brand-emerald-500 h-full transition-all duration-300"
                style={{ width: `${((step - 1) / stepsCount) * 100}%` }}
              />
            </div>
          )}

          <AnimatePresence mode="wait">
            {/* Step 1: Building Type */}
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col gap-6"
              >
                <div>
                  <span className="text-xs font-bold text-brand-emerald-500 uppercase tracking-widest">Step 1 of 5</span>
                  <h3 className="text-xl md:text-2xl font-bold text-white mt-1">What type of building are you constructing?</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[
                    { name: "Residential House", desc: "Single/Multi-family home", icon: <Home className="w-5 h-5 text-brand-terracotta-500" /> },
                    { name: "Luxury Villa", desc: "Premium designer mansion", icon: <Compass className="w-5 h-5 text-yellow-500" /> },
                    { name: "Commercial", desc: "High-rises, offices, hotels", icon: <Building className="w-5 h-5 text-brand-emerald-500" /> },
                    { name: "Industrial", desc: "Warehouses, heavy factories", icon: <Warehouse className="w-5 h-5 text-blue-500" /> },
                  ].map((opt) => (
                    <button
                      key={opt.name}
                      onClick={() => handleSelect("buildingType", opt.name)}
                      className={`flex items-center gap-4 p-5 rounded-2xl border text-left cursor-pointer transition-all ${selections.buildingType === opt.name
                        ? "border-brand-emerald-500 bg-brand-emerald-500/10 text-white"
                        : "border-brand-slate-800 bg-brand-slate-950 hover:border-brand-slate-700 text-brand-slate-300 hover:text-white"
                        }`}
                    >
                      <div className="p-3 bg-brand-slate-900 rounded-xl shrink-0 border border-brand-slate-800">
                        {opt.icon}
                      </div>
                      <div>
                        <h4 className="font-bold">{opt.name}</h4>
                        <p className="text-xs text-brand-slate-400 mt-0.5">{opt.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2: Climate */}
            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col gap-6"
              >
                <div>
                  <span className="text-xs font-bold text-brand-emerald-500 uppercase tracking-widest">Step 2 of 5</span>
                  <h3 className="text-xl md:text-2xl font-bold text-white mt-1">What is the local climate of the building site?</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { name: "Hot/Dry", desc: "High temperatures, low moisture", icon: <Sun className="w-5 h-5 text-orange-500" /> },
                    { name: "Cold/Alpine", desc: "Sub-zero winters, frost hazards", icon: <Snowflake className="w-5 h-5 text-sky-400" /> },
                    { name: "Humid/Tropical", desc: "Heavy monsoons, high humidity", icon: <CloudRain className="w-5 h-5 text-blue-400" /> },
                  ].map((opt) => (
                    <button
                      key={opt.name}
                      onClick={() => handleSelect("climate", opt.name)}
                      className={`flex flex-col gap-4 p-5 rounded-2xl border text-left cursor-pointer transition-all ${selections.climate === opt.name
                        ? "border-brand-emerald-500 bg-brand-emerald-500/10 text-white"
                        : "border-brand-slate-800 bg-brand-slate-950 hover:border-brand-slate-700 text-brand-slate-300 hover:text-white"
                        }`}
                    >
                      <div className="p-3 bg-brand-slate-900 rounded-xl shrink-0 w-fit border border-brand-slate-800">
                        {opt.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-sm">{opt.name}</h4>
                        <p className="text-xs text-brand-slate-400 mt-1">{opt.desc}</p>
                      </div>
                    </button>
                  ))}
                </div>
                <button
                  onClick={handleBack}
                  className="flex items-center gap-1.5 text-xs font-bold text-brand-slate-400 hover:text-white mt-4 w-fit cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>
              </motion.div>
            )}

            {/* Step 3: Location */}
            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col gap-6"
              >
                <div>
                  <span className="text-xs font-bold text-brand-emerald-500 uppercase tracking-widest">Step 3 of 5</span>
                  <h3 className="text-xl md:text-2xl font-bold text-white mt-1">What is the macro-location of the project?</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { name: "Coastal Area", desc: "High salt winds & dampness" },
                    { name: "Dense Urban Center", desc: "Acoustic controls and space limits" },
                    { name: "Inland / Plains", desc: "Standard atmospheric conditions" },
                  ].map((opt) => (
                    <button
                      key={opt.name}
                      onClick={() => handleSelect("location", opt.name)}
                      className={`flex flex-col justify-between p-5 rounded-2xl border text-left cursor-pointer transition-all min-h-[120px] ${selections.location === opt.name
                        ? "border-brand-emerald-500 bg-brand-emerald-500/10 text-white"
                        : "border-brand-slate-800 bg-brand-slate-950 hover:border-brand-slate-700 text-brand-slate-300 hover:text-white"
                        }`}
                    >
                      <h4 className="font-bold text-sm">{opt.name}</h4>
                      <p className="text-xs text-brand-slate-400 mt-2">{opt.desc}</p>
                    </button>
                  ))}
                </div>
                <button
                  onClick={handleBack}
                  className="flex items-center gap-1.5 text-xs font-bold text-brand-slate-400 hover:text-white mt-4 w-fit cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>
              </motion.div>
            )}

            {/* Step 4: Floors */}
            {step === 4 && (
              <motion.div
                key="step4"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col gap-6"
              >
                <div>
                  <span className="text-xs font-bold text-brand-emerald-500 uppercase tracking-widest">Step 4 of 5</span>
                  <h3 className="text-xl md:text-2xl font-bold text-white mt-1">How many storeys/floors is the building?</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { name: "1 - 2 Floors", desc: "Low-rise load bearing construction potential" },
                    { name: "3 - 5 Floors", desc: "Mid-rise concrete frame masonry" },
                    { name: "6+ Floors", desc: "High-rise framed building with lightweight infill" },
                  ].map((opt) => (
                    <button
                      key={opt.name}
                      onClick={() => handleSelect("floors", opt.name)}
                      className={`flex flex-col justify-between p-5 rounded-2xl border text-left cursor-pointer transition-all min-h-[120px] ${selections.floors === opt.name
                        ? "border-brand-emerald-500 bg-brand-emerald-500/10 text-white"
                        : "border-brand-slate-800 bg-brand-slate-950 hover:border-brand-slate-700 text-brand-slate-300 hover:text-white"
                        }`}
                    >
                      <h4 className="font-bold text-sm">{opt.name}</h4>
                      <p className="text-xs text-brand-slate-400 mt-2">{opt.desc}</p>
                    </button>
                  ))}
                </div>
                <button
                  onClick={handleBack}
                  className="flex items-center gap-1.5 text-xs font-bold text-brand-slate-400 hover:text-white mt-4 w-fit cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>
              </motion.div>
            )}

            {/* Step 5: Budget */}
            {step === 5 && (
              <motion.div
                key="step5"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="flex flex-col gap-6"
              >
                <div>
                  <span className="text-xs font-bold text-brand-emerald-500 uppercase tracking-widest">Step 5 of 5</span>
                  <h3 className="text-xl md:text-2xl font-bold text-white mt-1">What is the budgeted target for walling materials?</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { name: "Economy", desc: "Focus on build speed and low volume cost" },
                    { name: "Standard", desc: "Balanced strength, insulation, and cost" },
                    { name: "Premium", desc: "Top-tier architectural facade and zero upkeep" },
                  ].map((opt) => (
                    <button
                      key={opt.name}
                      onClick={() => handleSelect("budget", opt.name)}
                      className={`flex flex-col justify-between p-5 rounded-2xl border text-left cursor-pointer transition-all min-h-[120px] ${selections.budget === opt.name
                        ? "border-brand-emerald-500 bg-brand-emerald-500/10 text-white"
                        : "border-brand-slate-800 bg-brand-slate-950 hover:border-brand-slate-700 text-brand-slate-300 hover:text-white"
                        }`}
                    >
                      <h4 className="font-bold text-sm">{opt.name}</h4>
                      <p className="text-xs text-brand-slate-400 mt-2">{opt.desc}</p>
                    </button>
                  ))}
                </div>
                <button
                  onClick={handleBack}
                  className="flex items-center gap-1.5 text-xs font-bold text-brand-slate-400 hover:text-white mt-4 w-fit cursor-pointer"
                >
                  <ArrowLeft className="w-3.5 h-3.5" /> Back
                </button>
              </motion.div>
            )}

            {/* Step 6: Results Screen */}
            {step === 6 && (
              <motion.div
                key="results"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch"
              >
                {/* Result Info Card */}
                <div className="flex flex-col justify-between gap-6">
                  <div>
                    <div className="flex items-center gap-2 text-brand-emerald-500 font-extrabold text-xs uppercase tracking-widest">
                      <ShieldCheck className="w-4 h-4" />
                      Recommended Building Material
                    </div>

                    <h3 className="text-2xl md:text-3xl font-extrabold text-white mt-2 leading-tight">
                      {getRecommendation().primary}
                    </h3>

                    <p className="text-sm text-brand-slate-300 mt-4 leading-relaxed bg-brand-slate-950/40 border border-brand-slate-800/50 p-4 rounded-xl">
                      {getRecommendation().reason}
                    </p>
                  </div>

                  <div>
                    <h4 className="text-xs font-extrabold uppercase text-brand-slate-400 tracking-wider mb-2">Key Engineering Benefits</h4>
                    <ul className="flex flex-col gap-2">
                      {getRecommendation().features.map((feat, i) => (
                        <li key={i} className="flex items-center gap-2 text-xs text-brand-slate-300">
                          <span className="p-0.5 bg-brand-emerald-500/10 text-brand-emerald-400 border border-brand-emerald-500/20 rounded-md shrink-0">
                            <Check className="w-3 h-3" />
                          </span>
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="text-xs font-mono text-brand-slate-400 border-t border-brand-slate-800/80 pt-4 flex justify-between">
                    <span>Performance Rating:</span>
                    <span className="text-brand-terracotta-400 font-bold">{getRecommendation().techSpecs}</span>
                  </div>
                </div>

                {/* Picture & Action Column */}
                <div className="rounded-2xl overflow-hidden border border-brand-slate-800 bg-brand-slate-950 flex flex-col justify-between relative min-h-[300px] md:min-h-auto">
                  <div className="relative aspect-[16/10] w-full overflow-hidden shrink-0">
                    <img
                      src={getRecommendation().image}
                      alt="Recommended solution"
                      className="object-cover w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-slate-950 to-transparent" />
                  </div>

                  <div className="p-6 flex-grow flex flex-col justify-between gap-6">
                    <div className="text-xs text-brand-slate-400">
                      Recommendation compiled for building type <strong className="text-white">{selections.buildingType}</strong> located in <strong className="text-white">{selections.location}</strong> with <strong className="text-white">{selections.floors}</strong> storeys.
                    </div>

                    <div className="flex flex-col gap-3">
                      <button
                        onClick={() => handleRequestQuote(getRecommendation().primary)}
                        className="w-full bg-brand-terracotta-600 hover:bg-brand-terracotta-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-md shadow-brand-terracotta-600/20 text-center text-sm cursor-pointer flex items-center justify-center gap-2"
                      >
                        Request Specification & Pricing
                        <ArrowRight className="w-4 h-4" />
                      </button>

                      <button
                        onClick={resetQuiz}
                        className="w-full bg-brand-slate-900 hover:bg-brand-slate-800 text-brand-slate-300 font-semibold py-3.5 rounded-xl transition-all border border-brand-slate-800 text-center text-sm cursor-pointer flex items-center justify-center gap-2"
                      >
                        <RefreshCw className="w-4 h-4" />
                        Run Wizard Again
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
