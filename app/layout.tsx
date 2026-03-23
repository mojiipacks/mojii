import type { Metadata } from 'next'
import './globals.css'
import { CustomCursor } from '@/components/CustomCursor'

export const metadata: Metadata = {
  metadataBase: new URL('https://mojii.com'),
  title: {
    default: 'MOJII — Premium Sample Packs for Producers',
    template: '%s | MOJII',
  },
  description: 'High-quality royalty-free sample packs. Guitar loops, one-shots and more. Made for modern producers.',
  keywords: ['sample pack', 'guitar samples', 'music production', 'loops', 'one-shots', 'royalty free', 'MOJII'],
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mojii.com',
    siteName: 'MOJII',
    title: 'MOJII — Premium Sample Packs',
    description: 'High-quality royalty-free sample packs for modern producers.',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MOJII — Premium Sample Packs',
    description: 'High-quality royalty-free sample packs for modern producers.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <CustomCursor />
        {children}
      </body>
    </html>
  )
}
