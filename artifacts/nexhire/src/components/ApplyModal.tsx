import { useState } from "react";
import { X, Upload, Loader2, CheckCircle } from "lucide-react";
import { api, Job } from "@/services/api";
import type { Application } from "@/services/api";
import { emailService } from "@/services/emailService";

interface Props {
  job: Job;
  onClose: () => void;
}

export default function ApplyModal({ job, onClose }: Props) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", linkedIn: "", coverLetter: "" });
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  function set(field: string, value: string) {
    setForm(prev => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone) {
      setError("Please fill all required fields.");
      return;
    }
    setError("");
    setLoading(true);
    try {
      const payload: Application = {
        ...form,
        jobRole: job.title,
        jobId: job.id,
        resumeUrl: resumeFile ? resumeFile.name : "",
        appliedDate: new Date().toISOString().split("T")[0],
      };
      await Promise.all([
        api.submitApplication(payload),
        emailService.notifyApplication({
          applicantName: form.name,
          applicantEmail: form.email,
          applicantPhone: form.phone,
          jobTitle: job.title,
          company: job.company,
          resumeFile: resumeFile?.name,
          coverLetter: form.coverLetter,
        }),
      ]);
      setDone(true);
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="modal-overlay" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal">
        <button onClick={onClose} style={{ position: "absolute", top: 16, right: 16, background: "none", border: "none", cursor: "pointer", color: "#5e5e7a", padding: 4 }}>
          <X size={20} />
        </button>

        {done ? (
          <div style={{ textAlign: "center", padding: "20px 0" }}>
            <CheckCircle size={56} color="#16a34a" style={{ margin: "0 auto 16px" }} />
            <h2 style={{ fontSize: 22, fontWeight: 800, marginBottom: 10 }}>Application Submitted!</h2>
            <p style={{ color: "#5e5e7a", marginBottom: 24 }}>
              Thank you for applying to <strong>{job.title}</strong> at <strong>{job.company}</strong>. The recruiter has been notified and will be in touch soon.
            </p>
            <button className="btn btn-primary" onClick={onClose}>Close</button>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: 24 }}>
              <h2 style={{ fontSize: 20, fontWeight: 800, marginBottom: 4 }}>Apply for {job.title}</h2>
              <p style={{ color: "#5e5e7a", fontSize: 14 }}>{job.company} • {job.location}</p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div className="form-group">
                  <label className="form-label">Full Name *</label>
                  <input className="form-input" value={form.name} onChange={e => set("name", e.target.value)} placeholder="John Doe" required />
                </div>
                <div className="form-group">
                  <label className="form-label">Email *</label>
                  <input className="form-input" type="email" value={form.email} onChange={e => set("email", e.target.value)} placeholder="john@email.com" required />
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div className="form-group">
                  <label className="form-label">Phone *</label>
                  <input className="form-input" value={form.phone} onChange={e => set("phone", e.target.value)} placeholder="+91 98765 43210" required />
                </div>
                <div className="form-group">
                  <label className="form-label">LinkedIn Profile</label>
                  <input className="form-input" value={form.linkedIn} onChange={e => set("linkedIn", e.target.value)} placeholder="linkedin.com/in/..." />
                </div>
              </div>
              <div className="form-group">
                <label className="form-label">Resume / CV</label>
                <label style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 14px", border: `2px dashed ${resumeFile ? "var(--primary)" : "#e2e8f0"}`, borderRadius: 10, cursor: "pointer", background: resumeFile ? "#e8f0fe" : "#fafafa", transition: "all 0.2s" }}>
                  <Upload size={18} color="var(--primary)" />
                  <span style={{ fontSize: 14, color: resumeFile ? "var(--primary)" : "#5e5e7a" }}>
                    {resumeFile ? resumeFile.name : "Click to upload PDF or DOC"}
                  </span>
                  <input type="file" accept=".pdf,.doc,.docx" style={{ display: "none" }} onChange={e => setResumeFile(e.target.files?.[0] || null)} />
                </label>
              </div>
              <div className="form-group">
                <label className="form-label">Cover Letter</label>
                <textarea className="form-input form-textarea" value={form.coverLetter} onChange={e => set("coverLetter", e.target.value)} placeholder="Tell us why you're a great fit for this role..." rows={4} />
              </div>
              {error && <p style={{ color: "#dc2626", fontSize: 13, background: "#fef2f2", padding: "10px 14px", borderRadius: 8 }}>{error}</p>}
              <div style={{ display: "flex", gap: 12, justifyContent: "flex-end" }}>
                <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? <><Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} /> Submitting...</> : "Submit Application"}
                </button>
              </div>
            </form>
          </>
        )}
        <style>{`@keyframes spin { to { transform: rotate(360deg); } } @media (max-width: 560px) { div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; } }`}</style>
      </div>
    </div>
  );
}
