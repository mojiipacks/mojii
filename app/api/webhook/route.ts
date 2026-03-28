import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const DOWNLOAD_LINKS: Record<string, string> = {
  "guitar-cutted": "https://drive.google.com/your-cutted-link",
  "guitar-basic": "https://drive.google.com/your-basic-link",
  "guitar-extended": "https://drive.google.com/your-extended-link",
};

const TIER_NAMES: Record<string, string> = {
  "guitar-cutted": "GUITAR PACK — CUTTED",
  "guitar-basic": "GUITAR PACK — BASIC",
  "guitar-extended": "GUITAR PACK — EXTENDED",
};

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    console.log("WEBHOOK BODY:", body);

    const { status, reference } = body;

    if (status !== "success") {
      return NextResponse.json({ ok: true });
    }

    // reference format: "guitar-basic|user@email.com|1234567890"
    const parts = reference?.split("|");
    if (!parts || parts.length < 2) {
      console.error("Invalid reference format:", reference);
      return NextResponse.json({ ok: true });
    }

    const tierId = parts[0];
    const email = parts[1];

    if (!DOWNLOAD_LINKS[tierId]) {
      console.error("Unknown tierId:", tierId);
      return NextResponse.json({ ok: true });
    }

    const downloadUrl = DOWNLOAD_LINKS[tierId];
    const packName = TIER_NAMES[tierId];

    await resend.emails.send({
      from: "MOJII <onboarding@resend.dev>",
      to: email,
      subject: `Your MOJII download is ready 🎸`,
      html: `
        <!DOCTYPE html>
        <html>
        <head><meta charset="utf-8"></head>
        <body style="background:#0A0A0A;color:#ffffff;font-family:'DM Sans',Arial,sans-serif;margin:0;padding:0;">
          <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;margin:0 auto;padding:40px 20px;">
            <tr><td>
              <h1 style="font-size:48px;letter-spacing:4px;margin:0 0 8px;color:#ffffff;font-family:Arial,sans-serif;">
                MOJ<span style="color:#39FF14;">II</span>
              </h1>
              <p style="color:#888888;font-size:12px;letter-spacing:4px;text-transform:uppercase;margin:0 0 40px;">
                Premium Sample Packs
              </p>

              <h2 style="font-size:24px;color:#39FF14;margin:0 0 8px;letter-spacing:2px;">
                YOUR DOWNLOAD IS READY
              </h2>
              <p style="color:#cccccc;margin:0 0 32px;">
                Thank you for purchasing <strong>${packName}</strong>.<br>
                Click the button below to download your files.
              </p>

              <a href="${downloadUrl}"
                style="display:inline-block;background:#39FF14;color:#000000;text-decoration:none;padding:16px 32px;font-size:13px;letter-spacing:4px;text-transform:uppercase;font-weight:600;">
                Download Now →
              </a>

              <p style="color:#555555;font-size:12px;margin:32px 0 0;">
                This link is for your personal use only. All samples are royalty-free.<br>
                Questions? Reply to this email.
              </p>
              <p style="color:#333333;font-size:11px;margin:16px 0 0;">
                © ${new Date().getFullYear()} MOJII
              </p>
            </td></tr>
          </table>
        </body>
        </html>
      `,
    });

    console.log(`✅ Email sent to ${email} for ${packName}`);
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Webhook error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
