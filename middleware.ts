import { NextRequest, NextResponse } from 'next/server'

const locales = ['en', 'uk']
const defaultLocale = 'en'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Skip API routes, static files, Next internals
  if (
    pathname.startsWith('/api') ||
    pathname.startsWith('/_next') ||
    pathname.startsWith('/favicon') ||
    pathname.includes('.')
  ) {
    return NextResponse.next()
  }

  // Check if pathname already has a locale
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  )

  if (pathnameHasLocale) return NextResponse.next()

  // Detect preferred locale from Accept-Language header
  const acceptLanguage = request.headers.get('accept-language') || ''
  const preferredLocale = acceptLanguage.toLowerCase().includes('uk') ? 'uk' : defaultLocale

  // Redirect to locale-prefixed URL
  const url = request.nextUrl.clone()
  url.pathname = `/${preferredLocale}${pathname}`
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
