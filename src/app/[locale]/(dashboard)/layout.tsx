import { ReactNode } from 'react'
import Header from '@/entities/header/ui/Header'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <div className="pt-[53px] pb-4 bg-white dark:bg-black/90">{children}</div>
    </>
  )
}
