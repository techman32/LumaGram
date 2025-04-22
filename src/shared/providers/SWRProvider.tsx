'use client'
import { SWRConfig } from 'swr'
import { ReactNode } from 'react'

const fetcher = async (url: string) => {
  const res = await fetch(url, {
    credentials: 'include',
  })

  if (!res.ok) {
    throw new Error('An error occurred while fetching the data.')
  }

  return res.json()
}

export default function SWRProvider({ children }: { children: ReactNode }) {
  return <SWRConfig value={{ fetcher, revalidateOnFocus: false }}>{children}</SWRConfig>
}
