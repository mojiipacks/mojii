import Link from "next/link";
import { translations } from "@/lib/i18n";
import { DEFAULT_LOCALE, type Locale } from "@/lib/locales";

export function Footer({ lang = DEFAULT_LOCALE }: { lang?: Locale }) {
  const t = translations[lang];

  return (
    <footer className="border-t border-gray-border px-6 py-12 mt-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-start justify-between gap-8 mb-8">
          <div
            className="text-white text-2xl"
            style={{ fontFamily: "Bebas Neue, sans-serif", letterSpacing: "0.1em" }}
          >
            MOJ<span className="text-green-electric">II</span>
          </div>

          <div className="flex flex-wrap gap-8 text-xs text-gray-dim uppercase tracking-widest">
            <Link href={`/${lang}/#packs`} className="hover:text-white transition-colors">
              {t.nav.packs}
            </Link>
            <Link href={`/${lang}/#about`} className="hover:text-white transition-colors">
              {t.nav.about}
            </Link>
            <Link href={`/${lang}/license`} className="hover:text-white transition-colors">
              {t.footer.license}
            </Link>
<Link href={`/${lang}/terms`} className="hover:text-white transition-colors">
  Terms of Service
            </Link>
            <Link href={`/${lang}/privacy`} className="hover:text-white transition-colors">
              {t.footer.privacy}
            </Link>
            <a
              href="mailto:goorkeet@gmail.com"
              className="hover:text-green-electric transition-colors"
            >
              {t.footer.support}
            </a>
          </div>
        </div>

        <div className="border-t border-gray-border pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-dim text-xs">{t.footer.tagline}</p>
          <p className="text-gray-dim text-xs">
            © {new Date().getFullYear()} MOJII. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
