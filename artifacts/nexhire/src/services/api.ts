import { CONFIG } from "@/config";

const SHEET_API = CONFIG.SHEET_API;

export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  salary: string;
  description: string;
  requirements: string;
  category: string;
  postedDate: string;
  status: string;
}

export interface NewsItem {
  id: string;
  title: string;
  description: string;
  date: string;
  category: string;
  image: string;
  status: string;
}

export interface Application {
  name: string;
  email: string;
  phone: string;
  jobRole: string;
  jobId: string;
  coverLetter: string;
  linkedIn: string;
  resumeUrl: string;
  appliedDate: string;
}

export interface UserProfile {
  name: string;
  email: string;
  skills: string;
  experience: string;
  preferredRole: string;
  location: string;
  submittedDate: string;
}

async function sheetsRequest(action: string, data?: Record<string, unknown>) {
  const url = new URL(SHEET_API);
  url.searchParams.set("action", action);
  if (data) {
    url.searchParams.set("data", JSON.stringify(data));
  }
  const response = await fetch(url.toString(), { method: "GET" });
  if (!response.ok) {
    throw new Error(`API request failed: ${response.statusText}`);
  }
  return response.json();
}

async function sheetsPost(action: string, data: Record<string, unknown>) {
  const response = await fetch(SHEET_API, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ action, ...data }),
    mode: "no-cors",
  });
  return { success: true };
}

export const api = {
  async getJobs(): Promise<Job[]> {
    try {
      const res = await sheetsRequest("getJobs");
      return res.data || res || [];
    } catch {
      return SAMPLE_JOBS;
    }
  },

  async addJob(job: Omit<Job, "id">): Promise<{ success: boolean }> {
    try {
      await sheetsPost("addJob", job as Record<string, unknown>);
      return { success: true };
    } catch {
      return { success: false };
    }
  },

  async deleteJob(id: string): Promise<{ success: boolean }> {
    try {
      await sheetsPost("deleteJob", { id });
      return { success: true };
    } catch {
      return { success: false };
    }
  },

  async getNews(): Promise<NewsItem[]> {
    try {
      const res = await sheetsRequest("getNews");
      return res.data || res || [];
    } catch {
      return SAMPLE_NEWS;
    }
  },

  async addNews(news: Omit<NewsItem, "id">): Promise<{ success: boolean }> {
    try {
      await sheetsPost("addNews", news as Record<string, unknown>);
      return { success: true };
    } catch {
      return { success: false };
    }
  },

  async deleteNews(id: string): Promise<{ success: boolean }> {
    try {
      await sheetsPost("deleteNews", { id });
      return { success: true };
    } catch {
      return { success: false };
    }
  },

  async submitApplication(app: Application): Promise<{ success: boolean }> {
    try {
      await sheetsPost("addApplication", app as unknown as Record<string, unknown>);
      return { success: true };
    } catch {
      return { success: false };
    }
  },

  async saveProfile(profile: UserProfile): Promise<{ success: boolean }> {
    try {
      await sheetsPost("addUser", profile as unknown as Record<string, unknown>);
      return { success: true };
    } catch {
      return { success: false };
    }
  },

  async getApplications(): Promise<Application[]> {
    try {
      const res = await sheetsRequest("getApplications");
      return res.data || res || [];
    } catch {
      return [];
    }
  },
};

