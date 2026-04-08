import { Link } from "wouter";
import { Target, Users, Globe, Zap, Award, Heart } from "lucide-react";

const TEAM = [
  { name: "Arjun Nair", role: "CEO & Co-Founder", bio: "Former VP of Engineering at Flipkart with 15 years in tech." },
  { name: "Priya Patel", role: "CPO & Co-Founder", bio: "Ex-Product Lead at LinkedIn India, driving hiring innovation." },
  { name: "Rohan Das", role: "CTO", bio: "Built scalable systems for 10M+ users at multiple startups." },
  { name: "Ananya Kumar", role: "Head of Partnerships", bio: "Connected 1000+ companies with top talent across India." },
];

const VALUES = [
  { icon: <Target size={28} color="var(--primary)" />, title: "Mission-Driven", desc: "We exist to democratize access to opportunity for every skilled professional in India, regardless of background or geography." },
  { icon: <Heart size={28} color="var(--primary)" />, title: "People First", desc: "Every decision we make starts with one question: does this make life better for job seekers and employers?" },
  { icon: <Zap size={28} color="var(--primary)" />, title: "Move Fast", desc: "The job market moves quickly. We build features and iterate at startup speed without compromising quality." },
  { icon: <Globe size={28} color="var(--primary)" />, title: "Built for India", desc: "We understand the unique challenges of the Indian job market and build solutions specifically for our context." },
];

export default function About() {
  return (
    <div>
      <div className="page-hero">
        <div className="container">
          <h1 style={{ fontSize: "clamp(28px, 4vw, 44px)", fontWeight: 900, marginBottom: 16 }}>About NexHire</h1>
          <p style={{ fontSize: 18, color: "rgba(255,255,255,0.85)", maxWidth: 600, margin: "0 auto" }}>
            We're on a mission to make finding the right job — and the right talent — easier for everyone in India.
          </p>
        </div>
      </div>

      {/* Story */}
      <section style={{ padding: "80px 0", background: "white" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 60, alignItems: "center" }}>
            <div>
              <div className="badge badge-blue" style={{ marginBottom: 16, fontSize: 12 }}>Our Story</div>
              <h2 className="section-title" style={{ marginBottom: 20 }}>Why We Built NexHire</h2>
              <p style={{ color: "var(--text-muted)", lineHeight: 1.8, fontSize: 16, marginBottom: 16 }}>
                In 2024, our founders faced firsthand the frustration of India's fragmented job market — endless spam, irrelevant job suggestions, and opaque hiring processes that wasted everyone's time.
              </p>
              <p style={{ color: "var(--text-muted)", lineHeight: 1.8, fontSize: 16, marginBottom: 24 }}>
                We built NexHire to be different: a platform built on transparency, relevance, and genuine care for both job seekers and employers. No spam. No fake listings. Just real opportunities for real people.
              </p>
              <div style={{ display: "flex", gap: 32 }}>
                <div>
                  <div style={{ fontSize: 28, fontWeight: 900, color: "var(--primary)" }}>2024</div>
                  <div style={{ fontSize: 13, color: "var(--text-muted)" }}>Founded</div>
                </div>
                <div>
                  <div style={{ fontSize: 28, fontWeight: 900, color: "var(--primary)" }}>120K+</div>
                  <div style={{ fontSize: 13, color: "var(--text-muted)" }}>Hired via NexHire</div>
                </div>
                <div>
                  <div style={{ fontSize: 28, fontWeight: 900, color: "var(--primary)" }}>3,200+</div>
                  <div style={{ fontSize: 13, color: "var(--text-muted)" }}>Partner Companies</div>
                </div>
              </div>
            </div>
            <div style={{ background: "linear-gradient(135deg, var(--primary-light), #dbeafe)", borderRadius: 24, padding: 48, textAlign: "center" }}>
              <Users size={80} color="var(--primary)" style={{ margin: "0 auto 20px" }} />
              <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 10 }}>Connecting India's Talent</h3>
              <p style={{ color: "var(--text-muted)", lineHeight: 1.7 }}>From fresh graduates to seasoned professionals across 80+ cities, NexHire is where careers are made.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section style={{ padding: "72px 0", background: "var(--bg)" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 className="section-title">Our Values</h2>
            <p className="section-subtitle">The principles that guide everything we do</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: 24 }}>
            {VALUES.map((v, i) => (
              <div key={i} className="card" style={{ textAlign: "center" }}>
                <div style={{ width: 60, height: 60, borderRadius: 16, background: "var(--primary-light)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}>
                  {v.icon}
                </div>
                <h3 style={{ fontWeight: 700, fontSize: 17, marginBottom: 10 }}>{v.title}</h3>
                <p style={{ color: "var(--text-muted)", fontSize: 14, lineHeight: 1.7 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section style={{ padding: "72px 0", background: "white" }}>
        <div className="container">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 className="section-title">Meet the Team</h2>
            <p className="section-subtitle">Passionate people building the future of hiring in India</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: 24 }}>
            {TEAM.map((member, i) => (
              <div key={i} className="card" style={{ textAlign: "center" }}>
                <div style={{
                  width: 72, height: 72, borderRadius: "50%", margin: "0 auto 16px",
                  background: `hsl(${i * 60 + 210}, 70%, 55%)`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 28, fontWeight: 800, color: "white"
                }}>
                  {member.name[0]}
                </div>
                <h3 style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{member.name}</h3>
                <div style={{ color: "var(--primary)", fontSize: 13, fontWeight: 600, marginBottom: 10 }}>{member.role}</div>
                <p style={{ color: "var(--text-muted)", fontSize: 13, lineHeight: 1.6 }}>{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Awards */}
      <section style={{ padding: "60px 0", background: "var(--primary)" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <Award size={40} color="white" style={{ margin: "0 auto 20px" }} />
          <h2 style={{ fontSize: 28, fontWeight: 800, color: "white", marginBottom: 12 }}>Recognized by the Industry</h2>
          <p style={{ color: "rgba(255,255,255,0.85)", marginBottom: 36, fontSize: 16 }}>
            Named "Best Job Platform 2025" by TechCircle India and "Top HR-Tech Startup" by Inc42.
          </p>
          <Link href="/contact" className="btn btn-white" style={{ textDecoration: "none" }}>
            Partner with Us
          </Link>
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          div[style*="grid-template-columns: 1fr 1fr"] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
