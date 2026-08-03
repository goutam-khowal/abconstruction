import Image from "next/image";
import Link from "next/link";
import PartnerMarquee from "@/components/InstitutionalClientsGrid";

const stats = [
  { value: "40+", label: "Years In Business" },
  { value: "5k+", label: "Happy Clients" },
  { value: "10M+", label: "Sq. Ft. Marble & Stone Work" },
  { value: "1k+", label: "Completed Projects" },
];

export default function HomePage() {
  return (
    <div className="bg-stone-50 text-stone-900 font-sans">
      {/* HERO SECTION */}
      <section className="relative min-h-[85vh] sm:min-h-screen flex items-center bg-stone-900 text-white pt-24 pb-12 sm:pt-28 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-900/90 to-transparent z-10" />
        <div className="absolute inset-0 opacity-15 mix-blend-overlay bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:20px_20px]" />

        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-8 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-10 space-y-4 sm:space-y-6">
            <div className="hero-badge-container flex flex-wrap items-center gap-2 text-xs font-extrabold uppercase tracking-widest text-amber-500">
              <span>Established 1977 · New Delhi</span>
              <span className="text-stone-500 hidden sm:inline">•</span>
              <span className="text-stone-300 font-semibold tracking-wider">
                Formerly GANGA RAM &amp; Sons
              </span>
            </div>

            {/* Signature Rule Bar */}
            <span
              className="hero-badge-rule block h-[2px] w-14 bg-amber-500/70 origin-left"
              aria-hidden="true"
            />
            <h1 className="font-display font-light text-3xl sm:text-5xl md:text-6xl lg:text-7xl tracking-tight uppercase leading-tight sm:leading-none">
              Timeless Elegance, <br />
              <span className="font-extrabold text-amber-500 block mt-1">
                Expertly Installed.
              </span>
            </h1>
            <p className="text-stone-300 text-sm sm:text-base max-w-xl font-medium leading-relaxed">
              Precision laying, diamond grinding, and specialized structural
              surface engineering across Italian marble, granite, and
              high-performance tiles for institutional and luxury spaces.
            </p>
            <div className="pt-2 sm:pt-4 flex flex-col sm:flex-row gap-3.5 sm:gap-4 w-full sm:w-auto">
              <Link
                href="/contact"
                className="w-full sm:w-auto text-center px-8 py-4 bg-amber-600 text-white text-xs font-extrabold uppercase tracking-widest hover:bg-amber-500 transition-all min-h-[48px] flex items-center justify-center rounded-sm shadow-lg focus:outline-none focus:ring-2 focus:ring-amber-400"
              >
                Request Consultation
              </Link>
              <Link
                href="/projects"
                className="w-full sm:w-auto text-center px-8 py-4 border border-stone-600 text-stone-200 text-xs font-extrabold uppercase tracking-widest hover:bg-stone-800 transition-colors min-h-[48px] flex items-center justify-center rounded-sm focus:outline-none focus:ring-2 focus:ring-stone-400"
              >
                View Project Matrix
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* METRIC DATA ROW */}
      <section className="bg-amber-600 py-8 sm:py-12 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
          {stats.map((stat) => (
            <div key={stat.label} className="space-y-1 p-2">
              <p className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                {stat.value}
              </p>
              <p className="text-xs tracking-wider font-bold uppercase text-amber-100">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* OVERVIEW SECTION */}
      <section className="py-12 sm:py-20 lg:py-24 max-w-7xl mx-auto px-4 sm:px-8 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center">
          <div className="lg:col-span-8 space-y-4 sm:space-y-6">
            <span className="text-xs tracking-widest font-extrabold text-amber-600 uppercase block">
              Processing Excellence
            </span>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-stone-900 uppercase tracking-tight leading-tight">
              Decades of Craftsmanship in Premium Stone Architecture
            </h2>
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-medium">
              We focus on the structural polishing, chemical treatment, and
              seamless execution with high end finish of Italian marble,
              granites &amp; all types of tiles across commercial, government,
              and residential heritage spaces.
            </p>
            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex items-center text-xs font-extrabold tracking-widest uppercase border-b-2 border-amber-600 pb-2 text-stone-900 hover:text-amber-600 transition-colors min-h-[44px]"
              >
                Discover Our Corporate Heritage →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
