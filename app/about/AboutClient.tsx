"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const leaders = [
  {
    name: "Late: Shri GangaRam Parewa",
    role: "Founder",
    image:
      "https://cdcyuvyzdezofklnrkrq.supabase.co/storage/v1/object/public/People/dada.png",
  },
  {
    name: "Mr. Amirchand Parewa",
    role: "Director",
    image:
      "https://cdcyuvyzdezofklnrkrq.supabase.co/storage/v1/object/public/People/Amirchand_Parewa-removebg-preview.png",
  },
];

export default function AboutClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const heritageRef = useRef<HTMLDivElement>(null);
  const leadersRef = useRef<HTMLDivElement>(null);

  // GSAP Animation Start: Hero Reveal, Scroll Parallax & Stagger Sequences
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          [
            ".about-hero-badge",
            ".about-hero-rule",
            ".about-hero-title-line",
            ".heritage-anim-item",
            ".leader-card-anim",
          ],
          {
            opacity: 1,
            y: 0,
            scaleX: 1,
            scale: 1,
            clearProps: "filter,clipPath",
          },
        );
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // 1. Hero Entrance Timeline
        const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });

        heroTl
          .fromTo(
            ".about-hero-badge",
            { opacity: 0, y: -10 },
            { opacity: 1, y: 0, duration: 0.5, delay: 0.1 },
          )
          .fromTo(
            ".about-hero-rule",
            { scaleX: 0 },
            { scaleX: 1, duration: 0.6, ease: "expo.out" },
            "-=0.2",
          )
          .fromTo(
            ".about-hero-title-line",
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

        // 2. Hero Scroll Parallax
        gsap.to(".about-hero-content", {
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

        // 3. Heritage Narrative Entrance
        gsap.fromTo(
          ".heritage-anim-item",
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: heritageRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          },
        );

        // 4. Leadership Cards Entrance
        gsap.fromTo(
          ".leader-card-anim",
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: leadersRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          },
        );
      });

      return () => mm.revert();
    },
    { scope: containerRef },
  );
  // GSAP Animation End: Hero Reveal, Scroll Parallax & Stagger Sequences

  return (
    <div ref={containerRef} className="bg-stone-50 text-stone-900 font-sans">
      {/* Hero Header */}
      <section
        ref={heroRef}
        className="relative min-h-[40vh] sm:min-h-[45vh] flex items-center bg-stone-900 text-white pt-28 sm:pt-32 pb-12 sm:pb-16 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-900/80 to-transparent z-10" />
        <div className="about-hero-content relative z-20 max-w-7xl mx-auto px-4 sm:px-8 md:px-12 w-full">
          <div className="about-hero-badge flex items-center gap-2 mb-2">
            <span className="text-amber-500 text-xs tracking-widest uppercase font-extrabold">
              Established 1977
            </span>
            <span className="text-stone-400 text-xs font-semibold uppercase">
              • Formerly GANGA RAM &amp; Sons
            </span>
          </div>
          <span
            className="about-hero-rule block h-[2px] w-14 bg-amber-500/70 origin-left mb-4"
            aria-hidden="true"
          />
          <h1 className="text-3xl sm:text-5xl font-light tracking-tight uppercase leading-tight max-w-3xl">
            <span className="about-hero-title-line block">
              A Four-Decade Legacy in
            </span>
            <span className="about-hero-title-line font-extrabold text-amber-500 block">
              Marble &amp; Stone Work
            </span>
          </h1>
        </div>
      </section>

      {/* Corporate Heritage Section */}
      <section className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-8 md:px-12">
        <div
          ref={heritageRef}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16"
        >
          <div className="heritage-anim-item lg:col-span-5 space-y-2">
            <span className="text-xs tracking-widest font-extrabold text-amber-600 uppercase block">
              Corporate Heritage
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900 uppercase">
              Precision Engineering &amp; Surface Mastery
            </h2>
          </div>
          <div className="heritage-anim-item lg:col-span-7 space-y-3">
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-medium">
              Founded in 1977{" "}
              <strong className="text-stone-900">A&amp;B Construction</strong>{" "}
              (previously known as as <strong>Ganga Ram &amp; Sons</strong>) has
              built a multi-generational legacy executing high-spec surface
              installations across commercial complexes, government embassies,
              educational institutes, and luxury private residences across
              India.
            </p>
          </div>
        </div>

        {/* Foundational Leadership Section */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="heritage-anim-item text-2xl font-extrabold text-stone-900 uppercase tracking-tight">
            Foundational Leadership
          </h2>
        </div>

        <div
          ref={leadersRef}
          className="flex flex-col sm:flex-row gap-8 justify-center items-center"
        >
          {leaders.map((leader) => (
            <div
              key={leader.name}
              className="leader-card-anim group text-center w-full sm:w-auto max-w-xs"
            >
              <div className="relative mb-4 mx-auto w-48 h-48 border border-stone-200 bg-white p-2 shadow-sm rounded-sm overflow-hidden">
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src={leader.image}
                    alt={leader.name}
                    fill
                    loading="lazy"
                    sizes="192px"
                    className="object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
                    unoptimized
                  />
                </div>
              </div>
              <span className="text-amber-600 text-xs font-extrabold uppercase block mb-1">
                {leader.role}
              </span>
              <h3 className="text-stone-900 text-base font-extrabold uppercase tracking-tight">
                {leader.name}
              </h3>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
