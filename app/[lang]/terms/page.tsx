import type { Metadata } from "next";
import Link from "next/link";
import { resolveLocale } from "@/lib/locales";

type Props = { params: { lang: string } };

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Terms of Service | MOJII",
    description: "MOJII Terms of Service for mojii.store",
  };
}

export default function TermsPage({ params }: Props) {
  const lang = resolveLocale(params.lang);
  return (
    <div className="min-h-screen px-6 pt-32 pb-24">
      <div className="max-w-3xl mx-auto">
        <Link href={`/${lang}`} className="text-gray-dim text-sm tracking-widest uppercase hover:text-green-electric transition-colors">
          ← Back
        </Link>
        <div className="mt-10 mb-12">
          <p className="text-green-electric text-sm tracking-[0.3em] uppercase mb-3">Legal</p>
          <h1 className="text-6xl text-white" style={{ fontFamily: "Bebas Neue, sans-serif" }}>
            TERMS OF SERVICE
          </h1>
          <p className="text-gray-dim mt-3 text-sm">Last updated: 2025.</p>
        </div>
        <div className="space-y-10 text-white/70 leading-relaxed">
          <section>
            <h2 className="text-white text-xl uppercase tracking-widest mb-3" style={{ fontFamily: "Bebas Neue, sans-serif" }}>1. Acceptance of Terms</h2>
            <p>By accessing mojii.store or purchasing any product from MOJII, you agree to these Terms of Service.</p>
          </section>
          <section>
            <h2 className="text-white text-xl uppercase tracking-widest mb-3" style={{ fontFamily: "Bebas Neue, sans-serif" }}>2. Products and Services</h2>
            <p>MOJII sells digital sample packs (WAV audio files) delivered via download link after successful payment.</p>
          </section>
          <section>
            <h2 className="text-white text-xl uppercase tracking-widest mb-3" style={{ fontFamily: "Bebas Neue, sans-serif" }}>3. Payments</h2>
            <p>Payments processed by Creem (USD/EUR cards) and NowPayments (crypto). MOJII does not store payment details.</p>
          </section>
          <section>
            <h2 className="text-white text-xl uppercase tracking-widest mb-3" style={{ fontFamily: "Bebas Neue, sans-serif" }}>4. Refund Policy</h2>
            <p>All sales are final once the download link is delivered. Issues? Contact <a href="mailto:goorkeet@gmail.com" className="text-green-electric hover:opacity-70">goorkeet@gmail.com</a></p>
          </section>
          <section>
            <h2 className="text-white text-xl uppercase tracking-widest mb-3" style={{ fontFamily: "Bebas Neue, sans-serif" }}>5. License</h2>
            <p>Purchase grants royalty-free license for use in music productions. See our <Link href={`/${lang}/license`} className="text-green-electric hover:opacity-70">License Agreement</Link>.</p>
          </section>
          <section>
            <h2 className="text-white text-xl uppercase tracking-widest mb-3" style={{ fontFamily: "Bebas Neue, sans-serif" }}>6. Intellectual Property</h2>
            <p>All content on mojii.store is property of MOJII. No reproduction without permission.</p>
          </section>
          <section>
            <h2 className="text-white text-xl uppercase tracking-widest mb-3" style={{ fontFamily: "Bebas Neue, sans-serif" }}>7. Disclaimer</h2>
            <p>Products provided as is. We are not liable for indirect or consequential damages.</p>
          </section>
          <section>
            <h2 className="text-white text-xl uppercase tracking-widest mb-3" style={{ fontFamily: "Bebas Neue, sans-serif" }}>8. Contact</h2>
            <p>Questions? <a href="mailto:goorkeet@gmail.com" className="text-green-electric hover:opacity-70">goorkeet@gmail.com</a></p>
          </section>
        </div>
      </div>
    </div>
  );
}
