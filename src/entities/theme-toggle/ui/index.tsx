'use client'
import { useEffect, useState } from 'react'
import { Moon, Sun } from 'lucide-react'

export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme =
      (localStorage.getItem('theme') as 'light' | 'dark') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    setTheme(savedTheme)
    document.documentElement.classList.toggle('dark', savedTheme === 'dark')
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }

  if (!mounted) {
    return <div className="w-10 h-10" />
  }

  return (
    <button
      onClick={toggleTheme}
      className="border cursor-pointer border-gray-200 p-2 dark:border-white/70 rounded-full bg-transparent dark:bg-gray-950/5"
    >
      {theme === 'light' ? (
        <span className="flex gap-2 items-center">
          <Moon className="text-foreground" size={16} />
        </span>
      ) : (
        <span className="flex gap-2 items-center">
          <Sun className="text-foreground stroke-white/70" size={16} />
        </span>
      )}
    </button>
  )
}
