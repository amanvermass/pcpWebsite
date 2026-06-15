import React from "react";
import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import ProjectDetailClient from "./project-detail-client";
import { Metadata } from "next";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return {
      title: "Project Not Found | PCP Clay",
    };
  }

  return {
    title: `${project.name} | Architectural Case Study | PCP Clay`,
    description: `Explore the construction details and clay materials used in the ${project.name} in ${project.location}, designed by ${project.architect}.`,
  };
}

export async function generateStaticParams() {
  return projects.map((p) => ({
    id: p.id,
  }));
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { id } = await params;
  const project = projects.find((p) => p.id === id);

  if (!project) {
    notFound();
  }

  return <ProjectDetailClient project={project} />;
}
