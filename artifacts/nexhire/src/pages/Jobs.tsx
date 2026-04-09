import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { Search, MapPin, Filter, Briefcase, X, ChevronDown } from "lucide-react";
import { Link } from "wouter";
import { api, Job, SAMPLE_JOBS } from "@/services/api";
import ApplyModal from "@/components/ApplyModal";

const JOB_TYPES = ["All", "Full-time", "Part-time", "Contract", "Remote", "Internship"];
const CATEGORIES = ["All", "Engineering", "Design", "Product", "Marketing", "Data", "Finance", "HR", "Sales"];
const LOCATIONS = ["All", "Bangalore", "Mumbai", "Delhi", "Hyderabad", "Pune", "Chennai", "Remote"];

const BROWSE_CATEGORIES = [
  { name: "Engineering", icon: <Briefcase size={22} color="var(--primary)" />, count: 1240 },
  { name: "Design", icon: <Briefcase size={22} color="var(--primary)" />, count: 380 },
  { name: "Product", icon: <Briefcase size={22} color="var(--primary)" />, count: 290 },
  { name: "Marketing", icon: <Briefcase size={22} color="var(--primary)" />, count: 460 },
  { name: "Data", icon: <Briefcase size={22} color="var(--primary)" />, count: 320 },
  { name: "Finance", icon: <Briefcase size={22} color="var(--primary)" />, count: 210 },
  { name: "HR", icon: <Briefcase size={22} color="var(--primary)" />, count: 175 },
  { name: "Sales", icon: <Briefcase size={22} color="var(--primary)" />, count: 540 },
];

