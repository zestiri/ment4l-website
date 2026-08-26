import { NextResponse } from "next/server";

export const runtime = "nodejs";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

export async function POST(req: Request) {
  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "invalid_json" }, { status: 400 });
  }

  const name = String(data.name ?? "").trim();
  const email = String(data.email ?? "").trim();
  const phone = String(data.phone ?? "").trim();
  const message = String(data.message ?? "").trim();
  const website = String(data.website ?? "").trim(); // honeypot
  const gemeente = String(data.gemeente ?? "").trim();
  const rol = String(data.rol ?? "").trim();
  const soort = String(data.soort ?? "Contactformulier").trim();

  // Bot? Doe alsof het gelukt is en negeer stil.
  if (website !== "") {
    return NextResponse.json({ ok: true });
  }

  // Bij een aanmelding is telefoon leidend en e-mail optioneel (we bellen terug).
  // Bij het contactformulier is e-mail wel verplicht.
  const isAanmelding = soort.toLowerCase().startsWith("aanmelding");
  const emailOk = isAanmelding ? email === "" || EMAIL_RE.test(email) : EMAIL_RE.test(email);
  const contactOk = isAanmelding ? phone !== "" : true;
  if (!name || !message || !emailOk || !contactOk) {
    return NextResponse.json({ ok: false, error: "validation" }, { status: 422 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO || "info@ment4l.nl";
  const from = process.env.CONTACT_FROM || "MENT4L <onboarding@resend.dev>";

  if (!apiKey) {
    return NextResponse.json({ ok: false, error: "not_configured" }, { status: 503 });
  }

  try {
    const { Resend } = await import("resend");
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from,
      to,
      ...(email ? { replyTo: email } : {}),
      subject: `${soort} via ment4l.nl — ${name}${gemeente ? ` (${gemeente})` : ""}`,
      text: [
        `Soort:     ${soort}`,
        rol ? `Rol:       ${rol}` : null,
        `Naam:      ${name}`,
        `Telefoon:  ${phone || "-"}`,
        `E-mail:    ${email || "-"}`,
        gemeente ? `Gemeente:  ${gemeente}` : null,
        "",
        "Hulpvraag:",
        message,
      ]
        .filter(Boolean)
        .join("\n"),
    });

    if (error) {
      return NextResponse.json({ ok: false, error: "send_failed" }, { status: 502 });
    }
    return NextResponse.json({ ok: true });
  } catch {
    return NextResponse.json({ ok: false, error: "server" }, { status: 500 });
  }
}
