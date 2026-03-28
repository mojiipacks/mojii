"use client";

import { useState } from "react";
import { PackTier } from "@/lib/packs";
import { translations } from "@/lib/i18n";
import { DEFAULT_LOCALE, type Locale } from "@/lib/locales";

type PackT = {
  back: string;
  preview: string;
  chooseTier: string;
  disclaimer: string;
  mostPopular: string;
  buyBtn: string;
  emailLabel: string;
  emailPlaceholder: string;
  proceedBtn: string;
  creatingInvoice: string;
  securePayment: string;
  emailError: string;
};

type Props = {
  tier: PackTier;
  packTitle: string;
  packSlug: string;
  highlighted?: boolean;
  t?: PackT;
  lang?: Locale;
};

export function TierCard({
  tier,
  packTitle,
  packSlug,
  highlighted,
  t = translations[DEFAULT_LOCALE]["pack"],
  lang = DEFAULT_LOCALE,
}: Props) {
  const [email, setEmail] = useState("");
  const [step, setStep] = useState<"idle" | "email" | "loading" | "done" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleBuy() {
    if (step === "idle") {
      setStep("email");
      return;
    }
    if (!email || !email.includes("@")) {
      setErrorMsg("Please enter a valid email");
      return;
    }
    setStep("loading");
    setErrorMsg("");

    try {
      const res = await fetch("/api/create-invoice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          tierId: tier.id,
          packTitle,
          tierName: tier.name,
          price: tier.price,
          email,
          lang,
          packSlug,
        }),
      });
      const data = await res.json();
      if (data.pageUrl) {
        if (data.invoiceId) sessionStorage.setItem("mojii_invoiceId", data.invoiceId);
        window.location.href = data.pageUrl;
      } else {
        throw new Error(data.error || "Failed to create invoice");
      }
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
      setStep("email");
    }
  }

  return (
    <div
      className={`relative border flex flex-col transition-all duration-300 ${
        highlighted
          ? "border-green-electric shadow-[0_0_30px_#39FF1420] bg-gloss"
          : "border-gray-border bg-gloss hover:border-green-electric/50"
      }`}
    >
      {highlighted && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-green-electric text-black text-xs font-medium px-4 py-1 uppercase tracking-widest whitespace-nowrap">
          {t.mostPopular}
        </div>
      )}

      <div className="p-8 flex flex-col flex-1">
        <h3
          className={`text-4xl mb-1 ${highlighted ? "text-green-electric glow-text" : "text-white"}`}
          style={{ fontFamily: "Bebas Neue, sans-serif" }}
        >
          {tier.name}
        </h3>

        <div className="flex items-baseline gap-1 mb-8">
          <span className="text-6xl text-white" style={{ fontFamily: "Bebas Neue, sans-serif" }}>
            ${tier.price}
          </span>
          <span className="text-gray-dim text-sm">USD</span>
        </div>

        <ul className="space-y-3 flex-1 mb-8">
          {tier.features.map((f) => (
            <li key={f} className="flex items-start gap-3 text-sm text-white/70">
              <span className="text-green-electric mt-0.5 shrink-0">✓</span>
              {f}
            </li>
          ))}
        </ul>

        {(step === "email" || step === "loading") && (
          <div className="mb-4">
            <label className="block text-gray-dim text-xs uppercase tracking-widest mb-2">
              {t.emailLabel}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setErrorMsg("");
              }}
              placeholder={t.emailPlaceholder}
              className="w-full bg-matte border border-gray-border text-white px-4 py-3 text-sm outline-none focus:border-green-electric transition-colors placeholder:text-gray-dim/50"
              onKeyDown={(e) => e.key === "Enter" && handleBuy()}
              autoFocus
            />
            {errorMsg && <p className="text-red-400 text-xs mt-2">{errorMsg}</p>}
          </div>
        )}

        <button
          onClick={handleBuy}
          disabled={step === "loading"}
          className={`w-full py-4 text-sm font-medium tracking-widest uppercase transition-all duration-200 ${
            highlighted
              ? "bg-green-electric text-black hover:shadow-[0_0_25px_#39FF1460] disabled:opacity-50"
              : "border border-green-electric text-green-electric hover:bg-green-electric hover:text-black disabled:opacity-50"
          }`}
        >
          {step === "loading"
            ? t.creatingInvoice
            : step === "email"
              ? t.proceedBtn
              : `${t.buyBtn} ${tier.name} — $${tier.price}`}
        </button>

        <p className="text-gray-dim text-xs text-center mt-3">{t.securePayment}</p>
      </div>
    </div>
  );
}
