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
  /** External project URL. */
  url: string;
  /** Visual gradient variant key (v1\u2013v5). */
  visual: "v1" | "v2" | "v3" | "v4" | "v5";
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "purplecarrot.com",
    label: "Food \u00b7 E\u2011commerce",
    title: "Purple Carrot",
    description:
      "A plant\u2011based meal\u2011kit service \u2014 recipes, subscriptions, and a checkout flow tuned to keep weekly orders effortless.",
    url: "https://www.purplecarrot.com",
    visual: "v1",
  },
  {
    slug: "cocoli.com",
    label: "Retail \u00b7 Marketplace",
    title: "Cocoli",
    description:
      "A curated marketplace for premium furniture and design, connecting independent sellers with buyers across Europe.",
    url: "https://www.cocoli.com/en/de/",
    visual: "v2",
  },
  {
    slug: "colochousing.com",
    label: "PropTech \u00b7 Platform",
    title: "Colo Housing",
    description:
      "A modern co\u2011living and housing platform that streamlines listings, applications, and tenant management end to end.",
    url: "https://www.colochousing.com/",
    visual: "v3",
  },
  {
    slug: "crystalcommerce.com",
    label: "E\u2011commerce \u00b7 Platform",
    title: "Crystal Commerce",
    description:
      "Commerce infrastructure for specialty and hobby retailers, syncing inventory and orders across thousands of storefronts.",
    url: "https://www.crystalcommerce.com/",
    visual: "v4",
  },
];

export interface TeamMember {
  slug: string;
  name: string;
  role: string;
  /** Path under /public, e.g. "/team/anas-farooqi.svg". */
  avatar: string;
  yearsExperience: number;
  bio: string;
  skills: string[];
}

export const team: TeamMember[] = [
  {
    slug: "anas-farooqi",
    name: "Anas Farooqi",
    role: "Founder & CEO",
    avatar: "/team/anas-farooqi.svg",
    yearsExperience: 8,
    bio: "Anas founded Codinc to build software the way it should be built — small senior teams, real ownership, and a bias for shipping. He sets the technical direction and stays close to every engagement, making sure each project gets the attention it deserves. Clients keep coming back for the straight answers as much as the code.",
    skills: ["Product Strategy", "Architecture", "TypeScript", "Cloud", "Team Leadership"],
  },
  {
    slug: "bilal-farooqi",
    name: "Bilal Farooqi",
    role: "Co‑founder & COO",
    avatar: "/team/bilal-farooqi.svg",
    yearsExperience: 5,
    bio: "Bilal runs the operation behind the work — delivery, process, and the day‑to‑day that keeps projects on track. He turns ambitious roadmaps into predictable shipping schedules and is the person clients talk to when they need things to just happen. Calm under pressure, relentless about follow‑through.",
    skills: ["Operations", "Delivery", "Client Success", "Process", "Hiring"],
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
