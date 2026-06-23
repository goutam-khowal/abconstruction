// "use client";

// import React, { useState, useTransition } from "react";
// import Image from "next/image";
// import Link from "next/link";

// const galleryProjects = [
//   {
//     title: "AIIMS New Delhi",
//     images: [
//       {
//         src: "https://a-bconstruction.in/wp-content/uploads/2025/02/20210108_173541_Original-scaled.jpeg",
//         alt: "AIIMS New Delhi — marble flooring installation 1",
//       },
//       {
//         src: "https://a-bconstruction.in/wp-content/uploads/2025/02/20210108_173753_Original-scaled.jpeg",
//         alt: "AIIMS New Delhi — marble flooring installation 2",
//       },
//       {
//         src: "https://a-bconstruction.in/wp-content/uploads/2025/02/20210108_173525_Original-scaled.jpeg",
//         alt: "AIIMS New Delhi — stone surface 3",
//       },
//       {
//         src: "https://a-bconstruction.in/wp-content/uploads/2025/02/20210108_174138_Original-scaled.jpeg",
//         alt: "AIIMS New Delhi — installation 4",
//       },
//       {
//         src: "https://a-bconstruction.in/wp-content/uploads/2025/02/20210108_173611_Original-scaled.jpeg",
//         alt: "AIIMS New Delhi — installation 5",
//       },
//       {
//         src: "https://a-bconstruction.in/wp-content/uploads/2025/02/20210108_174142_Original-scaled.jpeg",
//         alt: "AIIMS New Delhi — installation 6",
//       },
//     ],
//   },
//   {
//     title: "Central Vista Project New Delhi",
//     images: [
//       {
//         src: "https://a-bconstruction.in/wp-content/uploads/2025/02/IMG_0054-scaled.jpeg",
//         alt: "Central Vista New Delhi — stone work 1",
//       },
//       {
//         src: "https://a-bconstruction.in/wp-content/uploads/2025/02/IMG_0395-scaled.jpeg",
//         alt: "Central Vista New Delhi — stone work 2",
//       },
//       {
//         src: "https://a-bconstruction.in/wp-content/uploads/2025/02/IMG_0396-scaled.jpeg",
//         alt: "Central Vista New Delhi — installation 3",
//       },
//       {
//         src: "https://a-bconstruction.in/wp-content/uploads/2025/02/IMG_0028-scaled.jpeg",
//         alt: "Central Vista New Delhi — marble laying 4",
//       },
//       {
//         src: "https://a-bconstruction.in/wp-content/uploads/2025/02/IMG_0394-scaled.jpeg",
//         alt: "Central Vista New Delhi — flooring 5",
//       },
//       {
//         src: "https://a-bconstruction.in/wp-content/uploads/2025/02/IMG_0050-scaled.jpeg",
//         alt: "Central Vista New Delhi — installation 6",
//       },
//     ],
//   },
//   {
//     title: "Nacin Academy Palasamudra (A.P.)",
//     images: [
//       {
//         src: "https://a-bconstruction.in/wp-content/uploads/2025/02/IMG_3207-scaled.jpeg",
//         alt: "Nacin Academy Palasamudra — marble installation 1",
//       },
//       {
//         src: "https://a-bconstruction.in/wp-content/uploads/2025/02/IMG_2552-scaled.jpeg",
//         alt: "Nacin Academy Palasamudra — stone flooring 2",
//       },
//       {
//         src: "https://a-bconstruction.in/wp-content/uploads/2025/02/IMG_1519-scaled.jpeg",
//         alt: "Nacin Academy Palasamudra — surface installation 3",
//       },
//       {
//         src: "https://a-bconstruction.in/wp-content/uploads/2025/02/IMG_1523-scaled.jpeg",
//         alt: "Nacin Academy Palasamudra — installation 4",
//       },
//       {
//         src: "https://a-bconstruction.in/wp-content/uploads/2025/02/20210108_173641_Original-scaled-1.jpeg",
//         alt: "Nacin Academy Palasamudra — marble work 5",
//       },
//       {
//         src: "https://a-bconstruction.in/wp-content/uploads/2025/02/IMG_1979-scaled.jpeg",
//         alt: "Nacin Academy Palasamudra — installation 6",
//       },
//     ],
//   },
// ];

