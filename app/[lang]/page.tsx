import type { Metadata } from 'next'
import { packs } from '@/lib/packs'
import { translations, type Locale } from '@/lib/i18n'
import { PackCard } from '@/components/PackCard'
import { Hero } from '@/components/Hero'
import Link from 'next/link'

type Props = { params: { lang: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = (params.lang as Locale) in translations ? (params.lang as Locale) : 'en'
  return {
    title: 'MOJII — Premium Sample Packs for Producers',
    description: lang === 'uk'
      ? 'Преміум royalty-free семпл-паки. Гітарні лупи та one-shots у 48kHz. Для сучасних продюсерів.'
      : 'Premium royalty-free sample packs. Guitar loops and one-shots at 48kHz. Built for modern producers.',
  }
}

export default function HomePage({ params }: Props) {
  const lang = (params.lang as Locale) in translations ? (params.lang as Locale) : 'en'
  const t = translations[lang]

  return (
    <>
      <Hero lang={lang} />

      {/* Packs section */}
      <section id="packs" className="px-6 py-24 max-w-7xl mx-auto">
        <div className="mb-16">
          <p className="text-green-electric text-sm tracking-[0.3em] uppercase mb-3">{t.packs.sectionLabel}</p>
          <h2 className="text-6xl md:text-8xl text-white" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
            {t.packs.sectionTitle}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packs.map((pack) => (
            <PackCard key={pack.slug} pack={pack} lang={lang} />
          ))}
        </div>
      </section>

      {/* About section */}
      <section id="about" className="px-6 py-24 border-t border-gray-border">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-green-electric text-sm tracking-[0.3em] uppercase mb-4">{t.about.label}</p>
            <h2 className="text-5xl md:text-7xl text-white mb-6" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
              {t.about.title1}<br />
              <span className="text-green-electric glow-text">{t.about.title2}</span><br />
              {t.about.title3}
            </h2>
            <p className="text-gray-dim text-lg leading-relaxed mb-4">{t.about.p1}</p>
            <p className="text-gray-dim text-lg leading-relaxed mb-8">{t.about.p2}</p>
            <a
              href="mailto:goorkeet@gmail.com"
              className="inline-flex items-center gap-2 text-green-electric text-sm tracking-widest uppercase hover:opacity-70 transition-opacity"
            >
              <span>✉</span> goorkeet@gmail.com
            </a>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: t.about.stats.packs, value: '1' },
              { label: t.about.stats.samples, value: '80+' },
              { label: t.about.stats.license, value: 'Royalty Free' },
            ].map((stat) => (
              <div key={stat.label} className="border border-gray-border bg-gloss p-6 rounded-sm">
                <div className="text-4xl text-green-electric mb-2 glow-text" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>
                  {stat.value}
                </div>
                <div className="text-gray-dim text-sm uppercase tracking-widest">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
