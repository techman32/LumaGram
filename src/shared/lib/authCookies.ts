'use server'
import { cookies } from 'next/headers'
import { AuthBody } from '@/shared/lib/types/auth'

export const setAuthCookies = async (auth: AuthBody) => {
  const cookieStore = await cookies()

  cookieStore.set({
    name: 'accessToken',
    value: auth.accessToken,
    httpOnly: false,
    sameSite: 'lax',
    path: '/',
  })

  cookieStore.set({
    name: 'refreshToken',
    value: auth.refreshToken,
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
  })

  cookieStore.set({
    name: 'username',
    value: auth.username,
    httpOnly: false,
    sameSite: 'lax',
    path: '/',
  })
}
