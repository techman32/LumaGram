'use server'
import { cookies } from 'next/headers'
import { AuthBody } from '@/shared/lib/types/auth'

const getCookies = async () => {
  return await cookies()
}

export const setAuthCookies = async (auth: AuthBody) => {
  const cookieStore = await getCookies()

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

export const updateUsernameCookie = async (username: string) => {
  const cookieStore = await getCookies()
  cookieStore.set({
    name: 'username',
    value: username,
    httpOnly: false,
    sameSite: 'strict',
    path: '/',
  })
}
