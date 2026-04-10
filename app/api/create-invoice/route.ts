import { NextRequest, NextResponse } from "next/server";
import { resolveLocale } from "@/lib/locales";

export async function POST(req: NextRequest) {
  try {
    const {
      tierId,
      packTitle,
      tierName,
      price,
      lang: rawLang = "en",
      packSlug = "guitar-pack",
    } = await req.json();

    if (!tierId || !price) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const lang = resolveLocale(rawLang);

    const apiBase = process.env.CREEM_API_URL;
    if (!apiBase) {
      console.error("CREEM_API_URL is not set");
      return NextResponse.json({ error: "Server misconfigured" }, { status: 500 });
    }

    const productIdMap: Record<string, string> = {
      "guitar-cutted": process.env.CREEM_PRODUCT_GUITAR_CUTTED ?? "",
      "guitar-basic": process.env.CREEM_PRODUCT_GUITAR_BASIC ?? "",
      "guitar-extended": process.env.CREEM_PRODUCT_GUITAR_EXTENDED ?? "",
      "drums-starter": process.env.CREEM_PRODUCT_DRUMS_STARTER ?? "",
    };

    const productId = productIdMap[tierId];
    if (!productId) {
      console.error("Unknown tierId:", tierId);
      return NextResponse.json({ error: "Unknown product" }, { status: 400 });
    }

    const successUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/${lang}/success?tier=${tierId}`;
    const requestId = `${tierId}|${Date.now()}`;

    const body = {
      product_id: productId,
      request_id: requestId,
      success_url: successUrl,
      metadata: {
        tierId,
        packTitle,
        tierName,
        lang,
      },
    };

    const response = await fetch(`${apiBase}/v1/checkouts`, {
      method: "POST",
      headers: {
        "x-api-key": process.env.CREEM_API_KEY!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("Creem error:", err);
      return NextResponse.json({ error: "Payment provider error" }, { status: 500 });
    }

    const data = await response.json();
    console.log(`Creem checkout created: ${data.id}`);

    return NextResponse.json({
      pageUrl: data.checkout_url,
      checkoutId: data.id,
    });
  } catch (err) {
    console.error("create-invoice error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
