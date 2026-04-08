import { CONFIG } from "@/config";

const SESSION_KEY = "nexhire_admin_session";
const SESSION_TIMEOUT = CONFIG.SESSION_TIMEOUT_MS;

interface Session {
  username: string;
  loginTime: number;
}

export const auth = {
  login(username: string, password: string): boolean {
    if (username === CONFIG.ADMIN_USERNAME && password === CONFIG.ADMIN_PASSWORD) {
      const session: Session = {
        username,
        loginTime: Date.now(),
      };
      sessionStorage.setItem(SESSION_KEY, JSON.stringify(session));
      return true;
    }
    return false;
  },

  logout() {
    sessionStorage.removeItem(SESSION_KEY);
  },

  isAuthenticated(): boolean {
    try {
      const raw = sessionStorage.getItem(SESSION_KEY);
      if (!raw) return false;
      const session: Session = JSON.parse(raw);
      if (Date.now() - session.loginTime > SESSION_TIMEOUT) {
        sessionStorage.removeItem(SESSION_KEY);
        return false;
      }
      return true;
    } catch {
      return false;
    }
  },

  getUsername(): string | null {
    try {
      const raw = sessionStorage.getItem(SESSION_KEY);
      if (!raw) return null;
      const session: Session = JSON.parse(raw);
      return session.username;
    } catch {
      return null;
    }
  },
};
