"use client";

import React, { useEffect, useState, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { supabase } from "@/lib/supabase";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface PartnerItem {
  id: number | string;
  company_name: string;
  logo_url: string | null;
}

const PRIORITY_ENTERPRISES = [
  "CENTRAL VISTA",
  "AIIMS",
  "DLF",
  "AHLUWALIA",
  "SHAPOORJI",
  "ANSAL",
  "BHARGAVA",
  "TARAPORE",
  "H.S. NAG",
  "H S NAG",
];

export default function InstitutionalClientsGrid() {
  const containerRef = useRef<HTMLElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  const [partners, setPartners] = useState<PartnerItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPartners() {
      try {
        setLoading(true);
        const bucketName = "partner-logos";

        const { data: dbPartners, error: dbError } = await supabase
          .from("partner_logos")
          .select("*")
          .order("id", { ascending: true });

        if (dbError) throw dbError;

        if (dbPartners) {
          const pathList: string[] = [];
          const partnerPathsMap: { id: string | number; fullPath: string }[] =
            [];

          await Promise.all(
            dbPartners.map(async (partner: any) => {
              const folderName = partner.company_name.toUpperCase().trim();
              const { data: files } = await supabase.storage
                .from(bucketName)
                .list(folderName, { limit: 5 });

              if (files && files.length > 0) {
                const validFiles = files.filter(
                  (f) =>
                    f.name !== ".emptyFolderPlaceholder" &&
                    !f.name.startsWith("."),
                );
                if (validFiles.length > 0) {
                  const fullPath = `${folderName}/${validFiles[0].name}`;
                  pathList.push(fullPath);
                  partnerPathsMap.push({ id: partner.id, fullPath });
                }
              }
            }),
          );

          let signedMap: Record<string, string> = {};
          if (pathList.length > 0) {
            const { data: signedData } = await supabase.storage
              .from(bucketName)
              .createSignedUrls(pathList, 3600);

            if (signedData) {
              signedData.forEach((item) => {
                if (item.path && item.signedUrl) {
                  signedMap[item.path] = item.signedUrl;
                }
              });
            }
          }

          const rawPartners = dbPartners.map((partner: any) => {
            const match = partnerPathsMap.find((m) => m.id === partner.id);
            const logoUrl = match ? signedMap[match.fullPath] || null : null;

            return {
              id: partner.id,
              company_name: partner.company_name,
              logo_url: logoUrl,
            };
          });

          const sortedPartners = [...rawPartners].sort((a, b) => {
            const nameA = a.company_name.toUpperCase();
            const nameB = b.company_name.toUpperCase();

            const indexA = PRIORITY_ENTERPRISES.findIndex((p) =>
              nameA.includes(p),
            );
            const indexB = PRIORITY_ENTERPRISES.findIndex((p) =>
              nameB.includes(p),
            );

            if (indexA !== -1 && indexB !== -1) return indexA - indexB;
            if (indexA !== -1) return -1;
            if (indexB !== -1) return 1;

            return nameA.localeCompare(nameB);
          });

          setPartners(sortedPartners);
        }
      } catch (err) {
        console.error("Institutional clients fetch error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchPartners();
  }, []);

  // Grid reveal: one-shot stagger, not scroll-scrubbed — this is a simple
  // "arrive once" moment, not a scroll-driven story, so scrub would only
  // make it feel laggy on a fast scroll.
  useGSAP(
    () => {
      if (loading || partners.length === 0) return;

      const mm = gsap.matchMedia();

      // 1. Accessibility: Instant render for users preferring reduced motion
      mm.add("(prefers-reduced-motion: reduce)", () => {
        gsap.set(".client-card-anim", { opacity: 1, y: 0, filter: "none" });
      });

      // 2. Ultra-Smooth Scrubbed Entrance
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.fromTo(
          ".client-card-anim",
          {
            opacity: 0,
            y: 40,
          },
          {
            opacity: 1,
            y: 0,
            stagger: 0.2,
            ease: "linear", 
            scrollTrigger: {
              trigger: gridRef.current,
              start: "top 85%", //
              end: "top 35%", //
              scrub: 1.5,
              markers: true,
            },
          },
        );
      });

      // 3. Handle dynamic height changes after async images / signed URLs load
      const refreshId = requestAnimationFrame(() => ScrollTrigger.refresh());

      return () => {
        cancelAnimationFrame(refreshId);
        mm.revert(); // Automatically cleans up matchMedia, tweens, and scrollTriggers
      };
    },
    { dependencies: [loading, partners], scope: containerRef },
  );

  if (loading) {
    return (
      <section className="bg-stone-950 py-12 sm:py-20 border-y border-stone-800/80 text-white font-sans">
        <style jsx>{`
          @keyframes shimmer {
            0% {
              background-position: -200% 0;
            }
            100% {
              background-position: 200% 0;
            }
          }
          .shimmer {
            background-image: linear-gradient(
              100deg,
              rgba(41, 37, 36, 0.6) 30%,
              rgba(120, 113, 108, 0.35) 50%,
              rgba(41, 37, 36, 0.6) 70%
            );
            background-size: 200% 100%;
            animation: shimmer 1.6s ease-in-out infinite;
          }
          @media (prefers-reduced-motion: reduce) {
            .shimmer {
              animation: none;
            }
          }
        `}</style>
        <div className="max-w-7xl mx-auto px-4 sm:px-8 text-center mb-10">
          <div className="shimmer h-3 w-36 mx-auto rounded mb-3" />
          <div className="shimmer h-8 w-64 sm:w-80 mx-auto rounded" />
        </div>
        <div className="max-w-7xl mx-auto px-3 sm:px-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-5">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((idx) => (
            <div
              key={idx}
              className="shimmer min-h-[220px] rounded-lg border border-stone-800"
            />
          ))}
        </div>
      </section>
    );
  }

  if (partners.length === 0) return null;

  return (
    <section
      ref={containerRef}
      className="bg-stone-950 py-12 sm:py-20 border-y border-stone-800/80 text-white font-sans select-none relative w-full overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-8 text-center mb-10 sm:mb-14">
        <span className="text-amber-500 text-[10px] sm:text-xs tracking-[0.25em] font-extrabold uppercase block mb-2">
          Institutional Portfolio
        </span>
        <span
          className="inline-block h-[2px] w-14 bg-amber-500/70 mb-4"
          aria-hidden="true"
        />
        <h2 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
          Trusted Partners &amp; Clients
        </h2>
        <p className="text-stone-400 text-xs sm:text-sm max-w-xl mx-auto mt-2.5 font-normal leading-relaxed px-2">
          Pioneering structural stone &amp; marble installations across India's
          premier government and corporate infrastructure projects.
        </p>
      </div>

      <div className="max-w-7xl mx-auto px-3 sm:px-6 md:px-8">
        <div
          ref={gridRef}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3 sm:gap-5 items-stretch"
        >
          {partners.map((client) => (
            <ClientBrandCard
              key={client.id}
              name={client.company_name}
              logo={client.logo_url}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function ClientBrandCard({
  name,
  logo,
}: {
  name: string;
  logo: string | null;
}) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="client-card-anim group relative flex flex-col justify-between w-full min-h-[220px] sm:min-h-[250px] p-3.5 sm:p-4 bg-stone-900/90 hover:bg-stone-900 border border-stone-800 hover:border-amber-500/80 rounded-lg shadow-md hover:shadow-[0_10px_24px_rgba(217,119,6,0.2)] transition-all duration-300 transform hover:-translate-y-1 active:scale-[0.98]">
      {/* Top Accent Bar */}
      <div className="w-6 sm:w-8 h-[2px] bg-stone-700 group-hover:bg-amber-500 group-hover:w-12 transition-all duration-300 rounded-full mb-2" />

      {/* Center Image Container */}
      <div className="relative w-full h-28 sm:h-32 flex items-center justify-center p-2 rounded bg-white transition-colors duration-300 overflow-hidden shrink-0">
        {logo && !hasError ? (
          <Image
            src={logo}
            alt={name}
            fill
            loading="lazy"
            onError={() => setHasError(true)}
            className="object-contain p-2 filter transition-all duration-300 ease-out group-hover:scale-[1.04]"
            unoptimized
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-stone-800">
            <span className="sm:text-lg font-black text-center text-amber-600">
              {name}
            </span>
          </div>
        )}
      </div>

      {/* Bottom Text Block */}
      <div className="w-full text-center mt-3 pt-1 flex flex-col justify-center flex-1">
        <h3 className="text-[11px] sm:text-xs font-extrabold uppercase tracking-wide text-stone-200 group-hover:text-amber-400 transition-colors break-words whitespace-normal leading-snug">
          {name}
        </h3>
        <span className="text-[8px] sm:text-[9px] uppercase font-bold tracking-widest text-stone-500 block mt-1">
          Enterprise Client
        </span>
      </div>
    </div>
  );
}
