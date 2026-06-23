// "use client";

// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import Image from "next/image";
// import { usePathname } from "next/navigation";

// const navigationMap = [
//   { label: "Company Profile", path: "/about" },
//   { label: "Projects", path: "/projects" },
//   { label: "Gallery", path: "/gallery" },
// ];

// export default function Navbar() {
//   const [isScrolled, setIsScrolled] = useState(false);
//   const [isDrawerOpen, setIsDrawerOpen] = useState(false);
//   const currentPath = usePathname();

//   useEffect(() => {
//     const checkScroll = () => setIsScrolled(window.scrollY > 30);
//     window.addEventListener("scroll", checkScroll);
//     return () => window.removeEventListener("scroll", checkScroll);
//   }, []);

//   return (
//     <header
//       className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
//         isScrolled
//           ? "bg-stone-900/95 backdrop-blur-md border-b border-white/5 py-4 shadow-xl text-white"
//           : "bg-white/90 backdrop-blur-sm md:bg-transparent py-6 text-slate-900 md:text-white"
//       }`}
//     >
//       <div className="max-w-7xl mx-auto px-6 sm:px-12 flex items-center justify-between">
//         {/* Logo */}
//         <Link href="/" className="flex items-center gap-3 group">
//           <Image
//             src="https://a-bconstruction.in/wp-content/uploads/2025/01/cropped-AB-Con-Logo-1-3-80x64.png"
//             alt="A&B Construction Logo"
//             width={40}
//             height={32}
//             className="object-contain filter brightness-100 group-hover:scale-105 transition-transform duration-300"
//             unoptimized
//           />
//           <span
//             className={`font-display font-extrabold text-sm tracking-[0.3em] uppercase transition-colors ${
//               isScrolled ? "text-white" : "text-dark-blue md:text-white"
//             }`}
//           >
//             A&amp;B{" "}
//             <span className="text-amber-500 font-light tracking-[0.15em] group-hover:text-amber-400">
//               CONSTRUCTION
//             </span>
//           </span>
//         </Link>

//         {/* Desktop Nav Matrix */}
//         <nav className="hidden md:flex items-center space-x-12">
//           {navigationMap.map((node) => {
//             const isTargetActive = currentPath === node.path;
//             return (
//               <Link
//                 key={node.path}
//                 href={node.path}
//                 className={`text-[11px] tracking-[0.2em] font-semibold uppercase transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:scale-x-0 after:bg-amber-400 after:transition-transform hover:after:scale-x-100 ${
//                   isScrolled
//                     ? isTargetActive
//                       ? "text-amber-400 font-bold"
//                       : "text-stone-300 hover:text-white"
//                     : isTargetActive
//                       ? "text-amber-500 font-bold"
//                       : "text-slate-700 md:text-stone-200 hover:text-dark-blue md:hover:text-white"
//                 }`}
//               >
//                 {node.label}
//               </Link>
//             );
//           })}
//         </nav>

//         {/* Action Button Trigger */}
//         <div className="hidden md:block">
//           <Link
//             href="/contact"
//             className="text-[10px] tracking-[0.2em] font-bold uppercase px-6 py-2.5 bg-amber-500 text-stone-950 hover:bg-stone-900 hover:text-white transition-all shadow-md duration-300"
//           >
//             Contact Us
//           </Link>
//         </div>

//         {/* Mobile Hamburg Trigger Toggle */}
//         <button
//           onClick={() => setIsDrawerOpen(!isDrawerOpen)}
//           className={`md:hidden p-2 transition-colors z-50 relative ${
//             isScrolled
//               ? "text-stone-300 hover:text-white"
//               : "text-slate-800 hover:text-black"
//           }`}
//           aria-label="Toggle Navigation"
//           aria-expanded={isDrawerOpen}
//         >
//           <div className="w-5 h-3.5 flex flex-col justify-between">
//             <span
//               className={`w-full h-px bg-current transition-transform duration-300 ${
//                 isDrawerOpen ? "rotate-45 translate-y-[6px]" : ""
//               }`}
//             />
//             <span
//               className={`w-3/4 h-px bg-current self-end transition-opacity duration-300 ${
//                 isDrawerOpen ? "opacity-0" : ""
//               }`}
//             />
//             <span
//               className={`w-full h-px bg-current transition-transform duration-300 ${
//                 isDrawerOpen ? "-rotate-45 -translate-y-[7px]" : ""
//               }`}
//             />
//           </div>
//         </button>
//       </div>

