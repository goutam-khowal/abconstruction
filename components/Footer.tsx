import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="bg-darker-blue border-t border-white/5 pt-16 pb-8 text-slate-400 font-sans">
      <div className="max-w-7xl mx-auto px-6 sm:px-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <Image
                src="https://a-bconstruction.in/wp-content/uploads/2025/01/cropped-AB-Con-Logo-1-3-80x64.png"
                alt="A&B Construction Logo"
                width={40}
                height={32}
                className="object-contain"
                unoptimized
              />
              <span className="font-extrabold text-sm tracking-[0.3em] text-white uppercase">
                A&B{" "}
                <span className="text-brand-blue font-light">CONSTRUCTION</span>
              </span>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm leading-relaxed max-w-sm font-medium">
              Expert processing, surface grinding, and seamless implementation
              of Italian marble, granite, and premium structural tile matrices
              across India since 1977.
            </p>
          </div>

          <div>
            <h4 className="text-[10px] tracking-[0.25em] uppercase text-slate-500 font-black mb-6">
              Execution Categories
            </h4>
            <ul className="space-y-3 text-xs font-bold uppercase tracking-wider">
              {[
                "Commercial Projects",
                "Public Projects",
                "Residential Projects",
                "Healthcare Projects",
              ].map((item) => (
                <li key={item}>
                  <Link
                    href="/projects"
                    className="text-slate-400 hover:text-brand-blue transition-colors"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-[10px] tracking-[0.25em] uppercase text-slate-500 font-black mb-6">
              Core Operations Nav
            </h4>
            <ul className="space-y-3 text-xs font-bold uppercase tracking-wider">
              {[
                { label: "Home Base", path: "/" },
                { label: "Our Heritage", path: "/about" },
                { label: "Surface Projects", path: "/projects" },
                { label: "Media Gallery", path: "/gallery" },
                { label: "Contact Us", path: "/contact" },
              ].map((item) => (
                <li key={item.path}>
                  <Link
                    href={item.path}
                    className="text-slate-400 hover:text-brand-blue transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-slate-500 tracking-widest uppercase font-semibold">
          <p>© A&B Construction</p>
          <div className="flex gap-6">
            {/* <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-blue transition-colors"
            >
              Facebook
            </a> */}
            <a
              href="https://www.instagram.com/abconstruction1977"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-brand-blue transition-colors"
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
