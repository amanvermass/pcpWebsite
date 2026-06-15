import React from "react";
import { Metadata } from "next";
import AboutClient from "./about-client";

export const metadata: Metadata = {
  title: "About Our Heritage & Technology | PCP India",
  description: "Learn about Prayag Clay Productions' (PCP) journey since 1983, our state-of-the-art automated European tunnel kilns, sustainable operations, and our leadership team.",
  keywords: ["about pcp", "prayag clay heritage", "tunnel kilns india", "clay factory", "masonry infrastructure", "sustainable building materials"],
};

export default function AboutPage() {
  return <AboutClient />;
}
