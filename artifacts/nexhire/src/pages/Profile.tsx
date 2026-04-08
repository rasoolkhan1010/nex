import { useState } from "react";
import { CheckCircle, Loader2, ChevronRight, ChevronLeft, User, Briefcase, MapPin, Star } from "lucide-react";
import { api } from "@/services/api";

const STEPS = ["Personal Info", "Skills & Experience", "Preferences", "Review"];
const SKILL_OPTS = ["React", "Node.js", "Python", "Java", "AWS", "Docker", "SQL", "Machine Learning", "Figma", "Product Management", "Marketing", "Sales", "Finance", "HR", "Data Analysis", "TypeScript", "Go", "Kubernetes"];
const EXP_LEVELS = ["Fresher (0-1 year)", "Junior (1-3 years)", "Mid-level (3-6 years)", "Senior (6-10 years)", "Lead/Principal (10+ years)"];
const ROLES = ["Software Engineer", "Product Manager", "UX/UI Designer", "Data Scientist", "DevOps Engineer", "Marketing Manager", "Business Analyst", "HR Manager", "Sales Executive", "Full Stack Developer", "Frontend Developer", "Backend Developer"];
const CITIES = ["Bangalore", "Mumbai", "Delhi", "Hyderabad", "Pune", "Chennai", "Kolkata", "Remote", "Any Location"];

