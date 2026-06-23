import Image from "next/image";
import Link from "next/link";

const stats = [
  { value: "40+", label: "Years In Business" },
  { value: "1k+", label: "Happy Clients" },
  { value: "1k+", label: "Projects Completed" },
];

const projectCategories = [
  {
    label: "Commercial Projects",
    image:
      "https://a-bconstruction.in/wp-content/uploads/2025/01/1-1024x1024.png",
  },
  {
    label: "Healthcare Projects",
    image:
      "https://a-bconstruction.in/wp-content/uploads/2025/01/2-1024x1024.png",
  },
  {
    label: "Residential Projects",
    image:
      "https://a-bconstruction.in/wp-content/uploads/2025/01/3-1024x1024.png",
  },
  {
    label: "Public Projects",
    image:
      "https://a-bconstruction.in/wp-content/uploads/2025/01/4-1024x1024.png",
  },
];

export default function HomePage() {
  return (
    <div className="bg-white text-slate-900 font-sans">
      {/* SECTION 1: LUXURY ARCHITECTURAL HERO */}
      <section className="relative min-h-screen flex items-center bg-dark-blue text-white pt-24 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-darker-blue via-dark-blue/70 to-transparent z-10" />
        <div className="absolute inset-0 opacity-10 mix-blend-overlay bg-[radial-gradient(#2563eb_1px,transparent_1px)] [background-size:16px_16px]" />

        <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-9 space-y-6">
            <span className="text-brand-blue text-[10px] tracking-[0.4em] font-black uppercase block">
              Founded 1977 · Delhi, India
            </span>
            <h1 className="font-display font-light text-5xl sm:text-7xl lg:text-8xl tracking-tight uppercase leading-[0.95]">
              Timeless Elegance, <br />
              <span className="font-extrabold text-transparent webkit-text-stroke">
                Expertly Installed.
              </span>
            </h1>
            <p className="text-slate-300 text-sm sm:text-base max-w-xl font-medium leading-relaxed pt-2">
              Experience flawless execution across Italian marble laying,
              precise diamond grinding, and specialized structural tile
              architectures engineered to stand for generations.
            </p>
            <div className="pt-4 flex flex-wrap gap-4">
              <Link
                href="/contact"
                className="px-8 py-4 bg-brand-blue text-white text-xs font-bold uppercase tracking-widest hover:bg-brand-hover transition-transform active:scale-98"
              >
                Initiate Consultation
              </Link>
              <Link
                href="/gallery"
                className="px-8 py-4 border border-white/20 text-white text-xs font-bold uppercase tracking-widest hover:bg-white/5 transition-colors"
              >
                View Project Matrix
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: METRIC DATA ROW */}
      <section className="bg-brand-blue py-10 text-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 grid grid-cols-3 gap-6 text-center">
          {stats.map((stat) => (
            <div key={stat.label} className="space-y-1">
              <p className="text-3xl sm:text-4xl font-extrabold tracking-tight">
                {stat.value}
              </p>
              <p className="text-[9px] tracking-widest font-bold uppercase text-blue-100">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 3: SURFACE ORIENTED OVERVIEW */}
      <section className="py-28 max-w-7xl mx-auto px-6 sm:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-[10px] tracking-[0.3em] font-bold text-brand-blue uppercase block">
              Processing Excellence
            </span>
            <h2 className="text-3xl font-extrabold text-dark-blue uppercase tracking-tight leading-none">
              Decades of Expertise in Premium Stone Architecture
            </h2>
            <p className="text-slate-600 text-sm leading-relaxed font-medium">
              We focus on the deep structural polishing and seamless execution
              of high-end imports, ceramic layers, and rustic Kota alignments
              across commercial and historical asset spaces.
            </p>
            <div className="pt-2">
              <Link
                href="/about"
                className="inline-flex text-xs font-bold tracking-widest uppercase border-b-2 border-brand-blue pb-1 text-dark-blue hover:text-brand-blue transition-colors"
              >
                Our Corporate Heritage →
              </Link>
            </div>
          </div>
          {/* <div className="lg:col-span-5 relative h-[500px] bg-slate-100 border border-slate-200 p-2 shadow-sm">
            <div className="relative h-full w-full overflow-hidden">
              <Image
                src="https://a-bconstruction.in/wp-content/uploads/2025/02/freepik__upload__13408-682x1024.jpg"
                alt="High accuracy asset execution protocol alignment"
                fill
                sizes="(max-w-7xl) 33vw, 100vw"
                className="object-cover filter contrast-102"
                unoptimized
              />
            </div>
          </div> */}
        </div>
      </section>
    </div>
  );
}
