'use client'

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { translations, type Locale } from '@/lib/i18n'

export function Hero({ lang = 'en' }: { lang?: Locale }) {
  const t = translations[lang]
  const titleRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const el = titleRef.current
    if (!el) return
    el.style.opacity = '0'
    el.style.transform = 'translateY(40px)'
    setTimeout(() => {
      el.style.transition = 'opacity 0.9s ease, transform 0.9s ease'
      el.style.opacity = '1'
      el.style.transform = 'translateY(0)'
    }, 100)
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 overflow-hidden">
      {/* Background grid lines */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: 'linear-gradient(#39FF14 1px, transparent 1px), linear-gradient(90deg, #39FF14 1px, transparent 1px)',
            backgroundSize: '80px 80px',
          }}
        />
      </div>

      {/* Green glow blob */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, #39FF1408 0%, transparent 70%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto w-full">
        {/* Label */}
        <p
          className="text-green-electric text-sm tracking-[0.4em] uppercase mb-6 opacity-0"
          style={{ animation: 'fadeIn 0.6s ease 0.3s forwards' }}
        >
          {t.hero.label}
        </p>

        {/* Main title */}
        <h1
          ref={titleRef}
          className="text-[clamp(80px,18vw,220px)] leading-none text-white"
          style={{ fontFamily: 'Bebas Neue, sans-serif' }}
        >
          MOJ
          <span className="text-green-electric glow-text">II</span>
        </h1>

        {/* Subtitle */}
        <p
          className="text-gray-dim text-xl md:text-2xl max-w-lg mt-6 leading-relaxed opacity-0"
          style={{ animation: 'slideUp 0.8s ease 0.5s forwards' }}
        >
          {t.hero.subtitle}
        </p>

        {/* CTA */}
        <div
          className="flex flex-wrap gap-4 mt-12 opacity-0"
          style={{ animation: 'slideUp 0.8s ease 0.7s forwards' }}
        >
          <Link
            href={`/${lang}/#packs`}
            className="group relative px-8 py-4 bg-green-electric text-black font-medium text-sm tracking-widest uppercase overflow-hidden transition-all hover:shadow-[0_0_30px_#39FF1460]"
          >
            <span className="relative z-10">{t.hero.cta}</span>
          </Link>
          <a
            href="#about"
            className="px-8 py-4 border border-gray-border text-white text-sm tracking-widest uppercase hover:border-green-electric hover:text-green-electric transition-all"
          >
            {t.hero.ctaSecondary}
          </a>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-0"
        style={{ animation: 'fadeIn 1s ease 1.2s forwards' }}
      >
        <span className="text-gray-dim text-xs tracking-[0.3em] uppercase">{t.hero.scroll}</span>
        <div className="w-px h-12 bg-gradient-to-b from-green-electric to-transparent" />
      </div>
    </section>
  )
}
