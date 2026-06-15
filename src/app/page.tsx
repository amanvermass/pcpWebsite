"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/homepage/Header";
import { Hero } from "@/components/homepage/Hero";
import { CompanyIntro } from "@/components/homepage/CompanyIntro";
import { ProductCategories } from "@/components/homepage/ProductCategories";
import { ManufacturingExcellence } from "@/components/homepage/ManufacturingExcellence";
import { Projects } from "@/components/homepage/Projects";
import { HorizontalSection } from "@/components/homepage/HorizontalSection";
import { WhyPCP } from "@/components/homepage/WhyPCP";
import { CalculatorsTeaser } from "@/components/homepage/CalculatorsTeaser";
import { DealerLocator } from "@/components/homepage/DealerLocator";
import { Testimonials } from "@/components/homepage/Testimonials";
import { ContactUs } from "@/components/homepage/ContactUs";
import { Footer } from "@/components/homepage/Footer";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

export default function Home() {
  const [darkMode, setDarkMode] = useState(true);

  // Sync theme class to document documentElement
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
    }
  }, [darkMode]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <main className="flex-grow">
        {/* Section 1: Hero */}
        <Hero darkMode={darkMode} />
        
        {/* Section 2: About PCP */}
        <ScrollReveal>
          <CompanyIntro />
        </ScrollReveal>
        
        {/* Section 3: Featured Products */}
        <ScrollReveal>
          <ProductCategories />
        </ScrollReveal>

        {/* Section 4: Manufacturing Excellence (Counters) */}
        <ScrollReveal>
          <ManufacturingExcellence />
        </ScrollReveal>

        {/* Section 5: Signature Projects (Alternating Layout) */}
        <ScrollReveal>
          <Projects teaser={true} />
        </ScrollReveal>

        {/* Project Gallery: Pinned Horizontal Scroll Showcase */}
        <HorizontalSection />
        
        {/* Why PCP Timeline */}
        <ScrollReveal>
          <WhyPCP />
        </ScrollReveal>
        
        {/* Section 6: Calculators Card Deck */}
        <ScrollReveal>
          <CalculatorsTeaser />
        </ScrollReveal>
        
        {/* Section 7: Dealer Network India Map */}
        <ScrollReveal>
          <DealerLocator />
        </ScrollReveal>
        
        {/* Section 8: Testimonials Infinite Marquee */}
        <ScrollReveal>
          <Testimonials />
        </ScrollReveal>
        
        {/* Section 9: Massive CTA */}
        <ScrollReveal>
          <ContactUs />
        </ScrollReveal>
      </main>

      {/* Section 10: Footer */}
      <Footer />
    </div>
  );
}

