import React from "react";
import { notFound } from "next/navigation";
import { Metadata } from "next";
import ApplicationClient from "./application-client";

interface PageProps {
  params: Promise<{ id: string }>;
}

const applicationsData: Record<string, {
  id: string;
  title: string;
  desc: string;
  seo: {
    title: string;
    description: string;
    keywords: string[];
  };
  categories: {
    title: string;
    desc: string;
    image: string;
    link: string;
    specs: string[];
  }[];
}> = {
  "structural-walling": {
    id: "structural-walling",
    title: "Structural Walling Systems",
    desc: "Explore Prayag Clay Products' certified load-bearing and thermal-insulating wall systems. Our systems utilize structural clay blocks to regulate indoor climates naturally.",
    seo: {
      title: "Structural Walling Solutions | Clay Blocks & Bricks | PCP India",
      description: "Discover PCP's structural walling systems. Compare thermal-insulating Ecotherm clay hollow blocks and high-density handmade loadbearing masonry.",
      keywords: ["structural clay blocks", "clay blocks", "structural walling", "masonry wall blocks"]
    },
    categories: [
      {
        title: "Ecotherm Clay Hollow Blocks",
        desc: "Flagship multi-chambered thermal hollow blocks engineered to provide certified natural insulation, thermal comfort, and high compressive strength for loadbearing and partition walls.",
        image: "/images/products/clay-hollow-bricks.jpg",
        link: "/products/ecotherm-clay-hollow-blocks",
        specs: ["Density: 850 kg/m³", "Compressive Strength: 8.5 N/mm²", "Thermal Insulation: 0.22 W/mK"]
      },
      {
        title: "Traditional Handmade Bricks",
        desc: "Heritage hand-molded facing bricks combining historic rustic textures with structural strength. Certified for exposed masonry and feature walls.",
        image: "/images/products/handmade-bricks.jpg",
        link: "/products/traditional-handmade-bricks",
        specs: ["Density: 1800 kg/m³", "Compressive Strength: 15 N/mm²", "Thermal Insulation: 0.52 W/mK"]
      }
    ]
  },
  "facades-cladding": {
    id: "facades-cladding",
    title: "Facades & Cladding Systems",
    desc: "Explore Prayag Clay Products' certified facade cladding systems. Choose between structural extruded facing bricks, elongated Linea slips, or lightweight ventilated cladding tiles.",
    seo: {
      title: "Premium Brick Cladding Solutions & Facades | PCP India",
      description: "Find the right facade system for your project envelope. Browse extruded facing bricks, elongated Linea slips, and ventilated cladding tiles.",
      keywords: ["brick cladding solutions", "facade cladding", "brick cladding", "clay cladding tiles"]
    },
    categories: [
      {
        title: "Facing Bricks (Extruded)",
        desc: "Premium extruded wirecut facing bricks designed for structural exposed brick facades. High compressive strength (35+ N/mm²) and low water absorption (<8%) for durable structural masonry.",
        image: "/images/products/extruded-wirecut.jpg",
        link: "/products/facing-bricks",
        specs: ["Dimensions: 230 x 110 x 75 mm", "Audited Compressive Strength: 35 N/mm²", "Class A1 Fire Resistance (4 Hours)"]
      },
      {
        title: "Linea Handmade Series",
        desc: "Artisanal elongated linear handmade bricks designed to create horizontal visual facade lines. Excellent for premium exposed brick designs requiring a unique horizontal profile.",
        image: "/images/hero-5.jpg",
        link: "/products/linea-series",
        specs: ["Dimensions: 440 x 100 x 40 mm", "Comp Strength: 20 N/mm²", "Class A1 Fire Resistance (2 Hours)"]
      },
      {
        title: "Cladding Bricks & Tiles",
        desc: "Thin terracotta cladding slips and split tiles designed for mechanical facade anchoring or adhesive backing. Creates a solid brick aesthetic with low weight.",
        image: "/images/cladding-showcase.jpg",
        link: "/products/cladding-bricks-tiles",
        specs: ["Dimensions: 240 x 15 x 60 mm", "Compressive Strength: 25 N/mm²", "Ideal for high-rise ventilated facades"]
      }
    ]
  }
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const app = applicationsData[id];

  if (!app) {
    return {
      title: "Application Not Found | PCP Clay",
    };
  }

  return {
    title: app.seo.title,
    description: app.seo.description,
    keywords: app.seo.keywords,
  };
}

export async function generateStaticParams() {
  return [
    { id: "structural-walling" },
    { id: "facades-cladding" }
  ];
}

export default async function ApplicationDetailPage({ params }: PageProps) {
  const { id } = await params;
  const app = applicationsData[id];

  if (!app) {
    notFound();
  }

  return <ApplicationClient appData={app} />;
}
