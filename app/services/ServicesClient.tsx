"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const projectCategories = [
  {
    label: "Commercial Projects",
    image:
      "https://cdcyuvyzdezofklnrkrq.supabase.co/storage/v1/object/sign/project-images/DLF%20CAMELLIAS%20GURUGRAM/01-dlf%20camellias%20gurugram.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hYjQ4YmI2Yi1iYmM3LTRkZGYtYmEwOC03YzRhNWI1YTdhMzAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwcm9qZWN0LWltYWdlcy9ETEYgQ0FNRUxMSUFTIEdVUlVHUkFNLzAxLWRsZiBjYW1lbGxpYXMgZ3VydWdyYW0ud2VicCIsInNjb3BlIjoiZG93bmxvYWQiLCJpYXQiOjE3ODYxMzk2ODcsImV4cCI6MTgxNzY3NTY4N30.yNo2AoAuE_1a11fPvr9eijozbB6H-YS53hkCAXXM7wU",
    desc: "Office complexes, retail centers, luxury hotels, and corporate headquarters rendered with premium marble and granite finishes.",
  },
  {
    label: "Healthcare Projects",
    image:
      "https://cdcyuvyzdezofklnrkrq.supabase.co/storage/v1/object/sign/project-images/AIIMS/01-Dholpur%20sandstone%20dry%20cladding%20by%20using%20clamp%20&%20fasteners.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hYjQ4YmI2Yi1iYmM3LTRkZGYtYmEwOC03YzRhNWI1YTdhMzAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwcm9qZWN0LWltYWdlcy9BSUlNUy8wMS1EaG9scHVyIHNhbmRzdG9uZSBkcnkgY2xhZGRpbmcgYnkgdXNpbmcgY2xhbXAgJiBmYXN0ZW5lcnMud2VicCIsInNjb3BlIjoiZG93bmxvYWQiLCJpYXQiOjE3ODYxMzk2NTgsImV4cCI6MTgxNzY3NTY1OH0.G9rwuv-_Inj97VrSRKbe0itHOYvEfmZ2LmT2b_9Hz6Q",
    desc: "Hospitals and medical research facilities requiring durable, hygienic, and seamless floor and wall matrices.",
  },
  {
    label: "Residential Projects",
    image:
      "https://cdcyuvyzdezofklnrkrq.supabase.co/storage/v1/object/sign/project-images/ACIL%20CMD%20SIR%20HOUSE/01-khareda%20stone%20cladding.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hYjQ4YmI2Yi1iYmM3LTRkZGYtYmEwOC03YzRhNWI1YTdhMzAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwcm9qZWN0LWltYWdlcy9BQ0lMIENNRCBTSVIgSE9VU0UvMDEta2hhcmVkYSBzdG9uZSBjbGFkZGluZy53ZWJwIiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc4NjE0MDE1OCwiZXhwIjoxODE3Njc2MTU4fQ.X9NgVhS2v3nd8e-sV_9cHl-wETp1iK6vwEKcLKYOTvQ",
    desc: "Luxury private residences, executive apartments, and villas transformed with Italian marble laying and precision polishing.",
  },
  {
    label: "Public & Institutional Projects",
    image:
      "https://cdcyuvyzdezofklnrkrq.supabase.co/storage/v1/object/sign/project-images/Central%20Vista%20Project/01-Central-Vista.webp?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV9hYjQ4YmI2Yi1iYmM3LTRkZGYtYmEwOC03YzRhNWI1YTdhMzAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJwcm9qZWN0LWltYWdlcy9DZW50cmFsIFZpc3RhIFByb2plY3QvMDEtQ2VudHJhbC1WaXN0YS53ZWJwIiwic2NvcGUiOiJkb3dubG9hZCIsImlhdCI6MTc4NjEzOTQzMCwiZXhwIjoxODE3Njc1NDMwfQ.EvXLcVJV1eAncVmb80cu7U_Ey7Z3HeMnugvAMA7-EQE",
    desc: "Government headquarters, embassies, educational campuses, and public monuments engineered for high durability.",
  },
];

const serviceItems = [
  {
    title: "Italian Marble Installation & Diamond Grinding",
    desc: "Precision laying, chemical epoxy treatment, seamless joint alignment, and multi-stage mirror diamond polishing for high-end luxury imported slabs.",
  },
  {
    title: "Granite & Dholpur Architectural Stone Execution",
    desc: "Heavy-duty outdoor and indoor structural stone fitting, high-end finish of Italian marble, granites & all types of tiles, and Dholpur facade claddings engineered for long-term commercial wear.",
  },
  {
    title: "High-Performance Tile & Facade Cladding",
    desc: "Large-format porcelain, vitrified ceramic layers, and ventilated exterior wall cladding installed with precision laser levelling.",
  },
];

