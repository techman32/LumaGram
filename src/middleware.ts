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

  if (pathname.includes('profile') && !accessToken) {
    return NextResponse.redirect(new URL('/auth', request.url))
  }

  // // Получаем accessToken из cookies
  // const accessToken = request.cookies.get('accessToken')?.value
  //
  // // Извлекаем путь без префикса языка
  // const pathname = request.nextUrl.pathname
  // const pathWithoutLocale = pathname.split('/').slice(2).join('/') || '/'
  //
  // // Проверяем маршруты с учетом того, что перед ними может быть язык
  // const isProtectedRoute = protectedRoutes.some(route =>
  //   pathWithoutLocale.startsWith(route)
  // )
  //
  // const isGuestRoute = guestRoutes.some(route =>
  //   pathWithoutLocale.startsWith(route)
  // )
  //
  // // Редиректы для защищенных маршрутов
  // if (isProtectedRoute && !accessToken) {
  //   const loginUrl = new URL(`/auth`, request.url)
  //   loginUrl.searchParams.set('redirect', pathname)
  //   return NextResponse.redirect(loginUrl)
  // }
  //
  // // Редиректы для гостевых маршрутов
  // if (isGuestRoute && accessToken) {
  //   const homeUrl = new URL(`/${pathname.split('/')[1] || 'en'}`, request.url)
  //   return NextResponse.redirect(homeUrl)
  // }

  return response
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
}
