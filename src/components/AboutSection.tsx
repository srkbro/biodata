import { useEffect, useRef, useState } from "react";
import { Code2, Globe, Database, BarChart3, Phone, Users, Briefcase, TrendingUp } from "lucide-react";

const skills = [
  { name: "Web Development", level: 88, icon: Code2 },
  { name: "E-Commerce Solutions", level: 85, icon: Globe },
  { name: "Backend Development", level: 82, icon: Database },
  { name: "Digital Marketing", level: 90, icon: BarChart3 },
  { name: "Telemarketing", level: 85, icon: Phone },
  { name: "Affiliate Marketing", level: 80, icon: TrendingUp },
  { name: "Customer Service", level: 92, icon: Users },
];

const highlights = [
  { num: "20+", label: "Projects Completed", icon: Briefcase },
  { num: "15+", label: "Happy Clients", icon: Users },
  { num: "3+", label: "Years Experience", icon: TrendingUp },
];

export default function AboutSection() {
  const [barsVisible, setBarsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setBarsVisible(true); },
      { threshold: 0.2 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="about" className="py-28 md:py-36 section-padding relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-primary/3 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />

      <div className="max-w-6xl mx-auto space-y-20 relative">
        {/* Header + description */}
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div className="reveal-left space-y-5">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium uppercase tracking-widest">
              About Me
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground leading-[1.1]">
              Focused, consistent, and{" "}
              <span className="gradient-text">always improving</span>
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              I'm a web developer and digital marketer with hands-on experience
              building fully responsive websites, e-commerce platforms, and
              backend systems. I specialize in creating user-centered solutions
              that deliver measurable results.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Work smart. Stay consistent. Grow every day. Your growth is my priority.
            </p>
          </div>

          {/* Highlight cards */}
          <div className="reveal-right grid grid-cols-3 gap-3" style={{ transitionDelay: "150ms" }}>
            {highlights.map((h, i) => (
              <div
                key={h.label}
                className="bg-card border border-border rounded-xl p-4 text-center magnetic-hover"
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mx-auto mb-3">
                  <h.icon size={18} className="text-primary" />
                </div>
                <p className="text-2xl font-bold font-display text-foreground tabular-nums">{h.num}</p>
                <p className="text-[11px] text-muted-foreground mt-1 leading-tight">{h.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Skills */}
        <div ref={sectionRef}>
          <div className="reveal space-y-8">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium uppercase tracking-widest">
              Skills & Expertise
            </div>
            <div className="grid sm:grid-cols-2 gap-x-12 gap-y-5">
              {skills.map((s, i) => (
                <div key={s.name} className="space-y-2.5 group">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center gap-2 font-medium text-foreground">
                      <s.icon size={14} className="text-primary opacity-70 group-hover:opacity-100 transition-opacity" />
                      {s.name}
                    </span>
                    <span className="tabular-nums text-muted-foreground text-xs font-medium">{s.level}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-secondary overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-primary to-primary/70 skill-bar"
                      style={{
                        width: barsVisible ? `${s.level}%` : "0%",
                        transitionDelay: `${i * 100}ms`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
