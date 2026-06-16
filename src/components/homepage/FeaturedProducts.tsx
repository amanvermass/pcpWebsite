"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, ArrowRight, Download, X } from "lucide-react";
import { useToast } from "../ui/Toast";
import { ImageReveal, TextReveal } from "../ui/ScrollReveal";
import Link from "next/link";
import { products, Product } from "../../data/products";
import { Magnetic } from "../ui/Magnetic";

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
      const messageTextarea = document.querySelector("#contact-message") as HTMLTextAreaElement;
      if (messageTextarea) {
        messageTextarea.value = `I am interested in ordering/inquiring about the: ${productName}. Please provide availability and a cost quotation.`;
      }
    }
  };

  return (
    <section id="products" className="py-24 bg-brand-black relative">
      {/* Structural Lines */}
      <div className="absolute inset-0 pointer-events-none z-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-4 h-full opacity-10">
        <div className="border-l border-brand-slate h-full" />
        <div className="border-l border-brand-slate h-full" />
        <div className="border-l border-brand-slate h-full" />
        <div className="border-l border-brand-slate h-full border-r" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center">
          <span className="text-[10px] uppercase font-bold tracking-[0.35em] text-brand-gold bg-brand-gold/5 px-4 py-1.5 border border-brand-gold/20 rounded-none w-fit">
            Product Catalog
          </span>
          <TextReveal
            text="High-Performance Materials"
            className="text-3xl sm:text-4xl lg:text-5xl font-normal font-cormorant text-brand-offwhite mt-6 tracking-wide justify-center text-center w-full"
          />
          <p className="text-brand-sand/70 mt-4 text-sm sm:text-base font-poppins max-w-2xl leading-relaxed">
            Explore our architectural-grade product ranges engineered for structural endurance, thermal insulation, and visual brilliance.
          </p>
        </div>

        {/* Category Filters */}
        {!teaser && (
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-6 py-3 rounded-none text-xs uppercase font-poppins tracking-[0.2em] font-medium transition-colors cursor-pointer border ${
                  selectedCategory === cat
                    ? "bg-brand-gold text-brand-black border-brand-gold"
                    : "bg-brand-charcoal text-brand-sand border-brand-gold/15 hover:border-brand-gold/50"
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
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group rounded-none border border-brand-gold/10 bg-brand-charcoal flex flex-col justify-between hover:border-brand-gold/40 transition-colors shadow-xl"
              >
                {/* Product Image */}
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-brand-black border-b border-brand-gold/10">
                  <ImageReveal>
                    <img
                      src={p.image}
                      alt={p.name}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700"
                    />
                  </ImageReveal>
                  <div className="absolute top-4 left-4 bg-[#121110]/95 text-brand-gold border border-brand-gold/20 text-[9px] uppercase font-bold tracking-widest px-3 py-1.5 rounded-none z-10">
                    {p.category}
                  </div>
                  
                  {/* Hover Quick View Overlay */}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 z-10">
                    <button
                      onClick={() => setActiveQuickView(p)}
                      className="p-3.5 bg-brand-gold text-brand-black hover:scale-110 transition-transform shadow-lg cursor-pointer rounded-none border border-brand-gold"
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
                      <h3 className="text-xl font-normal font-cormorant text-brand-offwhite group-hover:text-brand-gold transition-colors leading-tight">
                        {p.name}
                      </h3>
                    </Link>
                    <p className="text-xs font-poppins text-brand-sand/70 mt-3 leading-relaxed">
                      {p.desc}
                    </p>
                  </div>

                  {/* Actions */}
                  <div className="mt-6 flex items-center gap-3 pt-4 border-t border-brand-gold/10">
                    <Link
                      href={`/products/${p.id}`}
                      className="flex-1 text-center py-3 rounded-none text-[10px] uppercase font-poppins tracking-wider font-semibold bg-brand-black text-brand-sand hover:text-brand-offwhite border border-brand-gold/15 hover:border-brand-gold/50 transition-colors cursor-pointer"
                    >
                      Specs
                    </Link>
                    <button
                      onClick={() => handleQuickInquiry(p.name)}
                      className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-none text-[10px] uppercase font-poppins tracking-wider font-semibold bg-brand-gold/10 text-brand-gold hover:bg-brand-gold hover:text-brand-black transition-colors border border-brand-gold/30 hover:border-brand-gold cursor-pointer"
                    >
                      Quote
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
            <Magnetic>
              <Link
                href="/products"
                className="inline-flex items-center gap-2 bg-brand-gold hover:bg-brand-sand text-brand-black px-8 py-4 rounded-none font-semibold uppercase tracking-[0.2em] font-poppins text-xs transition-colors border border-brand-gold cursor-pointer"
              >
                Explore Full Clay Catalog
                <ArrowRight className="w-4 h-4" />
              </Link>
            </Magnetic>
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
              className="absolute inset-0 bg-black/75 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-brand-charcoal rounded-none overflow-hidden border border-brand-gold/25 shadow-2xl flex flex-col md:flex-row max-h-[90vh] md:max-h-none overflow-y-auto md:overflow-visible"
            >
              {/* Image half */}
              <div className="md:w-1/2 relative min-h-[250px] md:min-h-full bg-brand-black">
                <img
                  src={activeQuickView.image}
                  alt={activeQuickView.name}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal md:bg-gradient-to-r md:from-transparent md:to-brand-charcoal" />
                <button
                  onClick={() => setActiveQuickView(null)}
                  className="absolute top-4 left-4 p-2 bg-[#121110]/85 text-brand-offwhite rounded-none md:hidden border border-brand-gold/20"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Data Specifications half */}
              <div className="p-6 md:p-8 md:w-1/2 flex flex-col justify-between gap-6 max-h-[70vh] md:max-h-[85vh] overflow-y-auto">
                <div className="hidden md:flex justify-between items-center">
                  <span className="text-[9px] uppercase tracking-widest text-brand-gold font-bold font-poppins">
                    {activeQuickView.category} TECHNICAL FILE
                  </span>
                  <button
                    onClick={() => setActiveQuickView(null)}
                    className="p-1.5 hover:bg-brand-black text-brand-sand hover:text-brand-offwhite border border-transparent hover:border-brand-gold/20 rounded-none transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div>
                  <h3 className="text-3xl font-normal font-cormorant text-brand-offwhite leading-tight">
                    {activeQuickView.name}
                  </h3>
                  <p className="text-xs font-poppins text-brand-sand/75 mt-3 leading-relaxed">
                    {activeQuickView.desc}
                  </p>
                </div>

                {/* Specs Grid */}
                <div>
                  <h4 className="text-[10px] uppercase font-bold tracking-[0.2em] text-brand-gold border-b border-brand-gold/10 pb-2 mb-4 font-poppins">
                    Structural Specifications
                  </h4>
                  <div className="grid grid-cols-2 gap-y-3 gap-x-4">
                    <div>
                      <span className="block text-[9px] text-brand-sand/50 uppercase font-semibold font-poppins">Dimensions</span>
                      <span className="text-sm font-semibold text-brand-offwhite font-poppins">
                        {activeQuickView.specs.length} × {activeQuickView.specs.width} × {activeQuickView.specs.height}
                      </span>
                    </div>
                    <div>
                      <span className="block text-[9px] text-brand-sand/50 uppercase font-semibold font-poppins">Dry Weight</span>
                      <span className="text-sm font-semibold text-brand-offwhite font-poppins">{activeQuickView.specs.weight}</span>
                    </div>
                    <div>
                      <span className="block text-[9px] text-brand-sand/50 uppercase font-semibold font-poppins">Density</span>
                      <span className="text-sm font-semibold text-brand-offwhite font-poppins">{activeQuickView.specs.density}</span>
                    </div>
                    <div>
                      <span className="block text-[9px] text-brand-sand/50 uppercase font-semibold font-poppins">Water Absorption</span>
                      <span className="text-sm font-semibold text-brand-offwhite font-poppins">{activeQuickView.specs.waterAbsorption}</span>
                    </div>
                    <div>
                      <span className="block text-[9px] text-brand-sand/50 uppercase font-semibold font-poppins">Compressive Strength</span>
                      <span className="text-sm font-semibold text-brand-gold font-poppins">{activeQuickView.specs.compStrength}</span>
                    </div>
                    <div>
                      <span className="block text-[9px] text-brand-sand/50 uppercase font-semibold font-poppins">Fire Resistance</span>
                      <span className="text-sm font-semibold text-brand-offwhite font-poppins">{activeQuickView.specs.fireResistance}</span>
                    </div>
                    {activeQuickView.specs.thermalInsulation && (
                      <div className="col-span-2">
                        <span className="block text-[9px] text-brand-sand/50 uppercase font-semibold font-poppins">Thermal Conductivity (λ)</span>
                        <span className="text-sm font-semibold text-brand-gold font-poppins">{activeQuickView.specs.thermalInsulation}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Downloads Action Panel */}
                <div>
                  <h4 className="text-[10px] uppercase font-bold tracking-[0.2em] text-brand-gold border-b border-brand-gold/10 pb-2 mb-4 font-poppins">
                    Architect CAD & BIM Downloads
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <button
                      onClick={() => handleDownload("Datasheet (PDF)", activeQuickView.name)}
                      className="flex items-center justify-between px-3 py-2.5 bg-brand-black border border-brand-gold/10 rounded-none text-[10px] uppercase tracking-wider font-poppins font-medium hover:border-brand-gold/40 text-brand-sand hover:text-brand-offwhite transition-colors text-left cursor-pointer"
                    >
                      <span className="truncate">Datasheet (PDF)</span>
                      <Download className="w-3.5 h-3.5 text-brand-gold shrink-0 ml-2" />
                    </button>
                    <button
                      onClick={() => handleDownload("Revit Object (RVT)", activeQuickView.name)}
                      className="flex items-center justify-between px-3 py-2.5 bg-brand-black border border-brand-gold/10 rounded-none text-[10px] uppercase tracking-wider font-poppins font-medium hover:border-brand-gold/40 text-brand-sand hover:text-brand-offwhite transition-colors text-left cursor-pointer"
                    >
                      <span className="truncate">Revit BIM (RVT)</span>
                      <Download className="w-3.5 h-3.5 text-brand-gold shrink-0 ml-2" />
                    </button>
                    <button
                      onClick={() => handleDownload("CAD Details (DWG)", activeQuickView.name)}
                      className="flex items-center justify-between px-3 py-2.5 bg-brand-black border border-brand-gold/10 rounded-none text-[10px] uppercase tracking-wider font-poppins font-medium hover:border-brand-gold/40 text-brand-sand hover:text-brand-offwhite transition-colors text-left cursor-pointer"
                    >
                      <span className="truncate">CAD Details (DWG)</span>
                      <Download className="w-3.5 h-3.5 text-brand-gold shrink-0 ml-2" />
                    </button>
                    <button
                      onClick={() => handleDownload("Installation Guide (PDF)", activeQuickView.name)}
                      className="flex items-center justify-between px-3 py-2.5 bg-brand-black border border-brand-gold/10 rounded-none text-[10px] uppercase tracking-wider font-poppins font-medium hover:border-brand-gold/40 text-brand-sand hover:text-brand-offwhite transition-colors text-left cursor-pointer"
                    >
                      <span className="truncate">Installation Guide</span>
                      <Download className="w-3.5 h-3.5 text-brand-gold shrink-0 ml-2" />
                    </button>
                  </div>
                </div>

                <div className="flex gap-3 mt-2 w-full">
                  <Link
                    href={`/products/${activeQuickView.id}`}
                    onClick={() => setActiveQuickView(null)}
                    className="flex-1 bg-brand-black border border-brand-gold/20 hover:bg-brand-charcoal text-brand-sand font-poppins uppercase tracking-wider font-semibold py-3.5 rounded-none transition-colors text-center text-xs cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    Full Details
                    <ArrowRight className="w-4 h-4 text-brand-gold" />
                  </Link>
                  <button
                    onClick={() => {
                      setActiveQuickView(null);
                      handleQuickInquiry(activeQuickView.name);
                    }}
                    className="flex-1 bg-brand-gold hover:bg-brand-sand text-brand-black font-poppins uppercase tracking-wider font-bold py-3.5 rounded-none transition-colors border border-brand-gold text-center text-xs cursor-pointer"
                  >
                    Request Quote
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
