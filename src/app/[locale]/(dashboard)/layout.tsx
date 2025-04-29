import { ReactNode } from 'react'
import Header from '@/widgets/header/ui/Header'
import Footer from '@/widgets/footer/ui/Footer'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  )
}
