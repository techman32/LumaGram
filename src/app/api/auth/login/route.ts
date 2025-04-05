import { NextRequest, NextResponse } from 'next/server'

export const POST = async (req: NextRequest) => {
  const { username, password, remember } = await req.json()
  try {
    const response = await fetch('http://37.252.21.108:5000/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ username, password, remember }),
    })

    const data = await response.json()

    return NextResponse.json(data, { status: 200 })
  } catch (error) {
    return NextResponse.json({ message: error, status: 501 })
  }
}
