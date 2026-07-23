import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { ImageReveal } from "../ui/ScrollReveal";
import Link from "next/link";
import { Magnetic } from "../ui/Magnetic";

interface CategoryCardProps {
  title: string;
  desc: string;
  image: string;
  link: string;
  index: number;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ title, desc, image, link, index }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  // Cards fall from the sky (large negative Y) and gather horizontally (dispersed X converging to 0)
  const startX = (index - 2) * 70; // Dispersed horizontally
  const startY = -600; // Falling from above
  const startRotate = (index - 2) * 8; // Slanted rotation

  return (
    <motion.div
      initial={{
        opacity: 0,
        x: startX,
        y: startY,
        scale: 0.15,
        rotate: startRotate,
        filter: "blur(8px)"
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
        scale: 1,
        rotate: 0,
        filter: "blur(0px)"
      }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        type: "spring",
        stiffness: 55,
        damping: 14,
        mass: 1.15,
        delay: index * 0.15
      }}
      className="w-full h-[380px] [perspective:1000px] relative"
    >
      {/* Falling star trail aura (bright initially, fades as it settles) */}
      <motion.div
        initial={{ opacity: 0.75, scale: 0.6 }}
        whileInView={{ opacity: 0, scale: 1.25 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{
          duration: 1.4,
          delay: index * 0.15 + 0.3,
          ease: "easeOut"
        }}
        className="absolute -inset-8 bg-brand-gold/15 blur-2xl rounded-full pointer-events-none z-0"
      />

      <Link
        href={link}
        className="w-full h-full cursor-pointer relative z-10 block"
        onMouseEnter={() => setIsFlipped(true)}
        onMouseLeave={() => setIsFlipped(false)}
      >
        <motion.div
          animate={{ rotateY: isFlipped ? 180 : 0 }}
          transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
          className="w-full h-full relative [transform-style:preserve-3d]"
        >
          {/* FRONT FACE */}
          <div
            style={{ backfaceVisibility: "hidden", WebkitBackfaceVisibility: "hidden" }}
            className="absolute inset-0 w-full h-full bg-brand-charcoal bg-black border border-brand-gold/10 overflow-hidden flex flex-col justify-end p-6 shadow-xl"
          >
            {/* Card image container */}
            <div className="absolute inset-0 z-0 bg-[#121110] overflow-hidden">
              <ImageReveal>
                <img
                  src={image}
                  alt={title}
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
                />
              </ImageReveal>
              {/* Dark & Gold Gradient overlays */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent z-10" />
              <div className="absolute inset-0 bg-gradient-to-tr from-brand-gold/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10" />
            </div>

            {/* Settle Sparkle Shine Sweep (runs when card hits its position) */}
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              whileInView={{ x: "100%", opacity: [0, 1, 1, 0] }}
              viewport={{ once: true }}
              transition={{
                duration: 1.2,
                delay: index * 0.15 + 0.8,
                ease: "easeInOut"
              }}
              className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent -skew-x-12 pointer-events-none z-20"
            />

            {/* Front Content */}
            <div className="relative z-20 flex flex-col gap-2">
              <span className="text-[9px] tracking-[0.3em] font-semibold text-brand-gold uppercase block font-poppins">
                explore collection
              </span>

              <h3 className="text-3xl font-normal font-cormorant text-cream-force mt-1">
                {title}
              </h3>
            </div>
          </div>

          {/* BACK FACE */}
          <div
            style={{
              backfaceVisibility: "hidden",
              WebkitBackfaceVisibility: "hidden",
              transform: "rotateY(180deg)"
            }}
            className="absolute inset-0 w-full h-full bg-brand-charcoal border border-brand-gold/25 p-6 flex flex-col justify-between shadow-xl"
          >
            <div className="flex flex-col gap-4 text-left">
              <span className="text-[9px] tracking-[0.3em] font-semibold text-brand-gold uppercase block font-poppins">
                0{index + 1} / TECHNICAL SPEC
              </span>

              <h3 className="text-2xl font-normal font-cormorant text-brand-offwhite">
                {title}
              </h3>

              <p className="text-xs font-poppins text-brand-slate-200 leading-relaxed">
                {desc}
              </p>
            </div>

            <div
              className="inline-flex items-center gap-2 text-brand-gold hover:text-brand-offwhite text-[10px] font-poppins font-bold tracking-widest uppercase transition-colors"
            >
              Explore Collection
              <ArrowUpRight className="w-4 h-4" />
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  );
};

export const ProductCategories: React.FC = () => {
  const categories = [
    {
      title: "Clay Hollow Bricks",
      desc: "High-performance multi-chambered thermal hollow blocks for load-bearing and partition walls.",
      image: "/images/products/clay-hollow-bricks.jpg",
      link: "/products/ecotherm-clay-hollow-blocks"
    },
    {
      title: "Handmade bricks",
      desc: "Hand-crafted rustic facing bricks combining historic heritage texture with structural durability.",
      image: "/images/products/handmade-bricks.jpg",
      link: "/products/traditional-handmade-bricks"
    },
    {
      title: "Terraplast",
      desc: "Earthy plasters and lightweight insulating materials available in 22+ bespoke tones.",
      image: "/images/ecotherm-hollow.jpg",
      link: "/products/terraplast"
    },
    {
      title: "Cladding Bricks & Tiles",
      desc: "Premium visual cladding solutions for modern, weather-resistant building envelopes.",
      image: "/images/cladding-showcase.jpg",
      link: "/products/cladding-bricks-tiles"
    },
    {
      title: "Extruded Wirecut",
      desc: "Precision wirecut facing bricks with high compressive strength and low water absorption.",
      image: "/images/products/extruded-wirecut.jpg",
      link: "/products/facing-bricks"
    },
    {
      title: "Clay Pavers",
      desc: "Heavy-load vitrified clay paving units designed for pedestrian walkways and public plazas.",
      image: "/images/products/clay-pavers.jpg",
      link: "/products/clay-pavers"
    }
  ];

  return (
    <section id="categories" className="py-16 md:py-20 lg:py-24 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 flex flex-col items-center">
          <span className="text-[10px] uppercase font-bold tracking-[0.35em] text-brand-gold bg-brand-gold/5 px-4 py-1.5 border border-brand-gold/20 rounded-none w-fit block">
            CORE PRODUCT CATALOG
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal font-cormorant text-brand-offwhite mt-6 tracking-wide">
            Architectural Product Categories
          </h2>
          <p className="text-brand-slate-300 text-xs sm:text-sm font-poppins mt-4 max-w-xl leading-relaxed">
            Move your cursor over categories to view 3D structural parameters, texture details, and direct blueprint redirection keys.
          </p>
        </div>

        {/* Categories Flex Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((cat, idx) => (
            <CategoryCard
              key={idx}
              title={cat.title}
              desc={cat.desc}
              image={cat.image}
              link={cat.link}
              index={idx}
            />
          ))}
        </div>

        {/* View All Categories / Products CTA Button */}
        <div className="text-center mt-16 relative z-10">
          <Magnetic>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-brand-gold hover:bg-brand-sand text-brand-black px-8 py-4 rounded-none font-semibold uppercase tracking-[0.2em] font-poppins text-xs transition-colors border border-brand-gold cursor-pointer"
            >
              View All Products
              <ArrowRight className="w-4 h-4" />
            </Link>
          </Magnetic>
        </div>

      </div>
    </section>
  );
};

export default ProductCategories;
