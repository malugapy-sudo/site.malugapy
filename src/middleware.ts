import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { match as matchLocale } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

export const i18n = {
  defaultLocale: 'es',
  locales: ['es', 'pt', 'en'],
} as const;

export type Locale = (typeof i18n)['locales'][number];

// Mapa de país → idioma
const countryToLocale: Record<string, Locale> = {
  BR: 'pt',
  PT: 'pt',
  AO: 'pt',
  MZ: 'pt',
  US: 'en',
  GB: 'en',
  AU: 'en',
  CA: 'en',
  NZ: 'en',
  // Todos os países hispânicos → es (default)
};

function getLocale(request: NextRequest): string {
  // Only use the saved language cookie (set when user explicitly changes language)
  const cookieLocale = request.cookies.get('NEXT_LOCALE')?.value;
  if (cookieLocale && i18n.locales.includes(cookieLocale as Locale)) {
    return cookieLocale;
  }

  // Default to Spanish
  return i18n.defaultLocale;
}

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  
  // Skip public files, images, etc.
  if (
    pathname.startsWith('/_next') ||
    pathname.includes('/api/') ||
    pathname.match(/\.(.*)$/) 
  ) {
    return;
  }

  // Check if there is any supported locale in the pathname
  const pathnameIsMissingLocale = i18n.locales.every(
    (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
  );

  // Redirect if there is no locale
  if (pathnameIsMissingLocale) {
    const locale = getLocale(request);

    // e.g. incoming request is /planos
    // The new URL is now /es/planos
    return NextResponse.redirect(
      new URL(
        `/${locale}${pathname.startsWith('/') ? '' : '/'}${pathname}`,
        request.url
      )
    );
  }

  // Allow the request to proceed
  const response = NextResponse.next();
  
  // If the pathname has a locale, make sure the cookie matches it for future requests
  const currentLocale = pathname.split('/')[1];
  if (i18n.locales.includes(currentLocale as Locale)) {
    response.cookies.set('NEXT_LOCALE', currentLocale, { path: '/' });
  }

  return response;
}

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
