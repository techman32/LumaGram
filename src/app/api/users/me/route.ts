import { NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export const GET = async () => {
  const cookieStore = await cookies()
  const token = cookieStore.get('accessToken')

  try {
    const response = await fetch('http://109.73.197.191/api/users/me', {
      method: 'GET',
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json', 'Authorization': `Bearer ${token}` },
    })

    const { data, success, error } = await response.json()

    return NextResponse.json({ data, success, error })
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 })
  }
}
