import Link from "next/link";
import { Pack } from "@/lib/packs";
import { translations, type Locale } from "@/lib/i18n";

type Props = { pack: Pack; lang?: Locale };

export function PackCard({ pack, lang = "en" }: Props) {
  const t = translations[lang];
  const minPrice = Math.min(...pack.tiers.map((t) => t.price));
  const maxPrice = Math.max(...pack.tiers.map((t) => t.price));

  return (
    <Link href={`/${lang}/packs/${pack.slug}`} className="group block">
      <article className="relative border border-gray-border bg-gloss overflow-hidden transition-all duration-300 hover:border-green-electric hover:shadow-[0_0_30px_#39FF1415]">
        <div className="h-px bg-gradient-to-r from-transparent via-green-electric to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        <div
          className="relative h-48 bg-matte flex items-center justify-center overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #0A0A0A 0%, #111111 50%, #0A0A0A 100%)",
          }}
        >
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "linear-gradient(#39FF14 1px, transparent 1px), linear-gradient(90deg, #39FF14 1px, transparent 1px)",
              backgroundSize: "30px 30px",
            }}
          />
          <span
            className="relative text-6xl text-white/10 group-hover:text-green-electric/20 transition-colors duration-500"
            style={{ fontFamily: "Bebas Neue, sans-serif", fontSize: "100px" }}
          >
            {pack.title.split(" ")[0][0]}
          </span>
        </div>

        <div className="p-6">
          <p className="text-green-electric text-xs tracking-[0.3em] uppercase mb-2">
            {pack.genre}
          </p>
          <h3
            className="text-3xl text-white mb-1 group-hover:text-green-electric transition-colors duration-200"
            style={{ fontFamily: "Bebas Neue, sans-serif" }}
          >
            MOJII {pack.title}
          </h3>
          <p className="text-gray-dim text-sm mb-4 line-clamp-2">{pack.description}</p>

          <div className="flex items-center justify-between">
            <span className="text-white text-sm">
              {t.packs.from} <span className="text-green-electric font-medium">${minPrice}</span>
              <span className="text-gray-dim"> – ${maxPrice}</span>
            </span>
            <span className="text-green-electric text-xs tracking-widest uppercase group-hover:translate-x-1 transition-transform duration-200">
              {t.packs.view}
            </span>
          </div>

          <div className="flex gap-2 mt-4">
            {pack.tiers.map((tier) => (
              <span
                key={tier.id}
                className="text-xs text-gray-dim border border-gray-border px-2 py-1 uppercase tracking-widest"
              >
                {tier.name}
              </span>
            ))}
          </div>
        </div>
      </article>
    </Link>
  );
}
