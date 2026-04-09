import { useState, useEffect } from "react";
import { Link } from "wouter";
import {
  Search,
  MapPin,
  Briefcase,
  TrendingUp,
  Users,
  Star,
  ArrowRight,
  CheckCircle,
  Building2,
  Globe,
} from "lucide-react";
import { api, Job, SAMPLE_JOBS } from "@/services/api";
import ApplyModal from "@/components/ApplyModal";

const CATEGORIES = [
  { name: "Engineering", icon:     <div
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
      <Briefcase size={22} color="var(--primary)" />
    </div>, count: 1240 },
  { name: "Design", icon:     <div
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
      <Briefcase size={22} color="var(--primary)" />
    </div>, count: 380 },
  { name: "Product", icon:     <div
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
      <Briefcase size={22} color="var(--primary)" />
    </div>, count: 290 },
  { name: "Marketing", icon:     <div
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
      <Briefcase size={22} color="var(--primary)" />
    </div>, count: 460 },
  { name: "Data & AI", icon:     <div
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
      <Briefcase size={22} color="var(--primary)" />
    </div>, count: 320 },
  { name: "Finance", icon:     <div
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
      <Briefcase size={22} color="var(--primary)" />
    </div>, count: 210 },
  { name: "HR", icon:     <div
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
      <Briefcase size={22} color="var(--primary)" />
    </div>, count: 175 },
  { name: "Sales", icon:     <div
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
      <Briefcase size={22} color="var(--primary)" />
    </div>, count: 540 },
];

const STATS = [
  {
    label: "Jobs Posted",
    value: "50,000+",
    icon: <Briefcase size={24} color="var(--primary)" />,
  },
  {
    label: "Companies",
    value: "3,200+",
    icon: <Building2 size={24} color="var(--primary)" />,
  },
  {
    label: "Candidates Hired",
    value: "120,000+",
    icon: <Users size={24} color="var(--primary)" />,
  },
  {
    label: "Cities Covered",
    value: "80+",
    icon: <Globe size={24} color="var(--primary)" />,
  },
];

const TESTIMONIALS = [
  {
    name: "Priya Sharma",
    role: "Software Engineer at Infosys",
    text: "NexHire helped me land my dream job within 3 weeks. The platform is so intuitive and the job matches were incredibly relevant.",
    rating: 5,
  },
  {
    name: "Rahul Mehta",
    role: "Product Manager at Zomato",
    text: "I applied to 5 jobs and got 3 interviews. The career profile builder really helped highlight my strengths. Highly recommend!",
    rating: 5,
  },
  {
    name: "Ananya Krishnan",
    role: "UX Designer at Swiggy",
    text: "The best job portal in India hands down. Clean UI, no spam, and only relevant opportunities. Switched jobs in 2 months!",
    rating: 5,
  },
];

const TOP_COMPANIES = [
  "Google",
  "Microsoft",
  "Amazon",
  "Flipkart",
  "Zomato",
  "Swiggy",
  "Razorpay",
  "CRED",
  "Meesho",
  "PhonePe",
  "Infosys",
  "Wipro",
];

