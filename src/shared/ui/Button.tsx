import { ButtonHTMLAttributes, ReactNode } from 'react'
import cn from 'classnames'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: ReactNode
  className?: string
  appearance?: 'primary' | 'default'
  block?: boolean
}

export default function Button({ children, className, appearance = 'default', block, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        'cursor-pointer px-2 py-1 rounded-md transition-colors h-9',
        { 'bg-black text-white hover:bg-black/85': appearance === 'primary' },
        { 'w-full': block },
        className,
      )}
    >
      {children}
    </button>
  )
}
