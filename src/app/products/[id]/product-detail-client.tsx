"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/homepage/Header";
import { Footer } from "@/components/homepage/Footer";
import { Product, products } from "@/data/products";
import { projects } from "@/data/projects";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Download, Send, Ruler, FileText, HardHat, FileSpreadsheet, Calculator, CheckCircle2, Info, X } from "lucide-react";
import { ToastProvider, useToast } from "@/components/ui/Toast";
import confetti from "canvas-confetti";
import { Magnetic } from "@/components/ui/Magnetic";
import { ImageReveal, ScrollReveal } from "@/components/ui/ScrollReveal";

interface ProductDetailClientProps {
  product: Product;
}

const ProductCardSkeleton: React.FC<{ index: number }> = ({ index }) => {
  const aspectRatios = ["aspect-[4/3]", "aspect-[16/10]", "aspect-[1/1]"];
  const aspectClass = aspectRatios[index % aspectRatios.length];

  return (
    <div className="rounded-none border border-brand-gold/5 bg-brand-charcoal/30 flex flex-col justify-between overflow-hidden relative h-full">
      <div className={`relative ${aspectClass} w-full bg-brand-black/50 border-b border-brand-gold/5 overflow-hidden`}>
        {/* Shimmer sweep overlay */}
        <motion.div
          animate={{ x: ["-100%", "100%"] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: "linear" }}
          className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-gold/10 to-transparent -skew-x-12 pointer-events-none"
        />
      </div>
      <div className="p-5 flex-grow flex flex-col justify-between gap-4">
        <div className="space-y-3 font-poppins">
          {/* Title bar with pulse */}
          <div className="h-5 bg-brand-black/50 w-3/4 rounded-none animate-pulse" />
          {/* Description line pulses */}
          <div className="space-y-2">
            <div className="h-3 bg-brand-black/30 w-full rounded-none animate-pulse" />
            <div className="h-3 bg-brand-black/30 w-5/6 rounded-none animate-pulse" />
          </div>
        </div>
        {/* Link pulse */}
        <div className="h-4 bg-brand-black/40 w-1/3 rounded-none animate-pulse mt-4" />
      </div>
    </div>
  );
};

