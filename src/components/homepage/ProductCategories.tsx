"use client";

import React, { useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface CategoryCardProps {
  title: string;
  desc: string;
  image: string;
  link: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, desc, image, link }) => {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Track relative mouse position inside the card
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for translation/rotation changes
  const springX = useSpring(x, { stiffness: 150, damping: 20 });
  const springY = useSpring(y, { stiffness: 150, damping: 20 });

  // Map mouse positions to rotation degree values (-15 to 15 degrees)
  const rotateX = useTransform(springY, [-0.5, 0.5], [15, -15]);
  const rotateY = useTransform(springX, [-0.5, 0.5], [-15, 15]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    // Calculate normalized position (between -0.5 and 0.5)
    const normalizedX = (e.clientX - rect.left) / rect.width - 0.5;
    const normalizedY = (e.clientY - rect.top) / rect.height - 0.5;

    x.set(normalizedX);
    y.set(normalizedY);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div 
      className="perspective-[1000px] w-full"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <Link href={link}>
        <motion.div
          ref={cardRef}
          style={{
            rotateX,
            rotateY,
            transformStyle: "preserve-3d"
          }}
          className="group relative h-[380px] w-full bg-brand-charcoal overflow-hidden border border-brand-gold/10 hover:border-brand-gold/40 transition-colors flex flex-col justify-end p-6 shadow-xl"
        >
          {/* Card image container */}
          <div className="absolute inset-0 z-0 bg-brand-black">
            <img 
              src={image} 
              alt={title}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-40 group-hover:opacity-55"
              style={{ transform: "translateZ(-20px)" }}
            />
            {/* Dark & Gold Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/60 to-transparent z-10" />
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-gold/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
          </div>

          {/* Card interactive content */}
          <div 
            className="relative z-20 flex flex-col gap-2 translate-z-[40px] transition-transform duration-300"
            style={{ transform: "translateZ(30px)" }}
          >
            {/* Top link arrow tag */}
            <div className="self-end p-2 bg-brand-black/80 border border-brand-gold/20 text-brand-gold rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
              <ArrowUpRight className="w-4 h-4" />
            </div>

            <span className="text-[9px] tracking-[0.3em] font-semibold text-brand-gold uppercase block font-poppins">
              explore collection
            </span>
            
            <h3 className="text-2xl font-normal font-cormorant text-brand-offwhite mt-1 group-hover:text-brand-gold transition-colors">
              {title}
            </h3>

            <p className="text-[11px] font-poppins text-brand-sand/65 leading-relaxed mt-2 max-w-[240px]">
              {desc}
            </p>
          </div>
        </motion.div>
      </Link>
    </div>
  );
};

export const ProductCategories: React.FC = () => {
  const categories = [
    {
      title: "Bricks",
      desc: "Premium terracotta facing bricks fired at high temperatures for facades.",
      image: "/images/hero-1.jpg",
      link: "/products?category=Clay Bricks"
    },
    {
      title: "Pavers",
      desc: "Heavy-load paving units designed for industrial public walkways.",
      image: "/images/hero-4.jpg",
      link: "/products?category=Pavers"
    },
    {
      title: "AAC Blocks",
      desc: "Thermal-insulating lightweight autoclaved cellular structural blocks.",
      image: "/images/hero-2.jpg",
      link: "/products?category=AAC Blocks"
    },
    {
      title: "Fly Ash Bricks",
      desc: "Organic fly-ash dense engineering bricks for structural columns.",
      image: "/images/hero-3.jpg",
      link: "/products?category=Hollow Blocks"
    },
    {
      title: "Construction Products",
      desc: "Ventilated terracotta grids and custom concrete layout designs.",
      image: "/images/hero-5.jpg",
      link: "/products"
    }
  ];

  return (
    <section id="categories" className="py-24 bg-brand-black relative">
      {/* Grid Guide lines */}
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
            CORE PRODUCT CATALOG
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal font-cormorant text-brand-offwhite mt-6 tracking-wide">
            Architectural Product Categories
          </h2>
          <p className="text-brand-sand/70 text-xs sm:text-sm font-poppins mt-4 max-w-xl leading-relaxed">
            Move your cursor over categories to view 3D structural parameters, texture details, and direct blueprint redirection keys.
          </p>
        </div>

        {/* Categories Flex Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {categories.map((cat, idx) => (
            <CategoryCard 
              key={idx}
              title={cat.title}
              desc={cat.desc}
              image={cat.image}
              link={cat.link}
            />
          ))}
        </div>

      </div>
    </section>
  );
};

export default ProductCategories;
