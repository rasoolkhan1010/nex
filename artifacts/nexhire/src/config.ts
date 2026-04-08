export const CONFIG = {
  ADMIN_USERNAME: "admin",
  ADMIN_PASSWORD: "yourStrongPassword123",
  SHEET_API: "https://script.google.com/macros/s/AKfycbzANoJN52hf4LrHOCRQ6DZfB1qBhQaCqRliCWV3Km8dkXfvVEw6ayoGmvv5h1Fknuhnlw/exec",
  EMAIL: "contact@nexhire.io",
  PHONE: "+91 98765 43210",
  COMPANY_NAME: "NexHire",
  TAGLINE: "Find Your Next Opportunity",
  LOGO: "/assets/logo.png",
  EMAILJS_SERVICE_ID: "service_nexhire",
  EMAILJS_TEMPLATE_ID: "template_apply",
  EMAILJS_PUBLIC_KEY: "YOUR_EMAILJS_PUBLIC_KEY",
  SOCIAL: {
    linkedin: "https://linkedin.com/company/nexhire",
    twitter: "https://twitter.com/nexhire",
    facebook: "https://facebook.com/nexhire",
    instagram: "https://instagram.com/nexhire",
  },
  SESSION_TIMEOUT_MS: 30 * 60 * 1000,
};

export const WHITE_LABEL_KEY = "nexhire_white_label";

export function getWhiteLabelConfig() {
  try {
    const stored = localStorage.getItem(WHITE_LABEL_KEY);
    if (stored) {
      return { ...CONFIG, ...JSON.parse(stored) };
    }
  } catch {}
  return CONFIG;
}

export function saveWhiteLabelConfig(updates: Partial<typeof CONFIG>) {
  const current = getWhiteLabelConfig();
  const merged = { ...current, ...updates };
  localStorage.setItem(WHITE_LABEL_KEY, JSON.stringify(merged));
  return merged;
}
