import React from "react";
import { notFound } from "next/navigation";
import { supabase } from "@/lib/supabase";
import ProjectSlugClient from "./ProjectSlugClient";

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-")
    .trim();
}

// ⚡ REQUIRED FOR `output: 'export'` (SSG)
export async function generateStaticParams() {
  const { data: dbProjects } = await supabase.from("projects").select("title");

  if (!dbProjects) return [];

  return dbProjects.map((project: { title: string }) => ({
    slug: slugify(project.title),
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const { data: projects } = await supabase.from("projects").select("*");
  const project = projects?.find(
    (p: any) => slugify(p.title) === resolvedParams.slug,
  );

  if (!project) return { title: "Project Not Found – A&B Construction" };

  return {
    title: `${project.title} – Gallery Portfolio | A&B Construction`,
    description: `Explore marble laying, grinding, and surface execution details for ${project.title}.`,
  };
}

export default async function DynamicProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = await params;
  const { data: dbProjects } = await supabase.from("projects").select("*");

  const project = dbProjects?.find(
    (p: any) => slugify(p.title) === resolvedParams.slug,
  );

  if (!project) {
    notFound();
  }

  return <ProjectSlugClient project={project} />;
}
