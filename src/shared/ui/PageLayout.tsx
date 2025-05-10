import { ReactNode } from 'react'

export default function PageLayout({ children }: { children: ReactNode }) {
  return <div className="relative h-full overflow-scroll container mx-auto px-4">{children}</div>
}
