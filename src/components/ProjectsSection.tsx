import { ExternalLink, Code2, ShoppingCart, BarChart3, Headphones } from "lucide-react";

const projects = [
  {
    title: "ZyronBD — E-Commerce Store",
    description: "A full-stack fashion e-commerce platform with product catalog, cart, checkout, payment integration, and admin dashboard. Live at zyronbd.com.",
    tags: ["E-Commerce", "Full-Stack", "Responsive"],
    icon: ShoppingCart,
    accent: "from-primary/20 to-primary/5",
    image: "/images/zyronbd-preview.png",
    url: "https://zyronbd.com",
  },
  {
    title: "Personal Portfolio",
    description: "A modern, responsive portfolio template built with clean code and thoughtful design.",
    tags: ["HTML/CSS", "Responsive", "Design"],
    icon: Code2,
    accent: "from-[hsl(200,70%,52%)]/20 to-[hsl(200,70%,52%)]/5",
  },
  {
    title: "Campaign Manager",
    description: "Marketing analytics dashboard for tracking campaign performance and generating reports.",
    tags: ["Analytics", "Marketing", "Reports"],
    icon: BarChart3,
    accent: "from-[hsl(35,90%,55%)]/20 to-[hsl(35,90%,55%)]/5",
  },
  {
    title: "Customer Support Toolkit",
    description: "Quality assurance tools and scripts for call center operations and customer satisfaction.",
    tags: ["QA", "Scripts", "Support"],
    icon: Headphones,
    accent: "from-[hsl(280,60%,55%)]/20 to-[hsl(280,60%,55%)]/5",
  },
];

export default function ProjectsSection() {
  return (
    <section id="projects" className="py-28 md:py-36 section-padding bg-card relative overflow-hidden">
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-primary/3 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-14 relative">
        <div className="reveal space-y-4 max-w-lg">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium uppercase tracking-widest">
            Portfolio
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground leading-[1.1]">
            Featured <span className="gradient-text">Work</span>
          </h2>
          <p className="text-muted-foreground text-sm leading-relaxed">
            A selection of projects that showcase my skills in web development, e-commerce, and digital marketing.
          </p>
        </div>

        {/* Featured project — ZyronBD */}
        <a
          href={projects[0].url}
          target="_blank"
          rel="noopener noreferrer"
          className="reveal block group bg-background rounded-2xl overflow-hidden border border-border card-lift"
        >
          <div className="relative overflow-hidden">
            <img
              src={projects[0].image}
              alt={projects[0].title}
              className="w-full h-48 sm:h-64 md:h-80 object-cover object-top group-hover:scale-[1.03] transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-5 right-5 flex items-end justify-between">
              <div>
                <p className="text-[11px] uppercase tracking-widest text-white/70 font-medium mb-1">Live Project</p>
                <h3 className="font-display font-bold text-xl text-white">{projects[0].title}</h3>
              </div>
              <span className="bg-white/20 backdrop-blur-sm text-white p-2 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                <ExternalLink size={16} />
              </span>
            </div>
          </div>
          <div className="p-5 sm:p-6 space-y-3">
            <p className="text-sm text-muted-foreground leading-relaxed">
              {projects[0].description}
            </p>
            <div className="flex flex-wrap gap-2">
              {projects[0].tags.map((t) => (
                <span
                  key={t}
                  className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </a>

        {/* Other projects grid */}
        <div className="grid sm:grid-cols-3 gap-6">
          {projects.slice(1).map((p, i) => (
            <div
              key={p.title}
              className="reveal group bg-background rounded-2xl overflow-hidden border border-border card-lift cursor-pointer"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className={`h-28 bg-gradient-to-br ${p.accent} flex items-center justify-center relative`}>
                <p.icon
                  size={36}
                  className="text-foreground/15 group-hover:text-foreground/25 group-hover:scale-110 transition-all duration-500"
                />
              </div>
              <div className="p-5 space-y-3">
                <h3 className="font-display font-semibold text-base text-foreground group-hover:text-primary transition-colors duration-300">
                  {p.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {p.description}
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[11px] font-medium px-2.5 py-1 rounded-md bg-secondary text-secondary-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
