import { useState, useEffect } from "react";
import { Calendar, Tag, Search } from "lucide-react";
import { api, NewsItem, SAMPLE_NEWS } from "@/services/api";

const CATEGORIES = ["All", "Company News", "Product Update", "Industry News", "Trends", "Career Tips"];

export default function News() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [filtered, setFiltered] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [catFilter, setCatFilter] = useState("All");
  const [selected, setSelected] = useState<NewsItem | null>(null);

  useEffect(() => {
    api.getNews()
      .then(data => setNews(data.length ? data : SAMPLE_NEWS))
      .catch(() => setNews(SAMPLE_NEWS))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    let result = news.filter(n => n.status !== "draft");
    if (search) result = result.filter(n => n.title.toLowerCase().includes(search.toLowerCase()) || n.description.toLowerCase().includes(search.toLowerCase()));
    if (catFilter !== "All") result = result.filter(n => n.category === catFilter);
    setFiltered(result);
  }, [news, search, catFilter]);

  const [featured, ...rest] = filtered;

  return (
    <div>
      <div className="page-hero">
        <div className="container">
          <h1 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 900, marginBottom: 12 }}>News & Updates</h1>
          <p style={{ color: "rgba(255,255,255,0.85)", fontSize: 17 }}>Stay informed on hiring trends, platform updates, and career advice</p>
        </div>
      </div>

      <div className="container" style={{ padding: "40px 20px" }}>
        {/* Search and Filter */}
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 36, alignItems: "center" }}>
          <div style={{ flex: 1, minWidth: 200, display: "flex", alignItems: "center", gap: 10, background: "white", border: "1.5px solid var(--border)", borderRadius: 10, padding: "10px 14px" }}>
            <Search size={16} color="var(--text-muted)" />
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search news..." style={{ border: "none", outline: "none", fontSize: 14, width: "100%", background: "transparent" }} />
          </div>
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {CATEGORIES.map(c => (
              <button key={c} onClick={() => setCatFilter(c)} style={{
                padding: "8px 14px", borderRadius: 20, fontSize: 13, fontWeight: 600, border: "1.5px solid",
                borderColor: catFilter === c ? "var(--primary)" : "var(--border)",
                background: catFilter === c ? "var(--primary)" : "white",
                color: catFilter === c ? "white" : "var(--text-muted)",
                cursor: "pointer", transition: "all 0.15s",
              }}>
                {c}
              </button>
            ))}
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: "center", padding: 80 }}><div className="spinner" /></div>
        ) : filtered.length === 0 ? (
          <div style={{ textAlign: "center", padding: 80 }}>
            <p style={{ fontSize: 18, color: "var(--text-muted)" }}>No articles found.</p>
          </div>
        ) : (
          <>
            {/* Featured Article */}
            {featured && (
              <div
                className="card"
                onClick={() => setSelected(featured)}
                style={{ marginBottom: 36, cursor: "pointer", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 32, overflow: "hidden", minHeight: 280 }}
              >
                <div style={{ background: "linear-gradient(135deg, var(--primary), var(--primary-dark))", borderRadius: 12, minHeight: 200, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ fontSize: 48 }}>📰</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 12 }}>
                  <div style={{ display: "flex", gap: 10 }}>
                    <span className="badge badge-blue">{featured.category}</span>
                    <span className="badge badge-gray" style={{ display: "flex", alignItems: "center", gap: 4 }}>
                      <Calendar size={11} /> {new Date(featured.date).toLocaleDateString("en-IN", { day: "numeric", month: "short", year: "numeric" })}
                    </span>
                  </div>
                  <h2 style={{ fontSize: 22, fontWeight: 800, lineHeight: 1.3 }}>{featured.title}</h2>
                  <p style={{ color: "var(--text-muted)", lineHeight: 1.7 }}>{featured.description}</p>
                  <button className="btn btn-primary btn-sm" style={{ alignSelf: "flex-start" }}>Read More</button>
                </div>
              </div>
            )}

            {/* Rest of articles */}
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 20 }}>
              {rest.map(item => (
                <div key={item.id} className="card" onClick={() => setSelected(item)} style={{ cursor: "pointer", display: "flex", flexDirection: "column", gap: 14 }}>
                  <div style={{ height: 140, background: `linear-gradient(135deg, hsl(${parseInt(item.id) * 50 + 200}, 70%, 45%), hsl(${parseInt(item.id) * 50 + 230}, 70%, 30%))`, borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: 36 }}>{item.category === "Company News" ? "🏢" : item.category === "Product Update" ? "🚀" : item.category === "Industry News" ? "📊" : "💡"}</span>
                  </div>
                  <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    <span className="badge badge-blue" style={{ fontSize: 11 }}>{item.category}</span>
                    <span style={{ fontSize: 12, color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 4 }}>
                      <Calendar size={11} /> {new Date(item.date).toLocaleDateString("en-IN", { day: "numeric", month: "short" })}
                    </span>
                  </div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, lineHeight: 1.4 }}>{item.title}</h3>
                  <p style={{ color: "var(--text-muted)", fontSize: 13, lineHeight: 1.6, display: "-webkit-box", WebkitLineClamp: 3, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                    {item.description}
                  </p>
                  <span style={{ color: "var(--primary)", fontSize: 13, fontWeight: 600, marginTop: "auto" }}>Read more →</span>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Article Modal */}
      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal" style={{ maxWidth: 680 }} onClick={e => e.stopPropagation()}>
            <div style={{ marginBottom: 20 }}>
              <div style={{ display: "flex", gap: 10, marginBottom: 16 }}>
                <span className="badge badge-blue">{selected.category}</span>
                <span className="badge badge-gray" style={{ display: "flex", alignItems: "center", gap: 4 }}>
                  <Calendar size={11} /> {new Date(selected.date).toLocaleDateString("en-IN", { dateStyle: "long" })}
                </span>
              </div>
              <h2 style={{ fontSize: 24, fontWeight: 800, lineHeight: 1.3, marginBottom: 16 }}>{selected.title}</h2>
              <p style={{ color: "var(--text-muted)", lineHeight: 1.8, fontSize: 16 }}>{selected.description}</p>
            </div>
            <button className="btn btn-outline btn-sm" onClick={() => setSelected(null)}>Close</button>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
