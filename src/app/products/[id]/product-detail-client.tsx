"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/homepage/Header";
import { Footer } from "@/components/homepage/Footer";
import { Product, products } from "@/data/products";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Download, Send, Ruler, FileText, HardHat, FileSpreadsheet, Calculator } from "lucide-react";
import { ToastProvider, useToast } from "@/components/ui/Toast";
import confetti from "canvas-confetti";
import { Magnetic } from "@/components/ui/Magnetic";

interface ProductDetailClientProps {
  product: Product;
}

function DetailContent({ product }: ProductDetailClientProps) {
  const { toast } = useToast();

  // Multi-image gallery state
  const galleryImages = [
    product.image,
    "/images/hero-1.jpg", // Clay Close-up
    "/images/hero-4.jpg", // Stacked units
    "/images/hero-3.jpg"  // Applied facade
  ];
  const [activeImageIdx, setActiveImageIdx] = useState(0);

  // Form states
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

  // Recalculate quantities when length/height changes
  useEffect(() => {
    const area = wallLength * wallHeight;
    setCalculatedArea(area);

    // Calculate face area of one unit in meters (length x height)
    // Convert specs from mm to meters
    const unitLengthM = parseFloat(product.specs.length) / 1000;
    const unitHeightM = parseFloat(product.specs.height) / 1000;

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
    }, 1200);
  };

  // Find related products in the same category
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="flex flex-col min-h-screen bg-brand-black text-brand-offwhite">
      
      {/* Header section with back button */}
      <div className="pt-28 pb-10 border-b border-brand-gold/10 bg-brand-charcoal/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link 
            href="/products" 
            className="inline-flex items-center gap-2 text-xs uppercase tracking-wider font-poppins font-semibold text-brand-sand hover:text-brand-offwhite mb-6 transition-colors group cursor-none"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Materials Library
          </Link>

          <div className="max-w-4xl">
            <span className="text-[9px] uppercase font-bold tracking-[0.3em] text-brand-gold bg-brand-gold/5 px-4 py-1.5 border border-brand-gold/20 rounded-none w-fit block">
              {product.category} Specifications
            </span>
            <h1 className="text-4xl sm:text-5xl font-normal font-cormorant text-brand-offwhite mt-4 tracking-wide leading-tight">
              {product.name}
            </h1>
          </div>
        </div>
      </div>

      {/* Main content grid */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16 z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left column: images, description, specs table */}
          <div className="lg:col-span-7 space-y-12">
            
            {/* Gallery Reveal */}
            <div className="space-y-4">
              <div className="aspect-[16/10] w-full border border-brand-gold/15 bg-brand-black overflow-hidden relative">
                <AnimatePresence mode="wait">
                  <motion.img
                    key={activeImageIdx}
                    src={galleryImages[activeImageIdx]}
                    alt={product.name}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="object-cover w-full h-full"
                  />
                </AnimatePresence>
                <div className="absolute top-4 right-4 bg-brand-black/90 text-brand-gold border border-brand-gold/15 text-[9px] uppercase font-bold tracking-widest px-3 py-1.5 rounded-none z-10">
                  IMAGE {activeImageIdx + 1} / 4
                </div>
              </div>

              {/* Thumbnails row */}
              <div className="grid grid-cols-4 gap-4">
                {galleryImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIdx(idx)}
                    className={`aspect-[16/10] border overflow-hidden cursor-none transition-colors ${
                      activeImageIdx === idx ? "border-brand-gold" : "border-brand-gold/10 hover:border-brand-gold/30"
                    }`}
                  >
                    <img src={img} alt="texture thumbnail" className="object-cover w-full h-full opacity-60 hover:opacity-100" />
                  </button>
                ))}
              </div>
            </div>

            {/* Description */}
            <div className="bg-brand-charcoal p-8 border border-brand-gold/10 space-y-4">
              <h3 className="text-xl font-normal font-cormorant text-brand-offwhite uppercase tracking-wider">
                Material Description
              </h3>
              <p className="text-xs font-poppins text-brand-sand/75 leading-relaxed">
                {product.desc}
              </p>
              <p className="text-xs font-poppins text-brand-sand/50 leading-relaxed border-t border-brand-gold/10 pt-4">
                Manufactured using sustainable closed-loop processing guidelines in our state-of-the-art regional kiln facilities, ensuring long-term durability and structural resistance for all standard residential and heavy-duty environments.
              </p>
            </div>

            {/* Specs detail table */}
            <div className="bg-brand-charcoal p-8 border border-brand-gold/10 space-y-6">
              <h3 className="text-xl font-normal font-cormorant text-brand-offwhite uppercase tracking-wider flex items-center gap-2">
                <Ruler className="w-5 h-5 text-brand-gold" />
                Technical & Structural Specifications
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4 text-xs font-poppins text-brand-sand/85">
                <div className="flex justify-between py-2 border-b border-brand-gold/10">
                  <span className="text-brand-sand/40 font-semibold uppercase">Dimensions (L × W × H)</span>
                  <span className="text-brand-offwhite font-bold">{product.specs.length} × {product.specs.width} × {product.specs.height} mm</span>
                </div>
                <div className="flex justify-between py-2 border-b border-brand-gold/10">
                  <span className="text-brand-sand/40 font-semibold uppercase">Dry Weight</span>
                  <span className="text-brand-offwhite font-bold">{product.specs.weight}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-brand-gold/10">
                  <span className="text-brand-sand/40 font-semibold uppercase">Mass Density</span>
                  <span className="text-brand-offwhite font-bold">{product.specs.density}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-brand-gold/10">
                  <span className="text-brand-sand/40 font-semibold uppercase">Water Absorption</span>
                  <span className="text-brand-offwhite font-bold">{product.specs.waterAbsorption}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-brand-gold/10">
                  <span className="text-brand-sand/40 font-semibold uppercase">Compressive Strength</span>
                  <span className="text-brand-gold font-extrabold">{product.specs.compStrength}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-brand-gold/10">
                  <span className="text-brand-sand/40 font-semibold uppercase">Fire Safety Rating</span>
                  <span className="text-brand-offwhite font-bold">{product.specs.fireResistance}</span>
                </div>
                {product.specs.thermalInsulation && (
                  <div className="flex justify-between py-2 border-b border-brand-gold/10 sm:col-span-2">
                    <span className="text-brand-sand/40 font-semibold uppercase">Thermal Conductivity (λ Value)</span>
                    <span className="text-brand-gold font-bold">{product.specs.thermalInsulation}</span>
                  </div>
                )}
              </div>
            </div>

            {/* BIM & Revit Resources Download area */}
            <div className="bg-brand-charcoal p-8 border border-brand-gold/10 space-y-6">
              <div>
                <h3 className="text-xl font-normal font-cormorant text-brand-offwhite uppercase tracking-wider">
                  CAD & Revit BIM Downloads
                </h3>
                <p className="text-brand-sand/55 text-xs mt-1 font-poppins">
                  Ensure accurate structural simulation in Autodesk Revit, AutoCAD, and ArchiCAD.
                </p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-4 bg-brand-black border border-brand-gold/10 hover:border-brand-gold/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <FileText className="w-8 h-8 text-brand-gold shrink-0" />
                    <div>
                      <span className="block text-xs font-semibold text-brand-offwhite font-poppins">Technical Datasheet</span>
                      <span className="text-[9px] text-brand-sand/40 uppercase font-semibold font-poppins">PDF (1.2 MB)</span>
                    </div>
                  </div>
                  <button onClick={() => handleDownload("Datasheet (PDF)")} className="p-2 hover:bg-brand-charcoal text-brand-sand hover:text-brand-offwhite cursor-none">
                    <Download className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-brand-black border border-brand-gold/10 hover:border-brand-gold/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <HardHat className="w-8 h-8 text-brand-gold shrink-0" />
                    <div>
                      <span className="block text-xs font-semibold text-brand-offwhite font-poppins">Revit BIM Object</span>
                      <span className="text-[9px] text-brand-sand/40 uppercase font-semibold font-poppins">RVT (8.4 MB)</span>
                    </div>
                  </div>
                  <button onClick={() => handleDownload("Revit (RVT)")} className="p-2 hover:bg-brand-charcoal text-brand-sand hover:text-brand-offwhite cursor-none">
                    <Download className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-brand-black border border-brand-gold/10 hover:border-brand-gold/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <FileSpreadsheet className="w-8 h-8 text-brand-gold shrink-0" />
                    <div>
                      <span className="block text-xs font-semibold text-brand-offwhite font-poppins">AutoCAD Details</span>
                      <span className="text-[9px] text-brand-sand/40 uppercase font-semibold font-poppins">DWG (2.3 MB)</span>
                    </div>
                  </div>
                  <button onClick={() => handleDownload("CAD Details (DWG)")} className="p-2 hover:bg-brand-charcoal text-brand-sand hover:text-brand-offwhite cursor-none">
                    <Download className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-brand-black border border-brand-gold/10 hover:border-brand-gold/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <FileText className="w-8 h-8 text-brand-gold shrink-0" />
                    <div>
                      <span className="block text-xs font-semibold text-brand-offwhite font-poppins">Installation Guide</span>
                      <span className="text-[9px] text-brand-sand/40 uppercase font-semibold font-poppins">PDF (3.1 MB)</span>
                    </div>
                  </div>
                  <button onClick={() => handleDownload("Installation Manual")} className="p-2 hover:bg-brand-charcoal text-brand-sand hover:text-brand-offwhite cursor-none">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right column: inline calculator + lead inquiry */}
          <div className="lg:col-span-5 space-y-8">
            
            {/* Inline Quantity Estimator Calculator */}
            <div className="bg-brand-charcoal border border-brand-gold/10 p-8 rounded-none space-y-6">
              <div>
                <h3 className="text-xl font-normal font-cormorant text-brand-offwhite uppercase tracking-wider flex items-center gap-2">
                  <Calculator className="w-5 h-5 text-brand-gold" />
                  Material Calculator
                </h3>
                <p className="text-[10px] font-poppins text-brand-sand/55 mt-1.5">
                  Estimate the exact quantities required for your project wall area using {product.name} dimensions.
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

                {/* Calculation Outputs */}
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

            {/* Inquire form */}
            <div id="inquire" className="bg-brand-charcoal rounded-none border border-brand-gold/10 p-8 space-y-6">
              <div>
                <h3 className="text-xl font-normal font-cormorant text-brand-offwhite uppercase tracking-wider">
                  Request Quote / Samples
                </h3>
                <p className="text-[10px] font-poppins text-brand-sand/55 mt-1.5">
                  Submit this technical sales sheet to receive lead times, cost structure, or standard physical clay samples.
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
                      className="w-full bg-brand-black border border-brand-gold/10 rounded-none px-4 py-3 text-xs uppercase tracking-wider font-poppins text-brand-offwhite focus:outline-none focus:border-brand-gold"
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
                      className="w-full bg-brand-black border border-brand-gold/10 rounded-none px-4 py-3 text-xs uppercase tracking-wider font-poppins text-brand-offwhite focus:outline-none focus:border-brand-gold"
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
                      className="w-full bg-brand-black border border-brand-gold/10 rounded-none px-4 py-3 text-xs uppercase tracking-wider font-poppins text-brand-offwhite focus:outline-none focus:border-brand-gold"
                      placeholder="firm name"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] uppercase font-bold tracking-wider text-brand-sand/55 mb-1 font-poppins">Role</label>
                    <select
                      value={userRole}
                      onChange={(e) => setUserRole(e.target.value)}
                      className="w-full bg-brand-black border border-brand-gold/10 rounded-none px-4 py-3 text-xs uppercase tracking-wider font-poppins text-brand-offwhite focus:outline-none focus:border-brand-gold"
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

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[9px] uppercase font-bold tracking-wider text-brand-sand/55 mb-1 font-poppins">State</label>
                    <input
                      type="text"
                      required
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full bg-brand-black border border-brand-gold/10 rounded-none px-4 py-3 text-xs uppercase tracking-wider font-poppins text-brand-offwhite focus:outline-none focus:border-brand-gold"
                      placeholder="Delhi"
                    />
                  </div>
                  <div>
                    <label className="block text-[9px] uppercase font-bold tracking-wider text-brand-sand/55 mb-1 font-poppins">City</label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-brand-black border border-brand-gold/10 rounded-none px-4 py-3 text-xs uppercase tracking-wider font-poppins text-brand-offwhite focus:outline-none focus:border-brand-gold"
                      placeholder="city"
                    />
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
                  className="w-full bg-brand-gold hover:bg-brand-sand disabled:bg-brand-gold/50 text-brand-black font-semibold py-4 rounded-none transition-colors cursor-none flex items-center justify-center gap-2 text-xs uppercase tracking-wider font-poppins border border-brand-gold"
                >
                  {submitting ? (
                    <span className="w-5 h-5 rounded-full border-2 border-brand-black border-t-transparent animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4 shrink-0" />
                      Submit Price Request
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>

        </div>

        {/* Related Products Carousel (Section bottom) */}
        {relatedProducts.length > 0 && (
          <div className="mt-24 border-t border-brand-gold/10 pt-16">
            <div className="flex justify-between items-end mb-10">
              <div>
                <span className="text-[9px] uppercase font-bold tracking-[0.3em] text-brand-gold bg-brand-gold/5 px-4 py-1.5 border border-brand-gold/20 rounded-none w-fit block font-poppins">
                  RELATED MATERIALS
                </span>
                <h3 className="text-2xl sm:text-3xl font-normal font-cormorant text-brand-offwhite mt-4 tracking-wide">
                  Explore Similar Products
                </h3>
              </div>
            </div>

            {/* Carousel track */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {relatedProducts.map((p) => (
                <div key={p.id} className="group rounded-none border border-brand-gold/10 bg-brand-charcoal flex flex-col justify-between hover:border-brand-gold/40 transition-colors shadow-lg">
                  <div className="aspect-[4/3] w-full overflow-hidden bg-brand-black border-b border-brand-gold/10">
                    <img src={p.image} alt={p.name} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="p-5 flex-grow flex flex-col justify-between">
                    <div>
                      <h4 className="text-base font-normal font-cormorant text-brand-offwhite group-hover:text-brand-gold transition-colors">
                        {p.name}
                      </h4>
                      <p className="text-[10px] font-poppins text-brand-sand/60 mt-1 leading-relaxed line-clamp-2">
                        {p.desc}
                      </p>
                    </div>
                    <Link
                      href={`/products/${p.id}`}
                      className="mt-4 inline-flex items-center gap-1.5 text-[10px] font-semibold font-poppins uppercase tracking-wider text-brand-gold hover:text-brand-offwhite transition-colors cursor-none"
                    >
                      View Specs
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
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
        <Footer />
      </div>
    </ToastProvider>
  );
}
