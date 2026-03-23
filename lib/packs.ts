export type PackTier = {
  id: string
  name: string
  price: number
  usd: number
  features: string[]
  soundcloudUrl?: string
}

export type Pack = {
  slug: string
  title: string
  subtitle: string
  description: string
  longDescription: string
  genre: string
  key: string
  tiers: PackTier[]
  tags: string[]
  releaseDate: string
}

export const packs: Pack[] = [
  {
    slug: 'guitar-pack',
    title: 'GUITAR PACK',
    subtitle: 'Raw. Atmospheric. Electric.',
    description: 'Hand-recorded guitar samples crafted for modern producers. 20 to 60+ loops and one-shots across three tiers — ready to drop straight into your DAW.',
    longDescription: 'MOJII GUITAR PACK delivers hand-recorded guitar samples across three tiers. From 20 essential loops in CUTTED to 60+ samples in EXTENDED — every file recorded at 48kHz and cleared for commercial use. Clean, processed, and ready for any genre.',
    genre: 'Multi-genre',
    key: 'All keys included',
    tags: ['guitar', 'sample pack', 'guitar loops', 'one-shots', 'atmospheric', 'electric guitar', '48khz', 'royalty free'],
    releaseDate: '2024',
    tiers: [
      {
        id: 'guitar-cutted',
        name: 'CUTTED',
        price: 5,
        usd: 5,
        features: [
          '20 guitar loops',
          'WAV 24-bit / 48kHz',
          'Royalty-free license',
        ],
        soundcloudUrl: 'https://on.soundcloud.com/kviztBdOV2m96L3OkU',
      },
      {
        id: 'guitar-basic',
        name: 'BASIC',
        price: 15,
        usd: 15,
        features: [
          '40+ samples total',
          '20 guitar loops',
          '22 one-shots',
          'WAV 24-bit / 48kHz',
          'Royalty-free license',
        ],
        soundcloudUrl: 'https://on.soundcloud.com/kviztBdOV2m96L3OkU',
      },
      {
        id: 'guitar-extended',
        name: 'EXTENDED',
        price: 25,
        usd: 25,
        features: [
          '60+ samples total',
          '40 guitar loops',
          '22 one-shots',
          'WAV 24-bit / 48kHz',
          'Royalty-free license',
        ],
        soundcloudUrl: 'https://on.soundcloud.com/kviztBdOV2m96L3OkU',
      },
    ],
  },
  // Add more packs here later:
  // {
  //   slug: 'drums-pack',
  //   title: 'DRUMS PACK',
  //   ...
  // },
]

export function getPackBySlug(slug: string): Pack | undefined {
  return packs.find((p) => p.slug === slug)
}
