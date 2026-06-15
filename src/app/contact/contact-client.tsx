"use client";

import React, { useState, useEffect, useRef } from "react";
import { Header } from "@/components/homepage/Header";
import { Footer } from "@/components/homepage/Footer";
import { ToastProvider, useToast } from "@/components/ui/Toast";
import confetti from "canvas-confetti";
import { motion, AnimatePresence } from "framer-motion";
import { Send, MapPin, Phone, Mail, Award, Landmark, Building } from "lucide-react";

// Interactive dot grid background responding to mouse
const InteractiveGrid: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseLeave = () => {
    setMousePos({ x: -1000, y: -1000 });
  };

  const dots = [];
  const rows = 8;
  const cols = 20;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      dots.push({ r, c });
    }
  }

  return (
    <div 
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-20 bg-brand-black"
    >
      <svg className="w-full h-full min-h-[300px]">
        {dots.map((dot, idx) => {
          const x = (dot.c + 0.5) * 65;
          const y = (dot.r + 0.5) * 50;
          const dist = Math.hypot(x - mousePos.x, y - mousePos.y);
          const maxDist = 150;
          const force = dist < maxDist ? (maxDist - dist) / maxDist : 0;
          const dx = (x - mousePos.x) * force * 0.12;
          const dy = (y - mousePos.y) * force * 0.12;

          return (
            <circle
              key={idx}
              cx={x + dx}
              cy={y + dy}
              r={force > 0 ? 1.5 + force * 2 : 1.2}
              className="fill-brand-gold transition-all duration-300"
            />
          );
        })}
      </svg>
    </div>
  );
};

// Floating input wrapper
const FloatingInput: React.FC<{
  label: string;
  type: string;
  required?: boolean;
  value: string;
  onChange: (val: string) => void;
}> = ({ label, type, required = true, value, onChange }) => {
  const [isFocused, setIsFocused] = useState(false);
  const active = isFocused || value.length > 0;

  return (
    <div className="relative w-full border-b border-brand-gold/15 py-2">
      <label 
        className={`absolute left-0 bottom-3.5 text-[10px] uppercase tracking-widest font-bold font-poppins transition-all duration-300 pointer-events-none ${
          active 
            ? "translate-y-[-24px] scale-[0.8] text-brand-gold" 
            : "text-brand-sand/50 scale-100"
        } origin-left`}
      >
        {label}
      </label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        className="w-full bg-transparent border-0 px-0 pt-4 pb-1 text-sm text-brand-offwhite focus:outline-none focus:ring-0 font-poppins"
      />
    </div>
  );
};

// Floating textarea wrapper
const FloatingTextarea: React.FC<{
  label: string;
  required?: boolean;
  value: string;
  onChange: (val: string) => void;
  rows?: number;
}> = ({ label, required = true, value, onChange, rows = 3 }) => {
  const [isFocused, setIsFocused] = useState(false);
  const active = isFocused || value.length > 0;

  return (
    <div className="relative w-full border-b border-brand-gold/15 py-2">
      <label 
        className={`absolute left-0 top-4 text-[10px] uppercase tracking-widest font-bold font-poppins transition-all duration-300 pointer-events-none ${
          active 
            ? "translate-y-[-24px] scale-[0.8] text-brand-gold" 
            : "text-brand-sand/50 scale-100"
        } origin-left`}
      >
        {label}
      </label>
      <textarea
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        rows={rows}
        className="w-full bg-transparent border-0 px-0 pt-4 pb-1 text-sm text-brand-offwhite focus:outline-none focus:ring-0 resize-none font-poppins"
      />
    </div>
  );
};

