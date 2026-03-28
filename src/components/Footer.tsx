import { Heart } from "lucide-react";

const links = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export default function Footer() {
  return (
    <footer className="border-t border-border py-10 section-padding bg-card">
      <div className="max-w-6xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          <a href="#home" className="font-display font-bold text-xl text-foreground">
            SRK <span className="gradient-text">Shadhin</span><span className="text-primary">.</span>
          </a>
          <ul className="flex items-center gap-6">
            {links.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-sm text-muted-foreground hover:text-foreground link-underline pb-0.5 transition-colors duration-200"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="border-t border-border pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Md Sadikur Rahman Shadhin. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Crafted with <Heart size={12} className="text-primary fill-primary" /> and code
          </p>
        </div>
      </div>
    </footer>
  );
}
