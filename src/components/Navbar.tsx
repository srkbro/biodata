import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/90 backdrop-blur-xl shadow-sm shadow-foreground/5 border-b border-border"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between section-padding py-4">
        <a
          href="#home"
          className="font-display font-bold text-xl tracking-tight text-foreground group"
        >
          SRK
          <span className="gradient-text transition-opacity duration-300"> Shadhin</span>
          <span className="text-primary">.</span>
        </a>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground link-underline pb-1 transition-colors duration-200"
              >
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href="#contact"
              className="text-sm font-medium bg-primary text-primary-foreground px-5 py-2 rounded-lg hover:opacity-90 active:scale-[0.96] transition-all duration-200 shadow-sm shadow-primary/20"
            >
              Let's Talk
            </a>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden text-foreground active:scale-90 transition-transform duration-200"
          aria-label="Toggle menu"
        >
          {open ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-400 ease-out ${
          open ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-background/95 backdrop-blur-xl border-b border-border">
          <ul className="flex flex-col section-padding pb-6 gap-4">
            {links.map((l, i) => (
              <li
                key={l.href}
                className={open ? "animate-slide-down" : ""}
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors block py-1"
                >
                  {l.label}
                </a>
              </li>
            ))}
            <li className={open ? "animate-slide-down" : ""} style={{ animationDelay: "240ms" }}>
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="inline-flex text-sm font-medium bg-primary text-primary-foreground px-5 py-2.5 rounded-lg"
              >
                Let's Talk
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
