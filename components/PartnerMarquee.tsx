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

  useEffect(() => {
    async function fetchPartnersWithGalleryPattern() {
      try {
        setLoading(true);
        const bucketName = "partner-logos";

        // 1. Fetch company records from partner_logos table
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

  // 🧱 SKELETON PLACEHOLDER TO PREVENT JUMPY LAYOUT SHIFT (NO SUDDEN POPPING)
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
          animation: marqueeLtr 28s linear infinite;
        }
        .live-marquee-rtl {
          display: flex;
          width: max-content;
          animation: marqueeRtl 28s linear infinite;
        }
        .live-marquee-ltr:hover,
        .live-marquee-rtl:hover {
          animation-play-state: paused !important;
        }
      `}</style>

      <section className="bg-slate-950 py-20 overflow-hidden border-y border-slate-800 text-white font-sans select-none transition-opacity duration-700 ease-in opacity-100">
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
            <div className="live-marquee-ltr">
              {[...topStripData, ...topStripData, ...topStripData].map(
                (company, index) => (
                  <div key={`top-${index}`} className="pr-8">
                    <LogoMarqueeCard
                      name={company.company_name}
                      logo={company.logo_url}
                    />
                  </div>
                ),
              )}
            </div>
          </div>

          {/* Strip 2: Right to Left */}
          <div className="flex w-full overflow-visible py-4">
            <div className="live-marquee-rtl">
              {[...bottomStripData, ...bottomStripData, ...bottomStripData].map(
                (company, index) => (
                  <div key={`bottom-${index}`} className="pr-8">
                    <LogoMarqueeCard
                      name={company.company_name}
                      logo={company.logo_url}
                    />
                  </div>
                ),
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function LogoMarqueeCard({
  name,
  logo,
}: {
  name: string;
  logo: string | null;
}) {
  const [hasError, setHasError] = useState(false);

  return (
    <div className="relative group flex items-center justify-center shrink-0 overflow-visible cursor-pointer">
      {/* 🎯 HOVER TOOLTIP POPUP */}
      <div className="absolute -top-14 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:-translate-y-1 z-50 pointer-events-none whitespace-nowrap">
        <div className="bg-brand-blue text-white font-extrabold text-[11px] uppercase tracking-wider px-3.5 py-1.5 shadow-2xl border border-blue-400 rounded-sm">
          {name}
        </div>
        <div className="w-2.5 h-2.5 bg-brand-blue rotate-45 mx-auto -mt-1.5 border-r border-b border-blue-400" />
      </div>

      {/* 🖼️ LOGO / TEXT CARD CONTAINER */}
      <div
        className="
          w-48 sm:w-56 h-24
          px-6 py-4
          flex items-center justify-center
          rounded-xl
          bg-slate-900/60
          border border-white/10
          backdrop-blur-sm
          transition-all duration-300
          group-hover:border-brand-blue/70
          group-hover:bg-slate-900
          group-hover:-translate-y-1
          group-hover:shadow-[0_0_30px_rgba(59,130,246,.15)]
          overflow-hidden
        "
      >
        {logo && !hasError ? (
          <Image
            src={logo}
            alt={name}
            width={160}
            height={60}
            onError={() => setHasError(true)}
            className="
              max-h-12
              w-auto
              object-contain
              transition-all
              duration-300
              grayscale
              opacity-60
              group-hover:grayscale-0
              group-hover:opacity-100
              group-hover:scale-105
            "
            unoptimized
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-center px-2">
            <span className="text-[11px] font-black tracking-wider text-slate-100 group-hover:text-brand-blue uppercase line-clamp-2 leading-tight transition-colors duration-300">
              {name}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
