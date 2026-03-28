import { useEffect, useState } from "react";
import { ArrowDown, Code2, Megaphone, ShoppingCart } from "lucide-react";

const roles = ["Web Developer", "Digital Marketer", "E-Commerce Builder"];

export default function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [typing, setTyping] = useState(true);

  useEffect(() => {
    const role = roles[roleIndex];
    let i = 0;
    let deleting = false;
    let timeout: ReturnType<typeof setTimeout>;

    const step = () => {
      if (!deleting) {
        setDisplayed(role.slice(0, i + 1));
        i++;
        if (i >= role.length) {
          deleting = false;
          timeout = setTimeout(() => {
            deleting = true;
            step();
          }, 2200);
          return;
        }
        timeout = setTimeout(step, 70);
      } else {
        setDisplayed(role.slice(0, i));
        i--;
        if (i < 0) {
          setRoleIndex((prev) => (prev + 1) % roles.length);
          return;
        }
        timeout = setTimeout(step, 40);
      }
    };

    timeout = setTimeout(step, 400);
    return () => clearTimeout(timeout);
  }, [roleIndex]);

  const stats = [
    { icon: Code2, label: "Web Dev", value: "Full-Stack" },
    { icon: ShoppingCart, label: "E-Commerce", value: "Specialist" },
    { icon: Megaphone, label: "Marketing", value: "Expert" },
  ];

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center pt-20 pb-12 section-padding overflow-hidden"
    >
      {/* Background decoration */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-0 w-[300px] h-[300px] bg-primary/3 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-12 md:gap-16 items-center relative">
        {/* Text */}
        <div className="order-2 md:order-1 space-y-7">
          <div
            className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-1.5 rounded-full text-sm font-medium opacity-0 animate-fade-in-up"
            style={{ animationDelay: "200ms" }}
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            Available for hire
          </div>

          <h1
            className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold leading-[1.05] tracking-tight text-foreground opacity-0 animate-fade-in-up"
            style={{ animationDelay: "350ms", lineHeight: "1.08" }}
          >
            Hi, I'm{" "}
            <span className="gradient-text">SRK Shadhin</span>
          </h1>

          <div
            className="h-8 opacity-0 animate-fade-in-up"
            style={{ animationDelay: "500ms" }}
          >
            <p className="text-lg font-display font-medium text-muted-foreground">
              <span>{displayed}</span>
              <span className="typing-cursor" />
            </p>
          </div>

          <p
            className="text-muted-foreground max-w-md text-base leading-relaxed opacity-0 animate-fade-in-up"
            style={{ animationDelay: "600ms" }}
          >
            I build fully responsive websites, e-commerce platforms, and backend
            systems. I run digital campaigns and deliver high-quality experiences
            that help brands connect and grow.
          </p>

          <div
            className="flex flex-wrap gap-4 pt-1 opacity-0 animate-fade-in-up"
            style={{ animationDelay: "750ms" }}
          >
            <a
              href="#contact"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3.5 rounded-xl font-medium text-sm hover:shadow-lg hover:shadow-primary/25 active:scale-[0.96] transition-all duration-300"
            >
              Hire Me
              <span className="w-1.5 h-1.5 rounded-full bg-primary-foreground/60" />
            </a>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 border border-border bg-background text-foreground px-7 py-3.5 rounded-xl font-medium text-sm hover:bg-secondary hover:border-primary/20 active:scale-[0.96] transition-all duration-300"
            >
              View Work
            </a>
          </div>

          {/* Mini stats */}
          <div
            className="flex gap-6 pt-4 opacity-0 animate-fade-in-up"
            style={{ animationDelay: "900ms" }}
          >
            {stats.map((s) => (
              <div key={s.label} className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center">
                  <s.icon size={16} className="text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground leading-none">{s.label}</p>
                  <p className="text-xs font-semibold text-foreground mt-0.5">{s.value}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Photo */}
        <div
          className="order-1 md:order-2 flex justify-center md:justify-end opacity-0 animate-scale-up"
          style={{ animationDelay: "500ms" }}
        >
          <div className="relative">
            {/* Glow ring wrapper */}
            <div className="glow-ring w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full float overflow-hidden">
              <img
                src="/images/profile.png"
                alt="SRK Shadhin — Web Developer"
                className="w-full h-full object-cover rounded-full scale-[1.35]"
              />
            </div>
            {/* Floating badge */}
            <div className="absolute -bottom-2 -right-2 sm:bottom-0 sm:right-0 bg-background border border-border rounded-xl px-3 py-2 shadow-lg shadow-foreground/5 animate-fade-in-up" style={{ animationDelay: "1100ms" }}>
              <p className="text-xs font-semibold text-foreground">💻 Open to Work</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted-foreground/50 hover:text-primary transition-colors hidden md:flex flex-col items-center gap-1"
        aria-label="Scroll down"
      >
        <span className="text-[10px] uppercase tracking-widest font-medium">Scroll</span>
        <ArrowDown size={16} className="animate-bounce" />
      </a>
    </section>
  );
}
