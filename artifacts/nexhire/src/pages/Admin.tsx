import { useState, useEffect } from "react";
import { Eye, EyeOff, Plus, Trash2, Loader2, LogOut, Briefcase, Newspaper, Users, AlertCircle } from "lucide-react";
import { auth } from "@/services/auth";
import { api, Job, NewsItem, SAMPLE_JOBS, SAMPLE_NEWS } from "@/services/api";
import { CONFIG } from "@/config";

type Tab = "jobs" | "news" | "applications";

export default function Admin() {
  const [authed, setAuthed] = useState(auth.isAuthenticated());
  const [loginForm, setLoginForm] = useState({ username: "", password: "" });
  const [showPw, setShowPw] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState<Tab>("jobs");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [news, setNews] = useState<NewsItem[]>([]);
  const [applications, setApplications] = useState<unknown[]>([]);
  const [toast, setToast] = useState("");

  const [newJob, setNewJob] = useState({ title: "", company: "", location: "", type: "Full-time", salary: "", description: "", requirements: "", category: "Engineering" });
  const [newNews, setNewNews] = useState({ title: "", description: "", category: "Company News", date: new Date().toISOString().split("T")[0] });
  const [showJobForm, setShowJobForm] = useState(false);
  const [showNewsForm, setShowNewsForm] = useState(false);

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  }

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (auth.login(loginForm.username, loginForm.password)) {
      setAuthed(true);
      setLoginError("");
    } else {
      setLoginError("Invalid credentials. Please try again.");
    }
  }

  useEffect(() => {
    if (!authed) return;
    api.getJobs().then(d => setJobs(d.length ? d : SAMPLE_JOBS)).catch(() => setJobs(SAMPLE_JOBS));
    api.getNews().then(d => setNews(d.length ? d : SAMPLE_NEWS)).catch(() => setNews(SAMPLE_NEWS));
    api.getApplications().then(d => setApplications(d)).catch(() => setApplications([]));
  }, [authed]);

  async function addJob(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const job = { ...newJob, id: Date.now().toString(), postedDate: new Date().toISOString().split("T")[0], status: "active" };
    await api.addJob(job);
    setJobs(prev => [job, ...prev]);
    setNewJob({ title: "", company: "", location: "", type: "Full-time", salary: "", description: "", requirements: "", category: "Engineering" });
    setShowJobForm(false);
    setLoading(false);
    showToast("Job posted successfully!");
  }

  async function deleteJob(id: string) {
    if (!confirm("Delete this job?")) return;
    await api.deleteJob(id);
    setJobs(prev => prev.filter(j => j.id !== id));
    showToast("Job deleted.");
  }

  async function addNews(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const item = { ...newNews, id: Date.now().toString(), image: "", status: "published" };
    await api.addNews(item);
    setNews(prev => [item, ...prev]);
    setNewNews({ title: "", description: "", category: "Company News", date: new Date().toISOString().split("T")[0] });
    setShowNewsForm(false);
    setLoading(false);
    showToast("Article published!");
  }

  async function deleteNews(id: string) {
    if (!confirm("Delete this article?")) return;
    await api.deleteNews(id);
    setNews(prev => prev.filter(n => n.id !== id));
    showToast("Article deleted.");
  }

  if (!authed) {
    return (
      <div style={{ minHeight: "calc(100vh - 64px)", display: "flex", alignItems: "center", justifyContent: "center", background: "#f8fafc", padding: 20 }}>
        <div style={{ width: "100%", maxWidth: 420 }}>
          <div style={{ textAlign: "center", marginBottom: 28 }}>
            <div style={{ width: 52, height: 52, borderRadius: 14, background: "#dc2626", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
              <AlertCircle size={26} color="white" />
            </div>
            <h1 style={{ fontSize: 24, fontWeight: 900 }}>Admin Access</h1>
            <p style={{ color: "var(--text-muted)", fontSize: 14, marginTop: 6 }}>Restricted area. Authorized personnel only.</p>
          </div>
          <div className="card" style={{ padding: 32 }}>
            <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div className="form-group">
                <label className="form-label">Username</label>
                <input className="form-input" value={loginForm.username} onChange={e => setLoginForm(p => ({ ...p, username: e.target.value }))} placeholder="admin" required autoComplete="off" />
              </div>
              <div className="form-group">
                <label className="form-label">Password</label>
                <div style={{ position: "relative" }}>
                  <input className="form-input" type={showPw ? "text" : "password"} value={loginForm.password} onChange={e => setLoginForm(p => ({ ...p, password: e.target.value }))} placeholder="Password" required style={{ paddingRight: 44 }} autoComplete="current-password" />
                  <button type="button" onClick={() => setShowPw(!showPw)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--text-muted)" }}>
                    {showPw ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
              {loginError && <p style={{ color: "var(--error)", fontSize: 13, background: "#fef2f2", padding: "10px 14px", borderRadius: 8 }}>{loginError}</p>}
              <button type="submit" style={{ background: "#dc2626", color: "white", border: "none", borderRadius: 10, padding: "12px", fontWeight: 700, fontSize: 15, cursor: "pointer" }}>
                Sign In to Admin
              </button>
            </form>
            <p style={{ textAlign: "center", fontSize: 12, color: "var(--text-muted)", marginTop: 16 }}>
              Session expires after 30 minutes of inactivity
            </p>
          </div>
        </div>
      </div>
    );
  }

  const TABS = [
    { id: "jobs" as Tab, label: "Jobs", icon: <Briefcase size={16} />, count: jobs.length },
    { id: "news" as Tab, label: "News", icon: <Newspaper size={16} />, count: news.length },
    { id: "applications" as Tab, label: "Applications", icon: <Users size={16} />, count: applications.length },
  ];

  return (
    <div style={{ minHeight: "calc(100vh - 64px)", background: "#f8fafc" }}>
      {/* Admin Header */}
      <div style={{ background: "#0f172a", color: "white", padding: "20px 0" }}>
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 800 }}>Admin Panel</h1>
            <p style={{ fontSize: 13, color: "#94a3b8", marginTop: 2 }}>Logged in as <strong style={{ color: "white" }}>{CONFIG.ADMIN_USERNAME}</strong></p>
          </div>
          <button
            onClick={() => { auth.logout(); setAuthed(false); }}
            style={{ display: "flex", alignItems: "center", gap: 8, background: "#dc2626", color: "white", border: "none", borderRadius: 8, padding: "8px 16px", fontWeight: 600, fontSize: 13, cursor: "pointer" }}
          >
            <LogOut size={15} /> Logout
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="container" style={{ padding: "24px 20px 0" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 16, marginBottom: 28 }}>
          {[
            { label: "Active Jobs", value: jobs.filter(j => j.status === "active").length, color: "var(--primary)" },
            { label: "News Articles", value: news.length, color: "#7c3aed" },
            { label: "Applications", value: applications.length, color: "var(--success)" },
          ].map(stat => (
            <div key={stat.label} className="card" style={{ padding: "20px 24px" }}>
              <div style={{ fontSize: 30, fontWeight: 900, color: stat.color }}>{stat.value}</div>
              <div style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 4 }}>{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div style={{ display: "flex", gap: 4, borderBottom: "2px solid var(--border)", marginBottom: 24 }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)} style={{
              display: "flex", alignItems: "center", gap: 8, padding: "10px 20px", fontWeight: 700, fontSize: 14, border: "none",
              borderBottom: tab === t.id ? "2px solid var(--primary)" : "2px solid transparent",
              color: tab === t.id ? "var(--primary)" : "var(--text-muted)",
              background: "none", cursor: "pointer", marginBottom: -2, transition: "0.15s",
            }}>
              {t.icon} {t.label} <span className="badge badge-gray" style={{ fontSize: 11 }}>{t.count}</span>
            </button>
          ))}
        </div>

        {/* Jobs Tab */}
        {tab === "jobs" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700 }}>Manage Job Listings</h2>
              <button className="btn btn-primary btn-sm" onClick={() => setShowJobForm(!showJobForm)}>
                <Plus size={16} /> {showJobForm ? "Cancel" : "Add Job"}
              </button>
            </div>

            {showJobForm && (
              <form onSubmit={addJob} className="card" style={{ marginBottom: 24 }}>
                <h3 style={{ fontWeight: 700, marginBottom: 18 }}>New Job Listing</h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 14 }}>
                  <div className="form-group"><label className="form-label">Job Title *</label><input className="form-input" value={newJob.title} onChange={e => setNewJob(p => ({ ...p, title: e.target.value }))} required /></div>
                  <div className="form-group"><label className="form-label">Company *</label><input className="form-input" value={newJob.company} onChange={e => setNewJob(p => ({ ...p, company: e.target.value }))} required /></div>
                  <div className="form-group"><label className="form-label">Location</label><input className="form-input" value={newJob.location} onChange={e => setNewJob(p => ({ ...p, location: e.target.value }))} /></div>
                  <div className="form-group"><label className="form-label">Salary Range</label><input className="form-input" value={newJob.salary} onChange={e => setNewJob(p => ({ ...p, salary: e.target.value }))} placeholder="₹X–Y LPA" /></div>
                  <div className="form-group"><label className="form-label">Type</label>
                    <select className="form-input" value={newJob.type} onChange={e => setNewJob(p => ({ ...p, type: e.target.value }))}>
                      {["Full-time", "Part-time", "Contract", "Remote", "Internship"].map(t => <option key={t}>{t}</option>)}
                    </select>
                  </div>
                  <div className="form-group"><label className="form-label">Category</label>
                    <select className="form-input" value={newJob.category} onChange={e => setNewJob(p => ({ ...p, category: e.target.value }))}>
                      {["Engineering", "Design", "Product", "Marketing", "Data", "Finance", "HR", "Sales"].map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginTop: 14 }}>
                  <div className="form-group"><label className="form-label">Description</label><textarea className="form-input form-textarea" value={newJob.description} onChange={e => setNewJob(p => ({ ...p, description: e.target.value }))} rows={3} /></div>
                  <div className="form-group"><label className="form-label">Requirements</label><textarea className="form-input form-textarea" value={newJob.requirements} onChange={e => setNewJob(p => ({ ...p, requirements: e.target.value }))} rows={3} /></div>
                </div>
                <button type="submit" className="btn btn-primary" style={{ marginTop: 16 }} disabled={loading}>
                  {loading ? <><Loader2 size={15} style={{ animation: "spin 1s linear infinite" }} /> Posting...</> : "Post Job"}
                </button>
              </form>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {jobs.map(job => (
                <div key={job.id} style={{ background: "white", border: "1px solid var(--border)", borderRadius: 12, padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: 15 }}>{job.title}</div>
                    <div style={{ color: "var(--text-muted)", fontSize: 13, marginTop: 2 }}>{job.company} • {job.location} • {job.type}</div>
                  </div>
                  <div style={{ display: "flex", gap: 8, alignItems: "center", flexShrink: 0 }}>
                    <span className={`badge ${job.status === "active" ? "badge-green" : "badge-gray"}`}>{job.status}</span>
                    <button onClick={() => deleteJob(job.id)} style={{ background: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca", borderRadius: 8, padding: "6px 10px", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, fontSize: 13, fontWeight: 600 }}>
                      <Trash2 size={14} /> Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* News Tab */}
        {tab === "news" && (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <h2 style={{ fontSize: 18, fontWeight: 700 }}>Manage News</h2>
              <button className="btn btn-primary btn-sm" onClick={() => setShowNewsForm(!showNewsForm)}>
                <Plus size={16} /> {showNewsForm ? "Cancel" : "Add Article"}
              </button>
            </div>

            {showNewsForm && (
              <form onSubmit={addNews} className="card" style={{ marginBottom: 24 }}>
                <h3 style={{ fontWeight: 700, marginBottom: 18 }}>New Article</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div className="form-group"><label className="form-label">Title *</label><input className="form-input" value={newNews.title} onChange={e => setNewNews(p => ({ ...p, title: e.target.value }))} required /></div>
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                    <div className="form-group">
                      <label className="form-label">Category</label>
                      <select className="form-input" value={newNews.category} onChange={e => setNewNews(p => ({ ...p, category: e.target.value }))}>
                        {["Company News", "Product Update", "Industry News", "Trends", "Career Tips"].map(c => <option key={c}>{c}</option>)}
                      </select>
                    </div>
                    <div className="form-group"><label className="form-label">Date</label><input type="date" className="form-input" value={newNews.date} onChange={e => setNewNews(p => ({ ...p, date: e.target.value }))} /></div>
                  </div>
                  <div className="form-group"><label className="form-label">Content *</label><textarea className="form-input form-textarea" value={newNews.description} onChange={e => setNewNews(p => ({ ...p, description: e.target.value }))} rows={4} required /></div>
                </div>
                <button type="submit" className="btn btn-primary" style={{ marginTop: 16 }} disabled={loading}>
                  {loading ? "Publishing..." : "Publish Article"}
                </button>
              </form>
            )}

            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {news.map(item => (
                <div key={item.id} style={{ background: "white", border: "1px solid var(--border)", borderRadius: 12, padding: "16px 20px", display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: 15 }}>{item.title}</div>
                    <div style={{ color: "var(--text-muted)", fontSize: 13, marginTop: 2 }}>{item.category} • {item.date}</div>
                  </div>
                  <button onClick={() => deleteNews(item.id)} style={{ background: "#fef2f2", color: "#dc2626", border: "1px solid #fecaca", borderRadius: 8, padding: "6px 10px", cursor: "pointer", display: "flex", alignItems: "center", gap: 4, fontSize: 13, fontWeight: 600, flexShrink: 0 }}>
                    <Trash2 size={14} /> Delete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Applications Tab */}
        {tab === "applications" && (
          <div style={{ textAlign: "center", padding: 60 }}>
            <Users size={52} color="var(--border)" style={{ margin: "0 auto 16px" }} />
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8 }}>Applications from Google Sheets</h3>
            <p style={{ color: "var(--text-muted)", maxWidth: 440, margin: "0 auto" }}>
              All job applications are submitted directly to your Google Sheet. Open your Sheet to review candidate applications in full detail.
            </p>
          </div>
        )}
      </div>

      {toast && <div className="toast toast-success">{toast}</div>}
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
