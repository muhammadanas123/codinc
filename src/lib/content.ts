/**
 * Central content for the marketing site.
 * Swap these for real copy/projects without touching component markup.
 */

export const siteConfig = {
  name: "Codinc",
  email: "hello@codinc.co",
  location: "Lahore, PK",
  tagline: "software, shipped",
} as const;

export const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
] as const;

export const industries = [
  "Fintech",
  "Health",
  "Logistics",
  "E\u2011commerce",
  "SaaS",
] as const;

export interface Service {
  num: string;
  title: string;
  description: string;
  tags: string[];
}

export const services: Service[] = [
  {
    num: "01",
    title: "Web & mobile apps",
    description:
      "Custom applications built to last \u2014 from internal tools to customer\u2011facing products, on the web and on phones.",
    tags: ["React", "Next.js", "React Native"],
  },
  {
    num: "02",
    title: "Cloud & DevOps",
    description:
      "We set up the infrastructure, pipelines, and monitoring so your software ships often and stays up.",
    tags: ["AWS", "Docker", "CI/CD"],
  },
  {
    num: "03",
    title: "AI integration",
    description:
      "Practical AI woven into real products \u2014 search, assistants, and automation that earn their place.",
    tags: ["LLMs", "RAG", "Automation"],
  },
];

export interface CaseStudy {
  slug: string;
  label: string;
  title: string;
  description: string;
  /** Visual gradient variant key (v1\u2013v5). */
  visual: "v1" | "v2" | "v3" | "v4" | "v5";
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "dashboard.codinc",
    label: "Fintech \u00b7 Web app",
    title: "Payments dashboard",
    description:
      "A real\u2011time payments console processing thousands of daily transactions, rebuilt for speed and clarity.",
    visual: "v1",
  },
  {
    slug: "fleet.codinc",
    label: "Logistics \u00b7 Mobile",
    title: "Fleet tracking app",
    description:
      "An offline\u2011first driver app with live routing, used across a national delivery network.",
    visual: "v2",
  },
  {
    slug: "care.codinc",
    label: "Health \u00b7 Platform",
    title: "Patient portal",
    description:
      "A secure portal connecting clinics and patients, designed around privacy and accessibility.",
    visual: "v3",
  },
  {
    slug: "shop.codinc",
    label: "E\u2011commerce \u00b7 AI",
    title: "Smart storefront",
    description:
      "An AI\u2011assisted product search that lifted conversion by surfacing the right items faster.",
    visual: "v4",
  },
  {
    slug: "ops.codinc",
    label: "SaaS \u00b7 Internal tools",
    title: "Operations console",
    description:
      "A custom admin platform that replaced five spreadsheets and a pile of manual steps.",
    visual: "v5",
  },
];

export interface Stat {
  value: string;
  label: string;
}

export const stats: Stat[] = [
  { value: "40+", label: "products shipped" },
  { value: "8 yrs", label: "avg. engineer experience" },
  { value: "100%", label: "code ownership to you" },
  { value: "<24h", label: "response time" },
];
