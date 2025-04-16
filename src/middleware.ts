import createMiddleware from 'next-intl/middleware'
// import { NextResponse } from 'next/server'
import { NextRequest, NextResponse } from 'next/server'
import { routing } from './i18n/routing'

// Пути, которые требуют авторизации (без префикса языка)
// const protectedRoutes = ['/profile', '/dashboard', '/settings']
// const guestRoutes = ['/auth']

export default async function middleware(request: NextRequest) {
  const intlMiddleware = createMiddleware(routing)
  const response = intlMiddleware(request)

  const accessToken = request.cookies.get('accessToken')?.value
  const pathname = request.nextUrl.pathname

  console.log('accessToken', accessToken)
  console.log('pathname', pathname)

  // if (pathname.includes('profile') && !accessToken) {
  //   return NextResponse.redirect(new URL('/auth', request.url))
  // }

  return response
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
}
