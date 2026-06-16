"use client";

import React, { useState, useEffect, useRef } from "react";
import { Header } from "@/components/homepage/Header";
import { Footer } from "@/components/homepage/Footer";
import { projects, Project } from "@/data/projects";
import Link from "next/link";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { MapPin, Calendar, Eye, Filter, ArrowRight } from "lucide-react";
import { ToastProvider } from "@/components/ui/Toast";
import { Magnetic } from "@/components/ui/Magnetic";

// Before/After comparison slider component
const BeforeAfterSlider: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [sliderPos, setSliderPos] = useState(50); // percentage (0 to 100)
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(percentage);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    if (e.touches.length > 0) {
      handleMove(e.touches[0].clientX);
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[350px] sm:h-[450px] overflow-hidden border border-brand-gold/15 bg-brand-charcoal select-none cursor-ew-resize"
      onMouseDown={() => setIsDragging(true)}
      onMouseUp={() => setIsDragging(false)}
      onMouseLeave={() => setIsDragging(false)}
      onMouseMove={handleMouseMove}
      onTouchStart={() => setIsDragging(true)}
      onTouchEnd={() => setIsDragging(false)}
      onTouchMove={handleTouchMove}
    >
      {/* Before Image (Excavation/Framing) */}
      <div className="absolute inset-0 z-0">
        <img 
          src="/images/hero-1.jpg" 
          alt="Raw excavation framing" 
          className="w-full h-full object-cover"
        />
        <div className="absolute bottom-4 left-4 bg-brand-black/80 text-brand-gold text-[9px] uppercase tracking-widest px-3 py-1.5 font-bold font-poppins border border-brand-gold/15">
          Excavation & Raw Site
        </div>
      </div>

      {/* After Image (Completed Facade) clipped dynamically */}
      <div 
        className="absolute inset-0 z-10 transition-all pointer-events-none"
        style={{ clipPath: `inset(0 0 0 ${sliderPos}%)` }}
      >
        <img 
          src="/images/hero-2.jpg" 
          alt="Completed luxury building facade" 
          className="absolute inset-0 w-full h-full object-cover"
          style={{ width: containerRef.current?.clientWidth || "100%" }}
        />
        <div className="absolute bottom-4 right-4 bg-brand-gold text-brand-black text-[9px] uppercase tracking-widest px-3 py-1.5 font-bold font-poppins border border-brand-gold">
          Completed Facade
        </div>
      </div>

      {/* Divider slider line */}
      <div 
        className="absolute top-0 bottom-0 w-[1px] bg-brand-gold z-20 pointer-events-none"
        style={{ left: `${sliderPos}%` }}
      >
        {/* Grab handle */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-brand-gold text-brand-black border border-brand-gold flex items-center justify-center shadow-2xl pointer-events-none">
          <span className="text-xs font-bold font-poppins">↔</span>
        </div>
      </div>
    </div>
  );
};

