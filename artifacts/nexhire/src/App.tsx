import { useEffect } from "react";
import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";
import Home from "@/pages/Home";
import Jobs from "@/pages/Jobs";
import News from "@/pages/News";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Profile from "@/pages/Profile";
import Admin from "@/pages/Admin";
import ControlPanel from "@/pages/ControlPanel";

function ScrollToTop() {
  const [location] = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location]);
  return null;
}

function NotFound() {
  return (
    <div style={{ minHeight: "50vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16, textAlign: "center", padding: 40 }}>
      <div style={{ fontSize: 80, fontWeight: 900, color: "var(--primary)" }}>404</div>
      <h1 style={{ fontSize: 28, fontWeight: 800 }}>Page Not Found</h1>
      <p style={{ color: "#5e5e7a" }}>The page you're looking for doesn't exist.</p>
      <a href="/" className="btn btn-primary">Back to Home</a>
    </div>
  );
}

const HIDE_FOOTER = ["/secure-admin", "/control-panel", "/login", "/register"];

function AppShell() {
  const [location] = useLocation();
  const hideFooter = HIDE_FOOTER.some(r => location.startsWith(r));

  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <ScrollToTop />
      <Navbar />
      <main style={{ flex: 1 }}>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/jobs" component={Jobs} />
          <Route path="/news" component={News} />
          <Route path="/about" component={About} />
          <Route path="/contact" component={Contact} />
          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/profile" component={Profile} />
          <Route path="/secure-admin" component={Admin} />
          <Route path="/control-panel" component={ControlPanel} />
          <Route component={NotFound} />
        </Switch>
      </main>
      {!hideFooter && <Footer />}
      <ChatBot />
    </div>
  );
}

export default function App() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL?.replace(/\/$/, "") || ""}>
      <AppShell />
    </WouterRouter>
  );
}
