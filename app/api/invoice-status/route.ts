import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const invoiceId = req.nextUrl.searchParams.get("invoiceId");

  if (!invoiceId) {
    return NextResponse.json({ error: "Missing invoiceId" }, { status: 400 });
  }

  const res = await fetch(
    `https://api.monobank.ua/api/merchant/invoice/status?invoiceId=${invoiceId}`,
    {
      headers: { "X-Token": process.env.MONOBANK_TOKEN! },
      cache: "no-store",
    },
  );

  if (!res.ok) {
    return NextResponse.json({ status: "unknown" });
  }

  const data = await res.json();
  return NextResponse.json({ status: data.status });
}