export default function Profile() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    skills: [] as string[],
    experience: "",
    preferredRole: "",
    location: "",
    summary: "",
  });
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  function toggleSkill(skill: string) {
    setForm(prev => ({
      ...prev,
      skills: prev.skills.includes(skill) ? prev.skills.filter(s => s !== skill) : [...prev.skills, skill],
    }));
  }

  async function handleFinish() {
    setLoading(true);
    await api.saveProfile({
      ...form,
      skills: form.skills.join(", "),
      submittedDate: new Date().toISOString().split("T")[0],
    });
    setLoading(false);
    setDone(true);
  }

  if (done) {
    return (
      <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <div style={{ textAlign: "center", padding: 40 }}>
          <CheckCircle size={72} color="var(--success)" style={{ margin: "0 auto 20px" }} />
          <h2 style={{ fontSize: 28, fontWeight: 900, marginBottom: 12 }}>Profile Saved!</h2>
          <p style={{ color: "var(--text-muted)", fontSize: 16, maxWidth: 400, margin: "0 auto 28px" }}>
            Your career profile is live. We'll start matching you with relevant opportunities right away.
          </p>
          <a href="/jobs" className="btn btn-primary btn-lg">Browse Matching Jobs</a>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="page-hero" style={{ padding: "48px 0" }}>
        <div className="container">
          <h1 style={{ fontSize: "clamp(26px, 4vw, 40px)", fontWeight: 900, marginBottom: 10 }}>Career Profile Builder</h1>
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 16 }}>Tell us about yourself and we'll match you with the best opportunities</p>
        </div>
      </div>

      <div className="container" style={{ padding: "48px 20px", maxWidth: 680 }}>
        {/* Progress */}
        <div style={{ display: "flex", gap: 0, marginBottom: 40 }}>
          {STEPS.map((s, i) => (
            <div key={s} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
                {i > 0 && <div style={{ flex: 1, height: 2, background: i <= step ? "var(--primary)" : "var(--border)", transition: "0.3s" }} />}
                <div style={{
                  width: 36, height: 36, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                  background: i < step ? "var(--primary)" : i === step ? "var(--primary)" : "var(--border)",
                  color: i <= step ? "white" : "var(--text-muted)",
                  fontWeight: 700, fontSize: 14, transition: "0.3s", flexShrink: 0,
                }}>
                  {i < step ? <CheckCircle size={16} /> : i + 1}
                </div>
                {i < STEPS.length - 1 && <div style={{ flex: 1, height: 2, background: i < step ? "var(--primary)" : "var(--border)", transition: "0.3s" }} />}
              </div>
              <span style={{ fontSize: 11, color: i === step ? "var(--primary)" : "var(--text-muted)", marginTop: 6, textAlign: "center", fontWeight: i === step ? 700 : 400 }}>
                {s}
              </span>
            </div>
          ))}
        </div>

        <div className="card" style={{ padding: 36 }}>
          {/* Step 0: Personal Info */}
          {step === 0 && (
            <div>
              <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 24 }}>
                <User size={24} color="var(--primary)" />
                <h2 style={{ fontSize: 20, fontWeight: 800 }}>Personal Information</h2>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input className="form-input" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} placeholder="Your full name" />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                  <div className="form-group">
                    <label className="form-label">Email *</label>
                    <input className="form-input" type="email" value={form.email} onChange={e => setForm(p => ({ ...p, email: e.target.value }))} placeholder="you@email.com" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Phone</label>
                    <input className="form-input" value={form.phone} onChange={e => setForm(p => ({ ...p, phone: e.target.value }))} placeholder="+91..." />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Professional Summary</label>
                  <textarea className="form-input form-textarea" value={form.summary} onChange={e => setForm(p => ({ ...p, summary: e.target.value }))} placeholder="A brief summary about yourself..." rows={3} />
                </div>
              </div>
            </div>
          )}

          {/* Step 1: Skills */}
          {step === 1 && (
            <div>
              <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 8 }}>
                <Star size={24} color="var(--primary)" />
                <h2 style={{ fontSize: 20, fontWeight: 800 }}>Skills & Experience</h2>
              </div>
              <p style={{ color: "var(--text-muted)", fontSize: 14, marginBottom: 20 }}>Select all that apply</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 28 }}>
                {SKILL_OPTS.map(skill => (
                  <button key={skill} type="button" onClick={() => toggleSkill(skill)} style={{
                    padding: "8px 14px", borderRadius: 20, fontSize: 13, fontWeight: 600, border: "1.5px solid",
                    borderColor: form.skills.includes(skill) ? "var(--primary)" : "var(--border)",
                    background: form.skills.includes(skill) ? "var(--primary)" : "white",
                    color: form.skills.includes(skill) ? "white" : "var(--text-muted)",
                    cursor: "pointer", transition: "all 0.15s",
                  }}>
                    {skill}
                  </button>
                ))}
              </div>
              <div className="form-group">
                <label className="form-label">Experience Level *</label>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {EXP_LEVELS.map(level => (
                    <label key={level} style={{ display: "flex", alignItems: "center", gap: 10, padding: "12px 16px", border: "1.5px solid", borderColor: form.experience === level ? "var(--primary)" : "var(--border)", borderRadius: 10, cursor: "pointer", background: form.experience === level ? "var(--primary-light)" : "white", transition: "0.15s" }}>
                      <input type="radio" name="exp" value={level} checked={form.experience === level} onChange={() => setForm(p => ({ ...p, experience: level }))} style={{ accentColor: "var(--primary)" }} />
                      <span style={{ fontSize: 14, fontWeight: 500 }}>{level}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Preferences */}
          {step === 2 && (
            <div>
              <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 24 }}>
                <MapPin size={24} color="var(--primary)" />
                <h2 style={{ fontSize: 20, fontWeight: 800 }}>Job Preferences</h2>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                <div className="form-group">
                  <label className="form-label">Preferred Role *</label>
                  <select className="form-input" value={form.preferredRole} onChange={e => setForm(p => ({ ...p, preferredRole: e.target.value }))}>
                    <option value="">Select your preferred role</option>
                    {ROLES.map(r => <option key={r}>{r}</option>)}
                  </select>
                </div>
                <div className="form-group">
                  <label className="form-label">Preferred Location</label>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                    {CITIES.map(city => (
                      <button key={city} type="button" onClick={() => setForm(p => ({ ...p, location: city }))} style={{
                        padding: "8px 14px", borderRadius: 20, fontSize: 13, fontWeight: 600, border: "1.5px solid",
                        borderColor: form.location === city ? "var(--primary)" : "var(--border)",
                        background: form.location === city ? "var(--primary)" : "white",
                        color: form.location === city ? "white" : "var(--text-muted)",
                        cursor: "pointer", transition: "all 0.15s",
                      }}>
                        {city}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Review */}
          {step === 3 && (
            <div>
              <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 24 }}>
                <Briefcase size={24} color="var(--primary)" />
                <h2 style={{ fontSize: 20, fontWeight: 800 }}>Review Your Profile</h2>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  { label: "Name", value: form.name || "—" },
                  { label: "Email", value: form.email || "—" },
                  { label: "Phone", value: form.phone || "—" },
                  { label: "Experience", value: form.experience || "—" },
                  { label: "Preferred Role", value: form.preferredRole || "—" },
                  { label: "Location", value: form.location || "—" },
                  { label: "Skills", value: form.skills.length ? form.skills.join(", ") : "—" },
                ].map(item => (
                  <div key={item.label} style={{ display: "grid", gridTemplateColumns: "140px 1fr", gap: 12, padding: "12px 16px", background: "var(--bg)", borderRadius: 10 }}>
                    <span style={{ fontWeight: 700, fontSize: 14, color: "var(--text-muted)" }}>{item.label}</span>
                    <span style={{ fontSize: 14, color: "var(--text)" }}>{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 32 }}>
            <button className="btn btn-outline" onClick={() => setStep(p => p - 1)} disabled={step === 0} style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <ChevronLeft size={16} /> Back
            </button>
            {step < STEPS.length - 1 ? (
              <button className="btn btn-primary" onClick={() => setStep(p => p + 1)} style={{ display: "flex", alignItems: "center", gap: 6 }}>
                Next <ChevronRight size={16} />
              </button>
            ) : (
              <button className="btn btn-primary" onClick={handleFinish} disabled={loading}>
                {loading ? <><Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} /> Saving...</> : "Save Profile"}
              </button>
            )}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        @media (max-width: 500px) {
          div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
