// "use client";

// import React, { useState, useEffect, useTransition } from "react";
// import Image from "next/image";
// import Link from "next/link";
// import { supabase } from "@/lib/supabase";

// interface GalleryProject {
//   id: string;
//   title: string;
//   category: string;
//   description: string;
//   year: number | null;
//   images: {
//     src: string;
//     alt: string;
//     workType: string;
//     fileName: string;
//   }[];
// }

// export default function GalleryPage() {
//   const [galleryProjects, setGalleryProjects] = useState<GalleryProject[]>([]);
//   const [visibleCount, setVisibleCount] = useState(1);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isPending, startTransition] = useTransition();

//   // Sorting chronological state management
//   const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

//   // Mobile touch focus handler state
//   const [activeMobileCard, setActiveMobileCard] = useState<string | null>(null);

//   useEffect(() => {
//     async function fetchDatabaseAndStorage() {
//       try {
//         setIsLoading(true);
//         const bucketName = "project-images";

//         const { data: dbProjects, error: dbError } = await supabase
//           .from("projects")
//           .select("*")
//           .order("created_at", { ascending: false });

//         if (dbError) throw dbError;

//         if (dbProjects) {
//           const mappedProjects = await Promise.all(
//             dbProjects.map(async (project: any) => {
//               let folderSearchName = project.title.toUpperCase().trim();

//               // Clean explicit fallbacks matching exact Supabase Storage directory cases
//               if (folderSearchName.includes("AIIMS")) {
//                 folderSearchName = "AIIMS";
//               } else if (folderSearchName.includes("NACIN")) {
//                 folderSearchName = "NACIN ACADEMY";
//               } else if (folderSearchName.includes("CMD")) {
//                 folderSearchName = "ACIL CMD SIR HOUSE";
//               } else if (folderSearchName.includes("CAMELLIAS")) {
//                 folderSearchName = "DLF CAMELLIAS GURUGRAM";
//               } else if (folderSearchName.includes("DHARAV")) {
//                 folderSearchName = "DHARAV HIGH SCHOOL";
//               } else if (folderSearchName.includes("CENTRAL VISTA")) {
//                 folderSearchName = "Central Vista Project";
//               }

//               const { data: files, error: storageError } =
//                 await supabase.storage
//                   .from(bucketName)
//                   .list(folderSearchName, { limit: 30 });

//               if (storageError || !files || files.length === 0) {
//                 console.warn(
//                   `No storage assets discovered inside bucket path: ${folderSearchName}`,
//                 );
//                 return null;
//               }

//               const validFiles = files.filter(
//                 (file) => file.name !== ".emptyFolderPlaceholder",
//               );

//               const images = validFiles
//                 .map((file) => {
//                   const {
//                     data: { publicUrl },
//                   } = supabase.storage
//                     .from(bucketName)
//                     .getPublicUrl(`${folderSearchName}/${file.name}`);

//                   const cleanWorkType = file.name
//                     .replace(/\.[^/.]+$/, "")
//                     .replace(/^\d+[-_]/, "")
//                     .replace(/[-_]/g, " ")
//                     .replace(/\b\w/g, (c) => c.toUpperCase())
//                     .trim();

//                   return {
//                     src: publicUrl,
//                     alt: `${project.title} — ${cleanWorkType}`,
//                     workType: cleanWorkType || "Premium Surface Execution",
//                     fileName: file.name,
//                   };
//                 })
//                 .sort((a, b) => a.fileName.localeCompare(b.fileName));

//               return {
//                 id: project.id,
//                 title: project.title,
//                 category: project.category || "General Infrastructure",
//                 description: project.description || "",
//                 year: project.year ? Number(project.year) : null,
//                 images: images,
//               };
//             }),
//           );

//           setGalleryProjects(
//             mappedProjects.filter((p) => p !== null) as GalleryProject[],
//           );
//         }
//       } catch (err) {
//         console.error("Critical database to storage map exception:", err);
//       } finally {
//         setIsLoading(false);
//       }
//     }

//     fetchDatabaseAndStorage();
//   }, []);

