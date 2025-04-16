import { ReactNode } from 'react'
import Footer from '@/entities/footer/ui'
import Header from '@/entities/header/ui/Header'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="pt-[53px] pb-4">{children}</main>
      <Footer />
    </>
  )
}
