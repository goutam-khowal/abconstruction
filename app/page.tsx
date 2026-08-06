"use client";

import { useRef } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const stats = [
  { numericValue: 40, suffix: "+", label: "Years In Business" },
  { numericValue: 5, suffix: "k+", label: "Happy Clients" },
  { numericValue: 10, suffix: "M+", label: "Sq. Ft. Covered with Excellence" },
  { numericValue: 1, suffix: "k+", label: "Completed Projects" },
];

export default function HomePage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);
  const statsRef = useRef<HTMLElement>(null);
  const overviewRef = useRef<HTMLElement>(null);

  // GSAP Animation Start: Hero Reveal & Parallax
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          [
            ".hero-badge-container",
            ".hero-badge-rule",
            ".hero-title-line",
            ".hero-subtext",
            "#homeCTA",
            ".stat-item",
            ".overview-badge",
            ".overview-heading",
            ".overview-text",
            ".overview-link",
          ],
          { opacity: 1, y: 0, x: 0, scaleX: 1, clearProps: "filter,clipPath" },
        );
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // 1. HERO SECTION ENTRANCE
        const heroTl = gsap.timeline({ defaults: { ease: "power3.out" } });

        heroTl
          .fromTo(
            ".hero-badge-container",
            { opacity: 0, y: -12 },
            { opacity: 1, y: 0, duration: 0.6, delay: 0.1 },
          )
          .fromTo(
            ".hero-badge-rule",
            { scaleX: 0 },
            { scaleX: 1, duration: 0.6, ease: "expo.out" },
            "-=0.3",
          )
          .fromTo(
            ".hero-title-line",
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
              duration: 0.9,
              stagger: 0.15,
              ease: "expo.out",
            },
            "-=0.3",
          )
          .fromTo(
            ".hero-subtext",
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6 },
            "-=0.4",
          )
          .fromTo(
            "#homeCTA",
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
            "-=0.3",
          );

        // Hero Parallax Scrub (Drifts text up on scroll)
        gsap.to(".hero-content", {
          y: -60,
          opacity: 0.3,
          ease: "none",
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom top",
            scrub: 1,
          },
        });

        // 2. STATS COUNTER ANIMATION
        const statItems = gsap.utils.toArray<HTMLElement>(".stat-item");

        statItems.forEach((item) => {
          const numElement = item.querySelector(".stat-number");
          const targetValue = parseInt(
            numElement?.getAttribute("data-value") || "0",
            10,
          );

          const counterObj = { value: 0 };

          gsap.to(counterObj, {
            value: targetValue,
            ease: "none",
            scrollTrigger: {
              trigger: statsRef.current,
              start: "top 85%",
              end: "bottom 60%",
            },
            onUpdate: () => {
              if (numElement) {
                numElement.textContent = Math.floor(
                  counterObj.value,
                ).toString();
              }
            },
          });
        });

        // 3. OVERVIEW SECTION REVEAL
        const overviewTl = gsap.timeline({
          scrollTrigger: {
            trigger: overviewRef.current,
            start: "top 85%",
            end: "top 35%",
            scrub: 1,
          },
        });

        overviewTl
          .fromTo(
            ".overview-badge",
            { opacity: 0, x: -30 },
            { opacity: 1, x: 0 },
          )
          .fromTo(
            ".overview-heading",
            { opacity: 0, y: 35 },
            { opacity: 1, y: 0 },
            "-=0.2",
          )
          .fromTo(
            ".overview-text",
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0 },
            "-=0.2",
          )
          .fromTo(
            ".overview-link",
            { opacity: 0, x: -20 },
            { opacity: 1, x: 0 },
            "-=0.2",
          );
      });

      return () => mm.revert();
    },
    { scope: containerRef },
  );
  // GSAP Animation End: Hero Reveal & Parallax

  return (
    <div ref={containerRef} className="bg-stone-50 text-stone-900 font-sans">
      {/* HERO SECTION */}
      <section
        ref={heroRef}
        className="relative min-h-[85vh] sm:min-h-screen flex items-center bg-stone-900 text-white pt-24 pb-12 sm:pt-28 overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-900/90 to-transparent z-10" />
        <div className="absolute inset-0 opacity-15 mix-blend-overlay bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:20px_20px]" />

        <div className="hero-content relative z-20 max-w-7xl mx-auto px-4 sm:px-8 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-10 space-y-4 sm:space-y-6">
            {/* Integrated Dual Heritage Badge */}
            <div className="hero-badge-container flex flex-wrap items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-amber-500">
              <span>Established 1977 · New Delhi</span>
              <span className="text-stone-500 hidden sm:inline">•</span>
              <span className="text-stone-300 font-semibold tracking-wider">
                Formerly GANGA RAM &amp; Sons
              </span>
            </div>

            {/* Signature Rule Bar */}
            <span
              className="hero-badge-rule block h-[2px] w-14 bg-amber-500/70 origin-left"
              aria-hidden="true"
            />

            <h1 className="font-display font-light text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight uppercase leading-tight sm:leading-none">
              <span className="hero-title-line block">Timeless Elegance,</span>
              <span className="hero-title-line font-extrabold text-amber-500 block mt-1">
                Expertly Installed.
              </span>
            </h1>
            <p className="hero-subtext text-stone-300 text-sm sm:text-base max-w-xl font-medium leading-relaxed">
              Precision laying, diamond grinding, and specialized structural
              surface engineering across Italian marble, granite, and
              high-performance tiles for institutional and luxury spaces.
            </p>

            {/* CTA Buttons */}
            <div
              id="homeCTA"
              className="pt-2 sm:pt-4 flex flex-col sm:flex-row gap-3.5 sm:gap-4 w-full sm:w-auto opacity-100 pointer-events-auto z-30"
            >
              <Link
                href="/contact"
                className="w-full sm:w-auto text-center px-8 py-4 bg-amber-600 text-white text-xs font-extrabold uppercase tracking-widest hover:bg-amber-500 transition-all min-h-[48px] flex items-center justify-center rounded-sm shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-400 opacity-100 visible"
              >
                Request Consultation
              </Link>
              <Link
                href="/projects"
                className="w-full sm:w-auto text-center px-8 py-4 border border-stone-600 text-stone-200 text-xs font-extrabold uppercase tracking-widest hover:bg-stone-800 transition-colors min-h-[48px] flex items-center justify-center rounded-sm focus:outline-none focus:ring-2 focus:ring-stone-400 opacity-100 visible"
              >
                View Project Matrix
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* METRIC DATA ROW */}
      <section ref={statsRef} className="bg-amber-600 py-8 sm:py-12 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-item space-y-1 p-2">
              <p className="text-3xl sm:text-4xl font-extrabold tracking-tight flex justify-center items-center">
                <span className="stat-number" data-value={stat.numericValue}>
                  0
                </span>
                <span>{stat.suffix}</span>
              </p>
              <p className="text-xs tracking-wider font-bold uppercase text-amber-100">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* OVERVIEW SECTION */}
      <section
        ref={overviewRef}
        className="py-12 sm:py-20 lg:py-24 max-w-7xl mx-auto px-4 sm:px-8 md:px-12"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          <div className="lg:col-span-8 space-y-4 sm:space-y-6">
            <span className="overview-badge text-xs tracking-widest font-extrabold text-amber-600 uppercase block">
              Processing Excellence
            </span>
            <h2 className="overview-heading text-2xl sm:text-4xl font-extrabold text-stone-900 uppercase tracking-tight leading-tight">
              Decades of Craftsmanship in Premium Stone Architecture
            </h2>
            <p className="overview-text text-stone-600 text-sm sm:text-base leading-relaxed font-medium">
              We focus on structural polishing, chemical treatment, and seamless
              execution with a high-end finish for Italian marble, granites
              &amp; all types of tiles across commercial, government, and
              residential heritage spaces.
            </p>
            <div className="pt-2">
              <Link
                href="/about"
                className="overview-link group inline-flex items-center text-xs font-extrabold tracking-widest uppercase border-b-2 border-amber-600 pb-2 text-stone-900 hover:text-amber-600 transition-colors min-h-[44px]"
              >
                Discover Our Corporate Heritage{" "}
                <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 ml-1">
                  →
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