//   // Sync state configuration to revalidate screen segments on manual re-order
//   useEffect(() => {
//     setActiveMobileCard(null);
//     startTransition(() => {
//       setVisibleCount(1);
//     });
//   }, [sortOrder]);

//   const sortedProjects = [...galleryProjects].sort((a, b) => {
//     const yearA = a.year || 0;
//     const yearB = b.year || 0;
//     return sortOrder === "newest" ? yearB - yearA : yearA - yearB;
//   });

//   const handleLoadMore = () => {
//     startTransition(async () => {
//       await new Promise((resolve) => setTimeout(resolve, 800));
//       setVisibleCount((prev) => prev + 1);
//     });
//   };

//   useEffect(() => {
//     const handleOutsideClick = () => setActiveMobileCard(null);
//     window.addEventListener("click", handleOutsideClick);
//     return () => window.removeEventListener("click", handleOutsideClick);
//   }, []);

//   return (
//     <>
//       {/* Editorial Corporate Header */}
//       <section className="relative min-h-[50vh] flex items-center bg-dark-blue text-white pt-32 pb-20">
//         <div className="absolute inset-0 bg-gradient-to-r from-darker-blue via-dark-blue/80 to-transparent z-10" />
//         <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-12 w-full">
//           <span className="text-brand-blue text-[11px] tracking-[0.35em] font-black uppercase block mb-3">
//             Media Lookbook Portfolio
//           </span>
//           <h1 className="text-4xl sm:text-6xl font-light tracking-tight text-white uppercase leading-none">
//             Exquisite Surface <br />
//             <span className="font-extrabold text-transparent webkit-text-stroke
//              -webkit-text-stroke-width: 5px -webkit-text-stroke-color: white">
//               Installations.
//             </span>
//           </h1>
//         </div>
//       </section>

//       {/* Main Container */}
//       <div className="bg-ice py-12">
//         {/* Dynamic Chronological Controller */}
//         {!isLoading && galleryProjects.length > 0 && (
//           <div className="max-w-7xl mx-auto px-6 sm:px-12 mb-6 flex justify-end">
//             <div className="flex items-center gap-2 bg-white border border-slate-200 shadow-sm px-4 py-2">
//               <span className="text-[10px] uppercase font-black tracking-wider text-slate-400">
//                 Sort By Chronology:
//               </span>
//               <select
//                 value={sortOrder}
//                 onChange={(e) =>
//                   setSortOrder(e.target.value as "newest" | "oldest")
//                 }
//                 className="text-xs font-bold uppercase tracking-wide text-dark-blue bg-transparent outline-none cursor-pointer focus:text-brand-blue transition-colors"
//               >
//                 <option value="newest">Newest First</option>
//                 <option value="oldest">Oldest Heritage First</option>
//               </select>
//             </div>
//           </div>
//         )}

//         {isLoading ? (
//           <div className="max-w-7xl mx-auto px-6 sm:px-12 py-32 text-center text-slate-500 font-semibold tracking-wider uppercase text-xs animate-pulse">
//             Querying dynamic project tables and mapping assets...
//           </div>
//         ) : (
//           sortedProjects.slice(0, visibleCount).map((project, pIdx) => (
//             <section
//               key={project.id}
//               className="py-12 max-w-7xl mx-auto px-6 sm:px-12 animate-fade-in"
//             >
//               <div className="flex items-center gap-4 mb-8">
//                 <span className="w-8 h-0.5 bg-brand-blue" />
//                 <h2 className="text-xl font-bold uppercase tracking-wider text-dark-blue flex flex-wrap items-center gap-x-2 gap-y-1">
//                   {project.title}
//                   <span className="text-xs font-normal text-slate-400 normal-case">
//                     ({project.category})
//                   </span>
//                 </h2>
//               </div>

//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {project.images.map((img, iIdx) => {
//                   const isFirstImage = iIdx === 0;
//                   const cardUniqueKey = `${pIdx}-${iIdx}`;
//                   const isCurrentlyActive = activeMobileCard === cardUniqueKey;

