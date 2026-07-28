"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

interface PartnerLogoItem {
  id: number | string;
  company_name: string;
  logo_url: string | null;
}

export default function PartnerMarquee() {
  const [partners, setPartners] = useState<PartnerLogoItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCardId, setActiveCardId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchPartnersWithGalleryPattern() {
      try {
        setLoading(true);
        const bucketName = "partner-logos";

        const { data: dbPartners, error: dbError } = await supabase
          .from("partner_logos")
          .select("*")
          .order("id", { ascending: true });

        if (dbError) throw dbError;

        if (dbPartners) {
          const mappedPartners = await Promise.all(
            dbPartners.map(async (partner: any) => {
              const folderName = partner.company_name.toUpperCase().trim();

              const { data: files, error: storageError } =
                await supabase.storage
                  .from(bucketName)
                  .list(folderName, { limit: 10 });

              if (storageError || !files || files.length === 0) {
                return {
                  id: partner.id,
                  company_name: partner.company_name,
                  logo_url: null,
                };
              }

              const validFiles = files.filter(
                (f) => f.name !== ".emptyFolderPlaceholder",
              );

              if (validFiles.length === 0) {
                return {
                  id: partner.id,
                  company_name: partner.company_name,
                  logo_url: null,
                };
              }

              const logoFile = validFiles[0];
              const {
                data: { publicUrl },
              } = supabase.storage
                .from(bucketName)
                .getPublicUrl(`${folderName}/${logoFile.name}`);

              return {
                id: partner.id,
                company_name: partner.company_name,
                logo_url: publicUrl,
              };
            }),
          );

          setPartners(mappedPartners);
        }
      } catch (err) {
        console.error("Critical partner logo gallery pattern error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchPartnersWithGalleryPattern();
  }, []);

  const topStripData = partners.filter((_, idx) => idx % 2 === 0);
  const bottomStripData = partners.filter((_, idx) => idx % 2 !== 0);

  if (loading) {
    return (
      <section className="bg-slate-950 py-20 border-y border-slate-800 text-white font-sans select-none">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 mb-12 text-center animate-pulse">
          <div className="h-3 w-32 bg-slate-800 mx-auto rounded mb-3" />
          <div className="h-8 w-72 bg-slate-800 mx-auto rounded" />
        </div>
        <div className="flex gap-6 overflow-hidden px-6 opacity-30">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="w-48 sm:w-56 h-24 bg-slate-900 border border-slate-800 rounded-xl shrink-0 animate-pulse"
            />
          ))}
        </div>
      </section>
    );
  }

  if (partners.length === 0) return null;

  return (
    <>
      <style jsx global>{`
        @keyframes marqueeLtr {
          0% {
            transform: translateX(0%);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        @keyframes marqueeRtl {
          0% {
            transform: translateX(-50%);
          }
          100% {
            transform: translateX(0%);
          }
        }
        .live-marquee-ltr {
          display: flex;
          width: max-content;
          animation: marqueeLtr 70s linear infinite;
        }
        .live-marquee-rtl {
          display: flex;
          width: max-content;
          animation: marqueeRtl 70s linear infinite;
        }

        /* Desktop hover-only pause */
        @media (hover: hover) and (pointer: fine) {
          .live-marquee-ltr:hover,
          .live-marquee-rtl:hover {
            animation-play-state: paused !important;
          }
        }

        /* Mobile touch pause state */
        .marquee-paused {
          animation-play-state: paused !important;
        }

        /* 🔒 PREVENT MOBILE LONG-PRESS CALLOUT POPUP GLOBAL RULE */
        .no-touch-callout {
          -webkit-touch-callout: none !important;
          -webkit-user-select: none !important;
          user-select: none !important;
        }
      `}</style>

      <section className="bg-slate-950 py-20 overflow-hidden border-y border-slate-800 text-white font-sans select-none no-touch-callout">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 mb-12 text-center">
          <span className="text-brand-blue text-[10px] sm:text-xs tracking-[0.3em] font-black uppercase block mb-2">
            CLIENT PORTFOLIO
          </span>
          <h2 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
            TRUSTED PARTNERS &amp; CLIENTS
          </h2>
        </div>

        <div className="relative w-full space-y-12 overflow-visible before:absolute before:left-0 before:top-0 before:z-20 before:h-full before:w-20 sm:before:w-40 before:bg-gradient-to-r before:from-slate-950 before:to-transparent before:pointer-events-none after:absolute after:right-0 after:top-0 after:z-20 after:h-full after:w-20 sm:after:w-40 after:bg-gradient-to-l after:from-slate-950 after:to-transparent after:pointer-events-none">
          {/* Strip 1: Left to Right */}
          <div className="flex w-full overflow-visible py-4">
            <div
              className={`live-marquee-ltr ${
                activeCardId?.startsWith("top-") ? "marquee-paused" : ""
              }`}
            >
              {[...topStripData, ...topStripData, ...topStripData].map(
                (company, index) => {
                  const cardId = `top-${index}`;
                  return (
                    <div key={cardId} className="pr-8">
                      <LogoMarqueeCard
                        id={cardId}
                        name={company.company_name}
                        logo={company.logo_url}
                        activeCardId={activeCardId}
                        setActiveCardId={setActiveCardId}
                      />
                    </div>
                  );
                },
              )}
            </div>
          </div>

          {/* Strip 2: Right to Left */}
          <div className="flex w-full overflow-visible py-4">
            <div
              className={`live-marquee-rtl ${
                activeCardId?.startsWith("bottom-") ? "marquee-paused" : ""
              }`}
            >
              {[...bottomStripData, ...bottomStripData, ...bottomStripData].map(
                (company, index) => {
                  const cardId = `bottom-${index}`;
                  return (
                    <div key={cardId} className="pr-8">
                      <LogoMarqueeCard
                        id={cardId}
                        name={company.company_name}
                        logo={company.logo_url}
                        activeCardId={activeCardId}
                        setActiveCardId={setActiveCardId}
                      />
                    </div>
                  );
                },
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function LogoMarqueeCard({
  id,
  name,
  logo,
  activeCardId,
  setActiveCardId,
}: {
  id: string;
  name: string;
  logo: string | null;
  activeCardId: string | null;
  setActiveCardId: React.Dispatch<React.SetStateAction<string | null>>;
}) {
  const [hasError, setHasError] = useState(false);
  const isActive = activeCardId === id;

  const handleTouchStart = () => {
    setActiveCardId(id);
  };

  const handleTouchEnd = () => {
    setActiveCardId(null);
  };

  return (
    <div
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      /* 🔒 DISABLE RIGHT CLICK & LONG PRESS CONTEXT MENU */
      onContextMenu={(e) => e.preventDefault()}
      className="relative group flex items-center justify-center shrink-0 overflow-visible cursor-pointer select-none touch-manipulation no-touch-callout"
    >
      {/* 🎯 TOOLTIP POPUP (Visible on Desktop Hover OR Mobile Active Touch) */}
      <div
        className={`absolute -top-14 left-1/2 -translate-x-1/2 transition-all duration-300 transform z-50 pointer-events-none whitespace-nowrap ${
          isActive
            ? "opacity-100 -translate-y-1"
            : "opacity-0 group-hover:opacity-100 group-hover:-translate-y-1"
        }`}
      >
        <div className="bg-brand-blue text-white font-extrabold text-[11px] uppercase tracking-wider px-3.5 py-1.5 shadow-2xl border border-blue-400 rounded-sm">
          {name}
        </div>
        <div className="w-2.5 h-2.5 bg-brand-blue rotate-45 mx-auto -mt-1.5 border-r border-b border-blue-400" />
      </div>

      {/* 🖼️ CARD CONTAINER */}
      <div
        className={`
          relative
          w-48 sm:w-56 h-24
          px-6 py-4
          flex items-center justify-center
          rounded-xl
          bg-slate-900/80
          border border-white/10
          backdrop-blur-sm
          transition-all duration-300
          overflow-hidden
          ${
            isActive
              ? "border-brand-blue/80 bg-slate-900 -translate-y-1 shadow-[0_0_30px_rgba(59,130,246,.3)]"
              : "group-hover:border-brand-blue/80 group-hover:bg-slate-900 group-hover:-translate-y-1 group-hover:shadow-[0_0_30px_rgba(59,130,246,.25)]"
          }
        `}
      >
        {/* 🌟 NEON HALO BACKDROP GLOW (Only visible on hover / active touch) */}
        <div
          className={`
            absolute inset-1 rounded-full bg-brand-blue/30 blur-xl pointer-events-none transition-opacity duration-500
            ${isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"}
          `}
        />

        {logo && !hasError ? (
          <Image
            src={logo}
            alt={name}
            width={160}
            height={60}
            /* 🔒 DISABLE IMAGE DRAGGING & DIRECT POINTER TARGETING */
            draggable={false}
            onError={() => setHasError(true)}
            className={`
              relative z-10
              max-h-12
              w-auto
              object-contain
              transition-all
              duration-300
              pointer-events-none
              select-none
              ${
                isActive
                  ? "grayscale-0 opacity-100 scale-105 drop-shadow-[0_0_12px_rgba(255,255,255,0.85)]"
                  : "grayscale opacity-60 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-105 group-hover:drop-shadow-[0_0_12px_rgba(255,255,255,0.85)]"
              }
            `}
            unoptimized
          />
        ) : (
          <div className="relative z-10 flex flex-col items-center justify-center text-center px-2 pointer-events-none select-none">
            <span
              className={`text-[11px] font-black tracking-wider uppercase line-clamp-2 leading-tight transition-colors duration-300 ${
                isActive
                  ? "text-brand-blue"
                  : "text-slate-100 group-hover:text-brand-blue"
              }`}
            >
              {name}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
