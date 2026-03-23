'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { translations, type Locale } from '@/lib/i18n'

export function Navbar({ lang = 'en' }: { lang?: Locale }) {
  const t = translations[lang]
  const otherLang = lang === 'en' ? 'uk' : 'en'
  const pathname = usePathname()
  // Swap locale in current URL
  const otherPath = pathname.replace(`/${lang}`, `/${otherLang}`) || `/${otherLang}`

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-5 border-b border-gray-border/50 backdrop-blur-md bg-matte/80">
      <Link
        href={`/${lang}`}
        className="text-white hover:text-green-electric transition-colors"
        style={{ fontFamily: 'Bebas Neue, sans-serif', fontSize: '24px', letterSpacing: '0.1em' }}
      >
        MOJ<span className="text-green-electric">II</span>
      </Link>

      <div className="flex items-center gap-8">
        <Link href={`/${lang}/#packs`} className="text-gray-dim text-xs tracking-[0.2em] uppercase hover:text-white transition-colors">
          {t.nav.packs}
        </Link>
        <Link href={`/${lang}/#about`} className="text-gray-dim text-xs tracking-[0.2em] uppercase hover:text-white transition-colors">
          {t.nav.about}
        </Link>

        {/* Language switcher */}
        <Link
          href={otherPath}
          className="text-gray-dim text-xs tracking-widest uppercase hover:text-green-electric transition-colors border border-gray-border px-3 py-1 hover:border-green-electric"
        >
          {otherLang === 'uk' ? 'UA' : 'EN'}
        </Link>

        <Link
          href={`/${lang}/#packs`}
          className="text-xs tracking-widest uppercase px-5 py-2 border border-green-electric text-green-electric hover:bg-green-electric hover:text-black transition-all duration-200"
        >
          {t.nav.shop}
        </Link>
      </div>
    </nav>
  )
}
