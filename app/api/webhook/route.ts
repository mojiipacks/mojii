import crypto from "node:crypto";
import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const DOWNLOAD_LINKS: Record<string, string> = {
  "guitar-cutted":   process.env.GUITAR_CUTTED_LINK ?? "",
  "guitar-basic":    process.env.GUITAR_BASIC_LINK ?? "",
  "guitar-extended": process.env.GUITAR_EXTENDED_LINK ?? "",
  "drums-starter":   process.env.DRUMS_STARTER_LINK ?? "",
};

const TIER_NAMES: Record<string, string> = {
  "guitar-cutted":   "GUITAR PACK — CUTTED",
  "guitar-basic":    "GUITAR PACK — BASIC",
  "guitar-extended": "GUITAR PACK — EXTENDED",
  "drums-starter":   "STARTER DRUMS PACK",
};

function verifyCreemSignature(payload: string, signature: string, secret: string): boolean {
  const computed = crypto
    .createHmac("sha256", secret)
    .update(payload)
    .digest("hex");
  return computed === signature;
}

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("creem-signature");

    if (process.env.NODE_ENV === "production") {
      if (!signature) {
        console.error("Missing creem-signature header");
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
      const secret = process.env.CREEM_WEBHOOK_SECRET!;
      if (!verifyCreemSignature(rawBody, signature, secret)) {
        console.error("Invalid creem-signature");
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    const event = JSON.parse(rawBody);
    console.log("CREEM WEBHOOK:", event.eventType, event.id);

    if (event.eventType !== "checkout.completed") {
      return NextResponse.json({ ok: true });
    }

    const checkout = event.object;

    const email: string =
      checkout?.customer?.email ??
      checkout?.request_id?.split("|")[1] ??
      "";

    if (!email || !/.+@.+\..+/.test(email)) {
      console.error("No valid email found in webhook:", checkout?.request_id);
      return NextResponse.json({ error: "No email" }, { status: 400 });
    }

    const requestId: string = checkout?.request_id ?? "";
    const tierId = requestId.split("|")[0];
    const resolvedTierId = DOWNLOAD_LINKS[tierId]
      ? tierId
      : (checkout?.metadata?.tierId as string);

    if (!resolvedTierId || !DOWNLOAD_LINKS[resolvedTierId]) {
      console.error("Unknown tierId:", tierId, "metadata:", checkout?.metadata);
      return NextResponse.json({ ok: true });
    }

    const downloadUrl = DOWNLOAD_LINKS[resolvedTierId];
    const packName = TIER_NAMES[resolvedTierId];

    await resend.emails.send({
      from: `${process.env.RESEND_FROM_NAME} <${process.env.RESEND_FROM_EMAIL}>`,
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
                © ${new Date().getFullYear()} MOJII · mojii.store
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
