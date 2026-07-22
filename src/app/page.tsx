"use client";

import React, { useState, useEffect } from "react";
import { Header } from "@/components/homepage/Header";
import { Hero } from "@/components/homepage/Hero";
import { CompanyIntro } from "@/components/homepage/CompanyIntro";
import { EcothermFeature } from "@/components/homepage/EcothermFeature";
import { SustainabilityStrip } from "@/components/homepage/SustainabilityStrip";
import { ProductCategories } from "@/components/homepage/ProductCategories";
import { AudienceGateways } from "@/components/homepage/AudienceGateways";

import { Projects } from "@/components/homepage/Projects";
import { CalculatorsTeaser } from "@/components/homepage/CalculatorsTeaser";
import { DealerLocator } from "@/components/homepage/DealerLocator";
import { Testimonials } from "@/components/homepage/Testimonials";
import { ContactUs } from "@/components/homepage/ContactUs";
import { Footer } from "@/components/homepage/Footer";
import { ScrollReveal } from "@/components/ui/ScrollReveal";

import { BlueprintGlobalBackground } from "@/components/ui/BlueprintGlobalBackground";

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
      <main className="flex-grow relative">
        <BlueprintGlobalBackground />
        
        {/* Section 1: Hero */}
        <Hero darkMode={darkMode} />
        
        {/* Section 2: Legacy / Three Generations */}
        <ScrollReveal>
          <CompanyIntro />
        </ScrollReveal>
        


        {/* Section 3: Ecotherm Feature (Hero Product) */}
        <ScrollReveal>
          <EcothermFeature />
        </ScrollReveal>

        {/* Section 4: Sustainability & Certification Strip */}
        <ScrollReveal>
          <SustainabilityStrip />
        </ScrollReveal>
        
        {/* Section 5: Product Range */}
        <ScrollReveal>
          <div id="products-range">
            <ProductCategories />
          </div>
        </ScrollReveal>

        {/* Section 6: Audience Gateways */}
        <ScrollReveal>
          <AudienceGateways />
        </ScrollReveal>

        {/* Section 7: Projects & Clients (Social Proof) */}
        <ScrollReveal>
          <Projects teaser={true} />
        </ScrollReveal>
        
        {/* Section 8: Tools & Resources Teaser */}
        <ScrollReveal>
          <CalculatorsTeaser />
        </ScrollReveal>
        
        {/* Section 9: Testimonials */}
        <ScrollReveal>
          <Testimonials />
        </ScrollReveal>
        
        {/* Section 10: Dealer Locator Teaser */}
        <ScrollReveal>
          <DealerLocator />
        </ScrollReveal>
        
        {/* final Safety Net CTA */}
        <ScrollReveal>
          <ContactUs />
        </ScrollReveal>
      </main>

      {/* Section 11: Footer */}
      <Footer />
    </div>
  );
}

