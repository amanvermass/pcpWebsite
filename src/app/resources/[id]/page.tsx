import React from "react";
import { notFound } from "next/navigation";
import { resources } from "@/data/resources";
import ResourceDetailClient from "./resource-detail-client";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const resource = resources.find((r) => r.id === id);

  if (!resource) {
    return {
      title: "Resource Not Found | PCP Clay",
    };
  }

  return {
    title: `${resource.name} | Technical CAD & BIM Files | PCP Clay`,
    description: `Download structural CAD assemblies, Revit families, or specifications logs for ${resource.name} (${resource.format} - ${resource.size}).`,
  };
}

export async function generateStaticParams() {
  return resources.map((r) => ({
    id: r.id,
  }));
}

export default async function ResourceDetailPage({ params }: PageProps) {
  const { id } = await params;
  const resource = resources.find((r) => r.id === id);

  if (!resource) {
    notFound();
  }

  return <ResourceDetailClient resource={resource} />;
}
