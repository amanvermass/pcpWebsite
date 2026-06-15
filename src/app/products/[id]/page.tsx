import React from "react";
import { notFound } from "next/navigation";
import { products } from "@/data/products";
import ProductDetailClient from "./product-detail-client";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    return {
      title: "Product Not Found | PCP Clay",
    };
  }

  return {
    title: `${product.name} | Technical Data & Specs | PCP Clay`,
    description: `Download Revit files, CAD drawings, and explore technical parameters (compressive strength, density, fire rating) for ${product.name} by Prayag Clay Productions.`,
  };
}

export async function generateStaticParams() {
  return products.map((p) => ({
    id: p.id,
  }));
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;
  const product = products.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  return <ProductDetailClient product={product} />;
}
