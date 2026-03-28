import { Mail, Send, Facebook, Instagram, MapPin, ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

const socials = [
  {
    label: "Facebook",
    handle: "/srkshadhin7",
    url: "https://facebook.com/srkshadhin7",
    icon: Facebook,
    bg: "bg-[hsl(220,46%,48%)]",
    hover: "hover:shadow-[hsl(220,46%,48%)]/30",
  },
  {
    label: "Instagram",
    handle: "@srk_shadhin",
    url: "https://instagram.com/srk_shadhin",
    icon: Instagram,
    bg: "bg-[hsl(340,75%,54%)]",
    hover: "hover:shadow-[hsl(340,75%,54%)]/30",
  },
  {
    label: "Telegram",
    handle: "@srkvai",
    url: "https://t.me/srkvai",
    icon: Send,
    bg: "bg-[hsl(200,70%,52%)]",
    hover: "hover:shadow-[hsl(200,70%,52%)]/30",
  },
];

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please fill in all fields");
      return;
    }
    setSending(true);
    const { error } = await supabase.from("contact_messages").insert({
      name: form.name.trim(),
      email: form.email.trim(),
      message: form.message.trim(),
    });
    setSending(false);
    if (error) {
      toast.error("Failed to send message. Please try again.");
    } else {
      setSent(true);
      toast.success("Message sent! I'll get back to you soon.");
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSent(false), 4000);
    }
  };

  return (
    <section id="contact" className="py-28 md:py-36 section-padding relative overflow-hidden">
      <div className="absolute top-0 left-1/2 w-[500px] h-[500px] bg-primary/3 rounded-full blur-3xl pointer-events-none -translate-x-1/2" />

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 relative">
        {/* Left */}
        <div className="reveal-left space-y-6">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full text-xs font-medium uppercase tracking-widest">
            Get In Touch
          </div>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground leading-[1.1]">
            Let's build something{" "}
            <span className="gradient-text">great together</span>
          </h2>
          <p className="text-muted-foreground leading-relaxed max-w-md">
            Ready to take your brand to the next level? Reach out and let's
            discuss how I can help you achieve your goals.
          </p>

          <div className="flex items-center gap-2 text-sm text-muted-foreground pt-2">
            <MapPin size={14} className="text-primary" />
            <span>Available worldwide · Remote friendly</span>
          </div>

          {/* Social links */}
          <div className="flex gap-4 pt-4">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                title={`${s.label} ${s.handle}`}
                className={`group relative w-14 h-14 rounded-2xl ${s.bg} text-white flex items-center justify-center magnetic-hover hover:shadow-xl ${s.hover} active:scale-90 transition-all duration-300`}
              >
                <s.icon size={20} />
                <ArrowUpRight
                  size={10}
                  className="absolute top-1.5 right-1.5 opacity-0 group-hover:opacity-70 transition-opacity duration-300"
                />
              </a>
            ))}
          </div>
        </div>

        {/* Form */}
        <form
          className="reveal-right space-y-5"
          style={{ transitionDelay: "150ms" }}
          onSubmit={handleSubmit}
        >
          <div className="bg-background border border-border rounded-2xl p-6 sm:p-8 space-y-5 shadow-sm shadow-foreground/5">
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Name</label>
              <input
                type="text"
                placeholder="Your name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none input-glow transition-all duration-300"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Email</label>
              <input
                type="email"
                placeholder="your@email.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none input-glow transition-all duration-300"
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-sm font-medium text-foreground">Message</label>
              <textarea
                rows={4}
                placeholder="Tell me about your project..."
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full px-4 py-3 rounded-xl bg-secondary border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none input-glow transition-all duration-300 resize-none"
              />
            </div>
            <button
              type="submit"
              disabled={sending}
              className={`w-full inline-flex items-center justify-center gap-2 py-3.5 rounded-xl font-medium text-sm active:scale-[0.97] transition-all duration-300 shadow-md ${
                sent
                  ? "bg-green-600 text-white shadow-green-600/20"
                  : "bg-primary text-primary-foreground hover:shadow-lg hover:shadow-primary/25 shadow-primary/20"
              } disabled:opacity-50`}
            >
              {sent ? (
                <>✓ Sent Successfully</>
              ) : (
                <>
                  <Mail size={16} />
                  {sending ? "Sending..." : "Send Message"}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
