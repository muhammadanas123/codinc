import { NextResponse } from "next/server";
import { getTranslations } from "next-intl/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function clean(value: unknown): string {
  return typeof value === "string" ? value.trim() : "";
}

export async function POST(request: Request) {
  let payload: Record<string, unknown>;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const name = clean(payload.name);
  const email = clean(payload.email);
  const message = clean(payload.message);
  const honeypot = clean(payload.company);

  // Bot trap: a filled hidden field means a bot — pretend success, send nothing.
  if (honeypot) return NextResponse.json({ ok: true });

  // Validate. Reject CR/LF in single-line fields to prevent header injection.
  if (
    !EMAIL_RE.test(email) ||
    /[\r\n]/.test(`${email}${name}`) ||
    message.length === 0
  ) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, CONTACT_TO } = process.env;
  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    console.error("Contact form: SMTP env vars are not configured.");
    return NextResponse.json({ ok: false }, { status: 500 });
  }

  const port = Number(SMTP_PORT) || 465;
  const transport = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  const t = await getTranslations("contact");
  const to = CONTACT_TO || SMTP_USER;
  const subject = name
    ? t("form.subjectWithName", { name })
    : t("form.subjectPlain");

  try {
    // 1) Notify the team. Reply-To = visitor, so a reply goes straight to them.
    await transport.sendMail({
      from: `Codinc Website <${SMTP_USER}>`,
      to,
      replyTo: email,
      subject,
      text: `Name: ${name || "—"}\nEmail: ${email}\n\n${message}`,
    });

    // 2) Auto-reply confirmation to the visitor.
    await transport.sendMail({
      from: `Codinc <${SMTP_USER}>`,
      to: email,
      subject: t("autoReply.subject"),
      text: t("autoReply.body", { name: name || "there" }),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Contact form send failed:", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
