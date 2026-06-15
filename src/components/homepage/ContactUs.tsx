"use client";

import React, { useState } from "react";
import { Phone, Mail, Building, MapPin, Send, MessageSquare, ArrowRight } from "lucide-react";
import { Logo } from "./Logo";
import { useToast } from "../ui/Toast";
import confetti from "canvas-confetti";
import { usePathname } from "next/navigation";
import Link from "next/link";

export const ContactUs: React.FC = () => {
  const { toast } = useToast();
  const pathname = usePathname();

  const getHref = (href: string) => {
    if (href.startsWith("#")) {
      return pathname === "/" ? href : `/${href}`;
    }
    return href;
  };
  
  // Form state
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [userRole, setUserRole] = useState("Homeowner");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);

  // Newsletter state
  const [newsletterEmail, setNewsletterEmail] = useState("");

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate network delay
    setTimeout(() => {
      // Mock db insertion to local storage
      const newLead = {
        id: Math.random().toString(36).substring(2, 9),
        name,
        email,
        phone,
        userRole,
        state,
        city,
        company,
        message,
        timestamp: new Date().toISOString(),
        stage: "New"
      };

      const existingLeads = JSON.parse(localStorage.getItem("pcp_leads") || "[]");
      existingLeads.push(newLead);
      localStorage.setItem("pcp_leads", JSON.stringify(existingLeads));

      // Success alerts
      confetti({
        particleCount: 50,
        spread: 40,
        origin: { y: 0.9 },
        colors: ["#ea580c", "#ffffff"]
      });

      toast(`Thank you, ${name}! Your inquiry has been logged in the sales queue.`, "success");
      
      // Reset
      setName("");
      setEmail("");
      setPhone("");
      setUserRole("Homeowner");
      setState("");
      setCity("");
      setCompany("");
      setMessage("");
      setSubmitting(false);
    }, 1200);
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    
    toast("Thank you! You have subscribed to the Technical Architectural bulletin.", "success");
    setNewsletterEmail("");
  };

  const handleWhatsAppChat = () => {
    const text = encodeURIComponent("Hello Prayag Clay Productions! I would like to inquire about product catalog availability.");
    window.open(`https://wa.me/12135550182?text=${text}`, "_blank");
  };

  return (
    <footer id="contact" className="bg-brand-slate-950 border-t border-brand-slate-900 pt-24 relative overflow-hidden">
      
      {/* Visual background ambient glow */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-brand-terracotta-900/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pb-12">
        
        {/* Main contact grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-16 border-b border-brand-slate-900">
          
          {/* Info column */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8">
            <div>
              <span className="text-xs uppercase font-extrabold tracking-widest text-brand-terracotta-500 bg-brand-terracotta-500/10 px-3.5 py-1 rounded-full inline-flex items-center gap-1.5 mb-4">
                Get In Touch
              </span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
                Request Specifications & Project Quotation
              </h2>
              <p className="text-brand-slate-400 mt-4 leading-relaxed text-sm sm:text-base">
                Have an upcoming commercial project, residential development, or dealer request? Fill out the technical inquiry checklist, and our sales engineers will follow up within 24 hours with CAD support and custom volumes pricing.
              </p>
            </div>

            {/* Direct contact vectors */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4 bg-brand-slate-900/40 border border-brand-slate-900 p-4 rounded-xl">
                <div className="p-3 bg-brand-slate-950 rounded-lg border border-brand-slate-800 text-brand-terracotta-500 shrink-0">
                  <Phone className="w-5 h-5 animate-pulse-subtle" />
                </div>
                <div>
                  <span className="block text-[10px] text-brand-slate-500 uppercase font-bold">National Hotlines</span>
                  <span className="text-sm font-bold text-white">+1 (800) 555-0150 | +1 (213) 555-0182</span>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-brand-slate-900/40 border border-brand-slate-900 p-4 rounded-xl">
                <div className="p-3 bg-brand-slate-950 rounded-lg border border-brand-slate-800 text-brand-terracotta-500 shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[10px] text-brand-slate-500 uppercase font-bold">Technical Help Desk</span>
                  <span className="text-sm font-bold text-white">support@prayagclay.com | estimating@prayagclay.com</span>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-brand-slate-900/40 border border-brand-slate-900 p-4 rounded-xl">
                <div className="p-3 bg-brand-slate-950 rounded-lg border border-brand-slate-800 text-brand-terracotta-500 shrink-0">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[10px] text-brand-slate-500 uppercase font-bold">Corporate Offices</span>
                  <span className="text-sm font-bold text-white">780 Grand Plaza Pkwy, Los Angeles, CA</span>
                </div>
              </div>
            </div>

            {/* Quick WhatsApp Link */}
            <button
              onClick={handleWhatsAppChat}
              className="w-full bg-brand-emerald-700/20 hover:bg-brand-emerald-700 border border-brand-emerald-600/35 hover:border-brand-emerald-500 text-brand-emerald-400 hover:text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer text-sm"
            >
              <MessageSquare className="w-4 h-4 shrink-0" />
              Chat instantly on WhatsApp
            </button>
          </div>

          {/* Form column */}
          <div className="lg:col-span-7 bg-brand-slate-900 border border-brand-slate-850 p-6 md:p-8 rounded-3xl">
            <form onSubmit={handleSubmitInquiry} className="flex flex-col gap-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-brand-slate-400 font-extrabold uppercase">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-brand-slate-950 border border-brand-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-terracotta-500"
                    placeholder="Enter name"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-brand-slate-400 font-extrabold uppercase">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-brand-slate-950 border border-brand-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-terracotta-500"
                    placeholder="e.g. architect@firm.com"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-brand-slate-400 font-extrabold uppercase">Mobile Number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="bg-brand-slate-950 border border-brand-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-terracotta-500"
                    placeholder="+1 (213) 555-0100"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-brand-slate-400 font-extrabold uppercase">Professional Category</label>
                  <select
                    value={userRole}
                    onChange={(e) => setUserRole(e.target.value)}
                    className="bg-brand-slate-950 border border-brand-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-terracotta-500"
                  >
                    <option value="Architect">Architect / BIM Consultant</option>
                    <option value="Builder">Builder / General Contractor</option>
                    <option value="Dealer">Dealer / Distributor</option>
                    <option value="Homeowner">Homeowner / Developer</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-brand-slate-400 font-extrabold uppercase">State</label>
                  <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="bg-brand-slate-950 border border-brand-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-terracotta-500"
                    placeholder="California"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-brand-slate-400 font-extrabold uppercase">City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="bg-brand-slate-950 border border-brand-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-terracotta-500"
                    placeholder="Los Angeles"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] text-brand-slate-400 font-extrabold uppercase">Company / Firm</label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="bg-brand-slate-950 border border-brand-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-terracotta-500"
                    placeholder="Prayag Design Inc"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[10px] text-brand-slate-400 font-extrabold uppercase">Project Message & Inquiry Details</label>
                <textarea
                  id="contact-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="bg-brand-slate-950 border border-brand-slate-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-brand-terracotta-500 resize-none"
                  placeholder="Outline dimensions, brick quantities, target schedule, or custom BIM requests..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-brand-terracotta-600 hover:bg-brand-terracotta-700 disabled:bg-brand-terracotta-800 text-white font-bold py-4 rounded-xl transition-all cursor-pointer flex items-center justify-center gap-2 text-sm"
              >
                {submitting ? (
                  <span className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4 shrink-0" />
                    Submit Technical Sales Request
                  </>
                )}
              </button>
            </form>
          </div>

        </div>

        {/* Directory links footer section */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 py-16 text-sm">
          
          {/* Logo Brand Info */}
          <div className="col-span-2 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <Logo height="48" inverseText={true} />
            </div>
            <p className="text-xs text-brand-slate-450 leading-relaxed max-w-sm">
              We design and fire industrial-grade building ceramics, paving stones, and aerated blocks. Leading the construction industry toward structural resilience and zero-waste manufacturing.
            </p>
            
            {/* Newsletter input */}
            <form onSubmit={handleNewsletterSubmit} className="flex flex-col gap-2 mt-2">
              <label className="text-[9px] uppercase font-bold tracking-widest text-brand-slate-400">ARCHITECTS BULLETIN</label>
              <div className="flex gap-2">
                <input
                  type="email"
                  placeholder="Enter work email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  className="bg-brand-slate-900 border border-brand-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-brand-terracotta-500 flex-grow"
                  required
                />
                <button
                  type="submit"
                  className="p-2.5 bg-brand-terracotta-600 hover:bg-brand-terracotta-700 text-white rounded-xl cursor-pointer"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          </div>

          {/* Directory Column 1: Products */}
          <div>
            <h4 className="text-xs uppercase font-extrabold text-white tracking-widest mb-4">Products</h4>
            <ul className="flex flex-col gap-2.5 text-xs text-brand-slate-400">
              <li><Link href="/products?category=Clay Bricks" className="hover:text-brand-terracotta-500 transition-colors">Clay Facing Bricks</Link></li>
              <li><Link href="/products?category=Terracotta" className="hover:text-brand-terracotta-500 transition-colors">Terracotta Facades</Link></li>
              <li><Link href="/products?category=Roofing Tiles" className="hover:text-brand-terracotta-500 transition-colors">Roofing Roman Tiles</Link></li>
              <li><Link href="/products?category=Pavers" className="hover:text-brand-terracotta-500 transition-colors">Engineering Pavers</Link></li>
              <li><Link href="/products?category=Hollow Blocks" className="hover:text-brand-terracotta-500 transition-colors">Hollow Block Units</Link></li>
              <li><Link href="/products?category=AAC Blocks" className="hover:text-brand-terracotta-500 transition-colors">Lightweight AAC Blocks</Link></li>
            </ul>
          </div>

          {/* Directory Column 2: Tools */}
          <div>
            <h4 className="text-xs uppercase font-extrabold text-white tracking-widest mb-4">Engineers Portal</h4>
            <ul className="flex flex-col gap-2.5 text-xs text-brand-slate-400">
              <li><Link href="/calculators?id=brick-quantity" className="hover:text-brand-terracotta-500 transition-colors">Brick Qty Calculator</Link></li>
              <li><Link href="/calculators?id=house-estimator" className="hover:text-brand-terracotta-500 transition-colors">House Cost Calculator</Link></li>
              <li><Link href="/calculators?id=wall-net-area" className="hover:text-brand-terracotta-500 transition-colors">Wall Net Area Tool</Link></li>
              <li><Link href="/calculators?id=roofing-tile" className="hover:text-brand-terracotta-500 transition-colors">Roof Tile Calculator</Link></li>
              <li><Link href="/calculators?id=paver" className="hover:text-brand-terracotta-500 transition-colors">Paver Calculator</Link></li>
              <li><Link href={getHref("#recommender")} className="hover:text-brand-terracotta-500 transition-colors">Material Recommendation Quiz</Link></li>
              <li><Link href={getHref("#dealers")} className="hover:text-brand-terracotta-500 transition-colors">Distributor Locations Map</Link></li>
            </ul>
          </div>

          {/* Directory Column 3: Corporate */}
          <div>
            <h4 className="text-xs uppercase font-extrabold text-white tracking-widest mb-4">PCP Clay Corp</h4>
            <ul className="flex flex-col gap-2.5 text-xs text-brand-slate-400">
              <li><Link href={getHref("#sustainability")} className="hover:text-brand-terracotta-500 transition-colors">Sustainability Commitments</Link></li>
              <li><Link href="/projects" className="hover:text-brand-terracotta-500 transition-colors">Architectural Portfolio</Link></li>
              <li><Link href={getHref("#blogs")} className="hover:text-brand-terracotta-500 transition-colors">Knowledge Base Blogs</Link></li>
              <li><Link href={getHref("#sustainability")} className="hover:text-brand-terracotta-500 transition-colors">Green Certifications</Link></li>
              <li><Link href={getHref("#contact")} className="hover:text-brand-terracotta-500 transition-colors">Career Pathways</Link></li>
            </ul>
          </div>

        </div>

        {/* Closing details */}
        <div className="flex flex-col sm:flex-row justify-between items-center text-xs text-brand-slate-500 gap-4 pt-8 border-t border-brand-slate-900/60 font-semibold">
          <span>&copy; 2026 Prayag Clay Productions (PCP) Ltd. All Rights Reserved.</span>
          <div className="flex gap-4">
            <span className="hover:text-white transition-colors cursor-pointer">Privacy Legislation Compliance</span>
            <span className="hover:text-white transition-colors cursor-pointer">Conditions of Sales</span>
            <span className="hover:text-white transition-colors cursor-pointer">Corporate Impressum</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
