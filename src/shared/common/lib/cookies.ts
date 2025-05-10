'use server'
import { cookies } from 'next/headers'
import { AuthResponse } from '@/shared/common/types/auth'

const getCookies = async () => {
  return await cookies()
}

export const setAuthCookies = async (auth: AuthResponse) => {
  const cookieStore = await getCookies()

  cookieStore.set({
    name: 'accessToken',
    value: auth.accessToken,
    httpOnly: true,
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
    httpOnly: true,
    sameSite: 'lax',
    path: '/',
  })
}

export const updateUsernameCookie = async (username: string) => {
  const cookieStore = await getCookies()
  cookieStore.set({
    name: 'username',
    value: username,
    httpOnly: true,
    sameSite: 'strict',
    path: '/',
  })
}
