import type { Metadata } from "next";
import Link from "next/link";
import { resolveLocale } from "@/lib/locales";

type Props = { params: { lang: string } };

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Privacy Policy | MOJII",
    description: "MOJII privacy policy — how we collect and use your data.",
  };
}

export default function PrivacyPage({ params }: Props) {
  const lang = resolveLocale(params.lang);

  return (
    <div className="min-h-screen px-6 pt-32 pb-24">
      <div className="max-w-3xl mx-auto">
        <Link
          href={`/${lang}`}
          className="text-gray-dim text-sm tracking-widest uppercase hover:text-green-electric transition-colors"
        >
          ← Back
        </Link>

        <div className="mt-10 mb-12">
          <p className="text-green-electric text-sm tracking-[0.3em] uppercase mb-3">Legal</p>
          <h1 className="text-6xl text-white" style={{ fontFamily: "Bebas Neue, sans-serif" }}>
            PRIVACY POLICY
          </h1>
          <p className="text-gray-dim mt-3 text-sm">Last updated: 2025.</p>
        </div>

        <div className="space-y-10 text-white/70 leading-relaxed">
          <section>
            <h2
              className="text-white text-xl uppercase tracking-widest mb-3"
              style={{ fontFamily: "Bebas Neue, sans-serif" }}
            >
              1. Who We Are
            </h2>
            <p>
              MOJII is an independent sample pack brand. Website: mojii.store. Contact:{" "}
              <a href="mailto:support@mojii.store" className="text-green-electric hover:opacity-70">
                support@mojii.store
              </a>
            </p>
          </section>

          <section>
            <h2
              className="text-white text-xl uppercase tracking-widest mb-3"
              style={{ fontFamily: "Bebas Neue, sans-serif" }}
            >
              2. What Data We Collect
            </h2>
            <p className="mb-3">We collect only what is needed to process your purchase:</p>
            <ul className="space-y-2">
              {[
                "Email address — to deliver your download link after purchase",
                "Payment data — processed by Creem or NowPayments. We never store card or wallet details.",
                "Purchase reference — to confirm your transaction",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-green-electric mt-1 shrink-0">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2
              className="text-white text-xl uppercase tracking-widest mb-3"
              style={{ fontFamily: "Bebas Neue, sans-serif" }}
            >
              3. How We Use Your Data
            </h2>
            <ul className="space-y-2">
              {[
                "To send your download link via email (through Resend)",
                "To confirm and fulfil your purchase",
                "We do not sell, rent, or share your data for marketing",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-green-electric mt-1 shrink-0">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2
              className="text-white text-xl uppercase tracking-widest mb-3"
              style={{ fontFamily: "Bebas Neue, sans-serif" }}
            >
              4. Cookies
            </h2>
            <p>
              This website does not use tracking, advertising, or analytics cookies. No cookie
              consent banner is required.
            </p>
          </section>

          <section>
            <h2
              className="text-white text-xl uppercase tracking-widest mb-3"
              style={{ fontFamily: "Bebas Neue, sans-serif" }}
            >
              5. Third-Party Services
            </h2>
            <ul className="space-y-2">
              {[
                "Creem — card payment processing",
                "NowPayments — cryptocurrency payment processing",
                "Resend — transactional email delivery",
                "Vercel — website hosting",
                "Google Drive — file storage for downloads",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-green-electric mt-1 shrink-0">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2
              className="text-white text-xl uppercase tracking-widest mb-3"
              style={{ fontFamily: "Bebas Neue, sans-serif" }}
            >
              6. Data Retention
            </h2>
            <p>
              Your email is stored only long enough to deliver your download (typically 24 hours).
              We do not maintain a customer database or mailing list.
            </p>
          </section>

          <section>
            <h2
              className="text-white text-xl uppercase tracking-widest mb-3"
              style={{ fontFamily: "Bebas Neue, sans-serif" }}
            >
              7. Your Rights
            </h2>
            <p>
              You can request deletion of your data at any time. Contact{" "}
              <a href="mailto:support@mojii.store" className="text-green-electric hover:opacity-70">
                support@mojii.store
              </a>{" "}
              and we will respond within 72 hours.
            </p>
          </section>

          <section>
            <h2
              className="text-white text-xl uppercase tracking-widest mb-3"
              style={{ fontFamily: "Bebas Neue, sans-serif" }}
            >
              8. Changes
            </h2>
            <p>
              We may update this policy from time to time. Changes will be reflected on this page
              with an updated date.
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