// export default function GalleryPage() {
//   const [visibleCount, setVisibleCount] = useState(1); // Staging chunks sequentially
//   const [isPending, startTransition] = useTransition();

//   const handleLoadMore = () => {
//     startTransition(async () => {
//       // Simulating realistic dynamic asset streaming delay for skeleton layout check
//       await new Promise((resolve) => setTimeout(resolve, 800));
//       setVisibleCount((prev) => prev + 1);
//     });
//   };

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
//             <span className="font-extrabold text-transparent webkit-text-stroke">
//               Installations.
//             </span>
//           </h1>
//         </div>
//       </section>

//       {/* Main Container */}
//       <div className="bg-ice py-12">
//         {galleryProjects.slice(0, visibleCount).map((project, pIdx) => (
//           <section
//             key={project.title}
//             className="py-12 max-w-7xl mx-auto px-6 sm:px-12 animate-fade-in"
//           >
//             <div className="flex items-center gap-4 mb-8">
//               <span className="w-8 h-0.5 bg-brand-blue" />
//               <h2 className="text-xl font-bold uppercase tracking-wider text-dark-blue">
//                 {project.title}
//               </h2>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//               {project.images.map((img, iIdx) => (
//                 <div
//                   key={iIdx}
//                   className="relative aspect-square overflow-hidden bg-white border border-slate-200/60 shadow-sm group"
//                 >
//                   <Image
//                     src={img.src}
//                     alt={img.alt}
//                     fill
//                     sizes="(max-w-7xl) 33vw, 100vw"
//                     className="object-cover group-hover:scale-102 transition-all duration-700 filter brightness-95 group-hover:brightness-100"
//                     unoptimized
//                   />
//                 </div>
//               ))}
//             </div>
//           </section>
//         ))}

//         {/* Dynamic Skeleton Loader Trigger Configuration */}
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

//         {/* Interactive Staging Controls */}
//         {visibleCount < galleryProjects.length && !isPending && (
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

// FINAL
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
//   images: {
//     src: string;
//     alt: string;
//     workType: string;
//   }[];
// }

// export default function GalleryPage() {
//   const [galleryProjects, setGalleryProjects] = useState<GalleryProject[]>([]);
//   const [visibleCount, setVisibleCount] = useState(1);
//   const [isLoading, setIsLoading] = useState(true);
//   const [isPending, startTransition] = useTransition();

//   useEffect(() => {
//     async function fetchDatabaseAndStorage() {
//       try {
//         setIsLoading(true);
//         const bucketName = "project-images";

//         // 1. Fetch live rows from Supabase database
//         const { data: dbProjects, error: dbError } = await supabase
//           .from("projects")
//           .select("*")
//           .order("created_at", { ascending: false });

//         if (dbError) throw dbError;

//         if (dbProjects) {
//           // 2. Map files dynamically for each corresponding project folder
//           const mappedProjects = await Promise.all(
//             dbProjects.map(async (project: any) => {
//               /* 💡 SMART FOLDER PATTERN:
//                 Agar title me 'AIIMS New Delhi' hai, toh hum folderSearchName ko check karenge.
//                 Bhai, safe zone ke liye hum uppercase matching kar rahe hain. Agar folder ka naam exact
//                 title se match karta hai (jaise DLF CAMELLIAS GURUGRAM), toh hum direct pure title ko
//                 uppercase me badal kar target karenge taaki split crash na ho.
//               */
//               let folderSearchName = project.title.toUpperCase().trim();

//               // Fallback fallback parsing logic for older configurations (like 'AIIMS' folder)
//               if (folderSearchName.includes("AIIMS"))
//                 folderSearchName = "AIIMS";
//               if (folderSearchName.includes("NACIN"))
//                 folderSearchName = "NACIN ACADEMY";

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

