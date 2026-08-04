"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

interface GalleryImage {
  src: string;
  alt: string;
  workType: string;
  fileName: string;
}

export default function ProjectSlugClient({ project }: { project: any }) {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeMobileCard, setActiveMobileCard] = useState<string | null>(null);

  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseTimeout = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const handleCardInteraction = (
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
    }, 1500);
  };

  useEffect(() => {
    async function fetchProjectImages() {
      try {
        setIsLoading(true);
        const folderSearchName = project.title.toUpperCase().trim();
        const bucketName = "project-images";

        // 1. Fetch root items to find exact matching folder name (Handles Central Vista, Dharav, etc.)
        const { data: rootItems } = await supabase.storage
          .from(bucketName)
          .list("", { limit: 100 });

        let targetFolder = folderSearchName;

        if (rootItems && rootItems.length > 0) {
          const matchedFolder = rootItems.find((item) => {
            const nameUpper = item.name.toUpperCase().trim();
            return (
              nameUpper === folderSearchName ||
              nameUpper.includes(folderSearchName) ||
              folderSearchName.includes(nameUpper) ||
              (folderSearchName.includes("CENTRAL VISTA") &&
                nameUpper.includes("CENTRAL VISTA")) ||
              (folderSearchName.includes("DHARAV") &&
                nameUpper.includes("DHARAV")) ||
              (folderSearchName.includes("AIIMS") &&
                nameUpper.includes("AIIMS")) ||
              (folderSearchName.includes("NACIN") &&
                nameUpper.includes("NACIN"))
            );
          });

          if (matchedFolder) {
            targetFolder = matchedFolder.name;
          }
        }

        // 2. Fetch files inside the matched target folder
        const { data: files, error } = await supabase.storage
          .from(bucketName)
          .list(targetFolder, { limit: 100 });

        if (error || !files || files.length === 0) {
          setImages([]);
          return;
        }

        const validFiles = files.filter(
          (f) =>
            f.name !== ".emptyFolderPlaceholder" && !f.name.startsWith("."),
        );

        if (validFiles.length === 0) {
          setImages([]);
          return;
        }

        const pathList = validFiles.map((f) => `${targetFolder}/${f.name}`);

        // 3. Generate Signed URLs for all valid images
        const { data: signedData } = await supabase.storage
          .from(bucketName)
          .createSignedUrls(pathList, 3600);

        const signedMap: Record<string, string> = {};
        if (signedData) {
          signedData.forEach((item) => {
            if (item.path && item.signedUrl) {
              signedMap[item.path] = item.signedUrl;
            }
          });
        }

        const mappedImages: GalleryImage[] = validFiles.map((file) => {
          const fullPath = `${targetFolder}/${file.name}`;
          const cleanWorkType = file.name
            .replace(/\.[^/.]+$/, "")
            .replace(/^\d+[-_]/, "")
            .replace(/[-_]/g, " ")
            .replace(/\b\w/g, (c: string) => c.toUpperCase())
            .trim();

          return {
            src:
              signedMap[fullPath] ||
              "https://a-bconstruction.in/wp-content/uploads/2025/01/1-1024x1024.png",
            alt: `${project.title} — ${cleanWorkType}`,
            workType: cleanWorkType || "Premium Surface Execution",
            fileName: file.name,
          };
        });

        setImages(mappedImages);
      } catch (err) {
        console.error("Slug image loading error:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProjectImages();
  }, [project]);

  const mapsQuery = encodeURIComponent(
    `${project.title} ${project.location || "New Delhi India"}`,
  );

  return (
    <div className="bg-stone-50 text-stone-900 font-sans min-h-screen">
      {/* Header Banner */}
      <section className="relative bg-stone-900 text-white pt-28 sm:pt-32 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12">
          <Link
            href="/gallery"
            className="inline-flex items-center text-xs font-extrabold uppercase tracking-widest text-amber-500 hover:underline mb-6"
          >
            ← Back to Gallery Overview
          </Link>

          <span className="text-amber-500 text-xs tracking-widest font-extrabold uppercase block mb-2">
            {project.category || "Commercial Domain"}
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-white uppercase tracking-tight leading-tight">
            {project.title}
          </h1>
        </div>
      </section>

      {/* Key Project Details Bar */}
      <section className="bg-stone-950 text-white border-b border-stone-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-6 text-xs uppercase font-extrabold">
          <div>
            <span className="text-stone-500 block text-[10px] mb-1">
              Location
            </span>
            <span className="text-stone-200">
              📍 {project.location || "Delhi NCR, India"}
            </span>
          </div>
          <div>
            <span className="text-stone-500 block text-[10px] mb-1">
              Completion Year
            </span>
            <span className="text-stone-200">
              {project.year || "Delivered Record"}
            </span>
          </div>
          <div>
            <span className="text-stone-500 block text-[10px] mb-1">
              Sector Domain
            </span>
            <span className="text-amber-500">
              {project.category || "General Architectural"}
            </span>
          </div>
          <div>
            <span className="text-stone-500 block text-[10px] mb-1">
              Surface Scope
            </span>
            <span className="text-stone-200">Marble Laying & Polishing</span>
          </div>
        </div>
      </section>

      {/* Image Gallery Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 py-16">
        <h2 className="text-xl sm:text-2xl font-extrabold uppercase text-stone-900 tracking-tight mb-8">
          Execution Image Lookbook
        </h2>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div
                key={i}
                className="aspect-square bg-stone-200 animate-pulse rounded-sm"
              />
            ))}
          </div>
        ) : images.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {images.map((img, idx) => {
              const cardId = `img-${idx}`;
              const isActive = activeMobileCard === cardId;

              return (
                <div
                  key={idx}
                  onClick={(e) => handleCardInteraction(cardId, e)}
                  className="relative aspect-square overflow-hidden bg-stone-900 border border-stone-200 rounded-sm shadow-sm group cursor-pointer select-none"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    loading="lazy"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className={`object-cover transition-all duration-500 ${
                      isActive
                        ? "brightness-50 scale-105"
                        : "brightness-95 group-hover:brightness-50 group-hover:scale-105"
                    }`}
                    unoptimized
                  />

                  {/* Hover / Touch Info Overlay */}
                  <div
                    className={`absolute inset-0 bg-stone-950/80 backdrop-blur-[2px] flex flex-col items-center justify-center p-6 text-center transition-all duration-300 z-20 ${
                      isActive
                        ? "opacity-100 visible"
                        : "opacity-0 invisible group-hover:opacity-100 group-hover:visible"
                    }`}
                  >
                    <span className="text-amber-500 text-[9px] tracking-[0.3em] font-black uppercase mb-2">
                      Execution Detail
                    </span>
                    <p className="text-white text-xs sm:text-sm font-semibold uppercase tracking-wider max-w-[85%] leading-relaxed">
                      {img.workType}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="py-12 text-center text-xs font-bold uppercase text-stone-400">
            No image files registered in storage for this project folder.
          </div>
        )}
      </section>

      {/* Google Maps Location Section */}
      <section className="bg-stone-100 border-t border-stone-200 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-amber-600 text-xs font-black uppercase tracking-widest block mb-1">
                Geo Coordinates
              </span>
              <h2 className="text-2xl font-extrabold uppercase text-stone-900 tracking-tight">
                Project Location Navigation
              </h2>
            </div>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${mapsQuery}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-extrabold text-amber-600 uppercase tracking-widest hover:underline"
            >
              📍 Open in Native Google Maps →
            </a>
          </div>

          <div className="w-full h-80 sm:h-96 border border-stone-300 rounded-sm overflow-hidden shadow-sm bg-stone-200">
            <iframe
              title={`${project.title} Map Location`}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              src={`https://maps.google.com/maps?q=${mapsQuery}&t=&z=13&ie=UTF8&iwloc=&output=embed`}
            />
          </div>
        </div>
      </section>
    </div>
  );
}
