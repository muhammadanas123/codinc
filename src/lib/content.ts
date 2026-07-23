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
  /** Filter category — must match an entry in `caseStudies.categories`. */
  category: string;
  label: string;
  title: string;
  /** Country where the project is based. */
  country: string;
  description: string;
  /** External project URL. */
  url: string;
  /** Visual gradient variant key (v1–v5). */
  visual: "v1" | "v2" | "v3" | "v4" | "v5";
  challenge: string;
  solution: string;
  result: string;
  /** Short outcome metrics — illustrative until confirmed. */
  metrics: string[];
  tech: string[];
}

export interface ProcessStep {
  num: string;
  title: string;
  description: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  rating: number;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface Stat {
  value: string;
  label: string;
}

/** Social profile URLs from `site.social`. */
export interface Social {
  linkedin: string;
  github: string;
  instagram: string;
  x: string;
}
