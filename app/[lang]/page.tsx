import type { Metadata } from "next";
import { packs } from "@/lib/packs";
import { translations } from "@/lib/i18n";
import { resolveLocale } from "@/lib/locales";
import { PackCard } from "@/components/PackCard";

type Props = { params: { lang: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return {
    title: "MOJII — Premium Sample Packs for Producers",
    description:
      "Premium royalty-free sample packs. Guitar loops and one-shots at 48kHz. Built for modern producers.",
  };
}

export default function HomePage({ params }: Props) {
  const lang = resolveLocale(params.lang);
  const t = translations[lang];

  return (
    <>
      {/* Hero + Packs — single screen, no scroll needed */}
      <section className="min-h-screen flex flex-col justify-center px-6 pt-24 pb-12 relative overflow-hidden">
        {/* Background grid */}
        <div className="absolute inset-0 opacity-5 pointer-events-none">
          <div
            className="w-full h-full"
            style={{
              backgroundImage:
                "linear-gradient(#39FF14 1px, transparent 1px), linear-gradient(90deg, #39FF14 1px, transparent 1px)",
              backgroundSize: "80px 80px",
            }}
          />
        </div>

        {/* Green glow */}
        <div
          className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] rounded-full pointer-events-none"
          style={{ background: "radial-gradient(circle, #39FF1408 0%, transparent 70%)" }}
        />

        <div className="relative max-w-7xl mx-auto w-full">
          {/* Label */}
          <p className="text-green-electric text-xs tracking-[0.4em] uppercase mb-8 opacity-80">
            {t.hero.label}
          </p>

          {/* Two columns: logo left, packs right */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_1.8fr] gap-12 items-start">
            {/* Left: logo + tagline */}
            <div className="flex flex-col justify-start">
              <h1
                className="text-[clamp(64px,10vw,130px)] leading-none text-white mb-6"
                style={{ fontFamily: "Bebas Neue, sans-serif" }}
              >
                MOJ
                <span className="text-green-electric" style={{ textShadow: "0 0 30px #39FF1480" }}>
                  II
                </span>
              </h1>

              <p className="text-gray-dim text-base leading-relaxed mb-8 max-w-xs">
                {t.hero.subtitle}
              </p>

              <a
                href="#about"
                className="text-xs tracking-widest uppercase text-gray-dim hover:text-green-electric transition-colors inline-flex items-center gap-2 w-fit"
              >
                {t.hero.ctaSecondary}
                <span className="text-green-electric">→</span>
              </a>
            </div>

            {/* Right: packs */}
            <div id="packs">
              <p className="text-green-electric text-xs tracking-[0.3em] uppercase mb-4">
                {t.packs.sectionLabel}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
                {packs.map((pack) => (
                  <PackCard key={pack.slug} pack={pack} lang={lang} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About */}
      <section id="about" className="px-6 py-24 border-t border-gray-border">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-green-electric text-sm tracking-[0.3em] uppercase mb-4">
              {t.about.label}
            </p>
            <h2
              className="text-5xl md:text-7xl text-white mb-6"
              style={{ fontFamily: "Bebas Neue, sans-serif" }}
            >
              {t.about.title1}
              <br />
              <span className="text-green-electric" style={{ textShadow: "0 0 20px #39FF1480" }}>
                {t.about.title2}
              </span>
              <br />
              {t.about.title3}
            </h2>
            <p className="text-gray-dim text-lg leading-relaxed mb-4">{t.about.p1}</p>
            <p className="text-gray-dim text-lg leading-relaxed mb-8">{t.about.p2}</p>
            <a
              href="mailto:support@mojii.store"
              className="inline-flex items-center gap-2 text-green-electric text-sm tracking-widest uppercase hover:opacity-70 transition-opacity"
            >
              <span>✉</span> support@mojii.store
            </a>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {[
              { label: t.about.stats.packs, value: "1" },
              { label: t.about.stats.samples, value: "80+" },
              { label: t.about.stats.license, value: "Royalty Free" },
            ].map((stat) => (
              <div key={stat.label} className="border border-gray-border bg-gloss p-6 rounded-sm">
                <div
                  className="text-4xl text-green-electric mb-2"
                  style={{
                    fontFamily: "Bebas Neue, sans-serif",
                    textShadow: "0 0 15px #39FF1460",
                  }}
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
  );
}
