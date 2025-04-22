import { NextRequest, NextResponse } from 'next/server'

export const POST = async (req: NextRequest) => {
  const { username, email, password } = await req.json()

  try {
    const response = await fetch('http://109.73.197.191/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
      headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
    })

    const { data, success, error } = await response.json()

    if (success) {
      const res = NextResponse.json({ success })

      res.cookies.set({
        name: 'accessToken',
        value: data.accessToken,
        httpOnly: true,
        // secure: process.env.NODE_ENV === 'production', // Только по HTTPS в проде
        // sameSite: 'strict', // Только с того же сайта
        path: '/',
      })

      return res
    }

    return NextResponse.json({ data, success, error })
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 })
  }
}
