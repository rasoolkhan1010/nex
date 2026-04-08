import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";
import { getWhiteLabelConfig } from "@/config";

interface Message {
  id: number;
  from: "bot" | "user";
  text: string;
}

const QA: { patterns: string[]; response: string }[] = [
  {
    patterns: ["hello", "hi", "hey", "good morning", "good evening"],
    response: "Hello! Welcome to NexHire. I'm here to help you find your perfect job. How can I assist you today?",
  },
  {
    patterns: ["jobs", "openings", "vacancies", "positions", "opportunities"],
    response: "We have hundreds of job openings across engineering, design, product, marketing, and more! Visit our Jobs page to browse and filter by location, type, and salary.",
  },
  {
    patterns: ["apply", "application", "how to apply"],
    response: "Applying is simple! Browse jobs on our Jobs page, click 'Apply Now' on any listing, fill in your details and upload your resume. The employer will contact you directly.",
  },
  {
    patterns: ["resume", "cv", "upload"],
    response: "You can upload your resume directly on the job application form. We accept PDF and DOC formats. Make sure to tailor it to each role for the best results!",
  },
  {
    patterns: ["salary", "pay", "compensation", "ctc"],
    response: "Salary ranges are listed on each job card. You can also filter jobs by salary range on the Jobs page. Remember, all figures are indicative and final compensation is discussed with the employer.",
  },
  {
    patterns: ["remote", "work from home", "wfh"],
    response: "We have many remote and hybrid opportunities! Filter jobs by 'Remote' type on the Jobs page to see all work-from-home positions.",
  },
  {
    patterns: ["register", "sign up", "account", "create account"],
    response: "Creating an account is free! Click 'Sign Up' in the top navigation or visit /register. This lets you track applications and save jobs.",
  },
  {
    patterns: ["login", "sign in", "log in"],
    response: "You can log in at /login. If you're new, head to /register to create a free account.",
  },
  {
    patterns: ["contact", "reach", "email", "phone"],
    response: `You can reach us at ${getWhiteLabelConfig().EMAIL} or call ${getWhiteLabelConfig().PHONE}. We typically respond within 24 hours.`,
  },
  {
    patterns: ["profile", "career", "builder", "skills"],
    response: "Our Career Profile Builder helps match you with the best jobs! Visit /profile to add your skills, experience, and preferences. We'll suggest the most relevant openings.",
  },
  {
    patterns: ["news", "updates", "latest"],
    response: "Stay updated with the latest hiring trends and company news on our News page at /news. We post new articles and industry insights regularly.",
  },
  {
    patterns: ["admin", "post job", "employer", "hire"],
    response: "Are you an employer looking to post jobs? Please contact us at the email above. Our admin panel allows you to manage job listings and view applications.",
  },
  {
    patterns: ["bangalore", "mumbai", "delhi", "hyderabad", "pune", "chennai"],
    response: "We have jobs across all major Indian cities! Use the location filter on the Jobs page to find openings near you.",
  },
  {
    patterns: ["thank", "thanks", "great", "awesome"],
    response: "You're welcome! Is there anything else I can help you with? Explore our jobs at /jobs or build your career profile at /profile.",
  },
  {
    patterns: ["bye", "goodbye", "see you"],
    response: "Goodbye! Best of luck with your job search. Remember, NexHire is here whenever you need us!",
  },
];

function getResponse(input: string): string {
  const lower = input.toLowerCase();
  for (const qa of QA) {
    if (qa.patterns.some(p => lower.includes(p))) {
      return qa.response;
    }
  }
  return `I'm not sure about that, but I'm here to help! For detailed queries, reach us at ${getWhiteLabelConfig().EMAIL} or ${getWhiteLabelConfig().PHONE}. You can also browse our Jobs page or Career Profile Builder for more help!`;
}

let msgId = 0;

export default function ChatBot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: ++msgId, from: "bot", text: "Hi! I'm NexBot, your career assistant. Ask me anything about jobs, applications, or how NexHire works!" },
  ]);
  const [input, setInput] = useState("");
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function send() {
    if (!input.trim()) return;
    const userMsg: Message = { id: ++msgId, from: "user", text: input.trim() };
    const botMsg: Message = { id: ++msgId, from: "bot", text: getResponse(input.trim()) };
    setMessages(prev => [...prev, userMsg, botMsg]);
    setInput("");
  }

  return (
    <>
      <button
        onClick={() => setOpen(!open)}
        style={{
          position: "fixed",
          bottom: 28,
          right: 28,
          width: 56,
          height: 56,
          borderRadius: "50%",
          background: "var(--primary)",
          color: "white",
          border: "none",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 20px rgba(10,102,194,0.4)",
          zIndex: 500,
          cursor: "pointer",
          transition: "all 0.2s",
        }}
        onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.1)")}
        onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
      >
        {open ? <X size={22} /> : <MessageCircle size={22} />}
      </button>

      {open && (
        <div style={{
          position: "fixed",
          bottom: 96,
          right: 28,
          width: 360,
          height: 480,
          background: "white",
          borderRadius: 16,
          boxShadow: "0 20px 60px rgba(0,0,0,0.2)",
          zIndex: 500,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}>
          <div style={{ background: "var(--primary)", padding: "16px 20px", display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{ width: 36, height: 36, borderRadius: "50%", background: "rgba(255,255,255,0.2)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <Bot size={20} color="white" />
            </div>
            <div>
              <div style={{ color: "white", fontWeight: 700, fontSize: 15 }}>NexBot</div>
              <div style={{ color: "rgba(255,255,255,0.7)", fontSize: 12 }}>Career Assistant • Online</div>
            </div>
          </div>

          <div style={{ flex: 1, overflowY: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 12 }}>
            {messages.map(msg => (
              <div key={msg.id} style={{ display: "flex", gap: 8, justifyContent: msg.from === "user" ? "flex-end" : "flex-start" }}>
                {msg.from === "bot" && (
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: "var(--primary-light)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                    <Bot size={14} color="var(--primary)" />
                  </div>
                )}
                <div style={{
                  maxWidth: "75%",
                  padding: "10px 14px",
                  borderRadius: msg.from === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                  background: msg.from === "user" ? "var(--primary)" : "#f1f5f9",
                  color: msg.from === "user" ? "white" : "var(--text)",
                  fontSize: 13,
                  lineHeight: 1.5,
                }}>
                  {msg.text}
                </div>
                {msg.from === "user" && (
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#e2e8f0", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 2 }}>
                    <User size={14} color="var(--text-muted)" />
                  </div>
                )}
              </div>
            ))}
            <div ref={endRef} />
          </div>

          <div style={{ padding: "12px 16px", borderTop: "1px solid var(--border)", display: "flex", gap: 8 }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && send()}
              placeholder="Ask me anything..."
              style={{ flex: 1, padding: "8px 12px", border: "1.5px solid var(--border)", borderRadius: 8, fontSize: 13, outline: "none" }}
            />
            <button
              onClick={send}
              disabled={!input.trim()}
              style={{ background: "var(--primary)", color: "white", border: "none", borderRadius: 8, padding: "8px 12px", cursor: "pointer", display: "flex", alignItems: "center", opacity: input.trim() ? 1 : 0.5 }}
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 480px) {
          div[style*="bottom: 96px"] {
            right: 10px !important;
            width: calc(100vw - 20px) !important;
          }
        }
      `}</style>
    </>
  );
}
