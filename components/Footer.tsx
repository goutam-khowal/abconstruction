"use client";

import React, { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  // GSAP Animation Start: Footer Reveal Sequence
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(
          [
            ".footer-brand-block",
            ".footer-rule-line",
            ".footer-nav-item",
            ".footer-bottom-bar",
          ],
          { opacity: 1, y: 0, scaleX: 1 },
        );
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        });

        tl.fromTo(
          ".footer-brand-block",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
        )
          .fromTo(
            ".footer-rule-line",
            { scaleX: 0 },
            { scaleX: 1, duration: 0.5, ease: "expo.out" },
            "-=0.3",
          )
          .fromTo(
            ".footer-nav-item",
            { opacity: 0, x: -10 },
            {
              opacity: 1,
              x: 0,
              duration: 0.4,
              stagger: 0.05,
              ease: "power2.out",
            },
            "-=0.3",
          )
          .fromTo(
            ".footer-bottom-bar",
            { opacity: 0, y: 15 },
            { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" },
            "-=0.2",
          );
      });

      return () => mm.revert();
    },
    { scope: footerRef },
  );
  // GSAP Animation End: Footer Reveal Sequence

  // GSAP Animation Start: Link Hover Micro-interaction
  const { contextSafe } = useGSAP({ scope: footerRef });

  const handleLinkMouseEnter = contextSafe(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.to(e.currentTarget, {
        x: 6,
        duration: 0.2,
        ease: "power2.out",
      });
    },
  );

  const handleLinkMouseLeave = contextSafe(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      gsap.to(e.currentTarget, {
        x: 0,
        duration: 0.2,
        ease: "power2.out",
      });
    },
  );
  // GSAP Animation End: Link Hover Micro-interaction

  return (
    <footer
      ref={footerRef}
      className="bg-stone-950 border-t border-stone-800 pt-12 sm:pt-16 pb-8 text-stone-400 font-sans"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          <div className="footer-brand-block md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <Image
                src="https://a-bconstruction.in/wp-content/uploads/2025/01/cropped-AB-Con-Logo-1-3-80x64.png"
                alt="A&B Construction Logo"
                width={38}
                height={30}
                className="object-contain"
                unoptimized
              />
              <span className="font-extrabold text-sm tracking-wider text-white uppercase">
                A&amp;B{" "}
                <span className="text-amber-500 font-light">CONSTRUCTION</span>
              </span>
            </div>
            <p className="text-amber-500/90 text-xs tracking-wider uppercase font-extrabold">
              Formerly GANGA RAM &amp; Sons
            </p>
            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed max-w-sm font-medium">
              Expert laying, diamond polishing, and stone cladding across India
              since 1977.
            </p>
          </div>

          <div>
            <h4 className="text-xs tracking-widest uppercase text-stone-300 font-extrabold mb-2">
              Navigation
            </h4>
            <span
              className="footer-rule-line block h-[2px] w-12 bg-amber-500/70 origin-left mb-4"
              aria-hidden="true"
            />
            <ul className="space-y-2 text-xs font-bold uppercase">
              {[
                { label: "Home", path: "/" },
                { label: "Projects & Clients", path: "/projects" },
                { label: "Gallery", path: "/gallery" },
                { label: "Services", path: "/services" },
                { label: "About Us", path: "/about" },
                { label: "Contact Us", path: "/contact" },
              ].map((item) => (
                <li key={item.path} className="footer-nav-item">
                  <Link
                    href={item.path}
                    onMouseEnter={handleLinkMouseEnter}
                    onMouseLeave={handleLinkMouseLeave}
                    className="text-stone-400 hover:text-amber-400 py-1 inline-flex items-center min-h-[36px] transition-colors duration-200"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="footer-bottom-bar border-t border-stone-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 uppercase font-semibold">
          <p>
            © {new Date().getFullYear()} A&amp;B Construction. All Rights
            Reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="mailto:contact@abconstructions.co.in"
              className="hover:text-amber-400 transition-colors duration-200"
            >
              Email
            </a>
            <a
              href="https://www.instagram.com/abconstruction1977"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-400 transition-colors duration-200"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
