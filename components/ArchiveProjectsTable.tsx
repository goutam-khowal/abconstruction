"use client";

import React, { useState, useMemo } from "react";

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
}

const completedProjectsData: HeritageProject[] = [
  {
    id: 1,
    name: "M.E.S. Building",
    location: "Lodhi Road, New Delhi",
    category: "Government/Embassy",
    mapsQuery: "M.E.S. Building Lodhi Road New Delhi",
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
    name: "Japan Embassy",
    location: "Chanakyapuri, New Delhi",
    category: "Government/Embassy",
    mapsQuery: "Embassy of Japan Chanakyapuri New Delhi",
  },
  {
    id: 12,
    name: "France Embassy",
    location: "Chanakyapuri, New Delhi",
    category: "Government/Embassy",
    mapsQuery: "Embassy of France Chanakyapuri New Delhi",
  },
  {
    id: 13,
    name: "U.A.E. Embassy",
    location: "Chanakyapuri, New Delhi",
    category: "Government/Embassy",
    mapsQuery: "UAE Embassy Chanakyapuri New Delhi",
  },
  {
    id: 14,
    name: "Singapore High Commission",
    location: "Chanakyapuri, New Delhi",
    category: "Government/Embassy",
    mapsQuery: "Singapore High Commission Chanakyapuri New Delhi",
  },
  {
    id: 15,
    name: "SEBI Building",
    location: "BKC, Mumbai, Maharashtra",
    category: "Government/Embassy",
    mapsQuery: "SEBI Bhavan BKC Mumbai",
  },
  {
    id: 16,
    name: "Amity University Campus",
    location: "Sector 125, Noida, U.P.",
    category: "Institutional",
    mapsQuery: "Amity University Sector 125 Noida",
  },
  {
    id: 17,
    name: "HCL Head Office",
    location: "Noida, Uttar Pradesh",
    category: "Commercial",
    mapsQuery: "HCL Technologies Head Office Noida",
  },
  {
    id: 18,
    name: "NACIN Campus",
    location: "Palasamudram, Andhra Pradesh",
    category: "Institutional",
    mapsQuery: "NACIN Palasamudram Andhra Pradesh",
  },
  {
    id: 19,
    name: "Dharav Public School",
    location: "Gurugram, Haryana",
    category: "Institutional",
    mapsQuery: "Dharav Public School Gurugram",
  },
];

function normalize(str: string) {
  return str
    .toLowerCase()
    .replace(/[.,()\-\/]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export default function ArchiveProjectsTable() {
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

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 py-12 sm:py-16 font-sans">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 sm:mb-8 gap-4">
        <div>
          <span className="text-amber-600 text-xs tracking-widest font-extrabold uppercase block mb-1">
            Historic Deliveries Registry
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold uppercase text-stone-900 tracking-tight">
            Comprehensive Project Archive
          </h2>
          <p className="text-stone-600 text-xs sm:text-sm font-medium mt-1">
            Verified institutional, commercial, and embassy stone executions
            completed across India.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search Project / Location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:w-auto px-4 py-2.5 bg-white border border-stone-300 text-sm font-semibold text-stone-800 placeholder-stone-400 focus:outline-none focus:border-amber-600 rounded-sm min-h-[44px]"
          />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full sm:w-auto px-4 py-2.5 bg-white border border-stone-300 text-xs font-bold uppercase text-stone-800 focus:outline-none focus:border-amber-600 rounded-sm cursor-pointer min-h-[44px]"
          >
            <option value="ALL">All Sectors</option>
            <option value="Government/Embassy">Govt & Embassy</option>
            <option value="Commercial">Commercial</option>
            <option value="Institutional">Institutional</option>
            <option value="Residential">Residential</option>
          </select>
        </div>
      </div>

      {/* MOBILE VIEW */}
      <div className="block sm:hidden space-y-3">
        {filteredProjects.map((p, index) => (
          <div
            key={p.id}
            className="bg-white border border-stone-200 p-4 rounded-sm shadow-sm space-y-2"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-stone-400">
                #{String(index + 1).padStart(2, "0")}
              </span>
              <span className="inline-block px-2 py-0.5 text-[10px] uppercase font-bold tracking-wider rounded-sm bg-stone-100 text-stone-800 border border-stone-300">
                {p.category}
              </span>
            </div>
            <h3 className="font-extrabold text-stone-900 uppercase text-sm">
              {p.name}
            </h3>
            <p className="text-stone-600 text-xs font-medium">
              📍 {p.location}
            </p>
            <div className="pt-2 border-t border-stone-100 flex justify-end">
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.mapsQuery)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-extrabold text-amber-600 uppercase tracking-wider py-1 inline-flex items-center"
              >
                Open Maps →
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* DESKTOP VIEW */}
      <div className="hidden sm:block bg-white border border-stone-200 shadow-sm overflow-hidden rounded-sm">
        <table className="w-full text-left border-collapse text-xs">
          <thead>
            <tr className="bg-stone-900 text-white text-[10px] uppercase tracking-widest font-extrabold border-b-2 border-amber-500">
              <th className="py-4 px-6 w-16 text-center">#</th>
              <th className="py-4 px-6">Project Title</th>
              <th className="py-4 px-6">Sector</th>
              <th className="py-4 px-6">Location</th>
              <th className="py-4 px-6 text-center">Navigation</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100 font-semibold text-stone-700">
            {filteredProjects.map((p, index) => (
              <tr key={p.id} className="hover:bg-amber-50/50 transition-colors">
                <td className="py-3.5 px-6 text-center text-stone-400 font-mono text-xs">
                  {String(index + 1).padStart(2, "0")}
                </td>
                <td className="py-3.5 px-6 font-extrabold text-stone-900 uppercase">
                  {p.name}
                </td>
                <td className="py-3.5 px-6">
                  <span className="inline-block px-2.5 py-1 text-[10px] uppercase font-bold tracking-wider rounded-sm bg-stone-100 text-stone-800 border border-stone-200">
                    {p.category}
                  </span>
                </td>
                <td className="py-3.5 px-6 text-stone-600 font-medium">
                  {p.location}
                </td>
                <td className="py-3.5 px-6 text-center">
                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.mapsQuery)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold text-amber-600 hover:text-amber-800 uppercase tracking-wider hover:underline"
                  >
                    📍 Maps
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
