"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/homepage/Header";
import { ContactUs } from "@/components/homepage/ContactUs";
import { projects, Project } from "@/data/projects";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Calendar, Layers, Eye, Filter, ChevronRight, ArrowRight } from "lucide-react";
import { ToastProvider } from "@/components/ui/Toast";

export default function ProjectsPage() {
  const [selectedType, setSelectedType] = useState("All");
  const [darkMode, setDarkMode] = useState(true);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
    }
  }, [darkMode]);

  const projectTypes = ["All", "Commercial", "Residential", "Industrial", "Civic"];

  const filteredProjects = selectedType === "All"
    ? projects
    : projects.filter(p => p.type === selectedType);

  return (
    <ToastProvider>
      <div className="flex flex-col min-h-screen bg-brand-slate-950">
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />

        <div className="pt-24 pb-12 bg-brand-slate-900 bg-grid-pattern border-b border-brand-slate-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


            <div className="max-w-3xl">
              <span className="text-xs uppercase font-extrabold tracking-widest text-brand-terracotta-500 bg-brand-terracotta-500/10 px-3 py-1 rounded-full">
                Architectural Work
              </span>
              <h1 className="text-4xl sm:text-5xl font-extrabold text-white mt-4 tracking-tight">
                Architectural Projects
              </h1>
              <p className="text-brand-slate-400 mt-4 text-base sm:text-lg leading-relaxed">
                Explore our portfolio of completed projects. From heavy-duty commercial plazas to low-energy residential homes, discover how we build with durability.
              </p>
            </div>
          </div>
        </div>

        {/* Project Filters */}
        <div className="sticky top-[72px] z-30 bg-brand-slate-950/80 backdrop-blur-md border-b border-brand-slate-800/60 py-4 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 overflow-x-auto scrollbar-none">
            <div className="flex items-center gap-2 text-brand-slate-400 text-sm font-bold shrink-0">
              <Filter className="w-4 h-4 text-brand-terracotta-500" />
              <span>Project Type:</span>
            </div>
            <div className="flex gap-2">
              {projectTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer border whitespace-nowrap ${
                    selectedType === type
                      ? "bg-brand-terracotta-600 border-brand-terracotta-600 text-white shadow-md shadow-brand-terracotta-600/20"
                      : "bg-brand-slate-900 border-brand-slate-800 text-brand-slate-400 hover:text-white"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Projects Grid */}
        <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12 flex-grow">
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((p) => (
                <motion.div
                  key={p.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.4 }}
                  className="group relative rounded-3xl overflow-hidden border border-brand-slate-800 bg-brand-slate-900/40 aspect-[16/10] w-full hover:border-brand-slate-700 hover:shadow-2xl hover:shadow-brand-terracotta-500/5 transition-all"
                >
                  {/* Background Image */}
                  <img
                    src={p.image}
                    alt={p.name}
                    className="absolute inset-0 object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                  
                  {/* Overlays */}
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-slate-950 via-brand-slate-950/60 to-brand-slate-950/10" />
                  
                  {/* Details */}
                  <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between z-10">
                    <div className="flex justify-between items-start">
                      <span className="bg-brand-terracotta-600 text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-md">
                        {p.type}
                      </span>
                      <Link 
                        href={`/projects/${p.id}`}
                        className="p-2 bg-brand-slate-950/70 border border-brand-slate-800 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Eye className="w-4 h-4" />
                      </Link>
                    </div>

                    <div>
                      <div className="flex items-center gap-1.5 text-xs text-brand-slate-350 font-bold uppercase tracking-wider mb-2">
                        <MapPin className="w-3.5 h-3.5 text-brand-terracotta-500" />
                        {p.location}
                      </div>
                      <Link href={`/projects/${p.id}`}>
                        <h3 className="text-xl sm:text-2xl font-extrabold text-white group-hover:text-brand-terracotta-400 transition-colors leading-tight">
                          {p.name}
                        </h3>
                      </Link>
                      <p className="text-xs text-brand-slate-400 mt-2 line-clamp-2 leading-relaxed">
                        {p.desc}
                      </p>

                      <Link 
                        href={`/projects/${p.id}`}
                        className="mt-4 inline-flex items-center gap-1.5 text-xs font-bold text-brand-terracotta-400 hover:text-white transition-colors"
                      >
                        Explore Project Details
                        <ChevronRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </main>

        <ContactUs />
      </div>
    </ToastProvider>
  );
}
