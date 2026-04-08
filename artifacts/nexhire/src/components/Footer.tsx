import { Link } from "wouter";
import { Briefcase, Mail, Phone, MapPin, Linkedin, Twitter, Facebook, Instagram, Loader2, CheckCircle } from "lucide-react";
import { getWhiteLabelConfig } from "@/config";
import { useState } from "react";
import { emailService } from "@/services/emailService";

export default function Footer() {
  const config = getWhiteLabelConfig();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(false);

  async function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    await emailService.notifyNewsletter(email);
    setLoading(false);
    setSubscribed(true);
    setEmail("");
  }

  return (
    <footer style={{ background: "#0f172a", color: "#94a3b8", marginTop: "auto" }}>
      <div className="container" style={{ padding: "60px 20px 0" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 40, marginBottom: 48 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
              <div style={{ width: 36, height: 36, background: "var(--primary)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <Briefcase size={20} color="white" />
              </div>
              <span style={{ fontSize: 20, fontWeight: 800, color: "white" }}>{config.COMPANY_NAME}</span>
            </div>
            <p style={{ fontSize: 14, lineHeight: 1.7, marginBottom: 20 }}>
              Connecting talented professionals with India's best employers. Your next opportunity starts here.
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              {[
                { href: config.SOCIAL.linkedin, icon: <Linkedin size={18} /> },
                { href: config.SOCIAL.twitter, icon: <Twitter size={18} /> },
                { href: config.SOCIAL.facebook, icon: <Facebook size={18} /> },
                { href: config.SOCIAL.instagram, icon: <Instagram size={18} /> },
              ].map((s, i) => (
                <a
                  key={i}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  style={{ width: 36, height: 36, borderRadius: 8, background: "#1e293b", display: "flex", alignItems: "center", justifyContent: "center", color: "#94a3b8", transition: "all 0.2s" }}
                  onMouseEnter={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "var(--primary)"; el.style.color = "white"; }}
                  onMouseLeave={e => { const el = e.currentTarget as HTMLAnchorElement; el.style.background = "#1e293b"; el.style.color = "#94a3b8"; }}
                  className="bg-[#c20a29]">
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ color: "white", fontWeight: 700, marginBottom: 16, fontSize: 15 }}>Quick Links</h4>
            {[
              { label: "Browse Jobs", href: "/jobs" },
              { label: "News & Updates", href: "/news" },
              { label: "About Us", href: "/about" },
              { label: "Contact", href: "/contact" },
              { label: "Career Profile", href: "/profile" },
            ].map(link => (
              <Link key={link.href} href={link.href}
                style={{ display: "block", color: "#94a3b8", fontSize: 14, marginBottom: 10, transition: "color 0.2s", textDecoration: "none" }}
                onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = "white")}
                onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = "#94a3b8")}
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div>
            <h4 style={{ color: "white", fontWeight: 700, marginBottom: 16, fontSize: 15 }}>Contact Us</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <Mail size={16} style={{ marginTop: 2, flexShrink: 0, color: "var(--primary)" }} />
                <span style={{ fontSize: 14 }}>{config.EMAIL}</span>
              </div>
              <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <Phone size={16} style={{ marginTop: 2, flexShrink: 0, color: "var(--primary)" }} />
                <span style={{ fontSize: 14 }}>{config.PHONE}</span>
              </div>
              <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                <MapPin size={16} style={{ marginTop: 2, flexShrink: 0, color: "var(--primary)" }} />
                <span style={{ fontSize: 14 }}>Hyderabad,Telengana,India </span>
              </div>
            </div>
          </div>

          <div>
            <h4 style={{ color: "white", fontWeight: 700, marginBottom: 16, fontSize: 15 }}>Newsletter</h4>
            <p style={{ fontSize: 14, marginBottom: 16, lineHeight: 1.6 }}>
              Get the latest job alerts and career tips in your inbox.
            </p>
            {subscribed ? (
              <div style={{ display: "flex", alignItems: "center", gap: 8, color: "#4ade80" }}>
                <CheckCircle size={18} />
                <span style={{ fontSize: 14, fontWeight: 600 }}>You're subscribed! Check your inbox.</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                  style={{ padding: "10px 14px", borderRadius: 8, border: "1px solid #334155", background: "#1e293b", color: "white", fontSize: 14, outline: "none" }}
                />
                <button type="submit" disabled={loading} className="btn btn-primary btn-sm" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
                  {loading ? <><Loader2 size={14} style={{ animation: "spin 1s linear infinite" }} /> Subscribing...</> : "Subscribe"}
                </button>
              </form>
            )}
          </div>
        </div>

        <div style={{ borderTop: "1px solid #1e293b", padding: "20px 0", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <p style={{ fontSize: 13 }}>© {new Date().getFullYear()} {config.COMPANY_NAME}. All rights reserved.</p>
          <div style={{ display: "flex", gap: 20 }}>
            {["Privacy Policy", "Terms of Service", "Cookie Policy"].map(t => (
              <a key={t} href="#" style={{ fontSize: 13, color: "#64748b", transition: "color 0.2s", textDecoration: "none" }}
                onMouseEnter={e => ((e.currentTarget as HTMLAnchorElement).style.color = "white")}
                onMouseLeave={e => ((e.currentTarget as HTMLAnchorElement).style.color = "#64748b")}
              >
                {t}
              </a>
            ))}
          </div>
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </footer>
  );
}
