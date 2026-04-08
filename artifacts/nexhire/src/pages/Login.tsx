import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Eye, EyeOff, Briefcase, Loader2, AlertCircle } from "lucide-react";
import { getWhiteLabelConfig } from "@/config";
import { googleAuth } from "@/services/googleAuth";
import { emailService } from "@/services/emailService";

export default function Login() {
  const config = getWhiteLabelConfig();
  const [, navigate] = useLocation();
  const [form, setForm] = useState({ email: "", password: "" });
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const googleBtnRef = useRef<HTMLDivElement>(null);
  const googleConfigured = googleAuth.isConfigured();

  useEffect(() => {
    if (googleConfigured) {
      googleAuth.renderButton("google-signin-btn", async (user) => {
        await emailService.notifyRegistration({
          name: user.name,
          email: user.email,
          source: "Google Sign-In (Login)",
        });
        navigate("/");
      });
    }
  }, [googleConfigured, navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.email || !form.password) {
      setError("Please fill all fields.");
      return;
    }
    setLoading(true);
    setError("");
    await new Promise(r => setTimeout(r, 700));
    googleAuth.saveUserFromForm(form.email.split("@")[0], form.email);
    await emailService.notifyRegistration({
      name: form.email.split("@")[0],
      email: form.email,
      source: "Email/Password Login",
    });
    setLoading(false);
    navigate("/");
  }

  return (
    <div style={{ minHeight: "calc(100vh - 64px)", display: "flex", alignItems: "center", justifyContent: "center", background: "linear-gradient(135deg, #f0f7ff 0%, #e8f0fe 100%)", padding: 20 }}>
      <div style={{ width: "100%", maxWidth: 460 }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ width: 52, height: 52, borderRadius: 14, background: "var(--primary)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
            <Briefcase size={26} color="white" />
          </div>
          <h1 style={{ fontSize: 28, fontWeight: 900, marginBottom: 6 }}>Welcome back</h1>
          <p style={{ color: "#5e5e7a", fontSize: 15 }}>Sign in to your {config.COMPANY_NAME} account</p>
        </div>

        <div className="card" style={{ padding: 36, borderRadius: 20 }}>
          {/* Google Sign-In */}
          {googleConfigured ? (
            <>
              <div id="google-signin-btn" ref={googleBtnRef} style={{ width: "100%", marginBottom: 20 }} />
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <div style={{ flex: 1, height: 1, background: "#e2e8f0" }} />
                <span style={{ color: "#5e5e7a", fontSize: 13 }}>or sign in with email</span>
                <div style={{ flex: 1, height: 1, background: "#e2e8f0" }} />
              </div>
            </>
          ) : (
            <>
              <button
                onClick={() => {
                  setError("");
                  setLoading(true);
                  setTimeout(() => {
                    googleAuth.saveUserFromForm("Google User", "user@gmail.com");
                    navigate("/");
                  }, 800);
                }}
                style={{ width: "100%", padding: "11px", border: "1.5px solid #e2e8f0", borderRadius: 10, background: "white", fontWeight: 600, fontSize: 14, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 10, transition: "all 0.2s", marginBottom: 8 }}
                onMouseEnter={e => ((e.currentTarget as HTMLButtonElement).style.background = "#f8faff")}
                onMouseLeave={e => ((e.currentTarget as HTMLButtonElement).style.background = "white")}
              >
                <svg width="18" height="18" viewBox="0 0 24 24"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.47 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/></svg>
                Continue with Google
              </button>
              <div style={{ display: "flex", alignItems: "center", gap: 6, background: "#fef3cd", border: "1px solid #ffd60a", borderRadius: 8, padding: "8px 12px", marginBottom: 20 }}>
                <AlertCircle size={14} color="#b45309" />
                <span style={{ fontSize: 12, color: "#92400e" }}>Add VITE_GOOGLE_CLIENT_ID in .env to enable real Google login</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <div style={{ flex: 1, height: 1, background: "#e2e8f0" }} />
                <span style={{ color: "#5e5e7a", fontSize: 13 }}>or continue with email</span>
                <div style={{ flex: 1, height: 1, background: "#e2e8f0" }} />
              </div>
            </>
          )}

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input className="form-input" type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} placeholder="you@email.com" required autoComplete="email" />
            </div>
            <div className="form-group">
              <label className="form-label" style={{ display: "flex", justifyContent: "space-between" }}>
                Password
                <a href="#" style={{ fontSize: 13, color: "var(--primary)", fontWeight: 500, textDecoration: "none" }}>Forgot password?</a>
              </label>
              <div style={{ position: "relative" }}>
                <input className="form-input" type={show ? "text" : "password"} value={form.password} onChange={e => setForm(p => ({ ...p, password: e.target.value }))} placeholder="Enter your password" required style={{ paddingRight: 44 }} autoComplete="current-password" />
                <button type="button" onClick={() => setShow(!show)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#5e5e7a" }}>
                  {show ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {error && <p style={{ color: "#dc2626", fontSize: 13, background: "#fef2f2", padding: "10px 14px", borderRadius: 8 }}>{error}</p>}

            <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: "100%", padding: "12px" }}>
              {loading ? <><Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} /> Signing in...</> : "Sign In"}
            </button>
          </form>

          <p style={{ textAlign: "center", color: "#5e5e7a", fontSize: 14, marginTop: 20 }}>
            Don't have an account?{" "}
            <Link href="/register" style={{ color: "var(--primary)", fontWeight: 700, textDecoration: "none" }}>Sign up free</Link>
          </p>
        </div>
      </div>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
