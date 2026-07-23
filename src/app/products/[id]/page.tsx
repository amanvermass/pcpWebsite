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
    title: product.seo?.title || `${product.name} | Technical Data & Specs | PCP Clay`,
    description: product.seo?.description || `Download Revit files, CAD drawings, and explore technical parameters (compressive strength, density, fire rating) for ${product.name} by Prayag Clay Productions.`,
    keywords: product.seo?.keywords || [],
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

  // Schema stack construction
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://pcpindia.com"
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": "Products",
        "item": "https://pcpindia.com/products"
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": product.h1 || product.name,
        "item": `https://pcpindia.com/products/${product.id}`
      }
    ]
  };

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": product.name,
    "image": `https://pcpindia.com${product.image}`,
    "description": product.desc,
    "sku": product.id,
    "brand": {
      "@type": "Brand",
      "name": "PCP Clay"
    },
    "offers": {
      "@type": "AggregateOffer",
      "priceCurrency": "INR",
      "lowPrice": "0",
      "highPrice": "0",
      "offerCount": "1",
      "priceValued": "Request Quote"
    },
    "additionalProperty": [
      { "@type": "PropertyValue", "name": "Length", "value": product.specs.length },
      { "@type": "PropertyValue", "name": "Width", "value": product.specs.width },
      { "@type": "PropertyValue", "name": "Height", "value": product.specs.height },
      { "@type": "PropertyValue", "name": "Weight", "value": product.specs.weight },
      { "@type": "PropertyValue", "name": "Density", "value": product.specs.density },
      { "@type": "PropertyValue", "name": "Water Absorption", "value": product.specs.waterAbsorption },
      { "@type": "PropertyValue", "name": "Compressive Strength", "value": product.specs.compStrength },
      { "@type": "PropertyValue", "name": "Fire Safety Rating", "value": product.specs.fireResistance }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": product.faqs ? product.faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    })) : []
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />
      {product.faqs && product.faqs.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}
      <ProductDetailClient product={product} />
    </>
  );
}
