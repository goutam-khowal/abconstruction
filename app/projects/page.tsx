"use client";

import React, { useState, useEffect, useTransition } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

interface ProjectItem {
  id: string;
  title: string;
  category: string;
  image_url: string;
  description: string;
}

export default function ProjectsPage() {
  const [dbProjects, setDbProjects] = useState<ProjectItem[]>([]);
  const [activeSegment, setActiveSegment] = useState<string>("All");
  const [isPending, startTransition] = useTransition();
  const [loading, setLoading] = useState(true);

  // Direct Database Stream Hook
  useEffect(() => {
    async function fetchProjects() {
      try {
        const { data, error } = await supabase
          .from("projects")
          .select("*")
          .order("created_at", { ascending: false });

        if (!error && data) {
          setDbProjects(data);
        }
      } catch (err) {
        console.error("Database streaming error:", err);
      } finally {
        setLoading(false);
      }
    }
    fetchProjects();
  }, []);

  const categories = [
    "All",
    "Commercial Projects",
    "Healthcare Projects",
    "Residential Projects",
    "Public Projects",
  ];

  return (
    <div className="bg-white text-slate-900 font-sans min-h-screen pt-24">
      {/* Hero */}
      <section className="relative min-h-[40vh] flex items-center bg-dark-blue text-white py-16">
        <div className="absolute inset-0 bg-gradient-to-r from-darker-blue via-dark-blue/80 to-transparent z-10" />
        <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-12 w-full">
          <span className="text-brand-blue text-[10px] tracking-[0.4em] uppercase font-black block mb-3">
            Live Database Sync
          </span>
          <h1 className="text-4xl sm:text-6xl font-light tracking-tight text-white uppercase leading-none">
            Our Architectural <br />
            <span className="font-extrabold text-transparent webkit-text-stroke">
              Project Registry.
            </span>
          </h1>
        </div>
      </section>

      {/* Dynamic Filter Tabs */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 py-8">
        <div className="flex flex-wrap gap-6 border-b border-slate-200 pb-4 mb-12">
          {categories.map((segment) => (
            <button
              key={segment}
              onClick={() => startTransition(() => setActiveSegment(segment))}
              type="button"
              className={`text-[11px] tracking-[0.15em] font-bold uppercase transition-all relative pb-2 ${
                activeSegment === segment
                  ? "text-brand-blue"
                  : "text-slate-400 hover:text-slate-900"
              }`}
            >
              {segment}
              {activeSegment === segment && (
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-blue" />
              )}
            </button>
          ))}
        </div>

        {/* Loading Skeleton Matrix */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 animate-pulse">
            {[1, 2].map((n) => (
              <div
                key={n}
                className="h-96 bg-slate-100 border border-slate-200"
              />
            ))}
          </div>
        ) : (
          /* Projects Live Grid Output */
          <div
            className={`grid grid-cols-1 md:grid-cols-2 gap-8 transition-opacity duration-300 ${isPending ? "opacity-30" : "opacity-100"}`}
          >
            {dbProjects
              .filter(
                (item) =>
                  activeSegment === "All" || item.category === activeSegment,
              )
              .map((project) => (
                <article
                  key={project.id}
                  className="border border-slate-200 bg-ice flex flex-col justify-between group hover:border-brand-blue/20 transition-all shadow-sm"
                >
                  <div className="relative h-72 overflow-hidden bg-slate-100 border-b border-slate-200">
                    <Image
                      src={project.image_url}
                      alt={project.title}
                      fill
                      sizes="(max-w-7xl) 50vw, 100vw"
                      className="object-cover group-hover:scale-101 transition-transform duration-500"
                      unoptimized
                    />
                  </div>
                  <div className="p-8 bg-white space-y-3 flex-grow">
                    <span className="text-[10px] font-black text-brand-blue uppercase tracking-widest">
                      {project.category}
                    </span>
                    <h3 className="text-dark-blue font-display font-bold text-lg uppercase tracking-tight">
                      {project.title}
                    </h3>
                    <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                      {project.description}
                    </p>
                  </div>
                </article>
              ))}
          </div>
        )}
      </section>
    </div>
  );
}
