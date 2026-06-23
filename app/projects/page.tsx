// "use client";

// import React, { useState, useEffect, useTransition } from "react";
// import Image from "next/image";
// import { supabase } from "@/lib/supabase";

// interface ProjectItem {
//   id: string;
//   title: string;
//   category: string;
//   image_url: string;
//   description: string;
// }

// export default function ProjectsPage() {
//   const [dbProjects, setDbProjects] = useState<ProjectItem[]>([]);
//   const [activeSegment, setActiveSegment] = useState<string>("All");
//   const [isPending, startTransition] = useTransition();
//   const [loading, setLoading] = useState(true);

//   // Direct Database Stream Hook
//   useEffect(() => {
//     async function fetchProjects() {
//       try {
//         const { data, error } = await supabase
//           .from("projects")
//           .select("*")
//           .order("created_at", { ascending: false });

//         if (!error && data) {
//           setDbProjects(data);
//         }
//       } catch (err) {
//         console.error("Database streaming error:", err);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchProjects();
//   }, []);

//   const categories = [
//     "All",
//     "Commercial Projects",
//     "Healthcare Projects",
//     "Residential Projects",
//     "Public Projects",
//   ];

//   return (
//     <div className="bg-white text-slate-900 font-sans min-h-screen pt-24">
//       {/* Hero */}
//       <section className="relative min-h-[40vh] flex items-center bg-dark-blue text-white py-16">
//         <div className="absolute inset-0 bg-gradient-to-r from-darker-blue via-dark-blue/80 to-transparent z-10" />
//         <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-12 w-full">
//           <span className="text-brand-blue text-[10px] tracking-[0.4em] uppercase font-black block mb-3">
//             Live Database Sync
//           </span>
//           <h1 className="text-4xl sm:text-6xl font-light tracking-tight text-white uppercase leading-none">
//             Our Architectural <br />
//             <span className="font-extrabold text-transparent webkit-text-stroke">
//               Project Registry.
//             </span>
//           </h1>
//         </div>
//       </section>

//       {/* Dynamic Filter Tabs */}
//       <section className="max-w-7xl mx-auto px-6 sm:px-12 py-8">
//         <div className="flex flex-wrap gap-6 border-b border-slate-200 pb-4 mb-12">
//           {categories.map((segment) => (
//             <button
//               key={segment}
//               onClick={() => startTransition(() => setActiveSegment(segment))}
//               type="button"
//               className={`text-[11px] tracking-[0.15em] font-bold uppercase transition-all relative pb-2 ${
//                 activeSegment === segment
//                   ? "text-brand-blue"
//                   : "text-slate-400 hover:text-slate-900"
//               }`}
//             >
//               {segment}
//               {activeSegment === segment && (
//                 <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-blue" />
//               )}
//             </button>
//           ))}
//         </div>

//         {/* Loading Skeleton Matrix */}
//         {loading ? (
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-pulse">
//             {[1, 2].map((n) => (
//               <div
//                 key={n}
//                 className="h-96 bg-slate-100 border border-slate-200"
//               />
//             ))}
//           </div>
//         ) : (
//           /* Projects Live Grid Output */
//           <div
//             className={`grid grid-cols-1 md:grid-cols-2 gap-8 transition-opacity duration-300 ${isPending ? "opacity-30" : "opacity-100"}`}
//           >
//             {dbProjects
//               .filter(
//                 (item) =>
//                   activeSegment === "All" || item.category === activeSegment,
//               )
//               .map((project) => (
//                 <article
//                   key={project.id}
//                   className="border border-slate-200 bg-ice flex flex-col justify-between group hover:border-brand-blue/20 transition-all shadow-sm"
//                 >
//                   <div className="relative h-72 overflow-hidden bg-slate-100 border-b border-slate-200">
//                     <Image
//                       src={project.image_url}
//                       alt={project.title}
//                       fill
//                       sizes="(max-w-7xl) 50vw, 100vw"
//                       className="object-cover group-hover:scale-101 transition-transform duration-500"
//                       unoptimized
//                     />
//                   </div>
//                   <div className="p-8 bg-white space-y-3 flex-grow">
//                     <span className="text-[10px] font-black text-brand-blue uppercase tracking-widest">
//                       {project.category}
//                     </span>
//                     <h3 className="text-dark-blue font-display font-bold text-lg uppercase tracking-tight">
//                       {project.title}
//                     </h3>
//                     <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
//                       {project.description}
//                     </p>
//                   </div>
//                 </article>
//               ))}
//           </div>
//         )}
//       </section>
//     </div>
//   );
// }

