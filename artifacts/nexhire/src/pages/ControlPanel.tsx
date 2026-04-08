import { useState } from "react";
import { Eye, EyeOff, Settings, Palette, Building2, Globe, Save, CheckCircle, RotateCcw } from "lucide-react";
import { getWhiteLabelConfig, saveWhiteLabelConfig, CONFIG } from "@/config";

const CONTROL_PW = "controlpanel123";

export default function ControlPanel() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [showPw, setShowPw] = useState(false);
  const [error, setError] = useState("");
  const [saved, setSaved] = useState(false);

  const defaultConfig = getWhiteLabelConfig();
  const [form, setForm] = useState({
    COMPANY_NAME: defaultConfig.COMPANY_NAME,
    TAGLINE: defaultConfig.TAGLINE,
    EMAIL: defaultConfig.EMAIL,
    PHONE: defaultConfig.PHONE,
    primaryColor: "#0a66c2",
    linkedinUrl: defaultConfig.SOCIAL.linkedin,
    twitterUrl: defaultConfig.SOCIAL.twitter,
    facebookUrl: defaultConfig.SOCIAL.facebook,
    instagramUrl: defaultConfig.SOCIAL.instagram,
    showNews: true,
    showProfile: true,
    showChatbot: true,
  });

  function set(field: string, value: string | boolean) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  function handleSave() {
    saveWhiteLabelConfig({
      COMPANY_NAME: form.COMPANY_NAME,
      TAGLINE: form.TAGLINE,
      EMAIL: form.EMAIL,
      PHONE: form.PHONE,
      SOCIAL: {
        linkedin: form.linkedinUrl,
        twitter: form.twitterUrl,
        facebook: form.facebookUrl,
        instagram: form.instagramUrl,
      },
    });
    document.documentElement.style.setProperty("--primary", form.primaryColor);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  }

  function handleReset() {
    if (!confirm("Reset all customizations to defaults?")) return;
    localStorage.removeItem("nexhire_white_label");
    window.location.reload();
  }

  if (!authed) {
    return (
      <div style={{ minHeight: "calc(100vh - 64px)", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8fafc", padding: 20 }}>
        <div style={{ width: "100%", maxWidth: 420 }}>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div style={{ width: 52, height: 52, borderRadius: 14, background: "#7c3aed", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
              <Settings size={26} color="white" />
            </div>
            <h1 style={{ fontSize: 24, fontWeight: 900 }}>White Label Control Panel</h1>
            <p style={{ color: "var(--text-muted)", fontSize: 14, marginTop: 6 }}>Password protected. Authorized users only.</p>
          </div>
          <div className="card" style={{ padding: 32 }}>
            <div className="form-group" style={{ marginBottom: 16 }}>
              <label className="form-label">Access Password</label>
              <div style={{ position: "relative" }}>
                <input className="form-input" type={showPw ? "text" : "password"} value={pw} onChange={e => setPw(e.target.value)} onKeyDown={e => e.key === "Enter" && (pw === CONTROL_PW ? setAuthed(true) : setError("Invalid password"))} placeholder="Enter access password" style={{ paddingRight: 44 }} />
                <button type="button" onClick={() => setShowPw(!showPw)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)" }}>
                  {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>
            {error && <p style={{ color: "var(--error)", fontSize: 13, marginBottom: 12 }}>{error}</p>}
            <button className="btn btn-primary" style={{ width: "100%", padding: "12px", background: "#7c3aed", borderColor: "#7c3aed" }}
              onClick={() => pw === CONTROL_PW ? setAuthed(true) : setError("Invalid password.")}>
              Access Control Panel
            </button>
          </div>
        </div>
      </div>
    );
  }

  const SECTIONS = [
    { id: "brand", label: "Brand & Identity", icon: <Building2 size={18} /> },
    { id: "contact", label: "Contact Info", icon: <Globe size={18} /> },
    { id: "social", label: "Social Links", icon: <Globe size={18} /> },
    { id: "design", label: "Design", icon: <Palette size={18} /> },
    { id: "visibility", label: "Visibility", icon: <Eye size={18} /> },
  ];
  const [activeSection, setActiveSection] = useState("brand");

  return (
    <div style={{ minHeight: "calc(100vh - 64px)", background: "#f8fafc" }}>
      <div style={{ background: "#7c3aed", color: "white", padding: "20px 0" }}>
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 800, display: "flex", alignItems: "center", gap: 10 }}>
              <Settings size={20} /> White Label Control Panel
            </h1>
            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", marginTop: 2 }}>Customize your platform's appearance and content</p>
          </div>
          <div style={{ display: "flex", gap: 10 }}>
            <button className="btn" style={{ background: "rgba(255,255,255,0.15)", color: "white", border: "none", display: "flex", alignItems: "center", gap: 6 }} onClick={handleReset}>
              <RotateCcw size={15} /> Reset
            </button>
            <button className="btn" style={{ background: "white", color: "#7c3aed", border: "none", display: "flex", alignItems: "center", gap: 6, fontWeight: 700 }} onClick={handleSave}>
              {saved ? <><CheckCircle size={15} /> Saved!</> : <><Save size={15} /> Save Changes</>}
            </button>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: "32px 20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 24 }}>
          {/* Sidebar */}
          <div className="card" style={{ padding: 12, height: "fit-content" }}>
            {SECTIONS.map(s => (
              <button key={s.id} onClick={() => setActiveSection(s.id)} style={{
                width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "10px 14px",
                borderRadius: 8, border: "none", background: activeSection === s.id ? "#ede9fe" : "none",
                color: activeSection === s.id ? "#7c3aed" : "var(--text-muted)",
                fontWeight: activeSection === s.id ? 700 : 500, fontSize: 14, cursor: "pointer", textAlign: "left", transition: "0.15s",
              }}>
                {s.icon} {s.label}
              </button>
            ))}
          </div>

          {/* Content */}
          <div className="card">
            {activeSection === "brand" && (
              <div>
                <h2 style={{ fontWeight: 800, marginBottom: 24 }}>Brand & Identity</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                  <div className="form-group"><label className="form-label">Company Name</label><input className="form-input" value={form.COMPANY_NAME} onChange={e => set("COMPANY_NAME", e.target.value)} /></div>
                  <div className="form-group"><label className="form-label">Tagline</label><input className="form-input" value={form.TAGLINE} onChange={e => set("TAGLINE", e.target.value)} /></div>
                </div>
              </div>
            )}
            {activeSection === "contact" && (
              <div>
                <h2 style={{ fontWeight: 800, marginBottom: 24 }}>Contact Information</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                  <div className="form-group"><label className="form-label">Email</label><input className="form-input" type="email" value={form.EMAIL} onChange={e => set("EMAIL", e.target.value)} /></div>
                  <div className="form-group"><label className="form-label">Phone</label><input className="form-input" value={form.PHONE} onChange={e => set("PHONE", e.target.value)} /></div>
                </div>
              </div>
            )}
            {activeSection === "social" && (
              <div>
                <h2 style={{ fontWeight: 800, marginBottom: 24 }}>Social Media Links</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
                  {[
                    { label: "LinkedIn", field: "linkedinUrl" },
                    { label: "Twitter / X", field: "twitterUrl" },
                    { label: "Facebook", field: "facebookUrl" },
                    { label: "Instagram", field: "instagramUrl" },
                  ].map(s => (
                    <div key={s.field} className="form-group">
                      <label className="form-label">{s.label}</label>
                      <input className="form-input" value={(form as Record<string, unknown>)[s.field] as string} onChange={e => set(s.field, e.target.value)} />
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeSection === "design" && (
              <div>
                <h2 style={{ fontWeight: 800, marginBottom: 24 }}>Design & Colors</h2>
                <div className="form-group">
                  <label className="form-label">Primary Brand Color</label>
                  <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
                    <input type="color" value={form.primaryColor} onChange={e => { set("primaryColor", e.target.value); document.documentElement.style.setProperty("--primary", e.target.value); }} style={{ width: 48, height: 48, borderRadius: 10, border: "2px solid var(--border)", cursor: "pointer", padding: 2 }} />
                    <input className="form-input" value={form.primaryColor} onChange={e => { set("primaryColor", e.target.value); document.documentElement.style.setProperty("--primary", e.target.value); }} style={{ width: 160 }} />
                  </div>
                  <p style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 8 }}>Changes apply live as you pick a color.</p>
                </div>
                <div style={{ marginTop: 24 }}>
                  <p style={{ fontWeight: 700, marginBottom: 12, fontSize: 14 }}>Quick Presets</p>
                  <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                    {["#0a66c2", "#16a34a", "#dc2626", "#7c3aed", "#ea580c", "#0891b2", "#0f172a"].map(color => (
                      <button key={color} type="button" onClick={() => { set("primaryColor", color); document.documentElement.style.setProperty("--primary", color); }}
                        style={{ width: 40, height: 40, borderRadius: 10, background: color, border: form.primaryColor === color ? "3px solid #000" : "2px solid transparent", cursor: "pointer", transition: "0.15s" }} />
                    ))}
                  </div>
                </div>
              </div>
            )}
            {activeSection === "visibility" && (
              <div>
                <h2 style={{ fontWeight: 800, marginBottom: 24 }}>Section Visibility</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  {[
                    { field: "showNews", label: "News & Updates Page", desc: "Show or hide the News section" },
                    { field: "showProfile", label: "Career Profile Builder", desc: "Allow users to build career profiles" },
                    { field: "showChatbot", label: "AI Chatbot Widget", desc: "Enable the NexBot chat assistant" },
                  ].map(item => (
                    <label key={item.field} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "16px 20px", background: "var(--bg)", borderRadius: 12, cursor: "pointer" }}>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: 15 }}>{item.label}</div>
                        <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 2 }}>{item.desc}</div>
                      </div>
                      <div style={{
                        width: 48, height: 26, borderRadius: 13,
                        background: (form as Record<string, unknown>)[item.field] ? "#7c3aed" : "var(--border)",
                        position: "relative", transition: "0.2s", flexShrink: 0,
                      }} onClick={() => set(item.field, !(form as Record<string, unknown>)[item.field])}>
                        <div style={{
                          width: 20, height: 20, borderRadius: "50%", background: "white",
                          position: "absolute", top: 3,
                          left: (form as Record<string, unknown>)[item.field] ? 25 : 3,
                          transition: "0.2s", boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
                        }} />
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            )}

            <div style={{ marginTop: 28, paddingTop: 24, borderTop: "1px solid var(--border)", display: "flex", justifyContent: "flex-end" }}>
              <button className="btn btn-primary" onClick={handleSave} style={{ background: "#7c3aed", borderColor: "#7c3aed" }}>
                {saved ? <><CheckCircle size={16} /> Saved!</> : <><Save size={16} /> Save Changes</>}
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          div[style*="grid-template-columns: 220px 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
