"use client";

import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/content";

const fieldClasses =
  "w-full rounded-[11px] border border-line bg-panel-2 px-4 py-3 text-[15px] text-paper placeholder:text-mist-dim focus:border-peacock focus:outline-none focus-visible:ring-2 focus-visible:ring-ring";

/** Reads `#contact?member=NAME` from the URL hash, if present. */
function memberFromHash(): string {
  if (typeof window === "undefined") return "";
  const query = window.location.hash.split("?")[1];
  if (!query) return "";
  const member = new URLSearchParams(query).get("member");
  return member ? decodeURIComponent(member) : "";
}

/** Seed message text when a visitor arrives via a member's "Hire me" button. */
function hireMessage(member: string): string {
  return `Hi, I'd like to work with ${member} on `;
}

export function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // Pre-fill the name when arriving via a "Hire me" button or a deep link.
  // Hash parsing (not useSearchParams) keeps this page statically prerenderable.
  // The member seeds the message — the Name field stays the visitor's own name.
  useEffect(() => {
    const fromHash = memberFromHash();
    if (fromHash) setMessage(hireMessage(fromHash));

    function onHire(event: Event) {
      const detail = (event as CustomEvent<{ member?: string }>).detail;
      if (detail?.member) setMessage(hireMessage(detail.member));
    }

    window.addEventListener("codinc:hire", onHire);
    return () => window.removeEventListener("codinc:hire", onHire);
  }, []);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const subject = `Project inquiry${name ? ` — ${name}` : ""}`;
    const lines: string[] = [];
    if (name) lines.push(`Name: ${name}`);
    if (email) lines.push(`Email: ${email}`);
    lines.push("", message);
    const body = lines.join("\n");
    window.location.href = `mailto:${siteConfig.email}?subject=${encodeURIComponent(
      subject,
    )}&body=${encodeURIComponent(body)}`;
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="relative mx-auto mt-9 max-w-[520px] text-left"
    >
      <div className="grid gap-4">
        <div>
          <label
            htmlFor="contact-name"
            className="mb-2 block font-mono text-xs uppercase tracking-[0.12em] text-mist"
          >
            Name
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder="Your name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            className={fieldClasses}
          />
        </div>
        <div>
          <label
            htmlFor="contact-email"
            className="mb-2 block font-mono text-xs uppercase tracking-[0.12em] text-mist"
          >
            Email
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@company.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className={fieldClasses}
          />
        </div>
        <div>
          <label
            htmlFor="contact-message"
            className="mb-2 block font-mono text-xs uppercase tracking-[0.12em] text-mist"
          >
            What are you building?
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            rows={4}
            placeholder="A few sentences about your project…"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            className={`${fieldClasses} resize-y`}
          />
        </div>
      </div>
      <Button type="submit" variant="primary" className="mt-6 w-full">
        Start a project →
      </Button>
    </form>
  );
}
