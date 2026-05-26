import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  try {
    const {
      name,
      email,
      place,
      role,
      experience
    }: {
      name?: string;
      email?: string;
      place?: string;
      role?: string;
      experience?: string;
    } = await req.json();

    const clean = (v?: string) => (typeof v === "string" ? v.trim() : "");
    const payload = {
      name: clean(name),
      email: clean(email),
      place: clean(place),
      role: clean(role),
      experience: clean(experience)
    };

    if (!payload.name || !payload.email) {
      return NextResponse.json(
        { ok: false, error: "Name and email are required." },
        { status: 400 }
      );
    }

    const adminEmail = process.env.ADMIN_EMAIL;
    const host = process.env.SMTP_HOST;
    const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined;
    const user = process.env.SMTP_USER;
    const pass = process.env.SMTP_PASS;
    const secure = process.env.SMTP_SECURE === "true";

    if (!adminEmail || !host || !port || !user || !pass) {
      return NextResponse.json(
        { ok: false, error: "Email service not configured on server." },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass }
    });

    await transporter.sendMail({
      from: user,
      to: adminEmail,
      replyTo: payload.email,
      subject: `Get Hired: ${payload.name}${payload.role ? ` — ${payload.role}` : ""}`,
      text:
        `New Get Hired submission\n\n` +
        `Name: ${payload.name}\n` +
        `Email: ${payload.email}\n` +
        `Place: ${payload.place || "-"}\n` +
        `Role: ${payload.role || "-"}\n` +
        `Experience: ${payload.experience || "-"}\n`
    });

    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid request." }, { status: 400 });
  }
}

