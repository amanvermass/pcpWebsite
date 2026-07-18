"use client";

import React, { useState, useEffect, useRef } from "react";
import { Header } from "@/components/homepage/Header";
import { Footer } from "@/components/homepage/Footer";
import { WhyPCP } from "@/components/homepage/WhyPCP";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ImageReveal } from "@/components/ui/ScrollReveal";
import { ShieldCheck, Cpu, HardHat, Award, Recycle, Factory, Landmark, MapPin, Zap } from "lucide-react";

const TeamCard: React.FC<{ name: string; role: string; desc: string; initialName: string }> = ({ name, role, desc, initialName }) => {
  return (
    <div className="bg-brand-charcoal border border-brand-gold/10 p-6 hover:border-brand-gold/30 transition-all rounded-none group flex flex-col justify-between min-h-60 relative overflow-hidden">
      {/* Background visual detail */}
      <span className="absolute bottom-2 right-4 text-7xl font-bold font-cormorant text-brand-gold/[0.03] select-none uppercase">{initialName}</span>
      <div>
        <span className="text-[9px] uppercase tracking-wider text-brand-gold font-bold block mb-2 font-poppins">{role}</span>
        <h4 className="text-2xl font-normal font-cormorant text-brand-offwhite group-hover:text-brand-gold transition-colors">{name}</h4>
        <p className="text-xs font-poppins text-brand-sand/70 mt-3 leading-relaxed">{desc}</p>
      </div>
      <div className="w-12 h-[1px] bg-brand-gold/20 group-hover:w-full transition-all mt-6" />
    </div>
  );
};

const ProcessStep: React.FC<{ step: string; title: string; desc: string; index: number }> = ({ step, title, desc, index }) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.7, delay: index * 0.12 }}
      className="bg-brand-charcoal/50 border border-brand-gold/10 p-6 relative hover:border-brand-gold/25 transition-all group"
    >
      <span className="text-xs font-mono text-brand-gold font-bold tracking-widest block mb-4">{step}</span>
      <h4 className="text-lg font-normal font-cormorant text-brand-offwhite uppercase tracking-wider mb-2 group-hover:text-brand-gold transition-colors">{title}</h4>
      <p className="text-xs font-poppins text-brand-sand/65 leading-relaxed">{desc}</p>
    </motion.div>
  );
};

