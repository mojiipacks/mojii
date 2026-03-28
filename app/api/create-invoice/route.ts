import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const {
      tierId,
      packTitle,
      tierName,
      price,
      email,
      lang = "en",
      packSlug = "guitar-pack",
    } = await req.json();

    if (!tierId || !price || !email) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 });
    }

    const amountInKopecks = Math.round(price * 100);

    const successUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/success?email=${encodeURIComponent(email)}&tier=${tierId}&lang=${lang}`;
    const cancelUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/${lang}/packs/${packSlug}`;

    const body = {
      amount: amountInKopecks,
      ccy: 840,
      merchantPaymInfo: {
        reference: `${tierId}|${email}|${Date.now()}`,
        destination: `MOJII ${packTitle} — ${tierName}`,
        basketOrder: [
          {
            name: `MOJII ${packTitle} — ${tierName}`,
            qty: 1,
            sum: amountInKopecks,
            unit: "pcs",
            code: tierId,
          },
        ],
      },
      redirectUrl: successUrl,
      webhookUrl: `${process.env.NEXT_PUBLIC_SITE_URL}/api/webhook`,
      saveCardData: {
        saveCard: false,
      },
      validity: 3600,
      paymentType: "debit",
    };

    const response = await fetch("https://api.monobank.ua/api/merchant/invoice/create", {
      method: "POST",
      headers: {
        "X-Token": process.env.MONOBANK_TOKEN!,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("Monobank error:", err);
      return NextResponse.json({ error: "Payment provider error" }, { status: 500 });
    }

    const data = await response.json();

    console.log(`Invoice created: ${data.invoiceId} for ${email}`);

    return NextResponse.json({
      pageUrl: data.pageUrl,
      invoiceId: data.invoiceId,
    });
  } catch (err) {
    console.error("create-invoice error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
