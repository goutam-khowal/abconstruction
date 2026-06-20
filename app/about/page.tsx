import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Company Profile – A&B Construction",
  description:
    "Building Excellence for Over 40 Years. A legacy of craftsmanship in marble, stone, and tile installation.",
};

const leaders = [
  {
    name: "Late: Shri GangaRam Parewa",
    role: "Founder",
    image:
      "https://a-bconstruction.in/wp-content/uploads/2025/02/Untitled-design-72-1024x1024.png",
  },
  {
    name: "Mr. Amirchand Parewa",
    role: "Director",
    image:
      "https://a-bconstruction.in/wp-content/uploads/2025/02/Untitled-design-73-1024x1024.png",
  },
];

const values = [
  {
    title: "Quality Craftsmanship",
    desc: "Every surface we touch is treated with decades of expertise and meticulous attention to detail.",
  },
  {
    title: "Premium Materials",
    desc: "We use only the finest Italian marble, granite, Kota and Dholpur stones, and imported chemical treatments.",
  },
  {
    title: "Timely Delivery",
    desc: "We respect your time. Every project is delivered on schedule without compromising on quality.",
  },
  {
    title: "Customer Satisfaction",
    desc: "From consultation to final installation, we are dedicated to exceeding your expectations at every step.",
  },
];

export default function CompanyProfilePage() {
  return (
    <div className="bg-white text-slate-900 font-sans">
      {/* Hero Banner Area */}
      <section className="relative min-h-[55vh] flex items-center bg-dark-blue text-white pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-r from-darker-blue via-dark-blue/80 to-transparent z-10" />
        <div className="relative z-20 max-w-7xl mx-auto px-6 sm:px-12 w-full">
          <span className="text-brand-blue text-[10px] tracking-[0.4em] uppercase font-black block mb-3">
            Established 1977
          </span>
          <h1 className="text-4xl sm:text-6xl font-light tracking-tight uppercase leading-tight max-w-4xl">
            A Legacy of Craftsmanship in <br />
            <span className="font-extrabold text-transparent webkit-text-stroke">
              Marble, Stone & Tiles
            </span>
          </h1>
        </div>
      </section>

      {/* Main Structural Narrative */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start mb-24">
            <div className="lg:col-span-5 space-y-4">
              <span className="text-[10px] tracking-[0.3em] font-bold text-brand-blue uppercase block">
                Corporate Context
              </span>
              <h2 className="text-3xl font-extrabold tracking-tight text-dark-blue uppercase leading-none">
                Crafting Spaces with Precision & Passion
              </h2>
            </div>
            <div className="lg:col-span-7">
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed font-medium">
                At A and B Construction, we have been at the forefront of the
                infrastructure surface processing industry for over four
                decades, offering elite grade marble, architectural stone, and
                robust tile installation arrays. From prestigious government
                spaces like AIIMS and Central Vista to premium private scopes,
                we bring structural precision directly to life.
              </p>
            </div>
          </div>

          {/* Luxury White-Paletted Architecture Value Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((v) => (
              <div
                key={v.title}
                className="border border-slate-200 bg-ice p-8 hover:border-brand-blue/30 transition-colors group"
              >
                <div className="w-6 h-0.5 bg-brand-blue mb-4 transition-all group-hover:w-12" />
                <h3 className="text-dark-blue font-bold text-base uppercase tracking-tight mb-2">
                  {v.title}
                </h3>
                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed font-medium">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Beautiful Gallery Leadership Framing */}
      <section className="py-24 bg-ice border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-6 sm:px-12">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-3">
            <span className="text-[10px] tracking-[0.3em] font-bold text-brand-blue uppercase block">
              Foundational Vision
            </span>
            <h2 className="text-3xl font-extrabold text-dark-blue uppercase tracking-tight">
              The Driving Force Behind Our Legacy
            </h2>
          </div>

          <div className="flex flex-col sm:flex-row gap-16 justify-center items-center">
            {leaders.map((leader) => (
              <div key={leader.name} className="text-center group max-w-xs">
                <div className="relative mb-6 mx-auto w-56 h-56 border border-slate-200 bg-white p-3 shadow-sm transition-transform group-hover:scale-101">
                  <div className="relative w-full h-full overflow-hidden">
                    <Image
                      src={leader.image}
                      alt={leader.name}
                      fill
                      sizes="224px"
                      className="object-cover filter grayscale hover:grayscale-0 transition-all duration-500"
                      unoptimized
                    />
                  </div>
                </div>
                <span className="text-brand-blue text-[10px] tracking-[0.2em] font-bold uppercase block mb-1">
                  {leader.role}
                </span>
                <h3 className="text-dark-blue text-base font-bold uppercase tracking-tight">
                  {leader.name}
                </h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Approachable Footer Link Row */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 sm:px-12 text-center space-y-6">
          <h2 className="text-2xl font-extrabold text-dark-blue uppercase tracking-tight">
            Upgrade Your Space With Expert Precision
          </h2>
          <p className="text-slate-600 text-xs font-medium leading-relaxed max-w-md mx-auto">
            Experience superior corporate handling across high-end structural
            stone treatments.
          </p>
          <div className="pt-2">
            <Link
              href="/contact"
              className="inline-block px-10 py-4 bg-brand-blue text-white text-xs tracking-[0.2em] font-bold uppercase hover:bg-brand-hover transition-colors"
            >
              Transform Your Space Today
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
