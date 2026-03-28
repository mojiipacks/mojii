import type { Metadata } from "next";
import { resolveLocale } from "@/lib/locales";
import { SuccessContent } from "@/components/SuccessContent";

export const metadata: Metadata = {
  title: "Payment | MOJII",
  robots: { index: false },
};

export default function SuccessPage({
  params,
  searchParams,
}: {
  params: { lang: string };
  searchParams: { email?: string; tier?: string };
}) {
  const lang = resolveLocale(params.lang);

  return <SuccessContent lang={lang} email={searchParams.email} tier={searchParams.tier} />;
}
