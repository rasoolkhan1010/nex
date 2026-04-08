import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Eye, EyeOff, Briefcase, Loader2, CheckCircle, AlertCircle } from "lucide-react";
import { getWhiteLabelConfig } from "@/config";
import { googleAuth } from "@/services/googleAuth";
import { emailService } from "@/services/emailService";

export default function Register() {
  const config = getWhiteLabelConfig();
  const [, navigate] = useLocation();
  const [form, setForm] = useState({ name: "", email: "", password: "", phone: "" });
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const googleBtnRef = useRef<HTMLDivElement>(null);
  const googleConfigured = googleAuth.isConfigured();

  function set(field: string, value: string) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  useEffect(() => {
    if (googleConfigured) {
      googleAuth.renderButton("google-register-btn", async (user) => {
        await emailService.notifyRegistration({
          name: user.name,
          email: user.email,
          source: "Google Sign-Up",
        });
        navigate("/profile");
      });
    }
  }, [googleConfigured, navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    googleAuth.saveUserFromForm(form.name, form.email, form.phone);
    await emailService.notifyRegistration({
      name: form.name,
      email: form.email,
      phone: form.phone,
      source: "Email/Password Sign-Up",
    });
    setLoading(false);
    setDone(true);
    setTimeout(() => navigate("/profile"), 2000);
  }

  const perks = ["Access 50,000+ job listings", "AI-powered job matching", "Track applications", "Career profile builder", "Job alerts via email"];

  return (
    <div style={{ minHeight: "calc(100vh - 64px)", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #f0f7ff 0%, #e8f0fe 100%)", padding: 20 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 48, maxWidth: 900, width: "100%", alignItems: "center" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 32 }}>
            <div style={{ width: 40, height: 40, borderRadius: 10, background: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Briefcase size={20} color="white" />
            </div>
            <span style={{ fontSize: 20, fontWeight: 800, color: "var(--primary)" }}>{config.COMPANY_NAME}</span>
          </div>
          <h1 style={{ fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 900, lineHeight: 1.2, marginBottom: 16 }}>Start your career journey today</h1>
          <p style={{ color: "#5e5e7a", fontSize: 16, lineHeight: 1.7, marginBottom: 32 }}>Join 500,000+ professionals using NexHire to find their perfect job.</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {perks.map(p => (
              <div key={p} style={{ display: "flex", gap: 12, alignItems: "center" }}>
                <CheckCircle size={18} color="#16a34a" />
                <span style={{ fontSize: 15 }}>{p}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="card" style={{ padding: 36, borderRadius: 20 }}>
          {done ? (
            <div style={{ textAlign: "center", padding: "20px 0" }}>
              <CheckCircle size={56} color="#16a34a" style={{ margin: "0 auto 16px" }} />
              <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>You're all set!</h2>
              <p style={{ color: "#5e5e7a" }}>Redirecting to your career profile builder...</p>
            </div>
          ) : (
            <>
              <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 6 }}>Create your account</h2>
              <p style={{ color: "#5e5e7a", fontSize: 14, marginBottom: 20 }}>Free forever. No credit card required.</p>

              {/* Google Sign-In */}
              {googleConfigured ? (
                <>
                  <div id="google-register-btn" ref={googleBtnRef} style={{ width: "100%", marginBottom: 16 }} />
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                    <div style={{ flex: 1, height: 1, background: "#e2e8f0" }} />
                    <span style={{ color: "#5e5e7a", fontSize: 13 }}>or register with email</span>
                    <div style={{ flex: 1, height: 1, background: "#e2e8f0" }} />
                  </div>
                </>
              ) : (
                <>
                  <button
                    onClick={async () => {
                      const user = { name: "Google User", email: "user@gmail.com" };
                      googleAuth.saveUserFromForm(user.name, user.email);
                      await emailService.notifyRegistration({ name: user.name, email: user.email, source: "Google Sign-Up (demo)" });
                      navigate("/profile");
                    }}
                    style={{ width: "100%", padding: "11px", border: "1.5px solid #e2e8f0", borderRadius: 10, background: "white", fontWeight: 600, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, transition: "all 0.2s", marginBottom: 8 }}
                    onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = "#f8faff")}
                    onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = "white")}
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                    Continue with Google
                  </button>
                  <div style={{ display: "flex", alignItems: "center", gap: 6, background: "#fef3cd", border: "1px solid #ffd60a", borderRadius: 8, padding: "8px 12px", marginBottom: 16 }}>
                    <AlertCircle size={14} color="#b45309" />
                    <span style={{ fontSize: 12, color: "#92400e" }}>Add VITE_GOOGLE_CLIENT_ID in .env for real Google auth</span>
                  </div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
                    <div style={{ flex: 1, height: 1, background: "#e2e8f0" }} />
                    <span style={{ color: "#5e5e7a", fontSize: 13 }}>or register with email</span>
                    <div style={{ flex: 1, height: 1, background: "#e2e8f0" }} />
                  </div>
                </>
              )}

              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input className="form-input" value={form.name} onChange={e => set("name", e.target.value)} placeholder="John Doe" required />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone</label>
                    <input className="form-input" value={form.phone} onChange={e => set("phone", e.target.value)} placeholder="+91 98765..." />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Email Address *</label>
                  <input className="form-input" type="email" value={form.email} onChange={e => set("email", e.target.value)} placeholder="you@email.com" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Password *</label>
                  <div style={{ position: "relative" }}>
                    <input className="form-input" type={show ? "text" : "password"} value={form.password} onChange={e => set("password", e.target.value)} placeholder="Create a strong password" required minLength={8} style={{ paddingRight: 44 }} />
                    <button type="button" onClick={() => setShow(!show)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#5e5e7a" }}>
                      {show ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>
                <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: "100%", padding: "12px" }}>
                  {loading ? <><Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} /> Creating account...</> : "Create Free Account"}
                </button>
                <p style={{ fontSize: 12, color: "#5e5e7a", textAlign: "center" }}>By signing up, you agree to our Terms of Service and Privacy Policy.</p>
              </form>

              <p style={{ textAlign: "center", color: "#5e5e7a", fontSize: 14, marginTop: 16 }}>
                Already have an account?{" "}
                <Link href="/login" style={{ color: "var(--primary)", fontWeight: 700, textDecoration: "none" }}>Sign in</Link>
              </p>
            </>
          )}
        </div>
      </div>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 720px) { div[style*="grid-template-columns: 1fr 1.2fr"] { grid-template-columns: 1fr !important; } }
        @media (max-width: 500px) { div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; } }
      `}</style>
    </div>
  );
}
