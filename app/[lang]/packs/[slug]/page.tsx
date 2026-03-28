import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPackBySlug, packs } from "@/lib/packs";
import { translations, type Locale } from "@/lib/i18n";
import { TierCard } from "@/components/TierCard";
import Link from "next/link";

type Props = { params: { lang: string; slug: string } };

export function generateStaticParams() {
  const langs = ["en", "uk"];
  return langs.flatMap((lang) => packs.map((pack) => ({ lang, slug: pack.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const pack = getPackBySlug(params.slug);
  if (!pack) return {};
  return {
    title: `MOJII ${pack.title}`,
    description: pack.description,
    keywords: pack.tags,
    openGraph: { title: `MOJII ${pack.title}`, description: pack.description },
  };
}

export default function PackPage({ params }: Props) {
  const pack = getPackBySlug(params.slug);
  if (!pack) notFound();

  const lang = (params.lang as Locale) in translations ? (params.lang as Locale) : "en";
  const t = translations[lang];

  return (
    <div className="min-h-screen">
      <div className="px-6 pt-32 pb-6 max-w-7xl mx-auto">
        <Link
          href={`/${lang}/#packs`}
          className="text-gray-dim text-sm tracking-widest uppercase hover:text-green-electric transition-colors"
        >
          {t.pack.back}
        </Link>
      </div>

      <section className="px-6 pb-16 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-end">
          <div>
            <p className="text-green-electric text-sm tracking-[0.3em] uppercase mb-3">
              {pack.genre}
            </p>
            <h1
              className="text-7xl md:text-9xl text-white leading-none mb-4"
              style={{ fontFamily: "Bebas Neue, sans-serif" }}
            >
              MOJII
              <br />
              <span className="text-green-electric glow-text">{pack.title}</span>
            </h1>
            <p className="text-gray-dim text-xl mb-8">{pack.subtitle}</p>
            <p className="text-white/70 leading-relaxed max-w-lg">{pack.longDescription}</p>
          </div>
          <div className="space-y-3">
            {[
              { label: "Key", value: pack.key },
              { label: "Format", value: "WAV 24-bit / 48kHz" },
              { label: "License", value: "Royalty-Free" },
            ].map((item) => (
              <div
                key={item.label}
                className="flex justify-between items-center py-3 border-b border-gray-border"
              >
                <span className="text-gray-dim text-sm uppercase tracking-widest">
                  {item.label}
                </span>
                <span className="text-white text-sm">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {pack.tiers[0].soundcloudUrl && (
        <section className="px-6 pb-16 max-w-7xl mx-auto">
          <p className="text-green-electric text-sm tracking-[0.3em] uppercase mb-6">
            {t.pack.preview}
          </p>
          <iframe
            width="100%"
            height="300"
            scrolling="no"
            frameBorder="no"
            allow="autoplay"
            src={pack.tiers[0].soundcloudUrl}
            className="rounded-sm border border-gray-border"
          />
        </section>
      )}

      <section className="px-6 pb-24 max-w-7xl mx-auto">
        <p className="text-green-electric text-sm tracking-[0.3em] uppercase mb-8">
          {t.pack.chooseTier}
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {pack.tiers.map((tier, i) => (
            <TierCard
              key={tier.id}
              tier={tier}
              packTitle={pack.title}
              packSlug={pack.slug}
              highlighted={i === 1}
              t={t.pack}
              lang={lang}
            />
          ))}
        </div>
        <p className="text-gray-dim text-xs text-center mt-8">{t.pack.disclaimer}</p>
      </section>

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
  );
}
