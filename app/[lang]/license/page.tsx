import type { Metadata } from 'next'
import Link from 'next/link'
import { translations, type Locale } from '@/lib/i18n'

type Props = { params: { lang: string } }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const lang = params.lang === 'uk' ? 'uk' : 'en'
  return {
    title: lang === 'uk' ? 'Ліцензійна угода | MOJII' : 'License Agreement | MOJII',
    description: lang === 'uk'
      ? 'Ліцензійна угода MOJII для всіх семпл-паків.'
      : 'MOJII royalty-free license agreement for all sample packs.',
  }
}

const content = {
  en: {
    back: '← Back',
    label: 'Legal',
    title: 'LICENSE AGREEMENT',
    updated: 'Effective for all MOJII purchases. Last updated: 2025.',
    sections: [
      {
        title: '1. Grant of License',
        text: 'Upon purchasing any MOJII sample pack, you are granted a non-exclusive, worldwide, royalty-free license to use the included audio files (WAV) in your original music productions, commercial or non-commercial, without paying any additional fees or royalties.',
      },
      {
        title: '2. Permitted Uses',
        list: [
          'Use in original music tracks, albums, EPs, and singles',
          'Use in commercial releases distributed on streaming platforms (Spotify, Apple Music, etc.)',
          'Use in sync licensing — film, TV, advertisements, YouTube, games',
          'Use in live performances',
          'Use in beats sold to other artists',
          'Modification, pitch-shifting, time-stretching, layering, and processing of samples',
        ],
        type: 'allow',
      },
      {
        title: '3. Prohibited Uses',
        list: [
          'Reselling, redistributing, or sharing the original unmodified sample files',
          'Uploading raw samples to any sample marketplace, library, or similar platform',
          'Claiming ownership of the original recordings',
          'Using samples in content that promotes hate, violence, or illegal activity',
        ],
        type: 'deny',
      },
      {
        title: '4. Ownership',
        text: 'MOJII retains full ownership and copyright of all original recordings. This license grants you the right to use the samples in your productions — it does not transfer ownership of the underlying recordings to you.',
      },
      {
        title: '5. Tier Differences',
        text: 'All three tiers — CUTTED, BASIC, and EXTENDED — are covered by this same license. The license applies equally regardless of which tier you purchase.',
      },
      {
        title: '6. No Credit Required',
        text: 'You are not required to credit MOJII in your releases. However, it is always appreciated and helps independent creators grow.',
      },
      {
        title: '7. Refund Policy',
        text: 'Due to the digital nature of the products, all sales are final. If you have an issue with your download, contact us at goorkeet@gmail.com and we will resolve it promptly.',
        email: true,
      },
      {
        title: '8. Contact',
        text: 'Questions about this license? goorkeet@gmail.com',
        email: true,
      },
    ],
  },
  uk: {
    back: '← Назад',
    label: 'Правовий',
    title: 'ЛІЦЕНЗІЙНА УГОДА',
    updated: 'Діє для всіх покупок MOJII. Останнє оновлення: 2025.',
    sections: [
      {
        title: '1. Надання ліцензії',
        text: 'Придбавши будь-який семпл-пак MOJII, ви отримуєте невиключну, всесвітню, безроялті ліцензію на використання аудіофайлів (WAV) у власних музичних проєктах — комерційних або некомерційних — без додаткових виплат.',
      },
      {
        title: '2. Дозволене використання',
        list: [
          'Використання у власних треках, альбомах, EP та синглах',
          'Комерційні релізи на стрімінгових платформах (Spotify, Apple Music тощо)',
          'Sync ліцензування — кіно, телебачення, реклама, YouTube, ігри',
          'Живі виступи',
          'Продаж битів іншим артистам',
          'Модифікація, зміна тональності, темпу, накладення та обробка семплів',
        ],
        type: 'allow',
      },
      {
        title: '3. Заборонене використання',
        list: [
          'Перепродаж, розповсюдження або передача оригінальних незмінених файлів',
          'Завантаження сирих семплів на будь-який маркетплейс або бібліотеку семплів',
          'Претензії на авторство оригінальних записів',
          'Використання в контенті, що пропагує ненависть, насилля або незаконну діяльність',
        ],
        type: 'deny',
      },
      {
        title: '4. Власність',
        text: 'MOJII зберігає повне право власності та авторські права на всі оригінальні записи. Ця ліцензія дає вам право використовувати семпли у своїх проєктах — але не передає вам право власності на самі записи.',
      },
      {
        title: '5. Різниця між тирами',
        text: 'Всі три тири — CUTTED, BASIC і EXTENDED — покриваються однією і тією самою ліцензією, незалежно від обраного тиру.',
      },
      {
        title: '6. Кредити не обовʼязкові',
        text: 'Ви не зобовʼязані вказувати MOJII у своїх релізах. Однак це завжди приємно і допомагає незалежним творцям розвиватися.',
      },
      {
        title: '7. Політика повернень',
        text: 'Через цифровий характер продуктів всі продажі є остаточними. Якщо у вас виникли проблеми з завантаженням, звʼяжіться з нами на goorkeet@gmail.com і ми вирішимо це якомога швидше.',
        email: true,
      },
      {
        title: '8. Контакт',
        text: 'Питання щодо ліцензії? goorkeet@gmail.com',
        email: true,
      },
    ],
  },
}

export default function LicensePage({ params }: Props) {
  const lang = params.lang === 'uk' ? 'uk' : 'en'
  const c = content[lang]

  return (
    <div className="min-h-screen px-6 pt-32 pb-24">
      <div className="max-w-3xl mx-auto">
        <Link href={`/${lang}`} className="text-gray-dim text-sm tracking-widest uppercase hover:text-green-electric transition-colors">
          {c.back}
        </Link>
        <div className="mt-10 mb-12">
          <p className="text-green-electric text-sm tracking-[0.3em] uppercase mb-3">{c.label}</p>
          <h1 className="text-6xl text-white" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>{c.title}</h1>
          <p className="text-gray-dim mt-3 text-sm">{c.updated}</p>
        </div>
        <div className="space-y-10 text-white/70 leading-relaxed">
          {c.sections.map((s) => (
            <section key={s.title}>
              <h2 className="text-white text-xl uppercase tracking-widest mb-3" style={{ fontFamily: 'Bebas Neue, sans-serif' }}>{s.title}</h2>
              {s.text && (
                <p>
                  {s.text.includes('goorkeet@gmail.com') ? (
                    <>
                      {s.text.split('goorkeet@gmail.com')[0]}
                      <a href="mailto:goorkeet@gmail.com" className="text-green-electric hover:opacity-70">goorkeet@gmail.com</a>
                      {s.text.split('goorkeet@gmail.com')[1]}
                    </>
                  ) : s.text}
                </p>
              )}
              {s.list && (
                <ul className="space-y-2">
                  {s.list.map((item) => (
                    <li key={item} className="flex items-start gap-3">
                      <span className={`mt-1 shrink-0 ${s.type === 'allow' ? 'text-green-electric' : 'text-red-400'}`}>
                        {s.type === 'allow' ? '✓' : '✕'}
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>
      </div>
    </div>
  )
}
