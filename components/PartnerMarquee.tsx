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

  const [isTouchPausedTop, setIsTouchPausedTop] = useState(false);
  const [isTouchPausedBottom, setIsTouchPausedBottom] = useState(false);

  const handleTouchStart = (id: string) => {
    setActiveCardId(id);
    if (id.startsWith("top-")) setIsTouchPausedTop(true);
    else setIsTouchPausedBottom(true);
  };

  const handleTouchEnd = (id: string) => {
    setActiveCardId(null);
    if (id.startsWith("top-")) setIsTouchPausedTop(false);
    else setIsTouchPausedBottom(false);
  };

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

          const finalPartners = dbPartners.map((partner: any) => {
            const match = partnerPathsMap.find((m) => m.id === partner.id);
            const logoUrl = match ? signedMap[match.fullPath] || null : null;

            return {
              id: partner.id,
              company_name: partner.company_name,
              logo_url: logoUrl,
            };
          });

          setPartners(finalPartners);
        }
      } catch (err) {
        console.error("Partner logos fetch error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchPartners();
  }, []);

  const topStripData = partners.filter((_, idx) => idx % 2 === 0);
  const bottomStripData = partners.filter((_, idx) => idx % 2 !== 0);

  if (loading) {
    return (
      <section className="bg-stone-900 py-16 border-y border-stone-800 text-white font-sans">
        <div className="max-w-7xl mx-auto px-4 text-center animate-pulse mb-6">
          <div className="h-3 w-32 bg-stone-800 mx-auto rounded mb-2" />
          <div className="h-6 w-64 bg-stone-800 mx-auto rounded" />
        </div>
      </section>
    );
  }

  if (partners.length === 0) return null;

  return (
    <section className="bg-stone-900 py-16 sm:py-24 border-y border-stone-800/80 text-white font-sans select-none relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 text-center mb-10 sm:mb-14">
        <span className="text-amber-500 text-xs tracking-[0.25em] font-extrabold uppercase block mb-2">
          Institutional Portfolio
        </span>
        <h2 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
          Trusted Partners &amp; Clients
        </h2>
      </div>

      <div className="relative w-full space-y-8 sm:space-y-12">
        {/* Soft Vignette Overlay matching dark bg */}
        <div className="absolute left-0 top-0 z-20 h-full w-20 sm:w-48 bg-gradient-to-r from-stone-900 via-stone-900/80 to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 z-20 h-full w-20 sm:w-48 bg-gradient-to-l from-stone-900 via-stone-900/80 to-transparent pointer-events-none" />

        {/* TOP STRIP */}
        <div className="flex w-full py-6">
          <div
            className="animate-carousel-fast-ltr hover:[animation-play-state:paused]"
            style={
              isTouchPausedTop ? { animationPlayState: "paused" } : undefined
            }
          >
            {[
              ...topStripData,
              ...topStripData,
              ...topStripData,
              ...topStripData,
            ].map((company, index) => {
              const cardId = `top-${index}`;
              return (
                <div key={cardId} className="px-3 sm:px-4 shrink-0">
                  <LogoMarqueeCard
                    id={cardId}
                    name={company.company_name}
                    logo={company.logo_url}
                    activeCardId={activeCardId}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                  />
                </div>
              );
            })}
          </div>
        </div>

        {/* BOTTOM STRIP */}
        <div className="flex w-full py-6">
          <div
            className="animate-carousel-fast-rtl hover:[animation-play-state:paused]"
            style={
              isTouchPausedBottom ? { animationPlayState: "paused" } : undefined
            }
          >
            {[
              ...bottomStripData,
              ...bottomStripData,
              ...bottomStripData,
              ...bottomStripData,
            ].map((company, index) => {
              const cardId = `bottom-${index}`;
              return (
                <div key={cardId} className="px-3 sm:px-4 shrink-0">
                  <LogoMarqueeCard
                    id={cardId}
                    name={company.company_name}
                    logo={company.logo_url}
                    activeCardId={activeCardId}
                    onTouchStart={handleTouchStart}
                    onTouchEnd={handleTouchEnd}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

function LogoMarqueeCard({
  id,
  name,
  logo,
  activeCardId,
  onTouchStart,
  onTouchEnd,
}: {
  id: string;
  name: string;
  logo: string | null;
  activeCardId: string | null;
  onTouchStart: (id: string) => void;
  onTouchEnd: (id: string) => void;
}) {
  const [hasError, setHasError] = useState(false);
  const isActive = activeCardId === id;

  return (
    <div
      onTouchStart={() => onTouchStart(id)}
      onTouchEnd={() => onTouchEnd(id)}
      onTouchCancel={() => onTouchEnd(id)}
      className="relative group flex items-center justify-center shrink-0 cursor-pointer"
    >
      {/* FLOATING AMBER HOVER BADGE */}
      <div
        className={`absolute -top-12 left-1/2 -translate-x-1/2 transition-all duration-300 z-50 pointer-events-none whitespace-nowrap ${
          isActive
            ? "opacity-100 translate-y-0 scale-100"
            : "opacity-0 group-hover:opacity-100 group-hover:translate-y-0 group-hover:scale-100 translate-y-2 scale-95"
        }`}
      >
        <div className="bg-amber-600 text-white font-black text-[11px] uppercase tracking-wider px-3.5 py-1.5 shadow-2xl rounded-sm border border-amber-400">
          {name}
        </div>
        <div className="w-2 h-2 bg-amber-600 border-r border-b border-amber-400 rotate-45 mx-auto -mt-1" />
      </div>

      {/* CARD BODY: Warm Stone Alabaster bg-stone-50 default -> Pure bg-white on Hover/Touch */}
      <div
        className={`
          relative w-44 sm:w-56 h-22 sm:h-24 px-5 py-3 flex items-center justify-center rounded-md
          border transition-all duration-300 ease-out transform backdrop-blur-sm
          ${
            isActive
              ? "-translate-y-1.5 scale-105 bg-white border-amber-500 shadow-[0_12px_24px_rgba(217,119,6,0.3)]"
              : "bg-stone-50 border-stone-200/90 shadow-sm group-hover:-translate-y-1.5 group-hover:scale-105 group-hover:bg-white group-hover:border-amber-500 group-hover:shadow-[0_12px_24px_rgba(217,119,6,0.3)]"
          }
        `}
      >
        {logo && !hasError ? (
          <Image
            src={logo}
            alt={name}
            width={140}
            height={50}
            loading="lazy"
            onError={() => setHasError(true)}
            /* ❌ ZERO GREYSCALE FILTER - Full original color & crisp 2px drop-shadow always */
            className={`
              max-h-10 sm:max-h-12 w-auto object-contain transition-all duration-300
              drop-shadow-[2px_2px_2px_rgba(0,0,0,0.25)]
              ${isActive ? "scale-105 opacity-100" : "opacity-90 group-hover:scale-105 group-hover:opacity-100"}
            `}
            unoptimized
          />
        ) : (
          <span
            className={`
              text-xs font-extrabold tracking-wider uppercase text-center line-clamp-2 transition-colors duration-300 text-stone-900
            `}
          >
            {name}
          </span>
        )}
      </div>
    </div>
  );
}
