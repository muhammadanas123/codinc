"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";

const fieldClasses =
  "w-full rounded-[11px] border border-line bg-panel-2 px-4 py-3 text-[15px] text-paper placeholder:text-mist-dim focus:border-peacock focus:outline-hidden focus-visible:ring-2 focus-visible:ring-ring";

/** Reads `#contact?member=NAME` from the URL hash, if present. */
function memberFromHash(): string {
  if (typeof window === "undefined") return "";
  const query = window.location.hash.split("?")[1];
  if (!query) return "";
  const member = new URLSearchParams(query).get("member");
  return member ? decodeURIComponent(member) : "";
}

export function ContactForm() {
  const t = useTranslations("contact.form");
  const tSite = useTranslations("site");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  // Pre-fill the name when arriving via a "Hire me" button or a deep link.
  // Hash parsing (not useSearchParams) keeps this page statically prerenderable.
  // The member seeds the message — the Name field stays the visitor's own name.
  useEffect(() => {
    const fromHash = memberFromHash();
    if (fromHash) setMessage(t("hireMessage", { member: fromHash }));

    function onHire(event: Event) {
      const detail = (event as CustomEvent<{ member?: string }>).detail;
      if (detail?.member) setMessage(t("hireMessage", { member: detail.member }));
    }

    window.addEventListener("codinc:hire", onHire);
    return () => window.removeEventListener("codinc:hire", onHire);
  }, [t]);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const subject = name ? t("subjectWithName", { name }) : t("subjectPlain");
    const lines: string[] = [];
    if (name) lines.push(`Name: ${name}`);
    if (email) lines.push(`Email: ${email}`);
    lines.push("", message);
    const body = lines.join("\n");
    window.location.href = `mailto:${tSite("email")}?subject=${encodeURIComponent(
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
            {t("nameLabel")}
          </label>
          <input
            id="contact-name"
            name="name"
            type="text"
            autoComplete="name"
            placeholder={t("namePlaceholder")}
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
            {t("emailLabel")}
          </label>
          <input
            id="contact-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder={t("emailPlaceholder")}
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
            {t("messageLabel")}
          </label>
          <textarea
            id="contact-message"
            name="message"
            required
            rows={4}
            placeholder={t("messagePlaceholder")}
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            className={`${fieldClasses} resize-y`}
          />
        </div>
      </div>
      <Button type="submit" variant="primary" className="mt-6 w-full">
        {t("submit")}
      </Button>
    </form>
  );
}
