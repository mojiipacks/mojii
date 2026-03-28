"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { translations } from "@/lib/i18n";
import type { Locale } from "@/lib/locales";

type PaymentStatus = "loading" | "success" | "failed";

export function SuccessContent({
  lang,
  email,
  tier,
}: {
  lang: Locale;
  email?: string;
  tier?: string;
}) {
  const t = translations[lang];
  const [status, setStatus] = useState<PaymentStatus>("loading");

  useEffect(() => {
    if (!email || !tier) {
      setStatus("failed");
      return;
    }

    let cancelled = false;
    const check = async () => {
      const res = await fetch(
        `/api/invoice-status?email=${encodeURIComponent(email)}&tier=${encodeURIComponent(tier)}`,
      );
      const data = await res.json();
      if (cancelled) return;

      if (data.status === "success") {
        setStatus("success");
      } else if (data.status === "processing" || data.status === "created") {
        setTimeout(check, 2000);
      } else {
        setStatus("failed");
      }
    };

    check();
    return () => {
      cancelled = true;
    };
  }, [email, tier]);

  const isSuccess = status === "success";
  const isLoading = status === "loading";

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <div
          className={`text-8xl mb-6 ${isLoading ? "animate-pulse" : ""}`}
          style={{
            fontFamily: "Bebas Neue, sans-serif",
            color: isLoading ? "#888" : isSuccess ? "#39FF14" : "#ef4444",
          }}
        >
          {isLoading ? "..." : isSuccess ? "✓" : "✕"}
        </div>
        <h1 className="text-5xl text-white mb-4" style={{ fontFamily: "Bebas Neue, sans-serif" }}>
          {isLoading
            ? t.successLoading.title1
            : isSuccess
              ? t.success.title1
              : t.successFailed.title1}
          <br />
          <span
            className={
              isSuccess ? "text-green-electric" : isLoading ? "text-gray-dim" : "text-red-400"
            }
          >
            {isLoading
              ? t.successLoading.title2
              : isSuccess
                ? t.success.title2
                : t.successFailed.title2}
          </span>
        </h1>
        <p className="text-gray-dim text-lg mb-2">
          {isLoading
            ? t.successLoading.subtitle
            : isSuccess
              ? t.success.subtitle
              : t.successFailed.subtitle}
        </p>
        {isSuccess && email && (
          <p className="text-white/50 text-sm mb-8">
            {t.success.emailNote} <span className="text-green-electric">{email}</span>
          </p>
        )}
        {isSuccess && <p className="text-gray-dim text-sm mb-10">{t.success.spamNote}</p>}
        {!isLoading && (
          <Link
            href={`/${lang}`}
            className="inline-block border border-green-electric text-green-electric px-8 py-4 text-sm tracking-widest uppercase hover:bg-green-electric hover:text-black transition-all"
          >
            {t.success.backBtn}
          </Link>
        )}
      </div>
    </div>
  );
}
