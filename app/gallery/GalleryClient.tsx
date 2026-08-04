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

// 🎯 Robust Folder Matcher for Supabase Buckets (Fixes AIIMS, Central Vista, etc.)
function findBestMatchingFolder(
  title: string,
  rootFolders: { name: string }[],
) {
  const cleanTitle = title.toUpperCase().trim();

  if (!rootFolders || rootFolders.length === 0) return cleanTitle;

  // 1. Exact match
  const exact = rootFolders.find(
    (f) => f.name.toUpperCase().trim() === cleanTitle,
  );
  if (exact) return exact.name;

  // 2. High-priority keyword anchors (e.g. AIIMS, CENTRAL VISTA, DHARAV)
  const keywords = [
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

  // 3. Fallback partial substring match
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
  const [activeMobileCard, setActiveMobileCard] = useState<string | null>(null);

  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseTimeout = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const handleCardTouch = (
    cardId: string,
    e: React.MouseEvent | React.TouchEvent,
  ) => {
    e.stopPropagation();
    clearCloseTimeout();

    if (activeMobileCard === cardId) {
      setActiveMobileCard(null);
      return;
    }

    setActiveMobileCard(cardId);
    closeTimeoutRef.current = setTimeout(() => {
      setActiveMobileCard(null);
      closeTimeoutRef.current = null;
    }, 2000);
  };

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

        // Fetch all top-level storage directories once
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
                category: project.category || "Commercial",
                year: project.year ? Number(project.year) : null,
                slug: slugify(project.title),
                folderSearchName: matchedFolder,
                coverImage: coverUrl,
                location: project.location || "India",
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
              Exquisite Surface
            </span>
            <span className="gallery-hero-title-line font-extrabold text-amber-500 block">
              Installations.
            </span>
          </h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 py-16">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3, 4, 5, 6].map((idx) => (
              <div
                key={idx}
                className="aspect-[4/3] bg-stone-200 animate-pulse rounded-sm"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, idx) => {
              const cardId = `project-${idx}`;
              const isActive = activeMobileCard === cardId;

              return (
                <div
                  key={project.id}
                  onClick={(e) => handleCardTouch(cardId, e)}
                  className="group relative bg-stone-900 rounded-sm overflow-hidden shadow-md cursor-pointer select-none"
                >
                  <div className="relative aspect-[4/3] w-full overflow-hidden bg-stone-800">
                    <Image
                      src={
                        project.coverImage ||
                        "https://a-bconstruction.in/wp-content/uploads/2025/01/1-1024x1024.png"
                      }
                      alt={project.title}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className={`object-contain transition-all duration-700 ease-out ${
                        isActive
                          ? "brightness-40 scale-105"
                          : "brightness-90 group-hover:brightness-40 group-hover:scale-105"
                      }`}
                      unoptimized
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/40 to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />

                    <div className="absolute top-4 left-4 z-10">
                      <span className="px-3 py-1 bg-stone-950/80 backdrop-blur-md border border-amber-500/40 text-[10px] font-extrabold uppercase tracking-widest text-amber-400 rounded-sm">
                        {project.category}
                      </span>
                    </div>

                    <div
                      className={`absolute inset-0 p-6 flex flex-col justify-between z-20 transition-all duration-300 ${
                        isActive
                          ? "opacity-100 visible"
                          : "opacity-0 invisible group-hover:opacity-100 group-hover:visible"
                      }`}
                    >
                      <div className="pt-10">
                        <span className="text-amber-500 text-[10px] font-black uppercase tracking-[0.2em] block mb-1">
                          📍 {project.location}{" "}
                          {project.year ? `· ${project.year}` : ""}
                        </span>
                        <h3 className="text-white font-extrabold text-lg uppercase tracking-tight leading-snug">
                          {project.title}
                        </h3>
                      </div>

                      <div className="pt-4">
                        <Link
                          href={`/gallery/${project.slug}`}
                          className="w-full inline-flex items-center justify-between py-3 px-4 bg-amber-600 hover:bg-amber-500 text-white text-xs font-extrabold uppercase tracking-widest rounded-sm transition-all shadow-lg"
                        >
                          <span>Show All Project Images</span>
                          <span className="text-sm font-bold">→</span>
                        </Link>
                      </div>
                    </div>
                  </div>

                  <div className="p-5 bg-stone-900 text-white border-t border-stone-800 flex items-center justify-between group-hover:border-amber-600/50 transition-colors">
                    <div>
                      <span className="text-stone-400 text-[10px] uppercase tracking-wider block font-semibold">
                        {project.location}
                      </span>
                      <h4 className="text-sm font-extrabold uppercase tracking-tight text-stone-200 group-hover:text-amber-400 transition-colors line-clamp-1">
                        {project.title}
                      </h4>
                    </div>

                    <span className="text-amber-500 font-extrabold text-base transform group-hover:translate-x-1 transition-transform">
                      →
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