export default function Home() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [applyJob, setApplyJob] = useState<Job | null>(null);

  useEffect(() => {
    api
      .getJobs()
      .then((data) => setJobs(data.length ? data : SAMPLE_JOBS))
      .catch(() => setJobs(SAMPLE_JOBS));
  }, []);

  const featuredJobs = jobs.filter((j) => j.status !== "closed").slice(0, 6);

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    window.location.href = `/jobs?search=${encodeURIComponent(search)}&location=${encodeURIComponent(location)}`;
  }

  return (
    <div>
      {/* Hero */}
      <section
        style={{
          background:
            "linear-gradient(135deg, #0a66c2 0%, #004182 60%, #0f172a 100%)",
          color: "white",
          padding: "20px 0 30px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "radial-gradient(circle at 80% 50%, rgba(255,255,255,0.04) 0%, transparent 60%)",
            pointerEvents: "none",
          }}
        />
        <div
          className="container"
          style={{ textAlign: "center", position: "relative" }}
        >
          <div
            className="badge badge-blue"
            style={{
              marginBottom: 20,
              background: "rgba(255,255,255,0.15)",
              color: "white",
              fontSize: 13,
            }}
          > India's Fastest Growing Job Platform</div>
          <h1
            style={{
              fontSize: "clamp(36px, 6vw, 62px)",
              fontWeight: 900,
              lineHeight: 1.1,
              marginBottom: 20,
              letterSpacing: "-1px",
            }}
          >
            Find Your Next
            <br />
            <span style={{ color: "#60a5fa" }}>Dream Opportunity</span>
          </h1>
          <p
            style={{
              fontSize: "clamp(16px, 2.5vw, 20px)",
              color: "rgba(255,255,255,0.8)",
              maxWidth: 600,
              margin: "0 auto 40px",
            }}
          >
            Connect with 3,200+ top employers across India. Your perfect career
            move is just one click away.
          </p>

          <form
            onSubmit={handleSearch}
            style={{
              background: "white",
              borderRadius: 16,
              padding: 8,
              display: "flex",
              gap: 8,
              maxWidth: 700,
              margin: "0 auto 48px",
              boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
              flexWrap: "wrap",
            }}
          >
            <div
              style={{
                flex: 2,
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "0 12px",
                minWidth: 200,
              }}
            >
              <Search size={18} color="var(--text-muted)" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Job title, skills, or company"
                style={{
                  border: "none",
                  outline: "none",
                  fontSize: 15,
                  color: "var(--text)",
                  width: "100%",
                  background: "transparent",
                }}
              />
            </div>
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "0 12px",
                borderLeft: "1px solid var(--border)",
                minWidth: 150,
              }}
            >
              <MapPin size={18} color="var(--text-muted)" />
              <input
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="City or Remote"
                style={{
                  border: "none",
                  outline: "none",
                  fontSize: 15,
                  color: "var(--text)",
                  width: "100%",
                  background: "transparent",
                }}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ borderRadius: 10, padding: "12px 28px", fontSize: 15 }}
            >
              Search Jobs
            </button>
          </form>

          <div
            style={{
              display: "flex",
              gap: 32,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {[
              "React Developer",
              "Product Manager",
              "UX Designer",
              "Data Scientist",
            ].map((tag) => (
              <Link
                key={tag}
                href={`/jobs?search=${encodeURIComponent(tag)}`}
                style={{
                  color: "rgba(255,255,255,0.7)",
                  fontSize: 14,
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  transition: "color 0.2s",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "white")}
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "rgba(255,255,255,0.7)")
                }
              >
                <TrendingUp size={14} /> {tag}
              </Link>
            ))}
          </div>
        </div>
      </section>
      {/* Stats */}
      <section style={{ background: "white", padding: "0", marginTop: 10 }}>
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: 16,
            }}
          >
            {STATS.map((stat) => (
              <div
                key={stat.label}
                style={{
                  background: "white",
                  border: "1px solid var(--border)",
                  borderRadius: 16,
                  padding: "24px 20px",
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  boxShadow: "var(--shadow)",
                }}
              >
                <div
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 12,
                    background: "var(--primary-light)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {stat.icon}
                </div>
                <div>
                  <div
                    style={{
                      fontSize: 24,
                      fontWeight: 800,
                      color: "var(--primary)",
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: "var(--text-muted)",
                      fontWeight: 500,
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Categories */}
      <section style={{ padding: "72px 0" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 44 }}>
            <h2 className="section-title">Browse by Category</h2>
            <p className="section-subtitle">
              Discover thousands of opportunities across every field
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))",
              gap: 16,
            }}
          >
            {CATEGORIES.map((cat) => (
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
                  }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "var(--primary)";
                    el.style.transform = "translateY(-4px)";
                    el.style.boxShadow = "var(--shadow-hover)";
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "var(--border)";
                    el.style.transform = "translateY(0)";
                    el.style.boxShadow = "none";
                  }}
                >
                  <div style={{ marginBottom: 12, display: "flex", justifyContent: "center" }}>
                    {cat.icon}
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
        </div>
      </section>
      {/* Featured Jobs */}
      <section style={{ background: "white", padding: "72px 0" }}>
        <div className="container">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 40,
              flexWrap: "wrap",
              gap: 12,
            }}
          >
            <div>
              <h2 className="section-title">Featured Jobs</h2>
              <p className="section-subtitle">
                Hand-picked opportunities from top employers
              </p>
            </div>
            <Link
              href="/jobs"
              className="btn btn-outline"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                textDecoration: "none",
              }}
            >
              View All Jobs <ArrowRight size={16} />
            </Link>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
              gap: 20,
            }}
          >
            {featuredJobs.map((job) => (
              <div
                key={job.id}
                className="card"
                style={{ display: "flex", flexDirection: "column", gap: 16 }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "flex-start",
                  }}
                >
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
                    <Briefcase size={22} color="var(--primary)" />
                  </div>
                  <span
                    className={`badge badge-${job.type === "Full-time" ? "green" : job.type === "Remote" ? "blue" : "orange"}`}
                  >
                    {job.type}
                  </span>
                </div>
                <div>
                  <h3
                    style={{ fontSize: 17, fontWeight: 700, marginBottom: 4 }}
                  >
                    {job.title}
                  </h3>
                  <p style={{ color: "var(--text-muted)", fontSize: 14 }}>
                    {job.company}
                  </p>
                </div>
                <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                  <div
                    style={{
                      display: "flex",
                      gap: 5,
                      alignItems: "center",
                      color: "var(--text-muted)",
                      fontSize: 13,
                    }}
                  >
                    <MapPin size={13} /> {job.location}
                  </div>
                  {job.salary && (
                    <div
                      style={{
                        display: "flex",
                        gap: 5,
                        alignItems: "center",
                        color: "var(--success)",
                        fontSize: 13,
                        fontWeight: 600,
                      }}
                    >
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
                        <Briefcase size={22} color="var(--primary)" />
                      </div>
                      {job.salary}
                    </div>
                  )}
                </div>
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => setApplyJob(job)}
                >
                  Apply Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* How it works */}
      <section style={{ padding: "72px 0", background: "var(--bg)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <h2 className="section-title">How NexHire Works</h2>
            <p className="section-subtitle">Get hired in 3 simple steps</p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: 32,
            }}
          >
            {[
              {
                step: "01",
                title: "Create Profile",
                desc: "Build your career profile highlighting your skills, experience, and preferred roles.",
              },
              {
                step: "02",
                title: "Discover Jobs",
                desc: "Browse thousands of curated job listings or let our AI match you with the best opportunities.",
              },
              {
                step: "03",
                title: "Apply & Get Hired",
                desc: "Apply in one click, track your applications, and land your dream job.",
              },
            ].map((s) => (
              <div key={s.step} style={{ textAlign: "center" }}>
                <div
                  style={{
                    width: 72,
                    height: 72,
                    borderRadius: "50%",
                    background: "var(--primary)",
                    color: "white",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    margin: "0 auto 20px",
                    fontSize: 22,
                    fontWeight: 900,
                  }}
                >
                  {s.step}
                </div>
                <h3 style={{ fontSize: 20, fontWeight: 700, marginBottom: 10 }}>
                  {s.title}
                </h3>
                <p
                  style={{
                    color: "var(--text-muted)",
                    lineHeight: 1.7,
                    fontSize: 15,
                  }}
                >
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Top Companies */}
      <section style={{ background: "white", padding: "60px 0" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <h2 className="section-title">Trusted by India's Best</h2>
            <p className="section-subtitle">
              Join thousands of professionals already hired through NexHire
            </p>
          </div>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 12,
              justifyContent: "center",
            }}
          >
            {TOP_COMPANIES.map((company) => (
              <div
                key={company}
                style={{
                  padding: "10px 22px",
                  background: "var(--bg)",
                  border: "1px solid var(--border)",
                  borderRadius: 10,
                  fontWeight: 700,
                  fontSize: 14,
                  color: "var(--text-muted)",
                  transition: "all 0.2s",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "var(--primary)";
                  (e.currentTarget as HTMLElement).style.color =
                    "var(--primary)";
                  (e.currentTarget as HTMLElement).style.background =
                    "var(--primary-light)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "var(--border)";
                  (e.currentTarget as HTMLElement).style.color =
                    "var(--text-muted)";
                  (e.currentTarget as HTMLElement).style.background =
                    "var(--bg)";
                }}
              >
                {company}
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Testimonials */}
      <section style={{ padding: "72px 0" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 className="section-title">What Our Users Say</h2>
            <p className="section-subtitle">
              Join 120,000+ professionals who found their dream job on NexHire
            </p>
          </div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
              gap: 24,
            }}
          >
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="card">
                <div style={{ display: "flex", gap: 4, marginBottom: 16 }}>
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={16} fill="#f5a623" color="#f5a623" />
                  ))}
                </div>
                <p
                  style={{
                    color: "var(--text-muted)",
                    lineHeight: 1.7,
                    marginBottom: 20,
                    fontSize: 15,
                  }}
                >
                  "{t.text}"
                </p>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 15 }}>{t.name}</div>
                  <div style={{ color: "var(--text-muted)", fontSize: 13 }}>
                    {t.role}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* CTA Banner */}
      <section
        style={{
          background:
            "linear-gradient(135deg, var(--primary) 0%, var(--primary-dark) 100%)",
          color: "white",
          padding: "72px 0",
        }}
      >
        <div className="container" style={{ textAlign: "center" }}>
          <h2
            style={{
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 900,
              marginBottom: 16,
            }}
          >
            Ready to Take the Next Step?
          </h2>
          <p
            style={{
              fontSize: 18,
              color: "rgba(255,255,255,0.85)",
              marginBottom: 36,
              maxWidth: 560,
              margin: "0 auto 36px",
            }}
          >
            Build your profile, discover opportunities, and get hired by India's
            top companies — all for free.
          </p>
          <div
            style={{
              display: "flex",
              gap: 16,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link
              href="/profile"
              className="btn btn-white btn-lg"
              style={{ textDecoration: "none" }}
            >
              Build Your Profile
            </Link>
            <Link
              href="/jobs"
              className="btn btn-outline btn-lg"
              style={{
                borderColor: "white",
                color: "white",
                textDecoration: "none",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background =
                  "rgba(255,255,255,0.1)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.background =
                  "transparent";
              }}
            >
              Browse All Jobs
            </Link>
          </div>
          <div
            style={{
              marginTop: 36,
              display: "flex",
              gap: 24,
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            {[
              "Free to use",
              "No spam",
              "Verified employers",
              "Instant alerts",
            ].map((f) => (
              <div
                key={f}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 6,
                  color: "rgba(255,255,255,0.8)",
                  fontSize: 14,
                }}
              >
                <CheckCircle size={15} /> {f}
              </div>
            ))}
          </div>
        </div>
      </section>
      {applyJob && (
        <ApplyModal job={applyJob} onClose={() => setApplyJob(null)} />
      )}
    </div>
  );
}
