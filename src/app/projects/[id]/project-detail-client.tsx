"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/homepage/Header";
import { ContactUs } from "@/components/homepage/ContactUs";
import { Project } from "@/data/projects";
import { products } from "@/data/products";
import Link from "next/link";
import { ArrowLeft, Calendar, MapPin, User, HardHat, Building, Send, ArrowUpRight } from "lucide-react";
import { ToastProvider, useToast } from "@/components/ui/Toast";
import confetti from "canvas-confetti";

interface ProjectDetailClientProps {
  project: Project;
}

function ProjectDetailContent({ project }: ProjectDetailClientProps) {
  const { toast } = useToast();

  // Consultation state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("Architect");
  const [msg, setMsg] = useState(`I am consulting on a project similar to "${project.name}" and would like assistance selecting suitable clay masonry / terracotta facade systems.`);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      const newLead = {
        id: Math.random().toString(36).substring(2, 9),
        name,
        email,
        phone,
        userRole: role,
        message: msg,
        referencedProject: project.name,
        timestamp: new Date().toISOString(),
        stage: "New"
      };

      const existingLeads = JSON.parse(localStorage.getItem("pcp_leads") || "[]");
      existingLeads.push(newLead);
      localStorage.setItem("pcp_leads", JSON.stringify(existingLeads));

      confetti({
        particleCount: 60,
        spread: 50,
        origin: { y: 0.8 }
      });

      toast(`Consultation request for ${project.name} submitted successfully!`, "success");
      setSubmitting(false);

      setName("");
      setEmail("");
      setPhone("");
    }, 1200);
  };

  // Resolve matching product IDs from data
  const matchedProducts = products.filter((prod) => 
    project.productsUsed.some((name) => prod.name.toLowerCase().includes(name.toLowerCase()) || name.toLowerCase().includes(prod.name.toLowerCase()))
  );

  return (
    <div className="flex flex-col min-h-screen bg-brand-slate-950">
      <div className="pt-24 pb-12 bg-brand-slate-900 bg-grid-pattern border-b border-brand-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">


          {/* Back button */}
          <Link href="/projects" className="inline-flex items-center gap-2 text-sm font-bold text-brand-slate-350 hover:text-white mb-6 transition-colors group">
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Case Studies Portfolio
          </Link>

          <div className="max-w-4xl">
            <span className="text-xs uppercase font-extrabold tracking-widest text-brand-terracotta-500 bg-brand-terracotta-500/10 px-3 py-1 rounded-full">
              {project.type} Study
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-white mt-4 tracking-tight leading-tight">
              {project.name}
            </h1>
          </div>
        </div>
      </div>

      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Area - Image & Case description */}
          <div className="lg:col-span-8 space-y-10">
            <div className="aspect-[16/9] w-full rounded-3xl overflow-hidden border border-brand-slate-800 shadow-xl bg-brand-slate-900">
              <img src={project.image} alt={project.name} className="object-cover w-full h-full" />
            </div>

            <div className="bg-brand-slate-900 p-8 rounded-3xl border border-brand-slate-800 space-y-4">
              <h2 className="text-xl font-bold text-white tracking-tight">Project Overview</h2>
              <p className="text-brand-slate-350 text-sm sm:text-base leading-relaxed">
                {project.desc}
              </p>
              <p className="text-brand-slate-400 text-xs sm:text-sm leading-relaxed border-t border-brand-slate-850 pt-4">
                This case study highlights the installation of architectural clay products designed for structural loads, longevity, and aesthetics. The building envelope utilizes specialized cladding details engineered to protect against harsh weather conditions while maintaining an organic building finish.
              </p>
            </div>

            {/* Products applied section */}
            <div className="space-y-6">
              <h2 className="text-xl font-bold text-white tracking-tight">Materials Applied</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {matchedProducts.map((p) => (
                  <div key={p.id} className="bg-brand-slate-900 border border-brand-slate-800 rounded-2xl overflow-hidden flex flex-col justify-between hover:border-brand-slate-700 transition-colors group">
                    <div className="aspect-[16/10] overflow-hidden bg-brand-slate-950">
                      <img src={p.image} alt={p.name} className="object-cover w-full h-full group-hover:scale-102 transition-transform duration-500" />
                    </div>
                    <div className="p-5 flex-grow flex flex-col justify-between gap-4">
                      <div>
                        <span className="text-[9px] uppercase tracking-wider bg-brand-terracotta-600/15 text-brand-terracotta-400 border border-brand-terracotta-600/20 px-2 py-0.5 rounded">
                          {p.category}
                        </span>
                        <h3 className="text-base font-bold text-white mt-2 group-hover:text-brand-terracotta-500 transition-colors">{p.name}</h3>
                      </div>
                      <Link 
                        href={`/products/${p.id}`}
                        className="inline-flex items-center justify-center gap-1.5 py-2.5 rounded-xl text-xs font-bold bg-brand-slate-950 text-brand-slate-300 hover:text-white border border-brand-slate-850 hover:border-brand-slate-700 transition-colors"
                      >
                        Technical Data Sheet
                        <ArrowUpRight className="w-3.5 h-3.5 text-brand-terracotta-500" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Area - Meta specifications & consultation form */}
          <div className="lg:col-span-4 space-y-8">
            {/* Meta data card */}
            <div className="bg-brand-slate-900 border border-brand-slate-800 rounded-3xl p-6 md:p-8 space-y-4">
              <h3 className="text-sm font-bold uppercase tracking-widest text-brand-slate-400 border-b border-brand-slate-850 pb-2">
                Case Sheet Parameters
              </h3>
              <ul className="space-y-4 text-xs">
                <li className="flex gap-3 items-center">
                  <MapPin className="w-4 h-4 text-brand-terracotta-500 shrink-0" />
                  <div>
                    <span className="block text-[10px] text-brand-slate-500 uppercase font-bold">Location</span>
                    <span className="text-white font-semibold">{project.location}</span>
                  </div>
                </li>
                <li className="flex gap-3 items-center">
                  <Calendar className="w-4 h-4 text-brand-terracotta-500 shrink-0" />
                  <div>
                    <span className="block text-[10px] text-brand-slate-500 uppercase font-bold">Year Completed</span>
                    <span className="text-white font-semibold">{project.year}</span>
                  </div>
                </li>
                <li className="flex gap-3 items-center">
                  <User className="w-4 h-4 text-brand-terracotta-500 shrink-0" />
                  <div>
                    <span className="block text-[10px] text-brand-slate-500 uppercase font-bold">Lead Architect</span>
                    <span className="text-white font-semibold">{project.architect}</span>
                  </div>
                </li>
                <li className="flex gap-3 items-center">
                  <HardHat className="w-4 h-4 text-brand-terracotta-500 shrink-0" />
                  <div>
                    <span className="block text-[10px] text-brand-slate-500 uppercase font-bold">Contractor / Builder</span>
                    <span className="text-white font-semibold">{project.builder}</span>
                  </div>
                </li>
                <li className="flex gap-3 items-center">
                  <Building className="w-4 h-4 text-brand-terracotta-500 shrink-0" />
                  <div>
                    <span className="block text-[10px] text-brand-slate-500 uppercase font-bold">Building Sector</span>
                    <span className="text-white font-semibold">{project.type}</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Consultation Request Form */}
            <div className="bg-brand-slate-900 border border-brand-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
              <div>
                <h3 className="text-base font-bold text-white">Consult on Similar Build</h3>
                <p className="text-xs text-brand-slate-450 mt-1">
                  Connect with our specifications desk to advise on brick counts, cladding grids, or load compliance.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[9px] uppercase font-bold tracking-widest text-brand-slate-500 mb-1">Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-brand-slate-950 border border-brand-slate-850 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-terracotta-500"
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
                    className="w-full bg-brand-slate-950 border border-brand-slate-850 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-terracotta-500"
                    placeholder="work email"
                  />
                </div>

                <div>
                  <label className="block text-[9px] uppercase font-bold tracking-widest text-brand-slate-500 mb-1">Phone</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-brand-slate-950 border border-brand-slate-850 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-terracotta-500"
                    placeholder="phone"
                  />
                </div>

                <div>
                  <label className="block text-[9px] uppercase font-bold tracking-widest text-brand-slate-500 mb-1">Role</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full bg-brand-slate-950 border border-brand-slate-850 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-terracotta-500"
                  >
                    <option>Architect</option>
                    <option>Builder/Contractor</option>
                    <option>Distributor/Dealer</option>
                    <option>Developer</option>
                    <option>Homeowner</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[9px] uppercase font-bold tracking-widest text-brand-slate-500 mb-1">Consultation Message</label>
                  <textarea
                    required
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    rows={3}
                    className="w-full bg-brand-slate-950 border border-brand-slate-850 rounded-xl px-3.5 py-2.5 text-xs text-white focus:outline-none focus:border-brand-terracotta-500 resize-none font-sans"
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
                      Request Specifications Review
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

export default function ProjectDetailClient({ project }: ProjectDetailClientProps) {
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
        <ProjectDetailContent project={project} />
        <ContactUs />
      </div>
    </ToastProvider>
  );
}
