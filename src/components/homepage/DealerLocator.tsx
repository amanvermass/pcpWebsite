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
  coordinates: { x: number; y: number }; // Simulated map layout relative %
}

export const DealerLocator: React.FC = () => {
  const { toast } = useToast();
  const [selectedState, setSelectedState] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [hoveredDealerId, setHoveredDealerId] = useState<string | null>(null);

  const states = ["All", "California", "Oregon", "Washington"];

  const dealers: Dealer[] = [
    {
      id: "d1",
      name: "PCP California Depot",
      state: "California",
      city: "Los Angeles",
      address: "1420 Industrial Pkwy, Los Angeles, CA 90021",
      phone: "+1 (213) 555-0182",
      email: "la.depot@prayagclay.com",
      web: "www.prayagclay.com/la",
      coordinates: { x: 35, y: 75 },
    },
    {
      id: "d2",
      name: "Bay Area Terracotta Hub",
      state: "California",
      city: "San Francisco",
      address: "520 Bayshore Blvd, San Francisco, CA 94124",
      phone: "+1 (415) 555-0177",
      email: "sf.sales@prayagclay.com",
      web: "www.prayagclay.com/sf",
      coordinates: { x: 25, y: 55 },
    },
    {
      id: "d3",
      name: "Pacific Brick & Tile Co.",
      state: "Oregon",
      city: "Portland",
      address: "890 Willamette Blvd, Portland, OR 97203",
      phone: "+1 (503) 555-0199",
      email: "pdx.dist@pacificbrick.com",
      web: "www.pacificbrick.com",
      coordinates: { x: 45, y: 35 },
    },
    {
      id: "d4",
      name: "Seattle Block Distributors",
      state: "Washington",
      city: "Seattle",
      address: "3410 King St S, Seattle, WA 98144",
      phone: "+1 (206) 555-0144",
      email: "seattle.store@seattleblock.com",
      web: "www.seattleblock.com",
      coordinates: { x: 40, y: 15 },
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
    toast(`Routing requests: Simulating GPS path calculation to ${dealerName}.`, "info");
  };

  return (
    <section id="dealers" className="py-24 bg-brand-slate-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-xs uppercase font-extrabold tracking-widest text-brand-terracotta-500 bg-brand-terracotta-500/10 px-3 py-1 rounded-full">
            Partners & Network
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-4 tracking-tight">
            Dealer Network Locator
          </h2>
          <p className="text-brand-slate-400 mt-3">
            Find certified PCP distributors near you to check material stock, view physical samples, and arrange wholesale bulk deliveries.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Filters & Dealers list column */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            
            {/* Search filter panels */}
            <div className="bg-brand-slate-900 border border-brand-slate-800 rounded-3xl p-5 flex flex-col gap-4">
              <div className="relative">
                <Search className="absolute left-4 top-3.5 w-4 h-4 text-brand-slate-500" />
                <input
                  type="text"
                  placeholder="Search by city or name..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-brand-slate-950 border border-brand-slate-850 rounded-2xl pl-11 pr-4 py-3 text-sm text-white focus:outline-none focus:border-brand-terracotta-500"
                />
              </div>

              <div className="flex gap-2">
                {states.map((st) => (
                  <button
                    key={st}
                    onClick={() => setSelectedState(st)}
                    className={`flex-1 py-2 rounded-xl text-xs font-semibold border cursor-pointer text-center transition-all ${
                      selectedState === st
                        ? "bg-brand-terracotta-600 border-brand-terracotta-600 text-white shadow-md"
                        : "bg-brand-slate-950 border-brand-slate-850 text-brand-slate-400 hover:text-white"
                    }`}
                  >
                    {st === "All" ? "All States" : st}
                  </button>
                ))}
              </div>
            </div>

            {/* Scrollable list */}
            <div className="flex flex-col gap-3 max-h-[500px] overflow-y-auto pr-2">
              {filteredDealers.length === 0 ? (
                <div className="bg-brand-slate-900 border border-brand-slate-800 rounded-2xl p-8 text-center text-brand-slate-500 text-sm">
                  No registered distributors found matching the criteria.
                </div>
              ) : (
                filteredDealers.map((d) => (
                  <div
                    key={d.id}
                    onMouseEnter={() => setHoveredDealerId(d.id)}
                    onMouseLeave={() => setHoveredDealerId(null)}
                    className={`p-5 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between gap-4 ${
                      hoveredDealerId === d.id
                        ? "bg-brand-slate-900 border-brand-terracotta-500/50 shadow-lg"
                        : "bg-brand-slate-900/50 border-brand-slate-800 hover:border-brand-slate-700"
                    }`}
                  >
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="font-extrabold text-white text-base">{d.name}</h3>
                        <span className="text-[10px] text-brand-terracotta-500 font-bold uppercase tracking-widest">
                          {d.city}
                        </span>
                      </div>
                      <p className="text-xs text-brand-slate-400 mt-2 flex items-start gap-1.5 leading-snug">
                        <MapPin className="w-3.5 h-3.5 text-brand-terracotta-500 shrink-0 mt-0.5" />
                        {d.address}
                      </p>
                    </div>

                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs text-brand-slate-400 border-t border-brand-slate-850 pt-3">
                      <span className="flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-brand-slate-500" /> {d.phone}</span>
                      <span className="flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-brand-slate-500 truncate" /> {d.email}</span>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => handleGetDirections(d.name)}
                        className="flex-1 bg-brand-terracotta-600/20 hover:bg-brand-terracotta-600 text-brand-terracotta-400 hover:text-white py-2 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1 cursor-pointer"
                      >
                        <Navigation className="w-3.5 h-3.5" />
                        Directions
                      </button>
                      <a
                        href={`https://${d.web}`}
                        target="_blank"
                        rel="noreferrer"
                        className="flex-1 bg-brand-slate-950 hover:bg-brand-slate-850 border border-brand-slate-850 hover:border-brand-slate-750 text-brand-slate-300 hover:text-white py-2 rounded-xl text-xs font-bold transition-all text-center flex items-center justify-center gap-1"
                      >
                        <Globe className="w-3.5 h-3.5" />
                        Visit Website
                      </a>
                    </div>
                  </div>
                ))
              )}
            </div>

          </div>

          {/* Styled Map visualization column */}
          <div className="lg:col-span-7 bg-brand-slate-900 border border-brand-slate-800 rounded-3xl p-6 flex flex-col justify-between relative overflow-hidden min-h-[400px] lg:min-h-0">
            
            {/* Custom Interactive SVG Map representing Regional West Coast Map */}
            <div className="absolute inset-0 bg-brand-slate-950/20 z-0 bg-grid-pattern" />
            
            <div className="relative z-10 w-full flex justify-between items-center pb-4 border-b border-brand-slate-850">
              <span className="text-xs font-bold text-brand-slate-400 uppercase tracking-widest flex items-center gap-1.5">
                <Compass className="w-4 h-4 text-brand-terracotta-500 shrink-0" />
                Distribution Coverage Map
              </span>
              <span className="text-[10px] bg-brand-emerald-500/10 text-brand-emerald-400 px-2 py-0.5 rounded border border-brand-emerald-500/20 font-bold uppercase">
                Active Nodes
              </span>
            </div>

            {/* Simulated Map Board */}
            <div className="relative flex-grow flex items-center justify-center w-full h-64 lg:h-full z-10 py-8">
              {/* Fake US Coast Outline SVG */}
              <svg className="w-full h-full text-brand-slate-850 opacity-40" viewBox="0 0 100 100" fill="none">
                {/* Simulated shoreline */}
                <path d="M10,0 C12,25 5,50 15,75 C20,85 10,95 20,100" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" />
                {/* Coastal state bounds */}
                <path d="M15,25 L50,28 L60,35 C65,40 50,55 52,65 L35,75 M35,75 L38,100" stroke="currentColor" strokeWidth="0.75" />
              </svg>

              {/* Interactive pins */}
              {filteredDealers.map((d) => (
                <div
                  key={d.id}
                  className="absolute transition-all duration-300"
                  style={{ left: `${d.coordinates.x}%`, top: `${d.coordinates.y}%` }}
                  onMouseEnter={() => setHoveredDealerId(d.id)}
                  onMouseLeave={() => setHoveredDealerId(null)}
                >
                  <div className="relative flex items-center justify-center">
                    {/* Ring animation on hover */}
                    <span
                      className={`absolute w-8 h-8 rounded-full bg-brand-terracotta-600/30 transition-all ${
                        hoveredDealerId === d.id ? "scale-150 opacity-100" : "scale-0 opacity-0"
                      }`}
                    />
                    
                    {/* Solid pin indicator */}
                    <MapPin
                      className={`w-7 h-7 cursor-pointer transition-all ${
                        hoveredDealerId === d.id ? "text-brand-terracotta-500 -translate-y-1 scale-110" : "text-brand-slate-500"
                      }`}
                    />
                    
                    {/* Tiny popup labels */}
                    {hoveredDealerId === d.id && (
                      <div className="absolute bottom-8 bg-brand-slate-900 border border-brand-slate-800 text-white text-[10px] font-bold py-1 px-2.5 rounded-lg shadow-2xl whitespace-nowrap z-50">
                        {d.name}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="relative z-10 text-[10px] text-brand-slate-500 font-medium border-t border-brand-slate-850 pt-4 flex justify-between">
              <span>Interactive Nodes: Highlight to view coordinates.</span>
              <span>Mock GPS Module Active</span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
