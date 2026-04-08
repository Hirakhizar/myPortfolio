import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: NextRequest) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    const { error } = await resend.emails.send({
      // Use your verified Resend domain address here once you add a domain.
      // Until then, Resend only allows sending to the email you signed up with.
      from: process.env.RESEND_FROM_EMAIL ?? "onboarding@resend.dev",
      to: process.env.RESEND_TO_EMAIL ?? "hirakhizarkhizarhayat@gmail.com",
      replyTo: email,
      subject: `[Portfolio] ${name} sent you a message`,
      headers: {
        // Helps Gmail classify as personal, not promotional
        "X-Entity-Ref-ID": `portfolio-contact-${Date.now()}`,
      },
      html: `
        <div style="font-family:sans-serif;max-width:560px;margin:0 auto;background:#020d1a;color:#e8f4ff;padding:32px;border-radius:16px;border:1px solid rgba(0,212,255,0.2)">
          <h2 style="color:#00d4ff;margin:0 0 24px">New message from your portfolio</h2>
          <table style="width:100%;border-collapse:collapse">
            <tr>
              <td style="padding:8px 0;color:#7aa8c8;width:80px">Name</td>
              <td style="padding:8px 0;color:#e8f4ff">${name}</td>
            </tr>
            <tr>
              <td style="padding:8px 0;color:#7aa8c8">Email</td>
              <td style="padding:8px 0"><a href="mailto:${email}" style="color:#00d4ff">${email}</a></td>
            </tr>
          </table>
          <hr style="border:none;border-top:1px solid rgba(0,212,255,0.15);margin:20px 0"/>
          <p style="color:#7aa8c8;margin:0 0 8px;font-size:13px">Message</p>
          <p style="color:#e8f4ff;white-space:pre-wrap;margin:0">${message}</p>
        </div>
      `,
    });

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Failed to send message." }, { status: 500 });
  }
}
