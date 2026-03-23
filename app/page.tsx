import type { Metadata } from 'next'
import { packs } from '@/lib/packs'
import { PackCard } from '@/components/PackCard'
import { Hero } from '@/components/Hero'

export const metadata: Metadata = {
  title: 'MOJII — Premium Sample Packs for Producers',
  description: 'Premium royalty-free sample packs. Guitar loops and one-shots at 48kHz. Built for modern producers.',
}

export default function HomePage() {
  return (
    <>
      <Hero />

      {/* Packs section */}
      <section id="packs" className="px-6 py-24 max-w-7xl mx-auto">
        <div className="mb-16">
          <p className="text-green-electric text-sm tracking-[0.3em] uppercase mb-3">Sample Packs</p>
          <h2
            className="font-display text-6xl md:text-8xl text-white"
            style={{ fontFamily: 'Bebas Neue, sans-serif' }}
          >
            ALL PACKS
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packs.map((pack, i) => (
            <PackCard key={pack.slug} pack={pack} index={i} />
          ))}
        </div>
      </section>

      {/* About section */}
      <section id="about" className="px-6 py-24 border-t border-gray-border">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-green-electric text-sm tracking-[0.3em] uppercase mb-4">About MOJII</p>
            <h2
              className="font-display text-5xl md:text-7xl text-white mb-6"
              style={{ fontFamily: 'Bebas Neue, sans-serif' }}
            >
              SOUNDS BUILT<br />
              <span className="text-green-electric glow-text">FOR REAL</span><br />
              PRODUCERS
            </h2>
            <p className="text-gray-dim text-lg leading-relaxed mb-4">
              We craft samples driven by emotions — covered in MOJIIs.
              Every pack is recorded with intention, shaped by feeling, and built to move people.
            </p>
            <p className="text-gray-dim text-lg leading-relaxed mb-8">
              No filler. No presets. Just raw WAV material ready to drop straight into your DAW.
            </p>
            <a
              href="mailto:goorkeet@gmail.com"
              className="inline-flex items-center gap-2 text-green-electric text-sm tracking-widest uppercase hover:opacity-70 transition-opacity"
            >
              <span>✉</span> goorkeet@gmail.com
            </a>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: 'Packs Released', value: '1' },
              { label: 'Total Samples', value: '80+' },
              { label: 'License', value: 'Royalty Free' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="border border-gray-border bg-gloss p-6 rounded-sm"
              >
                <div
                  className="text-4xl text-green-electric mb-2 glow-text"
                  style={{ fontFamily: 'Bebas Neue, sans-serif' }}
                >
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
