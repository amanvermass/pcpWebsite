"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/homepage/Header";
import { ContactUs } from "@/components/homepage/ContactUs";
import { products, Product } from "@/data/products";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, X, ArrowRight, Download, Filter } from "lucide-react";
import { ToastProvider, useToast } from "@/components/ui/Toast";

function CatalogContent() {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeQuickView, setActiveQuickView] = useState<Product | null>(null);

  useEffect(() => {
    const category = searchParams.get("category");
    if (category) {
      setSelectedCategory(category);
    } else {
      setSelectedCategory("All");
    }
  }, [searchParams]);

  const categories = ["All", "Clay Bricks", "Terracotta", "Roofing Tiles", "Pavers", "Hollow Blocks", "AAC Blocks"];

  const filteredProducts = selectedCategory === "All"
    ? products
    : products.filter((p) => p.category === selectedCategory);

  const handleDownload = (docType: string, productName: string) => {
    toast(`Successfully started download: ${productName} - ${docType}`, "success");
  };

  // Render products continuously when All is selected

  return (
    <div className="flex flex-col min-h-screen bg-brand-slate-950">
      <div className="pt-24 pb-12 bg-brand-slate-900 bg-grid-pattern border-b border-brand-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


          {/* Section title */}
          <div className="max-w-3xl">
            <span className="text-xs uppercase font-extrabold tracking-widest text-brand-terracotta-500 bg-brand-terracotta-500/10 px-3 py-1 rounded-full">
              PCP Materials Library
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mt-4 tracking-tight">
              Architectural Product Range
            </h1>
            <p className="text-brand-slate-400 mt-4 text-base sm:text-lg leading-relaxed">
              Browse our high-performance building materials, structural components, and masonry solutions designed for next-generation architectural projects.
            </p>
          </div>
        </div>
      </div>

      {/* Category filter panel */}
      <div className="sticky top-[72px] z-30 bg-brand-slate-950/80 backdrop-blur-md border-b border-brand-slate-800/60 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-2 text-brand-slate-400 text-sm font-bold shrink-0">
            <Filter className="w-4 h-4 text-brand-terracotta-500" />
            <span>Filter Categories:</span>
          </div>
          <div className="flex gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer whitespace-nowrap border ${
                  selectedCategory === cat
                    ? "bg-brand-terracotta-600 border-brand-terracotta-600 text-white shadow-md shadow-brand-terracotta-600/20"
                    : "bg-brand-slate-900 border-brand-slate-800 text-brand-slate-400 hover:text-white"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main catalog view */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-brand-slate-900 rounded-3xl border border-brand-slate-800">
              <p className="text-brand-slate-400 font-semibold">No products found in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProducts.map((p) => (
                <ProductCard key={p.id} product={p} onQuickView={setActiveQuickView} />
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Technical Spec Quick View Overlay */}
      <AnimatePresence>
        {activeQuickView && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveQuickView(null)}
              className="absolute inset-0 bg-brand-slate-950/80 backdrop-blur-md"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-4xl bg-brand-slate-900 rounded-3xl overflow-hidden border border-brand-slate-800 shadow-2xl flex flex-col md:flex-row max-h-[90vh] md:max-h-none overflow-y-auto md:overflow-visible z-10"
            >
              <div className="md:w-1/2 relative min-h-[250px] md:min-h-full bg-brand-slate-950">
                <img src={activeQuickView.image} alt={activeQuickView.name} className="object-cover w-full h-full" />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-slate-900 md:bg-gradient-to-r md:from-transparent md:to-brand-slate-900" />
                <button
                  onClick={() => setActiveQuickView(null)}
                  className="absolute top-4 left-4 p-2 bg-brand-slate-950/70 text-white rounded-full md:hidden border border-brand-slate-800"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 md:p-8 md:w-1/2 flex flex-col justify-between gap-6 max-h-[70vh] md:max-h-[85vh] overflow-y-auto">
                <div className="hidden md:flex justify-between items-center">
                  <span className="text-[10px] uppercase tracking-widest text-brand-terracotta-500 font-bold">
                    {activeQuickView.category} Specifications File
                  </span>
                  <button
                    onClick={() => setActiveQuickView(null)}
                    className="p-1.5 hover:bg-brand-slate-800 text-brand-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div>
                  <h3 className="text-2xl font-extrabold text-white leading-tight">{activeQuickView.name}</h3>
                  <p className="text-sm text-brand-slate-400 mt-2 leading-relaxed">{activeQuickView.desc}</p>
                </div>

                {/* Specs Grid */}
                <div>
                  <h4 className="text-xs uppercase font-extrabold tracking-widest text-brand-slate-400 border-b border-brand-slate-800 pb-2 mb-3">
                    Technical Specifications
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
                    CAD & BIM Resources
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
                  <Link
                    href={`/products/${activeQuickView.id}#inquire`}
                    onClick={() => setActiveQuickView(null)}
                    className="flex-grow flex items-center justify-center bg-brand-terracotta-600 hover:bg-brand-terracotta-700 text-white font-bold py-3.5 rounded-xl shadow-lg shadow-brand-terracotta-600/30 transition-all text-center text-sm cursor-pointer"
                  >
                    Request Quote
                  </Link>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ProductCard({ product, onQuickView }: { product: Product; onQuickView: (p: Product) => void }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.3 }}
      className="group rounded-2xl overflow-hidden border border-brand-slate-800 bg-brand-slate-900/50 hover:bg-brand-slate-900 flex flex-col justify-between hover:border-brand-slate-700 transition-all hover:shadow-2xl hover:shadow-brand-terracotta-500/5 hover:-translate-y-1"
    >
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-brand-slate-950">
        <img src={product.image} alt={product.name} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
        <div className="absolute top-4 left-4 bg-brand-slate-950/85 backdrop-blur-md text-brand-terracotta-400 border border-brand-slate-850 text-[10px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-md">
          {product.category}
        </div>
        <div className="absolute inset-0 bg-brand-slate-950/45 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
          <button
            onClick={() => onQuickView(product)}
            className="p-3 bg-white text-brand-slate-950 rounded-full hover:scale-110 transition-transform shadow-lg cursor-pointer animate-fade-in"
            title="Quick View Technical Details"
          >
            <Eye className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="p-6 flex-grow flex flex-col justify-between">
        <div>
          <Link href={`/products/${product.id}`}>
            <h3 className="text-xl font-bold text-white group-hover:text-brand-terracotta-400 transition-colors">{product.name}</h3>
          </Link>
          <p className="text-sm text-brand-slate-400 mt-2 leading-relaxed">{product.desc}</p>
        </div>

        <div className="mt-6 flex items-center gap-3 pt-4 border-t border-brand-slate-900">
          <Link
            href={`/products/${product.id}`}
            className="flex-1 text-center py-2.5 rounded-xl text-xs font-bold bg-brand-slate-950 text-brand-slate-300 hover:text-white hover:bg-brand-slate-900 border border-brand-slate-850 transition-colors cursor-pointer"
          >
            Technical Specs
          </Link>
          <Link
            href={`/products/${product.id}#inquire`}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold bg-brand-terracotta-600/20 text-brand-terracotta-400 hover:bg-brand-terracotta-600 hover:text-white transition-all cursor-pointer"
          >
            Request Quote
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}

export default function CatalogPage() {
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
    }
  }, [darkMode]);

  return (
    <ToastProvider>
      <div className="flex flex-col min-h-screen">
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        <Suspense fallback={
          <div className="flex-grow flex items-center justify-center min-h-[50vh] bg-brand-slate-950 text-brand-slate-400">
            <span className="w-8 h-8 rounded-full border-2 border-brand-terracotta-600 border-t-transparent animate-spin" />
          </div>
        }>
          <CatalogContent />
        </Suspense>
        <ContactUs />
      </div>
    </ToastProvider>
  );
}
