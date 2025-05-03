import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'
import { NextRequest, NextResponse } from 'next/server'
import { sendRequest } from '@/shared/api/api'

const intlMiddleware = createMiddleware(routing)

export default async function middleware(request: NextRequest) {
  const response = intlMiddleware(request)
  const locale = request.nextUrl.pathname.split('/')[1]

  const pathname = request.nextUrl.pathname
  const refreshToken = request.cookies.get('refreshToken')?.value
  const accessToken = request.cookies.get('accessToken')?.value
  const cookieUsername = request.cookies.get('username')?.value

  const isAuthPage = pathname === `/${locale}/auth`
  const isProtectedPage = pathname.startsWith(`/${locale}/`) && !isAuthPage

  if (accessToken) {
    try {
      const res = await sendRequest<{ username: string }>('users/check', {
        method: 'GET',
        token: accessToken,
      })

      if (res.username) {
        const { username: realUsername } = res

        if (!cookieUsername || cookieUsername !== realUsername) {
          const next = NextResponse.next()
          next.cookies.set('username', realUsername, {
            path: '/',
            sameSite: 'strict',
          })
          return next
        }
      } else {
        const next = NextResponse.next()
        next.cookies.delete('username')
        return next
      }
    } catch {
      const next = NextResponse.next()
      next.cookies.delete('username')
      return next
    }
  }

  if (refreshToken && isAuthPage) {
    const username = request.cookies.get('username')?.value
    return NextResponse.redirect(new URL(`/${locale}/${username ?? 'dashboard'}`, request.url))
  }

  if (!refreshToken && isProtectedPage) {
    return NextResponse.redirect(new URL(`/${locale}/auth`, request.url))
  }

  return response
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
}