export default function AboutClient() {
  const [darkMode, setDarkMode] = useState(true);

  // Parallax tracking
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();
  const imageY = useTransform(scrollY, [0, 800], [0, 150]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
    }
  }, [darkMode]);

  const processSteps = [
    { step: "STAGE 01", title: "Clay Sourcing", desc: "Selecting high-plasticity alluvial clay sediments from regional riverbeds, sifted and batch-refined for density." },
    { step: "STAGE 02", title: "Vacuum Extruding", desc: "Earthen mixes pass through de-airing vacuum extruders, formatting columns under 22 bar pressure to guarantee structural brick cores." },
    { step: "STAGE 03", title: "Thermal Drying", desc: "Formed bricks undergo dynamic humidity control drying, evaporating moisture to prevent cracks during furnace transitions." },
    { step: "STAGE 04", title: "Kiln Firing", desc: "Fired inside high-efficiency European automated tunnel kilns at up to 1180°C, forging permanent molecular clay strength bonds." },
    { step: "STAGE 05", title: "Quality Check", desc: "Automated ultrasonic testing verify compressive strengths and dimensional sizing checks before packaging pallets." }
  ];

  const infrastructureData = [
    { icon: <Factory className="w-5 h-5 text-brand-gold" />, value: "4 Tunnel Kilns", label: "Fired Production Plants" },
    { icon: <Cpu className="w-5 h-5 text-brand-gold" />, value: "85k Metric Tons", label: "Annual Fired Capacity" },
    { icon: <MapPin className="w-5 h-5 text-brand-gold" />, value: "14 Depots", label: "Distribution Grid Hubs" },
    { icon: <Zap className="w-5 h-5 text-brand-gold" />, value: "100% Recycled", label: "Tunnel Kiln Heat Capture" }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-brand-black text-brand-offwhite">
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      {/* Hero Cover Banner */}
      <div ref={containerRef} className="relative w-full h-[65vh] overflow-hidden bg-black">
        <motion.div 
          style={{ y: imageY }}
          className="absolute inset-0 w-full h-[120%] -top-[10%]"
        >
          {/* Parallax Landscape Cover */}
          <img 
            src="/images/hero-4.jpg" 
            alt="Premium corporate factory architecture" 
            className="w-full h-full object-cover opacity-65 scale-102" 
          />
        </motion.div>
        
        {/* Dark vignette overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#121110]/95 via-[#121110]/45 to-[#121110]/80 z-10" />

        {/* Content Overlays */}
        <div className="absolute inset-0 z-20 flex flex-col justify-between p-6 sm:p-12 max-w-7xl mx-auto w-full pt-28">
          <div>
            <span className="text-[10px] uppercase font-bold tracking-[0.35em] text-brand-gold bg-brand-gold/5 px-4 py-1.5 border border-brand-gold/20 rounded-none w-fit block font-poppins">
              SINCE 1983 / EARTHEN HERITAGE
            </span>
          </div>
          
          <div className="max-w-4xl mt-auto">
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-normal font-cormorant text-[#faf6f2] tracking-wide leading-none">
              Engineering Resilient Envelopes.
            </h1>
            <p className="text-brand-sand-400 text-xs sm:text-sm font-poppins mt-4 max-w-lg leading-relaxed">
              Prayag Clay Productions blends traditional clay firing chemistry with European automated tunnel kiln technologies to supply premium facing bricks and terracotta facades.
            </p>
          </div>
        </div>
      </div>

      {/* Journey Timeline milstones using GSAP ScrollTrigger */}
      <WhyPCP />

      {/* Manufacturing Process */}
      <section id="process" className="py-16 md:py-20 lg:py-24 bg-brand-black border-t border-brand-gold/10 relative">
        <div className="absolute inset-0 pointer-events-none z-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-4 h-full opacity-5">
          <div className="border-l border-brand-slate h-full" />
          <div className="border-l border-brand-slate h-full" />
          <div className="border-l border-brand-slate h-full" />
          <div className="border-l border-brand-slate h-full border-r" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl mb-16">
            <span className="text-[10px] uppercase font-bold tracking-[0.35em] text-brand-gold bg-brand-gold/5 px-4 py-1.5 border border-brand-gold/20 rounded-none w-fit block font-poppins">
              TECHNOLOGY IN FLOW
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal font-cormorant text-brand-offwhite mt-6 tracking-wide">
              The Manufacturing Process
            </h2>
            <p className="text-brand-sand/70 text-xs sm:text-sm font-poppins mt-4 leading-relaxed max-w-xl">
              Discover how we process raw earthen sediments into certified, high-strength structural building envelopes through modular automated steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {processSteps.map((step, idx) => (
              <ProcessStep 
                key={idx} 
                step={step.step} 
                title={step.title} 
                desc={step.desc} 
                index={idx} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* Infrastructure & Assets stats */}
      <section className="py-20 bg-brand-charcoal border-y border-brand-gold/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {infrastructureData.map((inf, idx) => (
              <div key={idx} className="flex gap-4 items-center p-4 border border-brand-gold/5 bg-brand-black">
                <div className="p-3 bg-brand-charcoal border border-brand-gold/10">
                  {inf.icon}
                </div>
                <div>
                  <span className="block text-[9px] text-brand-sand/50 uppercase font-bold tracking-widest font-poppins">{inf.label}</span>
                  <span className="text-lg font-normal font-cormorant text-brand-offwhite">{inf.value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section id="leadership" className="py-16 md:py-20 lg:py-24 bg-brand-black relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mb-16">
            <span className="text-[10px] uppercase font-bold tracking-[0.35em] text-brand-gold bg-brand-gold/5 px-4 py-1.5 border border-brand-gold/20 rounded-none w-fit block font-poppins">
              SPECIFICATION ARCHITECTS
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal font-cormorant text-brand-offwhite mt-6 tracking-wide">
              Leadership Team
            </h2>
            <p className="text-brand-sand/70 text-xs sm:text-sm font-poppins mt-4 leading-relaxed max-w-xl">
              Meet our directors and material engineers dedicated to developing energy-efficient building envelopes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TeamCard 
              name="Sanjay Verma" 
              role="Founder & Managing Director" 
              desc="Overseeing Prayag Clay's corporate firing plants expansion, focusing on European tunnel kiln automation setups." 
              initialName="SV" 
            />
            <TeamCard 
              name="Anjali Gupta" 
              role="Director of R&D / Ceramic Chemist" 
              desc="Leading molecular testing on recycled content, optimizing compressive strength tolerances and heat ratings." 
              initialName="AG" 
            />
            <TeamCard 
              name="Vikram Prayag" 
              role="Lead Specifications Architect" 
              desc="Assisting landmark commercial structures select customized terracotta panel systems and load-bearing facing blocks." 
              initialName="VP" 
            />
          </div>
        </div>
      </section>

      {/* Certifications and ESG Awards */}
      <section id="certifications" className="py-16 md:py-20 lg:py-24 bg-brand-charcoal/50 border-t border-brand-gold/10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Certifications text */}
            <div className="lg:col-span-6 flex flex-col gap-4">
              <span className="text-[10px] uppercase font-bold tracking-[0.35em] text-brand-gold bg-brand-gold/5 px-4 py-1.5 border border-brand-gold/20 rounded-none w-fit block font-poppins">
                COMPLIANCE & STANDARDS
              </span>
              <h3 className="text-3xl sm:text-4xl font-normal font-cormorant text-brand-offwhite leading-tight">
                Global Certifications & Green Awards
              </h3>
              <p className="text-xs sm:text-sm font-poppins text-brand-sand/70 leading-relaxed mt-2">
                Our materials qualify for green credits (LEED) and adhere strictly to environmental audits. We are committed to maintaining a clean manufacturing flow.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6">
                <div className="bg-brand-black p-4 border border-brand-gold/10 flex items-start gap-3">
                  <ShieldCheck className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-semibold text-brand-offwhite text-xs font-poppins">ISO 14001:2015</h5>
                    <p className="text-[10px] text-brand-sand/60 mt-1 leading-normal font-poppins">Environmental management standard compliance.</p>
                  </div>
                </div>
                <div className="bg-brand-black p-4 border border-brand-gold/10 flex items-start gap-3">
                  <Award className="w-5 h-5 text-brand-gold shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-semibold text-brand-offwhite text-xs font-poppins">LEED Qualification</h5>
                    <p className="text-[10px] text-brand-sand/60 mt-1 leading-normal font-poppins">Qualifies regional projects for environmental credits.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Industrial image with offset borders */}
            <div className="lg:col-span-6 flex items-center justify-center">
              <div className="relative border border-brand-gold/20 p-2 max-w-md w-full bg-brand-black overflow-hidden">
                <ImageReveal>
                  <img 
                    src="/images/hero-5.jpg" 
                    alt="Certified Terracotta product grid" 
                    className="w-full h-full object-cover" 
                  />
                </ImageReveal>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
