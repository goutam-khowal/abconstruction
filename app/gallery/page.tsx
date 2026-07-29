"use client";

import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

interface GalleryProject {
  id: string;
  title: string;
  category: string;
  year: number | null;
  folderSearchName: string;
}

interface GalleryImage {
  src: string;
  alt: string;
  workType: string;
  fileName: string;
}

function ImageSkeletonGrid() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {[1, 2, 3, 4, 5, 6].map((idx) => (
        <div
          key={idx}
          className="relative aspect-square overflow-hidden bg-stone-200 animate-pulse rounded-sm border border-stone-300/60"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-stone-200 via-stone-100 to-stone-200" />
        </div>
      ))}
    </div>
  );
}

export default function GalleryPage() {
  const [projects, setProjects] = useState<GalleryProject[]>([]);
  const [openAccordions, setOpenAccordions] = useState<string[]>([]);
  const [projectImagesMap, setProjectImagesMap] = useState<
    Record<string, GalleryImage[]>
  >({});
  const [loadingProjectIds, setLoadingProjectIds] = useState<
    Record<string, boolean>
  >({});
  const [isLoading, setIsLoading] = useState(true);

  const [activeMobileCard, setActiveMobileCard] = useState<string | null>(null);

  // Holds the pending 1.5s auto-close timer so we can clear/reset it safely
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearCloseTimeout = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const closeActiveCard = () => {
    clearCloseTimeout();
    setActiveMobileCard(null);
  };

  // Close on any click/tap OUTSIDE the currently active card
  useEffect(() => {
    const handleOutsideClick = () => closeActiveCard();
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, []);

  // Safety cleanup on unmount
  useEffect(() => {
    return () => clearCloseTimeout();
  }, []);

  // Unified handler for both touch tap AND mouse click on a card.
  // stopPropagation() prevents this same click from also triggering the
  // window-level "outside click" listener above, which was previously
  // closing the overlay in the same instant it opened.
  const handleCardInteraction = (
    cardId: string,
    e: React.MouseEvent | React.TouchEvent,
  ) => {
    e.stopPropagation();
    clearCloseTimeout();

    if (activeMobileCard === cardId) {
      // tapping the same card again closes it immediately
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
    async function fetchProjects() {
      try {
        setIsLoading(true);
        const { data: dbProjects, error } = await supabase
          .from("projects")
          .select("*")
          .order("created_at", { ascending: false });

        if (error) throw error;

        if (dbProjects) {
          const mapped = dbProjects.map((project: any) => {
            return {
              id: project.id,
              title: project.title,
              category: project.category || "General Infrastructure",
              year: project.year ? Number(project.year) : null,
              folderSearchName: project.title.toUpperCase().trim(),
            };
          });

          setProjects(mapped);
          if (mapped.length > 0) {
            // Open all accordions by default
            setOpenAccordions(mapped.map((project) => project.id));

            // Load images for all projects
            mapped.forEach((project) => {
              fetchImagesForProject(
                project.id,
                project.folderSearchName,
                project.title,
              );
            });
          }
        }
      } catch (err) {
        console.error("Gallery fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProjects();
  }, []);

  const fetchImagesForProject = async (
    projectId: string,
    folderName: string,
    title: string,
  ) => {
    if (projectImagesMap[projectId] || loadingProjectIds[projectId]) return;

    try {
      setLoadingProjectIds((prev) => ({ ...prev, [projectId]: true }));
      const bucketName = "project-images";

      const { data: rootItems } = await supabase.storage
        .from(bucketName)
        .list("", { limit: 100 });

      let targetFolder = folderName;

      if (rootItems && rootItems.length > 0) {
        const matchedFolder = rootItems.find((item) => {
          const nameUpper = item.name.toUpperCase().trim();
          const searchUpper = folderName.toUpperCase().trim();

          return (
            nameUpper === searchUpper ||
            nameUpper.includes(searchUpper) ||
            searchUpper.includes(nameUpper) ||
            (searchUpper.includes("CENTRAL VISTA") &&
              nameUpper.includes("CENTRAL VISTA")) ||
            (searchUpper.includes("DHARAV") && nameUpper.includes("DHARAV")) ||
            (searchUpper.includes("AIIMS") && nameUpper.includes("AIIMS")) ||
            (searchUpper.includes("NACIN") && nameUpper.includes("NACIN")) ||
            (searchUpper.includes("CMD") && nameUpper.includes("CMD")) ||
            (searchUpper.includes("CAMELLIAS") &&
              nameUpper.includes("CAMELLIAS"))
          );
        });

        if (matchedFolder) {
          targetFolder = matchedFolder.name;
        }
      }

      const { data: files, error: listError } = await supabase.storage
        .from(bucketName)
        .list(targetFolder, { limit: 50 });

      if (listError || !files || files.length === 0) {
        setProjectImagesMap((prev) => ({ ...prev, [projectId]: [] }));
        return;
      }

      const validFiles = files.filter(
        (f) => f.name !== ".emptyFolderPlaceholder" && !f.name.startsWith("."),
      );

      if (validFiles.length === 0) {
        setProjectImagesMap((prev) => ({ ...prev, [projectId]: [] }));
        return;
      }

      const pathList = validFiles.map((f) => `${targetFolder}/${f.name}`);

      // Direct Client Signed URLs Generation
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

      const images: GalleryImage[] = validFiles
        .map((file) => {
          const fullPath = `${targetFolder}/${file.name}`;

          const cleanWorkType = file.name
            .replace(/\.[^/.]+$/, "")
            .replace(/^\d+[-_]/, "")
            .replace(/[-_]/g, " ")
            .replace(/\b\w/g, (c: string) => c.toUpperCase())
            .trim();

          const finalWorkType = cleanWorkType || "Premium Surface Execution";

          return {
            src: signedMap[fullPath] || "",
            alt: `${title} — ${finalWorkType}`,
            workType: finalWorkType,
            fileName: file.name,
          };
        })
        .sort((a, b) => a.fileName.localeCompare(b.fileName));

      setProjectImagesMap((prev) => ({ ...prev, [projectId]: images }));
    } catch (err) {
      console.error(`Error loading storage assets for ${folderName}:`, err);
      setProjectImagesMap((prev) => ({ ...prev, [projectId]: [] }));
    } finally {
      setLoadingProjectIds((prev) => ({ ...prev, [projectId]: false }));
    }
  };

  const toggleAccordion = (project: GalleryProject) => {
    const isOpen = openAccordions.includes(project.id);
    if (isOpen) {
      setOpenAccordions((prev) => prev.filter((id) => id !== project.id));
    } else {
      setOpenAccordions((prev) => [...prev, project.id]);
      fetchImagesForProject(
        project.id,
        project.folderSearchName,
        project.title,
      );
    }
  };

  return (
    <div className="bg-stone-50 text-stone-900 font-sans min-h-screen">
      <section className="relative min-h-[40vh] sm:min-h-[45vh] flex items-center bg-stone-900 text-white pt-28 sm:pt-32 pb-12 sm:pb-16">
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-900/80 to-transparent z-10" />
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-8 md:px-12 w-full">
          <span className="text-amber-500 text-xs tracking-widest uppercase font-extrabold block mb-2">
            Media Lookbook Portfolio
          </span>
          <h1 className="text-3xl sm:text-5xl font-light tracking-tight text-white uppercase leading-tight">
            Exquisite Surface <br />
            <span className="font-extrabold text-amber-500">
              Installations.
            </span>
          </h1>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 py-12 space-y-4">
        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3].map((num) => (
              <div
                key={num}
                className="border border-stone-200 bg-white rounded-sm overflow-hidden p-6 animate-pulse"
              >
                <div className="h-6 w-64 bg-stone-200 rounded mb-4" />
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[1, 2, 3].map((i) => (
                    <div
                      key={i}
                      className="aspect-square bg-stone-200 rounded-sm"
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        ) : (
          projects.map((project, pIdx) => {
            const isOpen = openAccordions.includes(project.id);
            const images = projectImagesMap[project.id] || [];
            const isImagesLoading = loadingProjectIds[project.id];

            return (
              <div
                key={project.id}
                className="border border-stone-200 bg-white shadow-sm rounded-sm overflow-hidden"
              >
                <button
                  onClick={() => toggleAccordion(project)}
                  className={`w-full px-4 sm:px-6 py-4 flex items-center justify-between text-left transition-colors min-h-[56px] ${
                    isOpen
                      ? "bg-stone-900 text-white"
                      : "bg-white text-stone-900 hover:bg-stone-100"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-3 h-3 rounded-full ${
                        isOpen ? "bg-amber-500" : "bg-stone-300"
                      }`}
                    />
                    <div>
                      <h2 className="text-base sm:text-lg font-extrabold uppercase tracking-wide">
                        {project.title}{" "}
                        {project.year && (
                          <span className="text-xs font-normal text-stone-400">
                            ({project.year})
                          </span>
                        )}
                      </h2>
                      <span
                        className={`text-xs uppercase font-bold tracking-wider block ${
                          isOpen ? "text-amber-400" : "text-amber-600"
                        }`}
                      >
                        {project.category}
                      </span>
                    </div>
                  </div>
                  <span className="text-lg font-bold">
                    {isOpen ? "↑" : "↓"}
                  </span>
                </button>

                {isOpen && (
                  <div className="p-4 sm:p-6 bg-stone-100 border-t border-stone-200">
                    {isImagesLoading ? (
                      <ImageSkeletonGrid />
                    ) : images.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {images.map((img, iIdx) => {
                          const isFirstImage = iIdx === 0;
                          const cardId = `${pIdx}-${iIdx}`;
                          const isActive = activeMobileCard === cardId;

                          return (
                            <div
                              key={iIdx}
                              onClick={(e) => handleCardInteraction(cardId, e)}
                              className="relative aspect-square overflow-hidden bg-stone-900 border border-stone-200 rounded-sm shadow-sm group cursor-pointer select-none"
                            >
                              <Image
                                src={img.src}
                                alt={img.alt}
                                fill
                                loading="lazy"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                className={`object-contain transition-all duration-500 ${
                                  isActive
                                    ? "brightness-50 scale-105"
                                    : "brightness-95 group-hover:brightness-50 group-hover:scale-105"
                                }`}
                                unoptimized
                              />

                              <div
                                className={`absolute inset-0 bg-stone-950/80 backdrop-blur-[2px] flex flex-col items-center justify-center p-6 text-center transition-all duration-300 z-20 ${
                                  isActive
                                    ? "opacity-100 visible"
                                    : "opacity-0 invisible group-hover:opacity-100 group-hover:visible"
                                }`}
                              >
                                {isFirstImage ? (
                                  <>
                                    <p className="text-white text-sm sm:text-base font-bold uppercase tracking-wide max-w-[90%] leading-tight transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                                      {project.title}
                                    </p>
                                    <span className="text-amber-500 text-[10px] sm:text-xs font-semibold uppercase tracking-[0.15em] mt-2 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                                      {img.workType}
                                    </span>
                                  </>
                                ) : (
                                  <>
                                    <span className="text-amber-500 text-[9px] tracking-[0.3em] font-black uppercase mb-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                                      Execution Details
                                    </span>
                                    <p className="text-white text-xs sm:text-sm font-semibold uppercase tracking-wider max-w-[85%] leading-relaxed transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300 delay-75">
                                      {img.workType}
                                    </p>
                                    <div className="w-6 h-[1px] bg-white/40 mt-3 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 delay-150" />
                                  </>
                                )}
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="py-6 text-center text-xs uppercase font-bold text-stone-400">
                        No archived images registered for this project folder.
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
