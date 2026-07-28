"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navigationMap = [
  { label: "Company Profile", path: "/about" },
  { label: "Projects", path: "/projects" },
  { label: "Services", path: "/services" },
  { label: "Gallery", path: "/gallery" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const currentPath = usePathname();

  useEffect(() => {
    const checkScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", checkScroll);
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isDrawerOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-300 ${
          isScrolled
            ? "bg-stone-900/95 backdrop-blur-md border-b border-stone-800 py-3 shadow-xl text-white"
            : "bg-stone-50/90 backdrop-blur-md md:bg-transparent py-4 md:py-6 text-stone-900 md:text-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3 group min-h-[48px] focus:outline-none focus:ring-2 focus:ring-amber-500 rounded-sm p-1"
          >
            <Image
              src="https://a-bconstruction.in/wp-content/uploads/2025/01/cropped-AB-Con-Logo-1-3-80x64.png"
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
          <nav className="hidden md:flex items-center space-x-6 lg:space-x-10">
            {navigationMap.map((node) => {
              const isTargetActive = currentPath === node.path;
              return (
                <Link
                  key={node.path}
                  href={node.path}
                  className={`text-xs tracking-wider font-bold uppercase transition-colors relative py-2 min-h-[44px] flex items-center focus:outline-none focus:text-amber-500 ${
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

          <div className="hidden md:block">
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

      {/* Touch-Friendly Mobile Toggle */}
      <button
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
        <span className="text-xs font-bold uppercase tracking-wider">
          {isDrawerOpen ? "Close" : "Menu"}
        </span>
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

      {/* Drawer Overlay */}
      <div
        onClick={() => setIsDrawerOpen(false)}
        className={`fixed inset-0 bg-stone-950/80 transition-all duration-300 md:hidden z-[90] ${
          isDrawerOpen
            ? "opacity-100 visible backdrop-blur-sm"
            : "opacity-0 invisible pointer-events-none"
        }`}
      />

      {/* Drawer Content */}
      <div
        className={`fixed inset-y-0 right-0 w-[85%] max-w-sm bg-stone-900 p-6 pt-24 pb-12 z-[100] transition-transform duration-300 ease-out flex flex-col justify-between text-white md:hidden border-l border-stone-800 ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col space-y-3">
          <span className="text-xs uppercase font-extrabold tracking-widest text-amber-500 mb-2">
            Navigation
          </span>
          {navigationMap.map((node) => {
            const isTargetActive = currentPath === node.path;
            return (
              <Link
                key={node.path}
                href={node.path}
                onClick={() => setIsDrawerOpen(false)}
                className={`text-base font-bold uppercase tracking-wider py-3.5 px-4 rounded-sm transition-colors min-h-[48px] flex items-center ${
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
            className="w-full text-center text-xs tracking-widest font-extrabold bg-amber-600 text-white uppercase py-4 shadow-xl min-h-[50px] flex items-center justify-center rounded-sm hover:bg-amber-500"
          >
            Contact Us Today
          </Link>
          <p className="text-xs text-center text-stone-500 uppercase tracking-wider">
            A&amp;B Construction · Est. 1977
          </p>
        </div>
      </div>
    </>
  );
}