export default function ProjectsPage() {
  const [selectedType, setSelectedType] = useState("All");
  const [darkMode, setDarkMode] = useState(true);
  const [heroIdx, setHeroIdx] = useState(0);

  // Parallax Scroll Tracking
  const { scrollY } = useScroll();
  const heroTextY = useTransform(scrollY, [0, 500], [0, -50]);
  const heroImageY = useTransform(scrollY, [0, 500], [0, 100]);

  // Slideshow montage loop
  useEffect(() => {
    const timer = setInterval(() => {
      setHeroIdx((prev) => (prev + 1) % projects.length);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

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
      <div className="flex flex-col min-h-screen bg-brand-black text-brand-offwhite">
        <Header darkMode={darkMode} setDarkMode={setDarkMode} />

        {/* Fullscreen Project Montage Hero */}
        <div className="relative h-screen w-full flex items-center overflow-hidden bg-black">
          <div className="absolute inset-0 z-0">
            <AnimatePresence mode="wait">
              <motion.div
                key={heroIdx}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 0.35, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.2 }}
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{ backgroundImage: `url(${projects[heroIdx].image})` }}
              />
            </AnimatePresence>
            <div className="absolute inset-0 bg-gradient-to-t from-[#121110] via-[#121110]/80 to-transparent z-10" />
          </div>

          <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full mt-12">
            <motion.div style={{ y: heroTextY }} className="max-w-3xl">
              <span className="text-[10px] uppercase font-bold tracking-[0.35em] text-brand-gold bg-brand-gold/5 px-4 py-1.5 border border-brand-gold/20 rounded-none w-fit block mb-4">
                PCP Case Studies
              </span>
              <h1 className="text-5xl sm:text-7xl font-normal font-cormorant text-[#faf6f2] tracking-wide leading-none">
                Architectural Work.
              </h1>
              <p className="text-brand-sand-400 mt-6 text-sm sm:text-base font-poppins leading-relaxed max-w-xl">
                Explore our portfolio of completed projects. From heavy-duty commercial plazas to low-energy residential homes, discover how we build with durability.
              </p>
            </motion.div>
          </div>

          {/* Scroll cue indicator */}
          <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2">
            <span className="text-[9px] font-semibold tracking-widest uppercase text-brand-sand/55 font-poppins">
              Explore Portfolio
            </span>
            <div className="w-px h-10 bg-brand-gold/20 relative overflow-hidden">
              <motion.div 
                animate={{ y: ["-100%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-0 left-0 w-full h-4 bg-brand-gold"
              />
            </div>
          </div>
        </div>

        {/* Project Filters Sticky Bar */}
        <div className="sticky top-[72px] z-30 bg-brand-charcoal/95 border-y border-brand-gold/10 py-4.5 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 overflow-x-auto scrollbar-none">
            <div className="flex items-center gap-2 text-brand-sand/50 text-xs font-bold uppercase tracking-widest shrink-0 font-poppins">
              <Filter className="w-4 h-4 text-brand-gold" />
              <span>Project Type:</span>
            </div>
            <div className="flex gap-2.5">
              {projectTypes.map((type) => (
                <button
                  key={type}
                  onClick={() => setSelectedType(type)}
                  className={`px-5 py-2.5 rounded-none text-[10px] uppercase tracking-wider font-poppins font-medium transition-colors cursor-pointer border ${
                    selectedType === type
                      ? "bg-brand-gold border-brand-gold text-brand-black"
                      : "bg-brand-black border-brand-gold/10 text-brand-sand hover:text-brand-offwhite"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Projects Metro Grid */}
        <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16 flex-grow">
          <motion.div 
            layout
            className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start"
          >
            <AnimatePresence mode="popLayout">
              {filteredProjects.map((p, index) => {
                // Determine responsive grid spanning based on index to form a custom metro grid
                let spanClass = "md:col-span-6 aspect-[16/10]"; // default
                if (index % 3 === 0) {
                  spanClass = "md:col-span-8 aspect-[16/10]"; // landscape wide
                } else if (index % 3 === 1) {
                  spanClass = "md:col-span-4 aspect-[1/1]"; // square tile
                }
                
                return (
                  <ProductCard 
                    key={p.id} 
                    project={p} 
                    spanClass={spanClass} 
                  />
                );
              })}
            </AnimatePresence>
          </motion.div>

          {/* Interactive Before/After Sweep Section */}
          <div className="mt-28 border-t border-brand-gold/10 pt-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
              <div className="lg:col-span-5 flex flex-col gap-4">
                <span className="text-[10px] uppercase font-bold tracking-[0.35em] text-brand-gold bg-brand-gold/5 px-4 py-1.5 border border-brand-gold/20 rounded-none w-fit block font-poppins">
                  CONSTRUCTION CHRONICLES
                </span>
                <h2 className="text-3xl sm:text-4xl font-normal font-cormorant text-brand-offwhite leading-tight">
                  Raw Site Excavation vs. Finished Envelope
                </h2>
                <p className="text-xs font-poppins text-brand-sand/70 leading-relaxed mt-2">
                  Drag the center golden handle to inspect the progress from the raw framing and groundwork stage to the completed, energy-shielded terracotta tile facade build.
                </p>
              </div>

              <div className="lg:col-span-7 w-full">
                <BeforeAfterSlider />
              </div>
            </div>
          </div>
        </main>

        <Footer />
      </div>
    </ToastProvider>
  );
}

function ProductCard({ project, spanClass }: { project: Project; spanClass: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Parallax distortion offsets
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    // Map to pixel shift displacement
    setMousePos({ x: x * 15, y: y * 15 });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setMousePos({ x: 0, y: 0 });
  };

  return (
    <div 
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      className={`${spanClass} relative overflow-hidden group border border-brand-gold/10 bg-brand-charcoal hover:border-brand-gold/35 cursor-none transition-colors duration-500 shadow-xl`}
    >
      <Link href={`/projects/${project.id}`} className="block w-full h-full relative">
        {/* Background Image with distortion displacement */}
        <motion.img
          src={project.image}
          alt={project.name}
          animate={{
            x: mousePos.x,
            y: mousePos.y,
            scale: isHovered ? 1.08 : 1
          }}
          transition={{ type: "tween", ease: "linear", duration: 0.1 }}
          className="absolute inset-0 object-cover w-full h-full"
        />
        
        {/* Mask Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent z-10" />
        
        {/* Project details */}
        <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-between z-20">
          <div className="flex justify-between items-start">
            <span className="bg-brand-gold text-brand-black text-[9px] uppercase font-bold tracking-widest px-3 py-1.5 rounded-none border border-brand-gold/15 font-poppins">
              {project.type}
            </span>
            <span className="p-2 bg-[#121110]/95 border border-brand-gold/20 text-brand-gold rounded-none opacity-0 group-hover:opacity-100 transition-opacity">
              <Eye className="w-4 h-4" />
            </span>
          </div>

          <div>
            <div className="flex items-center gap-1.5 text-xs text-brand-gold font-semibold font-poppins">
              <MapPin className="w-3.5 h-3.5 shrink-0" />
              <span>{project.location}</span>
            </div>
            
            <h3 className="text-2xl font-normal font-cormorant text-[#faf6f2] mt-1 group-hover:text-brand-gold transition-colors">
              {project.name}
            </h3>
            
            <p className="text-xs font-poppins text-brand-sand/60 mt-2 line-clamp-2 leading-relaxed max-w-lg">
              {project.desc}
            </p>

            <div className="mt-4 flex items-center gap-1.5 text-[9px] uppercase font-bold tracking-widest text-brand-gold font-poppins group-hover:text-brand-offwhite transition-colors">
              <span>View Case details</span>
              <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
