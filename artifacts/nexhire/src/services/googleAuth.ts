export interface GoogleUser {
  name: string;
  email: string;
  picture: string;
  sub: string;
}

const USER_KEY = "nexhire_user";

function decodeJWT(token: string): GoogleUser | null {
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(c => "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2))
        .join("")
    );
    return JSON.parse(jsonPayload) as GoogleUser;
  } catch {
    return null;
  }
}

export const googleAuth = {
  isConfigured(): boolean {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    return !!(clientId && clientId !== "YOUR_GOOGLE_OAUTH_CLIENT_ID.apps.googleusercontent.com");
  },

  getUser(): GoogleUser | null {
    try {
      const raw = localStorage.getItem(USER_KEY);
      if (!raw) return null;
      return JSON.parse(raw) as GoogleUser;
    } catch {
      return null;
    }
  },

  saveUser(user: GoogleUser) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  saveUserFromForm(name: string, email: string, phone?: string) {
    const user = { name, email, picture: "", sub: email, phone };
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  },

  logout() {
    localStorage.removeItem(USER_KEY);
    if ((window as unknown as Record<string, unknown>).google) {
      try {
        (window as unknown as { google: { accounts: { id: { disableAutoSelect: () => void } } } }).google.accounts.id.disableAutoSelect();
      } catch {}
    }
  },

  handleCredentialResponse(credential: string): GoogleUser | null {
    const user = decodeJWT(credential);
    if (user) {
      this.saveUser(user);
    }
    return user;
  },

  initSignIn(callback: (user: GoogleUser) => void) {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    if (!clientId || clientId === "YOUR_GOOGLE_OAUTH_CLIENT_ID.apps.googleusercontent.com") {
      console.warn("Google Client ID not configured. Add VITE_GOOGLE_CLIENT_ID to .env");
      return;
    }

    const tryInit = () => {
      const g = (window as unknown as { google?: { accounts: { id: { initialize: (opts: unknown) => void; renderButton: (el: HTMLElement, opts: unknown) => void; prompt: () => void } } } }).google;
      if (g?.accounts) {
        g.accounts.id.initialize({
          client_id: clientId,
          callback: (response: { credential: string }) => {
            const user = googleAuth.handleCredentialResponse(response.credential);
            if (user) callback(user);
          },
          auto_select: false,
          cancel_on_tap_outside: true,
        });
      }
    };

    if ((window as unknown as { google?: unknown }).google) {
      tryInit();
    } else {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = tryInit;
      document.head.appendChild(script);
    }
  },

  renderButton(containerId: string, callback: (user: GoogleUser) => void) {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    if (!clientId || clientId === "YOUR_GOOGLE_OAUTH_CLIENT_ID.apps.googleusercontent.com") {
      return;
    }

    const tryRender = () => {
      const el = document.getElementById(containerId);
      const g = (window as unknown as { google?: { accounts: { id: { initialize: (opts: unknown) => void; renderButton: (el: HTMLElement, opts: unknown) => void } } } }).google;
      if (el && g?.accounts) {
        g.accounts.id.initialize({
          client_id: clientId,
          callback: (response: { credential: string }) => {
            const user = googleAuth.handleCredentialResponse(response.credential);
            if (user) callback(user);
          },
        });
        g.accounts.id.renderButton(el, {
          theme: "outline",
          size: "large",
          width: el.offsetWidth || 400,
          text: "signin_with",
        });
      }
    };

    if ((window as unknown as { google?: unknown }).google) {
      setTimeout(tryRender, 100);
    } else {
      const existing = document.querySelector('script[src="https://accounts.google.com/gsi/client"]');
      if (!existing) {
        const script = document.createElement("script");
        script.src = "https://accounts.google.com/gsi/client";
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
      }
      setTimeout(tryRender, 1500);
    }
  },
};
