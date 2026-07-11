"use client";

import { useState } from "react";

export type ContactStatus = "idle" | "sending" | "success" | "error";

export function useContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [company, setCompany] = useState(""); // honeypot — humans leave it blank
  const [status, setStatus] = useState<ContactStatus>("idle");

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
