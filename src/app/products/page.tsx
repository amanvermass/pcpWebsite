"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/homepage/Header";
import { Footer } from "@/components/homepage/Footer";
import { products, Product } from "@/data/products";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { Eye, X, ArrowRight, Download, Filter, Ruler, FileText, HardHat } from "lucide-react";
import { ToastProvider, useToast } from "@/components/ui/Toast";
import { Magnetic } from "@/components/ui/Magnetic";
import { ImageReveal, ScrollReveal } from "@/components/ui/ScrollReveal";

function CatalogContent() {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeQuickView, setActiveQuickView] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Parallax Scroll Tracking for Hero
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const heroImageY = useTransform(scrollY, [0, 500], [0, 120]);
  const heroTextY = useTransform(scrollY, [0, 500], [0, -40]);

  useEffect(() => {
    const category = searchParams.get("category");
    if (category) {
      setSelectedCategory(category);
    } else {
      setSelectedCategory("All");
    }
  }, [searchParams]);

  // Initial page load simulation (only on mount)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  const categories = ["All", "Clay Bricks", "Terracotta", "Roofing Tiles", "Pavers", "Hollow Blocks", "Terraplasts"];

  const filteredProducts = selectedCategory === "All"
    ? products
    : products.filter((p) => p.category === selectedCategory);

  const handleDownload = (docType: string, productName: string) => {
    toast(`Successfully started download: ${productName} - ${docType}`, "success");
  };

  return (
    <div className="flex flex-col min-h-screen bg-brand-black text-brand-offwhite">

      {/* Parallax Hero Banner */}
      <div
        ref={heroRef}
        className="relative h-[55vh] md:h-[65vh] w-full flex items-center overflow-hidden bg-brand-slate-950"
      >
        <motion.div
          style={{ y: heroImageY }}
          className="absolute inset-0 z-0 scale-100 opacity-90"
        >
          <img
            src="/images/projects/project-48.jpg"
            alt="Commercial facade architectural grid"
            className="w-full h-full object-cover object-center"
          />
        </motion.div>

        {/* Hero content */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div 
            style={{ y: heroTextY }} 
            className="max-w-2xl bg-brand-charcoal/60 border border-brand-gold/15 p-8 md:p-10 backdrop-blur-md"
          >
            <span className="text-[10px] uppercase font-bold tracking-[0.35em] text-brand-gold bg-brand-gold/10 px-4 py-1.5 border border-brand-gold/20 rounded-none w-fit block mb-4">
              PCP Materials Library
            </span>
            <h1 className="text-3xl sm:text-5xl font-normal font-cormorant text-brand-offwhite tracking-wide leading-tight mt-2">
              Architectural Product Catalog
            </h1>
            <p className="text-brand-sand/90 mt-4 text-xs sm:text-sm font-poppins leading-relaxed max-w-xl">
              Browse our high-performance building materials, structural components, and masonry solutions designed for next-generation architectural projects.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Category Filter Sticky Bar */}
      <div className="relative z-10 bg-brand-charcoal/95 border-y border-brand-gold/10 py-4.5 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-2 text-brand-sand/50 text-xs font-bold uppercase tracking-widest shrink-0 font-poppins">
            <Filter className="w-4 h-4 text-brand-gold" />
            <span>Filter Category:</span>
          </div>
          <div className="flex gap-2.5 relative">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`relative px-5 py-2.5 rounded-none text-[10px] uppercase tracking-wider font-poppins font-medium transition-colors cursor-pointer border ${selectedCategory === cat
                  ? "bg-brand-gold text-brand-black border-brand-gold"
                  : "bg-brand-black border-brand-gold/10 text-brand-sand hover:text-brand-offwhite hover:border-brand-gold/40"
                  }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main catalog view */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16 z-10">
        <div className="space-y-8">
          {isLoading ? (
            /* Skeletal Loading Grid */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
              {Array.from({ length: 6 }).map((_, index) => (
                <ProductCardSkeleton key={index} index={index} />
              ))}
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-20 bg-brand-charcoal border border-brand-gold/10 rounded-none">
              <p className="text-brand-sand/60 text-sm font-poppins">No products found in this category.</p>
            </div>
          ) : (
            /* Staggered dynamic filtering layout with AnimatePresence & layout transitions */
            <motion.div
              layout
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start"
              style={{ perspective: "1200px" }}
            >
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((p, index) => (
                  <motion.div
                    key={p.id}
                    layout
                    initial={{ opacity: 0, scale: 0.88, rotateX: 28, y: 70, transformOrigin: "top center" }}
                    whileInView={{ opacity: 1, scale: 1, rotateX: 0, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    exit={{ opacity: 0, scale: 0.92, y: 20 }}
                    transition={{
                      duration: 0.95,
                      delay: (index % 3) * 0.08,
                      ease: [0.16, 1, 0.3, 1],
                      layout: { type: "spring", stiffness: 220, damping: 28 },
                    }}
                    className="w-full"
                    style={{ transformStyle: "preserve-3d" }}
                  >
                    <ProductCard
                      product={p}
                      index={index}
                      onQuickView={setActiveQuickView}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </main>

      {/* Right Slide-out Specifications Panel Drawer */}
      <AnimatePresence>
        {activeQuickView && (
          <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveQuickView(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />

            {/* Spec Drawer Container */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "tween", ease: [0.16, 1, 0.3, 1], duration: 0.6 }}
              className="relative w-full max-w-md md:max-w-lg h-full bg-brand-charcoal border-l border-brand-gold/15 shadow-2xl flex flex-col justify-between z-10 text-left p-6 md:p-8"
            >
              <div>
                {/* Header Row */}
                <div className="flex justify-between items-center pb-4 border-b border-brand-gold/10 mb-6">
                  <span className="text-[9px] uppercase tracking-widest text-brand-gold font-bold font-poppins">
                    {activeQuickView.category} spec panel
                  </span>
                  <button
                    onClick={() => setActiveQuickView(null)}
                    className="p-1.5 hover:bg-brand-black border border-transparent hover:border-brand-gold/15 text-brand-sand hover:text-brand-offwhite transition-colors cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Details layout */}
                <div className="space-y-6">
                  <div className="aspect-[16/10] w-full overflow-hidden border border-brand-gold/10 bg-brand-black">
                    <img src={activeQuickView.image} alt={activeQuickView.name} className="object-cover w-full h-full" />
                  </div>

                  <div>
                    <h3 className="text-2xl sm:text-3xl font-normal font-cormorant text-brand-offwhite leading-tight">
                      {activeQuickView.name}
                    </h3>
                    <p className="text-xs font-poppins text-brand-sand/70 mt-3 leading-relaxed">
                      {activeQuickView.desc}
                    </p>
                  </div>

                  {/* Specs Table */}
                  <div>
                    <h4 className="text-[10px] uppercase font-bold tracking-[0.2em] text-brand-gold border-b border-brand-gold/10 pb-2 mb-3 font-poppins">
                      Technical specs file
                    </h4>
                    <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-xs font-poppins text-brand-sand/85">
                      <div className="border-b border-brand-gold/5 pb-2">
                        <span className="block text-[8px] text-brand-sand/40 uppercase font-semibold">Dimensions</span>
                        <span className="font-semibold text-brand-offwhite">{activeQuickView.specs.length}x{activeQuickView.specs.width}x{activeQuickView.specs.height}</span>
                      </div>
                      <div className="border-b border-brand-gold/5 pb-2">
                        <span className="block text-[8px] text-brand-sand/40 uppercase font-semibold">Dry Weight</span>
                        <span className="font-semibold text-brand-offwhite">{activeQuickView.specs.weight}</span>
                      </div>
                      <div className="border-b border-brand-gold/5 pb-2">
                        <span className="block text-[8px] text-brand-sand/40 uppercase font-semibold">Density</span>
                        <span className="font-semibold text-brand-offwhite">{activeQuickView.specs.density}</span>
                      </div>
                      <div className="border-b border-brand-gold/5 pb-2">
                        <span className="block text-[8px] text-brand-sand/40 uppercase font-semibold">Water Absorption</span>
                        <span className="font-semibold text-brand-offwhite">{activeQuickView.specs.waterAbsorption}</span>
                      </div>
                      <div className="border-b border-brand-gold/5 pb-2 col-span-2">
                        <span className="block text-[8px] text-brand-sand/40 uppercase font-semibold">Compressive Strength</span>
                        <span className="font-semibold text-brand-gold">{activeQuickView.specs.compStrength}</span>
                      </div>
                    </div>
                  </div>

                  {/* CAD Tab triggers */}
                  <div>
                    <h4 className="text-[10px] uppercase font-bold tracking-[0.2em] text-brand-gold border-b border-brand-gold/10 pb-2 mb-3 font-poppins">
                      Architect CAD resources
                    </h4>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => handleDownload("Datasheet (PDF)", activeQuickView.name)}
                        className="flex items-center justify-between px-3 py-2 bg-brand-black border border-brand-gold/10 rounded-none text-[9px] uppercase tracking-wider font-poppins font-medium hover:border-brand-gold/40 text-brand-sand hover:text-brand-offwhite transition-colors cursor-pointer"
                      >
                        <span className="truncate">Datasheet (PDF)</span>
                        <Download className="w-3.5 h-3.5 text-brand-gold" />
                      </button>
                      <button
                        onClick={() => handleDownload("Revit (RVT)", activeQuickView.name)}
                        className="flex items-center justify-between px-3 py-2 bg-brand-black border border-brand-gold/10 rounded-none text-[9px] uppercase tracking-wider font-poppins font-medium hover:border-brand-gold/40 text-brand-sand hover:text-brand-offwhite transition-colors cursor-pointer"
                      >
                        <span className="truncate">Revit BIM (RVT)</span>
                        <Download className="w-3.5 h-3.5 text-brand-gold" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex gap-3 mt-6 border-t border-brand-gold/10 pt-6">
                <Link
                  href={`/products/${activeQuickView.id}`}
                  onClick={() => setActiveQuickView(null)}
                  className="flex-1 bg-brand-black border border-brand-gold/20 hover:bg-brand-charcoal text-brand-sand font-poppins uppercase tracking-wider font-semibold py-3.5 rounded-none transition-colors text-center text-[10px] cursor-pointer flex items-center justify-center gap-1"
                >
                  Full Details Page
                  <ArrowRight className="w-3.5 h-3.5 text-brand-gold" />
                </Link>
                <Link
                  href={`/products/${activeQuickView.id}#inquire`}
                  onClick={() => setActiveQuickView(null)}
                  className="flex-1 bg-brand-gold hover:bg-brand-sand text-brand-black font-poppins uppercase tracking-wider font-bold py-3.5 rounded-none transition-colors border border-brand-gold text-center text-[10px] cursor-pointer"
                >
                  Request Quote
                </Link>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

const ProductCardSkeleton: React.FC<{ index: number }> = ({ index }) => {
  const aspectRatios = ["aspect-[4/3]", "aspect-[16/10]", "aspect-[1/1]"];
  const aspectClass = aspectRatios[index % aspectRatios.length];

  return (
    <div className="rounded-none border border-brand-gold/5 bg-brand-charcoal/30 flex flex-col justify-between overflow-hidden relative">
      <div className={`relative ${aspectClass} w-full bg-brand-black/50 border-b border-brand-gold/5 overflow-hidden`}>
        {/* Shimmer sweep overlay */}
        <motion.div
          animate={{ x: ["-100%", "100%"] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "linear" }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-gold/10 to-transparent -skew-x-12 pointer-events-none"
        />
      </div>
      <div className="p-6 flex-grow flex flex-col justify-between gap-4">
        <div className="space-y-3 font-poppins">
          {/* Title bar with pulse */}
          <div className="h-6 bg-brand-black/50 w-3/4 rounded-none animate-pulse" />
          {/* Description line pulses */}
          <div className="space-y-2">
            <div className="h-3 bg-brand-black/30 w-full rounded-none animate-pulse" />
            <div className="h-3 bg-brand-black/30 w-5/6 rounded-none animate-pulse" />
          </div>
        </div>
        {/* Buttons pulse */}
        <div className="mt-6 flex gap-3 pt-4 border-t border-brand-gold/5">
          <div className="h-10 bg-brand-black/50 flex-1 rounded-none animate-pulse" />
          <div className="h-10 bg-brand-black/30 flex-1 rounded-none animate-pulse" />
        </div>
      </div>
    </div>
  );
};

function ProductCard({ product, index, onQuickView }: { product: Product; index: number; onQuickView: (p: Product) => void }) {
  const cardRef = useRef<HTMLDivElement>(null);

  // 3D tilt coordinates
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 300, damping: 24 });
  const springY = useSpring(y, { stiffness: 300, damping: 24 });

  const rotateX = useTransform(springY, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-10, 10]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const relativeX = (e.clientX - rect.left) / rect.width - 0.5;
    const relativeY = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(relativeX);
    y.set(relativeY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  // Vary aspect ratios dynamically based on catalog grid index to create a clean masonry layout
  const aspectRatios = ["aspect-[4/3]", "aspect-[16/10]", "aspect-[1/1]"];
  const aspectClass = aspectRatios[index % aspectRatios.length];

  return (
    <div
      className="perspective-[1000px] w-full"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div
        ref={cardRef}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d"
        }}
        className="group rounded-none border border-brand-gold/10 bg-brand-charcoal flex flex-col justify-between hover:border-brand-gold/45 hover:shadow-[0_0_25px_rgba(197,139,69,0.12)] transition-[border-color,box-shadow] ease-out duration-300 cursor-pointer"
      >
        <div className={`relative ${aspectClass} w-full overflow-hidden bg-brand-black border-b border-brand-gold/10`}>
          <ImageReveal>
            <img
              src={product.image}
              alt={product.name}
              className="object-cover w-full h-full"
            />
          </ImageReveal>
          <div className="absolute top-4 left-4 bg-[#121110]/95 text-brand-gold border border-brand-gold/15 text-[9px] uppercase font-bold tracking-widest px-3 py-1.5 rounded-none">
            {product.category}
          </div>

          {/* Quick view spec trigger */}
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button
              onClick={() => onQuickView(product)}
              className="p-3 bg-brand-gold border border-brand-gold text-brand-black hover:scale-110 transition-transform cursor-pointer rounded-none"
              title="Quick View Technical Specs"
            >
              <Eye className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="p-6 flex-grow flex flex-col justify-between" style={{ transform: "translateZ(20px)" }}>
          <div>
            <Link href={`/products/${product.id}`}>
              <h3 className="text-xl font-normal font-cormorant text-brand-offwhite group-hover:text-brand-gold transition-colors leading-tight">
                {product.name}
              </h3>
            </Link>
            <p className="text-xs font-poppins text-brand-sand/70 mt-3 leading-relaxed">
              {product.desc}
            </p>
          </div>

          <div className="mt-6 flex items-center gap-3 pt-4 border-t border-brand-gold/10">
            <Link
              href={`/products/${product.id}`}
              className="flex-1 text-center py-3 rounded-none text-[10px] uppercase font-poppins tracking-wider font-semibold bg-brand-black text-brand-sand hover:text-brand-offwhite border border-brand-gold/15 hover:border-brand-gold/50 transition-colors cursor-pointer"
            >
              Full details
            </Link>

            <button
              onClick={() => onQuickView(product)}
              className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-none text-[10px] uppercase font-poppins tracking-wider font-semibold bg-brand-gold/10 text-brand-gold hover:bg-brand-gold hover:text-brand-black transition-colors border border-brand-gold/30 hover:border-brand-gold cursor-pointer"
            >
              Specs Info
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
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
          <div className="flex-grow flex items-center justify-center min-h-[50vh] bg-brand-black text-brand-sand">
            <span className="w-8 h-8 rounded-full border-2 border-brand-gold border-t-transparent animate-spin" />
          </div>
        }>
          <CatalogContent />
        </Suspense>
        <Footer />
      </div>
    </ToastProvider>
  );
}
