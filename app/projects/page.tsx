import Image from "next/image";
import ArchiveProjectsTable from "@/components/ArchiveProjectsTable";
import InstitutionalClientsGrid from "@/components/InstitutionalClientsGrid";

export const metadata = {
  title: "Projects – A&B Construction",
  description:
    "Explore our completed projects — craftsmanship meets precision across commercial, healthcare, residential, and public sectors.",
};

export default function ProjectsPage() {
  return (
    <div className="bg-stone-50 text-stone-900 font-sans">
      {/* Hero Header */}
      <section className="relative min-h-[40vh] sm:min-h-[45vh] flex items-center bg-stone-900 text-white pt-28 sm:pt-32 pb-12 sm:pb-16">
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-900/80 to-transparent z-10" />
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-8 md:px-12 w-full">
          <span className="text-amber-500 text-xs tracking-widest uppercase font-extrabold block mb-2">
            Portfolio Registry
          </span>
          <h1 className="text-3xl sm:text-5xl font-light tracking-tight text-white uppercase leading-tight">
            Where Craftsmanship <br />
            <span className="font-extrabold text-amber-500">
              Meets Perfection.
            </span>
          </h1>
        </div>
      </section>

      {/* Completed Projects Archive Table Component */}
      <ArchiveProjectsTable />
      {/* CLIENT MARQUEE */}
      <InstitutionalClientsGrid />
    </div>
  );
}
