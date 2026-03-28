import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "react-router-dom";
import { Mail, Trash2, Eye, EyeOff, LogOut, ArrowLeft, CheckCircle } from "lucide-react";
import { toast } from "sonner";

type Message = {
  id: string;
  name: string;
  email: string;
  message: string;
  is_read: boolean;
  created_at: string;
};

export default function AdminPage() {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<any>(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);
  const [selected, setSelected] = useState<Message | null>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setAuthLoading(false);
    });
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setAuthLoading(false);
    });
    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session) fetchMessages();
  }, [session]);

  const fetchMessages = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error && data) setMessages(data);
    setLoading(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    setLoginLoading(false);
    if (error) toast.error(error.message);
  };

  const toggleRead = async (msg: Message) => {
    await supabase.from("contact_messages").update({ is_read: !msg.is_read }).eq("id", msg.id);
    setMessages((prev) => prev.map((m) => (m.id === msg.id ? { ...m, is_read: !m.is_read } : m)));
    if (selected?.id === msg.id) setSelected({ ...msg, is_read: !msg.is_read });
  };

  const deleteMsg = async (id: string) => {
    await supabase.from("contact_messages").delete().eq("id", id);
    setMessages((prev) => prev.filter((m) => m.id !== id));
    if (selected?.id === id) setSelected(null);
    toast.success("Message deleted");
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setSession(null);
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Login screen
  if (!session) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center section-padding">
        <div className="w-full max-w-sm space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-bold font-display text-foreground">Admin Login</h1>
            <p className="text-sm text-muted-foreground">Sign in to view messages</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-secondary border border-border text-foreground text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/40"
            />
            <button
              type="submit"
              disabled={loginLoading}
              className="w-full bg-primary text-primary-foreground py-3 rounded-lg font-medium text-sm hover:opacity-90 active:scale-[0.97] transition-all disabled:opacity-50"
            >
              {loginLoading ? "Signing in..." : "Sign In"}
            </button>
          </form>
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mx-auto transition-colors"
          >
            <ArrowLeft size={14} /> Back to site
          </button>
        </div>
      </div>
    );
  }

  const unreadCount = messages.filter((m) => !m.is_read).length;

  // Admin dashboard
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-background/80 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-6xl mx-auto flex items-center justify-between section-padding py-4">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/")}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft size={18} />
            </button>
            <h1 className="font-display font-bold text-lg text-foreground">
              Messages
              {unreadCount > 0 && (
                <span className="ml-2 text-xs bg-primary text-primary-foreground px-2 py-0.5 rounded-full">
                  {unreadCount} new
                </span>
              )}
            </h1>
          </div>
          <button
            onClick={logout}
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </header>

      <div className="max-w-6xl mx-auto section-padding py-8">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          </div>
        ) : messages.length === 0 ? (
          <div className="text-center py-20 space-y-3">
            <Mail size={40} className="mx-auto text-muted-foreground/40" />
            <p className="text-muted-foreground">No messages yet</p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_1.2fr] gap-6">
            {/* Message list */}
            <div className="space-y-2 max-h-[70vh] overflow-y-auto pr-2">
              {messages.map((msg) => (
                <button
                  key={msg.id}
                  onClick={() => {
                    setSelected(msg);
                    if (!msg.is_read) toggleRead(msg);
                  }}
                  className={`w-full text-left p-4 rounded-xl border transition-all duration-200 active:scale-[0.98] ${
                    selected?.id === msg.id
                      ? "border-primary bg-primary/5 shadow-sm"
                      : "border-border bg-card hover:bg-secondary"
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        {!msg.is_read && (
                          <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                        )}
                        <span className="font-medium text-sm text-foreground truncate">
                          {msg.name}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5 truncate">{msg.email}</p>
                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{msg.message}</p>
                    </div>
                    <span className="text-[10px] text-muted-foreground/60 flex-shrink-0 tabular-nums">
                      {new Date(msg.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </button>
              ))}
            </div>

            {/* Detail view */}
            {selected ? (
              <div className="bg-card border border-border rounded-xl p-6 space-y-4 h-fit sticky top-24">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-display font-semibold text-lg text-foreground">{selected.name}</h3>
                    <a href={`mailto:${selected.email}`} className="text-sm text-primary hover:underline">
                      {selected.email}
                    </a>
                  </div>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => toggleRead(selected)}
                      className="p-2 rounded-lg hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors"
                      title={selected.is_read ? "Mark as unread" : "Mark as read"}
                    >
                      {selected.is_read ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                    <button
                      onClick={() => deleteMsg(selected.id)}
                      className="p-2 rounded-lg hover:bg-destructive/10 text-muted-foreground hover:text-destructive transition-colors"
                      title="Delete"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span>{new Date(selected.created_at).toLocaleString()}</span>
                  {selected.is_read && (
                    <span className="flex items-center gap-1 text-primary">
                      <CheckCircle size={12} /> Read
                    </span>
                  )}
                </div>
                <div className="border-t border-border pt-4">
                  <p className="text-sm text-foreground leading-relaxed whitespace-pre-wrap">
                    {selected.message}
                  </p>
                </div>
                <a
                  href={`mailto:${selected.email}?subject=Re: Your message&body=Hi ${selected.name},%0A%0A`}
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2.5 rounded-lg font-medium text-sm hover:opacity-90 active:scale-[0.97] transition-all shadow-sm"
                >
                  <Mail size={14} /> Reply via Email
                </a>
              </div>
            ) : (
              <div className="bg-card border border-border rounded-xl flex items-center justify-center p-12 text-muted-foreground text-sm">
                Select a message to view
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
