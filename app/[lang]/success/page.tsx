import Link from "next/link";
import type { Metadata } from "next";
import { translations } from "@/lib/i18n";
import { resolveLocale } from "@/lib/locales";

export const metadata: Metadata = {
  title: "Payment Successful | MOJII",
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
  const t = translations[lang].success;

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <div
          className="text-8xl text-green-electric mb-6 glow-text"
          style={{ fontFamily: "Bebas Neue, sans-serif" }}
        >
          ✓
        </div>
        <h1 className="text-5xl text-white mb-4" style={{ fontFamily: "Bebas Neue, sans-serif" }}>
          {t.title1}
          <br />
          <span className="text-green-electric">{t.title2}</span>
        </h1>
        <p className="text-gray-dim text-lg mb-2">{t.subtitle}</p>
        {searchParams.email && (
          <p className="text-white/50 text-sm mb-8">
            {t.emailNote} <span className="text-green-electric">{searchParams.email}</span>
          </p>
        )}
        <p className="text-gray-dim text-sm mb-10">{t.spamNote}</p>
        <Link
          href={`/${lang}`}
          className="inline-block border border-green-electric text-green-electric px-8 py-4 text-sm tracking-widest uppercase hover:bg-green-electric hover:text-black transition-all"
        >
          {t.backBtn}
        </Link>
      </div>
    </div>
  );
}