export default function ServicesClient() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const categoriesRef = useRef<HTMLElement>(null);
  const servicesRef = useRef<HTMLElement>(null);

  // GSAP Animation Start: Hero Cinematic Reveal & Scroll Parallax
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          [
            ".services-hero-badge",
            ".services-hero-rule",
            ".services-hero-title-line",
            ".category-card-anim",
            ".service-card-anim",
            ".card-accent-line",
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
            ".services-hero-badge",
            { opacity: 0, y: -10 },
            { opacity: 1, y: 0, duration: 0.5, delay: 0.1 },
          )
          .fromTo(
            ".services-hero-rule",
            { scaleX: 0 },
            { scaleX: 1, duration: 0.6, ease: "expo.out" },
            "-=0.2",
          )
          .fromTo(
            ".services-hero-title-line",
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

        // 2. Hero Parallax Scroll
        gsap.to(".services-hero-content", {
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

        // 3. Project Categories Grid Entrance
        gsap.fromTo(
          ".category-card-anim",
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: categoriesRef.current,
              start: "top 80%",
              toggleActions: "play none none none",
            },
          },
        );

        // 4. Service Items Staggered Entrance
        const serviceTl = gsap.timeline({
          scrollTrigger: {
            trigger: servicesRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });

        serviceTl
          .fromTo(
            ".card-accent-line",
            { scaleX: 0 },
            { scaleX: 1, duration: 0.6, stagger: 0.15, ease: "expo.out" },
          )
          .fromTo(
            ".service-card-anim",
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.7,
              stagger: 0.15,
              ease: "power3.out",
            },
            "-=0.4",
          );
      });

      return () => mm.revert();
    },
    { scope: containerRef },
  );
  // GSAP Animation End: Hero Cinematic Reveal & Scroll Parallax

  // GSAP Animation Start: Arrow Hover Micro-Interaction Context Helper
  const { contextSafe } = useGSAP({ scope: containerRef });

  const handleArrowEnter = contextSafe(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const arrow = e.currentTarget.querySelector(".cta-arrow");
      if (arrow) {
        gsap.to(arrow, { x: 6, duration: 0.25, ease: "power2.out" });
      }
    },
  );

  const handleArrowLeave = contextSafe(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      const arrow = e.currentTarget.querySelector(".cta-arrow");
      if (arrow) {
        gsap.to(arrow, { x: 0, duration: 0.25, ease: "power2.out" });
      }
    },
  );
  // GSAP Animation End: Arrow Hover Micro-Interaction Context Helper

  return (
    <div ref={containerRef} className="bg-stone-50 text-stone-900 font-sans">
      {/* Hero Header */}
      <section
        ref={heroRef}
        className="relative min-h-[40vh] sm:min-h-[45vh] flex items-center bg-stone-900 text-white pt-28 sm:pt-32 pb-12 sm:pb-16 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-900/80 to-transparent z-10" />
        <div className="services-hero-content relative z-20 max-w-7xl mx-auto px-4 sm:px-8 md:px-12 w-full">
          <span className="services-hero-badge text-amber-500 text-xs tracking-widest uppercase font-extrabold block mb-2">
            Technical Capabilities
          </span>
          <span
            className="services-hero-rule block h-[2px] w-14 bg-amber-500/70 origin-left mb-4"
            aria-hidden="true"
          />
          <h1 className="text-3xl sm:text-5xl font-light tracking-tight text-white uppercase leading-tight">
            <span className="services-hero-title-line block">
              Comprehensive
            </span>
            <span className="services-hero-title-line font-extrabold text-amber-500 block">
              Surface Services.
            </span>
          </h1>
        </div>
      </section>

      {/* Domain Cards Presentation Layer */}
      <section
        ref={categoriesRef}
        className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-8 md:px-12"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {projectCategories.map((cat, idx) => (
            <div
              key={cat.label}
              className="category-card-anim group border border-stone-200 bg-white flex flex-col justify-between hover:border-amber-500/50 transition-colors duration-300 rounded-sm overflow-hidden shadow-sm"
            >
              <div className="relative h-76 sm:h-96 w-full overflow-hidden bg-stone-100 border-b border-stone-200">
                <Image
                  src={cat.image}
                  alt={cat.label}
                  fill
                  priority={idx < 2}
                  loading={idx < 2 ? "eager" : "lazy"}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover
                  object-top filter brightness-95 group-hover:scale-105 transition-transform duration-700 ease-out"
                  unoptimized
                />
              </div>
              <div className="p-6 sm:p-8 space-y-3">
                <span className="card-accent-line h-0.5 w-8 bg-amber-600 block origin-left" />
                <h3 className="text-stone-900 font-extrabold text-xl uppercase tracking-tight">
                  {cat.label}
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed font-medium">
                  {cat.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Detailed Services Section */}
      <section
        ref={servicesRef}
        className="py-12 sm:py-6 pb-12 sm:pb-20 max-w-7xl mx-auto px-4 sm:px-8 md:px-12"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {serviceItems.map((s) => (
            <div
              key={s.title}
              className="service-card-anim border border-stone-200 bg-white p-6 sm:p-8 flex flex-col justify-between hover:border-amber-500/50 transition-colors duration-300 rounded-sm shadow-sm"
            >
              <div className="space-y-3">
                <span className="card-accent-line h-0.5 w-8 bg-amber-600 block origin-left" />
                <h3 className="text-stone-900 font-extrabold text-lg uppercase tracking-tight">
                  {s.title}
                </h3>
                <p className="text-stone-600 text-sm font-medium leading-relaxed">
                  {s.desc}
                </p>
              </div>
              <div className="pt-6">
                <Link
                  href="/contact"
                  onMouseEnter={handleArrowEnter}
                  onMouseLeave={handleArrowLeave}
                  className="inline-flex items-center text-xs font-extrabold text-amber-600 uppercase tracking-widest hover:underline min-h-[44px]"
                >
                  Inquire Technical Specifications{" "}
                  <span className="cta-arrow inline-block ml-1">→</span>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