//       {/* Mobile Menu Drawer Overlay */}
//       <div
//         className={`fixed inset-y-0 right-0 w-full max-w-sm bg-stone-950 p-12 z-40 shadow-2xl transition-transform duration-500 border-l border-white/5 flex flex-col justify-between text-white ${
//           isDrawerOpen ? "translate-x-0" : "translate-x-full"
//         }`}
//       >
//         <div className="flex flex-col space-y-8 mt-16">
//           {navigationMap.map((node) => {
//             const isTargetActive = currentPath === node.path;
//             return (
//               <Link
//                 key={node.path}
//                 href={node.path}
//                 onClick={() => setIsDrawerOpen(false)}
//                 className={`font-display text-2xl tracking-wide transition-colors ${
//                   isTargetActive
//                     ? "text-amber-400 font-semibold"
//                     : "text-stone-300 hover:text-amber-400"
//                 }`}
//               >
//                 {node.label}
//               </Link>
//             );
//           })}
//         </div>

//         <div className="space-y-4">
//           <div className="h-px bg-white/5 w-full" />
//           <Link
//             href="/contact"
//             onClick={() => setIsDrawerOpen(false)}
//             className="w-full block text-center text-xs tracking-[0.2em] font-bold bg-amber-500 text-stone-950 uppercase py-4 transition-colors hover:bg-amber-400 shadow-lg"
//           >
//             Contact Us
//           </Link>
//         </div>
//       </div>
//     </header>
//   );
// }