export const SAMPLE_JOBS: Job[] = [
  {
    id: "1",
    title: "Senior Software Engineer",
    company: "TechCorp India",
    location: "Bangalore, Karnataka",
    type: "Full-time",
    salary: "₹18-25 LPA",
    description: "Join our fast-growing engineering team. Work on cutting-edge products serving millions of users.",
    requirements: "5+ years React, Node.js, AWS",
    category: "Engineering",
    postedDate: "2026-04-01",
    status: "active",
  },
  {
    id: "2",
    title: "Product Manager",
    company: "StartupHub",
    location: "Mumbai, Maharashtra",
    type: "Full-time",
    salary: "₹20-30 LPA",
    description: "Drive product strategy and vision for our B2B SaaS platform.",
    requirements: "3+ years PM experience, B2B SaaS background",
    category: "Product",
    postedDate: "2026-04-02",
    status: "active",
  },
  {
    id: "3",
    title: "UX Designer",
    company: "DesignFirst",
    location: "Remote",
    type: "Full-time",
    salary: "₹12-18 LPA",
    description: "Create beautiful, user-centered experiences for our consumer apps.",
    requirements: "Figma, user research, prototyping",
    category: "Design",
    postedDate: "2026-04-01",
    status: "active",
  },
  {
    id: "4",
    title: "Data Scientist",
    company: "AnalyticsAI",
    location: "Hyderabad, Telangana",
    type: "Full-time",
    salary: "₹15-22 LPA",
    description: "Build machine learning models for our financial analytics platform.",
    requirements: "Python, ML, SQL, 3+ years experience",
    category: "Data",
    postedDate: "2026-04-03",
    status: "active",
  },
  {
    id: "5",
    title: "Marketing Manager",
    company: "GrowthLabs",
    location: "Delhi, NCR",
    type: "Full-time",
    salary: "₹10-15 LPA",
    description: "Lead our digital marketing strategy and grow our online presence.",
    requirements: "Digital marketing, SEO, performance marketing",
    category: "Marketing",
    postedDate: "2026-03-30",
    status: "active",
  },
  {
    id: "6",
    title: "DevOps Engineer",
    company: "CloudSystems",
    location: "Pune, Maharashtra",
    type: "Full-time",
    salary: "₹14-20 LPA",
    description: "Manage our cloud infrastructure and CI/CD pipelines.",
    requirements: "Kubernetes, AWS, Terraform, Docker",
    category: "Engineering",
    postedDate: "2026-04-02",
    status: "active",
  },
  {
    id: "7",
    title: "Frontend Developer",
    company: "WebWorks",
    location: "Chennai, Tamil Nadu",
    type: "Contract",
    salary: "₹8-14 LPA",
    description: "Build responsive web applications using modern frontend stack.",
    requirements: "React, TypeScript, TailwindCSS",
    category: "Engineering",
    postedDate: "2026-04-01",
    status: "active",
  },
  {
    id: "8",
    title: "HR Manager",
    company: "PeopleFirst",
    location: "Bangalore, Karnataka",
    type: "Full-time",
    salary: "₹9-14 LPA",
    description: "Build and manage a great team culture at our fast-growing startup.",
    requirements: "HR management, recruitment, culture building",
    category: "HR",
    postedDate: "2026-03-28",
    status: "active",
  },
  {
    id: "9",
    title: "UI/UX Designer",
    company: "CreativeStudio",
    location: "Mumbai, Maharashtra",
    type: "Full-time",
    salary: "₹11-16 LPA",
    description: "Design beautiful and intuitive user interfaces for web and mobile apps.",
    requirements: "Figma, UI/UX principles, prototyping, user research",
    category: "Design",
    postedDate: "2026-04-02",
    status: "active",
  },
  {
    id: "10",
    title: "Graphic Designer",
    company: "BrandWorks",
    location: "Delhi, NCR",
    type: "Full-time",
    salary: "₹8-12 LPA",
    description: "Create compelling visual content for digital and print media.",
    requirements: "Adobe Creative Suite, design principles, attention to detail",
    category: "Design",
    postedDate: "2026-04-01",
    status: "active",
  },
  {
    id: "11",
    title: "Product Manager - B2B",
    company: "EnterpriseTech",
    location: "Bangalore, Karnataka",
    type: "Full-time",
    salary: "₹25-35 LPA",
    description: "Lead B2B product strategy and development for our enterprise platform.",
    requirements: "5+ years PM experience, B2B SaaS, data-driven mindset",
    category: "Product",
    postedDate: "2026-04-02",
    status: "active",
  },
  {
    id: "12",
    title: "Associate Product Manager",
    company: "StartupLabs",
    location: "Remote",
    type: "Full-time",
    salary: "₹12-18 LPA",
    description: "Support product strategy and work on new features.",
    requirements: "Analytical skills, product sense, communication",
    category: "Product",
    postedDate: "2026-03-31",
    status: "active",
  },
  {
    id: "13",
    title: "Digital Marketing Manager",
    company: "DigitalGrowth",
    location: "Bangalore, Karnataka",
    type: "Full-time",
    salary: "₹12-18 LPA",
    description: "Manage digital marketing campaigns across multiple channels.",
    requirements: "Digital marketing, Google Ads, social media, analytics",
    category: "Marketing",
    postedDate: "2026-04-02",
    status: "active",
  },
  {
    id: "14",
    title: "Content Marketer",
    company: "ContentHub",
    location: "Remote",
    type: "Full-time",
    salary: "₹8-12 LPA",
    description: "Create engaging content for our audience across platforms.",
    requirements: "Content writing, SEO, blogging, social media",
    category: "Marketing",
    postedDate: "2026-04-01",
    status: "active",
  },
  {
    id: "15",
    title: "Machine Learning Engineer",
    company: "AILabs",
    location: "Hyderabad, Telangana",
    type: "Full-time",
    salary: "₹20-28 LPA",
    description: "Build and deploy machine learning models for real-world applications.",
    requirements: "Python, TensorFlow, PyTorch, MLOps, statistics",
    category: "Data",
    postedDate: "2026-04-02",
    status: "active",
  },
  {
    id: "16",
    title: "Data Analyst",
    company: "DataInsights",
    location: "Mumbai, Maharashtra",
    type: "Full-time",
    salary: "₹10-15 LPA",
    description: "Analyze data and provide insights to drive business decisions.",
    requirements: "SQL, Python, Tableau, analytical mindset",
    category: "Data",
    postedDate: "2026-04-01",
    status: "active",
  },
  {
    id: "17",
    title: "Financial Analyst",
    company: "FinCorp",
    location: "Mumbai, Maharashtra",
    type: "Full-time",
    salary: "₹12-18 LPA",
    description: "Analyze financial data and provide strategic recommendations.",
    requirements: "Financial analysis, Excel, accounting knowledge, attention to detail",
    category: "Finance",
    postedDate: "2026-04-02",
    status: "active",
  },
  {
    id: "18",
    title: "Accountant",
    company: "AccountPlus",
    location: "Delhi, NCR",
    type: "Full-time",
    salary: "₹8-12 LPA",
    description: "Manage accounting operations and prepare financial statements.",
    requirements: "Accounting, GST, Tally, taxation",
    category: "Finance",
    postedDate: "2026-03-30",
    status: "active",
  },
  {
    id: "19",
    title: "Sales Executive",
    company: "SalesForce",
    location: "Bangalore, Karnataka",
    type: "Full-time",
    salary: "₹6-10 LPA",
    description: "Drive sales growth and build client relationships.",
    requirements: "Sales experience, negotiation, CRM, communication",
    category: "Sales",
    postedDate: "2026-04-02",
    status: "active",
  },
  {
    id: "20",
    title: "Business Development Manager",
    company: "GrowthPartners",
    location: "Remote",
    type: "Full-time",
    salary: "₹13-20 LPA",
    description: "Identify and develop new business opportunities.",
    requirements: "Business development, strategic thinking, negotiation, networking",
    category: "Sales",
    postedDate: "2026-04-01",
    status: "active",
  },
  {
    id: "21",
    title: "Mobile App Developer",
    company: "AppWorks",
    location: "Bangalore, Karnataka",
    type: "Full-time",
    salary: "₹15-22 LPA",
    description: "Develop high-quality iOS and Android applications.",
    requirements: "React Native, Swift, Kotlin, mobile development",
    category: "Engineering",
    postedDate: "2026-04-02",
    status: "active",
  },
  {
    id: "22",
    title: "Full Stack Developer",
    company: "TechStack",
    location: "Remote",
    type: "Full-time",
    salary: "₹16-24 LPA",
    description: "Build scalable web applications with modern tech stack.",
    requirements: "React, Node.js, TypeScript, databases, cloud",
    category: "Engineering",
    postedDate: "2026-04-01",
    status: "active",
  },
  {
    id: "23",
    title: "Backend Engineer",
    company: "APICore",
    location: "Hyderabad, Telangana",
    type: "Full-time",
    salary: "₹14-20 LPA",
    description: "Build robust and scalable backend systems.",
    requirements: "Java, Python, SQL, microservices, Docker",
    category: "Engineering",
    postedDate: "2026-03-30",
    status: "active",
  },
  {
    id: "24",
    title: "Product Designer",
    company: "DesignHub",
    location: "Bangalore, Karnataka",
    type: "Full-time",
    salary: "₹13-19 LPA",
    description: "Design products that users love.",
    requirements: "Figma, design thinking, prototyping, user research",
    category: "Design",
    postedDate: "2026-04-02",
    status: "active",
  },
];