function ContactContent() {
  const { toast } = useToast();
  const [formType, setFormType] = useState<"spec" | "dealer">("spec");
  
  // Input fields state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [region, setRegion] = useState("North");
  const [msg, setMsg] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
      // Save leads locally
      const leadEntry = {
        id: Math.random().toString(36).substring(2, 9),
        name,
        email,
        phone,
        company,
        type: formType === "spec" ? "Specifications Consultation" : "Dealer Application",
        region: formType === "dealer" ? region : undefined,
        message: msg,
        timestamp: new Date().toISOString()
      };

      const leads = JSON.parse(localStorage.getItem("pcp_leads") || "[]");
      leads.push(leadEntry);
      localStorage.setItem("pcp_leads", JSON.stringify(leads));

      // Success visual confetti
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.8 }
      });

      toast("Consultation request submitted! A specifications lead will reach back shortly.", "success");
      setSubmitting(false);

      // Reset
      setName("");
      setEmail("");
      setPhone("");
      setCompany("");
      setMsg("");
    }, 1200);
  };

  const hubs = [
    { icon: <Landmark className="w-5 h-5 text-brand-gold" />, title: "New Delhi Corporate Hub", desc: "Regional Specifications, BIM Support Office & Sales Desks.", phone: "+91 11 4050 9900", mail: "delhi@prayagclay.com", location: "Okhla Phase III, New Delhi, India" },
    { icon: <Building className="w-5 h-5 text-brand-gold" />, title: "Prayagraj Production Plant", desc: "Main manufacturing yards, automated tunnel kilns, and lab testing facility.", phone: "+91 532 242 1200", mail: "factory@prayagclay.com", location: "Naini Industrial Area, Prayagraj, UP, India" },
    { icon: <MapPin className="w-5 h-5 text-brand-gold" />, title: "Mumbai Distribution Depot", desc: "Logistics Yard & Western region specifications node.", phone: "+91 22 6605 1800", mail: "mumbai@prayagclay.com", location: "Kalamboli Logistics Node, Navi Mumbai, India" }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-brand-black text-brand-offwhite">
      
      {/* Banner / Interactive background */}
      <div className="relative pt-32 pb-16 bg-brand-black border-b border-brand-gold/10">
        <InteractiveGrid />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <span className="text-[10px] uppercase font-bold tracking-[0.35em] text-brand-gold bg-brand-gold/5 px-4 py-1.5 border border-brand-gold/20 rounded-none w-fit block mb-4 font-poppins">
              SPECIFICATIONS DESK
            </span>
            <h1 className="text-4xl sm:text-6xl font-normal font-cormorant text-brand-offwhite mt-4 tracking-wide leading-none">
              Connect With Us.
            </h1>
            <p className="text-brand-sand/70 mt-6 text-sm sm:text-base leading-relaxed font-poppins max-w-xl">
              Request CAD blueprints, coordinate dealer depot networks, or enquire about custom brick firing setups.
            </p>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16 flex-grow z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
          
          {/* Left Column - Dual Form Sheet */}
          <div className="lg:col-span-7 bg-brand-charcoal border border-brand-gold/10 p-8">
            <div className="flex border-b border-brand-gold/10 pb-6 mb-8 gap-6 justify-center sm:justify-start">
              <button
                onClick={() => setFormType("spec")}
                className={`text-xs font-bold uppercase tracking-widest font-poppins transition-colors cursor-pointer ${
                  formType === "spec" ? "text-brand-gold border-b-2 border-brand-gold pb-1" : "text-brand-sand/50 hover:text-brand-offwhite"
                }`}
              >
                Specifications Enquiry
              </button>
              <button
                onClick={() => setFormType("dealer")}
                className={`text-xs font-bold uppercase tracking-widest font-poppins transition-colors cursor-pointer ${
                  formType === "dealer" ? "text-brand-gold border-b-2 border-brand-gold pb-1" : "text-brand-sand/50 hover:text-brand-offwhite"
                }`}
              >
                Dealer Application
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FloatingInput label="Full Name" type="text" value={name} onChange={setName} />
                <FloatingInput label="Work Email" type="email" value={email} onChange={setEmail} />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <FloatingInput label="Phone Number" type="tel" value={phone} onChange={setPhone} />
                <FloatingInput label="Company / Practice" type="text" value={company} onChange={setCompany} />
              </div>

              {formType === "dealer" && (
                <div className="flex flex-col gap-2 border-b border-brand-gold/15 pb-2">
                  <label className="text-[10px] text-brand-sand/50 font-bold uppercase tracking-widest font-poppins">Target Distribution Region</label>
                  <select
                    value={region}
                    onChange={(e) => setRegion(e.target.value)}
                    className="w-full bg-transparent border-0 px-0 py-2 text-sm text-brand-offwhite focus:outline-none focus:ring-0 font-poppins"
                  >
                    <option value="North">Northern Depots Grid</option>
                    <option value="South">Southern Depots Grid</option>
                    <option value="East">Eastern Depots Grid</option>
                    <option value="West">Western Depots Grid</option>
                  </select>
                </div>
              )}

              <FloatingTextarea label="Tell us about your project or distribution area" value={msg} onChange={setMsg} />

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-brand-gold hover:bg-brand-offwhite hover:text-brand-black text-brand-black transition-colors py-4 text-xs uppercase font-bold tracking-widest rounded-none flex items-center justify-center gap-2 cursor-pointer disabled:bg-brand-gold/40"
              >
                {submitting ? (
                  <span className="w-4 h-4 rounded-none border-2 border-brand-black border-t-transparent animate-spin" />
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5" />
                    <span>Submit Request</span>
                  </>
                )}
              </button>
            </form>
          </div>

          {/* Right Column - Locations and Hubs */}
          <div className="lg:col-span-5 space-y-8">
            <h3 className="text-xl font-normal font-cormorant text-brand-gold border-b border-brand-gold/10 pb-3">
              Office Locations & Depots
            </h3>
            
            <div className="space-y-6">
              {hubs.map((hub, idx) => (
                <div key={idx} className="bg-brand-charcoal border border-brand-gold/5 p-6 space-y-4 hover:border-brand-gold/20 transition-colors">
                  <div className="flex gap-3 items-center">
                    <div className="p-2.5 bg-brand-black border border-brand-gold/10 text-brand-gold">
                      {hub.icon}
                    </div>
                    <h4 className="font-normal font-cormorant text-lg text-brand-offwhite">{hub.title}</h4>
                  </div>
                  
                  <p className="text-xs font-poppins text-brand-sand/60 leading-relaxed border-b border-brand-gold/5 pb-2">{hub.desc}</p>
                  
                  <ul className="space-y-2 text-xs font-poppins text-brand-sand/80">
                    <li className="flex gap-2 items-center">
                      <MapPin className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                      <span>{hub.location}</span>
                    </li>
                    <li className="flex gap-2 items-center">
                      <Phone className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                      <span>{hub.phone}</span>
                    </li>
                    <li className="flex gap-2 items-center">
                      <Mail className="w-3.5 h-3.5 text-brand-gold shrink-0" />
                      <span>{hub.mail}</span>
                    </li>
                  </ul>
                </div>
              ))}
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}

export default function ContactClient() {
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
        <ContactContent />
        <Footer />
      </div>
    </ToastProvider>
  );
}