export default function Jobs() {
  const lastUrlRef = useRef<string>("");
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filtered, setFiltered] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [catFilter, setCatFilter] = useState("All");
  const [locFilter, setLocFilter] = useState("All");
  const [applyJob, setApplyJob] = useState<Job | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const PER_PAGE = 9;

  // Fetch jobs on mount
  useEffect(() => {
    api.getJobs()
      .then(data => setJobs(data.length ? data : SAMPLE_JOBS))
      .catch(() => setJobs(SAMPLE_JOBS))
      .finally(() => setLoading(false));
  }, []);

  // Sync URL with filter state on mount and when URL changes
  useLayoutEffect(() => {
    const syncUrlToState = () => {
      const currentUrl = window.location.search;
      if (currentUrl !== lastUrlRef.current) {
        lastUrlRef.current = currentUrl;
        const params = new URLSearchParams(currentUrl);
        const newSearch = params.get("search") || "";
        const newCat = params.get("category") || "All";
        
        setSearch(newSearch);
        setCatFilter(newCat);
        setCurrentPage(1);
        setTypeFilter("All");
        setLocFilter("All");
      }
    };

    // Sync on mount
    syncUrlToState();

    // Listen for back/forward button
    const handlePopState = () => {
      syncUrlToState();
    };

    // Detect URL changes from Link clicks (Wouter doesn't have built-in detection)
    const checkUrlChange = setInterval(() => {
      syncUrlToState();
    }, 50);

    window.addEventListener("popstate", handlePopState);
    
    return () => {
      window.removeEventListener("popstate", handlePopState);
      clearInterval(checkUrlChange);
    };
  }, []);

  // Apply filtering immediately as search/filters change
  useEffect(() => {
    let result = jobs.filter(j => j.status !== "closed");
    if (search) result = result.filter(j =>
      j.title.toLowerCase().includes(search.toLowerCase()) ||
      j.company.toLowerCase().includes(search.toLowerCase()) ||
      j.requirements.toLowerCase().includes(search.toLowerCase())
    );
    if (typeFilter !== "All") result = result.filter(j => j.type === typeFilter);
    if (catFilter !== "All") result = result.filter(j => j.category === catFilter);
    if (locFilter !== "All") result = result.filter(j => j.location.includes(locFilter) || (locFilter === "Remote" && j.type === "Remote"));
    setFiltered(result);
  }, [jobs, search, typeFilter, catFilter, locFilter]);

  const paginated = filtered.slice((currentPage - 1) * PER_PAGE, currentPage * PER_PAGE);
  const totalPages = Math.ceil(filtered.length / PER_PAGE);

  function clearFilters() {
    setSearch("");
    setTypeFilter("All");
    setCatFilter("All"); 
    setLocFilter("All");
  }

  const hasFilters = search || typeFilter !== "All" || catFilter !== "All" || locFilter !== "All";

  return (
    <div>
      <div className="page-hero">
        <div className="container">
          <h1 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 900, marginBottom: 12 }}>Find Your Perfect Job</h1>
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 17, marginBottom: 32 }}>
            {loading ? "Loading..." : `${filtered.length.toLocaleString()} opportunities available`}
          </p>
          <div style={{
            background: "white",
            borderRadius: 14,
            padding: 8,
            display: "flex",
            gap: 8,
            maxWidth: 700,
            margin: "0 auto",
            boxShadow: "0 10px 40px rgba(0,0,0,0.2)",
            flexWrap: "wrap",
          }}>
            <div style={{ flex: 2, display: "flex", alignItems: "center", gap: 10, padding: "0 12px", minWidth: 180 }}>
              <Search size={18} color="var(--text-muted)" />
              <input
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search jobs, skills, company..."
                style={{ border: "none", outline: "none", fontSize: 15, color: "var(--text)", width: "100%", background: "transparent" }}
              />
            </div>
            <button className="btn btn-primary" style={{ borderRadius: 10 }}>
              <Search size={16} /> Search
            </button>
          </div>
        </div>
      </div>

      <div className="container" style={{ padding: "32px 20px" }}>
        {/* Filter Bar */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", alignItems: "center", marginBottom: 28 }}>
          <button
            onClick={() => setShowFilters(!showFilters)}
            style={{ display: "flex", alignItems: "center", gap: 8, padding: "8px 16px", border: "1.5px solid var(--border)", borderRadius: 10, background: "white", fontSize: 14, fontWeight: 600, cursor: "pointer" }}
          >
            <Filter size={16} /> Filters <ChevronDown size={14} style={{ transform: showFilters ? "rotate(180deg)" : "none", transition: "0.2s" }} />
          </button>

          {["All", ...JOB_TYPES.slice(1)].map(t => (
            <button key={t} onClick={() => setTypeFilter(t)} style={{
              padding: "8px 16px", borderRadius: 20, fontSize: 13, fontWeight: 600, border: "1.5px solid",
              borderColor: typeFilter === t ? "var(--primary)" : "var(--border)",
              background: typeFilter === t ? "var(--primary)" : "white",
              color: typeFilter === t ? "white" : "var(--text-muted)",
              cursor: "pointer", transition: "all 0.15s",
            }}>
              {t}
            </button>
          ))}

          {hasFilters && (
            <button onClick={clearFilters} style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", background: "#fef2f2", color: "var(--error)", border: "1.5px solid #fecaca", borderRadius: 10, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
              <X size={14} /> Clear
            </button>
          )}
        </div>

        {showFilters && (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, marginBottom: 24, background: "white", padding: 20, borderRadius: 14, border: "1px solid var(--border)" }}>
            <div className="form-group">
              <label className="form-label">Category</label>
              <select className="form-input" value={catFilter} onChange={e => setCatFilter(e.target.value)} style={{ cursor: "pointer" }}>
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Location</label>
              <select className="form-input" value={locFilter} onChange={e => setLocFilter(e.target.value)} style={{ cursor: "pointer" }}>
                {LOCATIONS.map(l => <option key={l}>{l}</option>)}
              </select>
            </div>
          </div>
        )}

        {/* Browse by Category Section */}
        <section style={{ padding: "48px 0", borderBottom: "1px solid var(--border)", marginBottom: 40 }}>
          <div style={{ textAlign: "center", marginBottom: 36 }}>
            <h2 className="section-title">Browse by Category</h2>
            <p className="section-subtitle">
              Discover opportunities across every field
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
              gap: 16,
            }}
          >
            {BROWSE_CATEGORIES.map((cat) => (
              <Link
                key={cat.name}
                href={`/jobs?category=${encodeURIComponent(cat.name)}`}
                style={{ textDecoration: "none" }}
              >
                <div
                  style={{
                    background: "white",
                    border: "1px solid var(--border)",
                    borderRadius: 16,
                    padding: "24px 20px",
                    textAlign: "center",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    borderColor: catFilter === cat.name ? "var(--primary)" : "var(--border)",
                    boxShadow: catFilter === cat.name ? "var(--shadow-hover)" : "none",
                    transform: catFilter === cat.name ? "translateY(-4px)" : "translateY(0)",
                  }}
                  onMouseEnter={(e) => {
                    if (catFilter !== cat.name) {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = "var(--primary)";
                      el.style.transform = "translateY(-4px)";
                      el.style.boxShadow = "var(--shadow-hover)";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (catFilter !== cat.name) {
                      const el = e.currentTarget as HTMLElement;
                      el.style.borderColor = "var(--border)";
                      el.style.transform = "translateY(0)";
                      el.style.boxShadow = "none";
                    }
                  }}
                >
                  <div style={{ marginBottom: 12, display: "flex", justifyContent: "center" }}>
                    <div
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 12,
                        background: "var(--primary-light)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      {cat.icon}
                    </div>
                  </div>
                  <div style={{ fontWeight: 700, fontSize: 14, color: "#1a1a2e", marginBottom: 4, lineHeight: 1.3 }}>
                    {cat.name}
                  </div>
                  <div style={{ fontSize: 12, color: "#5e5e7a", fontWeight: 500 }}>
                    {cat.count.toLocaleString()} jobs
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Jobs Listings */}
        {loading ? (
          <div style={{ textAlign: "center", padding: 80 }}>
            <div className="spinner" />
            <p style={{ color: "var(--text-muted)", marginTop: 16 }}>Loading jobs...</p>
          </div>
        ) : paginated.length === 0 ? (
          <div style={{ textAlign: "center", padding: 80 }}>
            <Briefcase size={48} color="var(--border)" style={{ margin: "0 auto 16px" }} />
            <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 8 }}>No jobs found</h3>
            <p style={{ color: "var(--text-muted)", marginBottom: 24 }}>Try adjusting your filters or search terms</p>
            <button className="btn btn-primary" onClick={clearFilters}>Clear Filters</button>
          </div>
        ) : (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 20 }}>
              {paginated.map(job => (
                <div key={job.id} className="card" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: "var(--primary-light)", display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <Briefcase size={22} color="var(--primary)" />
                    </div>
                    <span className={`badge ${job.type === "Full-time" ? "badge-green" : job.type === "Remote" ? "badge-blue" : job.type === "Contract" ? "badge-orange" : "badge-purple"}`}>
                      {job.type}
                    </span>
                  </div>
                  <div>
                    <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 4, lineHeight: 1.3 }}>{job.title}</h3>
                    <p style={{ color: "var(--text-muted)", fontSize: 14, fontWeight: 500 }}>{job.company}</p>
                  </div>
                  {job.description && (
                    <p style={{ color: "var(--text-muted)", fontSize: 13, lineHeight: 1.6, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      {job.description}
                    </p>
                  )}
                  <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                    <div style={{ display: "flex", gap: 5, alignItems: "center", color: "var(--text-muted)", fontSize: 13 }}>
                      <MapPin size={13} /> {job.location}
                    </div>
                    {job.salary && (
                      <div style={{ fontSize: 13, color: "var(--success)", fontWeight: 700 }}>💰 {job.salary}</div>
                    )}
                    {job.category && (
                      <span className="badge badge-gray">{job.category}</span>
                    )}
                  </div>
                  <div style={{ flex: 1 }} />
                  {job.postedDate && (
                    <div style={{ fontSize: 12, color: "var(--text-muted)" }}>
                      Posted: {new Date(job.postedDate).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </div>
                  )}
                  <button className="btn btn-primary btn-sm" style={{ marginTop: "auto" }} onClick={() => setApplyJob(job)}>
                    Apply Now
                  </button>
                </div>
              ))}
            </div>

            {totalPages > 1 && (
              <div style={{ display: "flex", gap: 8, justifyContent: "center", marginTop: 40, flexWrap: "wrap" }}>
                <button className="btn btn-outline btn-sm" onClick={() => setCurrentPage(p => Math.max(1, p - 1))} disabled={currentPage === 1}>
                  Previous
                </button>
                {Array.from({ length: Math.min(totalPages, 7) }).map((_, i) => {
                  const page = i + 1;
                  return (
                    <button key={page} onClick={() => setCurrentPage(page)} style={{
                      width: 36, height: 36, borderRadius: 8, border: "1.5px solid",
                      borderColor: currentPage === page ? "var(--primary)" : "var(--border)",
                      background: currentPage === page ? "var(--primary)" : "white",
                      color: currentPage === page ? "white" : "var(--text)",
                      fontSize: 14, fontWeight: 600, cursor: "pointer",
                    }}>
                      {page}
                    </button>
                  );
                })}
                <button className="btn btn-outline btn-sm" onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))} disabled={currentPage === totalPages}>
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>

      {applyJob && <ApplyModal job={applyJob} onClose={() => setApplyJob(null)} />}
    </div>
  );
}