//               // Filter system hidden elements safely
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

//                   // 🚀 NEW HACK: Extension udao, aage ka sequence number (01-, 02-) bhi udao!
//                   const cleanWorkType = file.name
//                     .replace(/\.[^/.]+$/, "") // Extension clean (.jpg)
//                     .replace(/^\d+[-_]/, "") // Aage ka number udaya (e.g. '01-' -> '')
//                     .replace(/[-_]/g, " ") // Dashes ko space banaya
//                     .replace(/\b\w/g, (c) => c.toUpperCase())
//                     .trim();

//                   return {
//                     src: publicUrl,
//                     alt: `${project.title} — ${cleanWorkType}`,
//                     workType: cleanWorkType || "Premium Surface Execution",
//                     // Sorting ke liye original file name save rakh rahe hain
//                     fileName: file.name,
//                   };
//                 })
//                 // 🔢 Alphanumeric sort lagao taaki 01 pehle aaye aur 02 baad me!
//                 .sort((a, b) => a.fileName.localeCompare(b.fileName));

//               return {
//                 id: project.id,
//                 title: project.title,
//                 category: project.category || "General Infrastructure",
//                 description: project.description || "",
//                 images: images,
//               };
//             }),
//           );

//           // Render only those projects that actually contain operational media assets in storage
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

//   const handleLoadMore = () => {
//     startTransition(async () => {
//       await new Promise((resolve) => setTimeout(resolve, 800));
//       setVisibleCount((prev) => prev + 1);
//     });
//   };

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
//             <span className="font-black text-transparent block mt-2 text-3xl sm:text-5xl md:text-6xl tracking-wider uppercase [-webkit-text-stroke-width:1.5px] [-webkit-text-stroke-color:#ffffff]">
//               Installations.
//             </span>
//           </h1>
//         </div>
//       </section>

//       {/* Main Container */}
//       <div className="bg-ice py-12">
//         {isLoading ? (
//           <div className="max-w-7xl mx-auto px-6 sm:px-12 py-32 text-center text-slate-500 font-semibold tracking-wider uppercase text-xs animate-pulse">
//             Querying dynamic project tables and mapping assets...
//           </div>
//         ) : (
//           galleryProjects.slice(0, visibleCount).map((project) => (
//             <section
//               key={project.id}
//               className="py-12 max-w-7xl mx-auto px-6 sm:px-12 animate-fade-in"
//             >
//               <div className="flex items-center gap-4 mb-8">
//                 <span className="w-8 h-0.5 bg-brand-blue" />
//                 <h2 className="text-xl font-bold uppercase tracking-wider text-dark-blue">
//                   {project.title}{" "}
//                   <span className="text-xs font-normal text-slate-400 lowercase ml-2">
//                     ({project.category})
//                   </span>
//                 </h2>
//               </div>

//               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {project.images.map((img, iIdx) => {
//                   // Determine the unique hover title logic based on the image index matrix
//                   // 01- Prefix handling ensures sorting is correct even as assets update
//                   const isFirstImage = iIdx === 0;

//                   return (
//                     <div
//                       key={iIdx}
//                       className="relative aspect-square overflow-hidden bg-white border border-slate-200/60 shadow-sm group cursor-pointer"
//                     >
//                       {/* Strict Optimized Next.js Asset Rendering Layer */}
//                       <Image
//                         src={img.src}
//                         alt={img.alt}
//                         fill
//                         sizes="(max-w-7xl) 33vw, 100vw"
//                         className="object-contain group-hover:scale-105 transition-all duration-700 filter brightness-95 group-hover:brightness-50"
//                         unoptimized
//                       />

