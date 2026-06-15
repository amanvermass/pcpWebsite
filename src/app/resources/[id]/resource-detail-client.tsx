"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/homepage/Header";
import { ContactUs } from "@/components/homepage/ContactUs";
import { Resource } from "@/data/resources";
import Link from "next/link";
import { ArrowLeft, Download, Info, Check, Send, AlertTriangle } from "lucide-react";
import { ToastProvider, useToast } from "@/components/ui/Toast";

interface ResourceDetailClientProps {
  resource: Resource;
}

function ResourceDetailContent({ resource }: ResourceDetailClientProps) {
  const { toast } = useToast();

  // Consultation state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [msg, setMsg] = useState(`I require custom engineering files or specific drafting detailing for the product: ${resource.productName}. Please connect me with PCP's CAD technical advisory desk.`);
  const [submitting, setSubmitting] = useState(false);

  const handleDownload = () => {
    toast(`Successfully started download: ${resource.name} (${resource.size})`, "success");
  };

  const handleConsult = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      const newLead = {
        id: Math.random().toString(36).substring(2, 9),
        name,
        email,
        message: msg,
        referencedResource: resource.name,
        timestamp: new Date().toISOString(),
        stage: "New"
      };

      const existingLeads = JSON.parse(localStorage.getItem("pcp_leads") || "[]");
      existingLeads.push(newLead);
      localStorage.setItem("pcp_leads", JSON.stringify(existingLeads));

      toast(`CAD advisory request submitted successfully! We will email you back shortly.`, "success");
      setSubmitting(false);

      setName("");
      setEmail("");
    }, 1200);
  };

  return (
    <div className="flex flex-col min-h-screen bg-brand-slate-950">
      <div className="pt-24 pb-12 bg-brand-slate-900 bg-grid-pattern border-b border-brand-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


          {/* Back button */}
          <Link href="/resources" className="inline-flex items-center gap-2 text-sm font-bold text-brand-slate-350 hover:text-white mb-6 transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Resource Library
          </Link>

          <div className="max-w-4xl">
            <span className="text-xs uppercase font-extrabold tracking-widest text-brand-terracotta-500 bg-brand-terracotta-500/10 px-3 py-1 rounded-full">
              {resource.type} File
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white mt-4 tracking-tight leading-tight">
              {resource.name}
            </h1>
          </div>
        </div>
      </div>

      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Area - File Specs and Details */}
          <div className="lg:col-span-8 space-y-10">
            {/* Download box */}
            <div className="bg-brand-slate-900 p-8 rounded-3xl border border-brand-slate-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 shadow-xl">
              <div className="space-y-1">
                <span className="text-xs text-brand-slate-450 uppercase font-bold tracking-wider">File Format: {resource.format}</span>
                <h2 className="text-2xl font-extrabold text-white leading-tight">Ready for Download</h2>
                <p className="text-xs text-brand-slate-400">Total downloads recorded: {resource.downloadsCount} times</p>
              </div>
              <button
                onClick={handleDownload}
                className="w-full sm:w-auto bg-brand-terracotta-600 hover:bg-brand-terracotta-700 text-white font-bold px-8 py-4 rounded-xl transition-all cursor-pointer text-sm flex items-center justify-center gap-2 shadow-lg shadow-brand-terracotta-600/20"
              >
                Download File ({resource.size})
                <Download className="w-4 h-4" />
              </button>
            </div>

            {/* Description */}
            <div className="bg-brand-slate-900 p-8 rounded-3xl border border-brand-slate-800 space-y-4">
              <h2 className="text-xl font-bold text-white tracking-tight">Resource Description</h2>
              <p className="text-brand-slate-350 text-sm sm:text-base leading-relaxed">
                {resource.desc}
              </p>
              <div className="mt-4 p-4 bg-brand-slate-950 border border-brand-slate-850 rounded-2xl flex gap-3 items-start text-xs text-brand-slate-400">
                <AlertTriangle className="w-5 h-5 text-brand-terracotta-500 shrink-0 mt-0.5" />
                <p className="leading-relaxed">
                  These technical drawings are meant to guide structural configurations. Always cross-reference sizes, load capabilities, and fire clearances with local building codes and certified engineering consultants.
                </p>
              </div>
            </div>

            {/* File Parameters Sheet */}
            <div className="bg-brand-slate-900 p-8 rounded-3xl border border-brand-slate-800 space-y-6">
              <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                <Info className="w-5 h-5 text-brand-terracotta-500" />
                Resource Metadata
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 text-sm">
                <div className="flex justify-between py-2 border-b border-brand-slate-850/60">
                  <span className="text-brand-slate-450 font-semibold">Associated Product</span>
                  <Link href={`/products/${resource.productId}`} className="text-brand-terracotta-400 hover:underline font-bold">
                    {resource.productName}
                  </Link>
                </div>
                <div className="flex justify-between py-2 border-b border-brand-slate-850/60">
                  <span className="text-brand-slate-450 font-semibold">File Version</span>
                  <span className="text-white font-bold">v2.1.4</span>
                </div>
                <div className="flex justify-between py-2 border-b border-brand-slate-850/60">
                  <span className="text-brand-slate-450 font-semibold">Author Office</span>
                  <span className="text-white font-bold">{resource.author}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-brand-slate-850/60">
                  <span className="text-brand-slate-455 font-semibold">File Format</span>
                  <span className="text-white font-bold">.{resource.format.toLowerCase()}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-brand-slate-850/60">
                  <span className="text-brand-slate-450 font-semibold">Release Date</span>
                  <span className="text-white font-bold">{resource.updatedAt}</span>
                </div>
                {resource.compatibility && (
                  <div className="flex justify-between py-2 border-b border-brand-slate-850/60 md:col-span-2">
                    <span className="text-brand-slate-450 font-semibold">Software Compatibility</span>
                    <span className="text-white font-bold">{resource.compatibility}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Area - Consultation Form */}
          <div className="lg:col-span-4">
            <div className="bg-brand-slate-900 border border-brand-slate-800 rounded-3xl p-6 md:p-8 space-y-6 sticky top-[100px] shadow-xl">
              <div>
                <h3 className="text-base font-bold text-white">Custom CAD detailing</h3>
                <p className="text-xs text-brand-slate-450 mt-1">
                  Need customized layouts? Submit your parameter query to get bespoke files for your construction site.
                </p>
              </div>

              <form onSubmit={handleConsult} className="space-y-4">
                <div>
                  <label className="block text-[9px] uppercase font-bold tracking-widest text-brand-slate-500 mb-1">Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-brand-slate-950 border border-brand-slate-855 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-terracotta-500"
                    placeholder="Enter name"
                  />
                </div>

                <div>
                  <label className="block text-[9px] uppercase font-bold tracking-widest text-brand-slate-500 mb-1">Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-brand-slate-950 border border-brand-slate-855 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-terracotta-500"
                    placeholder="work email"
                  />
                </div>

                <div>
                  <label className="block text-[9px] uppercase font-bold tracking-widest text-brand-slate-500 mb-1">Detailing Request</label>
                  <textarea
                    required
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    rows={4}
                    className="w-full bg-brand-slate-950 border border-brand-slate-855 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-terracotta-500 resize-none font-sans"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-brand-terracotta-600 hover:bg-brand-terracotta-700 disabled:bg-brand-terracotta-800 text-white font-bold py-3 rounded-xl transition-all cursor-pointer text-xs flex items-center justify-center gap-1.5"
                >
                  {submitting ? (
                    <span className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      Request CAD Support
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <ContactUs />
    </div>
  );
}

export default function ResourceDetailClient({ resource }: ResourceDetailClientProps) {
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
        <ResourceDetailContent resource={resource} />
        <ContactUs />
      </div>
    </ToastProvider>
  );
}
