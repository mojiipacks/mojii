import type { Metadata } from "next";
import Link from "next/link";
import { resolveLocale } from "@/lib/locales";

type Props = { params: { lang: string } };

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "License Agreement | MOJII",
    description: "MOJII royalty-free license agreement for all sample packs.",
  };
}

export default function LicensePage({ params }: Props) {
  const lang = resolveLocale(params.lang);

  return (
    <div className="min-h-screen px-6 pt-32 pb-24">
      <div className="max-w-3xl mx-auto">
        <Link
          href={`/${lang}`}
          className="text-gray-dim text-sm tracking-widest uppercase hover:text-green-electric transition-colors"
        >
          ← Back
        </Link>

        <div className="mt-10 mb-12">
          <p className="text-green-electric text-sm tracking-[0.3em] uppercase mb-3">Legal</p>
          <h1 className="text-6xl text-white" style={{ fontFamily: "Bebas Neue, sans-serif" }}>
            LICENSE AGREEMENT
          </h1>
          <p className="text-gray-dim mt-3 text-sm">
            Effective for all MOJII purchases. Last updated: 2025.
          </p>
        </div>

        <div className="space-y-10 text-white/70 leading-relaxed">
          <section>
            <h2
              className="text-white text-xl uppercase tracking-widest mb-3"
              style={{ fontFamily: "Bebas Neue, sans-serif" }}
            >
              1. Grant of License
            </h2>
            <p>
              Upon purchasing any MOJII sample pack, you are granted a non-exclusive, worldwide,
              royalty-free license to use the included WAV files in your original music productions,
              commercial or non-commercial, without paying additional fees.
            </p>
          </section>

          <section>
            <h2
              className="text-white text-xl uppercase tracking-widest mb-3"
              style={{ fontFamily: "Bebas Neue, sans-serif" }}
            >
              2. Permitted Uses
            </h2>
            <ul className="space-y-2">
              {[
                "Use in original music tracks, albums, EPs, and singles",
                "Commercial releases on streaming platforms (Spotify, Apple Music, etc.)",
                "Sync licensing — film, TV, advertisements, YouTube, games",
                "Live performances",
                "Beats sold to other artists",
                "Modification, pitch-shifting, time-stretching, layering, and processing",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-green-electric mt-1 shrink-0">✓</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2
              className="text-white text-xl uppercase tracking-widest mb-3"
              style={{ fontFamily: "Bebas Neue, sans-serif" }}
            >
              3. Prohibited Uses
            </h2>
            <ul className="space-y-2">
              {[
                "Reselling, redistributing, or sharing the original unmodified sample files",
                "Uploading raw samples to any sample marketplace or library",
                "Claiming ownership of the original recordings",
                "Using samples in content promoting hate, violence, or illegal activity",
              ].map((item) => (
                <li key={item} className="flex items-start gap-3">
                  <span className="text-red-400 mt-1 shrink-0">✕</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2
              className="text-white text-xl uppercase tracking-widest mb-3"
              style={{ fontFamily: "Bebas Neue, sans-serif" }}
            >
              4. Ownership
            </h2>
            <p>
              MOJII retains full ownership and copyright of all original recordings. This license
              grants usage rights only — it does not transfer ownership to you.
            </p>
          </section>

          <section>
            <h2
              className="text-white text-xl uppercase tracking-widest mb-3"
              style={{ fontFamily: "Bebas Neue, sans-serif" }}
            >
              5. All Tiers
            </h2>
            <p>
              CUTTED, BASIC, and EXTENDED are all covered by the same license regardless of tier.
            </p>
          </section>

          <section>
            <h2
              className="text-white text-xl uppercase tracking-widest mb-3"
              style={{ fontFamily: "Bebas Neue, sans-serif" }}
            >
              6. No Credit Required
            </h2>
            <p>
              You are not required to credit MOJII in your releases, though it is always
              appreciated.
            </p>
          </section>

          <section>
            <h2
              className="text-white text-xl uppercase tracking-widest mb-3"
              style={{ fontFamily: "Bebas Neue, sans-serif" }}
            >
              7. Contact
            </h2>
            <p>
              Questions?{" "}
              <a href="mailto:support@mojii.store" className="text-green-electric hover:opacity-70">
                support@mojii.store
              </a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
