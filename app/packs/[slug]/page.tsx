import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { getPackBySlug, packs } from '@/lib/packs'
import { TierCard } from '@/components/TierCard'
import Link from 'next/link'

type Props = { params: { slug: string } }

export async function generateStaticParams() {
  return packs.map((pack) => ({ slug: pack.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const pack = getPackBySlug(params.slug)
  if (!pack) return {}
  return {
    title: `MOJII ${pack.title}`,
    description: pack.description,
    keywords: pack.tags,
    openGraph: {
      title: `MOJII ${pack.title}`,
      description: pack.description,
    },
  }
}

export default function PackPage({ params }: Props) {
  const pack = getPackBySlug(params.slug)
  if (!pack) notFound()

  return (
    <div className="min-h-screen">
      {/* Back */}
      <div className="px-6 pt-32 pb-6 max-w-7xl mx-auto">
        <Link
          href="/#packs"
          className="text-gray-dim text-sm tracking-widest uppercase hover:text-green-electric transition-colors"
        >
          ← All Packs
        </Link>
      </div>

      {/* Header */}
      <section className="px-6 pb-16 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-end">
          <div>
            <p className="text-green-electric text-sm tracking-[0.3em] uppercase mb-3">
              {pack.genre}
            </p>
            <h1
              className="text-7xl md:text-9xl text-white leading-none mb-4"
              style={{ fontFamily: 'Bebas Neue, sans-serif' }}
            >
              MOJII<br />
              <span className="text-green-electric glow-text">{pack.title}</span>
            </h1>
            <p className="text-gray-dim text-xl mb-8">{pack.subtitle}</p>
            <p className="text-white/70 leading-relaxed max-w-lg">{pack.longDescription}</p>
          </div>

          {/* Pack meta */}
          <div className="space-y-3">
            {[
              { label: 'Key', value: pack.key },
              { label: 'Format', value: 'WAV 24-bit / 48kHz' },
              { label: 'License', value: 'Royalty-Free' },
            ].map((item) => (
              <div
                key={item.label}
                className="flex justify-between items-center py-3 border-b border-gray-border"
              >
                <span className="text-gray-dim text-sm uppercase tracking-widest">{item.label}</span>
                <span className="text-white text-sm">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SoundCloud Preview */}
      {pack.tiers[0].soundcloudUrl && (
        <section className="px-6 pb-16 max-w-7xl mx-auto">
          <p className="text-green-electric text-sm tracking-[0.3em] uppercase mb-6">Preview</p>
          <iframe
            width="100%"
            height="166"
            scrolling="no"
            frameBorder="no"
            allow="autoplay"
            src={`https://w.soundcloud.com/player/?url=${encodeURIComponent(pack.tiers[0].soundcloudUrl)}&color=%2339FF14&auto_play=false&hide_related=true&show_comments=false&show_user=true&show_reposts=false&show_teaser=false`}
            className="rounded-sm border border-gray-border"
          />
        </section>
      )}

      {/* Tiers */}
      <section className="px-6 pb-24 max-w-7xl mx-auto">
        <p className="text-green-electric text-sm tracking-[0.3em] uppercase mb-8">Choose Your Tier</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pack.tiers.map((tier, i) => (
            <TierCard key={tier.id} tier={tier} packTitle={pack.title} highlighted={i === 1} />
          ))}
        </div>
        <p className="text-gray-dim text-xs text-center mt-8">
          All prices in USD. Download link sent instantly to your email after payment.
        </p>
      </section>

      {/* Tags / SEO */}
      <section className="px-6 pb-16 max-w-7xl mx-auto">
        <div className="flex flex-wrap gap-2">
          {pack.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs text-gray-dim border border-gray-border px-3 py-1 rounded-full uppercase tracking-widest"
            >
              {tag}
            </span>
          ))}
        </div>
      </section>
    </div>
  )
}
