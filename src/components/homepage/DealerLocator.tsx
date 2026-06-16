"use client";

import React, { useState } from "react";
import { Search, MapPin, Phone, Mail, Compass, Globe, Navigation } from "lucide-react";
import { useToast } from "../ui/Toast";

interface Dealer {
  id: string;
  name: string;
  state: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  web: string;
  coordinates: { x: number; y: number }; // relative %
}

export const DealerLocator: React.FC = () => {
  const { toast } = useToast();
  const [selectedState, setSelectedState] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredDealerId, setHoveredDealerId] = useState<string | null>(null);

  const states = ["All", "Uttar Pradesh", "Delhi NCR", "Maharashtra", "Karnataka", "West Bengal"];

  const dealers: Dealer[] = [
    {
      id: "d1",
      name: "PCP Corporate Headquarters & Kilns",
      state: "Uttar Pradesh",
      city: "Noida",
      address: "Sector 62, Noida, Uttar Pradesh 201301",
      phone: "+91 120 555 0180",
      email: "up.hub@prayagclay.com",
      web: "www.prayagclay.com/up",
      coordinates: { x: 45, y: 32 },
    },
    {
      id: "d2",
      name: "Delhi NCR Distribution Depot",
      state: "Delhi NCR",
      city: "New Delhi",
      address: "Okhla Industrial Area Phase III, New Delhi 110020",
      phone: "+91 11 555 0177",
      email: "delhi.depot@prayagclay.com",
      web: "www.prayagclay.com/delhi",
      coordinates: { x: 41, y: 29 },
    },
    {
      id: "d3",
      name: "Mumbai Architectural Hub",
      state: "Maharashtra",
      city: "Mumbai",
      address: "Bandra Kurla Complex, Mumbai, Maharashtra 400051",
      phone: "+91 22 555 0199",
      email: "mumbai.sales@prayagclay.com",
      web: "www.prayagclay.com/mumbai",
      coordinates: { x: 26, y: 62 },
    },
    {
      id: "d4",
      name: "Bengaluru Materials Depot",
      state: "Karnataka",
      city: "Bengaluru",
      address: "Whitefield Industrial Area, Bengaluru, Karnataka 560066",
      phone: "+91 80 555 0144",
      email: "blr.depot@prayagclay.com",
      web: "www.prayagclay.com/blr",
      coordinates: { x: 38, y: 82 },
    },
    {
      id: "d5",
      name: "Kolkata Facades Depot",
      state: "West Bengal",
      city: "Kolkata",
      address: "Salt Lake Sector V, Kolkata, West Bengal 700091",
      phone: "+91 33 555 0122",
      email: "kol.sales@prayagclay.com",
      web: "www.prayagclay.com/kolkata",
      coordinates: { x: 74, y: 44 },
    },
  ];

  const filteredDealers = dealers.filter((d) => {
    const matchesState = selectedState === "All" || d.state === selectedState;
    const matchesQuery =
      d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesState && matchesQuery;
  });

  const handleGetDirections = (dealerName: string) => {
    toast(`Simulating Indian GPS map coordinates for ${dealerName}.`, "info");
  };

  return (
    <section id="dealers" className="py-24 bg-brand-black relative">
      {/* Background guide lines */}
      <div className="absolute inset-0 pointer-events-none z-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-4 h-full opacity-5">
        <div className="border-l border-brand-slate h-full" />
        <div className="border-l border-brand-slate h-full" />
        <div className="border-l border-brand-slate h-full" />
        <div className="border-l border-brand-slate h-full border-r" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center">
          <span className="text-[10px] uppercase font-bold tracking-[0.35em] text-brand-gold bg-brand-gold/5 px-4 py-1.5 border border-brand-gold/20 rounded-none w-fit block">
            PARTNERS & NETWORK
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal font-cormorant text-brand-offwhite mt-6 tracking-wide">
            Dealer Network Locator
          </h2>
          <p className="text-brand-sand/70 text-xs sm:text-sm font-poppins mt-4 max-w-xl leading-relaxed">
            Find certified PCP distributors across India's metropolitan hubs to inspect clay brick physical samples and request quote deliveries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-stretch">
          
          {/* Filters & Dealers list column */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Search filter panels */}
            <div className="bg-brand-charcoal border border-brand-gold/10 rounded-none p-6 flex flex-col gap-4">
              <div className="relative">
                <Search className="absolute left-4 top-3.5 w-4 h-4 text-brand-sand/50" />
                <input
                  type="text"
                  placeholder="Search by city or depot name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-brand-black border border-brand-gold/10 rounded-none pl-11 pr-4 py-3 text-xs uppercase tracking-wider font-poppins text-brand-offwhite focus:outline-none focus:border-brand-gold"
                />
              </div>

              <div className="flex flex-wrap gap-2">
                {states.map((st) => (
                  <button
                    key={st}
                    onClick={() => setSelectedState(st)}
                    className={`px-3 py-2 rounded-none text-[9px] uppercase tracking-wider font-poppins font-medium border cursor-pointer text-center transition-all ${
                      selectedState === st
                        ? "bg-brand-gold border-brand-gold text-brand-black"
                        : "bg-brand-black border-brand-gold/10 text-brand-sand hover:text-brand-offwhite"
                    }`}
                  >
                    {st === "All" ? "All India" : st}
                  </button>
                ))}
              </div>
            </div>

            {/* Scrollable list */}
            <div className="flex flex-col gap-3 max-h-[500px] overflow-y-auto pr-2">
              {filteredDealers.length === 0 ? (
                <div className="bg-brand-charcoal border border-brand-gold/10 rounded-none p-8 text-center text-brand-sand/50 text-xs font-poppins">
                  No registered distributors found matching the criteria.
                </div>
              ) : (
                filteredDealers.map((d) => (
                  <div
                    key={d.id}
                    onMouseEnter={() => setHoveredDealerId(d.id)}
                    onMouseLeave={() => setHoveredDealerId(null)}
                    className={`p-5 rounded-none border transition-all cursor-none flex flex-col justify-between gap-4 ${
                      hoveredDealerId === d.id
                        ? "bg-brand-charcoal border-brand-gold/50 shadow-lg"
                        : "bg-brand-charcoal/40 border-brand-gold/10 hover:border-brand-gold/25"
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="font-normal font-cormorant text-brand-offwhite text-lg">{d.name}</h3>
                        <span className="text-[9px] text-brand-gold font-bold uppercase tracking-widest font-poppins">
                          {d.city}
                        </span>
                      </div>
                      <p className="text-[11px] text-brand-sand/70 mt-2 flex items-start gap-1.5 leading-snug font-poppins">
                        <MapPin className="w-3.5 h-3.5 text-brand-gold shrink-0 mt-0.5" />
                        {d.address}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-[10px] text-brand-sand/60 border-t border-brand-gold/10 pt-3 font-poppins">
                      <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-brand-gold/60" /> {d.phone}</span>
                      <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-brand-gold/60 truncate" /> {d.email}</span>
                    </div>

                    <div className="flex gap-3">
                      <button
                        onClick={() => handleGetDirections(d.name)}
                        className="flex-1 bg-brand-gold/10 hover:bg-brand-gold text-brand-gold hover:text-brand-black border border-brand-gold/30 hover:border-brand-gold py-2 rounded-none text-[10px] uppercase font-poppins tracking-wider transition-colors flex items-center justify-center gap-1 cursor-none"
                      >
                        <Navigation className="w-3.5 h-3.5" />
                        Directions
                      </button>
                      <a
                        href={`https://${d.web}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 bg-brand-black hover:bg-brand-charcoal border border-brand-gold/10 text-brand-sand hover:text-brand-offwhite py-2 rounded-none text-[10px] uppercase font-poppins tracking-wider transition-colors text-center flex items-center justify-center gap-1 cursor-none"
                      >
                        <Globe className="w-3.5 h-3.5" />
                        Website
                      </a>
                    </div>
                  </div>
                ))
              )}
            </div>

          </div>

          {/* Interactive India Map Panel */}
          <div className="lg:col-span-7 bg-brand-charcoal border border-brand-gold/10 rounded-none p-6 flex flex-col justify-between relative overflow-hidden min-h-[450px] lg:min-h-0">
            <div className="absolute inset-0 bg-brand-slate/20 z-0" />
            
            <div className="relative z-10 w-full flex justify-between items-center pb-4 border-b border-brand-gold/10">
              <span className="text-[10px] font-bold text-brand-sand/60 uppercase tracking-widest flex items-center gap-1.5 font-poppins">
                <Compass className="w-4 h-4 text-brand-gold shrink-0 animate-spin-slow" />
                Distribution Coverage Map (India)
              </span>
              <span className="text-[9px] bg-brand-gold/10 text-brand-gold px-2.5 py-0.5 border border-brand-gold/30 font-bold uppercase tracking-widest font-poppins">
                Active State Nodes
              </span>
            </div>

            {/* India Map Board */}
            <div className="relative flex-grow flex items-center justify-center w-full h-80 lg:h-full z-10 py-8">
              {/* Minimal SVG representing India Map Outline */}
              <svg className="w-4/5 h-4/5 text-brand-gold/10" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1">
                {/* Simplified outline paths of India */}
                <path d="M42,10 L47,5 L50,11 L49,20 L57,25 L58,32 L66,35 L74,38 L72,45 L82,45 L80,52 L74,53 L70,58 L63,60 L62,65 L55,75 L50,85 L48,93 L44,82 L38,82 L34,70 L26,62 L28,52 L18,48 L22,38 L30,38 L34,25 L38,20 Z" />
                <path d="M49,20 L55,25" strokeDasharray="2 2" />
                <path d="M34,25 L38,20" strokeDasharray="2 2" />
              </svg>

              {/* Interactive State Highlight nodes */}
              {filteredDealers.map((d) => (
                <div
                  key={d.id}
                  className="absolute transition-all duration-300"
                  style={{ left: `${d.coordinates.x}%`, top: `${d.coordinates.y}%` }}
                  onMouseEnter={() => setHoveredDealerId(d.id)}
                  onMouseLeave={() => setHoveredDealerId(null)}
                  onClick={() => setSelectedState(d.state)}
                >
                  <div className="relative flex items-center justify-center">
                    {/* Ring animation on hover */}
                    <span
                      className={`absolute w-8 h-8 rounded-full bg-brand-gold/20 transition-all ${
                        hoveredDealerId === d.id ? "scale-150 opacity-100" : "scale-0 opacity-0"
                      }`}
                    />
                    
                    {/* Solid pin indicator */}
                    <div
                      className={`w-3.5 h-3.5 rounded-full border border-brand-black transition-all ${
                        hoveredDealerId === d.id 
                          ? "bg-brand-gold scale-125 shadow-[0_0_15px_#C58B45]" 
                          : "bg-brand-sand/40"
                      }`}
                    />
                    
                    {/* Tooltip labels */}
                    {hoveredDealerId === d.id && (
                      <div className="absolute bottom-6 bg-brand-black border border-brand-gold/30 text-brand-offwhite text-[9px] uppercase tracking-wider font-poppins py-1.5 px-3 rounded-none shadow-2xl whitespace-nowrap z-50">
                        {d.name} ({d.city})
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="relative z-10 text-[9px] text-brand-sand/40 font-poppins border-t border-brand-gold/10 pt-4 flex justify-between">
              <span>Interactive Nodes: Highlight state nodes to filter list details.</span>
              <span>Active Coverage Est. 1983</span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default DealerLocator;
