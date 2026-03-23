import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'License Agreement | MOJII',
  description: 'MOJII royalty-free license agreement for all sample packs.',
}

export default function LicensePage() {
  return (
    <div className="min-h-screen px-6 pt-32 pb-24">
      <div className="max-w-3xl mx-auto">
        <Link href="/" className="text-gray-dim text-sm tracking-widest uppercase hover:text-green-electric transition-colors">
          ← Back
        </Link>

        <div className="mt-10 mb-12">
          <p className="text-green-electric text-sm tracking-[0.3em] uppercase mb-3">Legal</p>
          <h1 className="text-6xl text-white" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
            LICENSE AGREEMENT
          </h1>
          <p className="text-gray-dim mt-3 text-sm">Effective for all MOJII purchases. Last updated: 2025.</p>
        </div>

        <div className="space-y-10 text-white/70 leading-relaxed">

          <section>
            <h2 className="text-white text-xl uppercase tracking-widest mb-3" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
              1. Grant of License
            </h2>
            <p>
              Upon purchasing any MOJII sample pack, you are granted a non-exclusive, worldwide,
              royalty-free license to use the included audio files (WAV) in your original music
              productions, commercial or non-commercial, without paying any additional fees or royalties.
            </p>
          </section>

          <section>
            <h2 className="text-white text-xl uppercase tracking-widest mb-3" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
              2. Permitted Uses
            </h2>
            <ul className="space-y-2">
              {[
                'Use in original music tracks, albums, EPs, and singles',
                'Use in commercial releases distributed on streaming platforms (Spotify, Apple Music, etc.)',
                'Use in sync licensing — film, TV, advertisements, YouTube, games',
                'Use in live performances',
                'Use in beats sold to other artists',
                'Modification, pitch-shifting, time-stretching, layering, and processing of samples',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-green-electric mt-1 shrink-0">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-white text-xl uppercase tracking-widest mb-3" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
              3. Prohibited Uses
            </h2>
            <ul className="space-y-2">
              {[
                'Reselling, redistributing, or sharing the original unmodified sample files',
                'Uploading raw samples to any sample marketplace, library, or similar platform',
                'Claiming ownership of the original recordings',
                'Using samples in content that promotes hate, violence, or illegal activity',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-red-400 mt-1 shrink-0">✕</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="text-white text-xl uppercase tracking-widest mb-3" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
              4. Ownership
            </h2>
            <p>
              MOJII retains full ownership and copyright of all original recordings. This license
              grants you the right to use the samples in your productions — it does not transfer
              ownership of the underlying recordings to you.
            </p>
          </section>

          <section>
            <h2 className="text-white text-xl uppercase tracking-widest mb-3" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
              5. Tier Differences
            </h2>
            <p>
              All three tiers — CUTTED, BASIC, and EXTENDED — are covered by this same license.
              The license applies equally regardless of which tier you purchase.
            </p>
          </section>

          <section>
            <h2 className="text-white text-xl uppercase tracking-widest mb-3" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
              6. No Credit Required
            </h2>
            <p>
              You are not required to credit MOJII in your releases. However, it is always
              appreciated and helps independent creators grow.
            </p>
          </section>

          <section>
            <h2 className="text-white text-xl uppercase tracking-widest mb-3" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
              7. Refund Policy
            </h2>
            <p>
              Due to the digital nature of the products, all sales are final. If you have an
              issue with your download, contact us at{' '}
              <a href="mailto:goorkeet@gmail.com" className="text-green-electric hover:opacity-70">
                goorkeet@gmail.com
              </a>{' '}
              and we will resolve it promptly.
            </p>
          </section>

          <section>
            <h2 className="text-white text-xl uppercase tracking-widest mb-3" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
              8. Contact
            </h2>
            <p>
              Questions about this license?{' '}
              <a href="mailto:goorkeet@gmail.com" className="text-green-electric hover:opacity-70">
                goorkeet@gmail.com
              </a>
            </p>
          </section>

        </div>
      </div>
    </div>
  )
}
