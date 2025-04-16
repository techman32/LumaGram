import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'

const prisma = new PrismaClient()

export async function POST(req: Request) {
  const data = await req.json()
  const { username, email, password } = data

  if (!username || !email || !password) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 })
  }

  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ email }, { username }],
    },
  })

  if (existingUser) {
    return NextResponse.json({ error: 'User already exists' }, { status: 409 })
  }

  const hashedPassword = await bcrypt.hash(password, 10)

  const user = await prisma.user.create({
    data: {
      email,
      username,
      password: hashedPassword,
      profile: {
        create: {
          fullName: '',
          bio: '',
          activity: '',
        },
      },
    },
    include: { profile: true },
  })

  return NextResponse.json({ user }, { status: 201 })
}

// import { NextRequest, NextResponse } from 'next/server'
//
// export const POST = async (req: NextRequest) => {
//   const { username, email, password } = await req.json()
//
//   try {
//     const response = await fetch('http://109.73.197.191/api/auth/register', {
//       method: 'POST',
//       body: JSON.stringify({ username, email, password }),
//       headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
//     })
//
//     const { data, success, error } = await response.json()
//
//     if (success) {
//       const res = NextResponse.json({ success })
//
//       res.cookies.set({
//         name: 'accessToken',
//         value: data.accessToken,
//         httpOnly: true,
//         // secure: process.env.NODE_ENV === 'production', // Только по HTTPS в проде
//         // sameSite: 'strict', // Только с того же сайта
//         path: '/',
//       })
//
//       return res
//     }
//
//     return NextResponse.json({ data, success, error })
//   } catch (error) {
//     return NextResponse.json({ message: error }, { status: 500 })
//   }
// }
