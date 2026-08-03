"use client";

import React, { useState, useMemo, useRef, useEffect } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

interface HeritageProject {
  id: number;
  name: string;
  category:
    | "Government/Embassy"
    | "Commercial"
    | "Residential"
    | "Institutional"
    | "Industrial";
  location: string;
  mapsQuery: string;
  hasPortfolioImages?: boolean;
}

const completedProjectsData: HeritageProject[] = [
  {
    id: 1,
    name: "M.E.S. Building",
    location: "Lodhi Road, New Delhi",
    category: "Government/Embassy",
    mapsQuery: "M.E.S. Building Lodhi Road New Delhi",
    hasPortfolioImages: true,
  },
  {
    id: 2,
    name: "Sangli MES Apartment",
    location: "Bhagwandas Road, New Delhi",
    category: "Residential",
    mapsQuery: "Sangli MES Apartment Bhagwandas Road New Delhi",
  },
  {
    id: 3,
    name: "Gopal Das Building",
    location: "Connaught Place, New Delhi",
    category: "Commercial",
    mapsQuery: "Gopal Das Building Connaught Place New Delhi",
  },
  {
    id: 4,
    name: "Surya Vihar Apartments",
    location: "Gurugram, Haryana",
    category: "Residential",
    mapsQuery: "Surya Vihar Apartments Gurugram",
  },
  {
    id: 5,
    name: "Garden Estate Apartment",
    location: "Gurugram, Haryana",
    category: "Residential",
    mapsQuery: "Garden Estate Apartment Gurugram",
  },
  {
    id: 6,
    name: "D.L.F. Silver Oak Apartment",
    location: "Gurugram, Haryana",
    category: "Residential",
    mapsQuery: "DLF Silver Oak Apartment Gurugram",
  },
  {
    id: 7,
    name: "D.L.F Beverli Park I & II",
    location: "Gurugram, Haryana",
    category: "Residential",
    mapsQuery: "DLF Beverly Park Gurugram",
  },
  {
    id: 8,
    name: "D.L.F. Corporate Park",
    location: "Gurugram, Haryana",
    category: "Commercial",
    mapsQuery: "DLF Corporate Park Gurugram",
  },
  {
    id: 9,
    name: "D.L.F Plaza Tower",
    location: "Gurugram, Haryana",
    category: "Commercial",
    mapsQuery: "DLF Plaza Tower Gurugram",
  },
  {
    id: 10,
    name: "D.L.F. Center (D.L.F. H.Q)",
    location: "Connaught Place, New Delhi",
    category: "Commercial",
    mapsQuery: "DLF Centre Connaught Place New Delhi",
  },
  {
    id: 11,
    name: "D.L.F. Summer Field School",
    location: "Greater Kailash 1, New Delhi",
    category: "Institutional",
    mapsQuery: "DLF Summer Fields School Greater Kailash New Delhi",
  },
  {
    id: 12,
    name: "Japan Embassy",
    location: "Chanakyapuri, New Delhi",
    category: "Government/Embassy",
    mapsQuery: "Embassy of Japan Chanakyapuri New Delhi",
  },
  {
    id: 13,
    name: "France Embassy",
    location: "Chanakyapuri, New Delhi",
    category: "Government/Embassy",
    mapsQuery: "Embassy of France Chanakyapuri New Delhi",
  },
  {
    id: 14,
    name: "U.A.E. Embassy",
    location: "Chanakyapuri, New Delhi",
    category: "Government/Embassy",
    mapsQuery: "UAE Embassy Chanakyapuri New Delhi",
  },
  {
    id: 15,
    name: "Singapore High Commission",
    location: "Chanakyapuri, New Delhi",
    category: "Government/Embassy",
    mapsQuery: "Singapore High Commission Chanakyapuri New Delhi",
  },
  {
    id: 16,
    name: "Denmark Embassy",
    location: "Chanakyapuri, New Delhi",
    category: "Government/Embassy",
    mapsQuery: "Royal Danish Embassy Chanakyapuri New Delhi",
  },
  {
    id: 17,
    name: "Goa Sadan",
    location: "Chanakyapuri, New Delhi",
    category: "Government/Embassy",
    mapsQuery: "Goa Sadan Chanakyapuri New Delhi",
  },
  {
    id: 18,
    name: "Ashok Hotel",
    location: "Chanakyapuri, New Delhi",
    category: "Commercial",
    mapsQuery: "The Ashok Hotel Chanakyapuri New Delhi",
  },
  {
    id: 19,
    name: "Holiday Inn Hotel",
    location: "Jaipur, Rajasthan",
    category: "Commercial",
    mapsQuery: "Holiday Inn Jaipur Rajasthan",
  },
  {
    id: 20,
    name: "Vikram Vintage Hotel",
    location: "Nainital, Uttarakhand",
    category: "Commercial",
    mapsQuery: "Vikram Vintage Inn Nainital Uttarakhand",
  },
  {
    id: 21,
    name: "Vikram Hotel",
    location: "Lajpat Nagar, New Delhi",
    category: "Commercial",
    mapsQuery: "Hotel Vikram Lajpat Nagar New Delhi",
  },
  {
    id: 22,
    name: "Khaitan House (W 51)",
    location: "Greater Kailash 2, New Delhi",
    category: "Residential",
    mapsQuery: "W 51 Greater Kailash 2 New Delhi",
  },
  {
    id: 23,
    name: "Mittal House (C 15)",
    location: "Greater Kailash 1, New Delhi",
    category: "Residential",
    mapsQuery: "C 15 Greater Kailash 1 New Delhi",
  },
  {
    id: 24,
    name: "Lohia House (R 69)",
    location: "Greater Kailash 1, New Delhi",
    category: "Residential",
    mapsQuery: "R 69 Greater Kailash 1 New Delhi",
  },
  {
    id: 25,
    name: "Manan House (W 33)",
    location: "Greater Kailash 2, New Delhi",
    category: "Residential",
    mapsQuery: "W 33 Greater Kailash 2 New Delhi",
  },
  {
    id: 26,
    name: "Puri House (12 No)",
    location: "Old Friends Colony, New Delhi",
    category: "Residential",
    mapsQuery: "Old Friends Colony New Delhi",
  },
  {
    id: 27,
    name: "Vineet Nayyar House (5 No)",
    location: "Old Friends Colony, New Delhi",
    category: "Residential",
    mapsQuery: "Old Friends Colony New Delhi",
  },
  {
    id: 28,
    name: "Gaiyan Farm House",
    location: "Sainik Farm, New Delhi",
    category: "Residential",
    mapsQuery: "Sainik Farm New Delhi",
  },
  {
    id: 29,
    name: "Lakhotia Farm House",
    location: "Sainik Farm, New Delhi",
    category: "Residential",
    mapsQuery: "Sainik Farm New Delhi",
  },
  {
    id: 30,
    name: "Jhunjhunwala Farm House",
    location: "Sainik Farm, New Delhi",
    category: "Residential",
    mapsQuery: "Sainik Farm New Delhi",
  },
  {
    id: 31,
    name: "Jain Farm House",
    location: "Bijwasan, New Delhi",
    category: "Residential",
    mapsQuery: "Bijwasan New Delhi",
  },
  {
    id: 32,
    name: "Aggarwal Farm House",
    location: "Bijwasan, New Delhi",
    category: "Residential",
    mapsQuery: "Bijwasan New Delhi",
  },
  {
    id: 33,
    name: "Jain Farm House",
    location: "Rangpuri, New Delhi",
    category: "Residential",
    mapsQuery: "Rangpuri New Delhi",
  },
  {
    id: 34,
    name: "Ahluwalia Farm House",
    location: "Haridwar, Uttarakhand",
    category: "Residential",
    mapsQuery: "Haridwar Uttarakhand",
  },
  {
    id: 35,
    name: "Badal Farm House",
    location: "Rania, Hisar, Haryana",
    category: "Residential",
    mapsQuery: "Rania Hisar Haryana",
  },
  {
    id: 36,
    name: "SEBI Building",
    location: "BKC, Mumbai, Maharashtra",
    category: "Government/Embassy",
    mapsQuery: "SEBI Bhavan BKC Mumbai",
  },
  {
    id: 37,
    name: "I.D.B.I Building",
    location: "BKC, Mumbai, Maharashtra",
    category: "Commercial",
    mapsQuery: "IDBI Tower BKC Mumbai",
  },
  {
    id: 38,
    name: "PNB Building",
    location: "BKC, Mumbai, Maharashtra",
    category: "Commercial",
    mapsQuery: "Punjab National Bank BKC Mumbai",
  },
  {
    id: 39,
    name: "Chartered Accountant Building",
    location: "BKC, Mumbai, Maharashtra",
    category: "Institutional",
    mapsQuery: "ICAI Tower BKC Mumbai",
  },
  {
    id: 40,
    name: "CBI Building",
    location: "BKC, Mumbai, Maharashtra",
    category: "Government/Embassy",
    mapsQuery: "CBI Office BKC Mumbai",
  },
  {
    id: 41,
    name: "Amity University Campus",
    location: "Panvel, Mumbai, Maharashtra",
    category: "Institutional",
    mapsQuery: "Amity University Panvel Mumbai",
  },
  {
    id: 42,
    name: "Amity University Campus",
    location: "Sector 125, Noida, U.P.",
    category: "Institutional",
    mapsQuery: "Amity University Sector 125 Noida",
  },
  {
    id: 43,
    name: "Amity International School",
    location: "Sector 44, Gurugram, Haryana",
    category: "Institutional",
    mapsQuery: "Amity International School Sector 44 Gurugram",
  },
  {
    id: 44,
    name: "Amity International School",
    location: "Sector 46, Gurugram, Haryana",
    category: "Institutional",
    mapsQuery: "Amity International School Sector 46 Gurugram",
  },
  {
    id: 45,
    name: "Amity House (C-522)",
    location: "Defence Colony, New Delhi",
    category: "Residential",
    mapsQuery: "C 522 Defence Colony New Delhi",
  },
  {
    id: 46,
    name: "Amity House (C-582)",
    location: "Defence Colony, New Delhi",
    category: "Residential",
    mapsQuery: "C 582 Defence Colony New Delhi",
  },
  {
    id: 47,
    name: "Amity House (B-59)",
    location: "Defence Colony, New Delhi",
    category: "Residential",
    mapsQuery: "B 59 Defence Colony New Delhi",
  },
  {
    id: 48,
    name: "Amity House (E-21)",
    location: "Defence Colony, New Delhi",
    category: "Residential",
    mapsQuery: "E 21 Defence Colony New Delhi",
  },
  {
    id: 49,
    name: "Ahluwalia CMD House (B-10)",
    location: "Saket, New Delhi",
    category: "Residential",
    mapsQuery: "B 10 Saket New Delhi",
  },
  {
    id: 50,
    name: "Ahluwalia Company Office (M-1)",
    location: "Saket, New Delhi",
    category: "Commercial",
    mapsQuery: "M 1 Saket New Delhi",
  },
  {
    id: 51,
    name: "HCL Head Office",
    location: "Noida, Uttar Pradesh",
    category: "Commercial",
    mapsQuery: "HCL Technologies Head Office Noida",
  },
  {
    id: 52,
    name: "Textile Mills Facility",
    location: "Bhiwani, Haryana",
    category: "Industrial",
    mapsQuery: "Bhiwani Textile Mills Haryana",
  },
  {
    id: 53,
    name: "Birla Spinning Mills",
    location: "Gwalior, Madhya Pradesh",
    category: "Industrial",
    mapsQuery: "Birla Mills Gwalior MP",
  },
  {
    id: 54,
    name: "Arham Spinning Mill",
    location: "Bhiwadi, Rajasthan",
    category: "Industrial",
    mapsQuery: "Bhiwadi Rajasthan Industrial Area",
  },
  {
    id: 55,
    name: "CEAT Tyre Factory",
    location: "Gwalior, Madhya Pradesh",
    category: "Industrial",
    mapsQuery: "CEAT Tyres Gwalior MP",
  },
  {
    id: 56,
    name: "ITI Factory Complex",
    location: "Mankapur, Gonda, U.P.",
    category: "Industrial",
    mapsQuery: "ITI Factory Mankapur Gonda UP",
  },
  {
    id: 57,
    name: "JCT Factory Plant",
    location: "Vadodara, Gujarat",
    category: "Industrial",
    mapsQuery: "JCT Plant Vadodara Gujarat",
  },
  {
    id: 58,
    name: "NACIN Campus",
    location: "Palasamudram, Andhra Pradesh",
    category: "Institutional",
    mapsQuery: "NACIN Palasamudram Andhra Pradesh",
    hasPortfolioImages: true,
  },
  {
    id: 59,
    name: "Dharav Public School",
    location: "Gurugram, Haryana",
    category: "Institutional",
    mapsQuery: "Dharav Public School Gurugram",
    hasPortfolioImages: true,
  },
  {
    id: 60,
    name: "Craft Museum",
    location: "Varanasi (Banaras), U.P.",
    category: "Institutional",
    mapsQuery: "Craft Museum Varanasi UP",
  },
];

