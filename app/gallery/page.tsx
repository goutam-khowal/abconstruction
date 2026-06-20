"use client";

import React, { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";

const galleryProjects = [
  {
    title: "AIIMS New Delhi",
    images: [
      {
        src: "https://a-bconstruction.in/wp-content/uploads/2025/02/20210108_173541_Original-scaled.jpeg",
        alt: "AIIMS New Delhi — marble flooring installation 1",
      },
      {
        src: "https://a-bconstruction.in/wp-content/uploads/2025/02/20210108_173753_Original-scaled.jpeg",
        alt: "AIIMS New Delhi — marble flooring installation 2",
      },
      {
        src: "https://a-bconstruction.in/wp-content/uploads/2025/02/20210108_173525_Original-scaled.jpeg",
        alt: "AIIMS New Delhi — stone surface 3",
      },
      {
        src: "https://a-bconstruction.in/wp-content/uploads/2025/02/20210108_174138_Original-scaled.jpeg",
        alt: "AIIMS New Delhi — installation 4",
      },
      {
        src: "https://a-bconstruction.in/wp-content/uploads/2025/02/20210108_173611_Original-scaled.jpeg",
        alt: "AIIMS New Delhi — installation 5",
      },
      {
        src: "https://a-bconstruction.in/wp-content/uploads/2025/02/20210108_174142_Original-scaled.jpeg",
        alt: "AIIMS New Delhi — installation 6",
      },
    ],
  },
  {
    title: "Central Vista Project New Delhi",
    images: [
      {
        src: "https://a-bconstruction.in/wp-content/uploads/2025/02/IMG_0054-scaled.jpeg",
        alt: "Central Vista New Delhi — stone work 1",
      },
      {
        src: "https://a-bconstruction.in/wp-content/uploads/2025/02/IMG_0395-scaled.jpeg",
        alt: "Central Vista New Delhi — stone work 2",
      },
      {
        src: "https://a-bconstruction.in/wp-content/uploads/2025/02/IMG_0396-scaled.jpeg",
        alt: "Central Vista New Delhi — installation 3",
      },
      {
        src: "https://a-bconstruction.in/wp-content/uploads/2025/02/IMG_0028-scaled.jpeg",
        alt: "Central Vista New Delhi — marble laying 4",
      },
      {
        src: "https://a-bconstruction.in/wp-content/uploads/2025/02/IMG_0394-scaled.jpeg",
        alt: "Central Vista New Delhi — flooring 5",
      },
      {
        src: "https://a-bconstruction.in/wp-content/uploads/2025/02/IMG_0050-scaled.jpeg",
        alt: "Central Vista New Delhi — installation 6",
      },
    ],
  },
  {
    title: "Nacin Academy Palasamudra (A.P.)",
    images: [
      {
        src: "https://a-bconstruction.in/wp-content/uploads/2025/02/IMG_3207-scaled.jpeg",
        alt: "Nacin Academy Palasamudra — marble installation 1",
      },
      {
        src: "https://a-bconstruction.in/wp-content/uploads/2025/02/IMG_2552-scaled.jpeg",
        alt: "Nacin Academy Palasamudra — stone flooring 2",
      },
      {
        src: "https://a-bconstruction.in/wp-content/uploads/2025/02/IMG_1519-scaled.jpeg",
        alt: "Nacin Academy Palasamudra — surface installation 3",
      },
      {
        src: "https://a-bconstruction.in/wp-content/uploads/2025/02/IMG_1523-scaled.jpeg",
        alt: "Nacin Academy Palasamudra — installation 4",
      },
      {
        src: "https://a-bconstruction.in/wp-content/uploads/2025/02/20210108_173641_Original-scaled-1.jpeg",
        alt: "Nacin Academy Palasamudra — marble work 5",
      },
      {
        src: "https://a-bconstruction.in/wp-content/uploads/2025/02/IMG_1979-scaled.jpeg",
        alt: "Nacin Academy Palasamudra — installation 6",
      },
    ],
  },
];

export default function GalleryPage() {
  const [visibleCount, setVisibleCount] = useState(1); // Staging chunks sequentially
  const [isPending, startTransition] = useTransition();

  const handleLoadMore = () => {
    startTransition(async () => {
      // Simulating realistic dynamic asset streaming delay for skeleton layout check
      await new Promise((resolve) => setTimeout(resolve, 800));
      setVisibleCount((prev) => prev + 1);
    });
  };

  return (
    <>
      {/* Editorial Corporate Header */}
      <section className="relative min-h-[50vh] flex items-center bg-dark-blue text-white pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-r from-darker-blue via-dark-blue/80 to-transparent z-10" />
        <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-12 w-full">
          <span className="text-brand-blue text-[11px] tracking-[0.35em] font-black uppercase block mb-3">
            Media Lookbook Portfolio
          </span>
          <h1 className="text-4xl sm:text-6xl font-light tracking-tight text-white uppercase leading-none">
            Exquisite Surface <br />
            <span className="font-extrabold text-transparent webkit-text-stroke">
              Installations.
            </span>
          </h1>
        </div>
      </section>

      {/* Main Container */}
      <div className="bg-ice py-12">
        {galleryProjects.slice(0, visibleCount).map((project, pIdx) => (
          <section
            key={project.title}
            className="py-12 max-w-7xl mx-auto px-6 sm:px-12 animate-fade-in"
          >
            <div className="flex items-center gap-4 mb-8">
              <span className="w-8 h-0.5 bg-brand-blue" />
              <h2 className="text-xl font-bold uppercase tracking-wider text-dark-blue">
                {project.title}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {project.images.map((img, iIdx) => (
                <div
                  key={iIdx}
                  className="relative aspect-square overflow-hidden bg-white border border-slate-200/60 shadow-sm group"
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    sizes="(max-w-7xl) 33vw, 100vw"
                    className="object-cover group-hover:scale-102 transition-all duration-700 filter brightness-95 group-hover:brightness-100"
                    unoptimized
                  />
                </div>
              ))}
            </div>
          </section>
        ))}

        {/* Dynamic Skeleton Loader Trigger Configuration */}
        {isPending && (
          <div className="max-w-7xl mx-auto px-6 sm:px-12 py-12 space-y-6">
            <div className="flex items-center gap-4 animate-pulse">
              <div className="w-8 h-0.5 bg-slate-300" />
              <div className="h-4 bg-slate-300 w-48" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((n) => (
                <div
                  key={n}
                  className="aspect-square bg-slate-200 animate-pulse border border-slate-300/40"
                />
              ))}
            </div>
          </div>
        )}

        {/* Interactive Staging Controls */}
        {visibleCount < galleryProjects.length && !isPending && (
          <div className="text-center py-16">
            <button
              onClick={handleLoadMore}
              type="button"
              className="px-10 py-4 bg-brand-blue text-white text-xs font-bold tracking-[0.2em] uppercase hover:bg-brand-hover transition-all shadow-md shadow-brand-blue/10"
            >
              Load More Projects
            </button>
          </div>
        )}
      </div>

      {/* Corporate Final Row CTA */}
      <section className="py-24 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-6 sm:px-12 text-center space-y-6">
          <h2 className="text-3xl font-extrabold text-dark-blue tracking-tight uppercase">
            Ready to Transform Your Space?
          </h2>
          <p className="text-slate-600 text-sm font-medium max-w-lg mx-auto leading-relaxed">
            Get in touch with our institutional engineering layout support desk
            for strategic B2B material consultation.
          </p>
          <div className="pt-4">
            <Link
              href="/contact"
              className="inline-block px-10 py-4 bg-dark-blue text-white text-xs tracking-[0.2em] font-bold uppercase hover:bg-black transition-all"
            >
              Contact Us Today
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
