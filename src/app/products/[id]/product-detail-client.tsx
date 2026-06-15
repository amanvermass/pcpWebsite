"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/homepage/Header";
import { ContactUs } from "@/components/homepage/ContactUs";
import { Product } from "@/data/products";
import Link from "next/link";
import { motion } from "framer-motion";
import { FileText, ArrowLeft, Download, Check, Send, HardHat, FileSpreadsheet, Ruler } from "lucide-react";
import { ToastProvider, useToast } from "@/components/ui/Toast";
import confetti from "canvas-confetti";

interface ProductDetailClientProps {
  product: Product;
}

function DetailContent({ product }: ProductDetailClientProps) {
  const { toast } = useToast();

  // Form states
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [userRole, setUserRole] = useState("Architect");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [message, setMessage] = useState(
    `I am requesting a cost quotation, samples availability, and full technical specifications for the ${product.name}.`
  );
  const [submitting, setSubmitting] = useState(false);

  const handleDownload = (docType: string) => {
    toast(`Successfully started download: ${product.name} - ${docType}`, "success");
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      // Create lead object
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

      // Store in localstorage
      const existingLeads = JSON.parse(localStorage.getItem("pcp_leads") || "[]");
      existingLeads.push(newLead);
      localStorage.setItem("pcp_leads", JSON.stringify(existingLeads));

      // Trigger celebration
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });

      toast(`Technical inquiry for ${product.name} submitted successfully! Our sales engineers will contact you shortly.`, "success");
      setSubmitting(false);

      // Reset form fields
      setName("");
      setEmail("");
      setPhone("");
      setCompany("");
      setState("");
      setCity("");
    }, 1200);
  };

  return (
    <div className="flex flex-col min-h-screen bg-brand-slate-950">
      <div className="pt-24 pb-12 bg-brand-slate-900 bg-grid-pattern border-b border-brand-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


          {/* Back button */}
          <Link href="/products" className="inline-flex items-center gap-2 text-sm font-bold text-brand-slate-350 hover:text-white mb-6 transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Materials Library
          </Link>

          {/* Heading */}
          <div className="max-w-4xl">
            <span className="text-xs uppercase font-extrabold tracking-widest text-brand-terracotta-500 bg-brand-terracotta-500/10 px-3 py-1 rounded-full">
              {product.category} Section
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white mt-4 tracking-tight leading-tight">
              {product.name}
            </h1>
          </div>
        </div>
      </div>

      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column - Image and technical specifications */}
          <div className="lg:col-span-7 space-y-10">
            {/* Main image */}
            <div className="aspect-[16/10] w-full rounded-3xl overflow-hidden border border-brand-slate-800 shadow-xl bg-brand-slate-900 relative">
              <img src={product.image} alt={product.name} className="object-cover w-full h-full" />
              <div className="absolute top-4 right-4 bg-brand-slate-950/85 backdrop-blur-md text-brand-terracotta-400 border border-brand-slate-800 text-[10px] uppercase font-bold tracking-widest px-3 py-1.5 rounded-xl">
                {product.category}
              </div>
            </div>

            {/* Description */}
            <div className="bg-brand-slate-900 p-8 rounded-3xl border border-brand-slate-800 space-y-4">
              <h2 className="text-xl font-bold text-white tracking-tight">Material Description</h2>
              <p className="text-brand-slate-350 text-sm sm:text-base leading-relaxed">
                {product.desc}
              </p>
              <p className="text-brand-slate-400 text-xs sm:text-sm leading-relaxed border-t border-brand-slate-850 pt-4">
                Manufactured using sustainable closed-loop processing guidelines in our state-of-the-art regional kiln facilities, ensuring long-term durability and structural resistance for all standard residential and heavy-duty environments.
              </p>
            </div>

            {/* Specs detail table */}
            <div className="bg-brand-slate-900 p-8 rounded-3xl border border-brand-slate-800 space-y-6">
              <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <Ruler className="w-5 h-5 text-brand-terracotta-500" />
                Technical & Structural Specifications
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm">
                <div className="flex justify-between py-2 border-b border-brand-slate-850/60">
                  <span className="text-brand-slate-450 font-semibold">Dimensions (L × W × H)</span>
                  <span className="text-white font-bold">{product.specs.length} × {product.specs.width} × {product.specs.height}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-brand-slate-850/60">
                  <span className="text-brand-slate-450 font-semibold">Dry Weight</span>
                  <span className="text-white font-bold">{product.specs.weight}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-brand-slate-850/60">
                  <span className="text-brand-slate-450 font-semibold">Mass Density</span>
                  <span className="text-white font-bold">{product.specs.density}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-brand-slate-850/60">
                  <span className="text-brand-slate-450 font-semibold">Water Absorption</span>
                  <span className="text-white font-bold">{product.specs.waterAbsorption}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-brand-slate-850/60">
                  <span className="text-brand-slate-450 font-semibold">Compressive Strength</span>
                  <span className="text-brand-terracotta-400 font-extrabold">{product.specs.compStrength}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-brand-slate-850/60">
                  <span className="text-brand-slate-450 font-semibold">Fire Safety Rating</span>
                  <span className="text-white font-bold">{product.specs.fireResistance}</span>
                </div>
                {product.specs.thermalInsulation && (
                  <div className="flex justify-between py-2 border-b border-brand-slate-850/60 md:col-span-2">
                    <span className="text-brand-slate-450 font-semibold">Thermal Conductivity (λ Value)</span>
                    <span className="text-brand-emerald-500 font-bold">{product.specs.thermalInsulation}</span>
                  </div>
                )}
              </div>
            </div>

            {/* BIM & Revit Resources Download area */}
            <div className="bg-brand-slate-900 p-8 rounded-3xl border border-brand-slate-800 space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">CAD & Revit BIM Downloads</h2>
                <p className="text-brand-slate-400 text-xs mt-1">
                  Ensure accurate structural simulation in Autodesk Revit, AutoCAD, and ArchiCAD.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center justify-between p-4 bg-brand-slate-950 border border-brand-slate-850 rounded-2xl hover:border-brand-slate-700 transition-colors">
                  <div className="flex items-center gap-3">
                    <FileText className="w-8 h-8 text-brand-terracotta-500 shrink-0" />
                    <div>
                      <span className="block text-xs font-bold text-white">Technical Datasheet</span>
                      <span className="text-[10px] text-brand-slate-500 uppercase font-semibold">PDF (1.2 MB)</span>
                    </div>
                  </div>
                  <button onClick={() => handleDownload("Datasheet (PDF)")} className="p-2 hover:bg-brand-slate-850 text-brand-slate-400 hover:text-white rounded-lg cursor-pointer transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-brand-slate-950 border border-brand-slate-850 rounded-2xl hover:border-brand-slate-700 transition-colors">
                  <div className="flex items-center gap-3">
                    <HardHat className="w-8 h-8 text-brand-terracotta-500 shrink-0" />
                    <div>
                      <span className="block text-xs font-bold text-white">Revit BIM Object</span>
                      <span className="text-[10px] text-brand-slate-500 uppercase font-semibold">RVT (8.4 MB)</span>
                    </div>
                  </div>
                  <button onClick={() => handleDownload("Revit Object (RVT)")} className="p-2 hover:bg-brand-slate-850 text-brand-slate-400 hover:text-white rounded-lg cursor-pointer transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-brand-slate-950 border border-brand-slate-850 rounded-2xl hover:border-brand-slate-700 transition-colors">
                  <div className="flex items-center gap-3">
                    <FileSpreadsheet className="w-8 h-8 text-brand-terracotta-500 shrink-0" />
                    <div>
                      <span className="block text-xs font-bold text-white">AutoCAD details</span>
                      <span className="text-[10px] text-brand-slate-500 uppercase font-semibold">DWG (2.3 MB)</span>
                    </div>
                  </div>
                  <button onClick={() => handleDownload("CAD Details (DWG)")} className="p-2 hover:bg-brand-slate-850 text-brand-slate-400 hover:text-white rounded-lg cursor-pointer transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center justify-between p-4 bg-brand-slate-950 border border-brand-slate-850 rounded-2xl hover:border-brand-slate-700 transition-colors">
                  <div className="flex items-center gap-3">
                    <Check className="w-8 h-8 text-brand-terracotta-500 shrink-0" />
                    <div>
                      <span className="block text-xs font-bold text-white">Installation Manual</span>
                      <span className="text-[10px] text-brand-slate-500 uppercase font-semibold">PDF (3.1 MB)</span>
                    </div>
                  </div>
                  <button onClick={() => handleDownload("Installation Manual")} className="p-2 hover:bg-brand-slate-850 text-brand-slate-400 hover:text-white rounded-lg cursor-pointer transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Localized request quote form */}
          <div id="inquire" className="lg:col-span-5">
            <div className="bg-brand-slate-900 rounded-3xl border border-brand-slate-800 p-8 sticky top-[100px] shadow-xl space-y-6">
              <div>
                <h2 className="text-xl font-bold text-white tracking-tight">Request Pricing / Samples</h2>
                <p className="text-xs text-brand-slate-400 mt-1">
                  Submit this technical sales sheet to receive lead times, cost structure, or standard physical clay samples.
                </p>
              </div>

              <form onSubmit={handleInquirySubmit} className="space-y-4">
                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-slate-400 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-brand-slate-950 border border-brand-slate-850 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-terracotta-500 transition-colors"
                    placeholder="Enter name"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-slate-400 mb-1">Email</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-brand-slate-950 border border-brand-slate-850 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-terracotta-500 transition-colors"
                      placeholder="work email"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-slate-400 mb-1">Phone</label>
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full bg-brand-slate-950 border border-brand-slate-850 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-terracotta-500 transition-colors"
                      placeholder="phone"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-slate-400 mb-1">Company</label>
                    <input
                      type="text"
                      required
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="w-full bg-brand-slate-950 border border-brand-slate-850 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-terracotta-500 transition-colors"
                      placeholder="firm name"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-slate-400 mb-1">Professional Role</label>
                    <select
                      value={userRole}
                      onChange={(e) => setUserRole(e.target.value)}
                      className="w-full bg-brand-slate-950 border border-brand-slate-850 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-terracotta-500 transition-colors"
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
                    <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-slate-400 mb-1">State</label>
                    <input
                      type="text"
                      required
                      value={state}
                      onChange={(e) => setState(e.target.value)}
                      className="w-full bg-brand-slate-950 border border-brand-slate-850 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-terracotta-500 transition-colors"
                      placeholder="CA"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-slate-400 mb-1">City</label>
                    <input
                      type="text"
                      required
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      className="w-full bg-brand-slate-950 border border-brand-slate-850 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-terracotta-500 transition-colors"
                      placeholder="city"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] uppercase font-bold tracking-widest text-brand-slate-400 mb-1">Technical Inquiry Message</label>
                  <textarea
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    rows={4}
                    className="w-full bg-brand-slate-950 border border-brand-slate-850 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-terracotta-500 transition-colors resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-brand-terracotta-600 hover:bg-brand-terracotta-700 disabled:bg-brand-terracotta-800 text-white font-bold py-4 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 text-sm shadow-lg shadow-brand-terracotta-600/20"
                >
                  {submitting ? (
                    <span className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  ) : (
                    <>
                      <Send className="w-4 h-4 shrink-0" />
                      Submit Sample / Price Request
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
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
        <ContactUs />
      </div>
    </ToastProvider>
  );
}