//                   return (
//                     <div
//                       key={iIdx}
//                       onClick={(e) => {
//                         e.stopPropagation();
//                         setActiveMobileCard(
//                           isCurrentlyActive ? null : cardUniqueKey,
//                         );
//                       }}
//                       className="relative aspect-square overflow-hidden bg-white border border-slate-200/60 shadow-sm group cursor-pointer"
//                     >
//                       <Image
//                         src={img.src}
//                         alt={img.alt}
//                         fill
//                         sizes="(max-w-7xl) 33vw, 100vw"
//                         className={`object-contain scale-100 group-hover:scale-105 transition-all duration-700 filter ${
//                           isCurrentlyActive
//                             ? "brightness-50 scale-105"
//                             : "brightness-95 group-hover:brightness-50"
//                         }`}
//                         unoptimized
//                       />

//                       <div
//                         className={`absolute inset-0 bg-dark-blue/75 backdrop-blur-[1.5px] flex flex-col items-center justify-center p-6 text-center z-20 transition-all duration-500 ${
//                           isCurrentlyActive
//                             ? "opacity-100 visible"
//                             : "opacity-0 invisible group-hover:opacity-100 group-hover:visible"
//                         }`}
//                       >
//                         {isFirstImage ? (
//                           // 🏛️ FIRST IMAGE SPECIFIC LOOKUP: Project Name followed by Image Name string format
//                           <>
//                             <p className="text-white text-base sm:text-xl font-bold uppercase tracking-wide max-w-[90%] leading-tight transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
//                               {project.title}
//                             </p>
//                             <span className="text-brand-blue text-[10px] sm:text-xs font-semibold uppercase tracking-[0.15em] mt-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 delay-100">
//                               {img.workType}
//                             </span>
//                           </>
//                         ) : (
//                           // 🛠️ STANDARD ARTIFACT DISPLAY DETAILS LAYER
//                           <>
//                             <span className="text-brand-blue text-[9px] tracking-[0.3em] font-black uppercase mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
//                               Execution Details
//                             </span>
//                             <p className="text-white text-xs sm:text-sm font-semibold uppercase tracking-wider max-w-[85%] leading-relaxed transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
//                               {img.workType}
//                             </p>
//                             <div className="w-6 h-[1px] bg-white/40 mt-3 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-150" />
//                           </>
//                         )}
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </section>
//           ))
//         )}

//         {/* Dynamic Loader */}
//         {isPending && (
//           <div className="max-w-7xl mx-auto px-6 sm:px-12 py-12 space-y-6">
//             <div className="flex items-center gap-4 animate-pulse">
//               <div className="w-8 h-0.5 bg-slate-300" />
//               <div className="h-4 bg-slate-300 w-48" />
//             </div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {[1, 2, 3].map((n) => (
//                 <div
//                   key={n}
//                   className="aspect-square bg-slate-200 animate-pulse border border-slate-300/40"
//                 />
//               ))}
//             </div>
//           </div>
//         )}

//         {/* Load More Trigger */}
//         {visibleCount < sortedProjects.length && !isPending && !isLoading && (
//           <div className="text-center py-16">
//             <button
//               onClick={handleLoadMore}
//               type="button"
//               className="px-10 py-4 bg-brand-blue text-white text-xs font-bold tracking-[0.2em] uppercase hover:bg-brand-hover transition-all shadow-md shadow-brand-blue/10"
//             >
//               Load More Projects
//             </button>
//           </div>
//         )}
//       </div>

//       {/* Corporate Final Row CTA */}
//       <section className="py-24 bg-white border-t border-slate-200">
//         <div className="max-w-4xl mx-auto px-6 sm:px-12 text-center space-y-6">
//           <h2 className="text-3xl font-extrabold text-dark-blue tracking-tight uppercase">
//             Ready to Transform Your Space?
//           </h2>
//           <p className="text-slate-600 text-sm font-medium max-w-lg mx-auto leading-relaxed">
//             Get in touch with our institutional engineering layout support desk
//             for strategic B2B material consultation.
//           </p>
//           <div className="pt-4">
//             <Link
//               href="/contact"
//               className="inline-block px-10 py-4 bg-dark-blue text-white text-xs tracking-[0.2em] font-bold uppercase hover:bg-black transition-all"
//             >
//               Contact Us Today
//             </Link>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// }
"use client";