function normalize(str: string) {
  return str
    .toLowerCase()
    .replace(/[.,()\-\/]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function escapeRegExp(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function highlightMatches(text: string, terms: string[]) {
  if (terms.length === 0) return text;

  const patterns = terms.map((term) =>
    escapeRegExp(term).split("").join("[.,\\-\\s]*"),
  );
  const pattern = new RegExp(`(${patterns.join("|")})`, "gi");
  const parts = text.split(pattern);

  return parts.map((part, i) =>
    pattern.test(part) && part.length > 0 ? (
      <mark key={i} className="bg-amber-200 text-slate-900 rounded-sm px-0.5">
        {part}
      </mark>
    ) : (
      part
    ),
  );
}

export default function ArchiveProjectsTable() {
  const sectionRef = useRef<HTMLElement>(null);
  const tableBodyRef = useRef<HTMLTableSectionElement>(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  const searchTerms = useMemo(
    () => normalize(searchTerm).split(/\s+/).filter(Boolean),
    [searchTerm],
  );

  const filteredProjects = useMemo(() => {
    return completedProjectsData.filter((p) => {
      const haystack = normalize(`${p.name} ${p.location} ${p.category}`);

      const matchesSearch =
        searchTerms.length === 0 ||
        searchTerms.every((term) => haystack.includes(term));

      const matchesCategory =
        selectedCategory === "ALL" || p.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [searchTerms, selectedCategory]);

  // Section Scrub: 2 Entrance setup
  useGSAP(
    () => {
      gsap.fromTo(
        ".archive-header-box",
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 85%",
            end: "top 55%",
            scrub: 2,
          },
        },
      );

      gsap.fromTo(
        ".archive-table-container",
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: ".archive-table-container",
            start: "top 90%",
            end: "top 60%",
            scrub: 2,
          },
        },
      );
    },
    { scope: sectionRef },
  );

  // Stagger animate rows when searching/filtering
  useEffect(() => {
    if (!tableBodyRef.current) return;

    gsap.fromTo(
      tableBodyRef.current.querySelectorAll("tr"),
      { opacity: 0, y: 8 },
      {
        opacity: 1,
        y: 0,
        duration: 0.3,
        stagger: 0.02,
        ease: "power2.out",
      },
    );
  }, [filteredProjects]);

  return (
    <section
      ref={sectionRef}
      className="max-w-7xl mx-auto px-6 sm:px-12 py-16 font-sans"
    >
      {/* Header Context */}
      <div className="archive-header-box flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
        <div>
          <span className="text-brand-blue text-[10px] tracking-[0.3em] font-black uppercase block mb-1">
            Historic Deliveries Registry
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold uppercase text-slate-900 tracking-tight">
            Comprehensive Project Archive
          </h2>
          <p className="text-slate-500 text-xs font-medium mt-1">
            Verified institutional, commercial, and embassy stone executions
            completed across India.
          </p>
        </div>

        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search Project / Location / Sector..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-4 py-2 pr-8 bg-white border border-slate-300 text-xs font-semibold text-slate-800 placeholder-slate-400 focus:outline-none focus:border-brand-blue rounded-none shadow-sm min-w-[240px]"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                aria-label="Clear search"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 text-sm font-bold"
              >
                ×
              </button>
            )}
          </div>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 bg-white border border-slate-300 text-xs font-bold uppercase text-slate-800 focus:outline-none focus:border-brand-blue rounded-none shadow-sm cursor-pointer"
          >
            <option value="ALL">All Sectors</option>
            <option value="Government/Embassy">Govt & Embassy</option>
            <option value="Commercial">Commercial</option>
            <option value="Institutional">Institutional</option>
            <option value="Residential">Residential</option>
            <option value="Industrial">Industrial</option>
          </select>
        </div>
      </div>

      {/* Result count */}
      <div className="mb-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
        {filteredProjects.length} of {completedProjectsData.length} records
      </div>

      {/* Table Container */}
      <div className="archive-table-container bg-white border border-slate-200 shadow-sm overflow-hidden rounded-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="bg-slate-950 text-white text-[10px] uppercase tracking-widest font-black border-b-2 border-brand-blue">
                <th className="py-4 px-6 w-16 text-center">#</th>
                <th className="py-4 px-6">Project Title & Site</th>
                <th className="py-4 px-6">Sector Domain</th>
                <th className="py-4 px-6">Location Details</th>
                <th className="py-4 px-6 text-center">Geo Navigation</th>
              </tr>
            </thead>
            <tbody
              ref={tableBodyRef}
              className="divide-y divide-slate-100 font-semibold text-slate-700"
            >
              {filteredProjects.length > 0 ? (
                filteredProjects.map((p, index) => (
                  <tr
                    key={p.id}
                    className="hover:bg-blue-50/50 transition-colors duration-200"
                  >
                    <td className="py-3.5 px-6 text-center text-slate-400 font-mono text-[11px]">
                      {String(index + 1).padStart(2, "0")}
                    </td>
                    <td className="py-3.5 px-6 font-extrabold text-slate-900 uppercase">
                      {highlightMatches(p.name, searchTerms)}
                    </td>
                    <td className="py-3.5 px-6">
                      <span
                        className={`inline-block px-2.5 py-1 text-[9px] uppercase font-bold tracking-wider rounded-sm ${
                          p.category === "Government/Embassy"
                            ? "bg-amber-100 text-amber-900 border border-amber-300"
                            : p.category === "Institutional"
                              ? "bg-blue-100 text-blue-900 border border-blue-300"
                              : p.category === "Commercial"
                                ? "bg-emerald-100 text-emerald-900 border border-emerald-300"
                                : "bg-slate-100 text-slate-800 border border-slate-300"
                        }`}
                      >
                        {p.category}
                      </span>
                    </td>
                    <td className="py-3.5 px-6 text-slate-600 font-medium">
                      {highlightMatches(p.location, searchTerms)}
                    </td>
                    <td className="py-3.5 px-6 text-center">
                      <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                          p.mapsQuery,
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-brand-blue hover:text-blue-800 uppercase tracking-wider hover:underline"
                        title="View Location on Google Maps"
                      >
                        📍 Open Maps
                      </a>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={5}
                    className="py-12 text-center text-slate-400 uppercase tracking-wider font-bold text-xs"
                  >
                    No archive records matched your search parameters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
