import { ReactNode } from 'react'
import Footer from '@/widgets/footer/ui/Footer'

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {children}
      <Footer />
    </>
  )
}
