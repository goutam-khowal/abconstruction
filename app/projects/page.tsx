"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ArchiveProjectsTable from "@/components/ArchiveProjectsTable";
import InstitutionalClientsGrid from "@/components/InstitutionalClientsGrid";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function ProjectsPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      // Entrance Animation
      const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });

      heroTl
        .from(".projects-hero-badge", {
          opacity: 0,
          y: -15,
          duration: 0.6,
          delay: 0.1,
        })
        .from(
          ".projects-hero-title-line",
          {
            opacity: 0,
            y: 35,
            duration: 0.8,
            stagger: 0.15,
          },
          "-=0.4",
        );

      // Smooth Scrub: 2 Parallax Shift
      gsap.to(".projects-hero-content", {
        y: -50,
        opacity: 0.2,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 2, // Smooth 2s scroll scrub
        },
      });
    },
    { scope: containerRef },
  );

  return (
    <div ref={containerRef} className="bg-stone-50 text-stone-900 font-sans">
      {/* Hero Header */}
      <section
        ref={heroRef}
        className="relative min-h-[40vh] sm:min-h-[45vh] flex items-center bg-stone-900 text-white pt-28 sm:pt-32 pb-12 sm:pb-16 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-900/80 to-transparent z-10" />
        <div className="projects-hero-content relative z-20 max-w-7xl mx-auto px-4 sm:px-8 md:px-12 w-full">
          <span className="projects-hero-badge text-amber-500 text-xs tracking-widest uppercase font-extrabold block mb-2">
            Portfolio Registry
          </span>
          <h1 className="text-3xl sm:text-5xl font-light tracking-tight text-white uppercase leading-tight">
            <span className="projects-hero-title-line block">
              Where Craftsmanship
            </span>
            <span className="projects-hero-title-line font-extrabold text-amber-500 block">
              Meets Perfection.
            </span>
          </h1>
        </div>
      </section>

      {/* Completed Projects Archive Table Component */}
      <ArchiveProjectsTable />

      {/* CLIENT MARQUEE / GRID */}
      <InstitutionalClientsGrid />
    </div>
  );
}
