import { ReactNode } from 'react'

export default function Navigation({ children }: { children: ReactNode }) {
  return <nav className="flex items-center gap-2">{children}</nav>
}
