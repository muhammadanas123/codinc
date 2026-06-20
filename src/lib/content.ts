/**
 * Type shapes for content sourced from messages/en.yml.
 * The actual copy lives in YAML, not here — see that file to edit text.
 */

export interface NavLink {
  label: string;
  href: string;
}

export interface Service {
  num: string;
  title: string;
  description: string;
  tags: string[];
}

export interface CaseStudy {
  slug: string;
  label: string;
  title: string;
  description: string;
  /** External project URL. */
  url: string;
  /** Visual gradient variant key (v1–v5). */
  visual: "v1" | "v2" | "v3" | "v4" | "v5";
}

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

export interface Stat {
  value: string;
  label: string;
}
