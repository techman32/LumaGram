import { ButtonHTMLAttributes, ReactNode } from 'react'
import cn from 'classnames'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode
  className?: string
}

export default function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button {...props} className={cn('cursor-pointer', className)}>
      {children}
    </button>
  )
}
