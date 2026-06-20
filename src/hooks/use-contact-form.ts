"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

export type ContactStatus = "idle" | "sending" | "success" | "error";

/** Reads `#contact?member=NAME` from the URL hash, if present. */
function memberFromHash(): string {
  if (typeof window === "undefined") return "";
  const query = window.location.hash.split("?")[1];
  if (!query) return "";
  const member = new URLSearchParams(query).get("member");
  return member ? decodeURIComponent(member) : "";
}

export function useContactForm() {
  const t = useTranslations("contact.form");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [company, setCompany] = useState(""); // honeypot — humans leave it blank
  const [status, setStatus] = useState<ContactStatus>("idle");

  useEffect(() => {
    const fromHash = memberFromHash();
    if (fromHash) setMessage(t("hireMessage", { member: fromHash }));

    function onHire(event: Event) {
      const detail = (event as CustomEvent<{ member?: string }>).detail;
      if (detail?.member) {
        setMessage(t("hireMessage", { member: detail.member }));
      }
    }

    window.addEventListener("codinc:hire", onHire);
    return () => window.removeEventListener("codinc:hire", onHire);
  }, [t]);

  async function submit() {
    if (status === "sending") return;
    setStatus("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, company }),
      });
      if (!res.ok) throw new Error("send failed");
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
    } catch {
      setStatus("error");
    }
  }

  return {
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
  };
}
