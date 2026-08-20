"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

const navigationMap = [
  { label: "Home", path: "/" },
  { label: "Projects & Clients", path: "/projects" },
  { label: "Gallery", path: "/gallery" },
  { label: "Services", path: "/services" },
  { label: "About", path: "/about" },
];

export default function Navbar() {
  const containerRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLAnchorElement>(null);
  const desktopNavRef = useRef<HTMLElement>(null);
  const desktopCtaRef = useRef<HTMLDivElement>(null);
  const mobileToggleButtonRef = useRef<HTMLButtonElement>(null);
  const mobileDrawerOverlayRef = useRef<HTMLDivElement>(null);
  const mobileDrawerRef = useRef<HTMLDivElement>(null);

  // Reference to hold mobile drawer animation timeline
  const drawerTl = useRef<gsap.core.Timeline | null>(null);

  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const currentPath = usePathname();

  useEffect(() => {
    const checkScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", checkScroll);
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isDrawerOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isDrawerOpen]);

  // GSAP Animation Start: Initial Entrance & Mobile Drawer Setup
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // Fallback for prefers-reduced-motion
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          [
            headerRef.current,
            logoRef.current,
            ".desktop-nav-item",
            desktopCtaRef.current,
            mobileToggleButtonRef.current,
          ],
          { opacity: 1, y: 0, x: 0, scale: 1 },
        );
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        // 1. Desktop Initial Load Entrance Sequence
        const introTl = gsap.timeline({ defaults: { ease: "power3.out" } });

        introTl
          .fromTo(
            headerRef.current,
            { yPercent: -100 },
            { yPercent: 0, duration: 0.8 },
          )
          .fromTo(
            logoRef.current,
            { opacity: 0, x: -30 },
            { opacity: 1, x: 0, duration: 0.5 },
            "-=0.4",
          )
          .fromTo(
            ".desktop-nav-item",
            { opacity: 0, y: -15 },
            {
              opacity: 1,
              y: 0,
              duration: 0.4,
              stagger: 0.08,
            },
            "-=0.3",
          )
          .fromTo(
            desktopCtaRef.current,
            { opacity: 0, scale: 0.85 },
            { opacity: 1, scale: 1, duration: 0.4 },
            "-=0.2",
          )
          .fromTo(
            mobileToggleButtonRef.current,
            { opacity: 0, scale: 0.8 },
            { opacity: 1, scale: 1, duration: 0.4 },
            "-=0.5",
          );

        // 2. Mobile Drawer Sequence
        drawerTl.current = gsap
          .timeline({ paused: true })
          .to(mobileDrawerOverlayRef.current, {
            autoAlpha: 1,
            duration: 0.3,
            ease: "power2.out",
          })
          .to(
            mobileDrawerRef.current,
            {
              x: "0%",
              duration: 0.5,
              ease: "back.out(0.8)",
            },
            "-=0.2",
          )
          .fromTo(
            ".mobile-nav-item",
            { opacity: 0, x: 30 },
            {
              opacity: 1,
              x: 0,
              duration: 0.35,
              stagger: 0.06,
              ease: "power2.out",
            },
            "-=0.25",
          )
          .fromTo(
            ".mobile-cta-btn",
            { opacity: 0, y: 20 },
            {
              opacity: 1,
              y: 0,
              duration: 0.3,
              ease: "power2.out",
            },
            "-=0.1",
          );
      });

      return () => mm.revert();
    },
    { scope: containerRef },
  );
  // GSAP Animation End: Initial Entrance & Mobile Drawer Setup

  // Trigger Mobile Drawer Animation on state toggle
  useEffect(() => {
    if (!drawerTl.current) return;
    if (isDrawerOpen) {
      drawerTl.current.play();
    } else {
      drawerTl.current.reverse();
    }
  }, [isDrawerOpen]);

  // GSAP Animation Start: Magnetic Button Interactive Hover Effect
  const { contextSafe } = useGSAP({ scope: containerRef });

  const handleMagneticMove = contextSafe(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (
        !desktopCtaRef.current ||
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
      )
        return;
      const rect = desktopCtaRef.current.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      gsap.to(desktopCtaRef.current, {
        x: x * 0.25,
        y: y * 0.25,
        duration: 0.3,
        ease: "power2.out",
      });
    },
  );

  const handleMagneticLeave = contextSafe(() => {
    if (!desktopCtaRef.current) return;
    gsap.to(desktopCtaRef.current, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: "elastic.out(1, 0.4)",
    });
  });
  // GSAP Animation End: Magnetic Button Interactive Hover Effect

  return (
    <div ref={containerRef}>
      <header
        ref={headerRef}
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-stone-900/95 backdrop-blur-md border-b border-stone-800 py-3 shadow-xl text-white"
            : "bg-stone-50/90 backdrop-blur-md md:bg-transparent py-4 md:py-6 text-stone-900 md:text-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 flex items-center justify-between">
          <Link
            ref={logoRef}
            href="/"
            className="flex items-center gap-3 group min-h-[48px] focus:outline-none focus:ring-2 focus:ring-amber-500 rounded-sm p-1"
          >
            <Image
              src="/icon1.png"
              alt="A&B Construction Logo"
              width={38}
              height={30}
              className="object-contain filter brightness-100 group-hover:scale-105 transition-transform duration-300"
              unoptimized
              priority
            />
            <span
              className={`font-display font-extrabold text-sm sm:text-base tracking-wider uppercase transition-colors ${
                isScrolled ? "text-white" : "text-stone-900 md:text-white"
              }`}
            >
              A&amp;B{" "}
              <span className="text-amber-600 md:text-amber-500 font-light tracking-normal group-hover:text-amber-400">
                CONSTRUCTION
              </span>
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav
            ref={desktopNavRef}
            className="hidden md:flex items-center space-x-6 lg:space-x-10"
          >
            {navigationMap
              .filter((node) => node.path !== "/")
              .map((node) => {
                const isTargetActive = currentPath === node.path;
                return (
                  <Link
                    key={node.path}
                    href={node.path}
                    className={`desktop-nav-item text-xs tracking-wider font-bold uppercase transition-colors relative py-2 min-h-[44px] flex items-center focus:outline-none focus:text-amber-500 ${
                      isScrolled
                        ? isTargetActive
                          ? "text-amber-400 font-extrabold border-b-2 border-amber-400"
                          : "text-stone-300 hover:text-white"
                        : isTargetActive
                          ? "text-amber-600 md:text-amber-400 font-extrabold border-b-2 border-amber-500"
                          : "text-stone-700 md:text-stone-200 hover:text-stone-900 md:hover:text-white"
                    }`}
                  >
                    {node.label}
                  </Link>
                );
              })}
          </nav>

          <div
            ref={desktopCtaRef}
            onMouseMove={handleMagneticMove}
            onMouseLeave={handleMagneticLeave}
            className="hidden md:block transform-gpu"
          >
            <Link
              href="/contact"
              className="text-xs tracking-widest font-extrabold uppercase px-6 py-3 bg-amber-600 text-white hover:bg-stone-900 border border-amber-600 hover:border-amber-500 transition-all shadow-md inline-flex items-center justify-center min-h-[48px] rounded-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              Contact Us
            </Link>
          </div>

          <div className="w-10 h-10 md:hidden" />
        </div>
      </header>

      {/* Touch-Friendly Mobile Toggle Button */}
      <button
        ref={mobileToggleButtonRef}
        onClick={() => setIsDrawerOpen(!isDrawerOpen)}
        className={`fixed top-3.5 right-4 md:hidden px-3 py-2 transition-colors z-[120] rounded-sm min-w-[48px] min-h-[48px] flex items-center justify-center gap-2 border ${
          isDrawerOpen
            ? "text-white border-stone-700 bg-stone-900"
            : isScrolled
              ? "text-stone-200 border-stone-700 bg-stone-900"
              : "text-stone-900 border-stone-300 bg-white"
        }`}
        aria-label="Toggle Navigation Menu"
        aria-expanded={isDrawerOpen}
      >
        <div className="w-4 h-3 flex flex-col justify-between">
          <span
            className={`w-full h-0.5 bg-current transition-transform duration-300 ${
              isDrawerOpen ? "rotate-45 translate-y-[5px]" : ""
            }`}
          />
          <span
            className={`w-full h-0.5 bg-current transition-opacity duration-300 ${
              isDrawerOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-full h-0.5 bg-current transition-transform duration-300 ${
              isDrawerOpen ? "-rotate-45 -translate-y-[5px]" : ""
            }`}
          />
        </div>
      </button>

      {/* Mobile Drawer Overlay */}
      <div
        ref={mobileDrawerOverlayRef}
        onClick={() => setIsDrawerOpen(false)}
        className="fixed inset-0 bg-stone-950/80 backdrop-blur-sm md:hidden z-[90] opacity-0 invisible"
      />

      {/* Mobile Drawer Content */}
      <div
        ref={mobileDrawerRef}
        className="fixed inset-y-0 right-0 w-[85%] max-w-sm bg-stone-900 p-6 pt-24 pb-12 z-[100] translate-x-full flex flex-col justify-between text-white md:hidden border-l border-stone-800"
      >
        <div className="flex flex-col space-y-3">
          {navigationMap.map((node) => {
            const isTargetActive = currentPath === node.path;
            return (
              <Link
                key={node.path}
                href={node.path}
                onClick={() => setIsDrawerOpen(false)}
                className={`mobile-nav-item text-base font-bold uppercase tracking-wider py-3.5 px-4 rounded-sm transition-colors min-h-[48px] flex items-center ${
                  isTargetActive
                    ? "bg-stone-800 text-amber-400 border-l-4 border-amber-500"
                    : "text-stone-300 hover:text-amber-400 hover:bg-stone-800/50"
                }`}
              >
                {node.label}
              </Link>
            );
          })}
        </div>

        <div className="w-full space-y-4 pt-6 border-t border-stone-800">
          <Link
            href="/contact"
            onClick={() => setIsDrawerOpen(false)}
            className="mobile-cta-btn w-full text-center text-xs tracking-widest font-extrabold bg-amber-600 text-white uppercase py-4 shadow-xl min-h-[50px] flex items-center justify-center rounded-sm hover:bg-amber-500"
          >
            Contact Us Today
          </Link>
          <p className="text-xs text-center text-stone-500 uppercase tracking-wider">
            A&amp;B Construction · Est. 1977
          </p>
        </div>
      </div>
    </div>
  );
}