function DetailContent({ product }: ProductDetailClientProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = React.useState(true);

  // Trigger loading effect when product changes (navigating between related details)
  React.useEffect(() => {
    setIsLoading(true);
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, [product.id]);

  // Multi-image gallery state
  const galleryImages = [
    product.image,
    "/images/hero-1.jpg", // Clay Close-up
    "/images/hero-4.jpg", // Stacked units
    "/images/hero-3.jpg"  // Applied facade
  ];
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  // Form states
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [userRole, setUserRole] = useState("Architect");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [message, setMessage] = useState(
    `I am requesting a cost quotation and sample availability for the ${product.name}.`
  );
  const [submitting, setSubmitting] = useState(false);

  // Calculator states
  const [wallLength, setWallLength] = useState<number>(10);
  const [wallHeight, setWallHeight] = useState<number>(3);
  const [wastageMargin, setWastageMargin] = useState<number>(10); // 10%
  const [calculatedArea, setCalculatedArea] = useState<number>(30);
  const [estimatedUnits, setEstimatedUnits] = useState<number>(0);
  const [totalWithWastage, setTotalWithWastage] = useState<number>(0);

  // Variation A: Ecotherm Savings Calculator States
  const [savingsArea, setSavingsArea] = useState<number>(500);
  const [savingsState, setSavingsState] = useState<string>("Delhi");

  // Recalculate quantities when length/height changes
  useEffect(() => {
    const area = wallLength * wallHeight;
    setCalculatedArea(area);

    // Calculate face area of one unit in meters (length x height)
    // Convert specs from mm to meters
    const unitLengthM = parseFloat(product.specs.length) / 1000 || 0.23;
    const unitHeightM = parseFloat(product.specs.height) / 1000 || 0.075;

    // Standard joint thickness (10mm = 0.01m)
    const jointThickness = 0.01;
    const totalUnitArea = (unitLengthM + jointThickness) * (unitHeightM + jointThickness);

    if (totalUnitArea > 0) {
      const baseUnits = Math.ceil(area / totalUnitArea);
      setEstimatedUnits(baseUnits);
      setTotalWithWastage(Math.ceil(baseUnits * (1 + wastageMargin / 100)));
    }
  }, [wallLength, wallHeight, wastageMargin, product]);

  const handleDownload = (docType: string) => {
    toast(`Successfully started download: ${product.name} - ${docType}`, "success");
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      const newLead = {
        id: Math.random().toString(36).substring(2, 9),
        name,
        email,
        phone,
        company,
        userRole,
        state,
        city,
        message,
        productOfInterest: product.name,
        timestamp: new Date().toISOString(),
        stage: "New"
      };

      const existingLeads = JSON.parse(localStorage.getItem("pcp_leads") || "[]");
      existingLeads.push(newLead);
      localStorage.setItem("pcp_leads", JSON.stringify(existingLeads));

      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 },
        colors: ["#C58B45", "#ffffff"]
      });

      toast(`Technical inquiry for ${product.name} submitted successfully! Our sales engineers will contact you shortly.`, "success");
      setSubmitting(false);

      setName("");
      setEmail("");
      setPhone("");
      setCompany("");
      setState("");
      setCity("");
      setIsEnquiryOpen(false);
    }, 1200);
  };

  // Find related products in the same category
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  // Custom Helper to return clean Imperial equivalent sizing
  const getImperialSizing = () => {
    switch (product.id) {
      case "ecotherm-clay-hollow-blocks":
        return '16" × 8" × 8" equivalent';
      case "facing-bricks":
      case "traditional-handmade-bricks":
        return '9" × 4 3/8" × 3" standard';
      case "linea-series":
        return '17 1/4" × 4" × 1 1/2" linear';
      case "clay-pavers":
        return '8" × 4" × 2 3/8" paving';
      case "roofing-tiles":
        return '16 1/2" × 10 1/2" × 1 1/4" tiles';
      default:
        return "Standard Modular sizing";
    }
  };

  // Custom Helper for Coverage/Pack qty
  const getPackQuantity = () => {
    switch (product.id) {
      case "ecotherm-clay-hollow-blocks":
        return "approx. 12.5 units / m² | 96 blocks per pallet";
      case "facing-bricks":
      case "traditional-handmade-bricks":
        return "approx. 50 units / m² | 400 bricks per pallet";
      case "linea-series":
        return "approx. 45 units / m² | 360 slips per crate";
      case "clay-pavers":
        return "approx. 50 units / m² | 420 pavers per pallet";
      case "roofing-tiles":
        return "approx. 10.2 units / m² | 240 tiles per pallet";
      default:
        return "Custom pack quantities available upon request";
    }
  };

  // Find a project that uses this product, or default to the first one
  const featuredProj = projects.find(proj => 
    proj.productsUsed.some(p => p.toLowerCase().includes(product.name.toLowerCase()) || product.name.toLowerCase().includes(p.toLowerCase()))
  ) || projects[0];

  // Pick 3 related products
  const similarProducts = products
    .filter((p) => p.id !== product.id)
    .slice(0, 3);

  const scrollToIntarget = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-brand-black text-brand-offwhite font-poppins">
      
      {/* Breadcrumbs Top Bar */}
      <div className="pt-28 pb-4 bg-brand-charcoal/20 border-b border-brand-gold/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-[10px] sm:text-xs uppercase font-poppins tracking-wider font-semibold text-brand-sand">
            <Link href="/" className="hover:text-brand-offwhite transition-colors cursor-pointer">Home</Link>
            <span className="text-brand-gold/40">›</span>
            <Link href="/products" className="hover:text-brand-offwhite transition-colors cursor-pointer">Products</Link>
            <span className="text-brand-gold/40">›</span>
            <span className="text-brand-offwhite font-bold">{product.h1 || product.name}</span>
          </nav>
        </div>
      </div>

      {/* SECTION 1: Gallery + Product Summary (split layout) */}
      <section className="py-12 bg-brand-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left: Image Gallery */}
            <div className="lg:col-span-7 space-y-4">
              <div className="aspect-[16/10] w-full border border-brand-gold/15 bg-brand-black overflow-hidden relative">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImageIdx}
                    src={galleryImages[activeImageIdx]}
                    alt={`${product.name} facade texture - PCP India`}
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4 }}
                    className="object-cover w-full h-full"
                  />
                </AnimatePresence>
                <div className="absolute top-4 right-4 bg-[#121110]/95 text-brand-gold border border-brand-gold/15 text-[9px] uppercase font-bold tracking-widest px-3 py-1.5 rounded-none z-10">
                  IMAGE {activeImageIdx + 1} / 4
                </div>
              </div>

              {/* Thumbnails row (detail texture, projects, mortar variations) */}
              <div className="grid grid-cols-4 gap-4">
                {galleryImages.map((img, idx) => {
                  const altLabels = [
                    `${product.name} in-wall installation shot - PCP India`,
                    `${product.name} close-up detail texture - PCP India`,
                    `${product.name} masonry blend variation - PCP India`,
                    `${product.name} mortar joint configuration - PCP India`
                  ];
                  return (
                    <button
                      key={idx}
                      onClick={() => setActiveImageIdx(idx)}
                      className={`aspect-[16/10] border overflow-hidden cursor-pointer transition-colors ${
                        activeImageIdx === idx ? "border-brand-gold" : "border-brand-gold/10 hover:border-brand-gold/30"
                      }`}
                    >
                      <img src={img} alt={altLabels[idx] || `${product.name} detail view`} className="object-cover w-full h-full opacity-60 hover:opacity-100 transition-opacity" />
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right: Product Summary */}
            <div className="lg:col-span-5 space-y-6 lg:pl-4">
              <div className="space-y-2">
                <span className="text-[10px] tracking-[0.25em] text-brand-gold uppercase font-bold block">
                  {product.category} Blend / {product.variationType || "Standard"} Grade
                </span>
                <h1 className="text-3xl sm:text-4xl font-normal font-cormorant text-brand-offwhite tracking-wide leading-tight">
                  {product.h1 || product.name}
                </h1>
              </div>

              <div className="border-t border-brand-gold/10 pt-4">
                <p className="text-xs sm:text-sm text-brand-sand/85 leading-relaxed font-poppins">
                  {product.desc}
                </p>
                <p className="text-xs text-brand-sand/55 leading-relaxed mt-2 italic font-poppins">
                  Proudly manufactured in Varanasi since 1937 using native clay resources and state-of-the-art tunnel kiln technology.
                </p>
              </div>

              {/* Action and Disclaimer */}
              <div className="space-y-3 pt-4 border-t border-brand-gold/10">
                <button
                  onClick={() => setIsEnquiryOpen(true)}
                  className="w-full bg-brand-gold hover:bg-brand-sand text-brand-black font-semibold py-4 rounded-none transition-colors cursor-pointer flex items-center justify-center gap-2 text-xs uppercase tracking-wider font-poppins border border-brand-gold"
                >
                  Request a Sample
                </button>
                <span className="text-[11px] text-brand-gold/70 italic font-poppins mt-2 block font-semibold text-center uppercase tracking-wider">
                  * Always request samples before specification
                </span>
              </div>

              {/* Downloads Deck */}
              <div className="pt-4 border-t border-brand-gold/10 space-y-3">
                <span className="block text-[10px] uppercase tracking-wider text-brand-sand/40 font-bold">Datasheets & Revit Objects</span>
                <div className="grid grid-cols-1 gap-3">
                  <button
                    onClick={() => handleDownload("Datasheet (PDF)")}
                    className="flex items-center justify-between p-4 bg-brand-charcoal hover:bg-brand-gold/5 border border-brand-gold/15 hover:border-brand-gold transition-all text-left w-full cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-brand-black border border-brand-gold/10 group-hover:border-brand-gold/30 text-brand-gold transition-colors">
                        <FileText className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="block text-xs font-semibold text-brand-offwhite group-hover:text-brand-gold transition-colors">Technical Datasheet (TDS)</span>
                        <span className="text-[9px] text-brand-sand/40 uppercase font-mono mt-0.5 block">pcp-{product.id}-tds.pdf</span>
                      </div>
                    </div>
                    <div className="p-2 text-brand-sand group-hover:text-brand-gold transition-colors">
                      <Download className="w-4 h-4" />
                    </div>
                  </button>

                  <button
                    onClick={() => handleDownload("Revit (RVT)")}
                    className="flex items-center justify-between p-4 bg-brand-charcoal hover:bg-brand-gold/5 border border-brand-gold/15 hover:border-brand-gold transition-all text-left w-full cursor-pointer group"
                  >
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-brand-black border border-brand-gold/10 group-hover:border-brand-gold/30 text-brand-gold transition-colors">
                        <HardHat className="w-5 h-5" />
                      </div>
                      <div>
                        <span className="block text-xs font-semibold text-brand-offwhite group-hover:text-brand-gold transition-colors">Revit BIM Object (RVT)</span>
                        <span className="text-[9px] text-brand-sand/40 uppercase font-mono mt-0.5 block">pcp-{product.id}-bim.rvt</span>
                      </div>
                    </div>
                    <div className="p-2 text-brand-sand group-hover:text-brand-gold transition-colors">
                      <Download className="w-4 h-4" />
                    </div>
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* SECTION 2: Product Details (compact spec list) + Downloads */}
      <section className="py-16 bg-brand-charcoal/20 border-t border-brand-gold/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Left: Compact Specs Sheet */}
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-xl font-normal font-cormorant text-brand-offwhite uppercase tracking-wider flex items-center gap-2">
                <Ruler className="w-5 h-5 text-brand-gold" />
                Technical Parameters Spec Sheet
              </h2>
              
              <div className="overflow-x-auto border border-brand-gold/10">
                <table className="w-full text-left text-xs font-poppins text-brand-sand/85 border-collapse">
                  <tbody>
                    <tr className="border-b border-brand-gold/10 hover:bg-brand-black/25 transition-colors">
                      <td className="py-3 px-4 font-semibold uppercase text-[10px] text-brand-sand/55 bg-brand-black/20 w-1/3">Dimensions (Metric)</td>
                      <td className="py-3 px-4 text-brand-offwhite font-bold">{product.specs.length} × {product.specs.width} × {product.specs.height} mm</td>
                    </tr>
                    <tr className="border-b border-brand-gold/10 hover:bg-brand-black/25 transition-colors">
                      <td className="py-3 px-4 font-semibold uppercase text-[10px] text-brand-sand/55 bg-brand-black/20">Dimensions (Imperial)</td>
                      <td className="py-3 px-4 text-brand-offwhite font-bold">{getImperialSizing()}</td>
                    </tr>
                    <tr className="border-b border-brand-gold/10 hover:bg-brand-black/25 transition-colors">
                      <td className="py-3 px-4 font-semibold uppercase text-[10px] text-brand-sand/55 bg-brand-black/20">Compressive Strength</td>
                      <td className="py-3 px-4 text-brand-gold font-extrabold">{product.specs.compStrength}</td>
                    </tr>
                    <tr className="border-b border-brand-gold/10 hover:bg-brand-black/25 transition-colors">
                      <td className="py-3 px-4 font-semibold uppercase text-[10px] text-brand-sand/55 bg-brand-black/20">Water Absorption</td>
                      <td className="py-3 px-4 text-brand-offwhite font-bold">{product.specs.waterAbsorption}</td>
                    </tr>
                    <tr className="border-b border-brand-gold/10 hover:bg-brand-black/25 transition-colors">
                      <td className="py-3 px-4 font-semibold uppercase text-[10px] text-brand-sand/55 bg-brand-black/20">Dry Mass Weight</td>
                      <td className="py-3 px-4 text-brand-offwhite font-bold">{product.specs.weight}</td>
                    </tr>
                    <tr className="border-b border-brand-gold/10 hover:bg-brand-black/25 transition-colors">
                      <td className="py-3 px-4 font-semibold uppercase text-[10px] text-brand-sand/55 bg-brand-black/20">Coverage / Pack Qty</td>
                      <td className="py-3 px-4 text-brand-offwhite font-bold">{getPackQuantity()}</td>
                    </tr>
                    <tr className="border-b border-brand-gold/10 hover:bg-brand-black/25 transition-colors">
                      <td className="py-3 px-4 font-semibold uppercase text-[10px] text-brand-sand/55 bg-brand-black/20">Relevant Standard</td>
                      <td className="py-3 px-4 text-brand-offwhite font-bold">BS EN 771-1 / IS 13757 certified</td>
                    </tr>
                    {product.specs.thermalInsulation && (
                      <tr className="border-b border-brand-gold/10 hover:bg-brand-black/25 transition-colors">
                        <td className="py-3 px-4 font-semibold uppercase text-[10px] text-brand-sand/55 bg-brand-black/20">Thermal Conductivity</td>
                        <td className="py-3 px-4 text-brand-gold font-bold">{product.specs.thermalInsulation}</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

            

            </div>

            {/* Right: Quantity Estimator Form */}
            <div className="lg:col-span-5">
              <div className="bg-brand-charcoal/40 border border-brand-gold/10 p-8 rounded-none space-y-6">
                <div>
                  <h3 className="text-xl font-normal font-cormorant text-brand-offwhite uppercase tracking-wider flex items-center gap-2">
                    <Calculator className="w-5 h-5 text-brand-gold" />
                    Masonry Quantity Estimator
                  </h3>
                  <p className="text-[10px] font-poppins text-brand-sand/55 mt-1.5">
                    Estimate the materials required for your project wall area based on standard dimensions.
                  </p>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[9px] uppercase font-bold tracking-wider text-brand-sand/50 mb-1 font-poppins">
                        Wall Length (m)
                      </label>
                      <input
                        type="number"
                        value={wallLength}
                        onChange={(e) => setWallLength(parseFloat(e.target.value) || 0)}
                        className="w-full bg-brand-black border border-brand-gold/10 rounded-none px-3.5 py-2 text-xs font-poppins text-brand-offwhite focus:outline-none focus:border-brand-gold"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] uppercase font-bold tracking-wider text-brand-sand/50 mb-1 font-poppins">
                        Wall Height (m)
                      </label>
                      <input
                        type="number"
                        value={wallHeight}
                        onChange={(e) => setWallHeight(parseFloat(e.target.value) || 0)}
                        className="w-full bg-brand-black border border-brand-gold/10 rounded-none px-3.5 py-2 text-xs font-poppins text-brand-offwhite focus:outline-none focus:border-brand-gold"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[9px] uppercase font-bold tracking-wider text-brand-sand/50 mb-1 font-poppins">
                      Wastage Margin (%)
                    </label>
                    <select
                      value={wastageMargin}
                      onChange={(e) => setWastageMargin(parseInt(e.target.value))}
                      className="w-full bg-brand-black border border-brand-gold/10 rounded-none px-3.5 py-2 text-xs font-poppins text-brand-offwhite focus:outline-none focus:border-brand-gold"
                    >
                      <option value={5}>5% wastage margin</option>
                      <option value={10}>10% wastage margin</option>
                      <option value={15}>15% wastage margin</option>
                    </select>
                  </div>

                  <div className="bg-brand-black border border-brand-gold/10 p-4 font-poppins space-y-2 mt-2">
                    <div className="flex justify-between text-xs text-brand-sand/60">
                      <span>Total Wall Area:</span>
                      <span className="font-semibold text-brand-offwhite">{calculatedArea.toFixed(2)} sq m</span>
                    </div>
                    <div className="flex justify-between text-xs text-brand-sand/60">
                      <span>Base Units Needed:</span>
                      <span className="font-semibold text-brand-offwhite">{estimatedUnits.toLocaleString()} units</span>
                    </div>
                    <div className="flex justify-between text-sm text-brand-gold font-semibold border-t border-brand-gold/10 pt-2 mt-2">
                      <span>Total (inc. wastage):</span>
                      <span>{totalWithWastage.toLocaleString()} units</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Integrated Ecotherm Variation details */}
          {product.variationType === "Ecotherm" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-12 pt-12 border-t border-brand-gold/10">
              <div className="bg-brand-charcoal p-8 border border-brand-gold/10 space-y-6">
                <h2 className="text-xl font-normal font-cormorant text-brand-offwhite uppercase tracking-wider">
                  Ecotherm vs Solid Clay Brickwork
                </h2>
                <div className="overflow-x-auto text-[11px] font-poppins text-brand-sand/80">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-brand-gold/20 text-[9px] uppercase tracking-widest text-brand-sand/55">
                        <th className="py-2 px-1">Metric</th>
                        <th className="py-2 px-1 text-emerald-400 font-bold">Ecotherm Block</th>
                        <th className="py-2 px-1">Solid Clay Brick</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-brand-gold/5 py-2">
                        <td className="py-2">Mass Density</td>
                        <td className="text-emerald-400 font-bold">850 kg/m³ (55% lighter)</td>
                        <td>1900 kg/m³</td>
                      </tr>
                      <tr className="border-b border-brand-gold/5 py-2">
                        <td className="py-2">Mortar Joint</td>
                        <td className="text-emerald-400 font-bold">Thin-bed joint (2-3mm)</td>
                        <td>Thick-bed joint (10-12mm)</td>
                      </tr>
                      <tr className="border-b border-brand-gold/5 py-2">
                        <td className="py-2">Speed of Assembly</td>
                        <td className="text-emerald-400 font-bold">3x faster layout work</td>
                        <td>Standard assembly</td>
                      </tr>
                      <tr className="border-b border-brand-gold/5 py-2">
                        <td className="py-2">U-value insulation</td>
                        <td className="text-emerald-400 font-bold">0.22 W/mK</td>
                        <td>0.52 W/mK</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Ecotherm S-Series break downs */}
              <div className="bg-brand-charcoal p-8 border border-brand-gold/10 space-y-6">
                <h2 className="text-xl font-normal font-cormorant text-brand-offwhite uppercase tracking-wider">
                  Ecotherm Series Breakdown
                </h2>
                <div className="overflow-x-auto text-[11px] font-poppins text-brand-sand/80">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-brand-gold/20 text-[9px] uppercase tracking-widest text-brand-sand/55">
                        <th className="py-2 px-1">Series</th>
                        <th className="py-2 px-1">Purpose</th>
                        <th className="py-2 px-1">U-Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-brand-gold/5 py-2">
                        <td className="py-2 font-bold">VP Series</td>
                        <td>Structural load-bearing blocks</td>
                        <td className="text-brand-gold font-bold">0.85</td>
                      </tr>
                      <tr className="border-b border-brand-gold/5 py-2">
                        <td className="py-2 font-bold">HP Series</td>
                        <td>Partition walling systems</td>
                        <td className="text-brand-gold font-bold">1.10</td>
                      </tr>
                      <tr className="border-b border-brand-gold/5 py-2">
                        <td className="py-2 font-bold">Special S Series</td>
                        <td>High precision thermal lock</td>
                        <td className="text-brand-gold font-bold">0.68</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* Integrated Terraplast Plaster overview */}
          {product.variationType === "Terraplast" && (
            <div className="bg-brand-charcoal p-8 border border-brand-gold/10 mt-12 space-y-4">
              <h2 className="text-xl font-normal font-cormorant text-brand-offwhite uppercase tracking-wider">
                Natural Clay Plaster Performance
              </h2>
              <p className="text-xs text-brand-sand/75 leading-relaxed">
                Clay plaster is highly vapor-permeable, allowing internal walls to breathe naturally and act as a humidity buffer. When relative humidity rises, clay absorbs vapor; when dry, it slowly vents it, keeping indoor space balanced and preventing mold development.
              </p>
            </div>
          )}

        </div>
      </section>

      {/* SECTION 3: Certification Strip (Thin band) */}
      <section className="py-8 bg-brand-charcoal/40 border-y border-brand-gold/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-6">
            <img src="/images/certifications/logo-epd.png" alt="EPD Certified" className="h-10 object-contain invert opacity-80" />
            {product.variationType === "Ecotherm" && (
              <img src="/images/certifications/logo-griha.jpg" alt="GRIHA Listed" className="h-10 object-contain opacity-80" />
            )}
            <img src="/images/certifications/logo-iso.png" alt="ISO Standard" className="h-10 object-contain invert opacity-70" />
          </div>
          <div className="text-center md:text-right space-y-1">
            <p className="text-xs text-brand-sand font-poppins">
              Fully compliant with international EPD-certified clay bricks and facade standards.
            </p>
            <Link
              href="/#sustainability-strip"
              className="text-[10px] font-bold text-brand-gold hover:text-brand-offwhite uppercase tracking-wider font-poppins cursor-pointer inline-flex items-center gap-1"
            >
              Learn about our Sustainability credentials <ArrowRight className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 4: Featured Project (Full-Width Image Showcase) */}
      <section className="py-16 bg-brand-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div>
            <span className="text-[9px] uppercase font-bold tracking-[0.3em] text-brand-gold bg-brand-gold/5 px-4 py-1.5 border border-brand-gold/20 rounded-none w-fit block font-poppins">
              CASE STUDY IN ACTION
            </span>
            <h2 className="text-2xl sm:text-3xl font-normal font-cormorant text-brand-offwhite mt-4 tracking-wide uppercase">
              Featured Signature Project
            </h2>
          </div>

          <div className="border border-brand-gold/10 bg-brand-charcoal overflow-hidden group">
            <div className="aspect-[21/9] w-full bg-brand-black overflow-hidden relative">
              <img src={featuredProj.image} alt={featuredProj.name} className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-700" />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-transparent to-transparent z-10" />
              
              <div className="absolute bottom-6 left-6 right-6 z-20 space-y-2">
                <span className="text-[9px] uppercase tracking-widest text-brand-gold bg-brand-black/70 px-3 py-1 border border-brand-gold/20 font-bold w-fit block">
                  {featuredProj.type} | {featuredProj.location}
                </span>
                <h3 className="text-lg sm:text-xl font-normal font-cormorant text-brand-offwhite font-bold leading-tight uppercase">
                  {featuredProj.name}
                </h3>
              </div>
            </div>
            
            <div className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-t border-brand-gold/10">
              <p className="text-xs text-brand-sand/80 max-w-2xl font-poppins">
                {featuredProj.desc}
              </p>
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-gold hover:text-brand-offwhite transition-colors cursor-pointer shrink-0"
              >
                <span>View all projects</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: Similar Products (adjacent blends/categories) */}
      <section className="py-16 bg-brand-charcoal/20 border-t border-brand-gold/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div>
            <span className="text-[9px] uppercase font-bold tracking-[0.3em] text-brand-gold bg-brand-gold/5 px-4 py-1.5 border border-brand-gold/20 rounded-none w-fit block font-poppins">
              MATERIALS EXPLORER
            </span>
            <h2 className="text-2xl sm:text-3xl font-normal font-cormorant text-brand-offwhite mt-4 tracking-wide uppercase">
              Similar Blends & Variants
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {similarProducts.map((p) => (
              <div key={p.id} className="group rounded-none border border-brand-gold/10 bg-brand-charcoal flex flex-col justify-between hover:border-brand-gold/40 transition-colors shadow-lg h-full">
                <div className="aspect-[4/3] w-full overflow-hidden bg-brand-black border-b border-brand-gold/10">
                  <img src={p.image} alt={`${p.name} - PCP India`} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="p-5 flex-grow flex flex-col justify-between">
                  <div>
                    <h3 className="text-base font-normal font-cormorant text-brand-offwhite group-hover:text-brand-gold transition-colors font-semibold">
                      {p.name}
                    </h3>
                    <p className="text-[10px] font-poppins text-brand-sand/60 mt-1.5 leading-relaxed line-clamp-2">
                      {p.desc}
                    </p>
                  </div>
                  <Link
                    href={`/products/${p.id}`}
                    className="mt-4 inline-flex items-center gap-1.5 text-[10px] font-semibold font-poppins uppercase tracking-wider text-brand-gold hover:text-brand-offwhite transition-colors cursor-pointer"
                  >
                    View Specs
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* SECTION 6: Sample CTA Band (Closing conversion path) */}
      <section className="pt-12 pb-32 md:pb-40 lg:pb-48 bg-brand-charcoal border-t border-brand-gold/10 text-center space-y-4">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <h3 className="text-xl sm:text-2xl font-normal font-cormorant text-brand-offwhite uppercase tracking-wider">
            Confirm Sizing & Colors Locally
          </h3>
          <p className="text-xs text-brand-sand/70 max-w-xl mx-auto">
            Clay materials vary naturally across kiln batches. We strongly advise architects to inspect real brick specimens before signing specifications.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <button
              onClick={() => setIsEnquiryOpen(true)}
              className="bg-brand-gold hover:bg-brand-sand text-brand-black font-semibold px-8 py-3.5 rounded-none text-xs uppercase tracking-widest font-poppins border border-brand-gold cursor-pointer"
            >
              Request a Sample
            </button>
            <button
              onClick={() => setIsEnquiryOpen(true)}
              className="bg-transparent hover:bg-brand-gold/10 text-brand-gold hover:text-brand-offwhite font-semibold px-8 py-3.5 rounded-none text-xs uppercase tracking-widest font-poppins border border-brand-gold/30 hover:border-brand-gold transition-all cursor-pointer"
            >
              Quick Enquiry
            </button>
          </div>
          <div className="pt-4">
            <Link
              href="/where-to-buy"
              className="text-xs text-brand-sand hover:text-brand-gold font-semibold uppercase tracking-wider transition-colors inline-flex items-center gap-1.5"
            >
              Find an Authorized Dealer near you in India <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Enquiry Popup Modal Dialog */}
      <AnimatePresence>
        {isEnquiryOpen && (
          <div className="fixed inset-0 z-50 bg-brand-black/90 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 10 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
              className="relative w-full max-w-xl bg-brand-charcoal border border-brand-gold/25 p-8 shadow-2xl my-8 text-left"
            >
              {/* Close Button */}
              <button
                onClick={() => setIsEnquiryOpen(false)}
                className="absolute top-4 right-4 text-brand-sand hover:text-brand-offwhite transition-colors cursor-pointer p-1"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="space-y-6">
                <div>
                  <span className="text-[9px] uppercase font-bold tracking-[0.25em] text-brand-gold font-poppins">Technical Spec Desk</span>
                  <h3 className="text-2xl font-normal font-cormorant text-brand-offwhite mt-1 uppercase tracking-wider">
                    Request Samples & Quote
                  </h3>
                  <p className="text-[10px] font-poppins text-brand-sand/55 mt-1.5 leading-relaxed">
                    Specifying {product.name}. Submit your project coordinates below to receive a physical sample box.
                  </p>
                </div>

                <form onSubmit={handleInquirySubmit} className="space-y-4">
                  <div>
                    <label className="block text-[9px] uppercase font-bold tracking-wider text-brand-sand/55 mb-1 font-poppins">Full Name</label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-brand-black border border-brand-gold/10 rounded-none px-4 py-3 text-xs uppercase tracking-wider font-poppins text-brand-offwhite focus:outline-none focus:border-brand-gold"
                      placeholder="Enter name"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[9px] uppercase font-bold tracking-wider text-brand-sand/55 mb-1 font-poppins">Email</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full bg-[#0a0a09] border border-brand-gold/10 rounded-none px-4 py-3 text-xs uppercase tracking-wider font-poppins text-brand-offwhite focus:outline-none focus:border-brand-gold"
                        placeholder="work email"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] uppercase font-bold tracking-wider text-brand-sand/55 mb-1 font-poppins">Phone</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="w-full bg-[#0a0a09] border border-brand-gold/10 rounded-none px-4 py-3 text-xs uppercase tracking-wider font-poppins text-brand-offwhite focus:outline-none focus:border-brand-gold"
                        placeholder="phone"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[9px] uppercase font-bold tracking-wider text-brand-sand/55 mb-1 font-poppins">Company</label>
                      <input
                        type="text"
                        required
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className="w-full bg-[#0a0a09] border border-brand-gold/10 rounded-none px-4 py-3 text-xs uppercase tracking-wider font-poppins text-brand-offwhite focus:outline-none focus:border-brand-gold"
                        placeholder="firm name"
                      />
                    </div>
                    <div>
                      <label className="block text-[9px] uppercase font-bold tracking-wider text-brand-sand/55 mb-1 font-poppins">Role</label>
                      <select
                        value={userRole}
                        onChange={(e) => setUserRole(e.target.value)}
                        className="w-full bg-[#0a0a09] border border-brand-gold/10 rounded-none px-4 py-3 text-xs uppercase tracking-wider font-poppins text-brand-offwhite focus:outline-none focus:border-brand-gold"
                      >
                        <option>Architect</option>
                        <option>Builder/Contractor</option>
                        <option>Distributor/Dealer</option>
                        <option>Engineer</option>
                        <option>Developer</option>
                        <option>Homeowner</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[9px] uppercase font-bold tracking-wider text-brand-sand/55 mb-1 font-poppins">Technical Inquiry Message</label>
                    <textarea
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={4}
                      className="w-full bg-brand-black border border-brand-gold/10 rounded-none px-4 py-3 text-xs uppercase tracking-wider font-poppins text-brand-offwhite focus:outline-none focus:border-brand-gold resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-brand-gold hover:bg-brand-sand disabled:bg-brand-gold/50 text-brand-black font-semibold py-4 rounded-none transition-colors cursor-pointer flex items-center justify-center gap-2 text-xs uppercase tracking-wider font-poppins border border-brand-gold"
                  >
                    {submitting ? (
                      <span className="w-5 h-5 rounded-full border-2 border-brand-black border-t-transparent animate-spin" />
                    ) : (
                      <>
                        <Send className="w-4 h-4 shrink-0" />
                        Submit Request
                      </>
                    )}
                  </button>
                </form>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
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
        <DetailContent product={product} />
        <Footer showCTA={true} />
      </div>
    </ToastProvider>
  );
}
