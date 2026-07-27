import Image from "next/image";
import Link from "next/link";
import PartnerMarquee from "@/components/PartnerMarquee";

export const metadata = {
  title: "Projects – A&B Construction",
  description:
    "Bringing Visions to Life! Explore our completed projects — craftsmanship meets perfection.",
};

const projectCategories = [
  {
    label: "Commercial Projects",
    image:
      "https://a-bconstruction.in/wp-content/uploads/2025/01/1-1024x1024.png",
    desc: "Office buildings, retail spaces, hotels, and corporate interiors with premium marble and stone finishes.",
  },
  {
    label: "Healthcare Projects",
    image:
      "https://a-bconstruction.in/wp-content/uploads/2025/01/2-1024x1024.png",
    desc: "Hospitals and medical facilities requiring hygienic, durable, and aesthetically refined surfaces.",
  },
  {
    label: "Residential Projects",
    image:
      "https://a-bconstruction.in/wp-content/uploads/2025/01/3-1024x1024.png",
    desc: "Luxury homes, apartments, and villas — transforming living spaces with timeless marble and tile.",
  },
  {
    label: "Public Projects",
    image:
      "https://a-bconstruction.in/wp-content/uploads/2025/01/4-1024x1024.png",
    desc: "Government buildings, airports, monuments, and public institutions demanding lasting craftsmanship.",
  },
];

export default function ProjectsPage() {
  return (
    <div className="bg-white text-slate-900 font-sans">
      {/* Hero Header */}
      <section className="relative min-h-[50vh] flex items-center bg-dark-blue text-white pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-r from-darker-blue via-dark-blue/80 to-transparent z-10" />
        <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-12 w-full">
          <span className="text-brand-blue text-[10px] tracking-[0.4em] uppercase font-black block mb-3">
            Portfolio Registry
          </span>
          <h1 className="text-4xl sm:text-6xl font-light tracking-tight text-white uppercase leading-none">
            Where Craftsmanship <br />
            <span className="font-extrabold text-transparent webkit-text-stroke">
              Meets Perfection.
            </span>
          </h1>
        </div>
      </section>

      {/* Domain Cards Presentation Layer */}
      <section className="py-24 max-w-7xl mx-auto px-6 sm:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projectCategories.map((cat, idx) => (
            <div
              key={cat.label}
              className="border border-slate-200 bg-ice flex flex-col justify-between group hover:border-brand-blue/20 transition-all"
            >
              <div className="relative h-72 overflow-hidden bg-slate-100 border-b border-slate-200">
                <Image
                  src={cat.image}
                  alt={cat.label}
                  fill
                  priority={idx < 2}
                  sizes="(max-w-7xl) 50vw, 100vw"
                  className="object-cover filter brightness-95 group-hover:scale-101 transition-transform duration-700"
                  unoptimized
                />
              </div>
              <div className="p-8 bg-white space-y-3">
                <span className="h-0.5 w-6 bg-brand-blue block" />
                <h3 className="text-dark-blue font-bold text-xl uppercase tracking-tight">
                  {cat.label}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                  {cat.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