//                       {/* Dynamic Centered Hover Info Matrix Boundary (Pebble Structure Fixed) */}
//                       <div className="absolute inset-0 bg-dark-blue/75 backdrop-blur-[1.5px] opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center p-6 text-center z-20">
//                         {isFirstImage ? (
//                           // Layout 1 (Special Handling): Pure Project Name & Category alignment
//                           <>
//                             <p className="text-white text-base sm:text-xl font-bold uppercase tracking-wide max-w-[90%] leading-tight transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
//                               {project.title}
//                             </p>
//                             <span className="text-brand-blue text-[9px] tracking-[0.3em] font-medium uppercase mt-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-100">
//                               ({project.category || "PREMIUM LAYOUT"})
//                             </span>
//                           </>
//                         ) : (
//                           // Layout 2 (Standard Handling): Technical execution details with alignment matrix
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
//         {visibleCount < galleryProjects.length && !isPending && !isLoading && (
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
// ==========================================
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

//               if (folderSearchName.includes("AIIMS"))
//                 folderSearchName = "AIIMS";
//               if (folderSearchName.includes("NACIN"))
//                 folderSearchName = "NACIN ACADEMY";

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

//   const handleLoadMore = () => {
//     startTransition(async () => {
//       await new Promise((resolve) => setTimeout(resolve, 800));
//       setVisibleCount((prev) => prev + 1);
//     });
//   };

//   // Safe container reset logic if mobile screen clicks completely outside card grid boundary
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
//             <span className="font-black text-transparent block mt-2 text-3xl sm:text-5xl md:text-6xl tracking-wider uppercase [-webkit-text-stroke-width:1.5px] [-webkit-text-stroke-color:#ffffff]">
//               Installations.
//             </span>
//           </h1>
//         </div>
//       </section>

//       {/* Main Container */}
//       <div className="bg-ice py-12">
//         {isLoading ? (
//           <div className="max-w-7xl mx-auto px-6 sm:px-12 py-32 text-center text-slate-500 font-semibold tracking-wider uppercase text-xs animate-pulse">
//             Querying dynamic project tables and mapping assets...
//           </div>
//         ) : (
//           galleryProjects.slice(0, visibleCount).map((project, pIdx) => (
//             <section
//               key={project.id}
//               className="py-12 max-w-7xl mx-auto px-6 sm:px-12 animate-fade-in"
//             >
//               <div className="flex items-center gap-4 mb-8">
//                 <span className="w-8 h-0.5 bg-brand-blue" />
//                 <h2 className="text-xl font-bold uppercase tracking-wider text-dark-blue">
//                   {project.title}{" "}
//                   <span className="text-xs font-normal text-slate-400 lowercase ml-2">
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
//                         e.stopPropagation(); // Stops immediate dynamic outside toggle reset
//                         setActiveMobileCard(
//                           isCurrentlyActive ? null : cardUniqueKey,
//                         );
//                       }}
//                       className="relative aspect-square overflow-hidden bg-white border border-slate-200/60 shadow-sm group cursor-pointer"
//                     >
//                       {/* Image Layer Rendering */}
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

//                       {/* Unified Hover & Mobile Tap Layer */}
//                       <div
//                         className={`absolute inset-0 bg-dark-blue/75 backdrop-blur-[1.5px] flex flex-col items-center justify-center p-6 text-center z-20 transition-all duration-500 ${
//                           isCurrentlyActive
//                             ? "opacity-100 visible"
//                             : "opacity-0 invisible group-hover:opacity-100 group-hover:visible"
//                         }`}
//                       >
//                         {isFirstImage ? (
//                           // 🏛️ FIRST IMAGE ONLY: Dynamic Table Title + Clean Image Name
//                           <>
//                             <p className="text-brand-blue text-base sm:text-xl font-bold uppercase tracking-wide max-w-[90%] leading-tight transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
//                               {project.title}
//                             </p>
//                             <span className="text-white text-[10px] sm:text-xs font-semibold uppercase tracking-[0.15em] mt-3 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 delay-100">
//                               {img.workType}
//                             </span>
//                           </>
//                         ) : (
//                           // 🛠️ STANDARD IMAGES: Technical Details Layer
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
//         {visibleCount < galleryProjects.length && !isPending && !isLoading && (
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