// ---

import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Projects – A&B Construction",
  description:
    "Bringing Visions to Life! Explore our completed projects — craftsmanship meets perfection.",
};

const projectCategories = [
  {
    label: "Commercial Projects",
    image:
      "https://a-bconstruction.in/wp-content/uploads/2025/01/1-1024x1024.png",
    desc: "Office buildings, retail spaces, hotels, and corporate interiors with premium marble and stone finishes.",
  },
  {
    label: "Healthcare Projects",
    image:
      "https://a-bconstruction.in/wp-content/uploads/2025/01/2-1024x1024.png",
    desc: "Hospitals and medical facilities requiring hygienic, durable, and aesthetically refined surfaces.",
  },
  {
    label: "Residential Projects",
    image:
      "https://a-bconstruction.in/wp-content/uploads/2025/01/3-1024x1024.png",
    desc: "Luxury homes, apartments, and villas — transforming living spaces with timeless marble and tile.",
  },
  {
    label: "Public Projects",
    image:
      "https://a-bconstruction.in/wp-content/uploads/2025/01/4-1024x1024.png",
    desc: "Government buildings, airports, monuments, and public institutions demanding lasting craftsmanship.",
  },
];

export default function ProjectsPage() {
  return (
    <div className="bg-white text-slate-900 font-sans">
      {/* Hero */}
      <section className="relative min-h-[50vh] flex items-center bg-dark-blue text-white pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-r from-darker-blue via-dark-blue/80 to-transparent z-10" />
        <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-12 w-full">
          <span className="text-brand-blue text-[10px] tracking-[0.4em] uppercase font-black block mb-3">
            Portfolio Registry
          </span>
          <h1 className="text-4xl sm:text-6xl font-light tracking-tight text-white uppercase leading-none">
            Where Craftsmanship <br />
            <span className="font-extrabold text-transparent webkit-text-stroke">
              Meets Perfection.
            </span>
          </h1>
        </div>
      </section>

      {/* Cards Presentation Layer */}
      <section className="py-24 max-w-7xl mx-auto px-6 sm:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projectCategories.map((cat) => (
            <div
              key={cat.label}
              className="border border-slate-200 bg-ice flex flex-col justify-between group hover:border-brand-blue/20 transition-all"
            >
              <div className="relative h-72 overflow-hidden bg-slate-100 border-b border-slate-200">
                <Image
                  src={cat.image}
                  alt={cat.label}
                  fill
                  sizes="(max-w-7xl) 50vw, 100vw"
                  className="object-cover filter brightness-95 group-hover:scale-101 transition-transform duration-700"
                  unoptimized
                />
              </div>
              <div className="p-8 bg-white space-y-3">
                <span className="h-0.5 w-6 bg-brand-blue block" />
                <h3 className="text-dark-blue font-bold text-xl uppercase tracking-tight">
                  {cat.label}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                  {cat.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* High-Performance Static Image Registry Row */}
      <section className="py-20 bg-ice border-t border-slate-200">
        <div className="max-w-5xl mx-auto px-6 sm:px-12 space-y-10">
          <div className="text-center space-y-2">
            <span className="text-[10px] tracking-[0.3em] font-bold text-brand-blue uppercase block">
              Audited Performance
            </span>
            <h2 className="text-2xl font-extrabold text-dark-blue uppercase tracking-tight">
              Our Completed Works Registry
            </h2>
          </div>
          <div className="bg-white border border-slate-200 p-4 shadow-sm">
            <Image
              src="https://cdcyuvyzdezofklnrkrq.supabase.co/storage/v1/object/public/People/gemini-code-1782030460608.png"
              alt="Full data registry list of accomplished surface operations across India by A&B Construction"
              width={1000}
              height={700}
              className="w-full h-auto object-contain"
              unoptimized
            />
          </div>
        </div>
      </section>
    </div>
  );
}
