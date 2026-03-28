import { NextRequest, NextResponse } from "next/server";
import { getInvoiceId } from "@/lib/invoice-store";

export async function GET(req: NextRequest) {
  const email = req.nextUrl.searchParams.get("email");
  const tier = req.nextUrl.searchParams.get("tier");

  if (!email || !tier) {
    return NextResponse.json({ status: "unknown" });
  }

  const invoiceId = getInvoiceId(email, tier);
  if (!invoiceId) {
    return NextResponse.json({ status: "unknown" });
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