//   // Sorting state switcher engine
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

//               if (folderSearchName.includes("AIIMS"))
//                 folderSearchName = "AIIMS";
//               if (folderSearchName.includes("NACIN"))
//                 folderSearchName = "NACIN ACADEMY";
//               if (folderSearchName.includes("CMD"))
//                 folderSearchName = "VISTA";
//                 folderSearchName = "CENTRAL VISTA PROJECT";

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

//   // background sorting optimization process
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
//             <span className="font-black text-transparent block mt-2 text-3xl sm:text-5xl md:text-6xl tracking-wider uppercase [-webkit-text-stroke-width:1.5px] [-webkit-text-stroke-color:#ffffff]">
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
//                   {/* 🚀 Year tag text completely removed from layout structure */}
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
//                           <>
//                             <p className="text-white text-base sm:text-xl font-bold uppercase tracking-wide max-w-[90%] leading-tight transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
//                               {project.title}
//                             </p>
//                             <span className="text-brand-blue text-[10px] sm:text-xs font-semibold uppercase tracking-[0.15em] mt-3 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 delay-100">
//                               {img.workType}
//                             </span>
//                           </>
//                         ) : (
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

interface GalleryProject {
  id: string;
  title: string;
  category: string;
  description: string;
  year: number | null;
  images: {
    src: string;
    alt: string;
    workType: string;
    fileName: string;
  }[];
}

