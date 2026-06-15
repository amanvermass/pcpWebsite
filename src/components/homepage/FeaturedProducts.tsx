"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Eye, Check, X, ArrowRight, Download } from "lucide-react";
import { useToast } from "../ui/Toast";
import Link from "next/link";
import { products, Product } from "../../data/products";

export const FeaturedProducts: React.FC<{ teaser?: boolean }> = ({ teaser = false }) => {
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeQuickView, setActiveQuickView] = useState<Product | null>(null);

  const categories = ["All", "Clay Bricks", "Terracotta", "Roofing Tiles", "Pavers", "Hollow Blocks", "AAC Blocks"];

  const filteredProducts = teaser
    ? products.slice(0, 3)
    : (selectedCategory === "All" ? products : products.filter(p => p.category === selectedCategory));

  const handleDownload = (docType: string, productName: string) => {
    toast(`Successfully started download: ${productName} - ${docType}`, "success");
  };

  const handleQuickInquiry = (productName: string) => {
    toast(`Inquiry for "${productName}" selected. Please complete the form below!`, "info");
    const contactSection = document.querySelector("#contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
      // Pre-fill enquiry fields if possible (we will handle state in contact component)
      const messageTextarea = document.querySelector("#contact-message") as HTMLTextAreaElement;
      if (messageTextarea) {
        messageTextarea.value = `I am interested in ordering/inquiring about the: ${productName}. Please provide availability and a cost quotation.`;
      }
    }
  };

  return (
    <section id="products" className="py-24 bg-brand-slate-900 bg-grid-pattern relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-extrabold tracking-widest text-brand-terracotta-500 bg-brand-terracotta-500/10 px-3 py-1 rounded-full">
            Product Catalog
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 tracking-tight">
            High-Performance Materials
          </h2>
          <p className="text-brand-slate-400 mt-3 text-base sm:text-lg">
            Explore our architectural-grade product ranges engineered for structural endurance, thermal insulation, and visual brilliance.
          </p>
        </div>

        {/* Category Filters */}
        {!teaser && (
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  selectedCategory === cat
                    ? "bg-brand-terracotta-600 text-white shadow-lg shadow-brand-terracotta-600/30"
                    : "bg-brand-slate-950 text-brand-slate-400 hover:text-white border border-brand-slate-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        )}

        {/* Products Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((p) => (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group rounded-2xl overflow-hidden border border-brand-slate-800 bg-brand-slate-950 flex flex-col justify-between hover:border-brand-slate-700 transition-all hover:shadow-2xl hover:shadow-brand-terracotta-500/5 hover:-translate-y-1"
              >
                {/* Product Image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-brand-slate-900">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-brand-slate-950/80 backdrop-blur-md text-brand-terracotta-400 border border-brand-slate-800 text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-md">
                    {p.category}
                  </div>
                  
                  {/* Hover Quick View Overlay */}
                  <div className="absolute inset-0 bg-brand-slate-950/45 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                    <button
                      onClick={() => setActiveQuickView(p)}
                      className="p-3 bg-white text-brand-slate-950 rounded-full hover:scale-110 transition-transform shadow-lg cursor-pointer"
                      title="Quick View Technical Details"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 flex-grow flex flex-col justify-between">
                  <div>
                    <Link href={`/products/${p.id}`}>
                      <h3 className="text-xl font-bold text-white group-hover:text-brand-terracotta-400 transition-colors">
                        {p.name}
                      </h3>
                    </Link>
                    <p className="text-sm text-brand-slate-400 mt-2 leading-relaxed">
                      {p.desc}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="mt-6 flex items-center gap-3 pt-4 border-t border-brand-slate-900">
                    <Link
                      href={`/products/${p.id}`}
                      className="flex-1 text-center py-2.5 rounded-xl text-xs font-bold bg-brand-slate-900 text-brand-slate-300 hover:text-white hover:bg-brand-slate-800 border border-brand-slate-800 transition-colors cursor-pointer"
                    >
                      Technical Specs
                    </Link>
                    <button
                      onClick={() => handleQuickInquiry(p.name)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold bg-brand-terracotta-600/20 text-brand-terracotta-400 hover:bg-brand-terracotta-600 hover:text-white transition-all cursor-pointer"
                    >
                      Request Quote
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {teaser && (
          <div className="text-center mt-16">
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-brand-terracotta-600 hover:bg-brand-terracotta-700 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-brand-terracotta-600/20 cursor-pointer"
            >
              Explore Full Clay Catalog
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>

      {/* Quick View Detailed Modal Overlay */}
      <AnimatePresence>
        {activeQuickView && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveQuickView(null)}
              className="absolute inset-0 bg-brand-slate-950/80 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-brand-slate-900 rounded-3xl overflow-hidden border border-brand-slate-800 shadow-2xl flex flex-col md:flex-row max-h-[90vh] md:max-h-none overflow-y-auto md:overflow-visible"
            >
              {/* Image half */}
              <div className="md:w-1/2 relative min-h-[250px] md:min-h-full bg-brand-slate-950">
                <img
                  src={activeQuickView.image}
                  alt={activeQuickView.name}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-slate-900 md:bg-gradient-to-r md:from-transparent md:to-brand-slate-900" />
                <button
                  onClick={() => setActiveQuickView(null)}
                  className="absolute top-4 left-4 p-2 bg-brand-slate-950/70 text-white rounded-full md:hidden border border-brand-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Data Specifications half */}
              <div className="p-6 md:p-8 md:w-1/2 flex flex-col justify-between gap-6 max-h-[70vh] md:max-h-[85vh] overflow-y-auto">
                <div className="hidden md:flex justify-between items-center">
                  <span className="text-[10px] uppercase tracking-widest text-brand-terracotta-500 font-bold">
                    {activeQuickView.category} TECHNICAL FILE
                  </span>
                  <button
                    onClick={() => setActiveQuickView(null)}
                    className="p-1.5 hover:bg-brand-slate-800 text-brand-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div>
                  <h3 className="text-2xl font-extrabold text-white leading-tight">
                    {activeQuickView.name}
                  </h3>
                  <p className="text-sm text-brand-slate-400 mt-2 leading-relaxed">
                    {activeQuickView.desc}
                  </p>
                </div>

                {/* Specs Grid */}
                <div>
                  <h4 className="text-xs uppercase font-extrabold tracking-widest text-brand-slate-400 border-b border-brand-slate-800 pb-2 mb-3">
                    Structural Specifications
                  </h4>
                  <div className="grid grid-cols-2 gap-y-3 gap-x-4">
                    <div>
                      <span className="block text-[10px] text-brand-slate-500 uppercase font-bold">Dimensions</span>
                      <span className="text-sm font-semibold text-white">
                        {activeQuickView.specs.length} × {activeQuickView.specs.width} × {activeQuickView.specs.height}
                      </span>
                    </div>
                    <div>
                      <span className="block text-[10px] text-brand-slate-500 uppercase font-bold">Dry Weight</span>
                      <span className="text-sm font-semibold text-white">{activeQuickView.specs.weight}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] text-brand-slate-500 uppercase font-bold">Density</span>
                      <span className="text-sm font-semibold text-white">{activeQuickView.specs.density}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] text-brand-slate-500 uppercase font-bold">Water Absorption</span>
                      <span className="text-sm font-semibold text-white">{activeQuickView.specs.waterAbsorption}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] text-brand-slate-500 uppercase font-bold">Compressive Strength</span>
                      <span className="text-sm font-semibold text-white text-brand-terracotta-400">{activeQuickView.specs.compStrength}</span>
                    </div>
                    <div>
                      <span className="block text-[10px] text-brand-slate-500 uppercase font-bold">Fire Resistance</span>
                      <span className="text-sm font-semibold text-white">{activeQuickView.specs.fireResistance}</span>
                    </div>
                    {activeQuickView.specs.thermalInsulation && (
                      <div className="col-span-2">
                        <span className="block text-[10px] text-brand-slate-500 uppercase font-bold">Thermal Conductivity (λ)</span>
                        <span className="text-sm font-semibold text-brand-emerald-500">{activeQuickView.specs.thermalInsulation}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Downloads Action Panel */}
                <div>
                  <h4 className="text-xs uppercase font-extrabold tracking-widest text-brand-slate-400 border-b border-brand-slate-800 pb-2 mb-3">
                    Architect CAD & BIM Downloads
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <button
                      onClick={() => handleDownload("Datasheet (PDF)", activeQuickView.name)}
                      className="flex items-center justify-between px-3 py-2 bg-brand-slate-950 border border-brand-slate-800 rounded-xl text-xs font-semibold hover:border-brand-slate-700 hover:bg-brand-slate-900 text-brand-slate-300 hover:text-white transition-all text-left cursor-pointer"
                    >
                      <span className="truncate">Product Datasheet (PDF)</span>
                      <Download className="w-3.5 h-3.5 text-brand-terracotta-500 shrink-0 ml-2" />
                    </button>
                    <button
                      onClick={() => handleDownload("Revit Object (RVT)", activeQuickView.name)}
                      className="flex items-center justify-between px-3 py-2 bg-brand-slate-950 border border-brand-slate-800 rounded-xl text-xs font-semibold hover:border-brand-slate-700 hover:bg-brand-slate-900 text-brand-slate-300 hover:text-white transition-all text-left cursor-pointer"
                    >
                      <span className="truncate">Revit BIM Object (RVT)</span>
                      <Download className="w-3.5 h-3.5 text-brand-terracotta-500 shrink-0 ml-2" />
                    </button>
                    <button
                      onClick={() => handleDownload("CAD Details (DWG)", activeQuickView.name)}
                      className="flex items-center justify-between px-3 py-2 bg-brand-slate-950 border border-brand-slate-800 rounded-xl text-xs font-semibold hover:border-brand-slate-700 hover:bg-brand-slate-900 text-brand-slate-300 hover:text-white transition-all text-left cursor-pointer"
                    >
                      <span className="truncate">CAD Detail Drawing (DWG)</span>
                      <Download className="w-3.5 h-3.5 text-brand-terracotta-500 shrink-0 ml-2" />
                    </button>
                    <button
                      onClick={() => handleDownload("Installation Guide (PDF)", activeQuickView.name)}
                      className="flex items-center justify-between px-3 py-2 bg-brand-slate-950 border border-brand-slate-800 rounded-xl text-xs font-semibold hover:border-brand-slate-700 hover:bg-brand-slate-900 text-brand-slate-300 hover:text-white transition-all text-left cursor-pointer"
                    >
                      <span className="truncate">Installation Manual</span>
                      <Download className="w-3.5 h-3.5 text-brand-terracotta-500 shrink-0 ml-2" />
                    </button>
                  </div>
                </div>

                <div className="flex gap-3 mt-2 w-full">
                  <Link
                    href={`/products/${activeQuickView.id}`}
                    onClick={() => setActiveQuickView(null)}
                    className="flex-1 bg-brand-slate-950 border border-brand-slate-800 hover:bg-brand-slate-900 text-brand-slate-200 font-bold py-3.5 rounded-xl transition-all text-center text-sm cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    Full Details Page
                    <ArrowRight className="w-4 h-4 text-brand-terracotta-500" />
                  </Link>
                  <button
                    onClick={() => {
                      setActiveQuickView(null);
                      handleQuickInquiry(activeQuickView.name);
                    }}
                    className="flex-1 bg-brand-terracotta-600 hover:bg-brand-terracotta-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-brand-terracotta-600/30 transition-all text-center text-sm cursor-pointer"
                  >
                    Request Pricing
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