export const SAMPLE_NEWS: NewsItem[] = [
  {
    id: "1",
    title: "NexHire Partners with 500+ Companies Across India",
    description: "NexHire has expanded its employer network to over 500 companies, creating thousands of new job opportunities for skilled professionals across major Indian cities.",
    date: "2026-04-03",
    category: "Company News",
    image: "",
    status: "published",
  },
  {
    id: "2",
    title: "AI-Powered Job Matching Now Available",
    description: "Our new AI-powered job matching feature analyzes your skills, experience, and preferences to surface the most relevant opportunities — saving you hours of searching.",
    date: "2026-04-01",
    category: "Product Update",
    image: "",
    status: "published",
  },
  {
    id: "3",
    title: "Tech Hiring Surges 40% in Q1 2026",
    description: "According to latest data, technology sector hiring in India has surged 40% in Q1 2026, with software engineering, AI/ML, and product management leading demand.",
    date: "2026-03-28",
    category: "Industry News",
    image: "",
    status: "published",
  },
  {
    id: "4",
    title: "Remote Work Opportunities Reach All-Time High",
    description: "Over 35% of jobs listed on NexHire now offer remote or hybrid options, reflecting a permanent shift in how Indian companies approach work flexibility.",
    date: "2026-03-25",
    category: "Trends",
    image: "",
    status: "published",
  },
];
