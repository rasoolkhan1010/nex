import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Briefcase } from "lucide-react";
import { getWhiteLabelConfig } from "@/config";
import nex from "../images/nex.jpeg"
const navLinks = [
  { label: "Home", href: "/" },
  { label: "Jobs", href: "/jobs" },
  { label: "News", href: "/news" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [location] = useLocation();
  const config = getWhiteLabelConfig();

  return (
    <nav
      style={{
        background: "white",
        borderBottom: "1px solid #e2e8f0",
        position: "sticky",
        top: 0,
        zIndex: 100,
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
      }}
    >
       <div
        className="container"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          height: 64,
        }}
      > 
        {/* /* { <Link href="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
          <div style={{ width: 36, height: 36, background: "var(--primary)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Briefcase size={20} color="white" />
          </div>
          <span style={{ fontSize: 22, fontWeight: 800, color: "var(--primary)", letterSpacing: "-0.5px" }}>
            {config.COMPANY_NAME}
          </span>
        </Link> } */}
        <img
          src={nex}
          alt="logo"
          style={{ width:180, height: 40 }}
        />

        <div
          style={{ display: "flex", alignItems: "center", gap: 4 }}
          className="nav-desktop"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                padding: "8px 14px",
                borderRadius: 8,
                fontSize: 14,
                fontWeight: 600,
                color:
                  location === link.href
                    ? "var(--primary)"
                    : "var(--text-muted)",
                background:
                  location === link.href
                    ? "var(--primary-light)"
                    : "transparent",
                transition: "all 0.15s",
                textDecoration: "none",
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
          <Link
            href="/login"
            className="btn btn-outline btn-sm"
            style={{ textDecoration: "none" }}
          >
            Login
          </Link>
          <Link
            href="/register"
            className="btn btn-primary btn-sm"
            style={{ textDecoration: "none" }}
          >
            Sign Up
          </Link>
          <button
            onClick={() => setOpen(!open)}
            style={{
              background: "none",
              border: "none",
              display: "none",
              padding: 6,
            }}
            className="nav-hamburger"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div
          style={{
            background: "white",
            borderTop: "1px solid var(--border)",
            padding: "12px 20px",
          }}
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              style={{
                display: "block",
                padding: "10px 0",
                fontSize: 15,
                fontWeight: 600,
                color:
                  location === link.href ? "var(--primary)" : "var(--text)",
                borderBottom: "1px solid var(--border)",
                textDecoration: "none",
              }}
            >
              {link.label}
            </Link>
          ))}
          <div style={{ display: "flex", gap: 10, marginTop: 12 }}>
            <Link href="/login" className="btn btn-outline btn-sm">
              Login
            </Link>
            <Link href="/register" className="btn btn-primary btn-sm">
              Sign Up
            </Link>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: flex !important; }
        }
      `}</style>
    </nav>
  );
}
