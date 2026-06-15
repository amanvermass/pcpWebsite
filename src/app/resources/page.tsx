"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/homepage/Header";
import { ContactUs } from "@/components/homepage/ContactUs";
import { resources, Resource } from "@/data/resources";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Download, Eye, Filter, Search, HardHat, FileCode, Info } from "lucide-react";
import { ToastProvider, useToast } from "@/components/ui/Toast";

function ResourcesContent() {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFormat, setSelectedFormat] = useState("All");
  const [selectedType, setSelectedType] = useState("All");

  useEffect(() => {
    const typeParam = searchParams.get("type");
    if (typeParam) {
      setSelectedType(typeParam);
    } else {
      setSelectedType("All");
    }

    const formatParam = searchParams.get("format");
    if (formatParam) {
      setSelectedFormat(formatParam);
    } else {
      setSelectedFormat("All");
    }
  }, [searchParams]);

  const formats = ["All", "PDF", "RVT", "DWG"];
  const types = ["All", "CAD Detail", "BIM Revit Object", "Technical Datasheet", "Installation Guide"];

  const filteredResources = resources.filter((res) => {
    const matchesSearch = res.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          res.productName.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFormat = selectedFormat === "All" || res.format === selectedFormat;
    const matchesType = selectedType === "All" || res.type === selectedType;

    return matchesSearch && matchesFormat && matchesType;
  });

  const handleDownload = (res: Resource) => {
    toast(`Successfully downloaded: ${res.name} (${res.size})`, "success");
  };

  const getFormatIcon = (format: string) => {
    switch (format) {
      case "RVT": return <HardHat className="w-5 h-5 text-brand-terracotta-500" />;
      case "DWG": return <FileCode className="w-5 h-5 text-brand-emerald-500" />;
      default: return <FileText className="w-5 h-5 text-brand-terracotta-600" />;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-brand-slate-950">
      <div className="pt-24 pb-12 bg-brand-slate-900 bg-grid-pattern border-b border-brand-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


          <div className="max-w-3xl">
            <span className="text-xs uppercase font-extrabold tracking-widest text-brand-terracotta-500 bg-brand-terracotta-500/10 px-3 py-1 rounded-full">
              BIM / CAD Library
            </span>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-white mt-4 tracking-tight">
              Technical Resources
            </h1>
            <p className="text-brand-slate-400 mt-4 text-base sm:text-lg leading-relaxed">
              Download product specifications, installation guidelines, Revit building models, and AutoCAD detail drafting sheets to embed in your construction layouts.
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filters panel */}
      <div className="sticky top-[72px] z-30 bg-brand-slate-950/80 backdrop-blur-md border-b border-brand-slate-800/60 py-4 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Search bar */}
          <div className="relative flex-grow max-w-md">
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-brand-slate-500" />
            <input
              type="text"
              placeholder="Search resource name or product..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-brand-slate-900 border border-brand-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-brand-terracotta-500 transition-colors"
            />
          </div>

          {/* Filters selection */}
          <div className="flex flex-wrap gap-4 items-center">
            {/* Format Filter */}
            <div className="flex gap-1.5 items-center">
              <span className="text-xs text-brand-slate-450 font-bold uppercase">Format:</span>
              <div className="flex gap-1">
                {formats.map((fmt) => (
                  <button
                    key={fmt}
                    onClick={() => setSelectedFormat(fmt)}
                    className={`px-3 py-1.5 rounded-lg text-[10px] font-extrabold transition-all cursor-pointer border ${
                      selectedFormat === fmt
                        ? "bg-brand-terracotta-600 border-brand-terracotta-600 text-white"
                        : "bg-brand-slate-900 border-brand-slate-800 text-brand-slate-450 hover:text-white"
                    }`}
                  >
                    {fmt}
                  </button>
                ))}
              </div>
            </div>

            {/* Type Filter */}
            <div className="flex gap-1.5 items-center">
              <span className="text-xs text-brand-slate-450 font-bold uppercase">Category:</span>
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="bg-brand-slate-900 border border-brand-slate-800 text-brand-slate-350 text-xs font-bold py-1.5 px-3 rounded-lg focus:outline-none focus:border-brand-terracotta-500 cursor-pointer"
              >
                {types.map((t) => (
                  <option key={t} value={t}>{t}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      {/* Resources results */}
      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 flex-grow">
        {filteredResources.length === 0 ? (
          <div className="text-center py-20 bg-brand-slate-900 rounded-3xl border border-brand-slate-800">
            <p className="text-brand-slate-400 font-semibold">No resource matches your query.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredResources.map((res) => (
              <div
                key={res.id}
                className="bg-brand-slate-900 border border-brand-slate-800 rounded-2xl p-6 hover:border-brand-slate-700 transition-colors flex flex-col justify-between gap-6 group"
              >
                <div className="flex gap-4 items-start">
                  <div className="p-3 bg-brand-slate-950 border border-brand-slate-850 rounded-xl shrink-0 group-hover:scale-105 transition-transform duration-300">
                    {getFormatIcon(res.format)}
                  </div>
                  <div className="space-y-1">
                    <span className="text-[10px] uppercase font-bold text-brand-terracotta-400 tracking-wider bg-brand-terracotta-600/10 border border-brand-terracotta-600/15 px-2 py-0.5 rounded">
                      {res.type}
                    </span>
                    <Link href={`/resources/${res.id}`}>
                      <h3 className="text-lg font-bold text-white group-hover:text-brand-terracotta-400 transition-colors mt-2">
                        {res.name}
                      </h3>
                    </Link>
                    <span className="block text-xs text-brand-slate-450 font-semibold">
                      Associated Product: <Link href={`/products/${res.productId}`} className="text-brand-slate-350 hover:underline">{res.productName}</Link>
                    </span>
                    <p className="text-xs text-brand-slate-400 leading-relaxed mt-2 line-clamp-2">
                      {res.desc}
                    </p>
                  </div>
                </div>

                <div className="flex gap-3 pt-4 border-t border-brand-slate-850">
                  <Link
                    href={`/resources/${res.id}`}
                    className="flex-1 bg-brand-slate-950 border border-brand-slate-850 hover:bg-brand-slate-850 text-white font-bold py-3 rounded-xl transition-all text-center text-xs flex items-center justify-center gap-1.5"
                  >
                    View File Meta
                    <Info className="w-3.5 h-3.5 text-brand-terracotta-500" />
                  </Link>
                  <button
                    onClick={() => handleDownload(res)}
                    className="flex-1 bg-brand-terracotta-600 hover:bg-brand-terracotta-700 text-white font-bold py-3 rounded-xl shadow-md transition-all text-center text-xs flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    Download File ({res.size})
                    <Download className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

export default function ResourcesPage() {
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
          <ResourcesContent />
        </Suspense>
        <ContactUs />
      </div>
    </ToastProvider>
  );
}
