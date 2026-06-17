"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BookOpen, Calendar, Clock, ArrowRight, Rss } from "lucide-react";
import { useToast } from "../ui/Toast";

interface Blog {
  id: string;
  title: string;
  category: string;
  date: string;
  readTime: string;
  excerpt: string;
  image: string;
}

export const BlogsAndNews: React.FC = () => {
  const { toast } = useToast();
  const [selectedCat, setSelectedCat] = useState("All");

  const categories = ["All", "Construction Tips", "Sustainability", "Product Guides", "Industry News"];

  const blogs: Blog[] = [
    {
      id: "b1",
      title: "The Thermal Envelope: How Fired Clay Regulates Indoors",
      category: "Product Guides",
      date: "June 12, 2026",
      readTime: "5 min read",
      excerpt: "An engineering review of thermal lag in heavy fired clay brick walls, comparing cooling efficiency against standard concrete framework structures.",
      image: "/images/hero-1.jpg",
    },
    {
      id: "b2",
      title: "Circular Masonry: Recycled Clay Mixes in Civil Architecture",
      category: "Sustainability",
      date: "May 28, 2026",
      readTime: "7 min read",
      excerpt: "Exploring concrete aggregate substitutes and waste vitrification processes that let factories reuse production shards, achieving circularity certificates.",
      image: "/images/hero-4.jpg",
    },
    {
      id: "b3",
      title: "Seismic Facades: Anchoring Heavy Brick in Earthquake Zones",
      category: "Construction Tips",
      date: "May 15, 2026",
      readTime: "9 min read",
      excerpt: "Best structural practices for anchoring brick veneers to steel/concrete framework, ensuring wind-load tolerances and seismic isolation compliance.",
      image: "/images/hero-3.jpg",
    },
  ];

  const filteredBlogs = selectedCat === "All"
    ? blogs
    : blogs.filter(b => b.category === selectedCat);

  const handleReadBlog = (title: string) => {
    toast(`Redirecting: Loading full technical analysis for "${title}"...`, "info");
  };

  return (
    <section id="blogs" className="py-16 md:py-20 lg:py-24 bg-brand-slate-900 bg-grid-pattern relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center mb-16">
          <div className="lg:col-span-8">
            <span className="text-xs uppercase font-extrabold tracking-widest text-brand-terracotta-500 bg-brand-terracotta-500/10 px-3.5 py-1 rounded-full inline-flex items-center gap-1.5 mb-4">
              <Rss className="w-3.5 h-3.5" />
              Resources & Insights
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Knowledge Base & Editorial
            </h2>
            <p className="text-brand-slate-400 mt-4 text-base leading-relaxed max-w-2xl">
              Stay updated with structural masonry best practices, thermal calculations, environmental legislation guides, and product implementation manuals.
            </p>
          </div>
          
          {/* Category tabs */}
          <div className="lg:col-span-4 flex flex-wrap lg:justify-end gap-1.5">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCat(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  selectedCat === cat
                    ? "bg-brand-terracotta-600 text-white"
                    : "bg-brand-slate-950 text-brand-slate-450 hover:text-white border border-brand-slate-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Blogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredBlogs.map((b) => (
              <motion.div
                key={b.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="group flex flex-col justify-between bg-brand-slate-950 border border-brand-slate-800/80 rounded-2xl overflow-hidden hover:border-brand-slate-700 transition-all hover:shadow-2xl"
              >
                {/* Visual */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-brand-slate-900 shrink-0">
                  <img
                    src={b.image}
                    alt={b.title}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-4 left-4 bg-brand-slate-950/80 backdrop-blur-md text-brand-terracotta-400 border border-brand-slate-800 text-[9px] uppercase font-bold tracking-widest px-2.5 py-1 rounded-md">
                    {b.category}
                  </div>
                </div>

                {/* Info */}
                <div className="p-6 flex-grow flex flex-col justify-between gap-6">
                  <div>
                    <div className="flex items-center gap-4 text-[10px] text-brand-slate-500 font-bold uppercase tracking-wider">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5" />
                        {b.date}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5" />
                        {b.readTime}
                      </span>
                    </div>

                    <h3 
                      onClick={() => handleReadBlog(b.title)}
                      className="text-lg font-bold text-white mt-3 leading-snug group-hover:text-brand-terracotta-400 transition-colors cursor-pointer"
                    >
                      {b.title}
                    </h3>
                    
                    <p className="text-xs text-brand-slate-400 mt-2 leading-relaxed">
                      {b.excerpt}
                    </p>
                  </div>

                  <button
                    onClick={() => handleReadBlog(b.title)}
                    className="flex items-center gap-1.5 text-xs font-bold text-brand-terracotta-400 group-hover:text-brand-terracotta-300 transition-colors cursor-pointer border-t border-brand-slate-900/60 pt-4"
                  >
                    Read Technical Article
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
};