import React, { useState, useEffect, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import ArchiveProjectsTable from "@/components/ArchiveProjectsTable";

interface GalleryProject {
  id: string;
  title: string;
  category: string;
  description: string;
  year: number | null;
  folderSearchName: string;
  images?: {
    src: string;
    alt: string;
    workType: string;
    fileName: string;
  }[];
}

// 🏛️ Future-Proof Text-Only Completed Projects Database
const completedTextProjects = [
  {
    title: "AIIMS Academic Block Phase II",
    location: "New Delhi",
    year: 2023,
    category: "Healthcare",
  },
  {
    title: "DLF Camellias Executive Suites",
    location: "Gurugram",
    year: 2022,
    category: "Residential",
  },
  {
    title: "NACIN Officer Academy Complex",
    location: "Faridabad",
    year: 2021,
    category: "Public",
  },
  {
    title: "Central Vista Corridor Matrix",
    location: "New Delhi",
    year: 2021,
    category: "Public",
  },
  {
    title: "Dharav High School Campus",
    location: "Jaipur",
    year: 2020,
    category: "Commercial",
  },
];

export default function GalleryPage() {
  const [projects, setProjects] = useState<GalleryProject[]>([]);
  const [openAccordions, setOpenAccordions] = useState<string[]>([]);
  const [projectImagesMap, setProjectImagesMap] = useState<
    Record<string, any[]>
  >({});
  const [loadingProjectIds, setLoadingProjectIds] = useState<
    Record<string, boolean>
  >({});
  const [isLoading, setIsLoading] = useState(true);
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");
  const [activeMobileCard, setActiveMobileCard] = useState<string | null>(null);

  // 1. Fetch Projects Metadata on Mount
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
            let folderSearchName = project.title.toUpperCase().trim();
            if (folderSearchName.includes("AIIMS")) folderSearchName = "AIIMS";
            else if (folderSearchName.includes("NACIN"))
              folderSearchName = "NACIN ACADEMY";
            else if (folderSearchName.includes("CMD"))
              folderSearchName = "ACIL CMD SIR HOUSE";
            else if (folderSearchName.includes("CAMELLIAS"))
              folderSearchName = "DLF CAMELLIAS GURUGRAM";
            else if (folderSearchName.includes("DHARAV"))
              folderSearchName = "DHARAV HIGH SCHOOL";
            else if (folderSearchName.includes("CENTRAL VISTA"))
              folderSearchName = "Central Vista Project";

            return {
              id: project.id,
              title: project.title,
              category: project.category || "General Infrastructure",
              description: project.description || "",
              year: project.year ? Number(project.year) : null,
              folderSearchName,
            };
          });

          setProjects(mapped);
          // Open first project accordion by default for instant visual engagement
          if (mapped.length > 0) {
            setOpenAccordions([mapped[0].id]);
            fetchImagesForProject(
              mapped[0].id,
              mapped[0].folderSearchName,
              mapped[0].title,
            );
          }
        }
      } catch (err) {
        console.error("Database fetch error:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchProjects();
  }, []);

  // 2. Dynamic Image Loader on Accordion Open
  const fetchImagesForProject = async (
    projectId: string,
    folderName: string,
    title: string,
  ) => {
    if (projectImagesMap[projectId] || loadingProjectIds[projectId]) return;

    try {
      setLoadingProjectIds((prev) => ({ ...prev, [projectId]: true }));
      const bucketName = "project-images";

      const { data: files, error } = await supabase.storage
        .from(bucketName)
        .list(folderName, { limit: 30 });

      if (error || !files || files.length === 0) {
        setProjectImagesMap((prev) => ({ ...prev, [projectId]: [] }));
        return;
      }

      const validFiles = files.filter(
        (f) => f.name !== ".emptyFolderPlaceholder",
      );
      const images = validFiles
        .map((file) => {
          const {
            data: { publicUrl },
          } = supabase.storage
            .from(bucketName)
            .getPublicUrl(`${folderName}/${file.name}`);

          const cleanWorkType = file.name
            .replace(/\.[^/.]+$/, "")
            .replace(/^\d+[-_]/, "")
            .replace(/[-_]/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase())
            .trim();

          return {
            src: publicUrl,
            alt: `${title} — ${cleanWorkType}`,
            workType: cleanWorkType || "Premium Surface Execution",
            fileName: file.name,
          };
        })
        .sort((a, b) => a.fileName.localeCompare(b.fileName));

      setProjectImagesMap((prev) => ({ ...prev, [projectId]: images }));
    } catch (err) {
      console.error(`Failed to load storage assets for ${folderName}:`, err);
    } finally {
      setLoadingProjectIds((prev) => ({ ...prev, [projectId]: false }));
    }
  };

  // Toggle Accordion State
  const toggleAccordion = (project: GalleryProject) => {
    const isCurrentlyOpen = openAccordions.includes(project.id);
    if (isCurrentlyOpen) {
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

  // Expand / Collapse All
  const handleToggleAll = () => {
    if (openAccordions.length === projects.length) {
      setOpenAccordions([]);
    } else {
      const allIds = projects.map((p) => p.id);
      setOpenAccordions(allIds);
      projects.forEach((p) =>
        fetchImagesForProject(p.id, p.folderSearchName, p.title),
      );
    }
  };

  const sortedProjects = [...projects].sort((a, b) => {
    const yearA = a.year || 0;
    const yearB = b.year || 0;
    return sortOrder === "newest" ? yearB - yearA : yearA - yearB;
  });

  return (
    <>
      {/* Editorial Corporate Header */}
      <section className="relative min-h-[45vh] flex items-center bg-slate-950 text-white pt-32 pb-16">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-slate-950/80 to-transparent z-10" />
        <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-12 w-full">
          <span className="text-brand-blue text-[11px] tracking-[0.35em] font-black uppercase block mb-3">
            Media Lookbook Portfolio
          </span>
          <h1 className="text-4xl sm:text-6xl font-light tracking-tight text-white uppercase leading-none">
            Exquisite Surface <br />
            <span className="font-extrabold text-transparent webkit-text-stroke">
              Installations.
            </span>
          </h1>
        </div>
      </section>

      {/* Main Container */}
      <div className="bg-slate-50 py-12 font-sans min-h-screen">
        {/* Dynamic Controls Bar */}
        {!isLoading && projects.length > 0 && (
          <div className="max-w-7xl mx-auto px-6 sm:px-12 mb-8 flex flex-wrap items-center justify-between gap-4">
            <button
              onClick={handleToggleAll}
              className="text-xs font-bold uppercase tracking-widest px-5 py-2.5 bg-white border border-slate-300 text-slate-800 hover:border-brand-blue hover:text-brand-blue transition-all shadow-sm"
            >
              {openAccordions.length === projects.length
                ? "Collapse All Folders"
                : "Expand All Folders"}
            </button>

            <div className="flex items-center gap-2 bg-white border border-slate-300 shadow-sm px-4 py-2">
              <span className="text-[10px] uppercase font-black tracking-wider text-slate-400">
                Sort Chronology:
              </span>
              <select
                value={sortOrder}
                onChange={(e) =>
                  setSortOrder(e.target.value as "newest" | "oldest")
                }
                className="text-xs font-bold uppercase text-slate-900 bg-transparent outline-none cursor-pointer"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest Heritage First</option>
              </select>
            </div>
          </div>
        )}

        {/* 🧱 ACCORDION GALLERY SECTION */}
        <div className="max-w-7xl mx-auto px-6 sm:px-12 space-y-4">
          {isLoading ? (
            <div className="py-24 text-center text-slate-500 font-semibold tracking-wider uppercase text-xs animate-pulse">
              Querying Dynamic Project Tables...
            </div>
          ) : (
            sortedProjects.map((project) => {
              const isOpen = openAccordions.includes(project.id);
              const images = projectImagesMap[project.id] || [];
              const isImagesLoading = loadingProjectIds[project.id];

              return (
                <div
                  key={project.id}
                  className="border border-slate-200 bg-white shadow-sm transition-all duration-300 overflow-hidden"
                >
                  {/* ACCORDION HEADER BUTTON */}
                  <button
                    onClick={() => toggleAccordion(project)}
                    className={`w-full px-6 py-5 flex items-center justify-between text-left transition-colors ${
                      isOpen
                        ? "bg-slate-900 text-white"
                        : "bg-white text-slate-900 hover:bg-slate-50"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span
                        className={`w-3 h-3 rounded-full transition-colors ${isOpen ? "bg-brand-blue" : "bg-slate-300"}`}
                      />
                      <div>
                        <h2 className="text-lg sm:text-xl font-extrabold uppercase tracking-wide flex items-center gap-3">
                          {project.title}
                          {project.year && (
                            <span
                              className={`text-xs font-medium ${isOpen ? "text-slate-400" : "text-slate-500"}`}
                            >
                              ({project.year})
                            </span>
                          )}
                        </h2>
                        <span
                          className={`text-[10px] uppercase font-bold tracking-widest block mt-0.5 ${isOpen ? "text-blue-400" : "text-brand-blue"}`}
                        >
                          {project.category}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`text-[10px] uppercase font-bold tracking-widest hidden sm:inline-block ${isOpen ? "text-slate-400" : "text-slate-500"}`}
                      >
                        {isOpen ? "Close Portfolio" : "View Portfolio"}
                      </span>
                      <span
                        className={`text-xl font-bold transform transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                      >
                        ↓
                      </span>
                    </div>
                  </button>

                  {/* ACCORDION EXPANDABLE BODY */}
                  {isOpen && (
                    <div className="p-6 sm:p-8 bg-slate-50 border-t border-slate-200 transition-all">
                      {isImagesLoading ? (
                        <div className="py-12 text-center text-xs uppercase font-bold text-slate-400 animate-pulse">
                          Fetching High-Res Assets...
                        </div>
                      ) : images.length > 0 ? (
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                          {images.map((img, iIdx) => {
                            const cardUniqueKey = `${project.id}-${iIdx}`;
                            const isActive = activeMobileCard === cardUniqueKey;

                            return (
                              <div
                                key={iIdx}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setActiveMobileCard(
                                    isActive ? null : cardUniqueKey,
                                  );
                                }}
                                className="relative aspect-square overflow-hidden bg-white border border-slate-200/80 shadow-sm group cursor-pointer"
                              >
                                <Image
                                  src={img.src}
                                  alt={img.alt}
                                  fill
                                  sizes="(max-width: 1200px) 33vw, 100vw"
                                  className={`object-contain transition-all duration-500 filter ${
                                    isActive
                                      ? "brightness-50 scale-105"
                                      : "brightness-95 group-hover:brightness-50 group-hover:scale-105"
                                  }`}
                                  unoptimized
                                />

                                <div
                                  className={`absolute inset-0 bg-slate-950/80 backdrop-blur-[2px] flex flex-col items-center justify-center p-6 text-center z-20 transition-all duration-300 ${
                                    isActive
                                      ? "opacity-100 visible"
                                      : "opacity-0 invisible group-hover:opacity-100 group-hover:visible"
                                  }`}
                                >
                                  <span className="text-brand-blue text-[9px] tracking-[0.3em] font-black uppercase mb-2">
                                    Execution Details
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
                        <div className="py-8 text-center text-xs uppercase font-bold text-slate-400">
                          No archived images registered for this folder.
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
            })
          )}
        </div>
        <ArchiveProjectsTable />
      </div>

      {/* Corporate Final Row CTA */}
      <section className="py-24 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-6 sm:px-12 text-center space-y-6">
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight uppercase">
            Ready to Transform Your Space?
          </h2>
          <p className="text-slate-600 text-sm font-medium max-w-lg mx-auto leading-relaxed">
            Get in touch with our institutional engineering layout support desk
            for strategic B2B material consultation.
          </p>
          <div className="pt-4">
            <Link
              href="/contact"
              className="inline-block px-10 py-4 bg-slate-950 text-white text-xs tracking-[0.2em] font-bold uppercase hover:bg-brand-blue transition-all"
            >
              Contact Us Today
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
