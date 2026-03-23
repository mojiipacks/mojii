import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy | MOJII',
  description: 'MOJII privacy policy — how we collect and use your data.',
}

export default function PrivacyPage() {
  return (
    <div className="min-h-screen px-6 pt-32 pb-24">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-gray-dim text-sm tracking-widest uppercase hover:text-green-electric transition-colors">
          ← Back
        </Link>

        <div className="mt-10 mb-12">
          <p className="text-green-electric text-sm tracking-[0.3em] uppercase mb-3">Legal</p>
          <h1 className="text-6xl text-white" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
            PRIVACY POLICY
          </h1>
          <p className="text-gray-dim mt-3 text-sm">Last updated: 2025.</p>
        </div>

        <div className="space-y-10 text-white/70 leading-relaxed">

          <section>
            <h2 className="text-white text-xl uppercase tracking-widest mb-3" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
              1. Who We Are
            </h2>
            <p>
              MOJII is an independent sample pack brand. Our website is{' '}
              <span className="text-white">mojii.com</span>. You can contact us at{' '}
              <a href="mailto:goorkeet@gmail.com" className="text-green-electric hover:opacity-70">
                goorkeet@gmail.com
              </a>.
            </p>
          </section>

          <section>
            <h2 className="text-white text-xl uppercase tracking-widest mb-3" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
              2. What Data We Collect
            </h2>
            <p className="mb-3">We collect only the minimum data needed to process your purchase:</p>
            <ul className="space-y-2">
              {[
                'Email address — to deliver your download link after purchase',
                'Payment data — processed entirely by Monobank. We never store card details.',
                'Purchase reference — to confirm your transaction',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-green-electric mt-1 shrink-0">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-white text-xl uppercase tracking-widest mb-3" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
              3. How We Use Your Data
            </h2>
            <ul className="space-y-2">
              {[
                'To send you a download link via email (through Resend)',
                'To confirm and fulfil your purchase',
                'We do not sell, rent, or share your data with third parties for marketing',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-green-electric mt-1 shrink-0">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-white text-xl uppercase tracking-widest mb-3" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
              4. Cookies
            </h2>
            <p>
              This website does <strong className="text-white">not</strong> use tracking cookies,
              advertising cookies, or analytics cookies. We use no third-party tracking scripts.
              The site is purely informational and transactional — no cookie consent banner is required.
            </p>
          </section>

          <section>
            <h2 className="text-white text-xl uppercase tracking-widest mb-3" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
              5. Third-Party Services
            </h2>
            <ul className="space-y-2">
              {[
                'Monobank Acquiring — payment processing. Subject to Monobank\'s own privacy policy.',
                'Resend — transactional email delivery. Subject to Resend\'s own privacy policy.',
                'Vercel — website hosting. Subject to Vercel\'s privacy policy.',
                'Google Drive — file storage for downloads.',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-green-electric mt-1 shrink-0">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-white text-xl uppercase tracking-widest mb-3" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
              6. Data Retention
            </h2>
            <p>
              Your email address is stored only for the duration needed to deliver your download
              (typically 24 hours via our temporary cache). We do not maintain a long-term
              customer database or mailing list.
            </p>
          </section>

          <section>
            <h2 className="text-white text-xl uppercase tracking-widest mb-3" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
              7. Your Rights
            </h2>
            <p>
              You have the right to request deletion of any personal data we hold about you.
              Contact us at{' '}
              <a href="mailto:goorkeet@gmail.com" className="text-green-electric hover:opacity-70">
                goorkeet@gmail.com
              </a>{' '}
              and we will respond within 72 hours.
            </p>
          </section>

          <section>
            <h2 className="text-white text-xl uppercase tracking-widest mb-3" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
              8. Changes to This Policy
            </h2>
            <p>
              We may update this policy from time to time. Any changes will be reflected on this
              page with an updated date. Continued use of the site after changes constitutes
              acceptance of the updated policy.
            </p>
          </section>

        </div>
      </div>
    </div>
  )
}
