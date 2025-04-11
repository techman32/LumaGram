'use client'
import { ComponentProps } from 'react'
import { ThemeProvider } from 'next-themes'

export function NextThemesProvider({ children, ...props }: ComponentProps<typeof ThemeProvider>) {
  return <ThemeProvider {...props}>{children}</ThemeProvider>
}
