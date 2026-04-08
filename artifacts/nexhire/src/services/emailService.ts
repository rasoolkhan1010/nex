import emailjs from "@emailjs/browser";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || "service_nexhire";
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || "";
const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL || "rasoolkhan990880@gmail.com";

const TEMPLATES = {
  apply: import.meta.env.VITE_EMAILJS_TEMPLATE_APPLY || "template_apply",
  contact: import.meta.env.VITE_EMAILJS_TEMPLATE_CONTACT || "template_contact",
  newsletter: import.meta.env.VITE_EMAILJS_TEMPLATE_NEWSLETTER || "template_newsletter",
  register: import.meta.env.VITE_EMAILJS_TEMPLATE_REGISTER || "template_register",
};

function init() {
  if (PUBLIC_KEY) {
    emailjs.init({ publicKey: PUBLIC_KEY });
  }
}
init();

async function send(templateId: string, params: Record<string, string>): Promise<boolean> {
  if (!PUBLIC_KEY) {
    console.warn("EmailJS not configured. Set VITE_EMAILJS_PUBLIC_KEY in .env");
    return false;
  }
  try {
    await emailjs.send(SERVICE_ID, templateId, { ...params, to_email: ADMIN_EMAIL });
    return true;
  } catch (err) {
    console.error("EmailJS error:", err);
    return false;
  }
}

export const emailService = {
  async notifyApplication(data: {
    applicantName: string;
    applicantEmail: string;
    applicantPhone: string;
    jobTitle: string;
    company: string;
    resumeFile?: string;
    coverLetter?: string;
  }) {
    return send(TEMPLATES.apply, {
      subject: `New Application: ${data.jobTitle} at ${data.company}`,
      applicant_name: data.applicantName,
      applicant_email: data.applicantEmail,
      applicant_phone: data.applicantPhone,
      job_title: data.jobTitle,
      company: data.company,
      resume_file: data.resumeFile || "Not provided",
      cover_letter: data.coverLetter || "Not provided",
      submitted_at: new Date().toLocaleString("en-IN"),
    });
  },

  async notifyContact(data: {
    name: string;
    email: string;
    subject: string;
    message: string;
  }) {
    return send(TEMPLATES.contact, {
      subject: `Contact Form: ${data.subject || "General Inquiry"}`,
      from_name: data.name,
      from_email: data.email,
      contact_subject: data.subject,
      message: data.message,
      submitted_at: new Date().toLocaleString("en-IN"),
    });
  },

  async notifyNewsletter(subscriberEmail: string) {
    return send(TEMPLATES.newsletter, {
      subject: "New Newsletter Subscriber",
      subscriber_email: subscriberEmail,
      subscribed_at: new Date().toLocaleString("en-IN"),
    });
  },

  async notifyRegistration(data: {
    name: string;
    email: string;
    phone?: string;
    source: string;
  }) {
    return send(TEMPLATES.register, {
      subject: `New User Registered via ${data.source}`,
      user_name: data.name,
      user_email: data.email,
      user_phone: data.phone || "Not provided",
      source: data.source,
      registered_at: new Date().toLocaleString("en-IN"),
    });
  },
};

export const ADMIN_EMAIL_ADDR = ADMIN_EMAIL;
