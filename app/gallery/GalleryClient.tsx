"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { supabase } from "@/lib/supabase";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface GalleryProject {
  id: string;
  title: string;
  category: string;
  year: number | null;
  slug: string;
  folderSearchName: string;
  coverImage?: string;
  location?: string;
}

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/--+/g, "-")
    .trim();
}

// 🎯 Folder Matcher for Supabase Buckets
function findBestMatchingFolder(
  title: string,
  rootFolders: { name: string }[],
) {
  const cleanTitle = title.toUpperCase().trim();

  if (!rootFolders || rootFolders.length === 0) return cleanTitle;

  const exact = rootFolders.find(
    (f) => f.name.toUpperCase().trim() === cleanTitle,
  );
  if (exact) return exact.name;

  const keywords = [
    "TRADE FACILITATION",
    "CRAFT MUSEUM",
    "SINGAPORE",
    "HIGH COMMISSION",
    "EMBASSY",
    "AIIMS",
    "CENTRAL VISTA",
    "DHARAV",
    "NACIN",
    "CAMELLIAS",
    "CMD",
    "AMITY",
    "SEBI",
    "MES",
  ];
  for (const kw of keywords) {
    if (cleanTitle.includes(kw)) {
      const match = rootFolders.find((f) => f.name.toUpperCase().includes(kw));
      if (match) return match.name;
    }
  }

  const partial = rootFolders.find((f) => {
    const folderName = f.name.toUpperCase().trim();
    return folderName.includes(cleanTitle) || cleanTitle.includes(folderName);
  });

  return partial ? partial.name : cleanTitle;
}

export default function GalleryClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  const [projects, setProjects] = useState<GalleryProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".gallery-hero-badge",
          { opacity: 0, y: -10 },
          { opacity: 1, y: 0, duration: 0.5, delay: 0.1 },
        );
        gsap.fromTo(
          ".gallery-hero-title-line",
          { opacity: 0, y: 40, filter: "blur(8px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.8,
            stagger: 0.15,
            ease: "expo.out",
          },
        );
      });
      return () => mm.revert();
    },
    { scope: containerRef },
  );

  useEffect(() => {
    async function fetchAllProjectsAndImages() {
      try {
        setIsLoading(true);
        const bucketName = "project-images";

        const { data: rootItems } = await supabase.storage
          .from(bucketName)
          .list("", { limit: 100 });

        const { data: dbProjects, error } = await supabase
          .from("projects")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;

        if (dbProjects) {
          const mappedProjects: GalleryProject[] = await Promise.all(
            dbProjects.map(async (project: any) => {
              const matchedFolder = findBestMatchingFolder(
                project.title,
                rootItems || [],
              );
              let coverUrl =
                "https://a-bconstruction.in/wp-content/uploads/2025/01/1-1024x1024.png";

              try {
                const { data: files } = await supabase.storage
                  .from(bucketName)
                  .list(matchedFolder, { limit: 10 });

                if (files && files.length > 0) {
                  const validFiles = files.filter(
                    (f) =>
                      f.name !== ".emptyFolderPlaceholder" &&
                      !f.name.startsWith("."),
                  );
                  if (validFiles.length > 0) {
                    const fullPath = `${matchedFolder}/${validFiles[0].name}`;
                    const { data: signedData } = await supabase.storage
                      .from(bucketName)
                      .createSignedUrl(fullPath, 3600);

                    if (signedData?.signedUrl) {
                      coverUrl = signedData.signedUrl;
                    }
                  }
                }
              } catch (e) {
                console.error("Cover image fetch error for", matchedFolder, e);
              }

              return {
                id: project.id,
                title: project.title,
                category: project.category || "Government/Embassy",
                year: project.year ? Number(project.year) : null,
                slug: slugify(project.title),
                folderSearchName: matchedFolder,
                coverImage: coverUrl,
                location: project.location || "Chanakyapuri, New Delhi",
              };
            }),
          );

          setProjects(mappedProjects);
        }
      } catch (err) {
        console.error("Gallery fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchAllProjectsAndImages();
  }, []);

  return (
    <div
      ref={containerRef}
      className="bg-stone-50 text-stone-900 font-sans min-h-screen"
    >
      {/* Hero Header */}
      <section
        ref={heroRef}
        className="relative min-h-[40vh] sm:min-h-[45vh] flex items-center bg-stone-900 text-white pt-28 sm:pt-32 pb-12 sm:pb-16 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-900/80 to-transparent z-10" />
        <div className="gallery-hero-content relative z-20 max-w-7xl mx-auto px-4 sm:px-8 md:px-12 w-full">
          <span className="gallery-hero-badge text-amber-500 text-xs tracking-widest uppercase font-extrabold block mb-2">
            Media Lookbook Portfolio
          </span>
          <span className="block h-[2px] w-14 bg-amber-500/70 origin-left mb-4" />
          <h1 className="text-3xl sm:text-5xl font-light tracking-tight text-white uppercase leading-tight">
            <span className="gallery-hero-title-line block">
              What our work looks like
            </span>
            <span className="gallery-hero-title-line font-extrabold text-amber-500 block">
              In the real world
            </span>
          </h1>
        </div>
      </section>

      {/* Main Grid Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 py-16">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {[1, 2, 3, 4, 5, 6].map((idx) => (
              <div
                key={idx}
                className="aspect-square bg-stone-200 animate-pulse rounded-sm"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {projects.map((project) => (
              <Link
                key={project.id}
                href={`/gallery/${project.slug}`}
                className="group relative block aspect-square w-full bg-stone-950 overflow-hidden rounded-sm border border-stone-200/60 shadow-sm hover:shadow-2xl hover:border-amber-500/80 transition-all duration-500 ease-out select-none"
              >
                {/* Background Image */}
                <Image
                  src={
                    project.coverImage ||
                    "https://a-bconstruction.in/wp-content/uploads/2025/01/1-1024x1024.png"
                  }
                  alt={project.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover filter brightness-[0.88] group-hover:brightness-[0.45] group-hover:scale-105 transition-all duration-700 ease-out"
                  unoptimized
                />

                {/* Subtle Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-stone-950/30 group-hover:from-stone-950/90 group-hover:via-stone-950/60 transition-all duration-500" />

                {/* Always-visible Category Pill */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 bg-stone-950/70 backdrop-blur-sm border border-stone-700/60 text-[9px] sm:text-[10px] font-black uppercase tracking-[0.2em] text-amber-400 rounded-xs">
                    {project.category}
                  </span>
                </div>

                {/* Centered Hover Info (Snyder Style) */}
                <div className="absolute inset-0 p-6 flex flex-col items-center justify-center text-center z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <span className="text-amber-400 text-[10px] sm:text-xs font-black uppercase tracking-[0.25em] mb-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                    {project.category}
                  </span>
                  <h3 className="text-white text-lg sm:text-xl md:text-2xl font-black uppercase tracking-tight leading-snug max-w-[90%] transform translate-y-3 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                    {project.title}
                  </h3>
                </div>

                {/* Bottom Right Chevron Action Box */}
                <div className="absolute bottom-0 right-0 z-20 bg-stone-900/90 group-hover:bg-amber-600 px-4 py-3.5 sm:px-5 sm:py-4 transition-colors duration-300 flex items-center justify-center">
                  <span className="text-amber-400 group-hover:text-white text-base sm:text-lg font-extrabold tracking-tighter transform group-hover:translate-x-1 transition-transform duration-300">
                    ≫
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
