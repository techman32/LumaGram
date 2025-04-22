import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'

export const POST = async (req: NextRequest) => {
  const allCookies = await cookies()
  const t = allCookies.getAll()

  try {
    return NextResponse.json({ t })
  } catch (error) {
    return NextResponse.json({ message: error }, { status: 500 })
  }
}
