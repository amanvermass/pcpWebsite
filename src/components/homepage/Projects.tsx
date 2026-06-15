import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, User, HardHat, Calendar, Layers, Eye, X, ArrowRight } from "lucide-react";
import Link from "next/link";
import { projects, Project } from "../../data/projects";

export const Projects: React.FC<{ teaser?: boolean }> = ({ teaser = false }) => {
  const [selectedType, setSelectedType] = useState("All");
  const [activeProjectModal, setActiveProjectModal] = useState<Project | null>(null);

  const projectTypes = ["All", "Commercial", "Residential", "Industrial", "Civic"];

  const filteredProjects = teaser
    ? projects.slice(0, 2)
    : (selectedType === "All" ? projects : projects.filter(p => p.type === selectedType));

  return (
    <section id="projects" className="py-24 bg-brand-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-extrabold tracking-widest text-brand-terracotta-500 bg-brand-terracotta-500/10 px-3 py-1 rounded-full">
            Case Studies
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 tracking-tight">
            Architectural Projects
          </h2>
          <p className="text-brand-slate-400 mt-3">
            See our high-performance materials in action. From modern office towers to zero-energy residential concepts, we engineer structural durability.
          </p>
        </div>

        {/* Project Filters */}
        {!teaser && (
          <div className="flex flex-wrap justify-center gap-2 mb-12">
            {projectTypes.map((type) => (
              <button
                key={type}
                onClick={() => setSelectedType(type)}
                className={`px-5 py-2.5 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                  selectedType === type
                    ? "bg-brand-terracotta-600 text-white shadow-lg shadow-brand-terracotta-600/30"
                    : "bg-brand-slate-900 text-brand-slate-400 hover:text-white border border-brand-slate-800"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        )}

        {/* Projects Grid */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((p) => (
              <Link
                key={p.id}
                href={`/projects/${p.id}`}
                className="group relative rounded-3xl overflow-hidden border border-brand-slate-800 bg-brand-slate-900/40 aspect-[16/10] w-full cursor-pointer hover:border-brand-slate-700 hover:shadow-2xl hover:shadow-brand-terracotta-500/5 transition-all"
              >
                {/* Background Image */}
                <img
                  src={p.image}
                  alt={p.name}
                  className="absolute inset-0 object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                />
                
                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-slate-950 via-brand-slate-950/60 to-brand-slate-950/10" />
                
                {/* Details layout */}
                <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between z-10">
                  <div className="flex justify-between items-start">
                    <span className="bg-brand-terracotta-600 text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1 rounded-md">
                      {p.type}
                    </span>
                    <span className="p-2 bg-brand-slate-950/70 border border-brand-slate-800 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity">
                      <Eye className="w-4 h-4" />
                    </span>
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5 text-xs text-brand-terracotta-400 font-bold">
                      <MapPin className="w-3.5 h-3.5 shrink-0" />
                      {p.location}
                    </div>
                    <h3 className="text-xl md:text-2xl font-extrabold text-white mt-1 leading-tight group-hover:text-brand-terracotta-400 transition-colors">
                      {p.name}
                    </h3>
                    
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 mt-4 pt-4 border-t border-brand-slate-800/80 text-xs text-brand-slate-400">
                      <span className="flex items-center gap-1"><User className="w-3.5 h-3.5 text-brand-terracotta-500 shrink-0" /> {p.architect}</span>
                      <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-brand-terracotta-500 shrink-0" /> Completed {p.year}</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </AnimatePresence>
        </motion.div>

        {teaser && (
          <div className="text-center mt-16">
            <Link
              href="/projects"
              className="inline-flex items-center gap-2 bg-brand-terracotta-600 hover:bg-brand-terracotta-700 text-white px-8 py-4 rounded-xl font-bold transition-all shadow-lg shadow-brand-terracotta-600/20 cursor-pointer"
            >
              View All Architectural Cases
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};
