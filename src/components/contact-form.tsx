"use client";

import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import { useContactForm } from "@/hooks/use-contact-form";

const fieldClasses =
  "w-full rounded-[11px] border border-line bg-panel-2 px-4 py-3 text-[15px] text-paper placeholder:text-mist-dim focus:border-peacock focus:outline-hidden focus-visible:ring-2 focus-visible:ring-ring";

export function ContactForm() {
  const t = useTranslations("contact.form");
  const {
    name,
    setName,
    email,
    setEmail,
    message,
    setMessage,
    company,
    setCompany,
    status,
    submit,
  } = useContactForm();

  const sending = status === "sending";

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        void submit();
      }}
      className="relative mx-auto mt-9 max-w-[520px] text-left"
    >
      {/* Honeypot — hidden from humans, bots tend to fill it. */}
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        value={company}
        onChange={(event) => setCompany(event.target.value)}
        className="absolute left-[-9999px] top-0 h-0 w-0 opacity-0"
      />

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
      <Button
        type="submit"
        variant="primary"
        className="mt-6 w-full"
        disabled={sending}
      >
        {sending ? t("sending") : t("submit")}
      </Button>

      <p aria-live="polite" className="mt-4 min-h-5 text-center text-sm">
        {status === "success" && (
          <span className="text-peacock">{t("success")}</span>
        )}
        {status === "error" && (
          <span className="text-red-400">{t("error")}</span>
        )}
      </p>
    </form>
  );
}
