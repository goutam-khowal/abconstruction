import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-stone-950 border-t border-stone-800 pt-12 sm:pt-16 pb-8 text-stone-400 font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-8 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <Image
                src="https://a-bconstruction.in/wp-content/uploads/2025/01/cropped-AB-Con-Logo-1-3-80x64.png"
                alt="A&B Construction Logo"
                width={38}
                height={30}
                className="object-contain"
                unoptimized
              />
              <span className="font-extrabold text-sm tracking-wider text-white uppercase">
                A&amp;B{" "}
                <span className="text-amber-500 font-light">CONSTRUCTION</span>
              </span>
            </div>
            <p className="text-stone-400 text-xs sm:text-sm leading-relaxed max-w-sm font-medium">
              Expert laying, diamond polishing, and stone cladding across India
              since 1977.
            </p>
          </div>

          <div>
            <h4 className="text-xs tracking-widest uppercase text-stone-300 font-extrabold mb-4">
              Project Domains
            </h4>
            <ul className="space-y-2 text-xs font-bold uppercase">
              {[
                "Commercial Projects",
                "Public Projects",
                "Residential Projects",
                "Healthcare Projects",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="/projects"
                    className="text-stone-400 hover:text-amber-400 py-1 block min-h-[36px] flex items-center"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs tracking-widest uppercase text-stone-300 font-extrabold mb-4">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs font-bold uppercase">
              {[
                { label: "Home", path: "/" },
                { label: "Company Profile", path: "/about" },
                { label: "Gallery", path: "/gallery" },
                { label: "Projects", path: "/projects" },
                { label: "Services", path: "/services" },
                { label: "Contact Us", path: "/contact" },
              ].map((item) => (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className="text-stone-400 hover:text-amber-400 py-1 block min-h-[36px] flex items-center"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-stone-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 uppercase font-semibold">
          <p>
            © {new Date().getFullYear()} A&amp;B Construction. All Rights
            Reserved.
          </p>
          <div className="flex gap-6">
            <a
              href="mailto:contact@abconstructions.co.in"
              className="hover:text-amber-400"
            >
              Email
            </a>
            <a
              href="https://www.instagram.com/abconstruction1977"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-amber-400"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
