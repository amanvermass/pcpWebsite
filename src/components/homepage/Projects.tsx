"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, User, HardHat, Calendar, Layers, Eye, X } from "lucide-react";

interface Project {
  id: string;
  name: string;
  location: string;
  type: string;
  architect: string;
  builder: string;
  year: string;
  productsUsed: string[];
  image: string;
  desc: string;
}

export const Projects: React.FC = () => {
  const [selectedType, setSelectedType] = useState("All");
  const [activeProjectModal, setActiveProjectModal] = useState<Project | null>(null);

  const projectTypes = ["All", "Commercial", "Residential", "Industrial", "Civic"];

  const projects: Project[] = [
    {
      id: "proj1",
      name: "The Slate Facade Atrium",
      location: "Portland, Oregon",
      type: "Commercial",
      architect: "Kohn Pedersen Fox (KPF)",
      builder: "Turner Construction",
      year: "2025",
      productsUsed: ["Natural Terracotta Cladding Tile", "Supreme Insulated AAC Block"],
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80",
      desc: "A 14-storey commercial office structure utilizing custom fired terracotta rainscreen panels for energy shielding, supported by high-insulating AAC block interior infill walls.",
    },
    {
      id: "proj2",
      name: "Verdant Clay Eco-Villa",
      location: "Austin, Texas",
      type: "Residential",
      architect: "Studio Rick Joy",
      builder: "Beck Group",
      year: "2024",
      productsUsed: ["Classic Clay Facing Brick", "Thermolite Structural Hollow Block"],
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
      desc: "A luxury passive-solar residence incorporating structural clay hollow blocks to create high thermal mass walls, faced with traditional charcoal-toned clay facing bricks.",
    },
    {
      id: "proj3",
      name: "Logistics Center & Factory HQ",
      location: "Chicago, Illinois",
      type: "Industrial",
      architect: "Olson Kundig",
      builder: "Clayco",
      year: "2024",
      productsUsed: ["Heavy-Duty Interlocking Paver", "Thermolite Structural Hollow Block"],
      image: "https://images.unsplash.com/photo-1581094288338-2314dddb7ecc?auto=format&fit=crop&w=800&q=80",
      desc: "Heavy-duty manufacturing complex requiring high load-bearing brick masonry for separation walls and acid-resistant chemical processing floors.",
    },
    {
      id: "proj4",
      name: "Metropolitan Plaza Square",
      location: "Denver, Colorado",
      type: "Civic",
      architect: "Snøhetta",
      builder: "Mortenson Construction",
      year: "2025",
      productsUsed: ["Heavy-Duty Interlocking Paver"],
      image: "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?auto=format&fit=crop&w=800&q=80",
      desc: "Renovation of the central civic pedestrian plaza utilizing interlocking clay pavers capable of supporting heavy support vehicles and standing up to winter freeze-thaw cycles.",
    },
  ];

  const filteredProjects = selectedType === "All"
    ? projects
    : projects.filter(p => p.type === selectedType);

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

        {/* Projects Grid */}
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
                className="group relative rounded-3xl overflow-hidden border border-brand-slate-800 bg-brand-slate-900/40 aspect-[16/10] w-full cursor-pointer hover:border-brand-slate-700 hover:shadow-2xl hover:shadow-brand-terracotta-500/5 transition-all"
                onClick={() => setActiveProjectModal(p)}
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
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Project Detail Modal */}
      <AnimatePresence>
        {activeProjectModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveProjectModal(null)}
              className="absolute inset-0 bg-brand-slate-950/80 backdrop-blur-md"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-3xl bg-brand-slate-900 rounded-3xl overflow-hidden border border-brand-slate-800 shadow-2xl flex flex-col max-h-[90vh] overflow-y-auto"
            >
              {/* Top Image */}
              <div className="relative aspect-[16/8] w-full bg-brand-slate-950">
                <img
                  src={activeProjectModal.image}
                  alt={activeProjectModal.name}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-slate-900 to-transparent" />
                <button
                  onClick={() => setActiveProjectModal(null)}
                  className="absolute top-4 right-4 p-2 bg-brand-slate-950/70 text-white rounded-full border border-brand-slate-800 hover:bg-brand-slate-800 transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Specifications Content */}
              <div className="p-6 md:p-8 flex flex-col gap-6">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase tracking-widest text-brand-terracotta-500 font-bold bg-brand-terracotta-500/10 px-2.5 py-1 rounded-full">
                      {activeProjectModal.type} Project Case Study
                    </span>
                    <span className="text-xs text-brand-slate-400 flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-brand-terracotta-500 shrink-0" />
                      {activeProjectModal.location}
                    </span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-extrabold text-white mt-3 leading-tight">
                    {activeProjectModal.name}
                  </h3>
                  <p className="text-sm text-brand-slate-350 mt-4 leading-relaxed">
                    {activeProjectModal.desc}
                  </p>
                </div>

                {/* Construction Metadata */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-y border-brand-slate-800/80 py-4 text-sm">
                  <div>
                    <span className="block text-[10px] text-brand-slate-500 uppercase font-bold">Lead Architect</span>
                    <span className="font-semibold text-white mt-0.5 flex items-center gap-1.5">
                      <User className="w-4 h-4 text-brand-terracotta-500 shrink-0" />
                      {activeProjectModal.architect}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-brand-slate-500 uppercase font-bold">General Contractor</span>
                    <span className="font-semibold text-white mt-0.5 flex items-center gap-1.5">
                      <HardHat className="w-4 h-4 text-brand-terracotta-500 shrink-0" />
                      {activeProjectModal.builder}
                    </span>
                  </div>
                  <div>
                    <span className="block text-[10px] text-brand-slate-500 uppercase font-bold">Completion Date</span>
                    <span className="font-semibold text-white mt-0.5 flex items-center gap-1.5">
                      <Calendar className="w-4 h-4 text-brand-terracotta-500 shrink-0" />
                      Year {activeProjectModal.year}
                    </span>
                  </div>
                </div>

                {/* Materials Used tags */}
                <div>
                  <h4 className="text-xs uppercase font-extrabold tracking-widest text-brand-slate-400 mb-3">
                    PCP Products Applied
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {activeProjectModal.productsUsed.map((prod, i) => (
                      <span
                        key={i}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-brand-slate-950 border border-brand-slate-800 rounded-xl text-xs font-semibold text-white"
                      >
                        <Layers className="w-3.5 h-3.5 text-brand-terracotta-500" />
                        {prod}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Quote Action */}
                <div className="flex justify-end pt-2">
                  <button
                    onClick={() => {
                      setActiveProjectModal(null);
                      const contactSection = document.querySelector("#contact");
                      if (contactSection) {
                        contactSection.scrollIntoView({ behavior: "smooth" });
                        const messageTextarea = document.querySelector("#contact-message") as HTMLTextAreaElement;
                        if (messageTextarea) {
                          messageTextarea.value = `I am reviewing the "${activeProjectModal.name}" project. I'm interested in utilizing the same products: ${activeProjectModal.productsUsed.join(", ")}. Please connect me with technical sales.`;
                        }
                      }
                    }}
                    className="bg-brand-terracotta-600 hover:bg-brand-terracotta-700 text-white font-bold py-3 px-6 rounded-xl transition-all text-sm cursor-pointer"
                  >
                    Inquire for Similar Project
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
