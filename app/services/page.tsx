import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Services – A&B Construction",
  description:
    "Expert laying, diamond grinding, and specialized tile installation services across India.",
};
const projectCategories = [
  {
    label: "Commercial Projects",
    image:
      "https://a-bconstruction.in/wp-content/uploads/2025/01/1-1024x1024.png",
    desc: "Office complexes, retail centers, luxury hotels, and corporate headquarters rendered with premium marble and granite finishes.",
  },
  {
    label: "Healthcare Projects",
    image:
      "https://a-bconstruction.in/wp-content/uploads/2025/01/2-1024x1024.png",
    desc: "Hospitals and medical research facilities requiring durable, hygienic, and seamless floor and wall matrices.",
  },
  {
    label: "Residential Projects",
    image:
      "https://a-bconstruction.in/wp-content/uploads/2025/01/3-1024x1024.png",
    desc: "Luxury private residences, executive apartments, and villas transformed with Italian marble laying and precision polishing.",
  },
  {
    label: "Public & Institutional Projects",
    image:
      "https://a-bconstruction.in/wp-content/uploads/2025/01/4-1024x1024.png",
    desc: "Government headquarters, embassies, educational campuses, and public monuments engineered for high durability.",
  },
];

const serviceItems = [
  {
    title: "Italian Marble Installation & Diamond Grinding",
    desc: "Precision laying, chemical epoxy treatment, seamless joint alignment, and multi-stage mirror diamond polishing for high-end luxury imported slabs.",
  },
  {
    title: "Granite & Dholpur Architectural Stone Execution",
    desc: "Heavy-duty outdoor and indoor structural stone fitting, high-end finish of Italian marble, granites & all types of tiles, and Dholpur facade claddings engineered for long-term commercial wear.",
  },
  {
    title: "High-Performance Tile & Facade Cladding",
    desc: "Large-format porcelain, vitrified ceramic layers, and ventilated exterior wall cladding installed with precision laser levelling.",
  },
];

export default function ServicesPage() {
  return (
    <div className="bg-stone-50 text-stone-900 font-sans">
      <section className="relative min-h-[40vh] sm:min-h-[45vh] flex items-center bg-stone-900 text-white pt-28 sm:pt-32 pb-12 sm:pb-16">
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-900/80 to-transparent z-10" />
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-8 md:px-12 w-full">
          <span className="text-amber-500 text-xs tracking-widest uppercase font-extrabold block mb-2">
            Technical Capabilities
          </span>
          <h1 className="text-3xl sm:text-5xl font-light tracking-tight text-white uppercase leading-tight">
            Comprehensive <br />
            <span className="font-extrabold text-amber-500">
              Surface Services.
            </span>
          </h1>
        </div>
      </section>

      {/* Domain Cards Presentation Layer */}
      <section className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-8 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {projectCategories.map((cat, idx) => (
            <div
              key={cat.label}
              className="border border-stone-200 bg-white flex flex-col justify-between hover:border-amber-500/50 transition-all rounded-sm overflow-hidden shadow-sm"
            >
              <div className="relative h-56 sm:h-72 w-full overflow-hidden bg-stone-100 border-b border-stone-200">
                <Image
                  src={cat.image}
                  alt={cat.label}
                  fill
                  priority={idx < 2}
                  loading={idx < 2 ? "eager" : "lazy"}
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover filter brightness-95 hover:scale-105 transition-transform duration-700"
                  unoptimized
                />
              </div>
              <div className="p-6 sm:p-8 space-y-3">
                <span className="h-0.5 w-8 bg-amber-600 block" />
                <h3 className="text-stone-900 font-extrabold text-xl uppercase tracking-tight">
                  {cat.label}
                </h3>
                <p className="text-stone-600 text-sm leading-relaxed font-medium">
                  {cat.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-12 sm:py-6 pb-12 sm:pb-20 max-w-7xl mx-auto px-4 sm:px-8 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {serviceItems.map((s) => (
            <div
              key={s.title}
              className="border border-stone-200 bg-white p-6 sm:p-8 flex flex-col justify-between hover:border-amber-500/50 transition-colors rounded-sm shadow-sm"
            >
              <div className="space-y-3">
                <span className="h-0.5 w-8 bg-amber-600 block" />
                <h3 className="text-stone-900 font-extrabold text-lg uppercase tracking-tight">
                  {s.title}
                </h3>
                <p className="text-stone-600 text-sm font-medium leading-relaxed">
                  {s.desc}
                </p>
              </div>
              <div className="pt-6">
                <Link
                  href="/contact"
                  className="inline-flex items-center text-xs font-extrabold text-amber-600 uppercase tracking-widest hover:underline min-h-[44px]"
                >
                  Inquire Technical Specifications →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