"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const navigationMap = [
  { label: "Company Profile", path: "/about" },
  { label: "Projects", path: "/projects" },
  { label: "Gallery", path: "/gallery" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const currentPath = usePathname();

  useEffect(() => {
    const checkScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener("scroll", checkScroll);
    return () => window.removeEventListener("scroll", checkScroll);
  }, []);

  return (
    <>
      {/* 🏛️ MAIN NAVBAR HEADER */}
      <header
        className={`fixed top-0 left-0 w-full z-40 transition-all duration-500 ${
          isScrolled
            ? "bg-stone-900/95 backdrop-blur-md border-b border-white/5 py-4 shadow-xl text-white"
            : "bg-white/90 backdrop-blur-sm md:bg-transparent py-6 text-slate-900 md:text-white"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 sm:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <Image
              src="https://a-bconstruction.in/wp-content/uploads/2025/01/cropped-AB-Con-Logo-1-3-80x64.png"
              alt="A&B Construction Logo"
              width={40}
              height={32}
              className="object-contain filter brightness-100 group-hover:scale-105 transition-transform duration-300"
              unoptimized
            />
            <span
              className={`font-display font-extrabold text-sm tracking-[0.3em] uppercase transition-colors ${
                isScrolled ? "text-white" : "text-dark-blue md:text-white"
              }`}
            >
              A&amp;B{" "}
              <span className="text-amber-500 font-light tracking-[0.15em] group-hover:text-amber-400">
                CONSTRUCTION
              </span>
            </span>
          </Link>

          {/* Desktop Nav Matrix */}
          <nav className="hidden md:flex items-center space-x-12">
            {navigationMap.map((node) => {
              const isTargetActive = currentPath === node.path;
              return (
                <Link
                  key={node.path}
                  href={node.path}
                  className={`text-[11px] tracking-[0.2em] font-semibold uppercase transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:h-[1px] after:w-full after:scale-x-0 after:bg-amber-400 after:transition-transform hover:after:scale-x-100 ${
                    isScrolled
                      ? isTargetActive
                        ? "text-amber-400 font-bold"
                        : "text-stone-300 hover:text-white"
                      : isTargetActive
                        ? "text-amber-500 font-bold"
                        : "text-slate-700 md:text-stone-200 hover:text-dark-blue md:hover:text-white"
                  }`}
                >
                  {node.label}
                </Link>
              );
            })}
          </nav>

          {/* Action Button Trigger */}
          <div className="hidden md:block">
            <Link
              href="/contact"
              className="text-[10px] tracking-[0.2em] font-bold uppercase px-6 py-2.5 bg-amber-500 text-stone-950 hover:bg-stone-900 hover:text-white transition-all shadow-md duration-300"
            >
              Contact Us
            </Link>
          </div>

          {/* Dummy element to hold space when layout changes */}
          <div className="w-9 h-9 md:hidden" />
        </div>
      </header>

      {/* 🚀 INDEPENDENT FLOATING HAMBURGER TRIGGER (Fixed over overlay grids) */}
      <button
        onClick={() => setIsDrawerOpen(!isDrawerOpen)}
        className={`fixed top-5 right-6 md:hidden p-3 transition-colors z-[120] rounded-none ${
          isDrawerOpen
            ? "text-white"
            : isScrolled
              ? "text-stone-300 hover:text-white"
              : "text-slate-800 hover:text-black"
        }`}
        aria-label="Toggle Navigation"
        aria-expanded={isDrawerOpen}
      >
        <div className="w-5 h-3.5 flex flex-col justify-between">
          <span
            className={`w-full h-px bg-current transition-transform duration-300 ${
              isDrawerOpen ? "rotate-45 translate-y-[6px]" : ""
            }`}
          />
          <span
            className={`w-3/4 h-px bg-current self-end transition-opacity duration-300 ${
              isDrawerOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`w-full h-px bg-current transition-transform duration-300 ${
              isDrawerOpen ? "-rotate-45 -translate-y-[7px]" : ""
            }`}
          />
        </div>
      </button>

      {/* 🔮 1. ENTIRE SCREEN FULL BACKDROP BLUR MASK */}
      <div
        onClick={() => setIsDrawerOpen(false)}
        className={`fixed inset-0 bg-black/60 transition-all duration-300 md:hidden z-[90] ${
          isDrawerOpen
            ? "opacity-100 visible backdrop-blur-xl [webkit-backdrop-filter:blur(24px)]"
            : "opacity-0 invisible pointer-events-none backdrop-blur-none [webkit-backdrop-filter:none]"
        }`}
      />

      {/* 🏛️ 2. FIXED LINKS OVERLAY AREA ON TOP */}
      <div
        className={`fixed inset-y-0 right-0 w-full max-w-sm p-12 pb-24 z-[100] transition-transform duration-500 flex flex-col justify-between text-white md:hidden ${
          isDrawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex flex-col space-y-10 mt-32 text-center">
          {navigationMap.map((node) => {
            const isTargetActive = currentPath === node.path;
            return (
              <Link
                key={node.path}
                href={node.path}
                onClick={() => setIsDrawerOpen(false)}
                className={`font-display text-2xl font-bold uppercase tracking-[0.15em] transition-colors ${
                  isTargetActive
                    ? "text-amber-400"
                    : "text-stone-300 hover:text-amber-400"
                }`}
              >
                {node.label}
              </Link>
            );
          })}
        </div>

        {/* Contact Us link box bounds safe */}
        <div className="w-full mt-auto">
          <Link
            href="/contact"
            onClick={() => setIsDrawerOpen(false)}
            className="w-full block text-center text-xs tracking-[0.2em] font-bold bg-amber-500 text-stone-950 uppercase py-4 transition-colors hover:bg-stone-900 hover:text-white shadow-xl"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </>
  );
}
