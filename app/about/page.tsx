import Image from "next/image";
import Link from "next/link";

export const metadata = {
  title: "Company Profile – A&B Construction",
  description:
    "Building excellence for over four decades. A legacy of craftsmanship in marble, stone, and tile installation.",
};

const leaders = [
  {
    name: "Late: Shri GangaRam Parewa",
    role: "Founder",
    image:
      "https://cdcyuvyzdezofklnrkrq.supabase.co/storage/v1/object/public/People/dada.png",
  },
  {
    name: "Mr. Amirchand Parewa",
    role: "Director",
    image:
      "https://cdcyuvyzdezofklnrkrq.supabase.co/storage/v1/object/public/People/Amirchand_Parewa-removebg-preview.png",
  },
];

export default function CompanyProfilePage() {
  return (
    <div className="bg-stone-50 text-stone-900 font-sans">
      <section className="relative min-h-[40vh] sm:min-h-[45vh] flex items-center bg-stone-900 text-white pt-28 sm:pt-32 pb-12 sm:pb-16">
        <div className="absolute inset-0 bg-gradient-to-r from-stone-950 via-stone-900/80 to-transparent z-10" />
        <div className="about-hero-content relative z-20 max-w-7xl mx-auto px-4 sm:px-8 md:px-12 w-full">
          <div className="about-hero-badge flex items-center gap-2 mb-2">
            <span className="text-amber-500 text-xs tracking-widest uppercase font-extrabold">
              Established 1977
            </span>
            <span className="text-stone-400 text-xs font-semibold uppercase">
              • Formerly GANGA RAM &amp; Sons
            </span>
          </div>
          <span
            className="about-hero-rule block h-[2px] w-14 bg-amber-500/70 origin-left mb-4"
            aria-hidden="true"
          />
          <h1 className="text-3xl sm:text-5xl font-light tracking-tight uppercase leading-tight max-w-3xl">
            <span className="about-hero-title-line block">
              A Four-Decade Legacy in
            </span>
            <span className="about-hero-title-line font-extrabold text-amber-500 block">
              Marble &amp; Stone Work
            </span>
          </h1>
        </div>
      </section>

      <section className="py-12 sm:py-20 max-w-7xl mx-auto px-4 sm:px-8 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          <div className="lg:col-span-5 space-y-2">
            <span className="text-xs tracking-widest font-extrabold text-amber-600 uppercase block">
              Corporate Heritage
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-stone-900 uppercase">
              Precision Engineering &amp; Surface Mastery
            </h2>
          </div>
          <div className="lg:col-span-7">
            <p className="text-stone-600 text-sm sm:text-base leading-relaxed font-medium">
              Founded in 1977{" "}
              <strong className="text-stone-900">A&amp;B Construction</strong>{" "}
              (previously known as as <strong>Ganga Ram &amp; Sons</strong>) has
              built a multi-generational legacy executing high-spec surface
              installations across commercial complexes, government embassies,
              educational institutes, and luxury private residences across
              India.
            </p>
          </div>
        </div>

        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-2xl font-extrabold text-stone-900 uppercase tracking-tight">
            Foundational Leadership
          </h2>
        </div>

        <div className="flex flex-col sm:flex-row gap-8 justify-center items-center">
          {leaders.map((leader) => (
            <div
              key={leader.name}
              className="text-center w-full sm:w-auto max-w-xs"
            >
              <div className="relative mb-4 mx-auto w-48 h-48 border border-stone-200 bg-white p-2 shadow-sm rounded-sm">
                <div className="relative w-full h-full overflow-hidden">
                  <Image
                    src={leader.image}
                    alt={leader.name}
                    fill
                    loading="lazy"
                    sizes="192px"
                    className="object-cover object-top"
                    unoptimized
                  />
                </div>
              </div>
              <span className="text-amber-600 text-xs font-extrabold uppercase block mb-1">
                {leader.role}
              </span>
              <h3 className="text-stone-900 text-base font-extrabold uppercase tracking-tight">
                {leader.name}
              </h3>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