export default function GalleryPage() {
  const [galleryProjects, setGalleryProjects] = useState<GalleryProject[]>([]);
  const [visibleCount, setVisibleCount] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [isPending, startTransition] = useTransition();

  // Sorting chronological state management
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  // Mobile touch focus handler state
  const [activeMobileCard, setActiveMobileCard] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDatabaseAndStorage() {
      try {
        setIsLoading(true);
        const bucketName = "project-images";

        const { data: dbProjects, error: dbError } = await supabase
          .from("projects")
          .select("*")
          .order("created_at", { ascending: false });

        if (dbError) throw dbError;

        if (dbProjects) {
          const mappedProjects = await Promise.all(
            dbProjects.map(async (project: any) => {
              let folderSearchName = project.title.toUpperCase().trim();

              // Clean explicit fallbacks matching exact Supabase Storage directory cases
              if (folderSearchName.includes("AIIMS")) {
                folderSearchName = "AIIMS";
              } else if (folderSearchName.includes("NACIN")) {
                folderSearchName = "NACIN ACADEMY";
              } else if (folderSearchName.includes("CMD")) {
                folderSearchName = "ACIL CMD SIR HOUSE";
              } else if (folderSearchName.includes("CAMELLIAS")) {
                folderSearchName = "DLF CAMELLIAS GURUGRAM";
              } else if (folderSearchName.includes("DHARAV")) {
                folderSearchName = "DHARAV HIGH SCHOOL";
              } else if (folderSearchName.includes("CENTRAL VISTA")) {
                folderSearchName = "Central Vista Project";
              }

              const { data: files, error: storageError } =
                await supabase.storage
                  .from(bucketName)
                  .list(folderSearchName, { limit: 30 });

              if (storageError || !files || files.length === 0) {
                console.warn(
                  `No storage assets discovered inside bucket path: ${folderSearchName}`,
                );
                return null;
              }

              const validFiles = files.filter(
                (file) => file.name !== ".emptyFolderPlaceholder",
              );

              const images = validFiles
                .map((file) => {
                  const {
                    data: { publicUrl },
                  } = supabase.storage
                    .from(bucketName)
                    .getPublicUrl(`${folderSearchName}/${file.name}`);

                  const cleanWorkType = file.name
                    .replace(/\.[^/.]+$/, "")
                    .replace(/^\d+[-_]/, "")
                    .replace(/[-_]/g, " ")
                    .replace(/\b\w/g, (c) => c.toUpperCase())
                    .trim();

                  return {
                    src: publicUrl,
                    alt: `${project.title} — ${cleanWorkType}`,
                    workType: cleanWorkType || "Premium Surface Execution",
                    fileName: file.name,
                  };
                })
                .sort((a, b) => a.fileName.localeCompare(b.fileName));

              return {
                id: project.id,
                title: project.title,
                category: project.category || "General Infrastructure",
                description: project.description || "",
                year: project.year ? Number(project.year) : null,
                images: images,
              };
            }),
          );

          setGalleryProjects(
            mappedProjects.filter((p) => p !== null) as GalleryProject[],
          );
        }
      } catch (err) {
        console.error("Critical database to storage map exception:", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchDatabaseAndStorage();
  }, []);

  // Sync state configuration to revalidate screen segments on manual re-order
  useEffect(() => {
    setActiveMobileCard(null);
    startTransition(() => {
      setVisibleCount(1);
    });
  }, [sortOrder]);

  const sortedProjects = [...galleryProjects].sort((a, b) => {
    const yearA = a.year || 0;
    const yearB = b.year || 0;
    return sortOrder === "newest" ? yearB - yearA : yearA - yearB;
  });

  const handleLoadMore = () => {
    startTransition(async () => {
      await new Promise((resolve) => setTimeout(resolve, 800));
      setVisibleCount((prev) => prev + 1);
    });
  };

  useEffect(() => {
    const handleOutsideClick = () => setActiveMobileCard(null);
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, []);

  return (
    <>
      {/* Editorial Corporate Header */}
      <section className="relative min-h-[50vh] flex items-center bg-dark-blue text-white pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-r from-darker-blue via-dark-blue/80 to-transparent z-10" />
        <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-12 w-full">
          <span className="text-brand-blue text-[11px] tracking-[0.35em] font-black uppercase block mb-3">
            Media Lookbook Portfolio
          </span>
          <h1 className="text-4xl sm:text-6xl font-light tracking-tight text-white uppercase leading-none">
            Exquisite Surface <br />
            <span className="font-extrabold text-transparent webkit-text-stroke
             -webkit-text-stroke-width: 5px -webkit-text-stroke-color: white">
              Installations.
            </span>
          </h1>
        </div>
      </section>

      {/* Main Container */}
      <div className="bg-ice py-12">
        {/* Dynamic Chronological Controller */}
        {!isLoading && galleryProjects.length > 0 && (
          <div className="max-w-7xl mx-auto px-6 sm:px-12 mb-6 flex justify-end">
            <div className="flex items-center gap-2 bg-white border border-slate-200 shadow-sm px-4 py-2">
              <span className="text-[10px] uppercase font-black tracking-wider text-slate-400">
                Sort By Chronology:
              </span>
              <select
                value={sortOrder}
                onChange={(e) =>
                  setSortOrder(e.target.value as "newest" | "oldest")
                }
                className="text-xs font-bold uppercase tracking-wide text-dark-blue bg-transparent outline-none cursor-pointer focus:text-brand-blue transition-colors"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest Heritage First</option>
              </select>
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="max-w-7xl mx-auto px-6 sm:px-12 py-32 text-center text-slate-500 font-semibold tracking-wider uppercase text-xs animate-pulse">
            Querying dynamic project tables and mapping assets...
          </div>
        ) : (
          sortedProjects.slice(0, visibleCount).map((project, pIdx) => (
            <section
              key={project.id}
              className="py-12 max-w-7xl mx-auto px-6 sm:px-12 animate-fade-in"
            >
              <div className="flex items-center gap-4 mb-8">
                <span className="w-8 h-0.5 bg-brand-blue" />
                <h2 className="text-xl font-bold uppercase tracking-wider text-dark-blue flex flex-wrap items-center gap-x-2 gap-y-1">
                  {project.title}
                  <span className="text-xs font-normal text-slate-400 normal-case">
                    ({project.category})
                  </span>
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {project.images.map((img, iIdx) => {
                  const isFirstImage = iIdx === 0;
                  const cardUniqueKey = `${pIdx}-${iIdx}`;
                  const isCurrentlyActive = activeMobileCard === cardUniqueKey;

                  return (
                    <div
                      key={iIdx}
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveMobileCard(
                          isCurrentlyActive ? null : cardUniqueKey,
                        );
                      }}
                      className="relative aspect-square overflow-hidden bg-white border border-slate-200/60 shadow-sm group cursor-pointer"
                    >
                      <Image
                        src={img.src}
                        alt={img.alt}
                        fill
                        sizes="(max-w-7xl) 33vw, 100vw"
                        className={`object-contain scale-100 group-hover:scale-105 transition-all duration-700 filter ${
                          isCurrentlyActive
                            ? "brightness-50 scale-105"
                            : "brightness-95 group-hover:brightness-50"
                        }`}
                        unoptimized
                      />

                      <div
                        className={`absolute inset-0 bg-dark-blue/75 backdrop-blur-[1.5px] flex flex-col items-center justify-center p-6 text-center z-20 transition-all duration-500 ${
                          isCurrentlyActive
                            ? "opacity-100 visible"
                            : "opacity-0 invisible group-hover:opacity-100 group-hover:visible"
                        }`}
                      >
                        {isFirstImage ? (
                          // 🏛️ FIRST IMAGE SPECIFIC LOOKUP: Project Name followed by Image Name string format
                          <>
                            <p className="text-white text-base sm:text-xl font-bold uppercase tracking-wide max-w-[90%] leading-tight transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                              {project.title}
                            </p>
                            <span className="text-brand-blue text-[10px] sm:text-xs font-semibold uppercase tracking-[0.15em] mt-2 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 delay-100">
                              {img.workType}
                            </span>
                          </>
                        ) : (
                          // 🛠️ STANDARD ARTIFACT DISPLAY DETAILS LAYER
                          <>
                            <span className="text-brand-blue text-[9px] tracking-[0.3em] font-black uppercase mb-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                              Execution Details
                            </span>
                            <p className="text-white text-xs sm:text-sm font-semibold uppercase tracking-wider max-w-[85%] leading-relaxed transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 delay-75">
                              {img.workType}
                            </p>
                            <div className="w-6 h-[1px] bg-white/40 mt-3 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 delay-150" />
                          </>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          ))
        )}

        {/* Dynamic Loader */}
        {isPending && (
          <div className="max-w-7xl mx-auto px-6 sm:px-12 py-12 space-y-6">
            <div className="flex items-center gap-4 animate-pulse">
              <div className="w-8 h-0.5 bg-slate-300" />
              <div className="h-4 bg-slate-300 w-48" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="aspect-square bg-slate-200 animate-pulse border border-slate-300/40"
                />
              ))}
            </div>
          </div>
        )}

        {/* Load More Trigger */}
        {visibleCount < sortedProjects.length && !isPending && !isLoading && (
          <div className="text-center py-16">
            <button
              onClick={handleLoadMore}
              type="button"
              className="px-10 py-4 bg-brand-blue text-white text-xs font-bold tracking-[0.2em] uppercase hover:bg-brand-hover transition-all shadow-md shadow-brand-blue/10"
            >
              Load More Projects
            </button>
          </div>
        )}
      </div>

      {/* Corporate Final Row CTA */}
      <section className="py-24 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-6 sm:px-12 text-center space-y-6">
          <h2 className="text-3xl font-extrabold text-dark-blue tracking-tight uppercase">
            Ready to Transform Your Space?
          </h2>
          <p className="text-slate-600 text-sm font-medium max-w-lg mx-auto leading-relaxed">
            Get in touch with our institutional engineering layout support desk
            for strategic B2B material consultation.
          </p>
          <div className="pt-4">
            <Link
              href="/contact"
              className="inline-block px-10 py-4 bg-dark-blue text-white text-xs tracking-[0.2em] font-bold uppercase hover:bg-black transition-all"
            >
              Contact Us Today
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
