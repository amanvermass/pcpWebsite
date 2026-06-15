"use client";

import React, { useState } from "react";
import { Phone, Mail, Building, Send, MessageSquare } from "lucide-react";
import { useToast } from "../ui/Toast";
import confetti from "canvas-confetti";
import { motion } from "framer-motion";

export const ContactUs: React.FC = () => {
  const { toast } = useToast();

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

  const handleSubmitInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    setTimeout(() => {
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

      confetti({
        particleCount: 50,
        spread: 40,
        origin: { y: 0.9 },
        colors: ["#C58B45", "#ffffff"]
      });

      toast(`Thank you, ${name}! Your inquiry has been logged in the sales queue.`, "success");
      
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

  const handleWhatsAppChat = () => {
    const text = encodeURIComponent("Hello Prayag Clay Productions! I would like to inquire about product catalog availability.");
    window.open(`https://wa.me/911205550180?text=${text}`, "_blank");
  };

  return (
    <section id="contact" className="bg-brand-black border-t border-brand-gold/15 py-24 relative overflow-hidden select-none">
      {/* Animated background shapes (Let's Build CTA layout) */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.03, 0.08, 0.03] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[10%] -left-[10%] w-[500px] h-[500px] bg-brand-gold rounded-full blur-[120px]"
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], opacity: [0.02, 0.06, 0.02] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-[20%] -right-[10%] w-[600px] h-[600px] bg-brand-sand rounded-full blur-[140px]"
        />
      </div>

      {/* Guide lines */}
      <div className="absolute inset-0 pointer-events-none z-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-4 h-full opacity-5">
        <div className="border-l border-brand-slate h-full" />
        <div className="border-l border-brand-slate h-full" />
        <div className="border-l border-brand-slate h-full" />
        <div className="border-l border-brand-slate h-full border-r" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Massive Headline Typography (Section 9) */}
        <div className="mb-20 text-center md:text-left">
          <span className="text-[10px] uppercase font-bold tracking-[0.35em] text-brand-gold bg-brand-gold/5 px-4 py-1.5 border border-brand-gold/20 rounded-none w-fit block mb-4 mx-auto md:mx-0">
            PARTNER WITH US
          </span>
          <h2 className="text-5xl sm:text-6xl lg:text-8xl font-normal font-cormorant text-brand-offwhite tracking-wide leading-none">
            Let's Build Together.
          </h2>
        </div>

        {/* Form and Info Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch mt-12">
          
          {/* Info column */}
          <div className="lg:col-span-5 flex flex-col justify-between gap-8">
            <div>
              <p className="text-brand-sand/70 leading-relaxed text-xs sm:text-sm font-poppins max-w-sm">
                Have an upcoming commercial project, residential development, or dealer request? Fill out the technical inquiry checklist, and our sales engineers will follow up within 24 hours with CAD support and custom volumes pricing.
              </p>
            </div>

            {/* Direct contact vectors */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4 bg-brand-charcoal border border-brand-gold/10 p-4 rounded-none">
                <div className="p-3 bg-brand-black border border-brand-gold/10 text-brand-gold shrink-0">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[9px] text-brand-sand/50 uppercase font-bold font-poppins">National Hotlines</span>
                  <span className="text-xs font-semibold text-brand-offwhite font-poppins">+91 120 555 0180 | +91 11 555 0177</span>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-brand-charcoal border border-brand-gold/10 p-4 rounded-none">
                <div className="p-3 bg-brand-black border border-brand-gold/10 text-brand-gold shrink-0">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[9px] text-brand-sand/50 uppercase font-bold font-poppins">Technical Help Desk</span>
                  <span className="text-xs font-semibold text-brand-offwhite font-poppins">support@prayagclay.com | estimating@prayagclay.com</span>
                </div>
              </div>

              <div className="flex items-center gap-4 bg-brand-charcoal border border-brand-gold/10 p-4 rounded-none">
                <div className="p-3 bg-brand-black border border-brand-gold/10 text-brand-gold shrink-0">
                  <Building className="w-5 h-5" />
                </div>
                <div>
                  <span className="block text-[9px] text-brand-sand/50 uppercase font-bold font-poppins">Corporate Offices</span>
                  <span className="text-xs font-semibold text-brand-offwhite font-poppins">Sector 62, Noida, Uttar Pradesh, India</span>
                </div>
              </div>
            </div>

            {/* Quick WhatsApp Link */}
            <button
              onClick={handleWhatsAppChat}
              className="w-full bg-brand-gold/10 hover:bg-brand-gold border border-brand-gold/30 hover:border-brand-gold text-brand-gold hover:text-brand-black font-semibold py-4 rounded-none transition-colors flex items-center justify-center gap-2 cursor-none text-xs uppercase tracking-wider font-poppins"
            >
              <MessageSquare className="w-4 h-4 shrink-0" />
              Chat instantly on WhatsApp
            </button>
          </div>

          {/* Form column */}
          <div className="lg:col-span-7 bg-brand-charcoal border border-brand-gold/10 p-6 md:p-8 rounded-none">
            <form onSubmit={handleSubmitInquiry} className="flex flex-col gap-4">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] text-brand-sand/50 font-bold uppercase tracking-wider font-poppins">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="bg-brand-black border border-brand-gold/10 rounded-none px-4 py-3 text-xs uppercase tracking-wider font-poppins text-brand-offwhite focus:outline-none focus:border-brand-gold"
                    placeholder="Enter name"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] text-brand-sand/50 font-bold uppercase tracking-wider font-poppins">Email Address</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="bg-brand-black border border-brand-gold/10 rounded-none px-4 py-3 text-xs uppercase tracking-wider font-poppins text-brand-offwhite focus:outline-none focus:border-brand-gold"
                    placeholder="architect@firm.com"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] text-brand-sand/50 font-bold uppercase tracking-wider font-poppins">Mobile Number</label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="bg-brand-black border border-brand-gold/10 rounded-none px-4 py-3 text-xs uppercase tracking-wider font-poppins text-brand-offwhite focus:outline-none focus:border-brand-gold"
                    placeholder="+91 XXXXX XXXXX"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] text-brand-sand/50 font-bold uppercase tracking-wider font-poppins">Professional Category</label>
                  <select
                    value={userRole}
                    onChange={(e) => setUserRole(e.target.value)}
                    className="bg-brand-black border border-brand-gold/10 rounded-none px-4 py-3 text-xs uppercase tracking-wider font-poppins text-brand-offwhite focus:outline-none focus:border-brand-gold"
                  >
                    <option value="Architect">Architect / Consultant</option>
                    <option value="Builder">Builder / Contractor</option>
                    <option value="Dealer">Dealer / Distributor</option>
                    <option value="Homeowner">Homeowner / Developer</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] text-brand-sand/50 font-bold uppercase tracking-wider font-poppins">State</label>
                  <input
                    type="text"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                    className="bg-brand-black border border-brand-gold/10 rounded-none px-4 py-3 text-xs uppercase tracking-wider font-poppins text-brand-offwhite focus:outline-none focus:border-brand-gold"
                    placeholder="Delhi"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] text-brand-sand/50 font-bold uppercase tracking-wider font-poppins">City</label>
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="bg-brand-black border border-brand-gold/10 rounded-none px-4 py-3 text-xs uppercase tracking-wider font-poppins text-brand-offwhite focus:outline-none focus:border-brand-gold"
                    placeholder="New Delhi"
                    required
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="text-[9px] text-brand-sand/50 font-bold uppercase tracking-wider font-poppins">Company / Firm</label>
                  <input
                    type="text"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className="bg-brand-black border border-brand-gold/10 rounded-none px-4 py-3 text-xs uppercase tracking-wider font-poppins text-brand-offwhite focus:outline-none focus:border-brand-gold"
                    placeholder="Prayag Design Inc"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-[9px] text-brand-sand/50 font-bold uppercase tracking-wider font-poppins">Project Message & Details</label>
                <textarea
                  id="contact-message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={4}
                  className="bg-brand-black border border-brand-gold/10 rounded-none px-4 py-3 text-xs uppercase tracking-wider font-poppins text-brand-offwhite focus:outline-none focus:border-brand-gold resize-none"
                  placeholder="Outline dimensions, brick quantities, target schedule, or custom BIM requests..."
                  required
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-brand-gold hover:bg-brand-sand disabled:bg-brand-gold/50 text-brand-black font-semibold tracking-wider font-poppins uppercase text-xs py-4 rounded-none transition-colors cursor-none flex items-center justify-center gap-2 border border-brand-gold"
              >
                {submitting ? (
                  <span className="w-5 h-5 rounded-full border-2 border-brand-black border-t-transparent animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4 shrink-0" />
                    Submit Inquiry Request
                  </>
                )}
              </button>
            </form>
          </div>

        </div>
      </div>
    </section>
  );
};
export default ContactUs;
