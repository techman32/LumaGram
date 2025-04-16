import { ReactNode } from 'react'
import Footer from '@/entities/footer/ui'

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <main>{children}</main>
      <Footer />
    </>
  )
}
