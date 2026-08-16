import { MetadataRoute } from "next";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-static";

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-")
    .trim();
}

// Fallback project titles to guarantee slugs if Supabase fetch is offline at build time
const FALLBACK_PROJECT_TITLES = [
  "Central Vista Project",
  "Singapore High Commission",
  "AIIMS Hospital",
  "Dharav High School",
  "NACIN Academy",
  "SEBI Bhavan",
  "Japan Embassy",
  "DLF Camellias Gurugram",
  "Trade Facilitation Centre & Craft Museum",
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = "https://abconstructions.co.in";
  const staticDate = "2026-06-20";

  // Static routes list
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: staticDate,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: staticDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/projects`,
      lastModified: staticDate,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/gallery`,
      lastModified: staticDate,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: staticDate,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: staticDate,
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  // Dynamic gallery slug routes fetch
  let projectSlugs: string[] = [];

  try {
    const { data: dbProjects } = await supabase
      .from("projects")
      .select("title");

    const allTitles = [
      ...FALLBACK_PROJECT_TITLES,
      ...(dbProjects?.map((p: { title: string }) => p.title) || []),
    ];

    projectSlugs = Array.from(
      new Set(allTitles.map((title) => slugify(title)).filter(Boolean)),
    );
  } catch (error) {
    projectSlugs = FALLBACK_PROJECT_TITLES.map((title) => slugify(title));
  }

  // Create sitemap entries for dynamic gallery slug pages
  const galleryRoutes: MetadataRoute.Sitemap = projectSlugs.map((slug) => ({
    url: `${baseUrl}/gallery/${slug}`,
    lastModified: staticDate,
    changeFrequency: "weekly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...galleryRoutes];
}
