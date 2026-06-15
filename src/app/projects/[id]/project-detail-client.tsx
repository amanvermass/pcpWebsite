"use client";

import React, { useState, useEffect, useRef } from "react";
import { Header } from "@/components/homepage/Header";
import { Footer } from "@/components/homepage/Footer";
import { Project, projects } from "@/data/projects";
import { products } from "@/data/products";
import Link from "next/link";
import { ArrowLeft, Calendar, MapPin, User, HardHat, Building, Send, ArrowUpRight, ArrowRight } from "lucide-react";
import { ToastProvider, useToast } from "@/components/ui/Toast";
import confetti from "canvas-confetti";
import { motion, useScroll, useTransform, useInView } from "framer-motion";

interface ProjectDetailClientProps {
  project: Project;
}

// Custom StatCounter with count-up animation
const StatCounter: React.FC<{ value: number; suffix: string; label: string }> = ({ value, suffix, label }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const duration = 1500; // 1.5 seconds
    const end = value;
    const incrementTime = Math.max(Math.floor(duration / end), 16);
    
    const timer = setInterval(() => {
      start += Math.ceil(end / (duration / incrementTime));
      if (start >= end) {
        clearInterval(timer);
        setCount(end);
      } else {
        setCount(start);
      }
    }, incrementTime);

    return () => clearInterval(timer);
  }, [isInView, value]);

  return (
    <div ref={ref} className="flex flex-col py-4 px-6 border-b sm:border-b-0 sm:border-r border-brand-gold/10 last:border-none">
      <div className="text-4xl sm:text-5xl font-light font-cormorant text-brand-gold flex items-baseline justify-center sm:justify-start">
        <span>{count.toLocaleString()}</span>
        <span className="text-lg font-light ml-1 text-brand-sand/70">{suffix}</span>
      </div>
      <span className="block text-[10px] tracking-[0.2em] uppercase text-brand-sand/50 mt-2 font-poppins font-semibold">
        {label}
      </span>
    </div>
  );
};

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

  // Resolve matching products
  const matchedProducts = products.filter((prod) => 
    project.productsUsed.some((name) => prod.name.toLowerCase().includes(name.toLowerCase()) || name.toLowerCase().includes(prod.name.toLowerCase()))
  );

  // Parallax Cover Setup
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 800], [0, 180]);

  // Determine statistics based on project id
  const getProjectStats = (id: string) => {
    switch (id) {
      case "proj1":
        return { clay: 2400, days: 420, crew: 12 };
      case "proj2":
        return { clay: 850, days: 280, crew: 4 };
      case "proj3":
        return { clay: 4500, days: 360, crew: 18 };
      case "proj4":
        return { clay: 1850, days: 180, crew: 6 };
      default:
        return { clay: 1200, days: 240, crew: 8 };
    }
  };

  const stats = getProjectStats(project.id);
  const relatedProjects = projects.filter((p) => p.id !== project.id);

  return (
    <div className="flex flex-col min-h-screen bg-brand-black text-brand-offwhite">
      {/* Fullscreen Parallax Cover Image Banner */}
      <div ref={containerRef} className="relative w-full h-[60vh] sm:h-[70vh] overflow-hidden bg-brand-black">
        <motion.div 
          style={{ y: imageY }}
          className="absolute inset-0 w-full h-[120%] -top-[10%]"
        >
          <img 
            src={project.image} 
            alt={project.name} 
            className="w-full h-full object-cover" 
          />
        </motion.div>
        
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/45 to-transparent z-10" />

        {/* Floating Content Overlays */}
        <div className="absolute inset-0 z-20 flex flex-col justify-between p-6 sm:p-12 max-w-7xl mx-auto w-full pt-28">
          <Link 
            href="/projects" 
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-brand-sand hover:text-brand-gold transition-colors group w-fit font-poppins"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1.5 transition-transform text-brand-gold" />
            <span>Back to Portfolio</span>
          </Link>
          
          <div className="max-w-4xl mt-auto">
            <span className="text-[9px] uppercase font-bold tracking-[0.25em] text-brand-gold bg-brand-gold/5 px-3.5 py-1.5 border border-brand-gold/20 rounded-none w-fit block mb-4 font-poppins">
              {project.type} Case Study
            </span>
            <h1 className="text-4xl sm:text-6xl font-normal font-cormorant text-brand-offwhite tracking-wide leading-none">
              {project.name}
            </h1>
            <div className="flex items-center gap-2 text-xs text-brand-sand/75 mt-4 font-poppins">
              <MapPin className="w-4 h-4 text-brand-gold" />
              <span>{project.location}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Statistics Bar */}
      <div className="border-y border-brand-gold/10 bg-brand-charcoal py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-3 gap-8">
          <StatCounter value={stats.clay} suffix=" tons" label="Fired Clay Applied" />
          <StatCounter value={stats.days} suffix=" days" label="Construction Duration" />
          <StatCounter value={stats.crew} suffix=" experts" label="Structural Crew Size" />
        </div>
      </div>

      {/* Main Details Section */}
      <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Left Column - Overview and Materials */}
          <div className="lg:col-span-8 space-y-12">
            
            {/* Project Overview */}
            <div className="bg-brand-charcoal p-8 sm:p-10 border border-brand-gold/10 space-y-6">
              <h2 className="text-3xl font-normal font-cormorant text-brand-offwhite">Project Overview</h2>
              <p className="text-brand-sand/80 text-sm sm:text-base leading-relaxed font-poppins">
                {project.desc}
              </p>
              <p className="text-brand-sand/50 text-xs sm:text-sm leading-relaxed border-t border-brand-gold/10 pt-6 font-poppins">
                This case study highlights the installation of architectural clay products designed for structural loads, longevity, and aesthetics. The building envelope utilizes specialized cladding details engineered to protect against harsh weather conditions while maintaining an organic building finish.
              </p>
            </div>

            {/* Materials Applied */}
            <div className="space-y-6">
              <h2 className="text-3xl font-normal font-cormorant text-brand-offwhite">Materials Applied</h2>
              <div className="grid grid-cols-1 gap-6">
                {matchedProducts.map((p) => (
                  <div key={p.id} className="bg-brand-charcoal border border-brand-gold/10 overflow-hidden flex flex-col md:flex-row hover:border-brand-gold/30 transition-colors group">
                    <div className="md:w-[250px] aspect-[16/10] md:aspect-auto overflow-hidden bg-brand-black relative shrink-0">
                      <img src={p.image} alt={p.name} className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500" />
                    </div>
                    <div className="p-6 flex-grow flex flex-col justify-between gap-4">
                      <div>
                        <span className="text-[9px] uppercase tracking-wider bg-brand-gold/5 text-brand-gold border border-brand-gold/20 px-2 py-0.5 font-poppins">
                          {p.category}
                        </span>
                        <h3 className="text-xl font-normal font-cormorant text-brand-offwhite mt-2 group-hover:text-brand-gold transition-colors">{p.name}</h3>
                        <p className="text-xs font-poppins text-brand-sand/70 mt-1 leading-relaxed">{p.desc}</p>
                      </div>
                      <Link 
                        href={`/products/${p.id}`}
                        className="inline-flex items-center justify-center gap-1.5 py-2 px-4 text-xs font-semibold tracking-wider uppercase bg-brand-black text-brand-sand hover:text-brand-offwhite border border-brand-gold/10 hover:border-brand-gold/30 transition-colors w-fit font-poppins"
                      >
                        <span>Technical Specifications</span>
                        <ArrowUpRight className="w-3.5 h-3.5 text-brand-gold" />
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Meta & Form */}
          <div className="lg:col-span-4 space-y-8">
            
            {/* Meta data parameters */}
            <div className="bg-brand-charcoal border border-brand-gold/10 p-6 md:p-8 space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-widest text-brand-gold border-b border-brand-gold/10 pb-3 font-poppins">
                Case Sheet Parameters
              </h3>
              <ul className="space-y-3">
                <li className="flex gap-4 items-center py-2 border-b border-brand-gold/5 last:border-0">
                  <MapPin className="w-4 h-4 text-brand-gold shrink-0" />
                  <div>
                    <span className="block text-[9px] text-brand-sand/50 uppercase font-bold tracking-widest font-poppins">Location</span>
                    <span className="text-brand-offwhite font-normal text-sm font-poppins">{project.location}</span>
                  </div>
                </li>
                <li className="flex gap-4 items-center py-2 border-b border-brand-gold/5 last:border-0">
                  <Calendar className="w-4 h-4 text-brand-gold shrink-0" />
                  <div>
                    <span className="block text-[9px] text-brand-sand/50 uppercase font-bold tracking-widest font-poppins">Year Completed</span>
                    <span className="text-brand-offwhite font-normal text-sm font-poppins">{project.year}</span>
                  </div>
                </li>
                <li className="flex gap-4 items-center py-2 border-b border-brand-gold/5 last:border-0">
                  <User className="w-4 h-4 text-brand-gold shrink-0" />
                  <div>
                    <span className="block text-[9px] text-brand-sand/50 uppercase font-bold tracking-widest font-poppins">Lead Architect</span>
                    <span className="text-brand-offwhite font-normal text-sm font-poppins">{project.architect}</span>
                  </div>
                </li>
                <li className="flex gap-4 items-center py-2 border-b border-brand-gold/5 last:border-0">
                  <HardHat className="w-4 h-4 text-brand-gold shrink-0" />
                  <div>
                    <span className="block text-[9px] text-brand-sand/50 uppercase font-bold tracking-widest font-poppins">Contractor / Builder</span>
                    <span className="text-brand-offwhite font-normal text-sm font-poppins">{project.builder}</span>
                  </div>
                </li>
                <li className="flex gap-4 items-center py-2 border-b border-brand-gold/5 last:border-0">
                  <Building className="w-4 h-4 text-brand-gold shrink-0" />
                  <div>
                    <span className="block text-[9px] text-brand-sand/50 uppercase font-bold tracking-widest font-poppins">Building Sector</span>
                    <span className="text-brand-offwhite font-normal text-sm font-poppins">{project.type}</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Consultation Form */}
            <div className="bg-brand-charcoal border border-brand-gold/10 p-6 md:p-8 space-y-6">
              <div>
                <h3 className="text-lg font-normal font-cormorant text-brand-offwhite">Consult on Similar Build</h3>
                <p className="text-xs text-brand-sand/60 mt-1 font-poppins">
                  Connect with our specifications desk to advise on brick counts, cladding grids, or load compliance.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[9px] uppercase font-bold tracking-widest text-brand-sand/50 mb-1 font-poppins">Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-brand-black border border-brand-gold/10 rounded-none px-3.5 py-2.5 text-xs text-brand-offwhite focus:outline-none focus:border-brand-gold font-poppins"
                    placeholder="Enter name"
                  />
                </div>

                <div>
                  <label className="block text-[9px] uppercase font-bold tracking-widest text-brand-sand/50 mb-1 font-poppins">Email</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-brand-black border border-brand-gold/10 rounded-none px-3.5 py-2.5 text-xs text-brand-offwhite focus:outline-none focus:border-brand-gold font-poppins"
                    placeholder="work email"
                  />
                </div>

                <div>
                  <label className="block text-[9px] uppercase font-bold tracking-widest text-brand-sand/50 mb-1 font-poppins">Phone</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-brand-black border border-brand-gold/10 rounded-none px-3.5 py-2.5 text-xs text-brand-offwhite focus:outline-none focus:border-brand-gold font-poppins"
                    placeholder="phone"
                  />
                </div>

                <div>
                  <label className="block text-[9px] uppercase font-bold tracking-widest text-brand-sand/50 mb-1 font-poppins">Role</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="w-full bg-brand-black border border-brand-gold/10 rounded-none px-3.5 py-2.5 text-xs text-brand-offwhite focus:outline-none focus:border-brand-gold font-poppins"
                  >
                    <option>Architect</option>
                    <option>Builder/Contractor</option>
                    <option>Distributor/Dealer</option>
                    <option>Developer</option>
                    <option>Homeowner</option>
                  </select>
                </div>

                <div>
                  <label className="block text-[9px] uppercase font-bold tracking-widest text-brand-sand/50 mb-1 font-poppins">Consultation Message</label>
                  <textarea
                    required
                    value={msg}
                    onChange={(e) => setMsg(e.target.value)}
                    rows={3}
                    className="w-full bg-brand-black border border-brand-gold/10 rounded-none px-3.5 py-2.5 text-xs text-brand-offwhite focus:outline-none focus:border-brand-gold resize-none font-poppins"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full bg-brand-gold hover:bg-brand-offwhite hover:text-brand-black text-brand-black transition-colors font-bold py-3 text-xs uppercase tracking-wider rounded-none flex items-center justify-center gap-1.5 cursor-pointer disabled:bg-brand-gold/50"
                >
                  {submitting ? (
                    <span className="w-4 h-4 rounded-full border-2 border-brand-black border-t-transparent animate-spin" />
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Request Specifications Review</span>
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Related Projects Section */}
        <div className="mt-24 border-t border-brand-gold/10 pt-16">
          <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 mb-10">
            <div>
              <span className="text-[9px] uppercase font-bold tracking-[0.25em] text-brand-gold bg-brand-gold/5 px-3.5 py-1.5 border border-brand-gold/20 rounded-none w-fit block font-poppins">
                FURTHER EXPLORATION
              </span>
              <h2 className="text-3xl sm:text-4xl font-normal font-cormorant text-brand-offwhite mt-4">
                Related Case Studies
              </h2>
            </div>
            
            <Link href="/projects" className="group inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest text-brand-gold hover:text-brand-offwhite transition-colors font-poppins">
              <span>View All Projects</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedProjects.map((p) => (
              <div 
                key={p.id} 
                className="bg-brand-charcoal border border-brand-gold/10 hover:border-brand-gold/30 transition-colors flex flex-col group"
              >
                <Link href={`/projects/${p.id}`} className="block relative aspect-[16/10] overflow-hidden bg-brand-black">
                  <img 
                    src={p.image} 
                    alt={p.name} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 animate-none" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-transparent opacity-80" />
                  <span className="absolute top-4 left-4 bg-brand-black border border-brand-gold/20 text-brand-gold text-[9px] uppercase font-bold tracking-widest px-2.5 py-1 font-poppins">
                    {p.type}
                  </span>
                </Link>
                
                <div className="p-6 flex-grow flex flex-col justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-1 text-[10px] text-brand-sand/60 font-semibold font-poppins">
                      <MapPin className="w-3 h-3 text-brand-gold" />
                      <span>{p.location}</span>
                    </div>
                    <h3 className="text-lg font-normal font-cormorant text-brand-offwhite mt-2 group-hover:text-brand-gold transition-colors leading-tight">
                      {p.name}
                    </h3>
                    <p className="text-xs font-poppins text-brand-sand/70 mt-2 line-clamp-2 leading-relaxed">
                      {p.desc}
                    </p>
                  </div>
                  
                  <Link 
                    href={`/projects/${p.id}`}
                    className="inline-flex items-center gap-1.5 text-[9px] uppercase font-bold tracking-widest text-brand-gold group-hover:text-brand-offwhite transition-colors mt-2 font-poppins"
                  >
                    <span>Explore Details</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
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
      <div className="flex flex-col min-h-screen bg-brand-black text-brand-offwhite">
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />
        <ProjectDetailContent project={project} />
        <Footer />
      </div>
    </ToastProvider>
  );
}
