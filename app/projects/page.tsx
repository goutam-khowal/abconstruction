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

  // GSAP Animation Start: Hero Cinematic Reveal & Scroll Parallax
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          [
            ".projects-hero-badge",
            ".projects-hero-badge-rule",
            ".projects-hero-title-line",
          ],
          { opacity: 1, y: 0, scaleX: 1, clearProps: "filter,clipPath" },
        );
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });

        heroTl
          .fromTo(
            ".projects-hero-badge",
            { opacity: 0, y: -10 },
            { opacity: 1, y: 0, duration: 0.5, delay: 0.1 },
          )
          .fromTo(
            ".projects-hero-badge-rule",
            { scaleX: 0 },
            { scaleX: 1, duration: 0.6, ease: "expo.out" },
            "-=0.2",
          )
          .fromTo(
            ".projects-hero-title-line",
            {
              opacity: 0,
              y: 40,
              filter: "blur(8px)",
              clipPath: "polygon(0 0, 100% 0, 100% 0, 0 0)",
            },
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
              clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
              duration: 1,
              stagger: 0.18,
              ease: "expo.out",
            },
            "-=0.3",
          );

        gsap.to(".projects-hero-content", {
          y: -40,
          opacity: 0.25,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });

        return () => heroTl.kill();
      });

      return () => mm.revert();
    },
    { scope: containerRef },
  );
  // GSAP Animation End: Hero Cinematic Reveal & Scroll Parallax

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
          <span
            className="projects-hero-badge-rule block h-[2px] w-14 bg-amber-500/70 origin-left mb-4"
            aria-hidden="true"
          />
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
