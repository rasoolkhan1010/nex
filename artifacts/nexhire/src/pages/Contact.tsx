import { useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle, Loader2 } from "lucide-react";
import { getWhiteLabelConfig } from "@/config";
import { emailService } from "@/services/emailService";

export default function Contact() {
  const config = getWhiteLabelConfig();
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  function set(field: string, value: string) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      setError("Please fill all required fields.");
      return;
    }
    setLoading(true);
    setError("");
    await emailService.notifyContact({
      name: form.name,
      email: form.email,
      subject: form.subject,
      message: form.message,
    });
    setLoading(false);
    setDone(true);
  }

  const contacts = [
    { icon: <Mail size={20} color="var(--primary)" />, label: "Email Us", value: config.EMAIL, href: `mailto:${config.EMAIL}` },
    { icon: <Phone size={20} color="var(--primary)" />, label: "Call Us", value: config.PHONE, href: `tel:${config.PHONE}` },
    { icon: <MapPin size={20} color="var(--primary)" />, label: "Visit Us", value: "Hyderabad, Telangana, India" },
    { icon: <Clock size={20} color="var(--primary)" />, label: "Working Hours", value: "Mon–Sat, 9:00 AM – 6:00 PM IST" },
  ];

  return (
    <div>
      <div className="page-hero">
        <div className="container">
          <h1 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 900, marginBottom: 12 }}>Contact Us</h1>
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 17 }}>We'd love to hear from you. Reach out anytime.</p>
        </div>
      </div>

      <div className="container" style={{ padding: "60px 20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 48, alignItems: "start" }}>
          {/* Info */}
          <div>
            <h2 style={{ fontSize: 24, fontWeight: 800, marginBottom: 10 }}>Get in Touch</h2>
            <p style={{ color: "var(--text-muted)", lineHeight: 1.7, marginBottom: 32 }}>
              Whether you're a job seeker, employer, or partner — we're here to help. Our team typically responds within 24 hours.
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              {contacts.map((c, i) => (
                <div key={i} style={{ display: "flex", gap: 16, alignItems: "flex-start" }}>
                  <div style={{ width: 44, height: 44, borderRadius: 12, background: "var(--primary-light)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                    {c.icon}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: 14, marginBottom: 2 }}>{c.label}</div>
                    {c.href ? (
                      <a href={c.href} style={{ color: "var(--primary)", fontSize: 14 }}>{c.value}</a>
                    ) : (
                      <div style={{ color: "var(--text-muted)", fontSize: 14 }}>{c.value}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 40, padding: 24, background: "var(--primary-light)", borderRadius: 16 }}>
              <h3 style={{ fontWeight: 700, marginBottom: 8 }}>Are you an employer?</h3>
              <p style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: 1.6 }}>
                Looking to hire top talent? Our dedicated recruitment team can help you find the perfect candidates faster.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="card" style={{ padding: 36 }}>
            {done ? (
              <div style={{ textAlign: "center", padding: "20px 0" }}>
                <CheckCircle size={56} color="var(--success)" style={{ margin: "0 auto 16px" }} />
                <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 10 }}>Message Sent!</h3>
                <p style={{ color: "var(--text-muted)", marginBottom: 24 }}>
                  Thank you for reaching out. We'll get back to you within 24 hours.
                </p>
                <button className="btn btn-primary" onClick={() => { setDone(false); setForm({ name: "", email: "", subject: "", message: "" }); }}>
                  Send Another
                </button>
              </div>
            ) : (
              <>
                <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 24 }}>Send us a Message</h3>
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                    <div className="form-group">
                      <label className="form-label">Your Name *</label>
                      <input className="form-input" value={form.name} onChange={e => set("name", e.target.value)} placeholder="John Doe" required />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Email Address *</label>
                      <input className="form-input" type="email" value={form.email} onChange={e => set("email", e.target.value)} placeholder="john@email.com" required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Subject</label>
                    <input className="form-input" value={form.subject} onChange={e => set("subject", e.target.value)} placeholder="How can we help?" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Message *</label>
                    <textarea className="form-input form-textarea" value={form.message} onChange={e => set("message", e.target.value)} placeholder="Tell us more about your query..." rows={5} required />
                  </div>
                  {error && <p style={{ color: "var(--error)", fontSize: 13 }}>{error}</p>}
                  <button type="submit" className="btn btn-primary" disabled={loading}>
                    {loading ? <><Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} /> Sending...</> : <><Send size={16} /> Send Message</>}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 768px) {
          div[style*="grid-template-columns: 1fr 1.4fr"] { grid-template-columns: 1fr !important; }
          div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
